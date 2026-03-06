"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Zap } from "lucide-react";

export function ScanBanner({ investigationId }: { investigationId: string }) {
    const [done, setDone] = useState(false);
    const [dots, setDots] = useState(".");
    const router = useRouter();

    // Animate the loading dots
    useEffect(() => {
        if (done) return;
        const interval = setInterval(() => {
            setDots(d => d.length >= 3 ? "." : d + ".");
        }, 500);
        return () => clearInterval(interval);
    }, [done]);

    // Poll evidence count every 3s — when evidence appears, mark done and refresh
    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 20; // ~60 seconds timeout

        const poll = async () => {
            try {
                const res = await fetch(`/api/investigations/${investigationId}`);
                if (!res.ok) return;
                const data = await res.json();
                if (data._count?.evidence > 0 || data.status === 'closed') {
                    setDone(true);
                    // Reload the page without the ?scanning param to show fresh results
                    setTimeout(() => {
                        router.replace(`/dashboard/investigations/${investigationId}`);
                        router.refresh();
                    }, 1200);
                    return;
                }
            } catch { /* ignore */ }

            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(poll, 3000);
            } else {
                // Timed out — still refresh to show whatever was captured
                setDone(true);
                router.replace(`/dashboard/investigations/${investigationId}`);
                router.refresh();
            }
        };

        // Start polling after 2s initial delay (scan is running server-side)
        const timer = setTimeout(poll, 2000);
        return () => clearTimeout(timer);
    }, [investigationId, router]);

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
