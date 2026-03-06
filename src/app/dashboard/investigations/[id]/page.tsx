import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ScanButton } from '@/components/dashboard/scan-button';
import { ScanBanner } from '@/components/dashboard/scan-banner';
import { InvestigationActions } from '@/components/dashboard/investigation-actions';
import { Shield, Mail, AtSign, Phone, Activity, Globe, Database, FileText, ExternalLink, Calendar, User, LayoutGrid, Users, Search, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { InvestigationGraph } from '@/components/dashboard/investigation-graph';

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

    const investigation = await prisma.investigation.findFirst({
        where: { id, userId: user.id },
        include: {
            evidence: { orderBy: { createdAt: 'desc' } },
            entities: { orderBy: { createdAt: 'desc' } },
            reports: { orderBy: { createdAt: 'desc' }, take: 1 },
            _count: { select: { evidence: true, entities: true } }
        }
    });

    console.log("[DEBUG page.tsx] Found investigation?", !!investigation);

    if (!investigation) notFound();

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            {isScanning && <ScanBanner investigationId={id} />}
            {/* Header / Info Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-accent/10 rounded-2xl text-accent ring-1 ring-accent/20">
                        <Shield className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight">{investigation.title}</h1>
                            <Badge variant={investigation.status === 'active' ? 'accent' : 'default'} className="uppercase text-[10px]">
                                {investigation.status}
                            </Badge>
                        </div>
                        <p className="text-text-tertiary text-sm max-w-xl">{investigation.description || "No description provided for this investigation."}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ScanButton id={id} />
                    <InvestigationActions investigation={investigation} />
                    <a href={`/api/investigations/${id}/export`} download>
                        <Button variant="outline" size="sm" className="border-white/5">
                            <FileText className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </a>
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
                        <VectorItem label="Full Name" value={investigation.subjectName} icon={<User className="w-4 h-4" />} />
                        <VectorItem label="Username" value={investigation.subjectUsername} icon={<AtSign className="w-4 h-4 text-accent" />} />
                        <VectorItem label="Email" value={investigation.subjectEmail} icon={<Mail className="w-4 h-4 text-success" />} />
                        <VectorItem label="Phone" value={investigation.subjectPhone} icon={<Phone className="w-4 h-4" />} />
                        <VectorItem label="Domain" value={investigation.subjectDomain} icon={<Globe className="w-4 h-4 text-accent" />} />
                        <VectorItem label="Image" value={investigation.subjectImageUrl} icon={<Search className="w-4 h-4" />} />
                    </CardContent>
                </Card>

                {/* Content Tabs */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="evidence" className="w-full">
                        <TabsList className="bg-surface/50 border border-white/5 p-1 mb-6">
                            <TabsTrigger value="evidence" className="gap-2">
                                <Database className="w-4 h-4" />
                                Evidence
                                <Badge variant="default" className="ml-1 px-1.5 py-0 text-[10px]">{investigation._count.evidence}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="entities" className="gap-2">
                                <Users className="w-4 h-4" />
                                Entities
                                <Badge variant="default" className="ml-1 px-1.5 py-0 text-[10px]">{investigation._count.entities}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="graph" className="gap-2 text-accent">
                                <Zap className="w-4 h-4" />
                                Node Map
                            </TabsTrigger>
                            <TabsTrigger value="summary" className="gap-2">
                                <LayoutGrid className="w-4 h-4" />
                                Summary
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="graph" className="animate-in fade-in slide-in-from-bottom-2">
                            <InvestigationGraph
                                entities={investigation.entities}
                                evidence={investigation.evidence}
                                title={investigation.title}
                            />
                        </TabsContent>

                        <TabsContent value="evidence" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            {investigation.evidence.length === 0 ? (
                                <EmptyState message="No intelligence evidence gathered yet." icon={<Search className="w-8 h-8" />} />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {investigation.evidence.map((ev) => (
                                        <Card key={ev.id} className="bg-surface/30 border-white/5 hover:border-white/10 transition-colors">
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <Badge variant="outline" className="text-[10px] bg-accent/5 border-accent/20 text-accent font-mono">
                                                        {/* @ts-ignore */}
                                                        {ev.tags?.split(',')[0]?.toUpperCase() || 'CORE_VECTOR'}
                                                    </Badge>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-mono text-text-tertiary">
                                                            {ev.createdAt ? new Date(ev.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(ev.content);
                                                                // Simple browser alert or toast if available
                                                            }}
                                                            className="p-1 hover:bg-white/10 rounded transition-colors text-text-tertiary hover:text-white"
                                                            title="Copy intelligence snippet"
                                                        >
                                                            <Database className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h4 className="font-bold text-xs mb-3 text-white flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-accent rounded-full" />
                                                    {ev.title}
                                                </h4>

                                                <div className="group/code relative">
                                                    <div className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap bg-black/40 p-3 rounded-lg border border-white/5 font-mono max-h-48 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-white/10">
                                                        {ev.content}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    {ev.sourceUrl ? (
                                                        <a
                                                            href={ev.sourceUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] text-accent hover:text-accent-hover flex items-center gap-1.5 transition-colors font-semibold"
                                                        >
                                                            VALIDATE SOURCE
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
                            )}
                        </TabsContent>

                        <TabsContent value="entities" className="animate-in fade-in slide-in-from-bottom-2">
                            <EmptyState message="No additional entities discovered from leaks or metadata." icon={<Users className="w-8 h-8" />} />
                        </TabsContent>

                        <TabsContent value="summary" className="animate-in fade-in slide-in-from-bottom-2">
                            <Card className="bg-surface/30 border-white/5">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                            <Globe className="w-6 h-6 text-accent" />
                                        </div>
                                        <h3 className="text-xl font-bold italic">Investigation Intel Report</h3>
                                    </div>
                                    <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                                        {investigation.reports.length > 0 ? (
                                            <div className="whitespace-pre-wrap font-sans">
                                                {investigation.reports[0].content}
                                            </div>
                                        ) : (
                                            <>
                                                <p>This automated summary synthesizes findings for <strong>{investigation.title}</strong>.</p>
                                                <p>Initial scan results show activity across <strong>{investigation._count.evidence}</strong> sources. The target vector <code>{investigation.subjectUsername || investigation.subjectEmail}</code> was prioritized.</p>
                                                <p className="bg-white/5 p-4 rounded-lg border border-white/5 italic text-text-tertiary">
                                                    "Click 'Start Detailed Scan' to generate a full AI intelligence report."
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
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
