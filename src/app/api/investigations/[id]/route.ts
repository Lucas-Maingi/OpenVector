import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId, validateOwnership } from '@/lib/auth-utils';
import { isValidUuid } from '@/lib/security';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getEffectiveUserId();
    const { id } = await params;

    if (!isValidUuid(id)) {
        return NextResponse.json({ error: 'Invalid identifier format' }, { status: 400 });
    }

    try {
        const investigation = await prisma.investigation.findUnique({
            where: { id },
            include: {
                entities: true,
                evidence: { orderBy: { createdAt: 'desc' }, take: 100 },
                logs: { orderBy: { createdAt: 'asc' }, take: 500 },
                _count: { select: { evidence: true, entities: true } },
            }
        });

        if (!investigation) {
            return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
        }

        // STRICT OWNERSHIP CHECK (Dossier v18)
        if (investigation.userId !== user.id) {
            console.warn(`[Security] Unauthorized access attempt by ${user.id} on ${id}`);
            return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }

        return NextResponse.json(investigation);
    } catch (error) {
        console.error('[API] Investigation fetch failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getEffectiveUserId();
    const { id } = await params;

    try {
        const isOwner = await validateOwnership(id, user.id);
        if (!isOwner) {
            return NextResponse.json({ error: 'Unauthorized or not found' }, { status: 403 });
        }

        const body = await request.json();
        // Prevent users from overwriting the owner/userId
        const { userId: _, ...safeBody } = body;

        const investigation = await prisma.investigation.update({
            where: { id },
            data: safeBody,
        });

        return NextResponse.json(investigation);
    } catch (error) {
        console.error('[API] Investigation update failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getEffectiveUserId();
    const { id } = await params;

    try {
        const isOwner = await validateOwnership(id, user.id);
        if (!isOwner) {
            return NextResponse.json({ error: 'Unauthorized or not found' }, { status: 403 });
        }

        // Cascade delete all related data explicitly if DB doesn't handle natively
        // (Our schema has onDelete: Cascade, but we'll prune logs manually for speed)
        await prisma.$transaction([
            prisma.evidence.deleteMany({ where: { investigationId: id } }),
            prisma.report.deleteMany({ where: { investigationId: id } }),
            prisma.entity.deleteMany({ where: { investigationId: id } }),
            prisma.searchLog.deleteMany({ where: { investigationId: id } }),
            prisma.investigation.delete({ where: { id } }),
        ]);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[API] Investigation deletion failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
