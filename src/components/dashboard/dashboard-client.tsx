"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, Fingerprint, Database, ChevronDown, ChevronUp, Terminal,
  MapPin, Clock, ArrowUpRight, Crosshair, ShieldAlert, Cpu
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
  const [logs, setLogs] = useState<string[]>([
    "INIT SYSTEM... [OK]",
    "CONNECTING TO GLOBAL NODE...",
  ]);

  // Simulated Terminal Effect
  useEffect(() => {
    const sequence = [
      "ESTABLISHED PROXY 192.168.0.1",
      "DECRYPTING PAYLOAD HASH...",
      "FOUND MATCH IN DB_77: 99.4%",
      "AWAITING OPERATOR INPUT..."
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < sequence.length) {
        setLogs(prev => [...prev, sequence[step]]);
        step++;
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const topStats = [
    { label: "Total Scans", value: totalScans.toLocaleString(), icon: Database, color: "text-purple-400" },
    { label: "Active Agent Clusters", value: investigations.filter(i => i.status.toLowerCase() === 'active').length.toString(), icon: Activity, color: "text-lime-400" },
    { label: "Identity Hashes", value: (totalScans * 842).toLocaleString(), icon: Fingerprint, color: "text-indigo-400" } // Simulated multiplier for cool factor
  ];

  const evidences = [
    { id: "E-01", title: "Geolocated Node", type: "Location Data", img: "https://images.unsplash.com/photo-1653361774259-77082d5e3015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
    { id: "E-02", title: "Encrypted Payload", type: "Raw Code", img: "https://images.unsplash.com/photo-1738255654134-1877cb984a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
    { id: "E-03", title: "Target Sighted", type: "CCTV Capture", img: "https://images.unsplash.com/photo-1594672603175-437b202e82fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
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
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-[#020617] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden flex items-center justify-between"
            >
              <div className={`absolute -right-10 -top-10 w-24 h-24 blur-[40px] opacity-20 bg-gradient-to-br from-transparent to-${stat.color.split('-')[1]}-500`} />
              <div>
                <h3 className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">{stat.label}</h3>
                <div className="text-3xl font-serif font-bold text-white">{stat.value}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-slate-800/50 bg-slate-900/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compact Terminal (Spy Tool Vibe) */}
      <section className="shrink-0">
        <div className="bg-[#000000] border border-slate-800/80 rounded-xl p-3 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden font-mono h-[140px] flex flex-col">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-900">
             <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
               <Terminal className="w-3 h-3 text-lime-500" /> system_core.sh
             </div>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-slate-800" />
               <div className="w-2 h-2 rounded-full bg-slate-800" />
               <div className="w-2 h-2 rounded-full bg-lime-500/50 animate-pulse" />
             </div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col justify-end text-xs md:text-sm space-y-1 relative">
            {logs.slice(-4).map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }}
                className={log?.includes("MATCH") ? "text-lime-400 font-bold" : "text-slate-400"}
              >
                <span className="text-slate-600 mr-2">❯</span>{log}
              </motion.div>
            ))}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black to-transparent" />
          </div>
        </div>
      </section>

      {/* Collapsible Investigation Feeds */}
      <section className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-purple-400" /> Active Feeds
          </h2>
          <Link href="/dashboard/investigations" className="text-xs text-purple-400 font-medium hover:text-purple-300">View All</Link>
        </div>
        
        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pb-4 pr-1">
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
                  isExpanded ? 'bg-slate-900/50 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-[#020617] border-slate-800/60 hover:border-slate-700/80'
                }`}
              >
                {/* Header (Always Visible) */}
                <button 
                  onClick={() => setExpandedCase(isExpanded ? null : inv.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                      inv.status === 'Critical' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400'
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
                      <div className={`text-xs font-bold font-mono ${inv.progress > 80 ? 'text-lime-400' : 'text-slate-300'}`}>{inv.progress}%</div>
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
                      <div className="p-4 pt-0 border-t border-slate-800/50 mt-2 bg-slate-900/20">
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 mt-4">{inv.details || "Mapping initial connections across public networks."}</p>
                        
                        <div className="flex items-center justify-between">
                           <div className="flex -space-x-2">
                             {[...Array(3)].map((_, i) => (
                               <div key={i} className="w-6 h-6 rounded-full border border-[#020617] bg-slate-800 flex items-center justify-center text-[8px] font-mono text-slate-400 shadow-sm">
                                 L{i+1}
                               </div>
                             ))}
                             <div className="w-6 h-6 rounded-full border border-[#020617] bg-slate-800 flex items-center justify-center text-[8px] font-mono text-purple-400 shadow-sm">
                               +{inv.leads}
                             </div>
                           </div>
                           
                           <Link href={`/dashboard/investigations/${inv.id}`} className="text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-lg">
                             Open Dossier <ArrowUpRight className="w-3 h-3" />
                           </Link>
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

      {/* Swipeable Evidence Cards */}
      <section className="shrink-0 mt-6 pb-6 relative z-10">
        <h2 className="text-sm font-serif font-bold text-white flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-lime-400" /> Recent Artifacts
        </h2>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {evidences.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="snap-center shrink-0 w-[65vw] sm:w-[280px] h-40 rounded-xl border border-slate-800/80 overflow-hidden relative group cursor-pointer"
            >
              <img src={ev.img} alt={ev.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="text-[10px] font-mono text-lime-400 mb-0.5">{ev.type}</div>
                <div className="text-sm font-bold text-white truncate">{ev.title}</div>
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded border border-slate-700 text-[8px] font-mono text-slate-400">
                {ev.id}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
