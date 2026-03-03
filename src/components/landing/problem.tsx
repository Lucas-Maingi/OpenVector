"use client";

import { AlertCircle, Layers, Link, Search, FileText } from "lucide-react";

const problems = [
    {
        title: "Constant Tab Switching",
        description: "Lose focus jumping between 20+ browser tabs for a single target.",
        icon: <Layers className="w-6 h-6" />
    },
    {
        title: "Manual Correlation",
        description: "Manually tracking cross-platform handles is slow and error-prone.",
        icon: <Link className="w-6 h-6" />
    },
    {
        title: "Repetitive Workflows",
        description: "Downloading and re-uploading images for reverse searches for every lead.",
        icon: <Search className="w-6 h-6" />
    },
    {
        title: "Disorganized Evidence",
        description: "Screenshots and links scattered across folders and notes files.",
        icon: <AlertCircle className="w-6 h-6" />
    },
    {
        title: "Manual Reporting",
        description: "Spending hours formatting data into a report instead of analyzing it.",
        icon: <FileText className="w-6 h-6" />
    }
];

export function Problem() {
    return (
        <section className="py-24 bg-surface/30">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Modern OSINT Is Fragmented <br />
                        <span className="text-text-secondary italic">and Time-Consuming</span>
                    </h2>
                    <p className="text-text-secondary text-lg">
                        Cybersecurity analysts spend up to 60% of their time on manual data gathering
                        and formatting instead of actual intelligence analysis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-surface border border-border group hover:border-accent/30 transition-all elevated"
                        >
                            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
