import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { usernameSearch, googleDorks, domainSearch, breachSearch, reverseImageSearch, darkWebSearch, interpolSearch, cryptoSearch } from '@/connectors';
import { summarizeFindings } from '@/lib/ai';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';

// Allow up to 60 seconds for the scan (Vercel Pro allows up to 300s)
export const maxDuration = 60;

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const investigationId = params.id;
    const customApiKey = req.headers.get('x-gemini-key') || undefined;
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Guest Mode Fallback
    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    const user = supabaseUser || {
        id: GUEST_ID,
        email: 'guest@openvector.io'
    };

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
            // Fallback for missing columns in production DB
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

        // Rate Limiting: 100 per 24h for free, 1000 per 24h for pro
        const limitOptions = { limit: isPro ? 1000 : 100, windowMs: 86400000 };
        const limitKey = getRateLimitKey(user.id, 'scan_investigation');
        const rateLimitResult = rateLimit(limitKey, limitOptions);

        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Rate limit exceeded. Upgrade to Pro for more daily scans.' }, { status: 429 });
        }

        // 0. Deduplication - Clear previous scan data for this investigation
        await prisma.evidence.deleteMany({ where: { investigationId } });
        await prisma.searchLog.deleteMany({ where: { investigationId } });
        await prisma.report.deleteMany({ where: { investigationId } });
        await prisma.entity.deleteMany({ where: { investigationId } });

        // Update status to active
        await prisma.investigation.update({
            where: { id: investigationId },
            data: { status: 'active' },
        });

        const gatheredEvidence: any[] = [];
        const correlatedIdentifiers = {
            emails: new Set<string>(),
            crypto: new Set<string>(),
            usernames: new Set<string>()
        };

        // Extraction helper
        const extractIdentifiers = (text: string) => {
            const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
            const btc = text.match(/\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}\b/g) || [];
            const eth = text.match(/\b0x[a-fA-F0-9]{40}\b/g) || [];

            emails.forEach(e => correlatedIdentifiers.emails.add(e.toLowerCase()));
            [...btc, ...eth].forEach(c => correlatedIdentifiers.crypto.add(c));
        };

        // Safe connector wrapper — ensures a single connector crash never kills the scan
        const safeRun = async (label: string, fn: () => Promise<any>) => {
            try {
                const result = await fn();
                if (result?.results) {
                    for (const res of result.results) {
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
                gatheredEvidence.push({
                    title: `System Trace — ${label} Error`,
                    content: `Connector "${label}" encountered an error during execution: ${err?.message || 'Unknown error'}`,
                    sourceUrl: '#',
                    type: 'url',
                    tags: 'system',
                });
            }
        };

        // ========== PHASE 1: Primary Intelligence Sweep (Parallel) ==========
        const phase1: Promise<void>[] = [];

        // Username Search (incl. active HTML scraping)
        if (investigation.subjectUsername) {
            phase1.push(safeRun('Username Search', () => usernameSearch(investigation.subjectUsername)));
        }

        // Google Dorks + Wikipedia
        const dorkQuery = investigation.subjectEmail || investigation.subjectUsername || investigation.subjectName;
        if (dorkQuery) {
            phase1.push(safeRun('Google Dork', () => googleDorks({
                name: investigation.subjectName || undefined,
                username: investigation.subjectUsername || undefined,
                email: investigation.subjectEmail || undefined
            })));
        }

        // Domain Search
        const domainMatch = investigation.subjectDomain || investigation.subjectEmail?.split('@')[1];
        if (domainMatch && domainMatch !== 'gmail.com' && domainMatch !== 'yahoo.com' && domainMatch !== 'hotmail.com') {
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

        // Run all Phase 1 connectors in parallel
        await Promise.allSettled(phase1);

        // ========== PHASE 2: Deep Digging — Correlated Identifiers ==========
        const phase2: Promise<void>[] = [];

        // Correlated Breach Analysis (new emails found during Phase 1)
        for (const email of correlatedIdentifiers.emails) {
            if (email === investigation.subjectEmail) continue;
            phase2.push(safeRun(`Correlated Breach: ${email}`, () => breachSearch(email)));
        }

        // Correlated Crypto Analysis (Pro Only)
        if (isPro) {
            for (const address of correlatedIdentifiers.crypto) {
                phase2.push(safeRun(`Correlated Crypto: ${address.substring(0, 8)}`, () => cryptoSearch(address)));
            }
        }

        // Pro Features: Dark Web + Crypto
        if (isPro) {
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
        // Save gathered evidence to DB (even if AI fails later)
        if (gatheredEvidence.length > 0) {
            await prisma.evidence.createMany({
                data: gatheredEvidence.map(e => ({ ...e, investigationId }))
            });
        }

        // AI Synthesis — wrapped safely so evidence is still saved if AI fails
        let summary = '';
        try {
            summary = await summarizeFindings(investigation.title, gatheredEvidence, customApiKey) || '';
        } catch (aiErr: any) {
            console.error('[SCAN] AI Synthesis failed:', aiErr?.message);
            summary = `### AI Synthesis Error\n\nThe scan completed and found ${gatheredEvidence.length} evidence items, but the AI synthesis engine returned an error: ${aiErr?.message || 'Unknown'}.\n\nYou can still review all evidence in the Evidence tab.`;
        }

        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Dossier — ${new Date().toLocaleDateString()}`,
                content: summary || `### Scan Complete\n\nFound ${gatheredEvidence.length} evidence items across all OSINT sources. Review them in the Evidence tab.`,
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
            message: `Scan completed. Found ${gatheredEvidence.length} evidence items. Correlated ${correlatedIdentifiers.emails.size} emails and ${correlatedIdentifiers.crypto.size} crypto addresses.`,
            resultsCount: {
                evidence: gatheredEvidence.length,
                emailsFound: correlatedIdentifiers.emails.size,
                cryptoFound: correlatedIdentifiers.crypto.size
            }
        });

    } catch (error: any) {
        console.error('Scan failed:', error);

        // CRITICAL: Always try to set status to 'closed' so the UI doesn't get stuck at ACTIVE
        try {
            await prisma.investigation.update({
                where: { id: investigationId },
                data: { status: 'closed' },
            });
        } catch { /* nothing we can do */ }

        return NextResponse.json({ error: 'Scan engine failed', details: error?.message }, { status: 500 });
    }
}
