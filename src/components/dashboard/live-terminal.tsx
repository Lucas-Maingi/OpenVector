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
            "DECRYPTING_NODE_HANDSHAKE...",
            "QUERYING_BREACH_CORES...",
            "PARSING_SOCIAL_CORRELATIONS...",
            "MAPPING_GEOLOCATION_SIGNATURES...",
            "AUDITING_METADATA_EXTRACTORS...",
            "TRAVERSING_PASTEBIN_ARCHIVES...",
            "CORRELATING_IDENTITY_FINGERPRINTS...",
            "EXTRACTING_WHOIS_DNS_VECTORS...",
            "SYNCING_INTEL_GATES..."
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
        }, 4000);

        return () => clearInterval(interval);
    }, [isActuallyScanning, logs.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, ghostLog, expanded]);

    return (
        <div className={`fixed bottom-0 right-8 z-[999] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'
        } ${expanded ? 'w-[800px] h-[550px]' : 'w-[420px] h-[280px]'} bg-surface/95 backdrop-blur-3xl border border-border/10 rounded-t-2xl shadow-2xl flex flex-col overflow-hidden neon-glow-cyan-sm`}>
            
            {/* CRT Effect Overlays (Subtle) */}
            <div className="absolute inset-0 pointer-events-none crt-overlay opacity-[0.05] z-10" />
            <div className="absolute inset-0 pointer-events-none scanline z-20 opacity-[0.08]" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-foreground/[0.04] border-b border-border/10 rounded-t-2xl cursor-pointer relative z-30" onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Terminal className={`w-4 h-4 ${isActuallyScanning ? 'text-accent' : 'text-success'}`} />
                        {isActuallyScanning && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_8px_#00f0ff]"></span>
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase leading-none mb-1">
                            Aletheia_Intel_Feed
                        </span>
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${isActuallyScanning ? 'bg-accent animate-pulse shadow-[0_0_5px_#00f0ff]' : 'bg-success shadow-[0_0_5px_#10b981]'}`} />
                            <span className={`text-[8px] font-mono uppercase tracking-widest ${isActuallyScanning ? 'text-accent font-black' : 'text-success font-black opacity-80'}`}>
                                {isActuallyScanning ? "REALTIME_INGESTION_ACTIVE" : "ENCRYPTED_ARCHIVE_SECURED"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <button className="text-text-tertiary hover:text-accent transition-all duration-300" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
                        {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <button className="text-text-tertiary hover:text-danger transition-all duration-300" onClick={(e) => { e.stopPropagation(); setVisible(false); }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 p-6 font-mono text-[10px] sm:text-[11px] overflow-y-auto custom-scrollbar bg-background/10 relative z-30 selection:bg-accent/40 selection:text-white">
                {logs.map((log, i) => (
                    <div key={i} className="mb-2.5 flex gap-4 w-full group animate-[fadeIn_0.5s_ease-out_forwards]">
                        <span className="text-text-tertiary/20 shrink-0 select-none font-bold tracking-widest text-[9px] mt-0.5">[{i.toString().padStart(3, '0')}]</span>
                        <div className="flex-1 flex items-start gap-4">
                            <span className="text-accent/50 font-bold select-none mt-0.5">»</span>
                            <span className={`${
                                log?.toLowerCase().includes('complete') ? 'text-success font-black' : 
                                log?.toLowerCase().includes('discovery') || log?.toLowerCase().includes('found') ? 'text-accent font-black' : 
                                log?.toLowerCase().includes('error') ? 'text-danger font-black' :
                                'text-text-primary'
                            } break-words leading-relaxed tracking-tight`}>
                                {log}
                            </span>
                        </div>
                    </div>
                ))}
                
                {isActuallyScanning && ghostLog && (
                    <div className="mb-2.5 flex gap-4 w-full opacity-60 transition-all duration-500">
                        <span className="text-accent/10 shrink-0 select-none font-black tracking-widest text-[9px] mt-0.5">[HUB]</span>
                        <div className="flex-1 flex items-start gap-3">
                             <span className="text-accent/40 font-black select-none mt-0.5">»</span>
                             <span className="text-accent/80 font-black italic break-words leading-relaxed animate-pulse uppercase tracking-widest">
                                {ghostLog}
                             </span>
                        </div>
                    </div>
                )}

                {isActuallyScanning && (
                    <div className="flex gap-4 w-full mt-3">
                        <span className="text-text-tertiary opacity-20 shrink-0 select-none font-bold tracking-widest text-[9px] mt-0.5">[{logs.length.toString().padStart(3, '0')}]</span>
                        <div className="flex-1 flex items-start gap-4">
                            <span className="text-accent font-bold animate-pulse mt-0.5">»</span>
                            <div className="flex items-center gap-1">
                                <span className="inline-block w-2.5 h-4 bg-accent/90 shadow-sm shadow-accent/40 align-middle animate-[blink_1s_step-end_infinite]" />
                                <span className="text-[8px] font-mono text-accent/40 uppercase tracking-[0.3em] ml-2 font-black">Awaiting_Packet</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Visualization */}
            {isActuallyScanning && (
                <div className="h-0.5 w-full bg-foreground/[0.02] relative z-40">
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

