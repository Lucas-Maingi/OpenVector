"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Layers, Shield, Zap, Search, Activity } from "lucide-react";

interface NavLinkProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    isPrimary?: boolean;
}

function NavLink({ href, label, icon, badge, isPrimary }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 text-xs rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                    ? "text-white bg-white/[0.05] border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]" 
                    : "text-text-tertiary hover:text-white border-transparent hover:bg-white/[0.02]"
            } border ${isPrimary ? "mb-4" : ""}`}
        >
            {/* Active Glow Indicator */}
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-accent shadow-[0_0_10px_rgba(0,240,255,0.8)] rounded-full" />
            )}

            <div className={`transition-transform duration-500 ${isActive ? "text-accent scale-110" : "group-hover:text-accent group-hover:scale-110"}`}>
                {icon}
            </div>

            <span className={`font-mono uppercase tracking-[0.15em] ${isActive ? "font-black" : "font-medium"}`}>
                {label}
            </span>

            {badge && (
                <span className={`ml-auto text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter transition-all ${
                    isActive 
                        ? "bg-accent/20 text-accent border border-accent/30" 
                        : "bg-white/5 text-white/30 border border-white/5 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 group-hover:opacity-100 opacity-40"
                }`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}

export function SidebarNav({ isGuest }: { isGuest?: boolean }) {
    return (
        <div className="space-y-1.5 flex flex-col h-full">
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] mb-3 mt-4 px-4 opacity-50">
                {isGuest ? 'Ephemeral_Session' : 'Operational_Grid'}
            </div>

            <NavLink 
                href="/dashboard" 
                label="Terminal Hub" 
                icon={<Activity className="w-4 h-4" />} 
            />

            <Link
                href="/dashboard/investigations/new"
                className="flex items-center justify-between px-4 py-3 mt-3 mb-6 text-[10px] text-accent bg-accent/5 border border-accent/20 rounded-xl hover:bg-accent/10 hover:shadow-glow-cyan-sm transition-all duration-500 font-bold uppercase tracking-[0.2em] group"
            >
                <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5" />
                    <span>Initialize Node</span>
                </div>
                <span className="text-[9px] opacity-40 border border-accent/20 px-1.5 rounded bg-black/40 group-hover:opacity-100 transition-opacity">⌘N</span>
            </Link>

            <NavLink 
                href="/dashboard/chat" 
                label="Intelligence Chat" 
                icon={<MessageSquare className="w-4 h-4" />} 
            />

            <NavLink 
                href="/dashboard/investigations/batch" 
                label="Batch Aggregator" 
                icon={<Layers className="w-4 h-4" />} 
                badge="Elite"
            />

            <NavLink 
                href="/dashboard/watchlists" 
                label="Surveillance Grid" 
                icon={<Shield className="w-4 h-4" />} 
                badge="Pro"
            />

            <div className="mt-auto pt-8">
                <Link
                    href="/premium"
                    className="relative flex flex-col gap-2 p-4 rounded-2xl bg-gradient-to-br from-accent/[0.08] to-transparent border border-accent/20 hover:border-accent/50 transition-all group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between text-[10px] font-black text-accent uppercase tracking-[0.2em]">
                            <span>Upgrade Access</span>
                            <Zap className="w-3.5 h-3.5 group-hover:scale-125 transition-transform duration-500 text-accent animate-pulse" />
                        </div>
                        <p className="text-[9px] text-white/50 leading-relaxed mt-2 font-mono uppercase">
                            Deep Cluster Deployment
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
