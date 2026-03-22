"use client";

import { Progress } from "@/components/ui/progress";
import { Shield, Brain, Activity } from "lucide-react";

interface UsageData {
    plan: string;
    investigationsCount: number;
    facialAiCredits: number;
    investigationsLimit: number;
    facialLimit: number;
    isGuest: boolean;
}

export function UsageStats({ data }: { data: UsageData }) {
    const invPercent = Math.min((data.investigationsCount / data.investigationsLimit) * 100, 100);
    const facialPercent = Math.min((data.facialAiCredits / data.facialLimit) * 100, 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investigations Quota */}
            <div className="bg-surface border border-border/10 p-6 rounded-2xl shadow-lg relative overflow-hidden group transition-all hover:border-accent/30">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Investigation Bank</p>
                        <h4 className="text-2xl font-black text-text-primary tracking-tighter">
                            {data.investigationsCount} <span className="text-text-tertiary">/</span> {data.investigationsLimit}
                        </h4>
                    </div>
                    <div className="p-2.5 bg-accent/5 border border-accent/10 rounded-xl transition-all group-hover:bg-accent/10">
                        <Activity className="w-5 h-5 text-accent" />
                    </div>
                </div>
                
                <Progress value={invPercent} className="h-2 bg-foreground/5" />
                
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Usage Telemetry</span>
                    <span className="text-[10px] font-bold text-accent">{Math.round(invPercent)}% CAPACITY</span>
                </div>
            </div>

            {/* Facial AI Quota */}
            <div className="bg-surface border border-border/10 p-6 rounded-2xl shadow-lg relative overflow-hidden group transition-all hover:border-accent-blue/30">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-blue mb-2">Biometric Tokens</p>
                        <h4 className="text-2xl font-black text-text-primary tracking-tighter">
                            {data.facialAiCredits} <span className="text-text-tertiary">/</span> {data.facialLimit}
                        </h4>
                    </div>
                    <div className="p-2.5 bg-accent-blue/5 border border-accent-blue/10 rounded-xl transition-all group-hover:bg-accent-blue/10">
                        <Brain className="w-5 h-5 text-accent-blue" />
                    </div>
                </div>
                
                <Progress value={facialPercent} className="h-2 bg-foreground/5" />
                
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Neural Sync Status</span>
                    <span className="text-[10px] font-bold text-accent-blue">{Math.round(facialPercent)}% ALLOCATED</span>
                </div>
            </div>
        </div>
    );
}
