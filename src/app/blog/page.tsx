import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Blog | OpenVector Threat Intelligence Analysis',
    description: 'Read the latest research, threat analyses, and developments in automated Open Source Intelligence from the OpenVector team.',
};

const posts = [
    {
        title: 'The Future of AI in Threat Intelligence',
        slug: 'future-of-ai-threat-intelligence',
        excerpt: 'How Large Language Models are shifting OSINT from manual footprinting workflows to real-time, instantaneous analysis.',
        category: 'Research',
        date: 'Oct 30, 2024',
        author: 'Lucas Maingi',
    },
    {
        title: 'Combating Alert Fatigue with Contextual Synthesis',
        slug: '#', // Placeholder
        excerpt: 'SOC analysts are drowning in raw data. Contextual synthesis using automated cross-referencing is the only scalable solution.',
        category: 'Analysis',
        date: 'Nov 05, 2024',
        author: 'OpenVector Research',
    },
    {
        title: 'Unmasking Dark Web Infrastructure',
        slug: '#', // Placeholder
        excerpt: 'An inside look at how OpenVector queries Tor indices without exposing operator infrastructure to malicious actors.',
        category: 'Engineering',
        date: 'Nov 20, 2024',
        author: 'Engineering Team',
    }
];

import { MarketingWrapper } from '@/components/MarketingWrapper';

export default function BlogHubPage() {
    return (
        <MarketingWrapper>
            <div className="min-h-screen bg-background text-text-primary animate-fade-in pb-24">
                <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-transparent opacity-50" />
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning border border-warning/20 tracking-widest mb-6">
                            RESEARCH & ANALYSIS
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                            The Intelligence Feed
                        </h1>
                        <p className="max-w-2xl text-lg text-text-secondary leading-relaxed">
                            Industry insights, threat methodology shifts, and engineering updates from the frontier of cybersecurity automation.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="space-y-6">
                            {posts.map((post, index) => (
                                <Link key={index} href={`/blog/${post.slug}`} className="block group">
                                    <article className="bg-surface-2/30 p-8 rounded-2xl border border-white/5 group-hover:border-warning/40 transition-all duration-300">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-warning uppercase tracking-widest bg-warning/10 px-2.5 py-1 rounded">
                                                    {post.category}
                                                </span>
                                                <span className="text-sm font-mono text-text-tertiary">{post.date}</span>
                                            </div>
                                            <span className="text-sm text-text-tertiary">By {post.author}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-warning transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-text-secondary leading-relaxed max-w-3xl">
                                            {post.excerpt}
                                        </p>
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
