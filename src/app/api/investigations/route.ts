import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { getRateLimitKey, rateLimit } from '@/lib/rate-limit';

// Consistent guest ID across the entire app
const GUEST_ID = '00000000-0000-0000-0000-000000000000';

async function ensureUserExists(userId: string, email: string) {
    await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: { id: userId, email },
    });
}

export async function GET() {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    const user = supabaseUser || { id: GUEST_ID, email: 'guest@openvector.io' };

    try {
        await ensureUserExists(user.id, user.email ?? 'guest@openvector.io');

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
        return NextResponse.json({ error: 'Internal Server Error', detail: String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    const user = supabaseUser || { id: GUEST_ID, email: 'guest@openvector.io' };

    // Rate Limiting: 10 per minute for creating investigations
    if (supabaseUser) {
        const limitKey = getRateLimitKey(user.id, 'create_investigation');
        const rateLimitResult = rateLimit(limitKey, { limit: 10, windowMs: 60000 });
        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
        }
    }

    try {
        const body = await request.json();
        const { title, description, subjectName, subjectUsername, subjectEmail, subjectPhone, subjectDomain, subjectImageUrl } = body;

        if (!title?.trim()) {
            return NextResponse.json({ error: 'Investigation title is required.' }, { status: 400 });
        }

        // Ensure the user record exists before creating the investigation (guest mode support)
        await ensureUserExists(user.id, user.email ?? 'guest@openvector.io');

        // Build data object — only include new columns if they're actually in the schema
        // This protects against column-not-found errors if prisma db push hasn't run yet
        const baseData = {
            title: title.trim(),
            description: description?.trim() || null,
            subjectName: subjectName?.trim() || null,
            subjectUsername: subjectUsername?.trim() || null,
            subjectEmail: subjectEmail?.trim() || null,
            subjectPhone: subjectPhone?.trim() || null,
            userId: user.id,
        };

        let investigation;
        try {
            investigation = await prisma.investigation.create({
                data: {
                    ...baseData,
                    subjectDomain: subjectDomain?.trim() || null,
                    subjectImageUrl: subjectImageUrl?.trim() || null,
                },
            });
        } catch (schemaErr: any) {
            // Column doesn't exist yet — fall back to base fields only
            if (schemaErr?.message?.includes('subjectDomain') || schemaErr?.message?.includes('subjectImageUrl')) {
                investigation = await prisma.investigation.create({ data: baseData });
            } else {
                throw schemaErr;
            }
        }

        return NextResponse.json(investigation, { status: 201 });
    } catch (error: any) {
        console.error('Failed to create investigation:', error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}
