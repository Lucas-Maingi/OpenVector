import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // In a real flow, we might want to pass the plan or have a hardcoded price ID
        // For this LTD, we'll use a one-time payment of $99

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "OpenVector Founding Analyst – Lifetime",
                            description: "Lifetime Pro access, all future updates, priority feature input.",
                        },
                        unit_amount: 9900, // $99.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/cancel`,
            customer_email: user?.email || undefined,
            metadata: {
                userId: user?.id || "guest",
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
