import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const p = await params;
        const investigation = await prisma.investigation.findUnique({
            where: { id: p.id, userId: user.id },
            include: {
                entities: true,
                evidence: { orderBy: { createdAt: 'desc' } },
                logs: { orderBy: { createdAt: 'desc' }, take: 20 },
            }
        });

        if (!investigation) {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json(investigation);
    } catch (error) {
        console.error('Failed to fetch investigation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const p = await params;
        const body = await request.json();

        const investigation = await prisma.investigation.update({
            where: { id: p.id, userId: user.id },
            data: body,
        });

        return NextResponse.json(investigation);
    } catch (error) {
        console.error('Failed to update investigation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const p = await params;
        await prisma.investigation.delete({
            where: { id: p.id, userId: user.id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Failed to delete investigation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
