"use client";

import { useState } from "react";
import {
    ExternalLink, Shield, ShieldCheck, ShieldAlert,
    Globe, AtSign, AlertTriangle, Eye, ChevronDown, ChevronUp,
    Hash, Camera
} from "lucide-react";

interface EvidenceItem {
    id: string;
    title: string;
    content: string;
    type: string;
    sourceUrl?: string | null;
    confidenceScore?: number;
    confidenceLabel?: string;
    screenshotUrl?: string | null;
    tags?: string;
    provenanceHash?: string;
}

function getConfidenceBadge(label?: string) {
    switch (label?.toUpperCase()) {
        case 'HIGH':
        case 'VERIFIED':
            return { icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', text: label };
        case 'MEDIUM':
            return { icon: Shield, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', text: label };
        case 'LOW':
            return { icon: ShieldAlert, color: 'text-red-400 bg-red-400/10 border-red-400/20', text: label };
        default:
            return { icon: Shield, color: 'text-white/40 bg-white/5 border-white/10', text: label || 'UNKNOWN' };
    }
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'screenshot': return Camera;
        case 'url': return Globe;
        case 'social': return AtSign;
        case 'breach': return AlertTriangle;
        default: return Eye;
    }
}

export function ChatEvidenceCard({ evidence }: { evidence: EvidenceItem }) {
    const [expanded, setExpanded] = useState(false);
    const confidence = getConfidenceBadge(evidence.confidenceLabel);
    const TypeIcon = getTypeIcon(evidence.type);
    const ConfIcon = confidence.icon;

    return (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden group">
            {/* Screenshot Preview */}
            {evidence.screenshotUrl && (
                <div className="relative h-32 overflow-hidden border-b border-white/5">
                    <img
                        src={evidence.screenshotUrl}
                        alt="Visual Proof"
                        className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase tracking-widest text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Camera className="w-2.5 h-2.5" /> Visual Proof
                    </span>
                </div>
            )}

            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left px-3.5 py-2.5 flex items-start gap-2.5"
            >
                <div className="mt-0.5 p-1.5 rounded-lg bg-white/5 shrink-0">
                    <TypeIcon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white/90 truncate leading-tight">
                        {evidence.title}
                    </h4>
                    {evidence.tags && (
                        <span className="text-[9px] text-white/30 uppercase tracking-wider">{evidence.tags}</span>
                    )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${confidence.color} flex items-center gap-1`}>
                        <ConfIcon className="w-2.5 h-2.5" />
                        {confidence.text}
                    </span>
                    {expanded ? <ChevronUp className="w-3 h-3 text-white/30" /> : <ChevronDown className="w-3 h-3 text-white/30" />}
                </div>
            </button>

            {/* Expanded Content */}
            {expanded && (
                <div className="px-3.5 pb-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-[11px] text-white/50 leading-relaxed line-clamp-6 whitespace-pre-wrap">
                        {evidence.content}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap pt-1">
                        {evidence.sourceUrl && (
                            <a
                                href={evidence.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[9px] text-accent hover:text-white transition-colors font-medium"
                            >
                                <ExternalLink className="w-2.5 h-2.5" /> Open Source
                            </a>
                        )}
                        {evidence.provenanceHash && (
                            <span className="inline-flex items-center gap-1 text-[9px] text-white/20 font-mono">
                                <Hash className="w-2.5 h-2.5" />
                                {evidence.provenanceHash.slice(0, 12)}…
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ChatEvidenceGrid({ evidence }: { evidence: EvidenceItem[] }) {
    if (!evidence.length) return null;

    return (
        <div className="space-y-1.5">
            {evidence.map((e) => (
                <ChatEvidenceCard key={e.id} evidence={e} />
            ))}
        </div>
    );
}
