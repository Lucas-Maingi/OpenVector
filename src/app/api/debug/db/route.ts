import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    
    try {
        const start = Date.now();
        // Check DB reachable
        const userCount = await prisma.user.count();
        
        // Ensure guest exists
        const guest = await prisma.user.upsert({
            where: { id: GUEST_ID },
            update: { updatedAt: new Date() },
            create: {
                id: GUEST_ID,
                email: 'guest@openvector.io',
                role: 'guest'
            }
        });
        
        const duration = Date.now() - start;
        
        // Fetch latest system activity
        const latestLogs = await prisma.searchLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { connectorType: true, query: true, createdAt: true, investigationId: true }
        });

        const latestEvidence = await prisma.evidence.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { title: true, type: true, createdAt: true, investigationId: true }
        });

        const counts = {
            users: userCount,
            logs: await prisma.searchLog.count(),
            evidence: await prisma.evidence.count(),
            investigations: await prisma.investigation.count()
        };
        
        return NextResponse.json({
            status: 'healthy',
            database: 'connected',
            counts,
            latestActivity: {
                logs: latestLogs,
                evidence: latestEvidence
            },
            guestStatus: guest ? 'synchronized' : 'failed',
            latency: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    } catch (err: any) {
        return NextResponse.json({
            status: 'degraded',
            database: 'unreachable',
            error: err.message,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
