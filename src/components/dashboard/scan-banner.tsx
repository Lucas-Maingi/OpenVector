"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Zap } from "lucide-react";
import { useInvestigation } from "@/context/InvestigationContext";

export function ScanBanner({ investigationId }: { investigationId: string }) {
    const [done, setDone] = useState(false);
    const [dots, setDots] = useState(".");
    const { scanStatus } = useInvestigation();
    const router = useRouter();

    // Animate the loading dots
    useEffect(() => {
        if (done) return;
        const interval = setInterval(() => {
            setDots(d => d.length >= 3 ? "." : d + ".");
        }, 500);
        return () => clearInterval(interval);
    }, [done]);

    // Effect to detect completion and trigger a router refresh
    useEffect(() => {
        if (scanStatus === 'complete' || scanStatus === 'error') {
            setDone(true);
            const t = setTimeout(() => {
                router.refresh(); // Sync server components after background job finishes
            }, 2000);
            return () => clearTimeout(t);
        }
    }, [scanStatus, router]);

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
