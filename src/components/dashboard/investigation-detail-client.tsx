"use client";

import { useEffect, useMemo } from "react";
import { useInvestigation } from "@/context/InvestigationContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, Users, LayoutGrid, Zap, Eye, MapPin, Globe } from 'lucide-react';
import { EvidenceTab } from '@/components/dashboard/evidence-tab';
import { EntitiesTab } from '@/components/dashboard/entities-tab';
import { IdentityGraph } from '@/components/dashboard/identity-graph';
import { FacialAnalysis } from '@/components/dashboard/facial-analysis';
import { HeatmapTab } from '@/components/dashboard/heatmap-tab';
import { AssociatesTab } from '@/components/dashboard/associates-tab';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    investigationId: string;
    initialEvidence: any[];
    initialEntities: any[];
    initialReports: any[];
    initialCount: { evidence: number; entities: number };
    title: string;
    isScanning: boolean;
}

export function InvestigationDetailClient({
    investigationId,
    initialEvidence,
    initialEntities,
    initialReports,
    initialCount,
    title,
    isScanning
}: Props) {
    const { 
        evidence, 
        setEvidence, 
        entities, 
        setEntities,
        facialMatches,
        setActiveInvestigationId,
        setScanStatus,
        scanStatus
    } = useInvestigation();

    // Sync initial data to context on mount
    useEffect(() => {
        setActiveInvestigationId(investigationId);
        if (evidence.length === 0 && initialEvidence.length > 0) {
            setEvidence(initialEvidence);
        }
        if (entities.length === 0 && initialEntities.length > 0) {
            setEntities(initialEntities);
        }
        if (isScanning && scanStatus === 'idle') {
            setScanStatus('scanning');
        }
    }, [investigationId, initialEvidence, initialEntities, isScanning]);

    const hasContextData = evidence.length > 0 || entities.length > 0;
    const isActuallyScanning = scanStatus === 'scanning' || isScanning;

    const displayEvidence = isActuallyScanning || (hasContextData && initialEvidence.length === 0) 
        ? evidence 
        : (initialEvidence.length > 0 ? initialEvidence : evidence);

    const displayEntities = isActuallyScanning || (hasContextData && initialEntities.length === 0)
        ? entities
        : (initialEntities.length > 0 ? initialEntities : entities);

    const evidenceCount = Math.max(initialCount.evidence, evidence.length);
    const entitiesCount = Math.max(initialCount.entities, entities.length);

    // Extract Vitality Audit from report
    const vitalityAudit = useMemo(() => {
        const content = initialReports?.[0]?.content || '';
        try {
            const match = content.match(/\[VITALITY_AUDIT: (\{.*?\})\]/);
            if (match && match[1]) {
                return JSON.parse(match[1]);
            }
        } catch (e) {
            console.warn("[VITALITY] Audit parse failed:", e);
        }
        return null;
    }, [initialReports]);

    return (
        <div className="lg:col-span-3">
            <Tabs defaultValue="evidence" className="w-full">
                <TabsList className="bg-slate-950/40 backdrop-blur-xl border border-white/5 p-1.5 mb-8 rounded-2xl shadow-2xl h-12">
                    <TabsTrigger value="evidence" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <Database className="w-4 h-4" />
                        Evidence
                        <Badge variant="default" className="ml-1 px-1.5 py-0 text-[9px] bg-accent/20 text-accent border-accent/20 font-black">{evidenceCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="entities" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <Users className="w-4 h-4" />
                        Entities
                        <Badge variant="default" className="ml-1 px-1.5 py-0 text-[9px] bg-white/10 text-white/70 border-white/5 font-black">{entitiesCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="heatmap" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <MapPin className="w-4 h-4" />
                        SIGINT_Map
                    </TabsTrigger>
                    <TabsTrigger value="associates" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <Zap className="w-4 h-4" />
                        Associates
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <LayoutGrid className="w-4 h-4" />
                        Summary
                    </TabsTrigger>
                    <TabsTrigger value="graph" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <Zap className="w-4 h-4" />
                        Node_Map
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="gap-2.5 rounded-xl px-5 transition-all duration-300 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border-accent/30 border border-transparent font-mono text-[11px] font-black uppercase tracking-widest">
                        <Eye className="w-4 h-4" />
                        AI_Visual
                        <Badge variant="outline" className="ml-1 px-1.5 py-0 text-[8px] bg-accent/10 border-accent/20 text-accent font-black">ACTIVE</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="graph" className="animate-in fade-in slide-in-from-bottom-2">
                    <IdentityGraph target={title} evidence={displayEvidence} />
                </TabsContent>

                <TabsContent value="heatmap" className="animate-in fade-in slide-in-from-bottom-2">
                    <HeatmapTab reportContent={initialReports?.[0]?.content || ''} />
                </TabsContent>

                <TabsContent value="associates" className="animate-in fade-in slide-in-from-bottom-2">
                    <AssociatesTab reportContent={initialReports?.[0]?.content || ''} />
                </TabsContent>

                <TabsContent value="evidence" className="animate-in fade-in slide-in-from-bottom-2">
                    <EvidenceTab evidence={displayEvidence} />
                </TabsContent>

                <TabsContent value="entities" className="animate-in fade-in slide-in-from-bottom-2">
                    <EntitiesTab entities={displayEntities} investigationId={investigationId} />
                </TabsContent>

                <TabsContent value="summary" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="bg-surface/30 border-white/5 backdrop-blur-xl">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">Threat Intelligence Dossier</h3>
                                    <p className="text-xs text-text-tertiary">Generated by Aletheia Advanced Synthesis</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                                {initialReports.length > 0 ? (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {initialReports[0].content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="bg-slate-950/20 p-6 rounded-xl border border-white/5 space-y-4">
                                        <p>This automated summary synthesizes findings for <strong>{title}</strong>.</p>
                                        <p>Intelligence collection is active. Mapping entities and bridging signal gaps...</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="visual" className="animate-in fade-in slide-in-from-bottom-2">
                    <FacialAnalysis 
                        matches={facialMatches} 
                        isScanning={isActuallyScanning} 
                        audit={vitalityAudit}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
