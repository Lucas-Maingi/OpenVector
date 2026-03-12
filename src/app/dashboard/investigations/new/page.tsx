"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Shield, Search, Mail, AtSign, Phone, Globe,
    FileText, Loader2, AlertCircle, Database, Users,
    Zap, ImageIcon, PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewInvestigationPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [omniValue, setOmniValue] = useState("");
    const [detectedType, setDetectedType] = useState<'name' | 'email' | 'crypto_btc' | 'crypto_eth' | 'domain' | 'username' | 'phone' | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const detectType = (val: string) => {
        const v = val.trim();
        if (!v) return null;
        if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}$/.test(v)) return 'crypto_btc';
        if (/^0x[a-fA-F0-9]{40}$/i.test(v)) return 'crypto_eth';
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'email';
        if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) return 'domain';
        if (/^\+?[0-9\s-]{8,}$/.test(v)) return 'phone';
        if (v.includes(" ")) return 'name';
        return 'username';
    };

    const handleOmniChange = (val: string) => {
        setOmniValue(val);
        setDetectedType(detectType(val));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        let subjectName = formData.get("subjectName") as string;
        let subjectUsername = formData.get("subjectUsername") as string;
        let subjectEmail = formData.get("subjectEmail") as string;
        let subjectDomain = formData.get("subjectDomain") as string;
        let subjectPhone = formData.get("subjectPhone") as string;

        // Smart Parsing for Omni Bar (Supports multiple items separated by commas)
        if (omniValue) {
            const parts = omniValue.split(',').map(p => p.trim()).filter(p => p);

            parts.forEach(part => {
                const type = detectType(part);
                if (type === 'email' && !subjectEmail) subjectEmail = part;
                else if ((type === 'crypto_btc' || type === 'crypto_eth' || type === 'username') && !subjectUsername) subjectUsername = part;
                else if (type === 'domain' && !subjectDomain) subjectDomain = part;
                else if (type === 'phone' && !subjectPhone) subjectPhone = part;
                else if (type === 'name' && !subjectName) subjectName = part;
            });
        }

        const data = {
            title: (formData.get("title") as string) || `Investigation: ${subjectName || subjectUsername || subjectEmail || 'New Target'}`,
            subjectName,
            subjectUsername,
            subjectEmail,
            subjectPhone,
            subjectDomain,
            subjectImageUrl: imagePreview || (formData.get("subjectImageUrl") as string),
            description: formData.get("description") as string,
        };

        try {
            const createRes = await fetch("/api/investigations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!createRes.ok) throw new Error("Failed to initialize investigation");
            const investigation = await createRes.json();

            const geminiKey = typeof window !== 'undefined' ? localStorage.getItem("openvector_gemini_key") : null;
            const headers: Record<string, string> = { "Content-Type": "application/json" };
            if (geminiKey) headers['x-gemini-key'] = geminiKey;

            fetch(`/api/investigations/${investigation.id}/scan`, {
                method: "POST",
                headers,
            }).catch(() => { });

            router.push(`/dashboard/investigations/${investigation.id}?scanning=1`);
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4 pt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent tracking-widest uppercase mb-4">
                    Autonomous Intelligence Agent
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">Target Acquisition</h1>
                <p className="text-text-tertiary text-lg max-w-xl mx-auto">
                    Provide one or more data points. OpenVector will bridge the gaps and build a comprehensive timeline.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Omni Input Bar */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-blue rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-surface p-2 rounded-3xl border border-white/10 flex items-center shadow-2xl">
                        <div className="pl-6 text-accent">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            value={omniValue}
                            onChange={(e) => handleOmniChange(e.target.value)}
                            placeholder="Email, BTC/ETH, Domain, or Full Name..."
                            className="bg-transparent border-none focus:ring-0 w-full px-6 py-5 text-xl text-white placeholder:text-white/20 outline-none font-medium"
                            autoFocus
                        />

                        <div className="flex items-center gap-2 pr-4">
                            {/* Image Upload Trigger */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={`p-3 rounded-xl border transition-all ${imagePreview ? 'bg-accent/20 border-accent text-accent' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}
                                title="Image Search / Face Recon"
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

                            {/* Detected Type Badge */}
                            <div className="hidden md:block">
                                {detectedType && (
                                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                        <Shield className="w-3 h-3" />
                                        {detectedType.replace("_", " ")} detected
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="h-14 px-8 rounded-2xl font-bold shadow-glow"
                            disabled={loading || (!omniValue && !imagePreview && !showAdvanced)}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Agent"}
                        </Button>
                    </div>
                </div>

                {/* Preview Thumbnail for Image */}
                {imagePreview && (
                    <div className="flex justify-center animate-in zoom-in duration-300">
                        <div className="relative p-2 rounded-2xl bg-white/5 border border-white/10">
                            <img src={imagePreview} className="w-24 h-24 object-cover rounded-xl" alt="Preview" />
                            <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-lg"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Meta Toggle */}
                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`text-xs font-mono transition-colors uppercase tracking-widest flex items-center gap-2 px-4 py-2 rounded-lg border ${showAdvanced ? 'bg-white/10 border-white/20 text-white' : 'text-white/30 hover:text-white/50 border-transparent'}`}
                    >
                        {showAdvanced ? "[-] Close Dossier Mode" : "[+] Build Comprehensive Dossier"}
                    </button>
                </div>

                {/* Advanced Fields */}
                {showAdvanced && (
                    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <section className="rounded-2xl border border-white/5 bg-white/2 p-6 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                                <PlusCircle className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Multi-Vector Configuration</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <VectorInput name="subjectName" label="Full Name" icon={<Users className="w-4 h-4" />} placeholder="Target Legal Name" />
                                <VectorInput name="subjectEmail" label="Email Address" icon={<Mail className="w-4 h-4" />} placeholder="target@email.com" />
                                <VectorInput name="subjectUsername" label="Known Aliases" icon={<AtSign className="w-4 h-4" />} placeholder="Handle / Username" />
                                <VectorInput name="subjectDomain" label="Infrastructure" icon={<Globe className="w-4 h-4" />} placeholder="domain.com" />
                                <VectorInput name="subjectPhone" label="Communications" icon={<Phone className="w-4 h-4" />} placeholder="+1..." />
                                <VectorInput name="title" label="Case Code" icon={<FileText className="w-4 h-4" />} placeholder="Operation: [Name]" />
                            </div>
                            <div className="pt-4 border-t border-white/5 space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Remote Image URL (Alternative to upload)</label>
                                    <input
                                        name="subjectImageUrl"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Case Objectives</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-accent outline-none"
                                        placeholder="Add any specific Intel objectives for the AI Agent..."
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                <OnboardingCard title="Instant Crypto Audit" desc="Paste any BTC/ETH address to scan for assets and affiliations." icon={<Database className="w-5 h-5 text-accent" />} />
                <OnboardingCard title="Identity Resolution" desc="Enter a name or username to bridge social profiles and aliases." icon={<Users className="w-5 h-5 text-accent" />} />
                <OnboardingCard title="Visual Reconnaissance" desc="Upload an image to perform deep reverse searches across OSINT databases." icon={<ImageIcon className="w-5 h-5 text-accent" />} />
            </div>
        </div>
    );
}

function OnboardingCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-text-tertiary leading-relaxed">{desc}</p>
        </div>
    );
}

function VectorInput({ name, label, icon, placeholder }: { name: string, label: string, icon: React.ReactNode, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                {icon}
                {label}
            </label>
            <input
                name={name}
                className="w-full bg-black/20 border border-white/10 hover:border-white/20 focus:border-accent rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}
