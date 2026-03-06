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
                    <Card key={inv.id} hover3d className="relative group border-white/5 bg-surface/30 hover:bg-surface-elevated/50 transition-colors mb-3">
                        <Link href={`/dashboard/investigations/${inv.id}`} className="absolute inset-0 z-0 rounded-xl" aria-label={`View ${inv.title}`} />
                        <CardContent className="p-4 flex items-center justify-between relative z-10 pointer-events-none">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-text-primary group-hover:text-accent transition-colors">
                                        {inv.title}
                                    </h4>
                                    <p className="text-xs text-text-tertiary font-mono">
                                        {inv.subjectUsername ? `@${inv.subjectUsername}` : 'Unnamed Subject'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] uppercase tracking-wider text-text-tertiary mb-1">Last Update</p>
                                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                                        <Clock className="w-3 h-3" />
                                        {new Date(inv.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <Badge variant={inv.status === 'active' ? 'accent' : 'default'} className="capitalize">
                                    {inv.status}
                                </Badge>

                                <div className="flex items-center gap-3 pointer-events-auto">
                                    <InvestigationActions investigation={inv as any} />
                                    <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))

            )}
        </div>
    );
}
