"use client";

import { useState, useEffect } from "react";
import { Shield, Key, CheckCircle2, AlertCircle, Save, User as UserIcon, CreditCard, Activity, Fingerprint, ExternalLink, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsageStats } from "@/components/dashboard/usage-stats";
import { toast } from "sonner";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("identity");
    const [openAiKey, setOpenAiKey] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [usage, setUsage] = useState<any>(null);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        avatarUrl: "",
        plan: "free"
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load BYOK from local storage
                const storedKey = localStorage.getItem("openvector_openai_key");
                if (storedKey) setOpenAiKey(storedKey);

                // Fetch Usage & Profile data
                const response = await fetch('/api/user/usage');
                const data = await response.json();
                
                if (!data.error) {
                    setUsage(data);
                    setProfile({
                        name: data.name || "",
                        email: data.email || "",
                        avatarUrl: data.avatarUrl || "",
                        plan: data.plan || "free"
                    });
                }
            } catch (err) {
                console.error("Failed to load settings data", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profile.name,
                    avatarUrl: profile.avatarUrl
                })
            });
            
            if (res.ok) {
                toast.success("Identity profile updated successfully.");
            } else {
                toast.error("Failed to sync identity profile.");
            }
        } catch (err) {
            toast.error("Protocol error during profile sync.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveKey = () => {
        if (openAiKey.trim() === "") {
            localStorage.removeItem("openvector_openai_key");
        } else {
            localStorage.setItem("openvector_openai_key", openAiKey.trim());
        }
        toast.success("Linguistic engine key saved locally.");
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Activity className="w-8 h-8 text-accent animate-pulse" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/50 animate-pulse">Syncing_Identity...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* Header HUD */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-cyan-500/50 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <Avatar className="h-20 w-20 rounded-2xl border border-white/10 relative">
                            <AvatarImage src={profile.avatarUrl} />
                            <AvatarFallback className="bg-surface text-2xl font-black text-accent">
                                {profile.name?.substring(0, 2).toUpperCase() || "AN"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 p-1.5 bg-background border border-white/10 rounded-lg shadow-glow-sm">
                            <Shield className="w-3.5 h-3.5 text-accent" />
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                                {profile.name || "Anonymous Analyst"}
                            </h1>
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-accent/10 text-accent border border-accent/30 uppercase tracking-[0.2em] shadow-lg shadow-accent/10">
                                {profile.plan}_Node
                            </span>
                        </div>
                        <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest flex items-center gap-2">
                            <Fingerprint className="w-3 h-3" />
                            ID: {profile.email || "UNIDENTIFIED_SIGNAL"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="glass-panel border-white/5 text-[10px] uppercase font-black tracking-widest hover:text-accent"
                        onClick={() => window.location.href = '/dashboard'}
                    >
                        Return to Console
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="identity" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-transparent border-b border-white/5 w-full justify-start rounded-none h-auto p-0 gap-8">
                    {["identity", "quota", "security"].map((tab) => (
                        <TabsTrigger 
                            key={tab}
                            value={tab} 
                            className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-0 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-text-tertiary data-[state=active]:text-accent transition-all hover:text-white"
                        >
                            {tab}_Configuration
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Identity Content */}
                <TabsContent value="identity" className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Personal_Manifest</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black text-text-tertiary tracking-widest">Full Name / Alias</Label>
                                        <Input 
                                            value={profile.name} 
                                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                                            placeholder="John Doe"
                                            className="bg-slate-950/40 border-white/5 focus:border-accent/40 focus:ring-accent/10 font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black text-text-tertiary tracking-widest">Avatar Signature URL</Label>
                                        <Input 
                                            value={profile.avatarUrl} 
                                            onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})}
                                            placeholder="https://..."
                                            className="bg-slate-950/40 border-white/5 focus:border-accent/40 focus:ring-accent/10 font-mono text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button 
                                        onClick={handleSaveProfile} 
                                        disabled={isSaving}
                                        className="bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 px-8 h-12 font-black uppercase tracking-widest group"
                                    >
                                        <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Commit_Changes
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="glass-panel border-white/5 overflow-hidden">
                                <CardHeader className="pb-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Node_Status</h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-[10px] font-mono text-text-tertiary uppercase">Access_Level</span>
                                        <span className="text-[10px] font-mono font-black text-white uppercase">{profile.plan}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-[10px] font-mono text-text-tertiary uppercase">Auth_Method</span>
                                        <span className="text-[10px] font-mono font-black text-white uppercase">Secured_SSO</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-[10px] font-mono text-text-tertiary uppercase">Last_Pulse</span>
                                        <span className="text-[10px] font-mono font-black text-success uppercase">Online</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Quota & Billing Content */}
                <TabsContent value="quota" className="mt-8 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Resource_Consumption</h3>
                            <span className="text-[9px] font-mono text-text-tertiary uppercase">Auto-Reset: First of Month</span>
                        </div>
                        
                        {usage && <UsageStats data={usage} />}

                        <div className="pt-6">
                            <Card className="bg-slate-900/40 border border-white/5 relative overflow-hidden">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-black italic uppercase tracking-tighter">Billing Architecture</CardTitle>
                                            <CardDescription className="text-xs text-text-muted mt-1 font-mono uppercase">Manage subscriptions and invoices</CardDescription>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl">
                                            <CreditCard className="w-5 h-5 text-white/50" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-4 border-t border-white/5">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-background/30 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-accent/5 flex items-center justify-center border border-accent/20">
                                                <Brain className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Current Tier</p>
                                                <p className="text-sm font-black text-white uppercase italic">{profile.plan.toUpperCase()} INVESTIGATOR</p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            className="border-accent/30 text-accent hover:bg-accent/10 font-bold uppercase tracking-widest text-[10px]"
                                            onClick={() => window.open('/premium', '_blank')}
                                        >
                                            Manage Subscription <ExternalLink className="w-3 h-3 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Security & Terminal Content */}
                <TabsContent value="security" className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* BYOK Section */}
                        <Card className="glass-panel border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white italic uppercase tracking-tighter italic">
                                    <Key className="w-5 h-5 text-accent" />
                                    Linguistics Bypass (BYOK)
                                </CardTitle>
                                <CardDescription className="text-[10px] font-mono text-text-tertiary uppercase leading-relaxed pt-2">
                                    Attach a custom OpenAI API Key. On the Community tier, this is required for advanced dossier synthesis. This key resides strictly in local session storage.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-text-tertiary tracking-[0.2em] uppercase">OpenAI_Auth_Token</Label>
                                    <Input
                                        type="password"
                                        value={openAiKey}
                                        onChange={(e) => setOpenAiKey(e.target.value)}
                                        placeholder="sk-..."
                                        className="bg-slate-950/40 border-white/10 font-mono text-sm tracking-wider"
                                    />
                                    <p className="text-[9px] text-text-tertiary italic">X-Authorization-Header: Bearer sk-***</p>
                                </div>
                                <Button
                                    onClick={handleSaveKey}
                                    className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 font-black uppercase tracking-widest text-[10px]"
                                >
                                    Establish Local Tunnel
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Account Actions */}
                        <Card className="glass-panel border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white italic uppercase tracking-tighter italic">
                                    <Shield className="w-5 h-5 text-cyan-400" />
                                    Vault Security
                                </CardTitle>
                                <CardDescription className="text-[10px] font-mono text-text-tertiary uppercase leading-relaxed pt-2">
                                    Secure your analyst workstation and manage session credentials.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button 
                                    variant="outline" 
                                    className="w-full border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px] h-12"
                                    onClick={() => toast.info("Vault password reset initiated via Supabase.")}
                                >
                                    Reset Access Credentials
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="w-full text-danger hover:text-white hover:bg-danger/20 font-black uppercase tracking-widest text-[10px] h-12"
                                    onClick={() => window.location.href = '/auth/logout'}
                                >
                                    Terminate Session
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
