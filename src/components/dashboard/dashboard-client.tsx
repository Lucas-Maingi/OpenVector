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
    { label: "Total_Investigations", value: localTotalScans.toLocaleString(), icon: Database, color: "text-blue-400", glow: "bg-blue-500/10" },
    { label: "Active_Operations", value: activeCount.toString(), icon: Activity, color: "text-emerald-400", glow: "bg-emerald-500/10" },
    { label: "Completed_Dossiers", value: analyzedCount.toString(), icon: Fingerprint, color: "text-accent", glow: "bg-accent/10" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-10 h-full flex flex-col pt-2 pb-10">
      
      {/* HUD Header & Stats */}
      <section className="shrink-0">
        <div className="flex items-end justify-between mb-6 px-1">
          <div>
            <div className="text-[10px] font-mono text-accent/60 uppercase tracking-[0.4em] mb-1">System_Status: Optimal</div>
            <h1 className="text-3xl font-black text-white/90 tracking-tight flex items-center gap-3">
              Intelligence_Overview
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
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
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-500"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 blur-[40px] opacity-20 transition-all duration-700 group-hover:opacity-40 ${stat.glow}`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.02] ${stat.color} shadow-inner`}>
                    <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest bg-white/[0.03] border-white/5 text-white/30">Stable_Data</Badge>
              </div>

              <div>
                <h3 className="text-white/20 font-black text-[9px] uppercase tracking-[0.2em] mb-1 font-mono">{stat.label}</h3>
                <div className="text-3xl font-black text-white/90 tracking-tighter">{stat.value}</div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collapsible Investigation Feeds */}
      <section className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2.5">
            <div className="w-3 h-[1px] bg-accent" />
            Recent_Operations
          </h2>
          <Link href="/dashboard/investigations" className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-all flex items-center gap-1.5 group">
            Node_Index
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pb-8 pr-1">
          {localInvestigations.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl bg-slate-950/20 text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">
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
                    ? 'bg-slate-950/60 border-accent/30 shadow-[0_0_30px_rgba(0,240,255,0.05)]' 
                    : 'bg-slate-950/20 border-white/5 hover:border-white/10 hover:bg-slate-950/40'
                }`}
              >
                {/* Header (Always Visible) */}
                <button 
                  onClick={() => setExpandedCase(isExpanded ? null : inv.id)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      inv.status === 'Critical' ? 'bg-destructive/10 border-destructive/20 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
                      inv.status === 'Analyzed' ? 'bg-accent/10 border-accent/20 text-accent shadow-[0_0_15px_rgba(0,240,255,0.1)]' :
                      'bg-slate-900/50 border-white/5 text-white/20'
                    }`}>
                      {inv.status === 'Critical' ? <ShieldAlert className="w-5 h-5" /> : <Crosshair className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-sm font-black text-white/90 tracking-tight mb-0.5">{inv.title}</div>
                      <div className="text-[10px] text-white/30 font-mono tracking-tighter uppercase">{inv.target}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <div className="text-[8px] uppercase tracking-[0.2em] text-white/20 font-black mb-1">Signal_Yield</div>
                      <div className={`text-xs font-black font-mono ${inv.progress > 80 ? 'text-accent' : 'text-white/40'}`}>{(inv.progress * 1.2).toFixed(0).slice(0, 2)}%</div>
                    </div>
                    <div className={`p-2 rounded-lg bg-white/[0.03] border border-white/5 transition-all ${isExpanded ? 'rotate-180 bg-accent/10 border-accent/20 text-accent' : 'text-white/20'}`}>
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
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 mt-1">
                        <div className="relative group/text mb-6">
                            <p className="text-[11px] font-mono text-white/40 leading-relaxed italic pr-10">
                                "{inv.details}"
                            </p>
                            <Terminal className="absolute top-0 right-0 w-4 h-4 text-white/5" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/[0.03]">
                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-3">
                                  <div className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-black font-mono">Signal_Nodes:</div>
                                  <div className="flex -space-x-1.5">
                                    {[...Array(3)].map((_, i) => (
                                      <div key={i} className="w-7 h-7 rounded-lg border border-white/10 bg-slate-900 flex items-center justify-center text-[9px] font-black font-mono text-white/40 shadow-2xl">
                                        L{i+1}
                                      </div>
                                    ))}
                                    <div className="w-7 h-7 rounded-lg border border-accent/20 bg-slate-900 flex items-center justify-center text-[9px] font-black font-mono text-accent shadow-2xl">
                                      +{inv.leads}
                                    </div>
                                  </div>
                              </div>
                              
                              <div className="h-4 w-[1px] bg-white/10" />
                              
                              <div className="flex items-center gap-3">
                                <div className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-black font-mono">Risk_Profile:</div>
                                <Badge variant="outline" className={`text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg border-opacity-50 ${
                                  inv.leads > 10 ? 'bg-destructive/10 border-destructive/30 text-destructive shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 
                                  inv.leads > 5 ? 'bg-warning/10 border-warning/30 text-warning' : 
                                  'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                }`}>
                                  {inv.leads > 10 ? 'CRITICAL_EXPOSURE' : inv.leads > 5 ? 'ELEVATED_THREAT' : 'STABLE_NODE'}
                                </Badge>
                              </div>
                            </div>
                           
                           <div className="flex items-center gap-3">
                             <div className="flex items-center p-1 rounded-xl bg-white/[0.02] border border-white/5">
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
                                    className="px-4 py-2 rounded-lg text-white bg-destructive hover:bg-destructive/80 transition-all text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
                                    >
                                    <Trash2 className="w-3 h-3" /> Confirm_Purge
                                    </button>
                                ) : (
                                    <button
                                    onClick={() => setPendingDeleteId(inv.id)}
                                    className="p-2.5 rounded-lg text-white/20 hover:text-destructive hover:bg-destructive/10 transition-all"
                                    title="Purge Intelligence"
                                    >
                                    <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <Link
                                    href={`/dashboard/investigations/${inv.id}?scanning=1`}
                                    className="p-2.5 rounded-lg text-white/20 hover:text-accent hover:bg-accent/10 transition-all"
                                    title="Recalibrate Signal"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Link>
                             </div>
                             
                             <Link href={`/dashboard/investigations/${inv.id}`} className="h-10 px-5 rounded-xl bg-accent text-slate-950 hover:bg-white transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-accent/40">
                                Open_Dossier <ArrowUpRight className="w-3.5 h-3.5" />
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
