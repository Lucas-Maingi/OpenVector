"use client";

import { useEffect } from "react";
import { useInvestigation } from "@/context/InvestigationContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, Users, LayoutGrid, Zap } from 'lucide-react';
import { EvidenceTab } from '@/components/dashboard/evidence-tab';
import { EntitiesTab } from '@/components/dashboard/entities-tab';
import { InvestigationGraph } from '@/components/dashboard/investigation-graph';
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';
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

    // Compute display data (prefer context if actively scanning/synced, else server)
    // We prioritize keeping context data if initial items are empty but scan was active
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

    return (
        <div className="lg:col-span-3">
            <Tabs defaultValue="evidence" className="w-full">
                <TabsList className="bg-surface/50 border border-white/5 p-1 mb-6">
                    <TabsTrigger value="evidence" className="gap-2">
                        <Database className="w-4 h-4" />
                        Evidence
                        <Badge variant="default" className="ml-1 px-1.5 py-0 text-[10px]">{evidenceCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="entities" className="gap-2">
                        <Users className="w-4 h-4" />
                        Entities
                        <Badge variant="default" className="ml-1 px-1.5 py-0 text-[10px]">{entitiesCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="gap-2">
                        <LayoutGrid className="w-4 h-4" />
                        Summary
                    </TabsTrigger>
                    <TabsTrigger value="graph" className="gap-2">
                        <Zap className="w-4 h-4" />
                        Node Map
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="graph" className="animate-in fade-in slide-in-from-bottom-2">
                    <InvestigationGraph
                        entities={displayEntities}
                        evidence={displayEvidence}
                        title={title}
                    />
                </TabsContent>

                <TabsContent value="evidence" className="animate-in fade-in slide-in-from-bottom-2">
                    <EvidenceTab evidence={displayEvidence} />
                </TabsContent>

                <TabsContent value="entities" className="animate-in fade-in slide-in-from-bottom-2">
                    <EntitiesTab entities={displayEntities} investigationId={investigationId} />
                </TabsContent>

                <TabsContent value="summary" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="bg-surface/30 border-white/5">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Threat Intelligence Dossier</h3>
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
                                    <div className="bg-surface-2 p-6 rounded-xl border border-white/5 space-y-4">
                                        <p>This automated summary synthesizes findings for <strong>{title}</strong>.</p>
                                        {evidenceCount > 0 ? (
                                            <p>Intelligence collection is active. Currently tracking <strong>{evidenceCount}</strong> artifacts and <strong>{entitiesCount}</strong> entities across the intelligence graph.</p>
                                        ) : (
                                            <>
                                                <p>Initial vectors isolated. No active intelligence found in immediate cache.</p>
                                                <p className="text-accent italic">
                                                    "Initialize the scan to fetch live OSINT data and generate a full AI intelligence report."
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
