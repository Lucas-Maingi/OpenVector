import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ScanButton } from '@/components/dashboard/scan-button';
import { ScanBanner } from '@/components/dashboard/scan-banner';
import { InvestigationActions } from '@/components/dashboard/investigation-actions';
import { Shield, Mail, AtSign, Phone, Activity, Globe, Database, FileText, ExternalLink, Calendar, User, LayoutGrid, Users, Search, Zap, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { InvestigationGraph } from '@/components/dashboard/investigation-graph';
import { CopyEvidenceButton } from '@/components/dashboard/copy-evidence-button';
import { LiveTerminalFeed } from '@/components/dashboard/live-terminal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EvidenceTab } from '@/components/dashboard/evidence-tab';
import { InvestigationTimeline } from '@/components/dashboard/investigation-timeline';
import { EntitiesTab } from '@/components/dashboard/entities-tab';

export default async function InvestigationDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ scanning?: string }>;
}) {
    const { id } = await params;
    const { scanning } = await searchParams;
    const isScanning = scanning === '1';
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Guest Mode Fallback
    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    const user = supabaseUser || {
        id: GUEST_ID,
        email: 'guest@openvector.io'
    };

    console.log("[DEBUG page.tsx] Received params ID:", id, "User:", user.id);

    // We intentionally ignore user.id here so anyone with the link can view it (useful for sharing and guest mode)
    let investigation;
    try {
        investigation = await prisma.investigation.findFirst({
            where: { id },
            include: {
                evidence: { orderBy: { createdAt: 'desc' } },
                entities: { orderBy: { createdAt: 'desc' } },
                reports: { orderBy: { createdAt: 'desc' }, take: 1 },
                _count: { select: { evidence: true, entities: true } }
            }
        });
    } catch (dbErr: any) {
        console.warn("[DEBUG page.tsx] Primary query failed, attempting legacy fallback:", dbErr.message);
        // Fallback: Manually define fields to exclude newly added columns that might be missing in production
        try {
            investigation = await (prisma.investigation as any).findFirst({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    status: true,
                    userId: true,
                    createdAt: true,
                    updatedAt: true,
                    subjectName: true,
                    subjectUsername: true,
                    subjectEmail: true,
                    subjectPhone: true,
                    // EXCLUDE subjectDomain and subjectImageUrl if they cause failure
                    evidence: { orderBy: { createdAt: 'desc' } },
                    entities: { orderBy: { createdAt: 'desc' } },
                    reports: { orderBy: { createdAt: 'desc' }, take: 1 },
                    _count: { select: { evidence: true, entities: true } }
                }
            });
        } catch (innerErr) {
            // Even deeper fallback if evidence table schema changed
            investigation = await (prisma.investigation as any).findFirst({
                where: { id },
                select: {
                    id: true, title: true, status: true,
                    reports: { orderBy: { createdAt: 'desc' }, take: 1 },
                    _count: { select: { evidence: true, entities: true } }
                }
            });
        }
    }

    console.log("[DEBUG page.tsx] Found investigation?", !!investigation);

    if (!investigation) notFound();

    // Safety: Ensure arrays are never undefined to prevent rendering crashes
    const safeInvestigation = {
        ...investigation,
        evidence: (investigation as any).evidence || [],
        entities: (investigation as any).entities || [],
        reports: (investigation as any).reports || [],
        _count: (investigation as any)._count || { evidence: 0, entities: 0 }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {isScanning && <ScanBanner investigationId={id} />}
            <LiveTerminalFeed isScanning={isScanning} investigationId={id} />

            {/* Sticky Global Navigation & Breadcrumbs */}
            <div className="sticky top-0 z-40 bg-surface-2/80 backdrop-blur-xl pb-4 pt-2 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary mb-3">
                    <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
                    <span className="opacity-50">/</span>
                    <a href="/dashboard/investigations" className="hover:text-white transition-colors">Investigations</a>
                    <span className="opacity-50">/</span>
                    <span className="text-white truncate max-w-[200px]">{safeInvestigation.title}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <a href="/dashboard/investigations">
                            <Button variant="ghost" size="icon" className="h-8 w-8 border border-white/5 bg-background/50 hover:bg-white/10 rounded-full">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </a>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold tracking-tight">{safeInvestigation.title}</h1>
                                <Badge variant={safeInvestigation.status === 'active' ? 'accent' : 'default'} className="uppercase text-[10px]">
                                    {safeInvestigation.status}
                                </Badge>
                            </div>
                            <p className="text-text-tertiary text-sm max-w-xl">{safeInvestigation.description || "No description provided for this investigation."}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ScanButton id={id} />
                        <InvestigationActions investigation={safeInvestigation} />
                        <a href={`/api/investigations/${id}/export`} download>
                            <Button variant="outline" size="sm" className="border-white/5">
                                <FileText className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Target Vectors Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 bg-surface/30 border-white/5 h-fit">
                    <CardHeader className="pb-3 border-b border-white/5 mb-4">
                        <CardTitle className="text-sm font-mono text-text-tertiary uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4 text-accent" />
                            Target Vectors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <VectorItem label="Full Name" value={safeInvestigation.subjectName} icon={<User className="w-4 h-4" />} />
                        <VectorItem label="Username" value={safeInvestigation.subjectUsername} icon={<AtSign className="w-4 h-4 text-accent" />} />
                        <VectorItem label="Email" value={safeInvestigation.subjectEmail} icon={<Mail className="w-4 h-4 text-success" />} />
                        <VectorItem label="Phone" value={safeInvestigation.subjectPhone} icon={<Phone className="w-4 h-4" />} />
                        <VectorItem label="Domain" value={(safeInvestigation as any).subjectDomain} icon={<Globe className="w-4 h-4 text-accent" />} />
                        <VectorItem label="Image" value={(safeInvestigation as any).subjectImageUrl} icon={<Search className="w-4 h-4" />} />
                    </CardContent>
                </Card>

                {/* Content Tabs */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="evidence" className="w-full">
                        <TabsList className="bg-surface/50 border border-white/5 p-1 mb-6">
                            <TabsTrigger value="evidence" className="gap-2">
                                <Database className="w-4 h-4" />
                                Evidence
                                <Badge variant="default" className="ml-1 px-1.5 py-0 text-[10px]">{safeInvestigation._count.evidence}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="entities" className="gap-2">
                                <Users className="w-4 h-4" />
                                Entities
                                <Badge variant="default" className="ml-1 px-1.5 py-0 text-[10px]">{safeInvestigation._count.entities}</Badge>
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
                                entities={safeInvestigation.entities}
                                evidence={safeInvestigation.evidence}
                                title={safeInvestigation.title}
                            />
                        </TabsContent>

                        <TabsContent value="evidence" className="animate-in fade-in slide-in-from-bottom-2">
                            <EvidenceTab evidence={safeInvestigation.evidence} />
                        </TabsContent>

                        <TabsContent value="entities" className="animate-in fade-in slide-in-from-bottom-2">
                            <EntitiesTab entities={safeInvestigation.entities} investigationId={id} />
                        </TabsContent>

                        <TabsContent value="timeline" className="animate-in fade-in slide-in-from-bottom-2">
                            <InvestigationTimeline evidence={safeInvestigation.evidence} />
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
                                        {safeInvestigation.reports.length > 0 ? (
                                            <div className="prose prose-invert prose-sm max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {safeInvestigation.reports[0].content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <div className="bg-surface-2 p-6 rounded-xl border border-white/5 space-y-4">
                                                <p>This automated summary synthesizes findings for <strong>{safeInvestigation.title}</strong>.</p>
                                                {safeInvestigation._count.evidence > 0 ? (
                                                    <p>Intelligence collection is active. Currently tracking <strong>{safeInvestigation._count.evidence}</strong> artifacts and <strong>{safeInvestigation._count.entities}</strong> entities across the intelligence graph.</p>
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
            </div >
        </div >
    );
}

function VectorItem({ label, value, icon }: { label: string, value: string | null, icon: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                {icon}
                {label}
            </div>
            <div className="text-sm font-medium text-text-primary px-3 py-2 bg-background/50 rounded-lg border border-white/5 truncate" title={value || 'Not provided'}>
                {value || <span className="text-text-tertiary italic">Not provided</span>}
            </div>
        </div>
    );
}

function EmptyState({ message, icon }: { message: string, icon: React.ReactNode }) {
    return (
        <Card className="border-dashed border-border-bright bg-transparent">
            <CardContent className="h-64 flex flex-col items-center justify-center text-text-tertiary p-8 text-center">
                <div className="opacity-20 mb-4">{icon}</div>
                <p className="text-sm max-w-xs leading-relaxed">{message}</p>
                <div className="mt-6 flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/5">Manual Add</Button>
                    <Button variant="primary" size="sm">Search Again</Button>
                </div>
            </CardContent>
        </Card>
    );
}
