"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Send, ImageIcon, Loader2, Camera, X,
    Sparkles, MessageSquare
} from "lucide-react";
import { ChatMessage, ChatMessageData } from "@/components/dashboard/chat-message";

function generateId() {
    return Math.random().toString(36).slice(2, 12);
}

function detectType(v: string) {
    const val = v.trim();
    if (!val) return null;
    if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}$/.test(val)) return 'crypto';
    if (/^0x[a-fA-F0-9]{40}$/i.test(val)) return 'crypto';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'email';
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) return 'domain';
    if (/^\+?[0-9\s-]{8,}$/.test(val)) return 'phone';
    if (val.includes(' ')) return 'name';
    return 'username';
}

const WELCOME_MESSAGE: ChatMessageData = {
    id: 'welcome',
    role: 'agent',
    content: `Welcome to Aletheia Intelligence Chat.\n\nI can investigate any digital identity. Just tell me:\n• A person's name\n• Email address\n• Username or handle\n• Domain or website\n• Phone number\n• Crypto wallet address\n\nOr upload a photo — I'll find everything publicly available.`,
    status: 'complete',
    timestamp: new Date(),
};

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessageData[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [detectedBadge, setDetectedBadge] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Pivot Handler for Chat Messages
    useEffect(() => {
        (window as any).pivotTo = (target: string) => {
            setInput(target);
            setTimeout(() => handleSend(), 100);
        };
        return () => { delete (window as any).pivotTo; };
    }, [messages]);

    // Auto-scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    // Auto-detect input type
    useEffect(() => {
        setDetectedBadge(detectType(input));
    }, [input]);

    // Auto-resize textarea
    const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);

    const pollForEvidence = useCallback(async (investigationId: string, agentMsgId: string) => {
        let attempts = 0;
        const maxAttempts = 60; // ~3 minutes with 3s intervals
        let lastCount = 0;

        const poll = async () => {
            if (attempts >= maxAttempts) {
                setMessages(prev => prev.map(m =>
                    m.id === agentMsgId ? { ...m, status: 'complete' as const } : m
                ));
                return;
            }
            attempts++;

            try {
                const res = await fetch(`/api/investigations/${investigationId}`);
                if (!res.ok) throw new Error();
                const data = await res.json();

                const evidence = data.evidence || [];
                const status = data.status;

                if (evidence.length !== lastCount || status === 'closed') {
                    lastCount = evidence.length;
                    setMessages(prev => prev.map(m =>
                        m.id === agentMsgId ? {
                            ...m,
                            evidence: evidence.slice(0, 20),
                            evidenceCount: evidence.length,
                            status: status === 'closed' ? 'complete' as const : 'scanning' as const,
                            content: status === 'closed'
                                ? `Scan complete. Found ${evidence.length} intelligence items across public databases. I'm ready to discuss these findings or pivot based on new leads.`
                                : `Scanning… ${evidence.length} items found so far.`,
                        } : m
                    ));
                }

                if (status !== 'closed') {
                    setTimeout(poll, 3000);
                }
            } catch {
                setTimeout(poll, 3000);
            }
        };

        setTimeout(poll, 2000); // Initial delay
    }, []);

    const handleSend = async () => {
        if (sending) return;
        const text = input.trim();
        if (!text && !imagePreview) return;

        setSending(true);

        // Map messages to Gemini history format
        const history = messages
            .filter(m => m.id !== 'welcome' && (m.status === 'complete' || m.role === 'user'))
            .map(m => ({
                role: m.role === 'user' ? 'user' as const : 'model' as const,
                parts: [{ text: m.content }]
            }));

        // Add user message
        const userMsg: ChatMessageData = {
            id: generateId(),
            role: 'user',
            content: text,
            imageUrl: imagePreview || undefined,
            detectedType: text ? (detectType(text) || undefined) : (imagePreview ? 'image' : undefined),
            timestamp: new Date(),
        };

        // Add agent placeholder
        const agentMsgId = generateId();
        const agentMsg: ChatMessageData = {
            id: agentMsgId,
            role: 'agent',
            content: activeInvestigationId ? 'Analyzing evidence…' : 'Deploying intelligence agents…',
            status: activeInvestigationId ? undefined : 'scanning',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg, agentMsg]);
        setInput('');
        setImagePreview(null);
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }

        try {
            const geminiKey = typeof window !== 'undefined'
                ? localStorage.getItem('openvector_gemini_key') : null;
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (geminiKey) headers['x-gemini-key'] = geminiKey;

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({ 
                    message: text, 
                    imageUrl: imagePreview,
                    investigationId: activeInvestigationId,
                    history: history.length > 0 ? history : undefined
                }),
            });

            if (!res.ok) throw new Error('Failed to reach analysis cluster');

            const data = await res.json();

            setMessages(prev => prev.map(m =>
                m.id === agentMsgId ? { 
                    ...m, 
                    content: data.content || m.content,
                    investigationId: data.investigationId || activeInvestigationId,
                    status: data.status || 'complete'
                } : m
            ));

            if (data.investigationId && !activeInvestigationId) {
                setActiveInvestigationId(data.investigationId);
                
                // DOSSIER v28: Trigger scan from CLIENT (not server)
                // Scan is synchronous (30-50s). We fire the fetch non-blockingly
                // from the browser, while pollForEvidence shows live updates.
                const geminiKey2 = typeof window !== 'undefined'
                    ? localStorage.getItem('openvector_gemini_key') : null;
                const scanHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
                if (geminiKey2) scanHeaders['x-gemini-key'] = geminiKey2;
                
                fetch(`/api/investigations/${data.investigationId}/scan`, {
                    method: 'POST',
                    headers: scanHeaders,
                }).then(scanRes => {
                    if (scanRes.ok) {
                        console.log('[Chat] Scan completed successfully');
                    } else {
                        console.error('[Chat] Scan failed:', scanRes.status);
                    }
                }).catch(err => {
                    console.error('[Chat] Scan network error:', err);
                });

                pollForEvidence(data.investigationId, agentMsgId);
            }
        } catch (err: any) {
            setMessages(prev => prev.map(m =>
                m.id === agentMsgId ? {
                    ...m,
                    content: `Node synchronization interrupted: ${err.message}. Please try again.`,
                    status: 'error' as const,
                } : m
            ));
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full -m-8 -mb-0">
            {/* Header */}
            <div className="shrink-0 border-b border-white/5 bg-surface/80 backdrop-blur-xl px-4 md:px-6 py-3 flex items-center gap-3 z-10">
                <div className="p-2 rounded-xl bg-accent/10 border border-accent/20">
                    <MessageSquare className="w-4 h-4 text-accent" />
                </div>
                <div>
                    <h1 className="text-sm font-bold text-white tracking-tight">Aletheia Chat</h1>
                    <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Conversational OSINT Intelligence</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400/70 font-bold uppercase tracking-wider hidden md:inline">Agents Online</span>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 scroll-smooth">
                {messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
            </div>

            {/* Image Preview */}
            {imagePreview && (
                <div className="px-4 md:px-8 pb-2">
                    <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                        <img src={imagePreview} className="w-12 h-12 rounded-lg object-cover" alt="Upload" />
                        <span className="text-xs text-white/50">Image attached</span>
                        <button onClick={() => setImagePreview(null)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                            <X className="w-3.5 h-3.5 text-white/40" />
                        </button>
                    </div>
                </div>
            )}

            {/* Input Bar */}
            <div className="shrink-0 border-t border-white/5 bg-surface/80 backdrop-blur-xl px-3 md:px-6 py-3 safe-area-bottom">
                <div className="max-w-3xl mx-auto">
                    {/* Detection Badge */}
                    {input && detectedBadge && (
                        <div className="mb-2 flex items-center">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-accent/60 bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                {detectedBadge} detected
                            </span>
                        </div>
                    )}

                    <div className="flex items-end gap-2">
                        {/* Camera / Upload */}
                        <div className="flex gap-1.5 shrink-0 pb-1">
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-accent hover:border-accent/20 transition-all active:scale-95"
                                title="Upload Image"
                            >
                                <ImageIcon className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (fileRef.current) {
                                        fileRef.current.setAttribute('capture', 'environment');
                                        fileRef.current.click();
                                        fileRef.current.removeAttribute('capture');
                                    }
                                }}
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-accent hover:border-accent/20 transition-all active:scale-95 md:hidden"
                                title="Take Photo"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Text Input */}
                        <div className="flex-1 relative">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                placeholder="Name, email, domain, phone, handle…"
                                className="w-full bg-white/[0.03] border border-white/10 focus:border-accent/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none resize-none transition-colors leading-relaxed"
                                style={{ maxHeight: '120px' }}
                                disabled={sending}
                            />
                        </div>

                        {/* Send */}
                        <button
                            onClick={handleSend}
                            disabled={sending || (!input.trim() && !imagePreview)}
                            className={`shrink-0 p-3 rounded-xl transition-all active:scale-95 mb-0.5 ${
                                sending || (!input.trim() && !imagePreview)
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                    : 'bg-accent text-white shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                            }`}
                        >
                            {sending
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Send className="w-4 h-4" />
                            }
                        </button>
                    </div>

                    <p className="text-center text-[9px] text-white/15 mt-2 font-mono hidden md:block">
                        Enter to send · Shift+Enter for new line · Ctrl/⌘+K for command palette
                    </p>
                </div>
            </div>
        </div>
    );
}
