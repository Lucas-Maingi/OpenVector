import { Metadata } from 'next';
import { BookOpen, Terminal, Code, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How-To Guides | OpenVector OSINT Tutorials',
    description: 'Learn how to master Open Source Intelligence (OSINT) and automate your threat investigations with our comprehensive step-by-step guides.',
};

const guides = [
    {
        title: 'How to Automate OSINT Investigations in 60 Seconds',
        slug: 'automate-osint-investigations',
        description: 'A complete guide to leveraging OpenVector’s multi-threaded scanning architecture for rapid digital footprinting.',
        icon: <Cpu className="w-5 h-5 text-accent" />,
        date: 'Oct 28, 2024',
        readTime: '8 min read'
    },
    {
        title: 'Querying the Dark Web for Compromised Credentials',
        slug: '#', // Placeholder for future
        description: 'Advanced techniques for using automated dorks across Tor hidden services and indices like Ahmia.',
        icon: <Terminal className="w-5 h-5 text-warning" />,
        date: 'Nov 02, 2024',
        readTime: '12 min read'
    },
    {
        title: 'Synthesizing Intelligence Dossiers using LLMs',
        slug: '#', // Placeholder for future
        description: 'How to configure Google Gemini within OpenVector to generate boardroom-ready executive summaries from raw data.',
        icon: <BookOpen className="w-5 h-5 text-success" />,
        date: 'Nov 15, 2024',
        readTime: '6 min read'
    }
];

import { MarketingWrapper } from '@/components/MarketingWrapper';

export default function HowToHubPage() {
    return (
        <MarketingWrapper>
            <div className="min-h-screen bg-background text-text-primary animate-fade-in pb-24">
                {/* Hero */}
                <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-transparent opacity-50" />
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20 tracking-widest mb-6">
                            TUTORIALS & GUIDES
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Master Automated OSINT
                        </h1>
                        <p className="max-w-2xl text-lg text-text-secondary leading-relaxed">
                            Step-by-step intelligence gathering methodologies, automation tutorials, and best practices for modern security analysts.
                        </p>
                    </div>
                </section>

                {/* Guides Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {guides.map((guide, index) => (
                                <Link key={index} href={`/how-to/${guide.slug}`} className="block group">
                                    <article className="bg-surface/50 h-full p-6 rounded-2xl border border-white/5 group-hover:border-accent/40 group-hover:bg-surface transition-all duration-300">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                            {guide.icon}
                                        </div>
                                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                            {guide.title}
                                        </h2>
                                        <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                                            {guide.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs font-mono text-text-tertiary mt-auto pt-4 border-t border-white/5">
                                            <span>{guide.date}</span>
                                            <span>{guide.readTime}</span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MarketingWrapper>
    );
}
