import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, Zap, Palette } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { CommandPalette } from '@/components/dashboard/command-palette';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

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
            <aside className="w-64 border-r border-white/5 bg-surface/80 backdrop-blur-xl flex flex-col relative z-20 shadow-panel">
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
                    <div className="px-3 py-2 text-sm text-text-muted italic border-b border-white/5 pb-4">All active nodes</div>

                    <div className="mt-8 px-3 space-y-4">
                        <Link
                            href="/premium"
                            className="flex flex-col gap-2 p-3 rounded-xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20 hover:border-accent/40 transition-all group"
                        >
                            <div className="flex items-center justify-between text-[11px] font-bold text-accent uppercase tracking-widest">
                                <span>Get OpenVector Pro</span>
                                <Zap className="w-3 h-3 group-hover:scale-125 transition-transform" />
                            </div>
                            <p className="text-[10px] text-text-tertiary leading-tight">
                                Unlock 10x scanning speed, dark web monitoring, and automated reporting.
                            </p>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-border-bright text-xs text-text-muted flex items-center justify-between gap-2">
                    <div className="flex-1 truncate group relative">
                        <span className="truncate pr-2 block" title={user.email}>
                            {user.id === GUEST_ID ? 'Guest Analyst' : user.email}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            {user.id !== GUEST_ID ? (
                                <form action="/auth/logout" method="POST">
                                    <button className="text-text-secondary hover:text-white text-[10px] underline">
                                        Exit
                                    </button>
                                </form>
                            ) : (
                                <Link href="/auth/login" className="text-accent-blue hover:text-white text-[10px] underline">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="shrink-0 scale-75 origin-right">
                        <ThemeSwitcher />
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-surface-2 flex flex-col">
                <CommandPalette />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {user.id === GUEST_ID && (
                    <div className="bg-accent/10 border-b border-accent/20 px-8 py-2 flex items-center justify-between relative z-20">
                        <div className="flex items-center gap-2 text-[11px] text-accent font-medium uppercase tracking-[0.2em]">
                            <Zap className="w-3 h-3 animate-pulse" />
                            Guest Session — Active Intelligence Sweep
                        </div>
                        <Link href="/auth/login" className="text-[10px] py-1 px-3 rounded-md bg-accent text-white font-bold hover:bg-accent/80 transition-colors uppercase tracking-widest">
                            Sign In to Save Investigations
                        </Link>
                    </div>
                )}

                <div className="p-8 max-w-6xl mx-auto relative z-10 w-full flex-1">
                    {children}
                </div>
            </main>

        </div>
    );
}
