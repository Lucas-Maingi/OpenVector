'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
    const callbackError = searchParams.get('error');
    const supabase = createClient();

    // Handle errors from callback route
    useEffect(() => {
        if (callbackError) {
            setError(decodeURIComponent(callbackError));
        }
    }, [callbackError]);

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
            // Enhanced signup diagnostics
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback?next=${next}`
                }
            });

            if (error) {
                console.error('[Auth Diagnostics] Signup failure:', error);
                // If it's a database error, we suggest checking Supabase triggers
                if (error.message.includes('Database error')) {
                    setError("Database sync failure. This usually means a conflict in the User table trigger. Please retry or contact administration.");
                } else {
                    setError(error.message);
                }
            } else if (data.user && data.session === null) {
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
            
            {/* Animated accent glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm panel-glass p-8 space-y-8 z-10 relative"
            >
                <div className="text-center space-y-2">
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl font-mono text-glow tracking-tighter"
                    >
                        Aletheia
                    </motion.h1>
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={mode}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted"
                        >
                            {mode === 'login' ? 'Terminal Access' : 'Register Analyst'}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <form className="space-y-4" onSubmit={handleAuth}>
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 text-sm bg-red-900/20 border border-red-500/50 text-red-200 rounded font-mono overflow-hidden"
                            >
                                <span className="text-red-400 mr-2">!</span>{error}
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 text-sm bg-accent-blue/20 border border-accent-blue/50 text-accent-blue-bright rounded font-mono overflow-hidden"
                            >
                                <span className="text-accent-blue-bright mr-2">✓</span>{successMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Email</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="username"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface border-border-bright focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 rounded px-3 py-2 text-sm outline-none transition-all placeholder:text-text-muted font-mono"
                            placeholder="analyst@aletheia.io"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Password</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface border-border-bright focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 rounded px-3 py-2 text-sm outline-none transition-all font-mono"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-6 flex flex-col gap-4">
                        <motion.button
                            whileHover={{ 
                                scale: 1.01,
                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                                borderColor: "rgba(59, 130, 246, 0.8)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-blue hover:bg-accent-blue-bright text-white text-xs uppercase tracking-widest font-bold py-3 rounded cursor-pointer transition-colors shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Decrypting...' : (mode === 'login' ? 'Authenticate' : 'Initialize Account')}
                        </motion.button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === 'login' ? 'signup' : 'login');
                                    setError(null);
                                    setSuccessMessage(null);
                                }}
                                className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-accent-blue-bright transition-colors underline underline-offset-4 cursor-pointer"
                            >
                                {mode === 'login' ? "Access Denied? Register Agent" : "Clearance Found? Sign In"}
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}


