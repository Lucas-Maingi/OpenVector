import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { usernameSearch, googleDorks, domainSearch, breachSearch, reverseImageSearch, darkWebSearch, interpolSearch, cryptoSearch } from '@/connectors';
import { summarizeFindings } from '@/lib/ai';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';

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

        // 1. Initial Intelligence Sweep
        // Username Search
        if (investigation.subjectUsername) {
            const searchResult = await usernameSearch(investigation.subjectUsername);
            for (const res of searchResult.results) {
                if (res.description) extractIdentifiers(res.description);
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: [res.category || 'social'].join(','),
                });
            }
        }

        // 2. Google Dorks
        const dorkQuery = investigation.subjectEmail || investigation.subjectUsername || investigation.subjectName;
        if (dorkQuery) {
            const dorkResult = await googleDorks({
                name: investigation.subjectName || undefined,
                username: investigation.subjectUsername || undefined,
                email: investigation.subjectEmail || undefined
            });
            for (const res of dorkResult.results) {
                if (res.description) extractIdentifiers(res.description);
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['google_dork', res.category || 'general'].join(','),
                });
            }
        }

        // --- DEEP DIGGING PHASE (Correlation Logic) ---
        // Now handle correlated identifiers found during the initial sweep

        // Correlated Breach Analysis
        for (const email of correlatedIdentifiers.emails) {
            if (email === investigation.subjectEmail) continue; // Skip if already scanning primary
            const breachResult = await breachSearch(email);
            for (const res of breachResult.results) {
                gatheredEvidence.push({
                    title: `Correlated Breach: ${email}`,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['breach', 'correlated'].join(','),
                });
            }
        }

        // Correlated Crypto Analysis (Pro Only)
        if (isPro) {
            for (const address of correlatedIdentifiers.crypto) {
                const cryptoResults = await cryptoSearch(address);
                for (const res of cryptoResults.results) {
                    gatheredEvidence.push({
                        title: `Correlated Asset: ${address.substring(0, 8)}...`,
                        content: res.description || '',
                        sourceUrl: res.url,
                        type: 'url',
                        tags: ['crypto', 'correlated', 'financial'].join(','),
                    });
                }
            }
        }

        // 3. Primary Breach Search
        if (investigation.subjectEmail) {
            const breachResult = await breachSearch(investigation.subjectEmail);
            for (const res of breachResult.results) {
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['breach', res.category || 'security'].join(','),
                });
            }
        }

        // 4. Domain Search
        const domainMatch = investigation.subjectDomain || investigation.subjectEmail?.split('@')[1];
        if (domainMatch && domainMatch !== 'gmail.com' && domainMatch !== 'yahoo.com' && domainMatch !== 'hotmail.com') {
            const domainResult = await domainSearch(domainMatch);
            for (const res of domainResult.results) {
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['domain', res.category || 'infrastructure'].join(','),
                });
            }
        }

        // 5. Reverse Image Search
        if (investigation.subjectImageUrl) {
            const imageResult = await reverseImageSearch(investigation.subjectImageUrl);
            for (const res of imageResult.results) {
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['image', res.category || 'osint'].join(','),
                });
            }
        }

        // 6. Pro Features
        if (isPro) {
            const darkWebQuery = investigation.subjectEmail || investigation.subjectUsername;
            if (darkWebQuery) {
                const darkWebResults = await darkWebSearch(darkWebQuery);
                for (const res of darkWebResults.results) {
                    gatheredEvidence.push({
                        title: res.title,
                        content: res.description || '',
                        sourceUrl: res.url,
                        type: 'url',
                        tags: ['dark_web', res.category || 'security'].join(','),
                    });
                }
            }

            const cryptoQuery = investigation.subjectUsername || investigation.subjectName || investigation.subjectEmail;
            if (cryptoQuery) {
                const cryptoResults = await cryptoSearch(cryptoQuery);
                for (const res of cryptoResults.results) {
                    gatheredEvidence.push({
                        title: res.title,
                        content: res.description || '',
                        sourceUrl: res.url,
                        type: 'url',
                        tags: ['crypto', 'financial', res.category || 'security'].join(','),
                    });
                }
            }
        }

        // 7. Interpol Search
        const interpolQuery = investigation.subjectName || investigation.subjectUsername;
        if (interpolQuery) {
            const interpolResult = await interpolSearch({
                name: investigation.subjectName || undefined,
                username: investigation.subjectUsername || undefined
            });
            for (const res of interpolResult.results) {
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['sanctions', 'criminal', res.category || 'security'].join(','),
                });
            }
        }

        // Save gathered evidence to DB
        if (gatheredEvidence.length > 0) {
            await prisma.evidence.createMany({
                data: gatheredEvidence.map(e => ({ ...e, investigationId }))
            });
        }

        // Update counts for real-time reporting
        await prisma.investigation.update({
            where: { id: investigationId },
            data: { status: 'active' },
        });

        // --- 5. AI Synthesis ---
        const summary = await summarizeFindings(investigation.title, gatheredEvidence, customApiKey);
        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Dossier — ${new Date().toLocaleDateString()}`,
                content: summary || 'AI analysis could not be generated.',
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
            message: `Scanned completed. Autonomous correlation identified ${correlatedIdentifiers.emails.size} linked emails and ${correlatedIdentifiers.crypto.size} linked assets. Found ${gatheredEvidence.length} total evidence items.`,
            resultsCount: {
                evidence: gatheredEvidence.length,
                emailsFound: correlatedIdentifiers.emails.size,
                cryptoFound: correlatedIdentifiers.crypto.size
            }
        });

    } catch (error) {
        console.error('Scan failed:', error);
        return NextResponse.json({ error: 'Scan engine failed' }, { status: 500 });
    }
}
