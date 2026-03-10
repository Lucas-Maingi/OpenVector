import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function InvestigationTimeline({ evidence }: { evidence: any[] }) {
    // Sort evidence chronologically (oldest eventDate/createdAt first)
    const chronologicalEvidence = [...evidence].sort((a, b) => {
        const dateA = new Date(a.eventDate || a.createdAt);
        const dateB = new Date(b.eventDate || b.createdAt);
        return dateA.getTime() - dateB.getTime();
    });

    if (evidence.length === 0) {
        return (
            <Card className="border-dashed border-white/10 bg-transparent">
                <CardContent className="p-8 text-center text-text-tertiary">
                    <p className="text-sm">No temporal events detected to reconstruct a timeline.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-surface/50 border-white/5 backdrop-blur-md">
            <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="text-sm font-semibold text-white/90 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(45,142,255,0.6)]" />
                    Chronological Vector Timeline
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 relative">
                <div className="absolute left-10 top-6 bottom-6 w-px bg-white/10" />

                <div className="space-y-8">
                    {chronologicalEvidence.map((ev, index) => {
                        const timeString = new Date(ev.eventDate || ev.createdAt).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        });

                        return (
                            <div key={ev.id || index} className="relative flex items-start pl-8 group">
                                {/* Timeline Node */}
                                <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-accent-blue shadow-[0_0_8px_rgba(45,142,255,0.4)] z-10 group-hover:scale-125 transition-transform" />

                                <div className="flex-1 ml-4 bg-black/20 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-[10px] font-mono text-accent-blue uppercase font-semibold">
                                            {timeString}
                                        </div>
                                        <Badge variant="outline" className="text-[9px] bg-white/5 border-white/10 text-white/70">
                                            {ev.tags?.split(',')[0]?.replace('_', ' ') || 'DISCOVERY'}
                                        </Badge>
                                    </div>

                                    <h4 className="text-xs font-bold text-white mb-2 leading-tight">
                                        {ev.title}
                                    </h4>

                                    <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3">
                                        {ev.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
