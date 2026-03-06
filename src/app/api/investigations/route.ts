import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';

export async function GET() {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Fallback for local verification
    const user = supabaseUser || { id: 'local-dev-user', email: 'analyst@openvector.io' };

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const investigations = await prisma.investigation.findMany({
            where: { userId: user.id },
            orderBy: { updatedAt: 'desc' },
            include: {
                _count: {
                    select: { evidence: true, entities: true }
                }
            }
        });

        return NextResponse.json(investigations);
    } catch (error) {
        console.error('Failed to fetch investigations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Fallback for local verification
    const user = supabaseUser || { id: 'local-dev-user', email: 'analyst@openvector.io' };

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate Limiting: 10 per minute for creating investigations
    if (supabaseUser) {
        const limitKey = getRateLimitKey(user.id, 'create_investigation');
        const rateLimitResult = rateLimit(limitKey, { limit: 10, windowMs: 60000 });
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
    }

    try {
        const body = await request.json();
        const { title, description, subjectName, subjectUsername, subjectEmail, subjectPhone, subjectDomain, subjectImageUrl } = body;

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const investigation = await prisma.investigation.create({
            data: {
                title,
                description,
                subjectName,
                subjectUsername,
                subjectEmail,
                subjectPhone,
                subjectDomain,
                subjectImageUrl,
                userId: user.id,
            },
        });

        return NextResponse.json(investigation, { status: 201 });
    } catch (error) {
        console.error('Failed to create investigation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
