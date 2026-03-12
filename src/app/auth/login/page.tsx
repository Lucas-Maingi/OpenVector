'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get('next') ?? '/dashboard';
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (mode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                router.push(next);
                router.refresh();
            }
        } else {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback?next=${next}`
                }
            });

            if (error) {
                setError(error.message);
            } else if (data.user && data.session === null) {
                // If session is null, it usually means email confirmation is required
                setSuccessMessage("Verification link sent! Please check your email to continue.");
            } else {
                router.push(next);
                router.refresh();
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background p-4 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

            <div className="w-full max-w-sm panel-glass p-8 space-y-8 z-10 relative">
                <div className="text-center">
                    <h1 className="text-2xl font-mono text-glow">ClearDossier</h1>
                    <p className="text-sm text-text-muted mt-2">
                        {mode === 'login' ? 'Terminal Access' : 'Register Analyst'}
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleAuth}>
                    {error && (
                        <div className="p-3 text-sm bg-red-900/20 border border-red-500/50 text-red-200 rounded">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="p-3 text-sm bg-accent-blue/20 border border-accent-blue/50 text-accent-blue-bright rounded">
                            {successMessage}
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
                            {loading ? 'Processing...' : (mode === 'login' ? 'Authenticate' : 'Create Account')}
                        </button>

                        <div className="text-center mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === 'login' ? 'signup' : 'login');
                                    setError(null);
                                    setSuccessMessage(null);
                                }}
                                className="text-xs text-text-secondary hover:text-accent-blue-bright transition-colors underline underline-offset-4"
                            >
                                {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

