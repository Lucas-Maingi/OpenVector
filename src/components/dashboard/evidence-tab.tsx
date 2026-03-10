"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, Filter, Shield } from 'lucide-react';
import { CopyEvidenceButton } from '@/components/dashboard/copy-evidence-button';

export function EvidenceTab({ evidence }: { evidence: any[] }) {
    const [filter, setFilter] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    // Extract unique tags from evidence
    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        evidence.forEach(ev => {
            if (ev.tags) {
                ev.tags.split(',').forEach((t: string) => tags.add(t.trim().toUpperCase()));
            }
        });
        return Array.from(tags).sort();
    }, [evidence]);

    const sortedAndFilteredEvidence = useMemo(() => {
        let result = [...evidence];
        if (filter) {
            result = result.filter(ev => {
                const evTags = ev.tags ? ev.tags.split(',').map((t: string) => t.trim().toUpperCase()) : [];
                return evTags?.includes(filter);
            });
        }
        // Always sort by highest confidence score first
        return result.sort((a, b) => (b.confidenceScore || 0) - (a.confidenceScore || 0));
    }, [evidence, filter]);

    const paginatedEvidence = useMemo(() => {
        return sortedAndFilteredEvidence.slice(0, page * ITEMS_PER_PAGE);
    }, [sortedAndFilteredEvidence, page]);

    const getConfidenceColor = (label: string) => {
        switch (label?.toUpperCase()) {
            case 'HIGH': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'LOW': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-text-tertiary bg-white/5 border-white/10';
        }
    };

    if (evidence.length === 0) {
        return (
            <Card className="border-dashed border-border-bright bg-transparent">
                <CardContent className="h-64 flex flex-col items-center justify-center text-text-tertiary p-8 text-center">
                    <div className="opacity-20 mb-4"><Search className="w-8 h-8" /></div>
                    <p className="text-sm max-w-xs leading-relaxed">No intelligence evidence gathered yet.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Quick Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-surface/30 p-4 border border-white/5 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                    <Filter className="w-4 h-4 text-accent" />
                    Filter Evidence
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => { setFilter(null); setPage(1); }}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${filter === null
                            ? 'bg-accent/20 border-accent text-accent'
                            : 'bg-black/30 border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        All Artifacts
                    </button>
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => { setFilter(tag); setPage(1); }}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${filter === tag
                                ? 'bg-accent-blue/20 border-accent-blue text-accent-blue'
                                : 'bg-black/30 border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Evidence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedEvidence.map((ev) => (
                    <EvidenceCard key={ev.id} ev={ev} getConfidenceColor={getConfidenceColor} />
                ))}
            </div>

            {sortedAndFilteredEvidence.length > paginatedEvidence.length && (
                <div className="flex justify-center pt-8 pb-12">
                    <Button 
                        variant="outline" 
                        onClick={() => setPage(p => p + 1)}
                        className="bg-accent/5 border-accent/20 hover:bg-accent/10 group px-8"
                    >
                        Load more intelligence
                        <Search className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform" />
                    </Button>
                </div>
            )}

            {sortedAndFilteredEvidence.length === 0 && filter !== null && (
                <div className="text-center p-8 bg-black/20 rounded-xl border border-dashed border-white/10">
                    <p className="text-sm text-text-tertiary">No evidence artifacts match the selected filter.</p>
                </div>
            )}
        </div>
    );
}

