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
    startScan: (id: string) => Promise<void>;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export function InvestigationProvider({ children }: { children: React.ReactNode }) {
    const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
    const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle');
    const [evidenceCount, setEvidenceCount] = useState(0);
    const [evidence, setEvidence] = useState<any[]>([]);
    const [entities, setEntities] = useState<any[]>([]);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

    // Proactive fetch when active ID changes
    useEffect(() => {
        if (!activeInvestigationId) {
            setTerminalLogs([]);
            setEvidenceCount(0);
            return;
        }

        const fetchInitial = async () => {
            const data = await pollInvestigation(activeInvestigationId);
            if (data) {
                const formatted = formatTerminalLogs(data);
                setTerminalLogs(formatted);
                setEvidenceCount(data.evidence.length);
                setEvidence(data.evidence);
                setEntities(data.entities);
                
                if (data.status === 'active' && scanStatus === 'idle') {
                    setScanStatus('scanning');
                } else if (data.status === 'closed') {
                    setScanStatus('complete');
                }
            }
        };

        fetchInitial();
    }, [activeInvestigationId]);

    // Global Polling Effect
    useEffect(() => {
        if (!activeInvestigationId || scanStatus !== 'scanning') return;

        console.log(`[Context] Starting polling for ${activeInvestigationId}`);

        const interval = setInterval(async () => {
            const data = await pollInvestigation(activeInvestigationId);
            if (!data) return;

            const formatted = formatTerminalLogs(data);
            
            // Only update state if something actually changed to avoid re-render loops
            setTerminalLogs(prev => {
                if (JSON.stringify(prev) === JSON.stringify(formatted)) return prev;
                return formatted;
            });

            setEvidenceCount(data.evidence.length);
            setEvidence(data.evidence);
            setEntities(data.entities);

            if (data.status === 'closed' || data.status === 'error') {
                setScanStatus(data.status === 'closed' ? 'complete' : 'error');
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [activeInvestigationId, scanStatus]);

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

            if (!res.ok) throw new Error("Scan initiation failed");
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
