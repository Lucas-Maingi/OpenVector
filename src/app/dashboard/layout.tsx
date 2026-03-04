import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();

    // Guest Mode Fallback
    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    const user = supabaseUser || {
        id: GUEST_ID,
        email: 'guest@openvector.io'
    };

    // Sync user with Prisma
    await prisma.user.upsert({
        where: { id: user.id },
        update: { email: user.email || '' },
        create: {
            id: user.id,
            email: user.email || '',
            role: user.id === GUEST_ID ? 'guest' : 'analyst',
        }
    });

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-border-bright bg-surface flex flex-col relative z-20 shadow-panel">
                <div className="p-6 border-b border-border-bright">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="p-1.5 bg-accent/10 rounded-lg">
                            <Shield className="w-5 h-5 text-accent" />
                        </div>
                        <span className="font-mono font-bold tracking-tight text-lg">OpenVector</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2 mt-4 px-3">
                        {user.id === GUEST_ID ? 'Guest Session' : 'Workspace'}
                    </div>
                    <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2 text-sm text-text-secondary hover:text-white rounded-md hover:bg-border-bright transition-colors"
                    >
                        Terminal Dashboard
                    </Link>
                    <Link
                        href="/dashboard/investigations/new"
                        className="flex items-center justify-between px-3 py-2 mt-2 text-sm text-accent-blue bg-accent-blue-glow border border-accent-blue/30 rounded-md hover:bg-accent-blue/20 transition-all font-medium"
                    >
                        <span>+ New Target</span>
                        <span className="text-xs opacity-70 border border-accent-blue/40 px-1 rounded bg-accent-blue/10">⌘N</span>
                    </Link>

                    <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2 mt-8 px-3">
                        Recent Cache
                    </div>
                    {/* Recent investigations will render here via client component or server fetch later */}
                    <div className="px-3 py-2 text-sm text-text-muted italic">All active nodes</div>
                </nav>

                <div className="p-4 border-t border-border-bright text-xs text-text-muted flex justify-between items-center">
                    <span className="truncate pr-2" title={user.email}>
                        {user.id === GUEST_ID ? 'Guest Analyst' : user.email}
                    </span>
                    {user.id !== GUEST_ID ? (
                        <form action="/auth/logout" method="POST">
                            <button className="text-text-secondary hover:text-white text-xs underline">
                                Exit
                            </button>
                        </form>
                    ) : (
                        <Link href="/auth/login" className="text-accent-blue hover:text-white text-xs underline">
                            Sign In
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-surface-2">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="p-8 max-w-6xl mx-auto relative z-10 min-h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
