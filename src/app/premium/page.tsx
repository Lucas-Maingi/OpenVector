"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Hexagon, Shield, Network, Eye, Lock, Globe, Users, Layers, TrendingDown, Target, Search } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-text-primary flex flex-col selection:bg-accent/30">
      <LandingHeader />
      
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 pt-24 custom-scrollbar flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-8 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <Zap className="w-3.5 h-3.5" /> High-Intensity OSINT
          </motion.div>
          <h1 className="text-5xl font-serif font-bold text-white tracking-tight mb-6">Autonomous Intelligence, Subsidized.</h1>
          <p className="text-slate-400 text-lg font-sans leading-relaxed">
            Aletheia consolidates hundreds of high-cost OSINT and AI APIs into a single, seamless platform. Save thousands in individual licensing costs while maintaining elite operational autonomy.
          </p>
        </div>

        {/* ROI / Cost Savings Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl mb-16 p-6 rounded-2xl bg-gradient-to-br from-accent/5 via-slate-900 to-transparent border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingDown className="w-32 h-32" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
            <div className="md:col-span-1">
              <h4 className="text-accent font-mono text-xs uppercase tracking-[0.2em] mb-2 font-bold">The ROI Multiplier</h4>
              <p className="text-white text-xl font-bold leading-tight">Stop paying for individual data seats.</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ValueStat label="PimEyes Individual" value="$29.99/mo" saved />
              <ValueStat label="SocialLinks Basic" value="$250/mo" saved />
              <ValueStat label="Deep Search APIs" value="$150/mo" saved />
              <ValueStat label="Gemini Pro/Flash" value="$20/mo" saved />
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-mono italic">
              * Aletheia subsidizes these costs through bulk engine orchestration.
            </div>
            <div className="text-xs font-bold text-success animate-pulse">
              TOTAL ESTIMATED SAVINGS: $12,400+ PER YEAR
            </div>
          </div>
        </motion.div>

        {/* 4-Tier Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl font-sans mb-20">
          
          {/* 1. Analyst Edition (Free) */}
          <PricingCard
            title="Analyst"
            price="0"
            description="High-volume reconnaissance for individual researchers."
            features={[
              "15 Concurrent Investigations",
              "5 Facial AI Taster Credits",
              "Standard Surface Search",
              "Identity Node Mapping",
              "14-Day Evidence Logs"
            ]}
            buttonText="Deploy Terminal"
            href="/dashboard"
          />

          {/* 2. Pro Edition (Primary) */}
          <PricingCard
            title="Aletheia Pro"
            price="49"
            highlight
            description="Unlimited force for the professional security analyst."
            features={[
              "Unlimited Investigations",
              "50 Facial AI Searches /mo",
              "10 Active Watchlists",
              "Professional PDF Reports",
              "Dark-Mode Identity Graph",
              "Priority Engine Execution"
            ]}
            buttonText="Start Hunting"
            href={process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_LTD_URL || "#"}
          />

          {/* 3. Elite Agency */}
          <PricingCard
            title="Elite"
            price="149"
            accent="indigo"
            description="Team-wide intelligence and batch processing power."
            features={[
              "Batch Intelligence (100 Targets)",
              "150 Facial AI Searches /mo",
              "50 Active Watchlists",
              "3 Team Collaborator Seats",
              "Web3 & Crypto Correlation",
              "API Webhook Access"
            ]}
            buttonText="Upgrade Agency"
            href="#"
          />

          {/* 4. Enterprise */}
          <PricingCard
            title="Enterprise"
            price="499"
            accent="danger"
            description="Military-grade surveillance and dedicated hardware."
            features={[
              "Unlimited Facial AI",
              "Real-time Dark Web Monitoring",
              "Dedicated OSINT VPC",
              "24/7 Forensic Support",
              "Custom Connector Build-outs",
              "Unlimited Team Nodes"
            ]}
            buttonText="Contact Command"
            href="#"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 mb-24 text-center text-[10px] font-mono text-slate-500 flex items-center gap-3 bg-slate-900/40 px-5 py-2.5 rounded-lg border border-slate-800/60 backdrop-blur-md"
        >
          <Shield className="w-4 h-4 text-slate-400 shrink-0" />
          Zero-Trust Infrastructure. All data is purged according to your retention protocol.
        </motion.div>
      </div>

      <footer className="py-12 border-t border-slate-800/50 bg-[#020617]">
        <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="text-xs text-slate-600 font-mono mb-4">
              © {new Date().getFullYear()} Aletheia Intelligence Service.
            </div>
            <div className="flex justify-center gap-8 text-[11px] text-slate-500 font-sans uppercase tracking-[0.2em]">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

function ValueStat({ label, value, saved }: { label: string, value: string, saved?: boolean }) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
      <span className="text-[9px] text-slate-500 font-mono uppercase truncate">{label}</span>
      <span className={`text-[11px] font-bold ${saved ? 'text-danger line-through opacity-50' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  href, 
  highlight, 
  accent = "accent" 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  href: string; 
  highlight?: boolean;
  accent?: "accent" | "indigo" | "danger";
}) {
  const accentColor = accent === "accent" ? "text-accent" : accent === "indigo" ? "text-indigo-400" : "text-danger";
  const accentBg = accent === "accent" ? "bg-accent/10" : accent === "indigo" ? "bg-indigo-500/10" : "bg-danger/10";
  const accentBorder = accent === "accent" ? "border-accent/30" : accent === "indigo" ? "border-indigo-500/30" : "border-danger/30";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-8 rounded-2xl flex flex-col h-full transition-all duration-500 ${
        highlight 
          ? "bg-slate-900 ring-2 ring-accent shadow-[0_0_50px_rgba(0,240,255,0.1)] scale-105 z-10" 
          : "bg-surface-2 border border-white/5 hover:border-white/10"
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-slate-900 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
          Most Deployed
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-lg font-bold mb-2 ${highlight ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-white">${price}</span>
          {price !== "0" && <span className="text-slate-500 text-sm font-mono leading-none">/mo</span>}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed min-h-[40px] italic">{description}</p>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-xs text-slate-300">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${highlight ? 'text-accent' : 'text-slate-600'}`} />
            <span className={feature.match(/Batch|Facial|Dark Web/i) ? "font-bold text-white/90" : ""}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className={href === "#" ? "pointer-events-none" : ""}>
        <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] ${
          highlight 
            ? "bg-accent text-slate-950 shadow-lg shadow-accent/20 hover:brightness-110" 
            : "border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
        }`}>
          {buttonText}
        </button>
      </Link>
    </motion.div>
  );
}
