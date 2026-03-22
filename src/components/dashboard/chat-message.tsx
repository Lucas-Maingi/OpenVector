"use client";

import { AletheiaLogo } from "@/components/AletheiaLogo";
import { ChatEvidenceGrid } from "@/components/dashboard/chat-evidence-card";
import { User, Bot, ImageIcon, Loader2, Sparkles, Files } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ChatMessageData {
    id: string;
    role: 'user' | 'agent';
    content: string;
    imageUrl?: string;
    detectedType?: string;
    evidence?: any[];
    evidenceCount?: number;
    status?: 'sending' | 'scanning' | 'complete' | 'error';
    investigationId?: string;
    timestamp: Date;
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {/* Avatar */}
            <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${isUser
                    ? 'bg-accent/10 border border-accent/20'
                    : 'bg-white/5 border border-white/10'
                }`}>
                {isUser
                    ? <User className="w-4 h-4 text-accent" />
                    : <AletheiaLogo className="w-4 h-4 text-accent" />
                }
            </div>

            {/* Bubble */}
            <div className={`flex-1 max-w-[85%] md:max-w-[70%] ${isUser ? 'flex flex-col items-end' : ''}`}>
                {/* Role Label */}
                <span className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 block ${isUser ? 'text-accent/60 text-right' : 'text-white/30'}`}>
                    {isUser ? 'You' : 'Aletheia'}
                    <span className="text-white/15 ml-2 font-normal">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </span>

                <div className={`rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-accent/10 border border-accent/15 rounded-tr-md'
                        : 'bg-white/[0.03] border border-white/[0.06] rounded-tl-md'
                    }`}>

                    {/* User Image Preview */}
                    {message.imageUrl && (
                        <div className="mb-2.5 rounded-xl overflow-hidden border border-white/10 inline-block">
                            <img src={message.imageUrl} alt="Submitted" className="max-w-[200px] max-h-[150px] object-cover" />
                        </div>
                    )}

                    {/* Type Detection Badge */}
                    {message.detectedType && isUser && (
                        <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[9px] font-bold text-accent uppercase tracking-widest">
                            <Bot className="w-2.5 h-2.5" />
                            {message.detectedType.replace('_', ' ')} detected
                        </div>
                    )}

                    {/* Text Content / Markdown Findings */}
                    {message.content && (
                        <div className={`text-sm leading-relaxed ${isUser ? 'text-white/80 whitespace-pre-wrap' : ''}`}>
                            {isUser ? (
                                message.content
                            ) : (
                                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-[11px] prose-p:text-white/70 prose-strong:text-accent prose-code:text-accent prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none border-l-2 border-accent/20 pl-4 py-1">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Scanning Status */}
                    {message.status === 'scanning' && (
                        <div className="flex items-center gap-2 mt-2 text-accent text-xs">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span className="animate-pulse font-medium">
                                Agents scanning
                                {message.evidenceCount ? ` — ${message.evidenceCount} items found` : '…'}
                            </span>
                        </div>
                    )}

                    {/* Evidence Results */}
                    {message.evidence && message.evidence.length > 0 && (
                        <div className="mt-3 space-y-2">
                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-1">
                                Intelligence Retrieved — {message.evidence.length} items
                            </div>
                            <ChatEvidenceGrid evidence={message.evidence} />
                        </div>
                    )}

                    {/* Error State */}
                    {message.status === 'error' && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                            <span>⚠ Node synchronization interrupted. Try again.</span>
                        </div>
                    )}

                    {/* Completed State - Logic moved to results display */}
                </div>
            </div>
        </div>
    );
}
