import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { usernameSearch, googleDorks, domainSearch, breachSearch, reverseImageSearch, darkWebSearch } from '@/connectors';
import { summarizeFindings } from '@/lib/ai';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: investigationId } = await params;
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
        const investigation = await prisma.investigation.findUnique({
            where: { id: investigationId, userId: user.id },
        });

        if (!investigation) {
            return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
        }

        const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
        const isPro = userRecord?.plan === 'pro' || userRecord?.plan === 'lifetime';

        // Rate Limiting: 50 per 24h for free, 500 per 24h for pro
        const limitOptions = { limit: isPro ? 500 : 50, windowMs: 86400000 };
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

        // 1. Username Search
        if (investigation.subjectUsername) {
            const searchResult = await usernameSearch(investigation.subjectUsername);
            await prisma.searchLog.create({
                data: {
                    investigationId,
                    userId: user.id,
                    connectorType: 'username_search',
                    query: investigation.subjectUsername,
                    resultCount: searchResult.results.length,
                }
            });

            for (const res of searchResult.results) {
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
                gatheredEvidence.push({
                    title: res.title,
                    content: res.description || '',
                    sourceUrl: res.url,
                    type: 'url',
                    tags: ['google_dork', res.category || 'general'].join(','),
                });
            }
        }

        // 3. Breach Search
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
        const domainMatch = investigation.subjectEmail?.split('@')[1];
        if (domainMatch) {
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

        // 6. Dark Web Scraper (PRO ONLY FEATURE)
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
        }

        // Save gathered evidence to DB
        if (gatheredEvidence.length > 0) {
            await prisma.evidence.createMany({
                data: gatheredEvidence.map(e => ({ ...e, investigationId }))
            });
        }

        // 7. AI Intelligence Synthesis
        const customApiKey = request.headers.get('x-openai-key') || undefined;
        const summary = await summarizeFindings(investigation.title, gatheredEvidence, customApiKey);
        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Summary — ${new Date().toLocaleDateString()}`,
                content: summary || 'AI analysis could not be generated.',
                format: 'markdown'
            }
        });

        // 8. Real-time Notification
        await (prisma as any).notification.create({
            data: {
                userId: user.id,
                title: 'Scan Complete',
                message: `Intelligence sweep for "${investigation.title}" discovered ${gatheredEvidence.length} vectors.`,
                type: gatheredEvidence.some(e => e.tags.includes('dark_web') || e.tags.includes('breach')) ? 'warning' : 'info'
            }
        });

        // 7. Entity Extraction (Simple heuristic for finalized feel)
        const commonNames = ['User', 'Profile', 'Account', 'Analyst'];
        const extractedValues = new Set<string>();

        for (const ev of gatheredEvidence) {
            if (ev.title.includes(' — ') || ev.title.includes(': ')) {
                const parts = ev.title.split(/ — |: /);
                const entityValue = parts[1]?.trim();
                const entityType = parts[0]?.trim();

                if (entityValue && !commonNames.includes(entityValue) && !extractedValues.has(entityValue)) {
                    extractedValues.add(entityValue);
                    await prisma.entity.create({
                        data: {
                            investigationId,
                            value: entityValue,
                            type: entityType === 'GitHub' ? 'developer' : 'social_node',
                        }
                    });
                }
            }
        }

        // Update status back to closed
        await prisma.investigation.update({
            where: { id: investigationId },
            data: { updatedAt: new Date(), status: 'closed' },
        });

        return NextResponse.json({
            success: true,
            message: `Scanned completed. Found ${gatheredEvidence.length} evidence items and generated AI synthesis.`,
            resultsCount: { evidence: gatheredEvidence.length, entities: 0 }
        });

    } catch (error) {
        console.error('Scan failed:', error);
        return NextResponse.json({ error: 'Scan engine failed' }, { status: 500 });
    }
}
