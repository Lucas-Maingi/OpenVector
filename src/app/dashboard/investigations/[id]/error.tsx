"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 animate-fade-in">
            <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Error Loading Investigation</h2>
            <p className="text-text-secondary text-sm max-w-md text-center">
                There was a problem rendering the investigation details. This could be due to malformed data or a rendering error.
            </p>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-xs text-red-400 max-w-lg overflow-auto">
                {error.message || "Unknown error occurred"}
            </div>
            <Button variant="outline" onClick={() => reset()} className="mt-4 border-white/10 hover:bg-white/5">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try again
            </Button>
        </div>
    );
}
