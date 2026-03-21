import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Test DB connection
        const dbStatus = await prisma.$queryRaw`SELECT 1`.then(() => 'online').catch(() => 'degraded');
        
        return NextResponse.json({
            status: 'operational',
            engines: {
                database: dbStatus,
                osint: 'online',
                ai: 'online'
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            status: 'degraded',
            error: 'System core communication failure'
        }, { status: 500 });
    }
}
