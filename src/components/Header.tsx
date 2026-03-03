"use client";

import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { Shield, Search, Zap, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Shield className="w-6 h-6 text-accent" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-text-primary">
                            Open<span className="text-accent">Vector</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/investigations" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            Investigations
                        </Link>
                        <Link href="/connectors" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            Connectors
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-elevated rounded-full border border-border text-text-tertiary text-xs">
                        <Search className="w-3.5 h-3.5" />
                        <span>Search vectors...</span>
                        <kbd className="ml-2 font-mono text-[10px] bg-background px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
                    </div>

                    <ThemeSwitcher />

                    <Button variant="primary" size="sm" className="hidden sm:flex">
                        <Zap className="w-4 h-4 mr-2" />
                        New Scan
                    </Button>

                    <button className="md:hidden p-2 text-text-secondary">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
