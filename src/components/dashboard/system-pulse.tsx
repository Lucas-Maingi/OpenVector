"use client";

import { useState, useEffect } from "react";
import { Activity, ShieldCheck, Database, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function SystemPulse() {
    const [status, setStatus] = useState<'online' | 'degraded' | 'offline'>('online');
    const [engines, setEngines] = useState({ database: 'online', osint: 'online', ai: 'online' });

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch('/api/system/health');
                const data = await res.json();
                if (data.status === 'operational') {
                    setStatus('online');
                    setEngines(data.engines);
                } else {
                    setStatus('degraded');
                }
            } catch {
                setStatus('offline');
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (s: string) => {
        if (s === 'online') return 'text-success';
        if (s === 'degraded') return 'text-yellow-500';
        return 'text-danger';
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full cursor-help hover:bg-white/[0.05] transition-colors group">
                        <div className="relative">
                            <Activity className={`w-3 h-3 ${getStatusColor(status)} group-hover:animate-pulse`} />
                            {status === 'online' && (
                                <span className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
                            )}
                        </div>
                        <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">
                            System_Pulse: {status}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-950 border-white/10 p-4 space-y-3">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Engine Core Status</p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="flex items-center gap-2">
                                <Database className="w-3 h-3 text-white/30" />
                                <span className="text-[9px] font-mono text-white/50 uppercase">Database</span>
                                <span className={`text-[9px] font-mono font-bold uppercase ml-auto ${getStatusColor(engines.database)}`}>{engines.database}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-white/30" />
                                <span className="text-[9px] font-mono text-white/50 uppercase">OSINT</span>
                                <span className={`text-[9px] font-mono font-bold uppercase ml-auto ${getStatusColor(engines.osint)}`}>{engines.osint}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3 text-white/30" />
                                <span className="text-[9px] font-mono text-white/50 uppercase">Auth_Vault</span>
                                <span className="text-[9px] font-mono font-bold text-success uppercase ml-auto">Verified</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                        <p className="text-[8px] font-mono text-white/20 uppercase">Next Sync: 30s</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
