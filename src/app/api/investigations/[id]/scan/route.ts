import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { usernameSearch, googleDorks, domainSearch, breachSearch, reverseImageSearch, darkWebSearch, interpolSearch, cryptoSearch } from '@/connectors';
import { summarizeFindings } from '@/lib/ai';
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

export const maxDuration = 60;

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

        const extractIdentifiers = async (text: string, title?: string, sourceId?: string) => {
            const entitiesToCreate: { type: string; value: string }[] = [];

            // 1. Emails
            const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
            emails.forEach(e => {
                const value = e.toLowerCase();
                correlatedIdentifiers.emails.add({ value, sourceId });
                entitiesToCreate.push({ type: 'email', value });
            });

            // 2. Usernames / Handles (@handle or "user: handle")
            const handles = text.match(/@([a-zA-Z0-9_]{3,20})/g) || [];
            handles.forEach(h => {
                const value = h.replace('@', '').toLowerCase();
                correlatedIdentifiers.usernames.add({ value, sourceId });
                entitiesToCreate.push({ type: 'username', value });
            });

            // 3. Social URLs (X/Twitter, LinkedIn, IG)
            const xUrls = text.match(/(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/([a-zA-Z0-9_]{1,15})(?:\/status\/)?/gi) || [];
            xUrls.forEach(url => {
                const handle = url.split('/').pop()?.toLowerCase();
                if (handle && !['home', 'explore', 'notifications', 'messages', 'search'].includes(handle)) {
                    correlatedIdentifiers.usernames.add({ value: handle, sourceId });
                    entitiesToCreate.push({ type: 'username', value: handle });
                }
            });

            // 4. Domains
            const domains = text.match(/\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/g) || [];
            domains.forEach(d => {
                const domain = d.toLowerCase();
                if (!['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'github.com', 'medium.com', 'reddit.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'web.archive.org'].includes(domain)) {
                    correlatedIdentifiers.domains.add({ value: domain, sourceId });
                    entitiesToCreate.push({ type: 'domain', value: domain });
                }
            });

            // 5. Crypto
            const btc = text.match(/\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}\b/g) || [];
            const eth = text.match(/\b0x[a-fA-F0-9]{40}\b/g) || [];
            [...btc, ...eth].forEach(c => {
                correlatedIdentifiers.crypto.add({ value: c, sourceId });
                entitiesToCreate.push({ type: 'crypto', value: c });
            });

            // 6. High-Confidence Name Pivot (from Wikipedia or Bio)
            if (title && title.includes('Wikipedia')) {
                const cleanName = title.split(' — ')[1]?.replace(/\([^)]*\)/g, '').trim();
                if (cleanName && cleanName.length > 3 && cleanName !== investigation.subjectName) {
                    correlatedIdentifiers.names.add({ value: cleanName, sourceId });
                    entitiesToCreate.push({ type: 'name', value: cleanName });
                }
            }

            // Persistence: Save unique entities to DB
            if (entitiesToCreate.length > 0) {
                // Remove duplicates from the current batch
                const uniqueBatch = entitiesToCreate.filter((v, i, a) =>
                    a.findIndex(t => t.type === v.type && t.value === v.value) === i
                );

                for (const entity of uniqueBatch) {
                    try {
                        // Manual find-or-create since multi-column unique index might be missing in production DB
                        const existing = await prisma.entity.findFirst({
                            where: { investigationId, type: entity.type, value: entity.value }
                        });

                        if (existing) {
                            await prisma.entity.update({
                                where: { id: existing.id },
                                data: { updatedAt: new Date() }
                            });
                        } else {
                            await prisma.entity.create({
                                data: { investigationId, type: entity.type, value: entity.value, confidence: 70 }
                            });
                        }
                    } catch (e) {
                        // Safe to ignore for high-speed scan
                    }
                }
            }
        };

        /**
         * CRITICAL CHANGE: Save evidence to DB IMMEDIATELY as each connector completes.
         * This way even if Vercel kills the function, all previously completed connectors
         * will have their evidence persisted in the database.
         */
        const safeRun = async (label: string, fn: () => Promise<any>, parentId?: string) => {
            try {
                const result = await fn();
                if (!result?.results || result.results.length === 0) return;

                const evidenceItems: any[] = [];
                for (const res of result.results) {
                    if (res.category === 'system') continue;
                    // Note: Since we are saving in batch AFTER this loop, 
                    // we can't get the ID yet for recursive extraction within the SAME connector.
                    // But we can extract identifiers and use the PARENT ID (if this is already a pivot)
                    if (res.description) await extractIdentifiers(res.description, res.title, parentId);
                    const content = res.description || '';
                    const provenanceHash = generateProvenanceHash(content);

                    // Auto-archive HIGH confidence URLs (fire-and-forget)
                    let sourceArchiveUrl: string | null = null;
                    if (res.confidenceLabel === 'HIGH' && res.url && !res.url.startsWith('#')) {
                        sourceArchiveUrl = await archiveUrl(res.url);
                    }

                    const item: any = {
                        title: res.title,
                        content,
                        sourceUrl: res.url,
                        type: 'url',
                        tags: [res.category || 'general'].join(','),
                        confidenceScore: res.confidenceScore,
                        confidenceLabel: res.confidenceLabel,
                        eventDate: new Date(),
                        provenanceHash,
                        captureTimestamp: new Date(),
                        sourceArchiveUrl,
                        provenanceSourceId: parentId || null,
                    };
                    evidenceItems.push(item);
                    allEvidence.push(item);
                }

                // SAVE IMMEDIATELY to DB and return the IDs so children can link to them
                if (evidenceItems.length > 0) {
                    const created = await Promise.all(
                        evidenceItems.map(item =>
                            prisma.evidence.create({
                                data: { ...item, investigationId }
                            })
                        )
                    );

                    // Now that we have IDs for these NEW evidence items, 
                    // re-run extraction so children can link to THESE IDs specifically.
                    for (let i = 0; i < created.length; i++) {
                        if (evidenceItems[i].content) {
                            await extractIdentifiers(evidenceItems[i].content, evidenceItems[i].title, created[i].id);
                        }
                    }

                    return created;
                }
                return [];
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

        // ========== PHASE 2: Deep Digging & Recursive Pivoting ==========
        const phase2: Promise<any>[] = [];

        // Recursive Username Pivots (Discovered handles)
        for (const userObj of correlatedIdentifiers.usernames) {
            if (userObj.value === investigation.subjectUsername || userObj.value === usernameTarget) continue;
            phase2.push(safeRun(`Pivot: @${userObj.value}`, () => usernameSearch(userObj.value), userObj.sourceId));
        }

        // Recursive Name Pivots (Discovered full legal names)
        for (const nameObj of correlatedIdentifiers.names) {
            phase2.push(safeRun(`Pivot: ${nameObj.value}`, () => googleDorks({ name: nameObj.value }), nameObj.sourceId));
        }

        // Recursive Email Pivots
        for (const emailObj of correlatedIdentifiers.emails) {
            if (emailObj.value === investigation.subjectEmail) continue;
            phase2.push(safeRun(`Pivot: ${emailObj.value}`, () => breachSearch(emailObj.value), emailObj.sourceId));
            phase2.push(safeRun(`Pivot: ${emailObj.value} (Search)`, () => googleDorks({ email: emailObj.value }), emailObj.sourceId));
        }

        // Recursive Domain Pivots
        for (const domObj of correlatedIdentifiers.domains) {
            if (domObj.value === investigation.subjectDomain) continue;
            phase2.push(safeRun(`Pivot: ${domObj.value}`, () => domainSearch(domObj.value), domObj.sourceId));
        }

        if (isPro) {
            for (const cryptoObj of correlatedIdentifiers.crypto) {
                phase2.push(safeRun(`Investigating Crypto Hub`, () => cryptoSearch(cryptoObj.value), cryptoObj.sourceId));
            }
            const darkWebQuery = investigation.subjectEmail || investigation.subjectUsername || investigation.subjectName;
            if (darkWebQuery) {
                phase2.push(safeRun('Dark Web Sweep', () => darkWebSearch(darkWebQuery)));
            }
        }

        if (phase2.length > 0) {
            // Second Wave of Discovery
            await Promise.allSettled(phase2);
        }

        // ========== PHASE 3: AI Synthesis ==========
        let summary = '';
        try {
            summary = await summarizeFindings(investigation.title, allEvidence, customApiKey) || '';
        } catch (aiErr: any) {
            console.error('[SCAN] AI Synthesis failed:', aiErr?.message);
            summary = `### AI Synthesis Error\n\nThe scan found ${allEvidence.length} evidence items, but AI synthesis failed: ${aiErr?.message || 'Unknown'}.\n\nReview evidence in the Evidence tab.`;
        }

        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Dossier — ${new Date().toLocaleDateString()}`,
                content: summary || `### Scan Complete\n\nFound ${allEvidence.length} evidence items. Review them in the Evidence tab.`,
                format: 'markdown'
            }
        });

        // Finalize
        await prisma.investigation.update({
            where: { id: investigationId },
            data: { updatedAt: new Date(), status: 'closed' },
        });

        return NextResponse.json({
            success: true,
            message: `Scan completed. Found ${allEvidence.length} evidence items.`,
            resultsCount: { evidence: allEvidence.length }
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
