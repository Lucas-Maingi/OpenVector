import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Zap, Palette, MessageSquare, Layers, Shield, Bell, Activity } from 'lucide-react';
import { AlertBell } from '@/components/dashboard/alert-bell';
import { AletheiaLogo } from '@/components/AletheiaLogo';
import { prisma } from '@/lib/prisma';
import { CommandPalette } from '@/components/dashboard/command-palette';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { FeedbackModal } from '@/components/dashboard/feedback-modal';
import { MobileNav, MobileSidebarToggle } from '@/components/dashboard/mobile-nav';
import { InvestigationProvider } from '@/context/InvestigationContext';
import { getEffectiveUserId } from '@/lib/auth-utils';
import { usePathname } from 'next/navigation';

function SidebarLink({ href, label, icon, badge }: { href: string; label: string; icon?: React.ReactNode; badge?: string }) {
    // Note: Since this is a server component normally, we'd need to handle 'active' state 
    // but usually in Next.js layouts we can't easily get the pathname in a server component.
    // However, I'll provide a clean hover-state focused structure.
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-white rounded-xl hover:bg-white/[0.03] hover:border-white/5 border border-transparent transition-all duration-300 group"
        >
            {icon}
            <span className="font-medium">{label}</span>
            {badge && (
                <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter">
                    {badge}
                </span>
            )}
        </Link>
    );
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getEffectiveUserId();

    // Sync user with Prisma
    try {
        await prisma.user.upsert({
            where: { id: user.id },
            update: { email: user.email || '' },
            create: {
                id: user.id,
                email: user.email || '',
                role: user.isGuest ? 'guest' : 'analyst',
            }
        });

        // Background Identity Migration (Rescue for direct sign-ins)
        const cookieStore = await cookies();
        const guestId = cookieStore.get('ale_guest_id')?.value;
        
        if (!user.isGuest && guestId && guestId !== user.id) {
            console.log(`[Dashboard Rescue] Migrating data for ${user.email} from guest ${guestId}`);
            await prisma.$transaction([
                prisma.investigation.updateMany({
                    where: { userId: guestId },
                    data: { userId: user.id }
                }),
                prisma.searchLog.updateMany({
                    where: { userId: guestId },
                    data: { userId: user.id }
                })
            ]);
            // Clear cookie is handled in the next request or we can ignore it since guestId will match user.id or be skipped next time
        }
    } catch (error) {
        console.error('Prisma User Sync Error:', error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
                <div className="p-8 bg-surface border border-danger/30 rounded-2xl max-w-md shadow-2xl">
                    <AletheiaLogo className="w-12 h-12 text-danger mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Database Connection Error</h1>
                    <p className="text-text-secondary text-sm mb-6">
                        Aletheia could not sync your session with the database. This usually happens if the database schema is not up to date or the connection string is incorrect.
                    </p>
                    <div className="p-4 bg-background/50 rounded-xl font-mono text-[10px] text-left mb-6 overflow-auto max-h-32">
                        {String(error)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <InvestigationProvider>
            <div className="flex h-screen overflow-hidden bg-background">
                {/* Sidebar Navigation — hidden on mobile, shown via MobileSidebarToggle */}
                <MobileSidebarToggle>
                    <aside className="w-64 border-r border-white/5 bg-slate-950/40 backdrop-blur-2xl flex flex-col relative z-20 shadow-[10px_0_50px_rgba(0,0,0,0.3)] h-full overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                    
                    <div className="p-6 border-b border-white/5 relative bg-white/[0.02]">
                        <Link href="/dashboard" className="flex items-center gap-3 group">
                            <div className="p-2 bg-accent/10 rounded-xl border border-accent/20 group-hover:neon-glow-cyan transition-all duration-500">
                                <AletheiaLogo className="w-5 h-5 text-accent" />
                            </div>
                            <span className="font-mono font-bold tracking-tight text-lg text-white/90">Aletheia</span>
                        </Link>
                    </div>

                    <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar relative z-30">
                        <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] mb-3 mt-4 px-4 opacity-50">
                            {user.isGuest ? 'Ephemeral_Session' : 'Operational_Grid'}
                        </div>
                        
                        <SidebarLink href="/dashboard" label="Terminal Hub" />
                        
                        <Link
                            href="/dashboard/investigations/new"
                            className="flex items-center justify-between px-4 py-2.5 mt-3 text-xs text-accent bg-accent/5 border border-accent/20 rounded-xl hover:bg-accent/10 hover:neon-glow-cyan transition-all duration-500 font-bold uppercase tracking-widest group"
                        >
                            <span>+ Initialize Node</span>
                            <span className="text-[10px] opacity-40 border border-accent/20 px-1.5 rounded bg-black/40 group-hover:opacity-100 transition-opacity">⌘N</span>
                        </Link>

                        <SidebarLink href="/dashboard/chat" label="Intelligence Chat" icon={<MessageSquare className="w-4 h-4" />} />
                        
                        <SidebarLink 
                            href="/dashboard/investigations/batch" 
                            label="Batch Aggregator" 
                            icon={<Layers className="w-4 h-4" />} 
                            badge="Elite"
                        />
                        
                        <SidebarLink 
                            href="/dashboard/watchlists" 
                            label="Surveillance Grid" 
                            icon={<Shield className="w-4 h-4" />} 
                            badge="Pro"
                        />

                        <div className="mt-8 px-2">
                            <Link
                                href="/premium"
                                className="relative flex flex-col gap-2 p-4 rounded-2xl bg-gradient-to-br from-accent/[0.08] to-transparent border border-accent/20 hover:border-accent/50 transition-all group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between text-[10px] font-black text-accent uppercase tracking-[0.2em]">
                                        <span>Upgrade_Access</span>
                                        <Zap className="w-3.5 h-3.5 group-hover:scale-125 transition-transform duration-500 text-accent animate-pulse" />
                                    </div>
                                    <p className="text-[10px] text-white/50 leading-relaxed mt-1 font-medium">
                                        Unlock Elite-grade dark web & biometric clusters.
                                    </p>
                                </div>
                            </Link>
                        </div>


                        <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2 mt-8 px-3">
                            Recent Cache
                        </div>
                        {/* Recent investigations will render here via client component or server fetch later */}
                        <div className="px-3 py-2 text-sm text-text-muted italic border-b border-white/5 pb-4">All active nodes</div>

                        <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2 mt-8 px-3">
                            Legal
                        </div>
                        <Link
                            href="/privacy"
                            className="flex items-center px-3 py-1.5 text-xs text-text-secondary hover:text-white rounded-md hover:bg-white/5 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="flex items-center px-3 py-1.5 text-xs text-text-secondary hover:text-white rounded-md hover:bg-white/5 transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <FeedbackModal />


                    </nav>

                    <div className="p-4 border-t border-border-bright flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 truncate pr-2">
                                <span className="truncate block text-sm font-medium text-text-primary" title={user.email}>
                                    {user.isGuest ? 'Guest Analyst' : user.email}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    {!user.isGuest ? (
                                        <form action="/auth/logout" method="POST">
                                            <button className="text-text-tertiary hover:text-danger flex items-center gap-1 text-[11px] transition-colors">
                                                Exit Session
                                            </button>
                                        </form>
                                    ) : (
                                        <Link href="/auth/login" className="text-accent underline text-[11px] transition-colors hover:text-white">
                                            Sign In
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono text-text-tertiary">Grid Control</span>
                            <div className="flex items-center gap-2">
                                <AlertBell />
                                <ThemeSwitcher align="top" side="right" />
                            </div>
                        </div>
                    </div>
                    </aside>
                </MobileSidebarToggle>


                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar relative bg-surface-2 flex flex-col">
                    <CommandPalette />

                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    {user.isGuest && (
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

                    <div className="p-8 pb-24 md:pb-8 max-w-6xl mx-auto relative z-10 w-full flex-1">
                        {children}
                    </div>
                </main>

                <MobileNav />
            </div>
        </InvestigationProvider>
    );
}
