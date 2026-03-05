"use client";

import { useState, useEffect } from "react";
import { Shield, Key, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    const [openAiKey, setOpenAiKey] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load key from local storage on mount
        const storedKey = localStorage.getItem("openvector_openai_key");
        if (storedKey) {
            setOpenAiKey(storedKey);
        }
        setIsLoaded(true);
    }, []);

    const handleSave = () => {
        if (openAiKey.trim() === "") {
            localStorage.removeItem("openvector_openai_key");
        } else {
            localStorage.setItem("openvector_openai_key", openAiKey.trim());
        }
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-surface border border-white/5 rounded-xl">
                    <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Workspace Settings</h1>
                    <p className="text-sm text-text-tertiary">Manage your API keys and execution environment.</p>
                </div>
            </div>

            <Card className="bg-surface/50 border-white/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-accent" />
                        Bring Your Own Key (BYOK)
                    </CardTitle>
                    <CardDescription>
                        To use the AI Intelligence Synthesis feature on the free tier, you must provide your own OpenAI API key.
                        This key is stored securely in your browser's local storage and is never saved to our database.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="openai-key" className="text-sm font-medium text-text-secondary">
                            OpenAI API Key (GPT-4o)
                        </label>
                        <div className="relative">
                            <input
                                id="openai-key"
                                type="password"
                                value={openAiKey}
                                onChange={(e) => setOpenAiKey(e.target.value)}
                                placeholder="sk-..."
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent font-mono transition-shadow placeholder:text-text-muted/50"
                            />
                        </div>
                        <p className="text-xs text-text-tertiary">
                            Your key is attached directly to the orchestration request header.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                        <Button
                            onClick={handleSave}
                            className="bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 shadow-glow"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Configuration
                        </Button>

                        {isSaved && (
                            <span className="text-sm text-success flex items-center gap-1 animate-fade-in">
                                <CheckCircle2 className="w-4 h-4" />
                                Key saved locally
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-surface border-white/5">
                <CardHeader>
                    <CardTitle className="text-lg">Subscription Tier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background/50 border border-white/5 rounded-lg">
                        <div>
                            <div className="font-bold flex items-center gap-2">
                                Community (Free)
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent/20 text-accent border border-accent/30 uppercase tracking-widest">Active</span>
                            </div>
                            <div className="text-sm text-text-tertiary mt-1">Basic sweeping and manual validation.</div>
                        </div>
                        <Button variant="outline" className="border-accent/30 hover:bg-accent/10" disabled>
                            Upgrade to Pro ($49/mo)
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
