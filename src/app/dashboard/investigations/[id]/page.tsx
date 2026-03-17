import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { getEffectiveUserId } from '@/lib/auth-utils';
import { 
    ArrowLeft, 
    FileText, 
    Activity, 
    User, 
    AtSign, 
    Mail, 
    Phone, 
    Globe, 
    Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent 
} from '@/components/ui/card';
import { ScanBanner } from '@/components/dashboard/scan-banner';
import { LiveTerminalFeed } from '@/components/dashboard/live-terminal';
import { ScanButton } from '@/components/dashboard/scan-button';
import { InvestigationActions } from '@/components/dashboard/investigation-actions';
import { InvestigationDetailClient } from '@/components/dashboard/investigation-detail-client';
import { Badge } from '@/components/ui/badge';
import { serializeData } from '@/lib/serialization';

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
    const user = await getEffectiveUserId();

    console.log(`[Security] Page access attempt on ${id} by ${user.id}`);

    console.log("[SCAN] Fetching investigation detail for ID:", id);

    let investigationData: any = null;
    
    try {
        // LAYER 1: Full Query (Zero-Trust)
        investigationData = await prisma.investigation.findFirst({
            where: { id, userId: user.id }, // LOCKED TO SESSION USER
            include: {
                evidence: { orderBy: { createdAt: 'desc' } },
                entities: { orderBy: { createdAt: 'desc' } },
                reports: { orderBy: { createdAt: 'desc' }, take: 1 },
                _count: { select: { evidence: true, entities: true } }
            }
        });
    } catch (err: any) {
        console.warn("[Security] fetch layer 1 failed...", err.message);
        
        try {
            // LAYER 2: Minimal locked core
            investigationData = await (prisma.investigation as any).findFirst({
                where: { id, userId: user.id },
                select: {
                    id: true, title: true, description: true, status: true, userId: true,
                    createdAt: true, updatedAt: true, subjectName: true, subjectUsername: true,
                    subjectEmail: true, subjectPhone: true,
                    evidence: { select: { id: true, title: true, type: true, content: true, createdAt: true } },
                    entities: { select: { id: true, type: true, value: true, createdAt: true } },
                    reports: { select: { id: true, title: true, content: true, createdAt: true }, take: 1 },
                    _count: { select: { evidence: true, entities: true } }
                }
            });
        } catch (innerErr: any) {
            console.error("[Security] All detail fetch layers failed:", innerErr.message);
            // LAYER 3: Minimal Core (Still locked to user)
            investigationData = await (prisma.investigation as any).findFirst({
                where: { id, userId: user.id },
                select: { id: true, title: true, status: true }
            });
        }
    }

    if (!investigationData) notFound();

    // CRITICAL: Next.js Server Components cannot pass Date objects or non-POJOs directly to Client Components.
    // We deeply serialize the result here to prevent the "SIGNAL LOST" render crash.
    const safeInvestigation = serializeData({
        ...investigationData,
        evidence: investigationData.evidence || [],
        entities: investigationData.entities || [],
        reports: investigationData.reports || [],
        _count: investigationData._count || { evidence: 0, entities: 0 }
    });

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

                {/* Content Tabs (Live Refreshed) */}
                <InvestigationDetailClient 
                    investigationId={id}
                    initialEvidence={safeInvestigation.evidence}
                    initialEntities={safeInvestigation.entities}
                    initialReports={safeInvestigation.reports}
                    initialCount={safeInvestigation._count}
                    title={safeInvestigation.title}
                    isScanning={isScanning}
                />
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
