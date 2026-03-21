"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Maximize2, Minimize2, X, Activity } from "lucide-react";
import { useInvestigation } from "@/context/InvestigationContext";

export function LiveTerminalFeed({ isScanning, investigationId }: { isScanning: boolean, investigationId?: string }) {
    const { terminalLogs: logs, scanStatus, setActiveInvestigationId, setScanStatus } = useInvestigation();
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize context if ID is provided (for direct page loads)
    useEffect(() => {
        if (investigationId) {
            setActiveInvestigationId(investigationId);
            if (isScanning && scanStatus === 'idle') {
                setScanStatus('scanning');
            }
        }
    }, [investigationId, isScanning, scanStatus, setActiveInvestigationId, setScanStatus]);

    const isActuallyScanning = scanStatus === 'scanning' || isScanning;

    // Visibility logic: show IF transitioning to scanning OR if explicitly visible
    useEffect(() => {
        if (isActuallyScanning) {
            setVisible(true);
        } else if (scanStatus === 'complete' || scanStatus === 'error') {
            // Keep visible for a bit after completion if it was already open
            if (visible) {
               const t = setTimeout(() => setVisible(false), 12000);
               return () => clearTimeout(t);
            }
        }
    }, [isActuallyScanning, scanStatus, visible]);

    const [ghostLog, setGhostLog] = useState<string>("");
    const lastLogCount = useRef(logs.length);

    // Ghost Analytics Cycle (Engagement Engineering)
    useEffect(() => {
        if (!isActuallyScanning) {
            setGhostLog("");
            return;
        }

        const ghostMessages = [
            "Querying Breach Databases...",
            "Dorking GitHub Repositories...",
            "Parsing Social Correlation Nodes...",
            "Fetching Domain Registry History...",
            "Analyzing Metadata Signatures...",
            "Checking Pastebin Archives...",
            "Correlating Username Fingerprints...",
            "Parsing SSL Certificate Transparency Logs...",
            "Evaluating Threat Intel Feeds..."
        ];

        let index = -1;
        const interval = setInterval(() => {
            // Only show ghost logs if no REAL logs have arrived recently
            if (logs.length === lastLogCount.current) {
                index = (index + 1) % ghostMessages.length;
                setGhostLog(ghostMessages[index]);
            } else {
                setGhostLog("");
                lastLogCount.current = logs.length;
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isActuallyScanning, logs.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, ghostLog, expanded]);

    return (
        <div className={`fixed bottom-0 right-8 z-[999] transition-all duration-500 ease-in-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'
        } ${expanded ? 'w-[800px] h-[500px]' : 'w-[400px] h-[260px]'} bg-black/90 backdrop-blur-3xl border border-white/10 rounded-t-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden neon-glow-cyan`}>
            
            {/* CRT Effect Overlays */}
            <div className="absolute inset-0 pointer-events-none crt-overlay opacity-[0.07] z-10" />
            <div className="absolute inset-0 pointer-events-none scanline z-20" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/10 rounded-t-2xl cursor-pointer relative z-30" onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <Terminal className="w-4 h-4 text-accent" />
                        {isActuallyScanning && <Activity className="w-2 h-2 text-accent absolute -top-1 -right-1 animate-pulse" />}
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-white/70 uppercase">
                        Aletheia_Intel_Feed // <span className={isActuallyScanning ? "text-accent animate-pulse" : "text-success/70"}>{isActuallyScanning ? "STREAMING" : "ENCRYPTED"}</span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-white/30 hover:text-accent transition-all duration-300" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
                        {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <button className="text-white/30 hover:text-red-500/80 transition-all duration-300" onClick={(e) => { e.stopPropagation(); setVisible(false); }}>
                        <X className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 p-5 font-mono text-[10px] sm:text-[11px] overflow-y-auto custom-scrollbar bg-transparent relative z-30 selection:bg-accent/30">
                {logs.map((log, i) => (
                    <div key={i} className="mb-2 flex gap-3 w-full group">
                        <span className="text-accent/20 shrink-0 select-none font-bold tracking-tighter">[{i.toString().padStart(3, '0')}]</span>
                        <div className="flex-1 flex items-start gap-2">
                            <span className="text-accent/40 font-bold select-none">&rsaquo;</span>
                            <span className={`${
                                log?.toLowerCase().includes('complete') ? 'text-success/90 font-bold' : 
                                log?.toLowerCase().includes('discovery') || log?.toLowerCase().includes('found') ? 'text-cyan-400 font-medium' : 
                                log?.toLowerCase().includes('error') ? 'text-red-400' :
                                'text-slate-400'
                            } break-words leading-relaxed`}>
                                {log}
                            </span>
                        </div>
                    </div>
                ))}
                
                {isActuallyScanning && ghostLog && (
                    <div className="mb-2 flex gap-3 w-full animate-pulse transition-all duration-500">
                        <span className="text-accent/10 shrink-0 select-none font-bold tracking-tighter">[SYS]</span>
                        <div className="flex-1 flex items-start gap-2">
                             <span className="text-accent/30 font-bold select-none">&rsaquo;</span>
                             <span className="text-accent/60 italic break-words leading-relaxed font-medium">
                                {ghostLog}
                             </span>
                        </div>
                    </div>
                )}

                {isActuallyScanning && (
                    <div className="flex gap-3 w-full mt-2">
                        <span className="text-accent/20 shrink-0 select-none font-bold tracking-tighter">[{logs.length.toString().padStart(3, '0')}]</span>
                        <div className="flex-1 flex items-start gap-2">
                            <span className="text-accent font-bold animate-pulse">&rsaquo;</span>
                            <span className="inline-block w-2.5 h-4 bg-accent/80 shadow-[0_0_10px_rgba(0,240,255,0.5)] align-middle animate-[blink_1s_step-end_infinite]"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Visualization */}
            {isActuallyScanning && (
                <div className="h-0.5 w-full bg-white/[0.02] relative z-40">
                    <div
                        className="h-full bg-gradient-to-r from-accent/50 to-accent shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all duration-1000 ease-in-out"
                        style={{ width: `${Math.min((logs.length / 15) * 100, 98)}%` }}
                    />
                </div>
            )}
        </div>
    );
}

// Global styles would need this blink animation
// But we can also use Tailwind's native pulse or a custom class in globals.css if needed
// For now, I'll rely on the pulse or just the block.

