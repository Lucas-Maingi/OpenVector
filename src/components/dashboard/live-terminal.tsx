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
        } ${expanded ? 'w-[800px] h-[500px]' : 'w-[400px] h-[250px]'} bg-black/95 backdrop-blur-2xl border border-white/20 rounded-t-xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col marker:shadow-accent/20`}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 rounded-t-xl cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono font-semibold text-white/80">ALETHEIA_INTEL_STREAM // <span className={isActuallyScanning ? "text-accent animate-pulse" : "text-success"}>{isActuallyScanning ? "RUNNING" : "STANDBY"}</span></span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-white/40 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
                        {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                    <button className="text-white/40 hover:text-red-400 transition-colors" onClick={(e) => { e.stopPropagation(); setVisible(false); }}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 p-4 font-mono text-[11px] sm:text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 bg-transparent">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1.5 flex gap-2 w-full">
                        <span className="text-accent/30 shrink-0 select-none font-bold">[{i.toString().padStart(2, '0')}]</span>
                        <span className={`${log?.includes('complete') ? 'text-success font-bold' : log?.includes('Discovery') ? 'text-blue-400' : 'text-text-secondary'} break-words flex-1`}>
                            <span className="text-accent mr-1.5 opacity-50 font-bold">&gt;</span>
                            {log}
                        </span>
                    </div>
                ))}
                
                {isActuallyScanning && ghostLog && (
                    <div className="mb-1.5 flex gap-2 w-full animate-pulse transition-all duration-500">
                        <span className="text-accent/30 shrink-0 select-none font-bold">[*]</span>
                        <span className="text-accent/70 italic break-words flex-1">
                            <span className="text-accent mr-1.5 opacity-50 font-bold">&gt;</span>
                            {ghostLog}
                        </span>
                    </div>
                )}

                {isActuallyScanning && (
                    <div className="flex gap-2 w-full animate-pulse mt-1">
                        <span className="text-accent/30 shrink-0 select-none font-bold">[{logs.length.toString().padStart(2, '0')}]</span>
                        <span className="text-accent flex-1 font-bold">
                            &gt; <span className="inline-block w-2 h-3 bg-accent align-middle ml-1"></span>
                        </span>
                    </div>
                )}
            </div>

            {/* Progress Visualization */}
            {isActuallyScanning && (
                <div className="h-0.5 w-full bg-white/5">
                    <div
                        className="h-full bg-accent transition-all duration-1000 ease-in-out"
                        style={{ width: `${Math.min((logs.length / 15) * 100, 95)}%` }}
                    />
                </div>
            )}
        </div>
    );
}
