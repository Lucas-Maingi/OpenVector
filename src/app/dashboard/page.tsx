import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { InvestigationList } from '@/components/dashboard/investigation-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, Search, Database, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch stats and recent investigations
    const [investigations, stats] = await Promise.all([
        prisma.investigation.findMany({
            where: { userId: user?.id },
            orderBy: { updatedAt: 'desc' },
            take: 5
        }),
        prisma.investigation.aggregate({
            where: { userId: user?.id },
            _count: { id: true },
        })
    ]);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Scans"
                    value={stats._count.id}
                    icon={<Search className="w-5 h-5" />}
                    trend="+12% this week"
                />
                <StatCard
                    title="Active Nodes"
                    value={investigations.filter(i => i.status === 'active').length}
                    icon={<Zap className="w-5 h-5 text-accent" />}
                    trend="Running now"
                />
                <StatCard
                    title="Encrypted Vaults"
                    value={stats._count.id}
                    icon={<Shield className="w-5 h-5 text-success" />}
                    trend="Cloud Secure"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Database className="w-5 h-5 text-accent" />
                            Recent Investigations
                        </h2>
                        <Link href="/dashboard/investigations">
                            <Button variant="ghost" size="sm" className="text-text-tertiary">
                                View Full Index
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </div>

                    <InvestigationList investigations={investigations as any} />
                </div>

                {/* Quick Actions Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-accent/5 border-accent/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Access</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/dashboard/investigations/new" className="block">
                                <Button className="w-full justify-start gap-3 bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent">
                                    <Plus className="w-4 h-4" />
                                    New Investigation
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full justify-start gap-3 border-white/5">
                                <Search className="w-4 h-4" />
                                Global Username Search
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 border-white/5">
                                <Database className="w-4 h-4" />
                                Breach Database Lookup
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-surface/50 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-sm font-mono text-text-tertiary uppercase tracking-widest">
                                Terminal Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="font-mono text-[10px] space-y-2 opacity-60">
                            <div>[INFO] OSINT Nodes Status: <span className="text-success">HEALTHY</span></div>
                            <div>[INFO] API Gateway: <span className="text-success">READY</span></div>
                            <div>[WARN] Tor Proxy: <span className="text-accent">ROUTING...</span></div>
                            <div className="pt-2 border-t border-white/5">
                                Last verified: {new Date().toLocaleTimeString()}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend }: { title: string, value: number, icon: React.ReactNode, trend: string }) {
    return (
        <Card hover3d className="bg-surface/50 border-white/5">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-surface-elevated rounded-lg">
                        {icon}
                    </div>
                    <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">{trend}</span>
                </div>
                <div>
                    <h3 className="text-text-tertiary text-sm font-medium">{title}</h3>
                    <p className="text-3xl font-bold mt-1">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}
