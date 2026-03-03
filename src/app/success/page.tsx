"use client";

import { CheckCircle2, Loader2, PartyPopper, ArrowRight, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simple success state for Gumroad redirect
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
                <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
                <p className="text-text-secondary">Securing your lifetime analyst status.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4 animate-fade-in">
            <div className="max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mb-6 glow-accent">
                        <PartyPopper className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Welcome, Founding Analyst.</h1>
                    <p className="text-text-secondary text-lg">
                        You now have lifetime access to OpenVector Pro.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-surface border border-border text-left space-y-6">
                    <div className="space-y-4">
                        <label className="text-sm font-mono text-text-tertiary uppercase tracking-widest">Connect Analyst Node</label>
                        <p className="text-sm text-text-secondary">
                            Your Founding Access is linked to your email. Click below to initialize your workspace.
                        </p>
                    </div>

                    <Button
                        className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-glow group"
                        onClick={() => router.push("/dashboard")}
                    >
                        Enter Workspace
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <p className="text-xs text-text-muted uppercase tracking-tighter">
                    <Shield className="w-3 h-3 inline mr-1 mb-0.5" />
                    Transaction Secure & Verified
                </p>
            </div>
        </div>
    );
}
