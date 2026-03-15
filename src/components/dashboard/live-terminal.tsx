"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Maximize2, Minimize2, X, Activity } from "lucide-react";

const simulatedLogs = [
    "Initializing Aletheia Intelligence Engine v2.4.1",
    "Establishing secure connection to Tor nodes...",
    "Routing through relays: [DE] -> [NL] -> [CH]",
    "Connection established. IP obfuscation active.",
    "Querying global breach databases (HaveIBeenPwned, DeHashed)...",
    "Parsing 1,420 breach records...",
    "Extracting correlated email addresses...",
    "Found 3 potential aliases.",
    "Initiating OSINT scan on social platforms (Twitter, Reddit, LinkedIn)...",
    "Bypassing rate limits...",
    "Scraping public metadata...",
    "Reverse DNS lookup on target infrastructure...",
    "Scanning open ports (Nmap stealth scan)...",
    "Ports 80, 443, 22 open. Analyzing banner grabs.",
    "Cross-referencing dark web forums (BreachForums, RaidForums archives)...",
    "Compiling evidence artifacts...",
    "Synthesizing threat intelligence report via AI core...",
    "Finalizing node graph correlations...",
    "Scan complete. Disconnecting from secure Tor circuit."
];

export function LiveTerminalFeed({ isScanning }: { isScanning: boolean }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Show terminal when scanning starts
    useEffect(() => {
        if (isScanning) {
            setVisible(true);
            setLogs(["Initializing Aletheia Intelligence Engine v2.4.1..."]);
        } else {
            // Hide after a short delay when scan finishes
            const t = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(t);
        }
    }, [isScanning]);

    // Simulate logs trickling in
    useEffect(() => {
        if (!isScanning) return;

        let currentIndex = 1;
        const interval = setInterval(() => {
            if (currentIndex < simulatedLogs.length) {
                setLogs(prev => [...prev, simulatedLogs[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, Math.random() * 800 + 400); // Random delay between 400ms and 1200ms

        return () => clearInterval(interval);
    }, [isScanning]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, expanded]);

    if (!visible) return null;

    return (
        <div className={`fixed bottom-0 right-8 z-50 transition-all duration-500 ease-in-out ${expanded ? 'w-[800px] h-[500px]' : 'w-[400px] h-[250px]'} bg-black/90 backdrop-blur-xl border border-white/10 rounded-t-xl shadow-2xl flex flex-col translate-y-0`}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 rounded-t-xl cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono font-semibold text-white/80">LIVE_OSINT_FEED // <span className="text-accent animate-pulse">RUNNING</span></span>
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
                        <span className="text-accent/50 shrink-0 select-none">[{new Date().toISOString().substring(11, 19)}]</span>
                        <span className={`${log?.includes('complete') ? 'text-success font-bold' : log?.includes('error') ? 'text-red-400' : 'text-text-secondary'} break-words flex-1`}>
                            <span className="text-accent mr-1.5 opacity-50">&gt;</span>
                            {log}
                        </span>
                    </div>
                ))}
                {isScanning && logs.length < simulatedLogs.length && (
                    <div className="flex gap-2 w-full animate-pulse mt-1">
                        <span className="text-accent/50 shrink-0 select-none">[{new Date().toISOString().substring(11, 19)}]</span>
                        <span className="text-accent flex-1">
                            &gt; <span className="inline-block w-2 h-3 bg-accent align-middle ml-1"></span>
                        </span>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {isScanning && (
                <div className="h-0.5 w-full bg-white/5">
                    <div
                        className="h-full bg-accent transition-all duration-300 ease-out"
                        style={{ width: `${Math.min((logs.length / simulatedLogs.length) * 100, 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
}
