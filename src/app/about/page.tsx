import { Metadata } from 'next';
import { Shield, Target, Database, Globe, Users, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'About Aletheia | Intelligence Analysis & Orchestration',
    description: 'Learn about Aletheia’s mission to democratize cybersecurity with AI-powered, automated open-source intelligence (OSINT) investigations.',
};

import { MarketingWrapper } from '@/components/MarketingWrapper';

export default function AboutPage() {
    return (
        <MarketingWrapper>
            <div className="min-h-screen bg-background text-text-primary animate-fade-in pb-24">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50" />
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                        <Badge>ABOUT US</Badge>
                        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                            Democratizing Advanced <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-success">Threat Intelligence
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-text-secondary leading-relaxed">
                            Aletheia was founded with a singular mission: to make elite-tier Open Source Intelligence (OSINT) accessible, automated, and actionable for security professionals worldwide.
                        </p>
                    </div>
                </section>

                {/* Mission & Core Values */}
                <section className="py-24 bg-surface-2/30">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">The Future of OSINT is Automated</h2>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    Traditional threat intelligence gathering is fragmented, manual, and painfully slow. Analysts spend hours context-switching between dozens of tools, compiling spreadsheets, and formatting reports.
                                </p>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    We built Aletheia to bridge this gap. By combining multi-threaded web scrapers, API aggregators, dark web connectors, and advanced Large Language Models, we've created an engine that completes a standard 4-hour investigation footprint in under 60 seconds.
                                </p>
                                <div className="flex gap-4 mt-8">
                                    <a href="/dashboard"><Button variant={"primary" as any}>Start Scanning</Button></a>
                                    <a href="/contact"><Button variant={"outline" as any} className="border-white/10">Contact Team</Button></a>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FeatureCard icon={<Zap className="w-5 h-5 text-accent" />} title="Speed" description="Aggregating dozens of data sources simultaneously." />
                                <FeatureCard icon={<ShieldCheck className="w-5 h-5 text-success" />} title="Accuracy" description="Cross-referencing claims to reduce false positives." />
                                <FeatureCard icon={<Cpu className="w-5 h-5 text-accent" />} title="AI Synthesis" description="Generating boardroom-ready dossiers automatically." />
                                <FeatureCard icon={<Globe className="w-5 h-5 text-accent" />} title="Scale" text="Mapping global footprints across the visible and dark web." />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MarketingWrapper>
    );
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 tracking-widest">
            {children}
        </span>
    );
}

function FeatureCard({ icon, title, description, text }: { icon: React.ReactNode, title: string, description?: string, text?: string }) {
    return (
        <div className="bg-surface/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-sm text-text-tertiary leading-relaxed">{description || text}</p>
        </div>
    );
}
