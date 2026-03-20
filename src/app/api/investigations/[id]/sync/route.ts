import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const investigationId = params.id;
    const user = await getEffectiveUserId();
    const userId = user.id;

    try {
        // 1. Log the sync trigger so the user sees it in the terminal
        await prisma.searchLog.create({
            data: {
                investigationId,
                userId,
                connectorType: 'system',
                query: '🔄 [RESYNC] Synchronizing local terminal with intelligence core...',
                resultCount: 0
            }
        }).catch(() => {});

        // 2. Fetch latest state
        const investigation = await prisma.investigation.findUnique({
            where: { id: investigationId },
            include: {
                logs: { orderBy: { createdAt: 'asc' } },
                evidence: { orderBy: { createdAt: 'desc' }, take: 100 },
                entities: true
            }
        });

        if (!investigation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            status: (investigation as any).status,
            logs: (investigation as any).logs,
            evidence: (investigation as any).evidence,
            entities: (investigation as any).entities
        });

    } catch (error: any) {
        console.error('[SYNC] Failure:', error.message);
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
