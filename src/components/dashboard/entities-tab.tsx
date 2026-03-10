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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entities.map((entity) => (
                <Card key={entity.id} className="bg-surface/30 border-white/5 hover:border-accent/20 transition-all group overflow-hidden">
                    <CardContent className="p-4 relative">
                        <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:opacity-10 transition-opacity">
                            {getEntityIcon(entity.type)}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-[9px] uppercase tracking-widest bg-accent/5 border-accent/20 text-accent font-bold px-1.5 py-0.5">
                                {entity.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-[9px] font-mono text-text-tertiary">
                                <Shield className="w-2.5 h-2.5" />
                                {entity.confidence}% Reliability
                            </div>
                        </div>

                        <div className="text-sm font-bold text-white truncate mb-1" title={entity.value}>
                            {entity.value}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                            <span className="text-[9px] text-text-tertiary font-mono">
                                DISCOVERED: {new Date(entity.createdAt).toLocaleDateString()}
                            </span>
                            <button className="text-[9px] text-accent hover:underline font-bold uppercase tracking-wider">
                                Pivot View
                            </button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
