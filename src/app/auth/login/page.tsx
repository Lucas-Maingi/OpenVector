'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get('next') ?? '/dashboard';
    const supabase = createClient();

    const handleAuth = async (action: 'login' | 'signup', e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } =
            action === 'login'
                ? await supabase.auth.signInWithPassword({ email, password })
                : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback?next=${next}` } });

        if (error) {
            setError(error.message);
        } else {
            router.push(next);
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background p-4 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

            <div className="w-full max-w-sm panel-glass p-8 space-y-8 z-10 relative">
                <div className="text-center">
                    <h1 className="text-2xl font-mono text-glow">OpenVector</h1>
                    <p className="text-sm text-text-muted mt-2">Terminal Access</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => handleAuth('login', e)}>
                    {error && (
                        <div className="p-3 text-sm bg-red-900/20 border border-red-500/50 text-red-200 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-text-secondary">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface border-border-bright focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 rounded px-3 py-2 text-sm outline-none transition-all placeholder:text-text-muted"
                            placeholder="analyst@domain.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-text-secondary">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface border-border-bright focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 rounded px-3 py-2 text-sm outline-none transition-all"
                        />
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-blue hover:bg-accent-blue-dim text-white text-sm font-medium py-2 rounded focus:outline-none transition-colors border border-transparent shadow-glow"
                        >
                            Authenticate
                        </button>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={(e) => handleAuth('signup', e)}
                                disabled={loading}
                                className="flex-1 bg-surface-2 hover:bg-surface border border-border-bright text-text-primary text-sm font-medium py-2 rounded focus:outline-none transition-colors"
                            >
                                Request Access
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard')}
                                className="flex-1 bg-accent/20 hover:bg-accent/30 border border-accent/30 text-accent text-sm font-medium py-2 rounded focus:outline-none transition-colors"
                            >
                                Dev Bypass
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
