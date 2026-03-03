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
        const { id } = await params;
        const investigation = await prisma.investigation.findUnique({
            where: { id, userId: user.id },
            include: {
                reports: { orderBy: { createdAt: 'desc' }, take: 1 },
                evidence: true,
            }
        });

        if (!investigation) {
            return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
        }

        const report = investigation.reports[0];
        const content = report
            ? report.content
            : `Investigation: ${investigation.title}\nStatus: ${investigation.status}\n\nEvidence Collected: ${investigation.evidence.length}\n\nNo detailed AI report generated yet.`;

        const filename = `${investigation.title.replace(/\s+/g, '_')}_Report.md`;

        return new NextResponse(content, {
            headers: {
                'Content-Type': 'text/markdown',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Export failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
