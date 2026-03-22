"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Users, Zap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InvestigationActions } from "./investigation-actions";

interface Investigation {
    id: string;
    title: string;
    subjectUsername?: string;
    status: 'active' | 'archived' | 'closed';
    updatedAt: string;
}

export function InvestigationList({ investigations }: { investigations: Investigation[] }) {
    return (
        <div className="space-y-4">
            {investigations.length === 0 ? (
                <Card className="border-dashed border-border-bright bg-transparent">
                    <CardContent className="h-40 flex flex-col items-center justify-center text-text-tertiary">
                        <Shield className="w-8 h-8 mb-2 opacity-20" />
                        <p className="text-sm">No investigations found.</p>
                        <Link href="/dashboard/investigations/new" className="mt-4">
                            <Button size="sm" variant="outline">Create Your First Scan</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                investigations.map((inv) => (
                    <Card key={inv.id} hover3d className="relative group border-white/5 bg-slate-900/40 backdrop-blur-md hover:bg-slate-900/60 transition-all duration-500 mb-3 overflow-hidden">
                        <Link href={`/dashboard/investigations/${inv.id}`} className="absolute inset-0 z-0 rounded-xl" aria-label={`View ${inv.title}`} />
                        
                        {/* Status Border Glow */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${
                            inv.status === 'active' ? 'bg-accent animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'bg-white/10'
                        }`} />

                        <CardContent className="p-5 flex items-center justify-between relative z-10 pointer-events-none">
                            <div className="flex items-center gap-5 flex-1">
                                <div className={`p-2.5 rounded-xl border transition-all duration-500 ${
                                    inv.status === 'active' 
                                        ? 'bg-accent/10 border-accent/30 text-accent' 
                                        : 'bg-white/5 border-white/10 text-text-tertiary'
                                }`}>
                                    <Activity className={`w-5 h-5 ${inv.status === 'active' ? 'animate-pulse' : ''}`} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-white tracking-tight group-hover:text-accent transition-colors">
                                            {inv.title}
                                        </h4>
                                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest border border-white/5 px-1.5 py-0.5 rounded bg-white/5">
                                            v.1.0-RPT
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-[10px] text-text-tertiary uppercase tracking-widest">
                                            {inv.subjectUsername ? `@${inv.subjectUsername}` : 'Anonymous Subject'}
                                        </p>
                                        <div className="h-1 w-1 rounded-full bg-white/10" />
                                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Report ID</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                {/* Signal Yield Indicator (Simulated for refinement) */}
                                <div className="hidden lg:flex flex-col items-end gap-1 px-4 border-r border-white/5">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Report Progress</span>
                                    <div className="flex gap-0.5 mt-0.5">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className={`w-1 h-3 rounded-full ${i <= 3 ? 'bg-accent shadow-[0_0_5px_rgba(0,240,255,0.5)]' : 'bg-white/5'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="text-right hidden sm:block pointer-events-auto">
                                    <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">Last Update</p>
                                    <div className="flex items-center gap-1.5 text-[11px] text-white/50 uppercase">
                                        <Clock className="w-3 h-3 text-white/30" />
                                        {new Date(inv.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pointer-events-auto z-50">
                                    <Badge className={`text-[9px] font-bold uppercase tracking-widest border ${
                                        inv.status === 'active' 
                                            ? 'bg-accent/20 text-accent border-accent/30' 
                                            : 'bg-white/5 text-white/30 border-white/10 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-all'
                                    }`}>
                                        {inv.status}
                                    </Badge>
                                    <InvestigationActions investigation={inv as any} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
