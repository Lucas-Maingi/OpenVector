"use client";

import { motion } from "framer-motion";
import { Users, Zap, Search, Link2, Shield, Info, ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Associate {
    name: string;
    handle: string;
    relationship: string;
    confidence: number;
    reasoning: string;
}

export function AssociatesTab({ reportContent }: { reportContent: string }) {
    const associates = useMemo(() => {
        try {
            const match = reportContent.match(/\[ASSOCIATES: (\{.*?\})\]/);
            if (match && match[1]) {
                const data = JSON.parse(match[1]);
                return (data.associates || []) as Associate[];
            }
        } catch (e) {
            console.warn("[ASSOCIATES] Failed to parse connection-metadata:", e);
        }
        return [] as Associate[];
    }, [reportContent]);

    if (associates.length === 0) {
        return (
            <div className="h-[400px] w-full bg-surface/20 border border-dashed border-border/10 rounded-2xl flex flex-col items-center justify-center text-center p-12 space-y-4">
                <div className="opacity-20 animate-pulse"><Users className="w-12 h-12" /></div>
                <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-tertiary">NETWORK_ISOLATION</h3>
                    <p className="text-[11px] text-text-tertiary opacity-60 max-w-sm">No high-probability hidden associates detected in current intelligence clusters. Target social cluster remains fragmented or highly disciplined.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Summary */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Link2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-text-primary">Predictive_Social_Cluster</h3>
                        <p className="text-[10px] text-text-tertiary uppercase tracking-tighter font-bold">AI-Identified Hidden Network Nodes</p>
                    </div>
                </div>
                <Badge variant="outline" className="bg-foreground/[0.03] border-border/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                    NODES_DISCOVERED: {associates.length}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {associates.map((person, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-surface border border-border/10 rounded-2xl overflow-hidden hover:border-accent/40 shadow-lg transition-all duration-500"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border/10 flex items-center justify-center relative overflow-hidden group-hover:border-accent/30 transition-colors">
                                        <Users className="w-5 h-5 text-text-tertiary opacity-40 group-hover:text-accent/40 transition-colors" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-text-primary truncate max-w-[180px]">{person.name}</div>
                                        <div className="text-[10px] font-bold text-accent opacity-70">@{person.handle}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-bold font-mono tracking-tighter ${
                                        person.confidence > 0.8 ? 'text-accent' : person.confidence > 0.6 ? 'text-warning' : 'text-text-tertiary'
                                    }`}>
                                        {(person.confidence * 100).toFixed(0)}%
                                    </div>
                                    <div className="text-[8px] text-text-tertiary font-bold uppercase tracking-widest leading-none">Connection</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] mb-2">
                                        <span className="text-text-tertiary">Pred_Relationship</span>
                                        <span className="text-accent">{person.relationship}</span>
                                    </div>
                                    <Progress value={person.confidence * 100} className="h-1 bg-foreground/5" indicatorClassName={person.confidence > 0.8 ? 'bg-accent shadow-sm shadow-accent/20' : 'bg-warning'} />
                                </div>

                                <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border/10 group-hover:bg-foreground/[0.04] transition-colors">
                                    <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <Shield className="w-3 h-3" />
                                        Reasoning_Logic
                                    </div>
                                    <p className="text-[11px] text-text-secondary leading-relaxed italic font-bold tracking-tight">
                                        "{person.reasoning}"
                                    </p>
                                </div>

                                <Button 
                                    className="w-full h-10 rounded-xl bg-accent/[0.03] border border-accent/20 hover:bg-accent text-white group-hover:text-slate-950 transition-all font-mono font-black text-[10px] uppercase tracking-widest gap-2"
                                    onClick={() => window.location.href = `/dashboard/investigations/new?q=${encodeURIComponent(person.handle || person.name)}`}
                                >
                                    Pivot_To_Node
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>

                        <div className="absolute inset-0 scanline opacity-[0.01] pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            <div className="p-5 rounded-2xl bg-foreground/[0.01] border border-border/10 flex gap-5 items-start mt-4">
                <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                    <Zap className="w-5 h-5 text-accent shrink-0" />
                </div>
                <div className="text-[11px] text-text-tertiary opacity-60 leading-relaxed">
                    <span className="text-accent font-bold uppercase tracking-[0.2em] block mb-1">Network_Intelligence_Notice:</span>
                    The Associate Engine utilizes multi-agent neural synthesis to bridge gaps in social graphs. Discovered nodes are "High-Probability Predictions" based on behavioral clustering and digital proximity. Verify with technical data.
                </div>
            </div>
        </div>
    );
}
