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
import { EvidenceTab } from '@/components/dashboard/evidence-tab';

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
    const investigation = await prisma.investigation.findFirst({
        where: { id },
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
        <div className="space-y-6 animate-fade-in pb-20">
            {isScanning && <ScanBanner investigationId={id} />}
            <LiveTerminalFeed isScanning={isScanning} />

            {/* Sticky Global Navigation & Breadcrumbs */}
            <div className="sticky top-0 z-40 bg-surface-2/80 backdrop-blur-xl pb-4 pt-2 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary mb-3">
                    <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
                    <span className="opacity-50">/</span>
                    <a href="/dashboard/investigations" className="hover:text-white transition-colors">Investigations</a>
                    <span className="opacity-50">/</span>
                    <span className="text-white truncate max-w-[200px]">{investigation.title}</span>
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

                        <TabsContent value="evidence" className="animate-in fade-in slide-in-from-bottom-2">
                            <EvidenceTab evidence={investigation.evidence} />
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
