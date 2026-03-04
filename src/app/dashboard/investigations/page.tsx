import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { InvestigationList } from '@/components/dashboard/investigation-list';
import { Shield, Search, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default async function InvestigationsIndexPage() {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Guest Mode Fallback
    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    const user = supabaseUser || {
        id: GUEST_ID,
        email: 'guest@openvector.io'
    };

    const investigations = await prisma.investigation.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
    });

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-2xl text-accent ring-1 ring-accent/20">
                        <Database className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Investigation Index</h1>
                        <p className="text-text-tertiary">Access and manage your complete intelligence database.</p>
                    </div>
                </div>
            </div>

            <Card className="bg-surface/30 border-white/5">
                <CardContent className="p-6">
                    <div className="relative mb-8">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                            className="w-full bg-background border-white/5 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none transition-all"
                            placeholder="Search by title, username, or email..."
                        />
                    </div>

                    <InvestigationList investigations={investigations as any} />
                </CardContent>
            </Card>
        </div>
    );
}
