'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Info, Shield, Target, Activity } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'pulse' | 'pivot' | 'audit' | 'status';
  icon: React.ReactNode;
}

const INSIGHTS: Omit<Toast, 'id'>[] = [
  { message: "System Pulse: High-signal data stream detected in dark web nodes.", type: 'pulse', icon: <Zap className="w-4 h-4 text-cyan-400" /> },
  { message: "Pivot Hint: 4 secondary associates found. Expand Identity Graph?", type: 'pivot', icon: <Target className="w-4 h-4 text-emerald-400" /> },
  { message: "Audit Status: Cryptographic hashing active for all evidence artifacts.", type: 'audit', icon: <Shield className="w-4 h-4 text-purple-400" /> },
  { message: "Network Relay: Sustaining heartbeat across 7 OSINT connectors.", type: 'status', icon: <Activity className="w-4 h-4 text-blue-400" /> },
  { message: "Intelligence Alert: New mention of target detected on monitored forums.", type: 'pulse', icon: <Zap className="w-4 h-4 text-amber-400" /> }
];

export function IntelligenceToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Periodically show random insights to provide "Ambient Intelligence"
    const interval = setInterval(() => {
      const insight = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)];
      const id = Math.random().toString(36).substr(2, 9);
      
      setToasts(prev => [...prev, { ...insight, id }]);

      // Auto-remove after 6 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 6000);
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-lg p-3 shadow-2xl min-w-[300px] pointer-events-auto"
          >
            <div className="flex-shrink-0 bg-white/5 p-2 rounded-md">
              {toast.icon}
            </div>
            <div className="flex-grow">
              <p className="text-xs font-mono text-white/90 leading-tight">
                {toast.message}
              </p>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <Zap className="w-3 h-3 rotate-45" />
            </button>
            <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-500/30 animate-pulse w-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
