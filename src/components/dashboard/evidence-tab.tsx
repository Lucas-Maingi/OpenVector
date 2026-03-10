"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, Filter } from 'lucide-react';
import { CopyEvidenceButton } from '@/components/dashboard/copy-evidence-button';

export function EvidenceTab({ evidence }: { evidence: any[] }) {
    const [filter, setFilter] = useState<string | null>(null);

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

    const filteredEvidence = useMemo(() => {
        if (!filter) return evidence;
        return evidence.filter(ev => {
            const evTags = ev.tags ? ev.tags.split(',').map((t: string) => t.trim().toUpperCase()) : [];
            return evTags?.includes(filter);
        });
    }, [evidence, filter]);

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
                        onClick={() => setFilter(null)}
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
                            onClick={() => setFilter(tag)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvidence.map((ev) => (
                    <Card key={ev.id} className="bg-surface/30 border-white/5 hover:border-white/10 transition-colors">
                        <CardContent className="p-4 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline" className="text-[10px] bg-accent/5 border-accent/20 text-accent font-mono px-2">
                                    {ev.tags?.split(',')[0]?.toUpperCase() || 'CORE_VECTOR'}
                                </Badge>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-text-tertiary">
                                        {ev.createdAt ? new Date(ev.createdAt).toISOString().substring(11, 16) + ' UTC' : '00:00'}
                                    </span>
                                    <CopyEvidenceButton content={ev.content} />
                                </div>
                            </div>

                            <h4 className="font-bold text-xs mb-3 text-white flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                                {ev.title}
                            </h4>

                            <div className="group/code relative flex-1">
                                <div className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap bg-black/40 p-3 rounded-lg border border-white/5 font-mono max-h-48 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-white/10">
                                    {ev.content}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                {ev.sourceUrl ? (
                                    <a
                                        href={ev.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-accent hover:text-accent-hover flex items-center gap-1.5 transition-colors font-semibold"
                                    >
                                        VIEW SOURCE
                                        <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                ) : (
                                    <span className="text-[10px] text-text-tertiary italic">System Internal Node</span>
                                )}

                                <div className="text-[9px] text-text-tertiary opacity-50 font-mono">
                                    ID: {ev.id?.split('-')[0] || ev.id}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {filteredEvidence.length === 0 && filter !== null && (
                <div className="text-center p-8 bg-black/20 rounded-xl border border-dashed border-white/10">
                    <p className="text-sm text-text-tertiary">No evidence artifacts match the selected filter.</p>
                </div>
            )}
        </div>
    );
}
