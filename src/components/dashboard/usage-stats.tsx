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
            <div className="glass-panel p-5 relative overflow-hidden group">
                <div className="absolute inset-0 scanline opacity-[0.02] pointer-events-none" />
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">Investigation_Bank</p>
                        <h4 className="text-lg font-mono font-black text-white/90 uppercase tracking-tighter">
                            {data.investigationsCount} <span className="text-white/20">/</span> {data.investigationsLimit}
                        </h4>
                    </div>
                    <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg group-hover:shadow-glow-sm transition-shadow">
                        <Activity className="w-4 h-4 text-accent" />
                    </div>
                </div>
                
                <Progress value={invPercent} className="h-1.5 bg-white/5" />
                
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Usage_Telemetry</span>
                    <span className="text-[9px] font-mono font-black text-accent">{Math.round(invPercent)}% CAPACITY</span>
                </div>
            </div>

            {/* Facial AI Quota */}
            <div className="glass-panel p-5 relative overflow-hidden group">
                <div className="absolute inset-0 scanline opacity-[0.02] pointer-events-none" />
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-1">Biometric_Tokens</p>
                        <h4 className="text-lg font-mono font-black text-white/90 uppercase tracking-tighter">
                            {data.facialAiCredits} <span className="text-white/20">/</span> {data.facialLimit}
                        </h4>
                    </div>
                    <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg group-hover:shadow-glow-cyan-sm transition-shadow">
                        <Brain className="w-4 h-4 text-cyan-400" />
                    </div>
                </div>
                
                <Progress value={facialPercent} className="h-1.5 bg-white/5" />
                
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Neural_Sync_Status</span>
                    <span className="text-[9px] font-mono font-black text-cyan-400">{Math.round(facialPercent)}% ALLOCATED</span>
                </div>
            </div>
        </div>
    );
}
