"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Hexagon, Shield, Network, Eye, Lock, Globe, Cpu } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-text-primary flex flex-col">
      <LandingHeader />
      
      <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8 pt-24 custom-scrollbar flex flex-col items-center">
        <div className="text-center mb-16 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <Zap className="w-3.5 h-3.5" /> Next-Generation OSINT
          </motion.div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight mb-4">Deploy Enterprise Capabilities</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-sans">
            Unlock the full power of autonomous agent clusters. Built exclusively for enterprise security teams and professional intelligence analysts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 w-full max-w-5xl items-center font-sans">
          {/* Basic Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#020617]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden h-[90%]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="mb-8 relative z-10">
              <h3 className="text-xl font-semibold text-white mb-2">Analyst Edition</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold text-slate-300">Free</span>
              </div>
              <p className="text-sm text-slate-400">Essential tools for individual researchers and preliminary tactical assessments.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 relative z-10">
              {[
                "3 Concurrent Investigations",
                "Manual Node Extraction Map",
                "Standard Surface Web Scanning",
                "7-Day Evidence Retention",
                "Community Support Forum"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link href="/dashboard" className="block relative z-10">
              <button className="w-full py-3.5 rounded-xl border border-slate-700/50 bg-slate-800/30 text-slate-400 font-semibold transition-colors hover:bg-slate-800/50 hover:text-white">
                Launch Free Console
              </button>
            </Link>
          </motion.div>

          {/* Pro Tier (Spotlight with Gold/Purple Gradient) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-amber-300 via-purple-500 to-indigo-600 shadow-[0_0_40px_rgba(168,85,247,0.3)] group z-10 transform lg:scale-105"
          >
            {/* Inner Card */}
            <div className="bg-slate-950/95 backdrop-blur-3xl rounded-[15px] p-10 relative overflow-hidden flex flex-col h-full">
              {/* Ambient Background Glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-1000 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Premium Badge */}
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Hexagon className="w-3 h-3 fill-amber-500/20" /> Enterprise Standard
              </div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-amber-200 to-purple-300 bg-clip-text text-transparent inline-block">
                  Aletheia Pro
                </h3>
                <div className="flex items-end gap-2 mb-4 mt-2">
                  <span className="text-5xl font-bold text-white tracking-tight">$49</span>
                  <span className="text-slate-400 font-mono mb-1.5">/mo</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
                  Unrestricted access to the entire autonomous hunting grid. Cryptographically verified evidence and full darknet traversal.
                </p>
              </div>
              
              <div className="space-y-6 mb-10 flex-1 relative z-10">
                {/* Highlight Features Block */}
                <div className="bg-[#020617]/60 rounded-xl p-5 border border-purple-500/20 shadow-inner">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">Core Autonomous Agents</h4>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3.5 group/feature">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 group-hover/feature:border-indigo-500/50 transition-colors">
                        <Lock className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Dark Web Node Access</div>
                        <div className="text-xs text-slate-400 leading-relaxed mt-1">Deep indexing of TOR/I2P marketplaces, leak sites, and encrypted forums.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5 group/feature">
                      <div className="p-1.5 rounded-lg bg-lime-500/10 border border-lime-500/20 group-hover/feature:border-lime-500/50 transition-colors">
                        <Network className="w-4 h-4 text-lime-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Recursive Identity Mining</div>
                        <div className="text-xs text-slate-400 leading-relaxed mt-1">Automated relationship graphing linking aliases, crypto wallets, and real-world entities.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5 group/feature">
                      <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover/feature:border-purple-500/50 transition-colors">
                        <Eye className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Automated Visual Proof</div>
                        <div className="text-xs text-slate-400 leading-relaxed mt-1">AI-driven EXIF extraction, facial clustering, and cross-referencing across archived images.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Standard List */}
                <ul className="space-y-3 px-1">
                  {[
                    "Unlimited Active Investigations",
                    "Cryptographic Evidence Hashing (Archival)",
                    "Custom API & Webhook Integrations",
                    "Priority 24/7 Intel Analyst Support"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link href={process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_LTD_URL || "#"} className="block relative z-10" target="_blank">
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2 group overflow-hidden">
                  <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  Start Free Trial <Zap className="w-4 h-4 fill-white/50" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 mb-24 text-center text-xs font-mono text-slate-500 flex items-center gap-3 bg-slate-900/40 px-5 py-2.5 rounded-lg border border-slate-800/60 backdrop-blur-md"
        >
          <Shield className="w-4 h-4 text-slate-400 shrink-0" />
          All enterprise plans operate within highly compartmentalized, military-grade 256-bit AES encrypted environments.
        </motion.div>
      </div>

      <footer className="py-12 border-t border-slate-800/50 bg-[#020617]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="font-bold tracking-tight text-white">Aletheia <span className="text-purple-500/80 font-medium">Enterprise</span></span>
            </div>

            <div className="flex gap-8 text-sm text-slate-500 font-sans">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            </div>

            <div className="text-xs text-slate-600 font-mono">
              © {new Date().getFullYear()} Aletheia. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
