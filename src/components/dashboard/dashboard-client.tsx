"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, Fingerprint, Database, ChevronDown, ChevronUp, Terminal,
  MapPin, Clock, ArrowUpRight, Crosshair, ShieldAlert, Cpu, Trash2, RefreshCw
} from "lucide-react";

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

  const activeCount = investigations.filter(i => i.status.toLowerCase() === 'active').length;
  const analyzedCount = investigations.filter(i => i.status.toLowerCase() === 'analyzed').length;

  const topStats = [
    { label: "Total Investigations", value: totalScans.toLocaleString(), icon: Database, color: "text-accent-blue" },
    { label: "Active Operations", value: activeCount.toString(), icon: Activity, color: "text-success" },
    { label: "Completed Dossiers", value: analyzedCount.toString(), icon: Fingerprint, color: "text-accent" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-8 h-full flex flex-col pt-4">
      
      {/* Mobile-Optimized Header / Stats Scroll */}
      <section className="shrink-0">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 flex items-center gap-2">
          Intelligence Overview
        </h1>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 no-scrollbar">
          {topStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-surface border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden flex items-center justify-between"
            >
              <div className={`absolute -right-10 -top-10 w-24 h-24 blur-[40px] opacity-20 bg-gradient-to-br from-transparent to-${stat.color.split('-')[1]}-500`} />
              <div>
                <h3 className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">{stat.label}</h3>
                <div className="text-3xl font-serif font-bold text-white">{stat.value}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-background/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collapsible Investigation Feeds */}
      <section className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-accent" /> Recent Operations
          </h2>
          <Link href="/dashboard/investigations" className="text-xs text-accent font-medium hover:text-accent/80">View All</Link>
        </div>
        
        <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pb-8 pr-1">
          {investigations.length === 0 ? (
              <div className="text-center py-10 border border-slate-800/60 rounded-xl bg-slate-900/20 text-slate-500 text-sm">
                  No active investigations found. Start a sweep from the console.
              </div>
          ) : investigations.map((inv) => {
            const isExpanded = expandedCase === inv.id;
            return (
              <div 
                key={inv.id} 
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'bg-background/50 border-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'bg-surface border-white/5 hover:border-white/10'
                }`}
              >
                {/* Header (Always Visible) */}
                <button 
                  onClick={() => setExpandedCase(isExpanded ? null : inv.id)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                      inv.status === 'Critical' ? 'bg-danger/10 border-danger/20 text-danger' : 
                      inv.status === 'Analyzed' ? 'bg-accent/10 border-accent/20 text-accent' :
                      'bg-surface border-white/10 text-text-tertiary'
                    }`}>
                      {inv.status === 'Critical' ? <ShieldAlert className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white max-w-[200px] truncate">{inv.title}</div>
                      <div className="text-xs text-slate-500 font-mono max-w-[200px] truncate">{inv.target}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500">Confidence</div>
                      <div className={`text-xs font-bold font-mono ${inv.progress > 80 ? 'text-success' : 'text-text-tertiary'}`}>{inv.progress}%</div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-white/5 mt-2 bg-background/20">
                        <p className="text-sm text-text-tertiary leading-relaxed mb-4 mt-4">{inv.details}</p>
                        
                        <div className="flex items-center justify-between">
                           <div className="flex -space-x-2">
                             {[...Array(3)].map((_, i) => (
                               <div key={i} className="w-6 h-6 rounded-full border border-background bg-surface flex items-center justify-center text-[8px] font-mono text-text-muted shadow-sm">
                                 L{i+1}
                               </div>
                             ))}
                             <div className="w-6 h-6 rounded-full border border-background bg-surface flex items-center justify-center text-[8px] font-mono text-accent shadow-sm">
                               +{inv.leads}
                             </div>
                           </div>
                           
                           <div className="flex items-center gap-2">
                             <button
                               onClick={() => {
                                 if (confirm("Permanently delete investigation module?")) {
                                   fetch(`/api/investigations/${inv.id}`, { method: 'DELETE' }).then(() => window.location.reload());
                                 }
                               }}
                               className="p-1.5 rounded-lg text-text-tertiary hover:text-danger hover:bg-danger/10 transition-colors"
                               title="Delete Dossier"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                             <Link
                               href={`/dashboard/investigations/${inv.id}?scanning=1`}
                               className="p-1.5 rounded-lg text-text-tertiary hover:text-accent-blue hover:bg-accent-blue/10 transition-colors"
                               title="Rescan Target"
                             >
                               <RefreshCw className="w-4 h-4" />
                             </Link>
                             <Link href={`/dashboard/investigations/${inv.id}`} className="text-xs font-medium text-background bg-accent hover:bg-accent/80 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-lg ml-2">
                               Open Dossier <ArrowUpRight className="w-3 h-3" />
                             </Link>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
      
    </div>
  );
}
