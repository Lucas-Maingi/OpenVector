"use client";

import { PricingLTD } from "@/components/landing/pricing-ltd";
import { LandingHeader } from "@/components/landing/landing-header";
import { Shield, Zap, Lock, Globe, Database, Target, Code } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            <LandingHeader />

            <main className="space-y-0">
                {/* Hero Section — Minimal & Impactful */}
                <section className="pt-40 pb-24 px-4 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10" />

                    <div className="container mx-auto max-w-5xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[11px] font-bold text-accent mb-8 tracking-[0.2em] uppercase">
                            FOUNDING MEMBER ACCESS
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.1]">
                            The OSINT Terminal,<br />Evolutionized.
                        </h1>
                        <p className="text-lg md:text-xl text-text-tertiary mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                            Stop manual tab-switching. OpenVector Pro orchestrates premium data sources
                            and AI synthesis into a single, high-fidelity intelligence workspace.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link href="/dashboard">
                                <Button size="lg" className="h-14 px-10 font-bold text-lg rounded-2xl shadow-2xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                                    Launch Free Console
                                </Button>
                            </Link>
                            <Link href="#pricing">
                                <Button variant="outline" size="lg" className="h-14 px-10 border-white/10 hover:bg-white/5 rounded-2xl font-semibold backdrop-blur-sm">
                                    Explore Lifetime Pro
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Feature Grid — Advanced Capability Focus */}
                <section className="py-32 bg-surface/30 border-y border-white/5 relative">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <FeatureCard
                                icon={<Lock className="w-6 h-6" />}
                                title="Premium Data APIs"
                                description="Direct integration with paid leak databases, breach records, and historical WHOIS that normally cost hundreds per month. Included in Pro."
                            />
                            <FeatureCard
                                icon={<Zap className="w-6 h-6" />}
                                title="Managed AI Synthesis"
                                description="No API keys required. Our high-performance models synthesize raw evidence into actionable intelligence reports in seconds."
                            />
                            <FeatureCard
                                icon={<Target className="w-6 h-6" />}
                                title="Deep Dark Web Sweep"
                                description="Corporate Team tier includes automated searching of .onion domains and localized darknet forums for sensitive leaks."
                            />
                            <FeatureCard
                                icon={<Globe className="w-6 h-6" />}
                                title="Bulk Domain Analysis"
                                description="Orchestrate hundreds of subdomain and DNS lookups in one sweep without getting rate-limited or blocked."
                            />
                            <FeatureCard
                                icon={<Database className="w-6 h-6" />}
                                title="Cloud Persistence"
                                description="Your investigations are fully secured in the cloud. Access 1,000+ cached results across devices with zero local storage."
                            />
                            <FeatureCard
                                icon={<Code className="w-6 h-6" />}
                                title="Professional Reports"
                                description="Export production-ready intelligence reports in PDF, JSON, and CSV for clients or internal security boards."
                            />
                        </div>
                    </div>
                </section>

                <div id="pricing">
                    <PricingLTD />
                </div>

                {/* FAQ / Simple CTA */}
                <section className="py-32 text-center bg-surface/10">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 italic">Ready to streamline your workflow?</h2>
                        <p className="text-text-tertiary mb-10 leading-relaxed">
                            Join 500+ security researchers using OpenVector to automate the manual grind.
                            Founding Member pricing is temporary and will vanish upon SaaS launch.
                        </p>
                        <Link href="/auth/signup">
                            <Button className="h-14 px-12 rounded-2xl font-bold shadow-glow hover:scale-105 transition-transform active:scale-95">
                                Secure Your Access Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/5 bg-surface/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-accent" />
                            <span className="font-bold">OpenVector</span>
                        </div>

                        <div className="flex gap-8 text-sm text-text-muted">
                            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
                            <a href="https://github.com/Lucas-Maingi/OpenVector" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors font-mono">/repo</a>
                        </div>

                        <div className="text-xs text-text-tertiary">
                            © {new Date().getFullYear()} OpenVector. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-sm text-text-tertiary leading-relaxed">
                {description}
            </p>
        </div>
    );
}
