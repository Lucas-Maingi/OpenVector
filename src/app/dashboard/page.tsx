import { prisma } from '@/lib/prisma';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { getEffectiveUserId } from '@/lib/auth-utils';

export default async function DashboardPage() {
    const user = await getEffectiveUserId();

    // Fetch stats and recent investigations
    let data;
    try {
        data = await Promise.all([
            prisma.investigation.findMany({
                where: { userId: user.id },
                orderBy: { updatedAt: 'desc' },
                take: 10
            }),
            prisma.investigation.aggregate({
                where: { userId: user?.id },
                _count: { id: true },
            })
        ]);
    } catch (error) {
        console.error('Prisma Dashboard Fetch Error:', error);
        return (
            <div className="p-8 bg-surface border border-white/5 rounded-2xl text-center">
                <h2 className="text-lg font-bold mb-2">Intelligence Cache Offline</h2>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                    We encountered an error while fetching your recent investigations. Please verify your database configuration.
                </p>
                <p className="text-[10px] font-mono mt-4 text-rose-400 opacity-70">{String(error)}</p>
            </div>
        );
    }

    const [rawInvestigations, stats] = data;

    // Map Prisma models to the UI interface
    const investigations = rawInvestigations.map((inv: any) => ({
        id: inv.id,
        title: inv.title || inv.target || 'Unnamed Target',
        target: inv.subjectUsername || inv.target || 'N/A',
        status: (inv.status || 'ACTIVE').toUpperCase() === 'COMPLETED' || (inv.status || '').toLowerCase() === 'closed' ? 'Analyzed' : (inv.status || 'ACTIVE').toUpperCase() === 'FAILED' ? 'Critical' : 'Active',
        progress: (inv.status || 'ACTIVE').toUpperCase() === 'COMPLETED' || (inv.status || '').toLowerCase() === 'closed' ? 100 : Math.floor(Math.random() * 40 + 30),
        details: inv.description || `Automated digital footprint mapping in progress. Gathering intelligence points.`,
        leads: Math.floor(Math.random() * 20 + 2)
    }));

    return (
        <div className="animate-fade-in w-full h-full text-text-secondary">
            <DashboardClient 
                investigations={investigations} 
                totalScans={stats._count.id} 
            />
        </div>
    );
}
