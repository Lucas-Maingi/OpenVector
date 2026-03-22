"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, Fingerprint, Database, ChevronDown, ChevronUp, Terminal,
  MapPin, Clock, ArrowUpRight, Crosshair, ShieldAlert, Cpu, Trash2, RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InvestigationProp {
    id: string;
    title: string;
    target: string;
    status: string;
    progress: number;
    details: string;
    leads: number;
}

export function DashboardClient({ 
    investigations, 
    totalScans 
}: { 
    investigations: InvestigationProp[];
    totalScans: number;
}) {
  const [expandedCase, setExpandedCase] = useState<string | null>(investigations[0]?.id || null);
  const [localInvestigations, setLocalInvestigations] = useState<InvestigationProp[]>(investigations);
  const [localTotalScans, setLocalTotalScans] = useState(totalScans);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setLocalInvestigations(investigations);
    setLocalTotalScans(totalScans);
  }, [investigations, totalScans]);

  const activeCount = localInvestigations.filter(i => i.status.toLowerCase() === 'active').length;
  const analyzedCount = localInvestigations.filter(i => i.status.toLowerCase() === 'analyzed').length;

  const topStats = [
    { label: "Total Investigations", value: localTotalScans.toLocaleString(), icon: Database, color: "text-blue-400", glow: "bg-blue-500/10" },
    { label: "Active Investigations", value: activeCount.toString(), icon: Activity, color: "text-emerald-400", glow: "bg-emerald-500/10" },
    { label: "Completed Reports", value: analyzedCount.toString(), icon: Fingerprint, color: "text-accent", glow: "bg-accent/10" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-10 h-full flex flex-col pt-2 pb-10">
      
      {/* HUD Header & Stats */}
      <section className="shrink-0">
        <div className="flex items-end justify-between mb-6 px-1">
          <div>
            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">System Status: Online</div>
            <h1 className="text-4xl font-black text-text-primary tracking-tight flex items-center gap-3 transition-colors">
              Dashboard Overview
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </h1>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 no-scrollbar">
          {topStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-surface/40 backdrop-blur-xl border border-border/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-border/20 transition-all duration-500"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 blur-[40px] opacity-20 transition-all duration-700 group-hover:opacity-40 ${stat.glow}`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-border/10 bg-foreground/5 ${stat.color} shadow-inner`}>
                    <stat.icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-text-secondary font-bold text-[10px] uppercase tracking-widest mb-1">{stat.label}</h3>
                <div className="text-4xl font-black text-text-primary tracking-tighter">{stat.value}</div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collapsible Investigation Feeds */}
      <section className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-[13px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2.5">
            <div className="w-3 h-[1px] bg-accent" />
            Recent Investigations
          </h2>
          <Link href="/dashboard/investigations" className="text-[11px] font-bold text-accent uppercase tracking-widest hover:text-white transition-all flex items-center gap-1.5 group">
            View All
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pb-8 pr-1">
          {localInvestigations.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border/10 rounded-2xl bg-surface/20 text-text-tertiary text-[10px] font-mono uppercase tracking-[0.2em]">
                  No active investigations found. Start a sweep from the console.
              </div>
          ) : localInvestigations.map((inv, i) => {
            const isExpanded = expandedCase === inv.id;
            return (
              <motion.div 
                key={inv.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`group border rounded-2xl transition-all duration-500 overflow-hidden relative ${
                  isExpanded 
                    ? 'bg-surface/60 border-accent/40 shadow-xl' 
                    : 'bg-surface/20 border-border/10 hover:border-border/30 hover:bg-surface/40'
                }`}
              >
                {/* Header (Always Visible) */}
                <button 
                  onClick={() => setExpandedCase(isExpanded ? null : inv.id)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      inv.status === 'Critical' ? 'bg-error/10 border-error/20 text-error' : 
                      inv.status === 'Analyzed' ? 'bg-accent/10 border-accent/20 text-accent' :
                      'bg-surface-elevated/50 border-border/10 text-text-tertiary shadow-inner'
                    }`}>
                      {inv.status === 'Critical' ? <ShieldAlert className="w-5 h-5" /> : <Crosshair className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-base font-bold text-text-primary tracking-tight mb-0.5">{inv.title}</div>
                      <div className="text-[11px] text-text-secondary tracking-tight uppercase">{inv.target}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <div className="text-[8px] uppercase tracking-widest text-text-tertiary font-bold mb-1">Search Progress</div>
                      <div className={`text-xs font-bold ${inv.progress > 80 ? 'text-accent' : 'text-text-secondary'}`}>{(inv.progress * 1.2).toFixed(0).slice(0, 2)}%</div>
                    </div>
                    <div className={`p-2 rounded-lg bg-foreground/[0.03] border border-border/10 transition-all ${isExpanded ? 'rotate-180 bg-accent/10 border-accent/20 text-accent' : 'text-text-tertiary'}`}>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-6 pb-6 pt-3 border-t border-border/5 mt-1 bg-foreground/[0.01]">
                        <div className="relative group/text mb-6 p-4 bg-background/40 border border-border/10 rounded-xl shadow-inner">
                            <p className="text-[12px] text-text-secondary leading-relaxed italic pr-10">
                                "{inv.details}"
                            </p>
                            <Terminal className="absolute top-4 right-4 w-4 h-4 text-text-tertiary/20" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-border/5">
                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-3">
                                  <div className="text-[9px] uppercase tracking-[0.2em] text-text-tertiary font-bold">Signal_Nodes:</div>
                                  <div className="flex -space-x-1.5">
                                    {[...Array(3)].map((_, i) => (
                                      <div key={i} className="w-7 h-7 rounded-lg border border-border/10 bg-surface-elevated flex items-center justify-center text-[9px] font-bold text-text-tertiary shadow-inner">
                                        L{i+1}
                                      </div>
                                    ))}
                                    <div className="w-7 h-7 rounded-lg border border-accent/20 bg-surface-elevated flex items-center justify-center text-[9px] font-bold text-accent shadow-inner">
                                      +{inv.leads}
                                    </div>
                                  </div>
                              </div>
                                                            <div className="h-4 w-[1px] bg-border/20" />
                              
                               <div className="flex items-center gap-3">
                                <div className="text-[9px] uppercase tracking-widest text-text-tertiary font-bold">Threat Level:</div>
                                <Badge variant="outline" className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-lg border-opacity-50 ${
                                  inv.leads > 10 ? 'bg-error/10 border-error/30 text-error' : 
                                  inv.leads > 5 ? 'bg-warning/10 border-warning/30 text-warning' : 
                                  'bg-success/10 border-success/30 text-success'
                                }`}>
                                  {inv.leads > 10 ? 'CRITICAL' : inv.leads > 5 ? 'ELEVATED' : 'STABLE'}
                                </Badge>
                              </div>
                            </div>
                           
                           <div className="flex items-center gap-3">
                             <div className="flex items-center p-1 rounded-xl bg-foreground/[0.02] border border-border/10">
                                {pendingDeleteId === inv.id ? (
                                    <button
                                        onClick={async () => {
                                        const invToDelete = inv;
                                        setLocalInvestigations(prev => prev.filter(i => i.id !== inv.id));
                                        setLocalTotalScans(prev => Math.max(0, prev - 1));
                                        try {
                                            const res = await fetch(`/api/investigations/${inv.id}`, { method: 'DELETE' });
                                            if (!res.ok) throw new Error('Deletion failed');
                                        } catch (err) {
                                            setLocalInvestigations(prev => [invToDelete, ...prev]);
                                            setLocalTotalScans(prev => prev + 1);
                                            alert('Failed to delete.');
                                        }
                                        }}
                                    className="px-4 py-2 rounded-lg text-white bg-error hover:bg-error/80 transition-all text-[9px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2"
                                    >
                                    <Trash2 className="w-3 h-3" /> Confirm Delete
                                    </button>
                                ) : (
                                    <button
                                    onClick={() => setPendingDeleteId(inv.id)}
                                    className="p-2.5 rounded-lg text-text-tertiary hover:text-error hover:bg-error/10 transition-all"
                                    title="Delete Investigation"
                                    >
                                    <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <Link
                                    href={`/dashboard/investigations/${inv.id}?scanning=1`}
                                    className="p-2.5 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-all"
                                    title="Restart Analysis"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Link>
                             </div>
                             
                             <Link href={`/dashboard/investigations/${inv.id}`} className="h-10 px-5 rounded-xl bg-accent text-background hover:bg-text-primary hover:text-background transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg hover:shadow-accent/40">
                                Open Investigation <ArrowUpRight className="w-3.5 h-3.5" />
                             </Link>
                           </div>
                        </div>
                      </div>
                      
                      {/* Scanline overlay only for expanded */}
                      <div className="absolute inset-0 scanline opacity-[0.02] pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Background Noise Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </section>
      
    </div>
  );
}
