"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Shield, Search, Mail, AtSign, Phone, Globe, ImageIcon, ArrowRight, Loader2, AlertCircle, Upload, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewInvestigationPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
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
            subjectImageUrl: imageMode === 'upload' ? uploadedImageUrl : (formData.get("subjectImageUrl") as string),
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

            let createJson;
            try {
                createJson = await createRes.json();
            } catch (err) {
                const text = await createRes.text();
                throw new Error(`Server error: Expected JSON but received HTML or empty response. Status: ${createRes.status}`);
            }

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
            {/* Sticky Global Navigation & Breadcrumbs */}
            <div className="sticky top-0 z-40 bg-surface-2/80 backdrop-blur-xl pb-4 pt-2 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-6 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary mb-3">
                    <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
                    <span className="opacity-50">/</span>
                    <a href="/dashboard/investigations" className="hover:text-white transition-colors">Investigations</a>
                    <span className="opacity-50">/</span>
                    <span className="text-white truncate">New Target</span>
                </div>

                <div className="flex items-center gap-4">
                    <a href="/dashboard/investigations">
                        <Button variant="ghost" size="icon" className="h-8 w-8 border border-white/5 bg-background/50 hover:bg-white/10 rounded-full">
                            <Search className="w-3.5 h-3.5 rotate-90" style={{ transform: 'rotate(270deg)' }} />
                        </Button>
                    </a>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight text-white">New Target Vector</h1>
                        </div>
                        <p className="text-sm text-white/50 mt-0.5">Initialize a new open-source intelligence scan.</p>
                    </div>
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
                        {/* Image — URL or file upload */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-white/65 uppercase tracking-widest">
                                    <span className="text-accent/70"><ImageIcon className="w-3.5 h-3.5" /></span>
                                    Image
                                </label>
                                <div className="flex text-[10px] border border-white/15 rounded-md overflow-hidden">
                                    <button type="button" onClick={() => setImageMode('url')}
                                        className={`px-2 py-0.5 transition-colors ${imageMode === 'url' ? 'bg-accent text-white' : 'text-white/45 hover:text-white/70'}`}>
                                        <Link className="w-3 h-3 inline mr-1" />URL
                                    </button>
                                    <button type="button" onClick={() => setImageMode('upload')}
                                        className={`px-2 py-0.5 transition-colors ${imageMode === 'upload' ? 'bg-accent text-white' : 'text-white/45 hover:text-white/70'}`}>
                                        <Upload className="w-3 h-3 inline mr-1" />Upload
                                    </button>
                                </div>
                            </div>
                            {imageMode === 'url' ? (
                                <input
                                    name="subjectImageUrl"
                                    type="url"
                                    className="w-full bg-white/8 border border-white/20 hover:border-white/35 focus:border-accent focus:ring-2 focus:ring-accent/25 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                                    placeholder="https://example.com/face.jpg"
                                />
                            ) : (
                                <ImageUploadField onUploaded={setUploadedImageUrl} />
                            )}
                        </div>
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

function ImageUploadField({ onUploaded }: { onUploaded: (url: string) => void }) {
    const [preview, setPreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert("Please upload an image file.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Image too large. Please use an image smaller than 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreview(result);
            onUploaded(result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className={`relative group h-32 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden ${dragging ? 'border-accent bg-accent/5' : 'border-white/10 hover:border-white/25 bg-white/5'
                }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
            />

            {preview ? (
                <>
                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 bg-surface/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white flex items-center gap-2 backdrop-blur-sm">
                        <Upload className="w-3.5 h-3.5 text-accent" />
                        Change Image
                    </div>
                </>
            ) : (
                <>
                    <div className="p-2 bg-white/5 rounded-full text-white/40 group-hover:text-accent transition-colors">
                        <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-white/60 font-medium">Drop image here</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">or click to browse</p>
                    </div>
                </>
            )}
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
