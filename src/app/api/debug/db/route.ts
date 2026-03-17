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
        
        return NextResponse.json({
            status: 'healthy',
            database: 'connected',
            userCount,
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
