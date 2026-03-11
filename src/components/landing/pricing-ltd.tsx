"use client";

import { Check, Shield, Zap, Globe, Lock, Users, Database, ZapOff, Cloud, FileText, Search, Code, AlertTriangle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingLTD() {
    return (
        <section id="pricing" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent mb-4 tracking-widest uppercase">
                        Limited Founding Member Access
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">Intelligence at Scale</h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Secure lifetime access to ClearDossier's premium orchestration engine before we transition to a monthly SaaS model.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
                    {/* Free Tier */}
                    <PricingCard
                        title="Free Console"
                        price="Free"
                        period="Forever"
                        description="Professional tools for hobbyists and analysts."
                        features={[
                            "Up to 100 basic sweeps per day",
                            "Bring Your Own Key (BYOK) for AI",
                            "Native Node.js DNS/Username sweeps",
                            "Community Access Only",
                            "Standard Evidence Management"
                        ]}
                        buttonText="Start for Free"
                        buttonVariant="outline"
                        href="/dashboard"
                    />

                    {/* Pro Tier */}
                    <PricingCard
                        title="Investigator Pro"
                        price="$99"
                        period="Lifetime"
                        monthlyContext="Regularly $49/mo"
                        description="Managed intelligence for serious researchers."
                        isPopular
                        badge="Founding Member LTD"
                        features={[
                            "Managed AI Syntheses (Gemini 1.5 Pro)",
                            "Signal-to-Noise™ Scoring (H/M/L)",
                            "Chronological Timeline Engine",
                            "Wayback Machine Auto-Archiving",
                            "SHA-256 Provenance Hashing",
                            "Dark Crystal Crypto Tracking",
                            "Interpol Red Notice Scans",
                            "Multi-pass Autonomous Digging",
                            "Pro Export Formats (PDF/JSON)"
                        ]}
                        buttonText="Get Lifetime Pro"
                        buttonVariant="primary"
                        href={process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_LTD_URL || "#"}
                        note="ONE-TIME PAYMENT • FOUNDING ACCESS"
                    />

                    {/* Corporate Tier */}
                    <PricingCard
                        title="Enterprise Team"
                        price="$299"
                        period="Lifetime"
                        monthlyContext="Regularly $149/mo"
                        description="For SOCs and collaborative intelligence teams."
                        badge="Exclusive LTD"
                        features={[
                            "Shared Team Intelligence Graph",
                            "Bulk Vector Enrichment",
                            "Private Data Source Connectors",
                            "Dark Web & Onion Scraping",
                            "API Access & Custom Webhooks",
                            "Dedicated Account Manager",
                            "Priority Signal Orchestration"
                        ]}
                        buttonText="Get Lifetime Team"
                        buttonVariant="outline"
                        href={process.env.NEXT_PUBLIC_LEMON_SQUEEZY_ENTERPRISE_LTD_URL || "#"}
                        note="ONE-TIME PAYMENT • TEAM SCALE"
                    />
                </div>


                {/* Detailed Comparison Table */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="text-2xl md:text-4xl font-bold mb-4">Intelligence Comparison</h3>
                        <p className="text-text-tertiary">See exactly what you're getting at each level.</p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-text-tertiary w-1/3">Core Capability</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-center">Free</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-center text-accent">Pro</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-center">Team</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <TableSectionHeader label="OSINT Engine & Search" />
                                <ComparisonRow label="Automated Search Orchestration" free={true} pro={true} team={true} icon={<Zap className="w-4 h-4" />} />
                                <ComparisonRow label="Autonomous Digging" free={true} pro={true} team={true} icon={<Globe className="w-4 h-4" />} />
                                <ComparisonRow label="GitHub/Social Profile Scraping" free={true} pro={true} team={true} icon={<Code className="w-4 h-4" />} />
                                <ComparisonRow label="Advanced Image File Search" free={false} pro={true} team={true} icon={<Search className="w-4 h-4 text-accent" />} />
                                
                                <TableSectionHeader label="AI & Intelligence Analysis" />
                                <ComparisonRow label="Managed AI Intel Synthesis (1.5 Pro)" free={false} pro={true} team={true} icon={<ZapOff className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="Signal-to-Noise™ Confidence Scoring" free={false} pro={true} team={true} icon={<BarChart3 className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="Chronological Timeline Reconstruction" free={false} pro={true} team={true} icon={<Globe className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="Deep Intelligence Correlation" free={false} pro={true} team={true} icon={<BarChart3 className="w-4 h-4" />} />
                                
                                <TableSectionHeader label="Evidence & Provenance" />
                                <ComparisonRow label="Wayback Machine Auto-Archiving" free={false} pro={true} team={true} icon={<Cloud className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="SHA-256 Provenance Hashing" free={false} pro={true} team={true} icon={<Shield className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="Pro Intelligence Exports (PDF/JSON)" free={false} pro={true} team={true} icon={<FileText className="w-4 h-4" />} />
                                
                                <TableSectionHeader label="Enterprise & Team Workflow" />
                                <ComparisonRow label="Dark Web & Onion Scraping" free={false} pro={false} team={true} icon={<AlertTriangle className="w-4 h-4 text-orange-500" />} />
                                <ComparisonRow label="Cryptocurrency & Asset Tracking" free={false} pro={true} team={true} icon={<Database className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="Interpol Criminal History Filter" free={false} pro={true} team={true} icon={<Shield className="w-4 h-4 text-accent" />} />
                                <ComparisonRow label="Cloud Synchronization" free={false} pro={true} team={true} icon={<Cloud className="w-4 h-4" />} />
                                <ComparisonRow label="Shared Team Workspaces" free={false} pro={false} team={true} icon={<Users className="w-4 h-4" />} />
                                <ComparisonRow label="API Access & Webhooks" free={false} pro={false} team={true} icon={<Code className="w-4 h-4" />} />
                                <ComparisonRow label="Dedicated Support Manager" free={false} pro={false} team={true} icon={<Shield className="w-4 h-4" />} />

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ComparisonRow({ label, free, pro, team, icon }: { label: string, free: boolean, pro: boolean, team: boolean, icon: React.ReactNode }) {
    return (
        <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
            <td className="p-6 font-medium flex items-center gap-3">
                <span className="text-text-muted">{icon}</span>
                {label}
            </td>
            <td className="p-6 text-center">{free ? <Check className="w-5 h-5 text-success mx-auto" /> : <div className="w-5 h-0.5 bg-white/10 mx-auto rounded-full" />}</td>
            <td className="p-6 text-center bg-accent/5">{pro ? <Check className="w-5 h-5 text-accent mx-auto" /> : <div className="w-5 h-0.5 bg-white/10 mx-auto rounded-full" />}</td>
            <td className="p-6 text-center">{team ? <Check className="w-5 h-5 text-accent-blue mx-auto" /> : <div className="w-5 h-0.5 bg-white/10 mx-auto rounded-full" />}</td>
        </tr>
    );
}

function TableSectionHeader({ label }: { label: string }) {
    return (
        <tr className="bg-white/5">
            <td colSpan={4} className="p-4 px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 bg-accent/5">
                {label}
            </td>
        </tr>
    );
}

function PricingCard({
    title, price, period, monthlyContext, description, features, buttonText, buttonVariant, isPopular, badge, href, note
}: {
    title: string, price: string, period: string, monthlyContext?: string, description: string, features: string[], buttonText: string, buttonVariant: "primary" | "outline", isPopular?: boolean, badge?: string, href: string, note?: string
}) {
    return (
        <div className={`relative p-8 rounded-3xl bg-surface border transition-all duration-300 flex flex-col h-full overflow-hidden ${isPopular ? 'border-accent shadow-glow scale-105 z-10 ring-4 ring-accent/5' : 'border-white/5 hover:border-white/10'}`}>
            {badge && (
                <div className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tighter uppercase ${isPopular ? 'bg-accent text-white' : 'bg-white/10 text-text-muted'}`}>
                    {badge}
                </div>
            )}

            <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-text-primary'}`}>{title}</h3>
                <p className="text-text-tertiary text-xs h-8 leading-tight">{description}</p>
                <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tighter">{price}</span>
                        <span className="text-text-muted text-sm font-medium">/{period}</span>
                    </div>
                    {monthlyContext && (
                        <div className="mt-1 text-[11px] font-mono text-accent/60 font-bold uppercase tracking-wider">
                            {monthlyContext}
                        </div>
                    )}
                </div>
            </div>

            <ul className="space-y-3.5 mb-10 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-accent' : 'text-text-muted'}`} />
                        <span className="text-[13px] text-text-secondary leading-snug">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="space-y-4">
                <Link href={href} className="block w-full">
                    <Button
                        variant={buttonVariant}
                        className={`w-full py-6 rounded-2xl font-bold text-md transition-all ${buttonVariant === 'primary' ? 'shadow-glow hover:bg-accent-hover text-white' : 'border-white/10 hover:bg-white/5'}`}
                    >
                        {buttonText}
                    </Button>
                </Link>
                {note && (
                    <p className="text-[10px] text-center text-text-tertiary font-mono uppercase tracking-widest opacity-60">
                        {note}
                    </p>
                )}
            </div>
        </div>
    );
}

