import { NextRequest, NextResponse } from 'next/server';
export const maxDuration = 60; // Increase timeout for heavy OSINT scanning
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { summarizeFindings } from "@/lib/ai";
import { captureScreenshot } from "@/lib/screenshot";
import { 
    usernameSearch, 
    googleDorks, 
    domainSearch, 
    breachSearch, 
    reverseImageSearch, 
    darkWebSearch, 
    interpolSearch, 
    cryptoSearch,
    peopleSearch 
} from '@/connectors';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';
import { createHash } from 'crypto';

// Generate SHA-256 hash of evidence content for immutability verification
function generateProvenanceHash(content: string): string {
    return createHash('sha256').update(content).digest('hex');
}

// Auto-archive a URL to Wayback Machine (fire-and-forget, won't block scan)
async function archiveUrl(url: string): Promise<string | null> {
    if (!url || url.startsWith('#')) return null;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`https://web.archive.org/save/${url}`, {
            method: 'GET',
            headers: { 'User-Agent': 'OpenVector-OSINT-Archiver/1.0' },
            signal: controller.signal,
            redirect: 'follow',
        });
        clearTimeout(timeout);
        if (res.ok || res.status === 302) {
            const location = res.headers.get('Content-Location') || res.headers.get('location');
            if (location) return `https://web.archive.org${location}`;
        }
        return null;
    } catch {
        return null;
    }
}



