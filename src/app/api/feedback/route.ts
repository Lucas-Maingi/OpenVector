import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        const body = await req.json();
        const { content, type, version } = body;

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                content,
                type: type || 'general',
                version: version || '1.0.0',
                userId: user?.id || null, // Allow anonymous feedback if not logged in
            },
        });

        return NextResponse.json({ success: true, feedback });
    } catch (error) {
        console.error('Feedback Submission Error:', error);
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}
