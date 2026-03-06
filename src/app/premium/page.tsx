"use client";

import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { Solution } from "@/components/landing/solution";
import { ROICalculator } from "@/components/landing/roi-calculator";
import { PricingLTD } from "@/components/landing/pricing-ltd";
import { LandingHeader } from "@/components/landing/landing-header";
import { Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            <LandingHeader />

            <main>
                {/* Adjusted Hero for Premium focus */}
                <section className="pt-32 pb-20 px-4 relative overflow-hidden">
                    <div className="container mx-auto max-w-6xl text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent mb-6">
                            PREMIUM INTELLIGENCE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                            Elevate Your OSINT <br />to Professional Grade.
                        </h1>
                        <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                            Upgrade to OpenVector Pro for agentic automation, real-time dark web monitoring, and unlimited cloud persistence.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="h-14 px-8 font-bold text-lg rounded-2xl shadow-lg shadow-accent/20">
                                    Go to Dashboard
                                </Button>
                            </Link>
                            <Link href="#pricing">
                                <Button variant="outline" size="lg" className="h-14 px-8 border-white/10 hover:bg-white/5 rounded-2xl">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <Problem />

                {/* Solution Narrative */}
                <section className="py-24 bg-surface/50 border-y border-white/5">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h2 className="text-3xl font-bold mb-8 italic">The Solution: Automated Intelligence Orchestration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                            <div className="space-y-4">
                                <div className="text-accent font-bold uppercase tracking-widest text-xs">Phased Scanning</div>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    OpenVector doesn't just search; it orchestrates multiple intelligence vectors in parallel. From SSL transparency logs to social profile enrichment, we consolidate the noise into actionable intelligence.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-accent font-bold uppercase tracking-widest text-xs">AI Synthesis</div>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Stop reading raw logs. Our AI models synthesize gathered evidence into professional reports, identifying risks and behavioral patterns automatically.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Solution />
                <ROICalculator />

                <div id="pricing">
                    <PricingLTD />
                </div>

                {/* Open Core Section */}
                <section className="py-24 bg-surface/30 border-y border-border">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent mb-6">
                            OPEN SOURCE CORE
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Built on Open Intelligence</h2>
                        <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
                            We believe in transparent, verifiable security tools. The OpenVector core engine is 100% open-source and free for everyone to self-host.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="https://github.com/Lucas-Maingi/OpenVector"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="ghost" className="border border-border hover:bg-surface h-12 px-6">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3 fill-current">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.841 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    Fork on GitHub
                                </Button>
                            </Link>
                            <div className="text-sm text-text-muted italic">
                                SaaS version includes cloud storage, AI credits, and one-click execution.
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-border bg-surface/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-accent" />
                            <span className="font-bold">OpenVector</span>
                        </div>

                        <div className="flex gap-8 text-sm text-text-muted">
                            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
                            <a href="https://github.com/Lucas-Maingi/OpenVector" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
                            <a href="mailto:contact@openvector.io" className="hover:text-text-primary transition-colors">Contact</a>
                        </div>

                        <div className="text-sm text-text-muted font-mono">
                            © {new Date().getFullYear()} OpenVector. AI-Powered OSINT.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
