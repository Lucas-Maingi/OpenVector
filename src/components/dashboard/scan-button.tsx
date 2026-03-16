"use client";

import { useState, useEffect } from "react";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInvestigation } from "@/context/InvestigationContext";

export function ScanButton({ id, autoStart = false, onComplete }: {
    id: string;
    autoStart?: boolean;
    onComplete?: () => void;
}) {
    const { startScan, scanStatus } = useInvestigation();
    const router = useRouter();

    const loading = scanStatus === 'scanning';
    const status = scanStatus === 'complete' ? 'success' : scanStatus === 'error' ? 'error' : 'idle';

    const handleScan = async () => {
        await startScan(id);
        if (onComplete) onComplete();
        router.refresh();
    };

    // Auto-start scan if flagged (triggered from new investigation form)
    useEffect(() => {
        if (autoStart) {
            handleScan();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoStart]);

    return (
        <Button
            variant={status === 'success' ? 'secondary' : 'primary'}
            onClick={handleScan}
            disabled={loading}
            className="min-w-[140px] shadow-glow"
        >
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                </>
            ) : status === 'success' ? (
                <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-success" />
                    Scan Complete
                </>
            ) : status === 'error' ? (
                <>
                    <AlertCircle className="w-4 h-4 mr-2 text-error" />
                    Retry Scan
                </>
            ) : (
                <>
                    <Zap className="w-4 h-4 mr-2" />
                    Re-Scan
                </>
            )}
        </Button>
    );
}
