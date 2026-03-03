import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function SuccessAction(sessionId: string) {
    if (!sessionId) return;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid") return;

        const email = session.customer_details?.email;
        if (!email) return;

        // Update or create user with lifetime access
        await prisma.user.upsert({
            where: { email },
            update: {
                hasLifetimeAccess: true,
                plan: "lifetime",
                stripeCustomerId: session.customer as string,
            },
            create: {
                email,
                hasLifetimeAccess: true,
                plan: "lifetime",
                stripeCustomerId: session.customer as string,
            },
        });
    } catch (error) {
        console.error("Success verification failed:", error);
    }
}
