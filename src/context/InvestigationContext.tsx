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
            setTerminalLogs([]);
            setEvidenceCount(0);
            return;
        }
        refresh();
    }, [activeInvestigationId, refresh]);

    // Global Polling Effect
    useEffect(() => {
        if (!activeInvestigationId || scanStatus !== 'scanning') return;

        console.log(`[Context] Polling sequence initiated for ${activeInvestigationId}`);

        const interval = setInterval(refresh, 3000);
        return () => clearInterval(interval);
    }, [activeInvestigationId, scanStatus, refresh]);

    const startScan = useCallback(async (id: string) => {
        setActiveInvestigationId(id);
        setScanStatus('scanning');
        setTerminalLogs(["Initializing Aletheia Intelligence Engine v2.4.5..."]);
        
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
                    // Prepend the engine header and add the logs
                    setTerminalLogs([
                        "🚀 Initializing Aletheia Intelligence Engine v2.5.0...",
                        ...data.initialLogs
                    ]);
                }
            } else {
                throw new Error("Scan initiation failed");
            }
        } catch (err) {
            console.error("Context Scan Error:", err);
            setScanStatus('error');
        }
    }, []);

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
