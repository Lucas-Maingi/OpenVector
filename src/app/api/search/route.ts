import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { getEffectiveUserId } from '@/lib/auth-utils';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json([]);
        }

        const user = await getEffectiveUserId();

        const results = await prisma.investigation.findMany({
            where: {
                userId: user.id,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { subjectName: { contains: query, mode: 'insensitive' } },
                    { subjectUsername: { contains: query, mode: 'insensitive' } },
                    { subjectEmail: { contains: query, mode: 'insensitive' } }
                ]
            },
            select: {
                id: true,
                title: true,
                status: true,
                _count: { select: { evidence: true } }
            },
            take: 8,
            orderBy: {
                updatedAt: 'desc'
            }
        });

        // Add calculated risk based on evidence count
        const enhancedResults = results.map(r => ({
            ...r,
            leads: r._count.evidence,
            risk: r._count.evidence > 10 ? 'critical' : r._count.evidence > 5 ? 'elevated' : 'stable'
        }));

        return NextResponse.json(enhancedResults);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Failed to execute search' }, { status: 500 });
    }
}
