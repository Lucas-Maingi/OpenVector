"use client";

import { useState, useEffect } from "react";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ScanButton({ id, autoStart = false, onComplete }: {
    id: string;
    autoStart?: boolean;
    onComplete?: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const router = useRouter();

    const handleScan = async () => {
        setLoading(true);
        setStatus('idle');
        try {
            const openAiKey = typeof window !== 'undefined' ? localStorage.getItem("openvector_openai_key") : null;
            const headers: Record<string, string> = { "Content-Type": "application/json" };
            if (openAiKey) headers['x-openai-key'] = openAiKey;

            const res = await fetch(`/api/investigations/${id}/scan`, {
                method: "POST",
                headers,
            });
            if (!res.ok) throw new Error("Scan failed");

            setStatus('success');
            if (onComplete) onComplete();

            // Refresh the server component to show new evidence
            router.refresh();

            setTimeout(() => setStatus('idle'), 4000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
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
