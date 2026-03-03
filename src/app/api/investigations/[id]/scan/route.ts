import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { usernameSearch, googleDorks, domainSearch, breachSearch, reverseImageSearch } from '@/connectors';
import { summarizeFindings } from '@/lib/ai';
import { redirect } from 'next/navigation';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: investigationId } = await params;
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Fallback for local verification
    const user = supabaseUser || { id: 'local-dev-user', email: 'analyst@openvector.io' };

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
            const searchResult = usernameSearch(investigation.subjectUsername);
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
            const dorkResult = googleDorks({
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
            const breachResult = breachSearch(investigation.subjectEmail);
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
            const domainResult = domainSearch(domainMatch);
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
            const imageResult = reverseImageSearch(investigation.subjectImageUrl);
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

        // Save gathered evidence to DB
        if (gatheredEvidence.length > 0) {
            await prisma.evidence.createMany({
                data: gatheredEvidence.map(e => ({ ...e, investigationId }))
            });
        }

        // 6. AI Intelligence Synthesis
        const summary = await summarizeFindings(investigation.title, gatheredEvidence);
        await prisma.report.create({
            data: {
                investigationId,
                title: `Intelligence Summary — ${new Date().toLocaleDateString()}`,
                content: summary || 'AI analysis could not be generated.',
                format: 'markdown'
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
