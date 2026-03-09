import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { usernameSearch, googleDorks, domainSearch, breachSearch, reverseImageSearch, darkWebSearch, interpolSearch, cryptoSearch } from '@/connectors';
import { summarizeFindings } from '@/lib/ai';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';

// Allow up to 60 seconds for the scan
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
            } else {
                throw dbErr;
            }
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
            return NextResponse.json({ error: 'Rate limit exceeded. Upgrade to Pro for more daily scans.' }, { status: 429 });
        }

        // 0. Clear previous scan data
        await prisma.evidence.deleteMany({ where: { investigationId } });
        await prisma.searchLog.deleteMany({ where: { investigationId } });
        await prisma.report.deleteMany({ where: { investigationId } });
        await prisma.entity.deleteMany({ where: { investigationId } });

        await prisma.investigation.update({
            where: { id: investigationId },
            data: { status: 'active' },
        });

        const gatheredEvidence: any[] = [];
        const correlatedIdentifiers = {
            emails: new Set<string>(),
            crypto: new Set<string>(),
        };

        const extractIdentifiers = (text: string) => {
            const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
            const btc = text.match(/\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}\b/g) || [];
            const eth = text.match(/\b0x[a-fA-F0-9]{40}\b/g) || [];
            emails.forEach(e => correlatedIdentifiers.emails.add(e.toLowerCase()));
            [...btc, ...eth].forEach(c => correlatedIdentifiers.crypto.add(c));
        };

        // Safe connector wrapper: errors are LOGGED, not shown as evidence cards
        const safeRun = async (label: string, fn: () => Promise<any>) => {
            try {
                const result = await fn();
                if (result?.results) {
                    for (const res of result.results) {
                        // Skip internal system trace / error cards — the user doesn't want to see these
                        if (res.category === 'system') continue;
                        if (res.description) extractIdentifiers(res.description);
                        gatheredEvidence.push({
                            title: res.title,
                            content: res.description || '',
                            sourceUrl: res.url,
                            type: 'url',
                            tags: [res.category || 'general'].join(','),
                        });
                    }
                }
            } catch (err: any) {
                console.error(`[SCAN] Connector "${label}" failed:`, err?.message);
                // Do NOT create error evidence cards — just log and move on
            }
        };

        // ========== PHASE 1: Primary Intelligence Sweep (Parallel) ==========
        const phase1: Promise<void>[] = [];

        // Username Search — fires for username OR name (derive username from name)
        const usernameTarget = investigation.subjectUsername || investigation.subjectName?.replace(/\s+/g, '').toLowerCase();
        if (usernameTarget) {
            phase1.push(safeRun('Username Search', () => usernameSearch(usernameTarget)));
        }

        // If the name has spaces (a real name), also try searching the full name as-is for better social matching
        if (investigation.subjectName && investigation.subjectName.includes(' ') && investigation.subjectUsername !== investigation.subjectName) {
            const nameParts = investigation.subjectName.trim().split(/\s+/);
            // Try first name + last name combined (e.g., "barackobama") and just first name
            if (nameParts.length >= 2) {
                const firstLast = (nameParts[0] + nameParts[nameParts.length - 1]).toLowerCase();
                if (firstLast !== usernameTarget) {
                    phase1.push(safeRun('Username Search (name variant)', () => usernameSearch(firstLast)));
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

        // Domain Search
        const domainMatch = investigation.subjectDomain || investigation.subjectEmail?.split('@')[1];
        if (domainMatch && !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domainMatch)) {
            phase1.push(safeRun('Domain Search', () => domainSearch(domainMatch)));
        }

        // Breach Search
        if (investigation.subjectEmail) {
            phase1.push(safeRun('Breach Search', () => breachSearch(investigation.subjectEmail)));
        }

        // Interpol Search
        const interpolQuery = investigation.subjectName || investigation.subjectUsername;
        if (interpolQuery) {
            phase1.push(safeRun('Interpol Search', () => interpolSearch({
                name: investigation.subjectName || undefined,
                username: investigation.subjectUsername || undefined
            })));
        }

        // Reverse Image Search
        if (investigation.subjectImageUrl) {
            phase1.push(safeRun('Reverse Image Search', () => reverseImageSearch(investigation.subjectImageUrl)));
        }

        await Promise.allSettled(phase1);

        // ========== PHASE 2: Deep Digging — Correlated Identifiers ==========
        const phase2: Promise<void>[] = [];

        for (const email of correlatedIdentifiers.emails) {
            if (email === investigation.subjectEmail) continue;
            phase2.push(safeRun(`Correlated Breach: ${email}`, () => breachSearch(email)));
        }

        if (isPro) {
            for (const address of correlatedIdentifiers.crypto) {
                phase2.push(safeRun(`Correlated Crypto: ${address.substring(0, 8)}`, () => cryptoSearch(address)));
            }
            const darkWebQuery = investigation.subjectEmail || investigation.subjectUsername;
            if (darkWebQuery) {
                phase2.push(safeRun('Dark Web Search', () => darkWebSearch(darkWebQuery)));
            }
            const cryptoQuery = investigation.subjectUsername || investigation.subjectName || investigation.subjectEmail;
            if (cryptoQuery) {
                phase2.push(safeRun('Crypto Search', () => cryptoSearch(cryptoQuery)));
            }
        }

        await Promise.allSettled(phase2);

        // ========== PHASE 3: Save Evidence + AI Synthesis ==========
        if (gatheredEvidence.length > 0) {
            await prisma.evidence.createMany({
                data: gatheredEvidence.map(e => ({ ...e, investigationId }))
            });
        }

        let summary = '';
        try {
            summary = await summarizeFindings(investigation.title, gatheredEvidence, customApiKey) || '';
        } catch (aiErr: any) {
            console.error('[SCAN] AI Synthesis failed:', aiErr?.message);
            summary = `### AI Synthesis Error\n\nThe scan found ${gatheredEvidence.length} evidence items, but AI synthesis failed: ${aiErr?.message || 'Unknown'}.\n\nReview evidence in the Evidence tab.`;
        }

        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Dossier — ${new Date().toLocaleDateString()}`,
                content: summary || `### Scan Complete\n\nFound ${gatheredEvidence.length} evidence items. Review them in the Evidence tab.`,
                format: 'markdown'
            }
        });

        await prisma.investigation.update({
            where: { id: investigationId },
            data: { updatedAt: new Date(), status: 'closed' },
        });

        return NextResponse.json({
            success: true,
            message: `Scan completed. Found ${gatheredEvidence.length} evidence items.`,
            resultsCount: {
                evidence: gatheredEvidence.length,
                emailsFound: correlatedIdentifiers.emails.size,
                cryptoFound: correlatedIdentifiers.crypto.size
            }
        });

    } catch (error: any) {
        console.error('Scan failed:', error);
        try {
            await prisma.investigation.update({
                where: { id: investigationId },
                data: { status: 'closed' },
            });
        } catch { /* last resort */ }

        return NextResponse.json({ error: 'Scan engine failed', details: error?.message }, { status: 500 });
    }
}
