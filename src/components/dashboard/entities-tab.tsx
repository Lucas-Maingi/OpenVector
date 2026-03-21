"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Globe, AtSign, Shield, Fingerprint } from 'lucide-react';

export function EntitiesTab({ entities, investigationId }: { entities: any[], investigationId: string }) {
    if (entities.length === 0) {
        return (
            <Card className="border-dashed border-border-bright bg-transparent">
                <CardContent className="h-64 flex flex-col items-center justify-center text-text-tertiary p-8 text-center">
                    <div className="opacity-20 mb-4"><Users className="w-8 h-8" /></div>
                    <p className="text-sm max-w-xs leading-relaxed">No additional entities discovered from leaks or metadata yet.</p>
                </CardContent>
            </Card>
        );
    }

    const getEntityIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'email': return <Mail className="w-3.5 h-3.5" />;
            case 'domain': return <Globe className="w-3.5 h-3.5" />;
            case 'username': return <AtSign className="w-3.5 h-3.5" />;
            case 'name': return <Users className="w-3.5 h-3.5" />;
            default: return <Fingerprint className="w-3.5 h-3.5" />;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entities.map((entity) => (
                <Card key={entity.id} className="bg-slate-950/20 backdrop-blur-xl border border-white/5 hover:border-accent/40 hover:-translate-y-1 transition-all duration-500 group overflow-hidden shadow-xl">
                    <CardContent className="p-5 relative">
                        {/* CRT Scanner effect overlay */}
                        <div className="absolute inset-0 scanline opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" />
                        
                        <div className="absolute top-0 right-0 p-4 opacity-5 scale-[2.0] rotate-12 group-hover:opacity-10 group-hover:text-accent transition-all duration-700">
                            {getEntityIcon(entity.type)}
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-[0.2em] bg-accent/10 border-accent/30 text-accent px-2 py-0.5 rounded-md shadow-lg shadow-accent/10">
                                {entity.type}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-text-tertiary uppercase tracking-tighter opacity-60">
                                <Shield className="w-3 h-3 text-success/60" />
                                {entity.confidence}% RELIABILITY
                            </div>
                        </div>

                        <div className="text-[15px] font-mono font-black text-white/90 truncate mb-1 group-hover:text-white transition-colors" title={entity.value}>
                            {entity.value}
                        </div>
                        
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                            <span className="text-[9px] text-white/20 font-mono font-black tracking-widest uppercase">
                                ISO_DISC: {new Date(entity.createdAt).toISOString().substring(2, 10).replace(/-/g, '.')}
                            </span>
                            <button className="text-[10px] text-accent hover:text-cyan-300 font-black uppercase tracking-[0.15em] transition-colors relative group/btn">
                                <span className="relative z-10">PIVOT_NODE</span>
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover/btn:w-full transition-all duration-500" />
                            </button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

    );
}
