"use client";

import { useEffect } from "react";
import { SignalLostError } from "@/components/dashboard/signal-lost";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Investigation Detail Error:", error);
    }, [error]);

    return (
        <div className="relative w-full min-h-[70vh] rounded-2xl bg-black border border-white/5 overflow-hidden">
            <SignalLostError onRetry={reset} />
            <div className="absolute bottom-4 left-4 right-4 z-50 pointer-events-none text-center">
                <div className="inline-block bg-black/60 p-3 rounded-lg border border-rose-500/20 font-mono text-xs text-rose-400 max-w-lg mt-4 backdrop-blur-md">
                    [ERR_LOG]: {error.message || "Unknown rendering exception"}
                </div>
            </div>
        </div>
    );
}
