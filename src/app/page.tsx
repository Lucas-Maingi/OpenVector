"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Hexagon, CheckCircle2, Zap, Shield, Search, Database, Fingerprint, 
  Eye, GitCommit, ChevronRight, Activity, Terminal, Sparkles, ArrowRight, Flame
} from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";

const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; scale: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate only on client to avoid hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 1 + 0.5,
      duration: Math.random() * 20 + 10
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-purple-400"
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            scale: p.scale,
            opacity: Math.random() * 0.3 + 0.1
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function Landing() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
      router.push('/dashboard/investigations/new?target=' + encodeURIComponent(searchValue));
  };

  const trendingCases = [
    { label: "Operation Midnight", id: "CASE-902", icon: Zap },
    { label: "Syndicate X", id: "CASE-814", icon: Flame },
    { label: "Silk Road Node", id: "CASE-771", icon: Shield },
  ];

  return (
    <div className="w-full bg-background min-h-screen transition-colors duration-700">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Dark Ambient Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617] pointer-events-none -z-10" />
        <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-purple-900/20 via-indigo-900/5 to-transparent blur-[120px] pointer-events-none -z-10" />
        
        <FloatingParticles />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center w-full mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border/10 text-text-secondary text-sm font-mono mb-8 shadow-2xl backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent font-bold">Aletheia OSINT v2.4</span> Engine Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-sans font-black text-text-primary tracking-tight leading-[1.1] mb-6 drop-shadow-2xl uppercase"
          >
            Uncover the invisible.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-sans"
          >
            Deploy autonomous AI agent clusters to map recursive identities, verify physical provenance, and resolve complex footprints instantly.
          </motion.p>

          {/* Magical Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative max-w-3xl mx-auto group z-20"
          >
            {/* Glowing Backdrop */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-accent via-accent-blue to-success rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-300 pointer-events-none" />
            
            <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row items-stretch md:items-center bg-surface-elevated/80 backdrop-blur-2xl border border-border/10 rounded-2xl p-2.5 shadow-2xl overflow-hidden gap-2">
              <div className="flex items-center flex-1 px-4 py-2 relative">
                <Search className="w-6 h-6 text-text-tertiary shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter target alias, email, domain..."
                  className="w-full bg-transparent border-none text-text-primary text-lg px-4 focus:outline-none focus:ring-0 placeholder:text-text-tertiary font-bold"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <button 
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-text-primary hover:bg-text-secondary text-background px-8 py-4 rounded-xl font-bold transition-all transform md:hover:scale-[1.02] shadow-xl shrink-0 h-full uppercase tracking-widest text-xs"
                >
                  Initiate Global Sweep <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center justify-center gap-2 bg-surface border border-border/20 hover:border-accent/40 text-text-primary px-8 py-4 rounded-xl font-bold transition-all transform md:hover:scale-[1.02] shadow-xl shrink-0 h-full uppercase tracking-widest text-xs"
                >
                  Dashboard Hub
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary/60">
                <span>Already have an account?</span>
                <button onClick={() => router.push('/auth/login')} className="text-accent hover:text-accent-hover transition-colors underline decoration-accent/30 underline-offset-4">Sign In for Full Access</button>
            </div>
          </motion.div>

          {/* Trending Cases */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex flex-col items-center gap-5"
          >
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Activity className="w-3.5 h-3.5 text-slate-400" /> Trending Solved Cases
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {trendingCases.map((tc, i) => (
                <button
                  key={tc.id}
                  onClick={() => setSearchValue(tc.label)}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:border-slate-600 hover:bg-slate-800/80 transition-all text-sm group/badge cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <tc.icon className={`w-4 h-4 ${i === 0 ? 'text-lime-400' : i === 1 ? 'text-rose-400' : 'text-purple-400'}`} />
                  <span className="text-slate-300 font-medium group-hover/badge:text-white transition-colors">{tc.label}</span>
                  <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block ml-1 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">{tc.id}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modular Agent Clusters */}
      <section id="agents" className="py-24 bg-background/50 relative border-t border-border/10 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Modular Agent Clusters</h2>
            <p className="text-slate-400 text-lg">Deploy specialized autonomous AI agents to recursively hunt, verify, and map identities across the global network.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "BioAgent", icon: Fingerprint, desc: "Traces biographical data, familial links, and professional histories across 400+ public registries.", color: "text-purple-400", bg: "bg-purple-500/10" },
              { title: "InfraAgent", icon: Database, desc: "Maps digital footprints including domain registrations, IP addresses, and historical DNS records.", color: "text-lime-400", bg: "bg-lime-400/10" },
              { title: "BreachAgent", icon: Shield, desc: "Cross-references encrypted credentials against known data dumps and dark-web credential markets.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
            ].map((agent, i) => (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl bg-surface border border-border/10 hover:border-accent/40 shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-${agent.color.split('-')[1]}-500/20 to-transparent blur-3xl rounded-bl-full`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${agent.bg} ${agent.color} shadow-inner border border-border/10`}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2 uppercase tracking-tight">
                  {agent.title}
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-foreground/5 text-text-tertiary font-bold">Active</span>
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{agent.desc}</p>
                <div className="mt-6 pt-6 border-t border-border/10 flex items-center justify-between text-xs font-bold text-text-tertiary uppercase">
                  <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-lime-400" /> 99.9% Uptime</span>
                  <span className="flex items-center gap-1.5"><GitCommit className="w-3.5 h-3.5 text-purple-400" /> Recursion: On</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Proof / Capabilities */}
      <section id="proof" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium mb-6 font-mono">
              <Eye className="w-4 h-4 text-purple-400" /> Visual Proof Scanning
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Recursive intel,<br />verified mathematically.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Every data point collected by Aletheia is cryptographically hashed and linked to a visual archive snapshot. Say goodbye to dead links and missing evidence.
            </p>
            <ul className="space-y-4">
              {[
                "Automated Archive.org capturing",
                "SHA-256 Provenance Hashing on ingestion",
                "OCR and EXIF metadata extraction"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 font-mono text-sm">
                  <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            {/* Recursive Mock UI */}
            <div className="relative z-10 rounded-xl overflow-hidden border border-border/10 shadow-2xl bg-surface/80 backdrop-blur-xl aspect-square lg:aspect-video transform lg:-rotate-y-12 perspective-1000">
              <div className="h-8 border-b border-border/10 bg-background/80 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                <div className="ml-auto text-xs text-text-tertiary font-bold">live-feed.sh</div>
              </div>
              <div className="p-4 font-mono text-sm text-slate-300 space-y-3 relative h-full">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">aletheia</span><span className="text-slate-500">~</span><span className="text-lime-400">❯</span> scan --target @johndoe
                </div>
                <div className="text-slate-500">Initializing clusters... <span className="text-lime-400">[OK]</span></div>
                <div className="text-slate-500">Extracting EXIF data... <span className="text-lime-400">FOUND (4)</span></div>
                <div className="pl-4 border-l border-slate-700/50 mt-2 space-y-1 text-xs">
                  <div>↳ GPS: <span className="text-purple-300">37.7749° N, 122.4194° W</span></div>
                  <div>↳ Device: <span className="text-purple-300">iPhone 14 Pro Max</span></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Decorative blurs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-[100px] -z-10" />
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="pricing" className="py-24 bg-background border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-text-primary mb-4 uppercase">The new standard in OSINT.</h2>
            <p className="text-text-secondary text-lg">Compare Aletheia against traditional investigation methods.</p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border/10 bg-surface shadow-2xl">
            <div className="grid grid-cols-3 bg-foreground/[0.02] border-b border-border/10 p-6 items-center">
              <div className="font-bold text-text-tertiary uppercase tracking-wider text-xs">Capabilities</div>
              <div className="text-center font-bold text-text-tertiary uppercase tracking-wider text-xs">Private Investigators</div>
              <div className="text-center font-bold text-accent text-lg flex items-center justify-center gap-2 uppercase">
                <Hexagon className="w-5 h-5" /> Aletheia Pro
              </div>
            </div>
            {[
              { label: "Data Retrieval Time", pi: "Days to Weeks", al: "< 30 Seconds", focus: true },
              { label: "Biographical Family Tracking", pi: "Manual & Error-prone", al: "Automated & Validated" },
              { label: "Visual Proof Archiving", pi: "Manual Screenshots", al: "Cryptographic Hashing" },
              { label: "Recursive Chain Execution", pi: "Impossible", al: "Native" },
              { label: "Cost per Case", pi: "$5,000+", al: "Included in Tier" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 p-6 border-b border-border/10 last:border-0 items-center ${row.focus ? 'bg-accent/5' : ''}`}>
                <div className="font-bold text-text-primary text-sm md:text-base">{row.label}</div>
                <div className="text-center text-text-tertiary font-bold text-xs">{row.pi}</div>
                <div className={`text-center font-bold ${row.focus ? 'text-accent' : 'text-text-primary'}`}>{row.al}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={() => router.push('/premium')}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-[0_0_30px_rgba(168,85,247,0.3)] text-lg"
            >
               Upgrade to Enterprise OSINT <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
