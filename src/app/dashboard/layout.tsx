import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, Zap } from 'lucide-react';
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
    try {
        await prisma.user.upsert({
            where: { id: user.id },
            update: { email: user.email || '' },
            create: {
                id: user.id,
                email: user.email || '',
                role: user.id === GUEST_ID ? 'guest' : 'analyst',
            }
        });
    } catch (error) {
        console.error('Prisma User Sync Error:', error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
                <div className="p-8 bg-surface border border-danger/30 rounded-2xl max-w-md shadow-2xl">
                    <Shield className="w-12 h-12 text-danger mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Database Connection Error</h1>
                    <p className="text-text-secondary text-sm mb-6">
                        OpenVector could not sync your session with the database. This usually happens if the database schema is not up to date or the connection string is incorrect.
                    </p>
                    <div className="p-4 bg-background/50 rounded-xl font-mono text-[10px] text-left mb-6 overflow-auto max-h-32">
                        {String(error)}
                    </div>
                    <div className="space-y-3">
                        <p className="text-xs text-text-tertiary uppercase tracking-widest font-bold">Troubleshooting Steps</p>
                        <ul className="text-xs text-left text-text-muted space-y-2 list-disc pl-4">
                            <li>Ensure <code className="text-accent">DATABASE_URL</code> and <code className="text-accent">DIRECT_URL</code> are set in Vercel.</li>
                            <li>Run <code className="text-white">prisma db push</code> to sync the schema.</li>
                            <li>Check Supabase project status.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

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
                    <div className="flex items-center gap-2">
                        <div className="relative cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors group">
                            <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
                            <Zap className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                        </div>
                    </div>
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
