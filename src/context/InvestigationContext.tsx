"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { pollInvestigation, formatTerminalLogs } from '@/lib/investigation-polling';

interface InvestigationContextType {
    activeInvestigationId: string | null;
    setActiveInvestigationId: (id: string | null) => void;
    scanStatus: 'idle' | 'scanning' | 'complete' | 'error';
    setScanStatus: (status: 'idle' | 'scanning' | 'complete' | 'error') => void;
    evidenceCount: number;
    setEvidenceCount: (count: number) => void;
    evidence: any[];
    setEvidence: (evidence: any[]) => void;
    entities: any[];
    setEntities: (entities: any[]) => void;
    terminalLogs: string[];
    setTerminalLogs: (logs: string[]) => void;
    refresh: () => Promise<void>;
    startScan: (id: string) => Promise<void>;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export function InvestigationProvider({ children }: { children: React.ReactNode }) {
    const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
    const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle');
    const [evidenceCount, setEvidenceCount] = useState(0);
    const [evidence, setEvidence] = useState<any[]>([]);
    const [entities, setEntities] = useState<any[]>([]);
    const [terminalLogs, setTerminalLogs] = useState<string[]>(["[SYS] Connecting to Aletheia Intelligence Nodes..."]);

    // Unified Refresh Function
    const refresh = useCallback(async () => {
        if (!activeInvestigationId) return;
        
        const data = await pollInvestigation(activeInvestigationId);
        if (data) {
            const formatted = formatTerminalLogs(data);
            
            setTerminalLogs(prev => {
                // If we have local handshake logs but the server returned fewer logs (race condition),
                // we preserve our local state until the server produces more content.
                if (data.logs.length === 0 && prev.length > 1) {
                    return prev; 
                }
                
                if (JSON.stringify(prev) === JSON.stringify(formatted)) return prev;
                return formatted;
            });

            setEvidence(data.evidence || []);
            setEntities(data.entities || []);
            setEvidenceCount(data.evidence?.length || 0);
            
            if (data.status === 'active' || data.status === 'scanning' || data.status === 'pending') {
                setScanStatus('scanning');
            } else if (data.status === 'closed' || data.status === 'complete') {
                setScanStatus('complete');
            } else if (data.status === 'error') {
                setScanStatus('error');
            }
        }
    }, [activeInvestigationId]);

    // Proactive fetch when active ID changes
    useEffect(() => {
        if (!activeInvestigationId) {
            // Only clear logs if we are truly unsetting the investigation, 
            // not just transitioning during a scan redirect.
            if (scanStatus === 'idle' || scanStatus === 'complete') {
                setTerminalLogs([]);
            }
            setEvidenceCount(0);
            return;
        }
        
        // Initial handshake preserved during redirection
        if (terminalLogs.length < 2) {
            refresh();
        }
    }, [activeInvestigationId, refresh, terminalLogs.length, scanStatus]);

    // Global Polling Effect
    useEffect(() => {
        if (!activeInvestigationId || (scanStatus !== 'scanning' && scanStatus !== 'pending')) return;

        console.log(`[Context] Polling sequence initiated for ${activeInvestigationId} (Status: ${scanStatus})`);

        // Safety timeout: If scan goes longer than 4 minutes, assume it's stuck and force clear
        const safetyTimeout = setTimeout(() => {
            if (scanStatus === 'scanning') {
                console.warn("[Context] Polling safety timeout reached.");
                setScanStatus('complete');
                setTerminalLogs(prev => [...prev, "[SYS] Connection closed due to inactivity timeout."]);
            }
        }, 240000);

        const interval = setInterval(refresh, 3000);
        return () => {
            clearInterval(interval);
            clearTimeout(safetyTimeout);
        };
    }, [activeInvestigationId, scanStatus, refresh]);

    const startScan = useCallback(async (id: string) => {
        // Keep logs if we're just hitting "Re-Scan" on the same ID
        if (id !== activeInvestigationId) {
            setTerminalLogs(["🚀 Initializing Aletheia Intelligence Engine v2.5.0..."]);
        }
        
        setActiveInvestigationId(id);
        setScanStatus('scanning');
        
        try {
            const geminiKey = typeof window !== 'undefined' ? localStorage.getItem("openvector_gemini_key") : null;
            const headers: Record<string, string> = { "Content-Type": "application/json" };
            if (geminiKey) headers['x-gemini-key'] = geminiKey;

            const res = await fetch(`/api/investigations/${id}/scan`, {
                method: "POST",
                headers,
            });

            if (res.ok) {
                const data = await res.json();
                if (data.initialLogs) {
                    setTerminalLogs([
                        "🚀 Initializing Aletheia Intelligence Engine v2.5.0...",
                        ...data.initialLogs
                    ]);
                }
            } else {
                const errData = await res.json().catch(() => ({}));
                const errText = errData.error || "Scan initiation failed";
                console.error("Scan Initiation Failed:", errText);
                setTerminalLogs(prev => [...prev, `[ERR] ${errText}`]);
                setScanStatus('error');
            }
        } catch (err) {
            console.error("Context Scan Error:", err);
            setScanStatus('error');
            setTerminalLogs(prev => [...prev, `[ERR] Critical engine failure: ${String(err)}`]);
        }
    }, [activeInvestigationId]);

    return (
        <InvestigationContext.Provider value={{
            activeInvestigationId,
            setActiveInvestigationId,
            scanStatus,
            setScanStatus,
            evidenceCount,
            setEvidenceCount,
            evidence,
            setEvidence,
            entities,
            setEntities,
            terminalLogs,
            setTerminalLogs,
            refresh,
            startScan
        }}>
            {children}
        </InvestigationContext.Provider>
    );
}

export function useInvestigation() {
    const context = useContext(InvestigationContext);
    if (!context) {
        throw new Error('useInvestigation must be used within an InvestigationProvider');
    }
    return context;
}
