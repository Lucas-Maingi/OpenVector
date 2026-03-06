"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Search, Mail, AtSign, Phone, Globe, ImageIcon, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            subjectDomain: formData.get("subjectDomain") as string,
            subjectImageUrl: formData.get("subjectImageUrl") as string,
            description: formData.get("description") as string,
        };

        if (!data.title?.trim()) {
            setError("Investigation title is required.");
            setLoading(false);
            return;
        }

        try {
            // Step 1: Create the investigation
            const createRes = await fetch("/api/investigations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const createJson = await createRes.json();
            if (!createRes.ok) {
                setError(createJson.error || "Failed to create investigation.");
                setLoading(false);
                return;
            }

            const investigation = createJson;

            // Step 2: Auto-trigger the scan (fire-and-forget, don't await)
            // Navigate immediately; the detail page will show results after scan completes
            fetch(`/api/investigations/${investigation.id}/scan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }).catch(() => {/* scan errors handled on detail page */ });

            // Navigate with ?scanning=1 so detail page shows a progress banner
            router.push(`/dashboard/investigations/${investigation.id}?scanning=1`);
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
            setLoading(false);
        }
    };


    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4 py-2">
                <div className="p-3 bg-accent/15 rounded-2xl text-accent ring-1 ring-accent/30 shrink-0">
                    <Shield className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">New Target Vector</h1>
                    <p className="text-sm text-white/50 mt-0.5">Initialize a new open-source intelligence scan.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Core Metadata */}
                <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 bg-white/3">
                        <h2 className="text-sm font-semibold text-white">Core Metadata</h2>
                        <p className="text-xs text-white/50 mt-0.5">Give this investigation a name and brief context.</p>
                    </div>
                    <div className="p-6 space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">
                                Investigation Title <span className="text-accent">*</span>
                            </label>
                            <input
                                name="title"
                                required
                                className="w-full bg-white/8 border border-white/20 hover:border-white/35 focus:border-accent focus:ring-2 focus:ring-accent/25 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                                placeholder="e.g. Operation Nightshade / OSINT-2026-X"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">
                                Description <span className="text-white/30 font-normal normal-case">(optional)</span>
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                className="w-full bg-white/8 border border-white/20 hover:border-white/35 focus:border-accent focus:ring-2 focus:ring-accent/25 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all resize-none"
                                placeholder="Describe the objective of this scan..."
                            />
                        </div>
                    </div>
                </section>

                {/* Target Vectors */}
                <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 bg-white/3">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-accent" />
                            <h2 className="text-sm font-semibold text-white">Target Vectors</h2>
                        </div>
                        <p className="text-xs text-white/50 mt-0.5">Known details to initialize the vector mapping. Fill in at least one.</p>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <VectorInput
                            name="subjectName"
                            label="Full Name"
                            icon={<Shield className="w-3.5 h-3.5" />}
                            placeholder="John Doe"
                        />
                        <VectorInput
                            name="subjectUsername"
                            label="Username"
                            icon={<AtSign className="w-3.5 h-3.5" />}
                            placeholder="jdoe_admin"
                        />
                        <VectorInput
                            name="subjectEmail"
                            label="Email Address"
                            type="email"
                            icon={<Mail className="w-3.5 h-3.5" />}
                            placeholder="j.doe@company.com"
                        />
                        <VectorInput
                            name="subjectPhone"
                            label="Phone Number"
                            icon={<Phone className="w-3.5 h-3.5" />}
                            placeholder="+1 (555) 000-0000"
                        />
                        <VectorInput
                            name="subjectDomain"
                            label="Target Domain"
                            icon={<Globe className="w-3.5 h-3.5" />}
                            placeholder="company.com"
                        />
                        <VectorInput
                            name="subjectImageUrl"
                            label="Image URL"
                            icon={<ImageIcon className="w-3.5 h-3.5" />}
                            placeholder="https://example.com/face.jpg"
                        />
                    </div>
                </section>

                {/* Error */}
                {error && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        disabled={loading}
                        className="text-sm text-white/45 hover:text-white/70 transition-colors disabled:opacity-40"
                    >
                        ← Cancel
                    </button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="px-8 h-12 group font-semibold"
                        disabled={loading}
                    >
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

function VectorInput({
    name,
    label,
    icon,
    placeholder,
    type = "text",
}: {
    name: string;
    label: string;
    icon: React.ReactNode;
    placeholder: string;
    type?: string;
}) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-white/65 uppercase tracking-widest">
                <span className="text-accent/70">{icon}</span>
                {label}
            </label>
            <input
                name={name}
                type={type}
                className="w-full bg-white/8 border border-white/20 hover:border-white/35 focus:border-accent focus:ring-2 focus:ring-accent/25 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}