export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const investigationId = params.id;
    const customApiKey = req.headers.get('x-gemini-key') || undefined;
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    const user = supabaseUser || { id: GUEST_ID, email: 'guest@openvector.io' };

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let investigation;
        try {
            investigation = await prisma.investigation.findFirst({
                where: { id: investigationId, userId: user.id },
            });
        } catch (dbErr: any) {
            if (dbErr?.message?.includes('subjectDomain') || dbErr?.message?.includes('subjectImageUrl')) {
                investigation = await (prisma.investigation as any).findFirst({
                    where: { id: investigationId, userId: user.id },
                    select: {
                        id: true, title: true, description: true, status: true,
                        subjectName: true, subjectUsername: true, subjectEmail: true,
                        subjectPhone: true, userId: true, createdAt: true, updatedAt: true
                    }
                });
            } else { throw dbErr; }
        }

        if (!investigation) {
            return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
        }

        const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
        const isPro = userRecord?.plan === 'pro' || userRecord?.plan === 'lifetime';

        const limitOptions = { limit: isPro ? 1000 : 100, windowMs: 86400000 };
        const limitKey = getRateLimitKey(user.id, 'scan_investigation');
        const rateLimitResult = rateLimit(limitKey, limitOptions);
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
        }

        // Clear previous scan data
        await prisma.evidence.deleteMany({ where: { investigationId } });
        await prisma.searchLog.deleteMany({ where: { investigationId } });
        await prisma.report.deleteMany({ where: { investigationId } });
        await prisma.entity.deleteMany({ where: { investigationId } });

        await prisma.investigation.update({
            where: { id: investigationId },
            data: { status: 'active' },
        });

        // Track all evidence for AI synthesis later
        const allEvidence: { title: string; content: string; sourceUrl: string; type: string; tags: string }[] = [];

        const correlatedIdentifiers = {
            emails: new Set<{ value: string; sourceId?: string }>(),
            usernames: new Set<{ value: string; sourceId?: string }>(),
            domains: new Set<{ value: string; sourceId?: string }>(),
            crypto: new Set<{ value: string; sourceId?: string }>(),
            names: new Set<{ value: string; sourceId?: string }>(),
        };

        const extractIdentifiers = (text: string, title?: string, sourceId?: string) => {
            const batch: { type: string; value: string }[] = [];
            if (!text) return batch;

            // 1. Emails
            const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
            emails.forEach(e => {
                const value = e.toLowerCase();
                if (!['example.com', 'test.com'].includes(value.split('@')[1])) {
                    correlatedIdentifiers.emails.add({ value, sourceId });
                    batch.push({ type: 'email', value });
                }
            });

            // 2. Usernames / Handles
            const handles = text.match(/@([a-zA-Z0-9_]{3,20})/g) || [];
            handles.forEach(h => {
                const value = h.replace('@', '').toLowerCase();
                if (value.length > 2) {
                    correlatedIdentifiers.usernames.add({ value, sourceId });
                    batch.push({ type: 'username', value });
                }
            });

            // 3. Domains
            const domains = text.match(/\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/g) || [];
            domains.forEach(d => {
                const domain = d.toLowerCase();
                const ignored = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'github.com', 'medium.com', 'reddit.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'web.archive.org', 'vercel.app', 'google.com', 'bing.com', 'duckduckgo.com'];
                if (!ignored.includes(domain)) {
                    correlatedIdentifiers.domains.add({ value: domain, sourceId });
                    batch.push({ type: 'domain', value: domain });
                }
            });

            // 4. Crypto
            const btc = text.match(/\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}\b/g) || [];
            const eth = text.match(/\b0x[a-fA-F0-9]{40}\b/g) || [];
            [...btc, ...eth].forEach(c => {
                correlatedIdentifiers.crypto.add({ value: c, sourceId });
                batch.push({ type: 'crypto', value: c });
            });

            // 5. Names (from high-fidelity sources)
            if (title && (title.includes('Wikipedia') || title.includes('Profile'))) {
                const cleanName = title.split(' — ')[1]?.replace(/\([^)]*\)/g, '').trim();
                if (cleanName && cleanName.length > 3 && cleanName.length < 50 && cleanName !== investigation.subjectName) {
                    correlatedIdentifiers.names.add({ value: cleanName, sourceId });
                    batch.push({ type: 'name', value: cleanName });
                }
            }

            return batch;
        };

        const persistEntitiesBatch = async (entities: { type: string; value: string }[]) => {
            if (entities.length === 0) return;
            const unique = entities.filter((v, i, a) => 
                a.findIndex(t => t.type === v.type && t.value === v.value) === i
            ).slice(0, 100); 
            
            await Promise.allSettled(unique.map(async (entity) => {
                try {
                    // Fallback to manual check-then-create to avoid ID collisions
                    const existing = await prisma.entity.findFirst({
                        where: { investigationId, type: entity.type, value: entity.value }
                    });
                    if (existing) {
                        await prisma.entity.update({ where: { id: existing.id }, data: { updatedAt: new Date() } });
                    } else {
                        await prisma.entity.create({ data: { investigationId, type: entity.type, value: entity.value, confidence: 70 } });
                    }
                } catch { /* ignore individual entity failures */ }
            }));
        };

        /**
         * CRITICAL CHANGE: Save evidence to DB IMMEDIATELY as each connector completes.
         * This way even if Vercel kills the function, all previously completed connectors
         * will have their evidence persisted in the database.
         */
        const safeRun = async (label: string, fn: () => Promise<any>, parentId?: string) => {
            const start = Date.now();
            try {
                const result = await fn();
                if (!result?.results || result.results.length === 0) return [];

                const evidenceItems: any[] = [];
                const entitiesToPersist: { type: string; value: string }[] = [];

                for (const res of result.results.slice(0, 30)) { // Limit to 30 items per connector
                    if (res.category === 'system') continue;
                    
                    const extracted = extractIdentifiers(res.description || '', res.title, parentId);
                    entitiesToPersist.push(...extracted);

                    const content = res.description || '';
                    const provenanceHash = generateProvenanceHash(content);

                    if (res.confidenceLabel === 'HIGH' && res.url && !res.url.startsWith('#')) {
                        archiveUrl(res.url).catch(() => {}); 
                    }

                    evidenceItems.push({
                        title: res.title || `Intelligence Discovery — ${label}`,
                        content: content || 'Detailed documentation extracted from OSINT node.',
                        sourceUrl: res.url || null,
                        type: res.type || 'url',
                        tags: [res.category || 'general'].join(','),
                        confidenceScore: res.confidenceScore || 0.5,
                        confidenceLabel: res.confidenceLabel || 'MEDIUM',
                        eventDate: new Date(),
                        provenanceHash,
                        captureTimestamp: new Date(),
                        sourceArchiveUrl: null,
                        screenshotUrl: res.screenshotUrl || null,
                        provenanceSourceId: parentId || null,
                    });
                    allEvidence.push(evidenceItems[evidenceItems.length - 1]);
                }

                // Hardened Batch Persistence
                const [createdEvidence] = await Promise.all([
                    Promise.allSettled(evidenceItems.map(item => 
                        prisma.evidence.create({ data: { ...item, investigationId } })
                    )),
                    persistEntitiesBatch(entitiesToPersist)
                ]);

                const count = createdEvidence.filter(r => r.status === 'fulfilled').length;
                console.log(`[SCAN] ${label}: ${count} items saved in ${Date.now() - start}ms`);
                return (createdEvidence as any[]).filter(r => r.status === 'fulfilled').map(r => r.value);
            } catch (err: any) {
                console.error(`[SCAN] Connector "${label}" failed:`, err?.message);
                return [];
            }
        };

        // ========== PHASE 1: Primary Intelligence Sweep ==========
        const phase1: Promise<any>[] = [];

        // Username Search — use name as username if no explicit username
        const usernameTarget = investigation.subjectUsername || investigation.subjectName?.replace(/\s+/g, '').toLowerCase();
        if (usernameTarget) {
            phase1.push(safeRun('Username Search', () => usernameSearch(usernameTarget)));
        }

        // Also try first+last name variant
        if (investigation.subjectName && investigation.subjectName.includes(' ')) {
            const parts = investigation.subjectName.trim().split(/\s+/);
            if (parts.length >= 2) {
                const firstLast = (parts[0] + parts[parts.length - 1]).toLowerCase();
                if (firstLast !== usernameTarget) {
                    phase1.push(safeRun('Username Variant', () => usernameSearch(firstLast)));
                }
            }
        }

        // Google Dorks + Wikipedia
        const dorkQuery = investigation.subjectEmail || investigation.subjectUsername || investigation.subjectName;
        if (dorkQuery) {
            phase1.push(safeRun('Intelligence Dork', () => googleDorks({
                name: investigation.subjectName || undefined,
                username: investigation.subjectUsername || undefined,
                email: investigation.subjectEmail || undefined
            })));
        }

        // Domain
        const domainMatch = investigation.subjectDomain || investigation.subjectEmail?.split('@')[1];
        if (domainMatch && !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domainMatch)) {
            phase1.push(safeRun('Domain Search', () => domainSearch(domainMatch)));
        }

        // Breach
        if (investigation.subjectEmail) {
            phase1.push(safeRun('Breach Search', () => breachSearch(investigation.subjectEmail)));
        }

        // People Search (Pro Feature)
        if (isPro && (investigation.subjectName || investigation.subjectUsername)) {
            const peopleQuery = investigation.subjectName || investigation.subjectUsername;
            if (peopleQuery) {
                phase1.push(safeRun('People Search', () => peopleSearch(peopleQuery)));
            }
        }

        // Interpol
        const interpolQuery = investigation.subjectName || investigation.subjectUsername;
        if (interpolQuery) {
            phase1.push(safeRun('Interpol', () => interpolSearch({
                name: investigation.subjectName || undefined,
                username: investigation.subjectUsername || undefined
            })));
        }

        // Image
        if (investigation.subjectImageUrl) {
            phase1.push(safeRun('Image Search', () => reverseImageSearch(investigation.subjectImageUrl)));
        }

        await Promise.allSettled(phase1);

        // ========== PHASE 2: Intelligence Pivoting (Throttled & Limited) ==========
        const phase2: Promise<any>[] = [];
        let pivotCount = 0;
        const PIVOT_CAP = 15;

        // Build unique queue of pivots
        const pivotQueue = [
            ...Array.from(correlatedIdentifiers.usernames).map(u => ({ label: `Pivot: @${u.value}`, task: () => usernameSearch(u.value), id: u.sourceId, skip: u.value === investigation.subjectUsername || u.value === usernameTarget })),
            ...Array.from(correlatedIdentifiers.names).map(n => ({ label: `Pivot: ${n.value}`, task: () => googleDorks({ name: n.value }), id: n.sourceId, skip: false })),
            ...Array.from(correlatedIdentifiers.emails).map(e => ({ label: `Pivot: ${e.value}`, task: () => breachSearch(e.value), id: e.sourceId, skip: e.value === investigation.subjectEmail }))
        ];

        for (const p of pivotQueue) {
            if (pivotCount >= PIVOT_CAP) break;
            if (p.skip) continue;
            phase2.push(safeRun(p.label, p.task, p.id));
            pivotCount++;
        }

        if (isPro) {
            const darkWebT = investigation.subjectEmail || investigation.subjectUsername || investigation.subjectName;
            if (darkWebT) phase2.push(safeRun('Dark Web Sweep', () => darkWebSearch(darkWebT)));
            
            Array.from(correlatedIdentifiers.crypto).slice(0, 3).forEach(c => 
                phase2.push(safeRun(`Crypto Hub`, () => cryptoSearch(c.value), c.id))
            );

            // Throttled Screenshots
            Array.from(correlatedIdentifiers.domains).slice(0, 5).forEach(d => {
                phase2.push(safeRun(`Visual Proof: ${d.value}`, async () => {
                    const url = await captureScreenshot(`https://${d.value}`);
                    return url ? { results: [{ type: 'screenshot', title: `Visual Proof: ${d.value}`, description: `Web snapshot captured.`, confidenceScore: 0.9, confidenceLabel: 'VERIFIED', screenshotUrl: url }] } : null;
                }, d.id));
            });
        }

        // Run in regulated chunks of 4 to prevent DB/API bottlenecks
        const chunks = [];
        for (let i = 0; i < phase2.length; i += 4) {
            chunks.push(phase2.slice(i, i + 4));
        }
        for (const chunk of chunks) {
            await Promise.allSettled(chunk);
        }

        // Finalize Status BEFORE AI summary (prevents UI freeze during slow synthesis)
        await prisma.investigation.update({
            where: { id: investigationId },
            data: { updatedAt: new Date(), status: 'closed' },
        });

        // ========== PHASE 3: AI Synthesis ==========
        let summary = '';
        try {
            summary = await summarizeFindings(investigation.title, allEvidence, customApiKey) || '';
        } catch (aiErr: any) {
            summary = `### AI Intelligence Synthesis\n\nThe scan found ${allEvidence.length} items. AI synthesis encountered an error: ${aiErr?.message || 'Context limit or API timeout'}.`;
        }

        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Dossier — ${new Date().toLocaleDateString()}`,
                content: summary,
                format: 'markdown'
            }
        });

        return NextResponse.json({
            success: true,
            found: allEvidence.length
        });

    } catch (error: any) {
        console.error('Scan failed:', error);
        try {
            // Always ensure we close the investigation and create a report even on crash
            const existingEvidence = await prisma.evidence.count({ where: { investigationId } });
            if (existingEvidence > 0) {
                const evidence = await prisma.evidence.findMany({ where: { investigationId } });
                const summary = `### Partial Scan Results\n\nThe scan encountered an error but successfully gathered ${existingEvidence} evidence items before the failure.\n\nReview available evidence in the Evidence tab.\n\n**Error:** ${error?.message || 'Unknown'}`;
                await prisma.report.create({
                    data: { investigationId, title: 'Partial Intelligence Dossier', content: summary, format: 'markdown' }
                });
            }
            await prisma.investigation.update({
                where: { id: investigationId },
                data: { status: 'closed' },
            });
        } catch { /* last resort */ }

        return NextResponse.json({ error: 'Scan engine failed', details: error?.message }, { status: 500 });
    }
}
