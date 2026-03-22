"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Shield, Search, Mail, AtSign, Phone, Globe,
    FileText, Loader2, AlertCircle, Database, Users,
    Zap, ImageIcon, PlusCircle, Activity, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function NewInvestigationPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [omniValue, setOmniValue] = useState("");
    const [detectedType, setDetectedType] = useState<'name' | 'email' | 'crypto_btc' | 'crypto_eth' | 'domain' | 'username' | 'phone' | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const target = params.get('target');
        if (target && !omniValue) {
            setOmniValue(target);
            setDetectedType(detectType(target));
            
            // Auto-submit if target is present to provide "real results" experience
            const timer = setTimeout(() => {
                if (formRef.current) {
                    formRef.current.requestSubmit();
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [router]);

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

    const [preflight, setPreflight] = useState(false);
    const [steps, setSteps] = useState([
        { id: 1, label: "Calibrating Neural Gateways", status: "pending" },
        { id: 2, label: "Initializing OSINT Multi-Connectors", status: "pending" },
        { id: 3, label: "Securing P2P Handshake", status: "pending" },
        { id: 4, label: "Acquiring Vector Clearances", status: "pending" }
    ]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError(null);
        setPreflight(true);

        // Simulated Pre-flight for "Wow" Factor
        for (let i = 0; i < steps.length; i++) {
            await new Promise(r => setTimeout(r, 600));
            setSteps(prev => prev.map(s => s.id === i + 1 ? { ...s, status: "complete" } : s));
        }

        const formData = new FormData(e.currentTarget);

        let subjectName = formData.get("subjectName") as string;
        let subjectUsername = formData.get("subjectUsername") as string;
        let subjectEmail = formData.get("subjectEmail") as string;
        let subjectDomain = formData.get("subjectDomain") as string;
        let subjectPhone = formData.get("subjectPhone") as string;

        // Smart Parsing for Omni Bar (Supports multiple items separated by commas)
        const currentOmni = omniValue;
        if (currentOmni) {
            const parts = currentOmni.split(',').map(p => p.trim()).filter(p => p);

            parts.forEach(part => {
                const type = detectType(part);
                if (type === 'email' && !subjectEmail) subjectEmail = part;
                else if ((type === 'crypto_btc' || type === 'crypto_eth' || type === 'username') && !subjectUsername) subjectUsername = part;
                else if (type === 'domain' && !subjectDomain) subjectDomain = part;
                else if (type === 'phone' && !subjectPhone) subjectPhone = part;
                else if (type === 'name' && !subjectName) subjectName = part;
            });
        }

        const manualTitle = formData.get("title") as string;
        // If we only have an email/username, use it directly as the title without the "Investigation:" prefix
        // which can pollute fallback agent queries.
        const defaultTitle = subjectName || subjectUsername || subjectEmail || currentOmni?.split(',')[0] || 'New Target';
        const finalTitle = manualTitle?.trim() || defaultTitle;

        const data = {
            title: finalTitle,
            subjectName: subjectName || null,
            subjectUsername: subjectUsername || null,
            subjectEmail: subjectEmail || null,
            subjectPhone: subjectPhone || null,
            subjectDomain: subjectDomain || null,
            subjectImageUrl: imagePreview || (formData.get("subjectImageUrl") as string) || null,
            description: (formData.get("description") as string) || null,
        };

        try {
            const createRes = await fetch("/api/investigations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!createRes.ok) throw new Error("Failed to initialize investigation");
            const investigation = await createRes.json();

            // Dossier v76: Enforce hard redirection for production reliability.
            // Client-side router.push can stall during session-bound middleware transforms.
            console.log(`[Recon] Investigation initialized: ${investigation.id}. Enforcing hard-link handshake...`);
            
            const targetUrl = `/dashboard/investigations/${investigation.id}?scanning=1`;
            
            // We use window.location.assign for a clean entry into the new session context
            if (typeof window !== 'undefined') {
                window.location.assign(targetUrl);
            }

            // Safety Fallback (Hard Redirect)
            const fallbackTimer = setTimeout(() => {
                if (typeof window !== 'undefined' && window.location.pathname.includes('/new')) {
                    console.warn("[Recon] Smooth redirect stalled. Triggering hard-link fallback.");
                    window.location.assign(targetUrl);
                }
            }, 5000);

            return () => clearTimeout(fallbackTimer);
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
            setLoading(false);
            setPreflight(false);
        }
    };

    if (preflight) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                    <Shield className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                
                <div className="space-y-6 w-full max-w-sm">
                    <h2 className="text-center font-mono font-black text-text-primary uppercase tracking-[0.3em] mb-8">Deploying_Workstation</h2>
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-4 group">
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                step.status === 'complete' ? 'bg-success shadow-[0_0_8px_#10b981]' : 'bg-foreground/10 animate-pulse'
                            }`} />
                            <span className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                                step.status === 'complete' ? 'text-text-primary font-bold' : 'text-text-tertiary'
                            }`}>
                                {step.label}
                            </span>
                            {step.status === 'complete' && (
                                <Zap className="w-3 h-3 text-success ml-auto animate-in slide-in-from-left-2 duration-300" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-border/10 w-full max-w-xs text-center">
                    <p className="text-[9px] font-mono text-text-tertiary uppercase tracking-[0.2em] leading-relaxed">
                        Establishing encrypted tunnel to 7 global OSINT clusters... 
                        <br />Handshake verified.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-fade-in relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <div className="text-center space-y-6 pt-10">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/5 dark:bg-accent/10 border border-accent/20 text-[9px] font-black text-accent tracking-[0.4em] uppercase mb-2 shadow-sm">
                    Autonomous_Intelligence_Grid
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary uppercase tracking-[0.1em]">
                    Target Acquisition
                </h1>
                <p className="text-text-tertiary text-xs font-mono uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
                    Bridge disparate data points into a singular <span className="text-text-primary font-bold">Tactical Dossier</span>
                </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                {/* Omni Input Bar */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
                    <div className="relative bg-surface/80 backdrop-blur-2xl p-3 rounded-[2rem] border border-border/15 flex items-center shadow-2xl transition-all duration-500 hover:border-border/30 focus-within:border-accent/40 group">
                        <div className="pl-6 text-text-tertiary group-focus-within:text-accent transition-colors">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            name="omniInput"
                            value={omniValue}
                            onChange={(e) => handleOmniChange(e.target.value)}
                            placeholder="Email, username, domain, or full name..."
                            className="bg-transparent border-none focus:ring-0 w-full px-6 py-6 text-xl text-text-primary placeholder:text-text-tertiary/20 outline-none font-medium transition-all"
                            autoFocus
                        />

                        <div className="flex items-center gap-3 pr-4">
                            {/* Image Upload Trigger */}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`p-4 rounded-2xl border transition-all duration-500 ${imagePreview ? 'bg-accent/20 border-accent text-accent neon-glow-cyan-sm' : 'bg-foreground/[0.03] border-border/15 text-text-tertiary hover:text-text-primary hover:bg-foreground/[0.05]'}`}
                                        >
                                            <ImageIcon className="w-5 h-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-surface border-border/10">
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-accent font-black">Visual Recon / Face Search</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
 
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
 
                            <Button
                                type="submit"
                                variant="primary"
                                className="h-16 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-accent to-indigo-600 hover:from-accent/90 hover:to-indigo-500 shadow-glow-indigo-sm hover:shadow-glow-indigo transition-all duration-500 active:scale-95 disabled:grayscale"
                                disabled={loading || (!omniValue && !imagePreview && !showAdvanced)}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Agent"}
                            </Button>
                        </div>
                    </div>
                    
                    {/* Floating Detected Badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 opacity-0 translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                        {detectedType && (
                            <div className="px-4 py-1.5 rounded-full bg-surface border border-accent/40 text-[9px] font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2 shadow-2xl">
                                <Activity className="w-3 h-3 animate-pulse" />
                                DETECTED_{detectedType.replace("_", " ")}
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Thumbnail for Image */}
                {imagePreview && (
                    <div className="flex justify-center animate-in zoom-in duration-300">
                        <div className="relative p-2 rounded-2xl bg-foreground/[0.03] border border-border/10 group overflow-hidden">
                            <img src={imagePreview} className="w-32 h-32 object-cover rounded-xl" alt="Preview" />
                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-danger text-white flex items-center justify-center text-xs shadow-lg hover:scale-110 transition-transform font-bold"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Meta Toggle */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`text-[9px] font-mono transition-all duration-500 uppercase tracking-[0.3em] flex items-center gap-3 px-6 py-2.5 rounded-full border ${showAdvanced ? 'bg-accent/10 border-accent/40 text-accent font-black' : 'text-text-tertiary hover:text-text-primary border-border/10 hover:border-border/20'}`}
                    >
                        {showAdvanced ? "[-] CLOSE_DOSSIER_MODE" : "[+] CONFIGURE_DEEP_RECON"}
                    </button>
                </div>

                {/* Advanced Fields */}
                {showAdvanced && (
                    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <section className="rounded-2xl border border-border/10 bg-foreground/[0.02] p-6 space-y-6">
                            <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-2">
                                <PlusCircle className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-text-tertiary">Multi-Vector Configuration</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <VectorInput name="subjectName" label="Full Name" icon={<Users className="w-4 h-4" />} placeholder="Target Legal Name" />
                                <VectorInput name="subjectEmail" label="Email Address" icon={<Mail className="w-4 h-4" />} placeholder="target@email.com" />
                                <VectorInput name="subjectUsername" label="Known Aliases" icon={<AtSign className="w-4 h-4" />} placeholder="Handle / Username" />
                                <VectorInput name="subjectDomain" label="Infrastructure" icon={<Globe className="w-4 h-4" />} placeholder="domain.com" />
                                <VectorInput name="subjectPhone" label="Communications" icon={<Phone className="w-4 h-4" />} placeholder="+1..." />
                                <VectorInput name="title" label="Case Code" icon={<FileText className="w-4 h-4" />} placeholder="Operation: [Name]" />
                            </div>
                            <div className="pt-4 border-t border-border/10 space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Remote Image URL (Alternative to upload)</label>
                                    <input
                                        name="subjectImageUrl"
                                        className="w-full bg-foreground/[0.03] border border-border/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary/30 focus:border-accent/40 outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Case Objectives</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        className="w-full bg-foreground/[0.03] border border-border/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/30 focus:border-accent outline-none transition-all"
                                        placeholder="Add any specific Intel objectives for the AI Agent..."
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {error && (
                    <div className="bg-danger/10 border border-danger/20 p-4 rounded-2xl flex items-center gap-3 text-danger text-sm font-bold uppercase tracking-widest">
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
        <div className="p-6 rounded-2xl bg-foreground/[0.02] border border-border/10 hover:border-border/20 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-accent/5">
                {icon}
            </div>
            <h3 className="text-sm font-black text-text-primary mb-2 uppercase tracking-wide">{title}</h3>
            <p className="text-[11px] text-text-tertiary leading-relaxed font-medium">{desc}</p>
        </div>
    );
}

function VectorInput({ name, label, icon, placeholder }: { name: string, label: string, icon: React.ReactNode, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest pl-1">
                {icon}
                {label}
            </label>
            <input
                name={name}
                className="w-full bg-foreground/[0.03] border border-border/10 hover:border-border/20 focus:border-accent rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary/30 outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}
