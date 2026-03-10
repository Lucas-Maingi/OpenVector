import { Metadata } from 'next';
import { Shield, Zap, Terminal, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'How to Automate OSINT Investigations in 60 Seconds | OpenVector',
    description: 'Learn step-by-step how to automate Open Source Intelligence (OSINT) footprinting, leveraging multi-threaded web scraping and API aggregators.',
    keywords: ["OSINT automation", "threat intelligence tutorial", "cybersecurity investigation", "automate digital footprinting"],
};

export default function AutomateOSINTTutorial() {
    return (
        <div className="min-h-screen bg-background text-text-primary animate-fade-in pb-24">
            <article className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <header className="pt-32 pb-12 border-b border-white/5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20 tracking-widest mb-6">
                        TUTORIAL
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                        How to Automate OSINT Investigations in 60 Seconds
                    </h1>
                    <div className="flex items-center gap-4 text-sm font-mono text-text-tertiary">
                        <span>Oct 28, 2024</span>
                        <span>•</span>
                        <span>8 min read</span>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none mt-12 mb-16 space-y-8 text-text-secondary leading-loose">
                    <p className="text-xl text-white font-medium leading-relaxed">
                        The traditional Open Source Intelligence (OSINT) lifecycle is broken. Security analysts spend 80% of their time manually looking up emails on HaveIBeenPwned, hunting down social media profiles, traversing WhoIs records, and searching dark web paste sites.
                    </p>
                    <p>
                        This fragmentation leads to context loss, human error, and extreme fatigue. In this guide, we will demonstrate how to automate the entire footprinting phase using OpenVector's multi-threaded scanning architecture.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 1: Define Target Vectors</h2>
                    <p>
                        Every investigation begins with a seed. This is typically a piece of pivotable data: an email address, a full name, a domain name, or a cryptocurrency wallet address.
                    </p>
                    <div className="bg-surface-2 p-6 rounded-xl border border-white/5 my-8">
                        <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                            <Terminal className="w-5 h-5 text-accent" />
                            Best Practice: The Pivot Strategy
                        </h4>
                        <p className="text-sm">
                            Always start with the most uniquely identifiable piece of information. An email address like <code>jane.doe.89@protonmail.com</code> yields far tighter initial correlations than starting with the name "Jane Doe".
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 2: Multi-Threaded Scraping</h2>
                    <p>
                        When you initiate a scan on OpenVector, the engine does not perform these searches sequentially. It spins up highly-concurrent threads to hit dozens of indices simultaneously.
                    </p>
                    <ul className="space-y-4 my-8 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <Zap className="w-6 h-6 text-warning shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white block">Identity Aggregation</strong>
                                Automatically queries GitHub, Reddit, and queries DuckDuckGo indices to pull cached profiles from JS-rendered sites like Twitter/X and LinkedIn.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Shield className="w-6 h-6 text-success shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white block">Breach & Paste Indices</strong>
                                Leverages EmailRep.io, searches GitHub for hardcoded credential leaks, and dorks Pastebin repositories.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Globe className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white block">Dark Web Parsing</strong>
                                Queries Ahmia (Tor search engine) directly to find mentions of the target across active .onion domains.
                            </div>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step 3: AI Executive Synthesis</h2>
                    <p>
                        Raw data is essentially useless to executives. Once the 60-second multi-threaded sweep concludes, OpenVector passes the normalized JSON evidence arrays to a configured Large Language Model (like Google Gemini or OpenAI).
                    </p>
                    <p>
                        The AI agent performs <strong>Contextual Synthesis</strong>. It correlates that the email found in the Pastebin leak matches the PGP key registered on the Github account, instantly drawing conclusions that would take a human analyst hours to connect.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Conclusion</h2>
                    <p>
                        By transitioning from manual, tool-by-tool searches to an automated, multi-threaded aggregation engine, SOC analysts can reclaim their time and focus on what matters: mitigating the threat, rather than merely uncovering it.
                    </p>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-surface to-surface-2 p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Stop Searching. Start Correlating.</h3>
                    <p className="text-text-secondary mb-8 max-w-lg mx-auto relative z-10">
                        Try OpenVector today and run your first automated intelligence sweep in under 60 seconds without creating an account.
                    </p>
                    <Link href="/dashboard" className="relative z-10">
                        <Button variant="primary" size="lg" className="rounded-full px-8">
                            Initialize Scan <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </article>
        </div>
    );
}
