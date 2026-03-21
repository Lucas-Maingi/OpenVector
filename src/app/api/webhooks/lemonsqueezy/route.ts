import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-signature");
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

        // Secure handling of missing env vars during test loads
        if (!secret) {
            console.warn("[BILLING] Missing LEMON_SQUEEZY_WEBHOOK_SECRET");
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        if (!signature) {
            return NextResponse.json({ error: "Missing signature" }, { status: 400 });
        }

        // Verify cryptographic signature to prevent webhook spoofing
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signatureBuffer = Buffer.from(signature, "utf8");

        if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
            console.error("[BILLING] Invalid webhook signature detected");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const payload = JSON.parse(rawBody);
        const eventName = payload.meta.event_name;
        const customData = payload.meta.custom_data;
        const attributes = payload.data.attributes;

        const userId = customData?.user_id;

        if (!userId) {
            console.error("[BILLING] Received webhook but missing user_id in custom_data");
            return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
        }

        const customerId = String(attributes.customer_id);

        if (eventName === "subscription_created" || eventName === "subscription_updated") {
            const status = attributes.status; // e.g. 'active', 'on_trial', 'past_due'
            const subscriptionId = String(payload.data.id);
            const variantId = String(attributes.variant_id);

            // TODO: Match `variantId` against the actual Elite/Enterprise IDs once products are created
            // For now, any active subscription defaults to "pro"
            let newPlan = "pro";
            let newCredits = 50;

            if (status !== 'active' && status !== 'on_trial') {
                newPlan = "free";
                newCredits = 5;
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    plan: newPlan,
                    facialAiCredits: newPlan === "free" ? 5 : newCredits, // Reset or augment credits based on plan
                    lemonSqueezyCustomerId: customerId,
                    lemonSqueezySubscriptionId: subscriptionId
                }
            });
            console.log(`[BILLING] Upgraded user ${userId} to ${newPlan}`);

        } else if (eventName === 'subscription_expired' || eventName === 'subscription_cancelled') {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    plan: "free",
                    facialAiCredits: 5 // Reset to free allocations
                }
            });
            console.log(`[BILLING] Downgraded user ${userId} to free`);
        }

        return NextResponse.json({ message: "Webhook processed" }, { status: 200 });

    } catch (error: any) {
        console.error("[BILLING] Webhook processing failed:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
