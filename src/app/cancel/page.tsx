"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
            <div className="max-w-md space-y-8 animate-fade-in">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-warning/20 border border-warning/30 flex items-center justify-center text-warning mb-6">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Payment Canceled</h1>
                    <p className="text-text-secondary text-lg">
                        Your transaction was not completed. No charges were made.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-surface border border-border space-y-6">
                    <p className="text-sm text-text-secondary">
                        Founding Analyst seats are filling up fast. Re-secure your spot for the one-time $99 deal.
                    </p>
                    <Link href="/#pricing">
                        <Button className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-glow">
                            <ArrowLeft className="mr-2 w-5 h-5" />
                            Return to Pricing
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
