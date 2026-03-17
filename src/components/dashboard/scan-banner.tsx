"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Zap } from "lucide-react";
import { pollInvestigation } from "@/lib/investigation-polling";

export function ScanBanner({ investigationId }: { investigationId: string }) {
    const [done, setDone] = useState(false);
    const [dots, setDots] = useState(".");
    const [isActive, setIsActive] = useState(true);
    const attemptsRef = useRef(0);
    const router = useRouter();

    // Animate the loading dots
    useEffect(() => {
        if (done) return;
        const interval = setInterval(() => {
            setDots(d => d.length >= 3 ? "." : d + ".");
        }, 500);
        return () => clearInterval(interval);
    }, [done]);

    // Poll status every 3s — when done/error, mark and refresh
    useEffect(() => {
        if (done || !isActive) return; // Stop polling if done or not active

        const poll = async () => {
            if (!isActive) return; // Double check if active before polling

            try {
                attemptsRef.current++; // Increment attempt count
                const data = await pollInvestigation(investigationId);
                
                // If evidence starts appearing, refresh periodically to show progress
                if (data?._count && data._count.evidence > 0) {
                    router.refresh(); 
                }

                // If the investigation is complete, closed, or in error, stop polling
                if (data && (data.status === 'complete' || data.status === 'closed' || data.status === 'error')) {
                    setIsActive(false);
                    setDone(true); // Mark as done
                    setTimeout(() => {
                        router.refresh(); // Final refresh after a short delay
                    }, 1500);
                    return;
                }

                // Self-Correction: If we've been polling for > 120s (40 attempts at 3s/attempt), 
                // re-verify explicitly and shut down if server says it's not active anymore.
                if (attemptsRef.current > 40 && data?.status !== 'active' && data?.status !== 'pending') {
                    console.warn(`Polling for investigation ${investigationId} stopped due to inactivity after ${attemptsRef.current} attempts.`);
                    setIsActive(false);
                    setDone(true); // Assume done if server says it's not active
                    setTimeout(() => {
                        router.refresh();
                    }, 1500);
                    return;
                }
            } catch { /* ignore */ }

            setTimeout(poll, 3000);
        };

        const timer = setTimeout(poll, 2000);
        return () => clearTimeout(timer);
    }, [investigationId, router, done]);

    return (
        <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-500 ${done
                ? "bg-green-500/10 border-green-500/25 text-green-400"
                : "bg-accent/8 border-accent/20 text-accent"
            }`}>
            {done ? (
                <>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Scan complete — loading results<span className="opacity-60">{dots}</span></span>
                </>
            ) : (
                <>
                    <Zap className="w-4 h-4 shrink-0 animate-pulse" />
                    <span>Intelligence sweep running{dots}</span>
                    <Loader2 className="w-3.5 h-3.5 ml-auto animate-spin opacity-60" />
                </>
            )}
        </div>
    );
}
