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
            {/* Header HUD - Professional Profile */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-border/10">
                <div className="flex items-center gap-8">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-tr from-accent/20 to-accent-blue/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                        <Avatar className="h-24 w-24 rounded-full border-4 border-surface shadow-2xl relative ring-1 ring-border/10">
                            <AvatarImage src={profile.avatarUrl} className="object-cover" />
                            <AvatarFallback className="bg-accent/5 text-3xl font-bold text-accent">
                                {profile.name?.substring(0, 2).toUpperCase() || "AN"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 p-2 bg-background border border-border/10 rounded-full shadow-lg">
                            <Shield className="w-4 h-4 text-accent" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-black tracking-tight text-text-primary">
                                {profile.name || "Anonymous Analyst"}
                            </h1>
                            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-accent/10 text-accent border border-accent/20 uppercase tracking-widest">
                                {profile.plan} NODE
                            </span>
                        </div>
                        <div className="flex items-center gap-5 text-[11px] font-bold text-text-tertiary uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                                <Fingerprint className="w-3.5 h-3.5" />
                                {profile.email || "UNIDENTIFIED_SIGNAL"}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-border/20" />
                            <span className="flex items-center gap-2">
                                <Activity className="w-3.5 h-3.5 text-success" />
                                System Online
                            </span>
                        </div>
                    </div>
                </div>

                <Button 
                    variant="outline" 
                    className="h-11 px-6 rounded-xl border-border/10 bg-surface/50 backdrop-blur-md text-xs uppercase font-black tracking-widest hover:bg-accent/5 hover:text-accent transition-all group"
                    onClick={() => window.location.href = '/dashboard'}
                >
                    Return to Mission Control
                    <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
            </div>

            <Tabs defaultValue="identity" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-foreground/[0.03] border border-border/10 w-fit rounded-full h-12 p-1 gap-1">
                    {[
                        { id: "identity", label: "Identity" },
                        { id: "quota", label: "Quotas" },
                        { id: "security", label: "Security" }
                    ].map((tab) => (
                        <TabsTrigger 
                            key={tab.id}
                            value={tab.id} 
                            className="rounded-full px-8 h-full text-[11px] font-black uppercase tracking-widest text-text-tertiary data-[state=active]:bg-surface data-[state=active]:text-accent data-[state=active]:shadow-md transition-all hover:text-text-primary"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Identity Content */}
                <TabsContent value="identity" className="mt-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-8 space-y-8">
                            <Card className="bg-surface border-border/10 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-foreground/[0.02] border-b border-border/5 p-8">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent">Identity Profile</h3>
                                    <p className="text-xs text-text-tertiary mt-1 font-bold uppercase tracking-wider">Update your public analyst persona and signature</p>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] uppercase font-black text-text-tertiary tracking-widest pl-1">Full Name / Alias</Label>
                                            <Input 
                                                value={profile.name} 
                                                onChange={(e) => setProfile({...profile, name: e.target.value})}
                                                placeholder="John Doe"
                                                className="h-14 bg-foreground/[0.03] border-border/10 focus:border-accent/40 focus:ring-accent/10 font-bold text-sm px-5 rounded-2xl"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] uppercase font-black text-text-tertiary tracking-widest pl-1">Avatar Signature URL</Label>
                                            <Input 
                                                value={profile.avatarUrl} 
                                                onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})}
                                                placeholder="https://..."
                                                className="h-14 bg-foreground/[0.03] border-border/10 focus:border-accent/40 focus:ring-accent/10 font-bold text-sm px-5 rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-border/5">
                                        <Button 
                                            onClick={handleSaveProfile} 
                                            disabled={isSaving}
                                            className="bg-accent hover:bg-accent-hover text-white px-10 h-14 font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-accent/20 group transition-all hover:scale-[1.02]"
                                        >
                                            <Save className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                                            Commit Account Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-4 space-y-6">
                             <Card className="bg-surface border-border/10 overflow-hidden shadow-xl rounded-3xl">
                                <CardHeader className="pb-4 bg-foreground/[0.02] border-b border-border/5 p-8">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Node Overview</h3>
                                </CardHeader>
                                <CardContent className="p-8 pt-6 space-y-6">
                                    <div className="flex items-center justify-between py-4 border-b border-border/5">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Access Level</p>
                                            <p className="text-sm font-black text-text-primary uppercase">{profile.plan}</p>
                                        </div>
                                        <Shield className="w-5 h-5 text-accent opacity-30" />
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b border-border/5">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Auth Method</p>
                                            <p className="text-sm font-black text-text-primary uppercase">Secured SSO</p>
                                        </div>
                                        <Key className="w-5 h-5 text-accent-blue opacity-30" />
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Pulse Status</p>
                                            <p className="text-sm font-black text-success uppercase">Active Connection</p>
                                        </div>
                                        <Activity className="w-5 h-5 text-success animate-pulse" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Quota & Billing Content */}
                <TabsContent value="quota" className="mt-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between pb-4 border-b border-border/10">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent">Resource Consumption</h3>
                                <p className="text-xs text-text-tertiary mt-1 font-bold uppercase tracking-wider">Monitor your real-time data ingestion and processing limits</p>
                            </div>
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest bg-foreground/5 px-3 py-1.5 rounded-full">Auto-Reset: 1st of Month</span>
                        </div>
                        
                        {usage && <UsageStats data={usage} />}

                        <div className="pt-8">
                            <Card className="bg-surface border border-border/10 relative overflow-hidden shadow-2xl rounded-3xl">
                                <CardHeader className="p-8 pb-6 bg-foreground/[0.02] border-b border-border/5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black uppercase tracking-[0.1em] text-text-primary">Billing Architecture</CardTitle>
                                            <CardDescription className="text-xs text-text-tertiary mt-2 font-bold uppercase tracking-wider">Manage your organizational subscriptions and financial records</CardDescription>
                                        </div>
                                        <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10">
                                            <CreditCard className="w-6 h-6 text-accent" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 pt-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-foreground/[0.03] rounded-3xl border border-border/5 group hover:border-accent/20 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/10 group-hover:scale-105 transition-transform">
                                                <Brain className="w-7 h-7 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">Active Deployment Tier</p>
                                                <p className="text-lg font-black text-text-primary uppercase">{profile.plan} INVESTIGATOR</p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            className="h-12 px-8 border-accent/20 bg-accent/5 text-accent hover:bg-accent text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all"
                                            onClick={() => window.open('/premium', '_blank')}
                                        >
                                            Manage Subscription <ExternalLink className="w-3.5 h-3.5 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Security & Terminal Content */}
                <TabsContent value="security" className="mt-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* BYOK Section */}
                        <Card className="bg-surface border border-border/10 shadow-xl rounded-3xl overflow-hidden group">
                            <CardHeader className="bg-foreground/[0.02] border-b border-border/5 p-8">
                                <CardTitle className="flex items-center gap-4 text-text-primary uppercase tracking-[0.1em] text-lg font-black">
                                    <Key className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
                                    Linguistics Bypass
                                </CardTitle>
                                <CardDescription className="text-xs font-bold text-text-tertiary uppercase tracking-wider leading-relaxed pt-2">
                                    Attach a custom OpenAI API Key. On the Community tier, this is required for advanced dossier synthesis and deep-analysis protocols.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black text-text-tertiary tracking-[0.2em] uppercase pl-1">OpenAI Authentication Token</Label>
                                    <Input
                                        type="password"
                                        value={openAiKey}
                                        onChange={(e) => setOpenAiKey(e.target.value)}
                                        placeholder="sk-..."
                                        className="h-14 bg-foreground/[0.03] border-border/10 font-bold text-sm tracking-widest px-5 rounded-2xl"
                                    />
                                    <p className="text-[9px] text-text-tertiary font-bold uppercase tracking-widest pl-1">Authorization_Protocol: X-Bearer-Secure</p>
                                </div>
                                <Button
                                    onClick={handleSaveKey}
                                    className="w-full h-14 bg-accent/5 hover:bg-accent text-accent hover:text-white border border-accent/20 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all"
                                >
                                    Establish Local Secure Tunnel
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Account Actions */}
                        <Card className="bg-surface border border-border/10 shadow-xl rounded-3xl overflow-hidden group">
                            <CardHeader className="bg-foreground/[0.02] border-b border-border/5 p-8">
                                <CardTitle className="flex items-center gap-4 text-text-primary uppercase tracking-[0.1em] text-lg font-black">
                                    <Shield className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                                    Vault Security
                                </CardTitle>
                                <CardDescription className="text-xs font-bold text-text-tertiary uppercase tracking-wider leading-relaxed pt-2">
                                    Secure your analyst workstation and manage encrypted session credentials.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-4">
                                <Button 
                                    variant="outline" 
                                    className="w-full h-14 border-border/10 bg-foreground/5 hover:bg-accent/5 hover:text-accent hover:border-accent/20 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all"
                                    onClick={() => toast.info("Vault password reset initiated via Supabase.")}
                                >
                                    Cycle Access Credentials
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-14 text-danger hover:text-white hover:bg-danger/80 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all"
                                    onClick={() => window.location.href = '/auth/logout'}
                                >
                                    Terminate Analyst Session
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
