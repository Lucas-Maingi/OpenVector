import { Metadata } from 'next';
import { HelpCircle, Terminal, Search, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'FAQ | Aletheia Intelligence Analysis',
    description: 'Frequently asked questions about Aletheia, automated threat intelligence, Dark Web monitoring, and OSINT capabilities.',
};

// Define FAQs here to map cleanly to both the UI and the JSON-LD schema
const faqs = [
    {
        question: "What is Aletheia?",
        answer: "Aletheia is an advanced Open Source Intelligence (OSINT) acceleration platform. It automates the tedious footprinting process by simultaneously searching dozens of public records, breach databases, social platforms, and the dark web within seconds, compiling the results into AI-synthesized dossiers."
    },
    {
        question: "Is the data gathered legal?",
        answer: "Yes. Aletheia strictly utilizes Open Source Intelligence (OSINT). This means it gathers freely accessible public information, scraped from indices, public breach disclosures, unauthenticated social media profiles, and indexed dark web links. It does not perform invasive hacking or bypass authentication mechanisms."
    },
    {
        question: "Does Aletheia search the Dark Web?",
        answer: "Yes. The engine utilizes specialized connectors (like Ahmia and targeted Search Engine Dorks) to look up mentions of targets across indexed Tor networks, darknet forums, paste sites, and known data leak repositories."
    },
    {
        question: "How long does a scan take?",
        answer: "A complete intelligence footprint utilizing our multi-threaded scanning architecture takes approximately 10 to 45 seconds, depending on the complexity of the target vectors (Email, Domain, Username) and API response times."
    },
    {
        question: "Can I try Aletheia for free?",
        answer: "Yes! Aletheia offers a fully functional 'Guest Analyst' mode that allows you to run basic scans without an account. For deep correlation, continuous monitoring, and automated AI readouts, you can upgrade to Aletheia Pro."
    }
];

import { MarketingWrapper } from '@/components/MarketingWrapper';

export default function FAQPage() {
    // Generate JSON-LD structured data for Google Rich Snippets
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <MarketingWrapper>
            <div className="min-h-screen bg-background text-text-primary animate-fade-in pb-24">
                {/* Inject JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50" />
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 tracking-widest mb-6">
                            KNOWLEDGE BASE
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            Everything you need to know about automated footprinting, OSINT legality, and Aletheia capabilities.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-surface/50 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
                                    <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                    {faq.question}
                                </h2>
                                <p className="text-text-secondary leading-relaxed ml-9">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Links Footer Area */}
                <section className="py-12 border-t border-white/5 bg-surface-2/30">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
                        <div className="flex flex-col items-center sm:items-start p-6">
                            <Terminal className="w-8 h-8 text-accent mb-4" />
                            <h3 className="text-white font-semibold mb-2">Read the Docs</h3>
                            <p className="text-sm text-text-tertiary">Explore our technical documentation and API specifications.</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-start p-6">
                            <Search className="w-8 h-8 text-success mb-4" />
                            <h3 className="text-white font-semibold mb-2">How-To Guides</h3>
                            <p className="text-sm text-text-tertiary">Learn how to run advanced OSINT investigations effectively.</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-start p-6">
                            <Lock className="w-8 h-8 text-warning mb-4" />
                            <h3 className="text-white font-semibold mb-2">Privacy & Security</h3>
                            <p className="text-sm text-text-tertiary">Read how we protect your data while exposing target digital footprints.</p>
                        </div>
                    </div>
                </section>
            </div>
        </MarketingWrapper>
    );
}