function EvidenceCard({ ev, getConfidenceColor }: { ev: any, getConfidenceColor: (l: string) => string }) {
    const isPostcard = ev.content?.includes('🪪') || ev.title?.includes('Profile Postcard');
    
    // Extract metadata from markdown content if it's a postcard
    const meta: Record<string, string> = {};
    if (isPostcard) {
        const lines = ev.content.split('\n');
        lines.forEach((line: string) => {
            if (line.startsWith('**Platform:**')) meta.platform = line.replace('**Platform:**', '').trim();
            if (line.startsWith('**Profile Name:**')) meta.name = line.replace('**Profile Name:**', '').trim();
            if (line.startsWith('**Identity:**')) meta.name = line.replace('**Identity:**', '').trim();
            if (line.startsWith('**Direct Link:**')) meta.link = line.replace('**Direct Link:**', '').trim();
        });
        
        // Extract bio
        const bioMatch = ev.content.match(/> ([\s\S]*?)(?:\n\n|$)/);
        if (bioMatch) meta.bio = bioMatch[1].trim();
    }

    return (
        <Card className={`bg-background/40 backdrop-blur-md border hover:border-accent/40 transition-all group overflow-hidden ${isPostcard ? 'border-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.05)]' : 'border-white/5'}`}>
            <CardContent className="p-0 flex flex-col h-full">
                {/* Header Overlay for Postcards */}
                {isPostcard && (
                    <div className="h-24 bg-gradient-to-br from-accent/20 via-background to-background border-b border-accent/10 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-accent/10">
                            <Shield className="w-16 h-16" />
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.1),transparent)]" />
                    </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[10px] font-mono px-2 ${isPostcard ? 'bg-accent text-accent-foreground border-transparent' : 'bg-white/5 border-white/10 text-text-muted'}`}>
                                {ev.tags?.split(',')[0]?.toUpperCase() || 'CORE_VECTOR'}
                            </Badge>
                            {ev.confidenceLabel && (
                                <Badge variant="outline" className={`text-[9px] font-mono px-1.5 ${getConfidenceColor(ev.confidenceLabel)}`}>
                                    {ev.confidenceLabel} {(ev.confidenceScore * 100).toFixed(0)}%
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                             <CopyEvidenceButton content={ev.content} />
                        </div>
                    </div>

                    <h4 className={`font-bold text-sm mb-4 text-white flex items-center gap-2 ${isPostcard ? '-mt-12 relative z-10 drop-shadow-md' : ''}`}>
                        {isPostcard ? (
                            <div className="w-12 h-12 rounded-xl bg-surface border-2 border-accent shadow-[0_0_10px_rgba(0,240,255,0.3)] flex items-center justify-center text-accent text-lg">
                                {meta.platform?.[0] || '🪪'}
                            </div>
                        ) : (
                            <div className={`w-1.5 h-1.5 rounded-full ${ev.confidenceLabel === 'HIGH' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' : ev.confidenceLabel === 'MEDIUM' ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'bg-accent'}`} />
                        )}
                        <span className={isPostcard ? 'mt-6' : ''}>{isPostcard ? (meta.name || ev.title) : ev.title}</span>
                    </h4>

                    {isPostcard ? (
                         <div className="flex-1 space-y-4">
                            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-[10px] text-accent uppercase tracking-widest font-bold mb-1 block">Contextual Biography</span>
                                <p className="text-[11px] text-text-secondary leading-relaxed italic">
                                    "{meta.bio || 'Public metadata record indicates active profile activity with no extensive bio provided.'}"
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-[8px] text-text-tertiary uppercase block">Platform</span>
                                    <span className="text-[10px] text-white font-mono">{meta.platform || 'Unknown'}</span>
                                </div>
                                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-[8px] text-text-tertiary uppercase block">Timestamp</span>
                                    <span className="text-[10px] text-white font-mono">{ev.createdAt ? new Date(ev.createdAt).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>
                         </div>
                    ) : (
                        <div className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap bg-black/40 p-4 rounded-xl border border-white/5 font-mono max-h-48 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-white/10">
                            {ev.content}
                        </div>
                    )}

                    {ev.provenanceHash && (
                        <div className="mt-4 p-2 bg-success/5 border border-success/10 rounded-lg flex items-center gap-3">
                            <div className="p-1 px-1.5 bg-success/10 rounded text-[8px] text-success font-black border border-success/20">VERIFIED</div>
                            <div className="text-[9px] text-text-tertiary font-mono truncate">
                                PROVENANCE: {ev.provenanceHash}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        {ev.sourceArchiveUrl ? (
                            <a
                                href={ev.sourceArchiveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-success hover:text-green-300 flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider"
                            >
                                IMMUTABLE ARCHIVE
                                <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                        ) : ev.sourceUrl ? (
                            <a
                                href={ev.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-accent hover:text-accent-hover flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider"
                            >
                                VIEW SOURCE
                                <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                        ) : (
                            <span className="text-[10px] text-text-tertiary italic">System Node</span>
                        )}

                        <div className="text-[9px] text-text-tertiary font-mono opacity-40">
                            {ev.createdAt ? new Date(ev.createdAt).toISOString().substring(11, 16) + ' UTC' : '00:00'}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
