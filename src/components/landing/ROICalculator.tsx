"use client";

import { TrendingDown, Clock, MousePointer2, Plus } from "lucide-react";

export function ROICalculator() {
    return (
        <section className="py-24 bg-surface">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            This Pays for Itself <br />
                            <span className="text-success">in One Investigation</span>
                        </h2>
                        <div className="space-y-6 text-text-secondary text-lg">
                            <p>
                                Modern OSINT isn't just slow — it's expensive when you bill by the hour.
                                Our analysts report saving at least <span className="text-text-primary font-bold">2-4 hours per case</span>.
                            </p>
                            <div className="p-6 rounded-2xl bg-background border border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm uppercase tracking-widest font-mono">Potential Savings</span>
                                    <span className="text-success font-bold">$150.00+</span>
                                </div>
                                <p className="text-sm">
                                    "If you save just 2 hours per case and bill $75/hour, that's $150 saved per investigation.
                                    The Founding Access pays for itself on day one."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <ROICard
                            icon={<Clock className="w-5 h-5 text-accent" />}
                            label="Time Saved"
                            value="-70%"
                            sub="Per investigation"
                        />
                        <ROICard
                            icon={<TrendingDown className="w-5 h-5 text-success" />}
                            label="Manual Labor"
                            value="REDUCED"
                            sub="Automated gathering"
                        />
                        <ROICard
                            icon={<MousePointer2 className="w-5 h-5 text-accent" />}
                            label="Context Switches"
                            value="ZERO"
                            sub="All-in-one workspace"
                        />
                        <ROICard
                            icon={<Plus className="w-5 h-5 text-success" />}
                            label="Profit Margin"
                            value="+25%"
                            sub="Faster delivery"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ROICard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
    return (
        <div className="p-6 rounded-2xl bg-background border border-border flex flex-col justify-between h-40">
            <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{label}</div>
                <div className="text-2xl font-bold mb-1">{value}</div>
                <div className="text-[10px] text-text-muted">{sub}</div>
            </div>
        </div>
    );
}
