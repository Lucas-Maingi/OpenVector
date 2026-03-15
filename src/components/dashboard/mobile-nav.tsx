"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu, X, Home, PlusCircle, MessageSquare, User
} from "lucide-react";

export function MobileNav() {
    const pathname = usePathname();

    const tabs = [
        { href: '/dashboard', label: 'Home', icon: Home },
        { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
        { href: '/dashboard/investigations/new', label: 'New', icon: PlusCircle },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-white/[0.06] safe-area-bottom">
            <div className="flex items-center justify-around px-2 py-1.5">
                {tabs.map(tab => {
                    const isActive = tab.href === '/dashboard'
                        ? pathname === '/dashboard'
                        : pathname.startsWith(tab.href);
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all active:scale-95 ${
                                isActive
                                    ? 'text-accent'
                                    : 'text-white/30 hover:text-white/50'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]' : ''}`} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{tab.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export function MobileSidebarToggle({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Desktop: Always visible */}
            <div className="hidden md:flex">
                {children}
            </div>

            {/* Mobile: Hamburger + slide-in */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-surface/90 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white transition-colors shadow-lg"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Slide-in Sidebar */}
            <div className={`md:hidden fixed inset-y-0 left-0 z-[70] w-72 transform transition-transform duration-300 ease-out ${
                open ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="h-full flex flex-col relative" onClick={(e) => {
                    if ((e.target as HTMLElement).closest('a')) setOpen(false);
                }}>
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}
