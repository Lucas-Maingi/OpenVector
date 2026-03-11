"use client";

import { Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    const scrollToPricing = () => {
        const element = document.getElementById("pricing");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative pt-32 pb-24 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-20">
                <div className="absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary mb-8 animate-fade-in">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                    Founding Analyst Lifetime Deal — 30 Seats Total
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
                    Automate OSINT Workflows. <br />
                    <span className="text-text-secondary">Save Hours Per Investigation.</span>
                </h1>

                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    ClearDossier is an AI-powered investigation workspace that gathers,
                    organizes, and correlates public intelligence in minutes — not hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <Button
                        size="lg"
                        className="h-14 px-8 text-lg font-semibold group bg-accent hover:bg-accent-hover text-white rounded-xl shadow-glow"
                        onClick={scrollToPricing}
                    >
                        Get Founding Access – Limited Seats
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="flex flex-col items-center gap-2 text-sm text-text-muted animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> Lifetime Access</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> All Future Updates</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
