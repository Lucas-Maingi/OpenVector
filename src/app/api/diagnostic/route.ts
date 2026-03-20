import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';

/**
 * SESSION DIAGNOSTIC API
 * Helps debug "Identity Displacement" between guest sessions.
 */
export async function GET() {
    try {
        const user = await getEffectiveUserId();
        
        // Find all investigations owned by THIS user
        const myInvestigations = await prisma.investigation.findMany({
            where: { userId: user.id },
            select: { id: true, title: true, userId: true, createdAt: true }
        });

        // Find orphaned investigations (guest investigations that might be lost)
        // We'll just look for some recent ones to compare
        const recentInvestigations = await prisma.investigation.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, title: true, userId: true, createdAt: true }
        });

        return NextResponse.json({
            currentSession: {
                id: user.id,
                isGuest: user.isGuest,
                email: user.email
            },
            ownedCount: myInvestigations.length,
            recentTotal: recentInvestigations.length,
            recentSamples: recentInvestigations.map(inv => ({
                id: inv.id,
                title: inv.title,
                ownerMatch: inv.userId === user.id,
                ownerId: inv.userId
            }))
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
