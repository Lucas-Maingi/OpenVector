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
                            Stop manual tab-switching. Aletheia Pro orchestrates premium data sources
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
                                title="Deep & Dark Web Sweep"
                                description="Unrestricted access to Tor indexing, historical Pastebin leaks, and localized darknet forums for sensitive breaches."
                            />
                            <FeatureCard
                                icon={<Zap className="w-6 h-6" />}
                                title="Signal-to-Noise™ Engine"
                                description="AI-driven confidence scoring (High/Medium/Low) automatically filters out false positive records, ensuring high-fidelity intelligence."
                            />
                            <FeatureCard
                                icon={<Database className="w-6 h-6" />}
                                title="Evidence Provenance"
                                description="A legally defensible directed graph tracking the exact lineage of how every piece of evidence was discovered during the footprinting process."
                            />
                            <FeatureCard
                                icon={<Globe className="w-6 h-6" />}
                                title="Timeline Reconstruction"
                                description="Automated temporal extraction plots a chronological timeline of all gathered evidence (Domain Registered, Profiles Created, Breach Data)."
                            />
                            <FeatureCard
                                icon={<Target className="w-6 h-6" />}
                                title="Automated Evidence Archiving"
                                description="One-click immutable web page archiving and timestamped screenshots to preserve evidence before targets can delete posts."
                            />
                            <FeatureCard
                                icon={<Code className="w-6 h-6" />}
                                title="Defensible Reporting"
                                description="Export production-ready, court-admissible PDF intelligence dossiers combining timelines, provenance graphs, and raw captured evidence."
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
                            Join 500+ security researchers using Aletheia to automate the manual grind.
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
                            <span className="font-bold tracking-tight">Aletheia <span className="text-accent/60 font-medium">Enterprise</span></span>
                        </div>

                        <div className="flex gap-8 text-sm text-text-muted">
                            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
                            <a href="https://github.com/Lucas-Maingi/OpenVector" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors font-mono">/repo</a>
                        </div>

                        <div className="text-xs text-text-tertiary">
                            © {new Date().getFullYear()} Aletheia. All Rights Reserved.
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
