import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';
import { usernameSearch, domainSearch, googleDorks, reverseImageSearch, breachSearch } from '@/connectors';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate Limiting: 20 searches per minute
    const limitKey = getRateLimitKey(user.id, 'run_search');
    const rateLimitResult = rateLimit(limitKey, { limit: 20, windowMs: 60000 });

    if (!rateLimitResult.success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    try {
        const p = await params;
        const investigationId = p.id;
        const body = await request.json();
        const { connectorType, query } = body;

        // Verify investigation owns
        const inv = await prisma.investigation.findUnique({
            where: { id: investigationId, userId: user.id }
        });

        if (!inv) {
            return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
        }

        let result;

        switch (connectorType) {
            case 'username_search':
                result = usernameSearch(query);
                break;
            case 'domain_search':
                result = domainSearch(query);
                break;
            case 'google_dork':
                result = googleDorks(query); // query should be object in this case
                break;
            case 'reverse_image':
                result = reverseImageSearch(query);
                break;
            case 'breach_search':
                result = breachSearch(query);
                break;
            default:
                return NextResponse.json({ error: 'Invalid connector type' }, { status: 400 });
        }

        // Attempt to log search asynchronously, don't await blocking the response
        const dbConnectorType = connectorType === 'google_dork' ? 'google_dork' :
            connectorType === 'reverse_image' ? 'reverse_image' :
                connectorType === 'domain_search' ? 'domain_search' :
                    connectorType === 'username_search' ? 'username_search' :
                        connectorType === 'breach_search' ? 'breach_search' : 'username_search';

        prisma.searchLog.create({
            data: {
                userId: user.id,
                investigationId,
                connectorType: dbConnectorType as any,
                query: typeof query === 'string' ? query : JSON.stringify(query),
                resultCount: result.results.length,
            }
        }).catch(err => console.error('Failed to write search log:', err));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
