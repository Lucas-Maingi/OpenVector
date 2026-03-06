import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json([]);
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // In a real app we'd enforce user constraints, but for local/demo let's just search
        const results = await prisma.investigation.findMany({
            where: {
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
            },
            take: 5,
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Failed to execute search' }, { status: 500 });
    }
}
