"use client";

import { useState } from "react";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScanButton({ id, onComplete }: { id: string, onComplete?: () => void }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleScan = async () => {
        setLoading(true);
        setStatus('idle');
        try {
            const openAiKey = localStorage.getItem("openvector_openai_key");
            const headers: Record<string, string> = {};
            if (openAiKey) {
                headers['x-openai-key'] = openAiKey;
            }

            const res = await fetch(`/api/investigations/${id}/scan`, {
                method: "POST",
                headers
            });
            if (!res.ok) throw new Error("Scan failed");

            setStatus('success');
            if (onComplete) onComplete();

            // Reset success status after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

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
                    Completed
                </>
            ) : status === 'error' ? (
                <>
                    <AlertCircle className="w-4 h-4 mr-2 text-error" />
                    Try Again
                </>
            ) : (
                <>
                    <Zap className="w-4 h-4 mr-2" />
                    Start Scan
                </>
            )}
        </Button>
    );
}
