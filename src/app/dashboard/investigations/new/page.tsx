"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Search, Mail, AtSign, Phone, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function NewInvestigationPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            subjectName: formData.get("subjectName") as string,
            subjectUsername: formData.get("subjectUsername") as string,
            subjectEmail: formData.get("subjectEmail") as string,
            subjectPhone: formData.get("subjectPhone") as string,
            description: formData.get("description") as string,
        };

        if (!data.title) {
            setError("Investigation title is required.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/investigations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to create investigation");

            const investigation = await res.json();
            router.push(`/dashboard/investigations/${investigation.id}`);
        } catch (err) {
            setError("An error occurred while creating the investigation.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent ring-1 ring-accent/20">
                    <Shield className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">New Target Vector</h1>
                    <p className="text-text-tertiary">Initialize a new open-source intelligence scan.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="bg-surface/50 border-white/5">
                    <CardHeader>
                        <CardTitle>Core Metadata</CardTitle>
                        <CardDescription>Give this investigation a name and brief context.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-text-tertiary">Investigation Title</label>
                            <input
                                name="title"
                                required
                                className="w-full bg-background/50 border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 text-sm outline-none transition-all"
                                placeholder="Operation Nightshade / User Audit / OSINT-2026-X"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-text-tertiary">Description (Optional)</label>
                            <textarea
                                name="description"
                                rows={2}
                                className="w-full bg-background/50 border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 text-sm outline-none transition-all resize-none"
                                placeholder="Describe the objective of this scan..."
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-surface/50 border-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="w-5 h-5 text-accent" />
                            Target Vectors
                        </CardTitle>
                        <CardDescription>Known details to initialize the vector mapping.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <VectorInput name="subjectName" label="Full Name" icon={<Shield className="w-4 h-4" />} placeholder="John Doe" />
                        <VectorInput name="subjectUsername" label="Primary Username" icon={<AtSign className="w-4 h-4" />} placeholder="jdoe_admin" />
                        <VectorInput name="subjectEmail" label="Email Address" type="email" icon={<Mail className="w-4 h-4" />} placeholder="j.doe@company.com" />
                        <VectorInput name="subjectPhone" label="Phone Number" icon={<Phone className="w-4 h-4" />} placeholder="+1 (555) 000-0000" />
                    </CardContent>
                </Card>

                {error && (
                    <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm flex items-center gap-3">
                        <span className="font-mono text-xs uppercase font-bold">[FAILURE]</span>
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}>
                        Abort Operation
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="px-10 h-14 group" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Initializing...
                            </>
                        ) : (
                            <>
                                Initialize Scan
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

function VectorInput({ name, label, icon, placeholder, type = "text" }: { name: string, label: string, icon: React.ReactNode, placeholder: string, type?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                {icon}
                {label}
            </label>
            <input
                name={name}
                type={type}
                className="w-full bg-background/50 border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-3 text-sm outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}
