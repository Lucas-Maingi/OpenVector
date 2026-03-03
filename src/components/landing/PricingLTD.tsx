"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles, User, Shield, Zap, MessageSquare, Repeat } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PricingLTD() {
    const [loading, setLoading] = useState(false);
    const [seatsRemaining, setSeatsRemaining] = useState(7); // Started with 30, now 7 for "limited" feel

    const handlePurchase = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/checkout", { method: "POST" });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Failed to initiate checkout");
            }
        } catch (error) {
            console.error(error);
            alert("Checkout failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section id="pricing" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Founding Analyst Lifetime Access</h2>
                    <p className="text-text-secondary text-lg">Global launch price: $49/mo. Your price: $99 once.</p>
                </div>

                <div className="relative group p-1 rounded-[24px] bg-gradient-to-br from-accent/40 via-border to-transparent shadow-2xl">
                    <div className="bg-surface rounded-[22px] p-8 md:p-12 overflow-hidden relative">
                        {/* Decorative background logo */}
                        <Shield className="absolute -bottom-10 -right-10 w-64 h-64 text-accent/5 -rotate-12" />

                        <div className="flex flex-col md:flex-row gap-12 relative z-10">
                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-accent" />
                                        Lifetime Pro Bundle
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        One-time investment. Decades of intelligence acceleration.
                                        Locked-in early status for the most advanced OSINT workspace.
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    <PricingFeature icon={<Zap />} text="Lifetime Pro Access" />
                                    <PricingFeature icon={<Repeat />} text="All core future updates included" />
                                    <PricingFeature icon={<Shield />} text="Unlimited investigations" />
                                    <PricingFeature icon={<User />} text="Priority feature input" />
                                    <PricingFeature icon={<MessageSquare />} text="Direct founder communication" />
                                </ul>
                            </div>

                            <div className="md:w-80 flex flex-col justify-center items-center text-center p-8 bg-background/50 rounded-2xl border border-border">
                                <div className="mb-4">
                                    <span className="text-sm font-mono text-text-muted line-through">$588/year</span>
                                    <div className="text-6xl font-black mt-1">$99</div>
                                    <span className="text-xs font-mono text-text-tertiary uppercase tracking-widest mt-2 block">One-time payment</span>
                                </div>

                                <div className="w-full h-2 bg-background border border-border rounded-full mb-4 overflow-hidden">
                                    <div
                                        className="h-full bg-accent transition-all duration-1000"
                                        style={{ width: `${(30 - seatsRemaining) / 30 * 100}%` }}
                                    />
                                </div>
                                <div className="text-xs font-mono text-accent mb-8 uppercase tracking-widest">
                                    Only {seatsRemaining} seats available
                                </div>

                                <Button
                                    className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-glow"
                                    onClick={handlePurchase}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        "Secure Lifetime Access"
                                    )}
                                </Button>
                                <p className="text-[10px] text-text-muted mt-4 uppercase tracking-tighter">
                                    No recurring fees. Ever.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PricingFeature({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <li className="flex items-center gap-3 text-text-secondary">
            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                {icon}
            </div>
            <span className="text-sm">{text}</span>
            <Check className="w-4 h-4 text-success ml-auto" />
        </li>
    );
}
