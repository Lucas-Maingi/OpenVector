"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingLTD() {
    return (
        <section id="pricing" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Intelligence at Scale</h2>
                    <p className="text-text-secondary text-lg">Choose the right power level for your investigations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Free Tier */}
                    <PricingCard
                        title="Community"
                        price="Free"
                        description="For hobbyists and open-source contributors."
                        features={[
                            "Up to 100 basic sweeps per day",
                            "Bring Your Own Key (BYOK) for AI",
                            "Native Node.js DNS/Username sweeps",
                            "Community Discord support"
                        ]}
                        buttonText="Start for Free"
                        buttonVariant="outline"
                    />

                    {/* Pro Tier */}
                    <PricingCard
                        title="Investigator Pro"
                        price="$49/mo"
                        description="For serious researchers and private investigators."
                        isPopular
                        features={[
                            "100 Managed AI Syntheses (No key needed)",
                            "Unlocked Premium Data (Dehashed passwords)",
                            "Historical DNS Footprinting",
                            "Priority scan orchestration",
                        ]}
                        buttonText="Upgrade to Pro"
                        buttonVariant="primary"
                    />

                    {/* Corporate Tier */}
                    <PricingCard
                        title="Corporate Team"
                        price="$149/mo"
                        description="For SOCs and corporate security teams."
                        features={[
                            "Deep Dark Web Scraping APIs",
                            "Mass investigation exports (PDF/CSV)",
                            "Team collaboration & shared workspaces",
                            "Dedicated account manager",
                        ]}
                        buttonText="Contact Sales"
                        buttonVariant="outline"
                    />
                </div>
            </div>
        </section>
    );
}

function PricingCard({
    title, price, description, features, buttonText, buttonVariant, isPopular
}: {
    title: string, price: string, description: string, features: string[], buttonText: string, buttonVariant: "primary" | "outline", isPopular?: boolean
}) {
    return (
        <div className={`relative p-8 rounded-2xl bg-surface border transition-transform ${isPopular ? 'border-accent shadow-glow scale-105 z-10' : 'border-white/5 hover:border-white/10'} flex flex-col h-full`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    Most Popular
                </div>
            )}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-text-secondary text-sm h-10">{description}</p>
                <div className="mt-6 text-4xl font-black">{price}</div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                variant={buttonVariant}
                className={`w-full ${buttonVariant === 'primary' ? 'shadow-glow hover:bg-accent-hover text-white' : 'border-white/10 hover:bg-white/5'}`}
            >
                {buttonText}
            </Button>
        </div>
    );
}
