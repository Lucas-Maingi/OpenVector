import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const email = session.customer_details?.email;
            if (email) {
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
            }
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, status: session.payment_status });
    } catch (error: any) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
