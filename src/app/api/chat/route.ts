import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

const GUEST_ID = '00000000-0000-0000-0000-000000000000';

function detectInputType(value: string): {
    type: 'email' | 'domain' | 'phone' | 'crypto_btc' | 'crypto_eth' | 'username' | 'name';
    parsed: {
        subjectName?: string;
        subjectEmail?: string;
        subjectUsername?: string;
        subjectDomain?: string;
        subjectPhone?: string;
    };
} {
    const v = value.trim();
    if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}$/.test(v))
        return { type: 'crypto_btc', parsed: { subjectUsername: v } };
    if (/^0x[a-fA-F0-9]{40}$/i.test(v))
        return { type: 'crypto_eth', parsed: { subjectUsername: v } };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return { type: 'email', parsed: { subjectEmail: v } };
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v))
        return { type: 'domain', parsed: { subjectDomain: v } };
    if (/^\+?[0-9\s-]{8,}$/.test(v))
        return { type: 'phone', parsed: { subjectPhone: v } };
    if (v.includes(' '))
        return { type: 'name', parsed: { subjectName: v } };
    return { type: 'username', parsed: { subjectUsername: v } };
}

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    const user = supabaseUser || { id: GUEST_ID, email: 'guest@aletheia.intel' };

    try {
        const body = await req.json();
        const { message, imageUrl } = body as { message?: string; imageUrl?: string };

        if (!message?.trim() && !imageUrl) {
            return NextResponse.json({ error: 'Please provide a query or image.' }, { status: 400 });
        }

        // Ensure user exists
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: { id: user.id, email: user.email || '' },
        });

        // Detect input type
        const query = message?.trim() || '';
        const detection = query ? detectInputType(query) : null;

        const title = query
            ? `Chat: ${query.slice(0, 60)}`
            : `Chat: Image Analysis`;

        // Create the investigation
        const investigation = await prisma.investigation.create({
            data: {
                title,
                description: `Initiated via Aletheia Chat interface`,
                userId: user.id,
                subjectName: detection?.parsed.subjectName || null,
                subjectEmail: detection?.parsed.subjectEmail || null,
                subjectUsername: detection?.parsed.subjectUsername || null,
                subjectDomain: detection?.parsed.subjectDomain || null,
                subjectPhone: detection?.parsed.subjectPhone || null,
                subjectImageUrl: imageUrl || null,
            },
        });

        // Fire the scan (non-blocking)
        const scanUrl = new URL(`/api/investigations/${investigation.id}/scan`, req.url);
        const geminiKey = req.headers.get('x-gemini-key');
        const scanHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
        if (geminiKey) scanHeaders['x-gemini-key'] = geminiKey;

        fetch(scanUrl.toString(), {
            method: 'POST',
            headers: scanHeaders,
        }).catch(() => { /* fire-and-forget */ });

        return NextResponse.json({
            investigationId: investigation.id,
            detectedType: detection?.type || 'image',
            title,
        }, { status: 201 });
    } catch (error: any) {
        console.error('[Chat API] Error:', error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}
