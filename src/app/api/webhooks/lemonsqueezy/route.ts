import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-signature') || '';
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

        // Verify webhook signature
        const hmac = crypto.createHmac('sha256', secret);
        const digest = hmac.update(body).digest('hex');

        if (signature !== digest) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const data = JSON.parse(body);
        const eventName = data.meta.event_name;
        const customData = data.meta.custom_data;

        if (eventName === 'order_created') {
            const userId = customData.user_id;
            const variantId = data.data.attributes.variant_id.toString();

            // Determine role based on variant (You can map these to your specific variant IDs)
            // Example: "12345" -> "pro", "67890" -> "enterprise"
            let role = 'pro';
            
            // Look up user and update
            await prisma.user.update({
                where: { id: userId },
                data: {
                    role: role,
                    hasLifetimeAccess: true,
                },
            });

            // Log the success
            console.log(`User ${userId} upgraded to ${role} via Lemon Squeezy`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Lemon Squeezy Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
