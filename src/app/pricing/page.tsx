"use client";

import { motion } from "framer-motion";
import { 
  Shield, Zap, Check, ArrowRight, Hexagon, Database, 
  Fingerprint, MessageSquare, Terminal, Cpu, Globe, 
  Lock, Activity, Sparkles, Flame, Infinity
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/landing/landing-header";
import { Badge } from "@/components/ui/badge";

const features = [
  { 
    title: "Recursive Identity Expansion", 
    desc: "Automated multi-hop target mapping across 1000+ data nodes.",
    icon: Infinity,
    color: "text-purple-400"
  },
  { 
    title: "Deep Web Breach Retrieval", 
    desc: "Live access to 10B+ leaked credentials and historical dumps.",
    icon: Database,
    color: "text-rose-400"
  },
  { 
    title: "Real-time GPS Provenance", 
    desc: "Extract precise location data from EXIF/metadata and image history.",
    icon: Globe,
    color: "text-blue-400"
  },
  { 
    title: "Dark Net Market Crawler", 
    desc: "Search active .onion markets for target aliases and trade history.",
    icon: Shield,
    color: "text-indigo-400"
  },
  { 
    title: "Biometric Cross-Reference", 
    desc: "Face-matching across social platforms and public criminal databases.",
    icon: Fingerprint,
    color: "text-emerald-400"
  },
  { 
    title: "Autonomous Agent Clusters", 
    desc: "Deploy up to 25 specialized AI 'Hunters' to run concurrent sweeps.",
    icon: Cpu,
    color: "text-amber-400"
  },
  { 
    title: "Cryptographic Evidence Vault", 
    desc: "SHA-256 hashed proof snapshots for legal and corporate submission.",
    icon: Lock,
    color: "text-slate-400"
  },
  { 
    title: "Priority LLM Execution", 
    desc: "Instant access to OpenAI o1, GPT-4o, and Gemini 1.5 Pro clusters.",
    icon: Sparkles,
    color: "text-accent"
  },
  { 
    title: "Social Graph Analysis", 
    desc: "Map familial, professional, and criminal proximity clusters automatically.",
    icon: Activity,
    color: "text-lime-400"
  },
  { 
    title: "Infra-Tracking Node", 
    desc: "Persistent monitoring of DNS, WHOIS, and IP-to-Target correlations.",
    icon: Terminal,
    color: "text-cyan-400"
  },
  { 
    title: "White-label Reporting", 
    desc: "Export professional, court-ready PDF dossiers with custom branding.",
    icon: Check,
    color: "text-success"
  },
  { 
    title: "API Access (Webhooks)", 
    desc: "Integrate Aletheia intelligence directly into your existing SOC.",
    icon: Flame,
    color: "text-orange-400"
  }
];

const plans = [
  {
    name: "Lite",
    price: "$0",
    desc: "The professional starting point for independent researchers.",
    features: [
      "5 Investigations / Month",
      "Standard Search Clusters",
      "Public Record Mapping",
      "Email & Username Sweeps",
      "Basic AI Insights",
      "Standard Support"
    ],
    cta: "Start Searching",
    popular: false
  },
  {
    name: "Tactical Pro",
    price: "$99",
    period: "/mo",
    desc: "The full power of Aletheia for serious investigators and agencies.",
    features: [
      "Unlimited Investigations",
      "All 12+ Elite Features",
      "Full API Powerhouse Access",
      "Autonomous Agent Clusters",
      "Deep Web & Breach Access",
      "Priority Recursive Intel",
      "24/7 Forensic Support"
    ],
    cta: "Obtain License",
    popular: true
  },
  {
    name: "Lifetime LTD",
    price: "$399",
    period: "one-time",
    desc: "Secure your investigative edge forever. No subscriptions, ever.",
    features: [
      "Everything in Tactical Pro",
      "Early Access to New Agents",
      "Unlimited Lifetime Usage",
      "Custom Reporting Branding",
      "Beta Feature Enrollment",
      "Founder's Circle Support",
      "Immutable License ID"
    ],
    cta: "Secure Lifetime Deal",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="w-full bg-background min-h-screen">
      <LandingHeader />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#020617] to-[#020617] -z-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/10 text-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Zap className="w-3.5 h-3.5" /> Licensed Intelligence
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tight leading-[1.1] mb-6 uppercase italic">
            Pick your power.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            From basic scouting to autonomous global sweeps. Choose the tier that matches your intelligence requirements.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border transition-all duration-500 flex flex-col h-full overflow-hidden group ${
                plan.popular 
                  ? 'bg-surface/60 border-accent/40 shadow-[0_0_50px_rgba(168,85,247,0.15)] ring-1 ring-accent/20' 
                  : 'bg-surface/20 border-border/10 hover:border-border/30 backdrop-blur-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">
                  Most Requested
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 italic">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black text-text-primary tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-text-tertiary font-bold uppercase tracking-widest text-[10px]">{plan.period}</span>}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-1 h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-accent/20 text-accent' : 'bg-success/20 text-success'}`}>
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-sm text-text-secondary font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className={`w-full font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-2xl transition-all transform group-hover:scale-[1.02] ${
                  plan.popular 
                    ? 'bg-accent hover:bg-accent-hover text-white shadow-accent/20' 
                    : 'bg-surface-elevated hover:bg-white hover:text-background text-text-primary border border-border/10'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Decorative backgrounds */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 blur-[80px] rounded-full group-hover:bg-accent/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-32 bg-surface/10 border-t border-border/10 backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase italic">
              Pro-Level Capabilities.
            </h2>
            <p className="text-lg text-text-secondary">
              Strategic advantages that move investigations from "Speculative" to "Conclusive" in under 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 rounded-3xl bg-surface/30 border border-border/5 hover:border-accent/30 hover:bg-surface/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-foreground/5 border border-border/10 ${f.color} group-hover:scale-110 group-hover:bg-foreground/10 transition-all duration-500`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-3 uppercase tracking-tight italic">
                  {f.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {f.desc}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Powerhouse Section */}
      <section className="py-32 bg-background border-t border-border/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-surface/40 backdrop-blur-3xl rounded-[3rem] p-12 lg:p-20 border border-border/10 relative overflow-hidden shadow-3xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-success/10 text-success border-success/20 mb-8 px-4 py-1 uppercase font-black text-[10px] tracking-[.3em]">
                  The API Powerhouse
                </Badge>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none uppercase italic">
                  Powered by the many.<br/>Controlled by one.
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed mb-10">
                  Paid plans include direct execution credits for the world's most expensive and guarded OSINT databases. We handle the subscriptions, you handle the results.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {[
                    "Google SERP API", "OpenAI o1-Pro", "Gemini 1.5 Pro", "Claude 3.5 Sonnet", 
                    "FullContact People", "Intelligence X", "Dehashed Pro", "Shodan Enterprise",
                    "Censys", "Wayback Snapshot"
                  ].map(api => (
                    <div key={api} className="px-4 py-2 rounded-xl bg-background border border-border/10 text-text-tertiary text-xs font-bold uppercase tracking-widest shadow-inner">
                      {api}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative aspect-square bg-gradient-to-br from-accent/5 to-transparent rounded-[2rem] border border-border/5 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
                <div className="text-center relative z-10">
                   <Hexagon className="w-48 h-48 text-accent/20 animate-spin-slow" />
                   <div className="mt-8">
                     <div className="text-accent font-black text-4xl tracking-tighter uppercase italic">Recursive Engine</div>
                     <div className="text-success text-[10px] font-bold uppercase tracking-[0.5em] mt-2">v2.4 Online</div>
                   </div>
                </div>
                {/* Floating Icons */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-1/4 right-1/4 text-purple-400 opacity-40"><Cpu className="w-8 h-8" /></motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-1/4 left-1/4 text-emerald-400 opacity-40"><Shield className="w-10 h-10" /></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-12 text-center uppercase italic tracking-tighter">
            Operational Comparison
          </h2>
          
          <div className="rounded-3xl border border-border/10 bg-surface/20 shadow-2xl overflow-hidden backdrop-blur-xl">
             <div className="grid grid-cols-3 p-8 border-b border-border/10 bg-foreground/[0.02]">
                <div className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">Capability</div>
                <div className="text-center text-[10px] font-black text-text-tertiary uppercase tracking-widest">Lite</div>
                <div className="text-center text-[10px] font-black text-accent uppercase tracking-widest">Tactical Pro</div>
             </div>
             
             {[
               { name: "Global Intelligence Nodes", lite: "Limited (3)", pro: "Unlimited", highlight: true },
               { name: "Recursive Expansion Depth", lite: "Manual", pro: "Autonomous (5-level)", highlight: true },
               { name: "Darknet Market Scraping", lite: "✖", pro: "✔" },
               { name: "Biometric Face Matching", lite: "✖", pro: "✔ (Credits Incl.)" },
               { name: "Cryptographic Proof Hashing", lite: "✖", pro: "✔" },
               { name: "API Rate Limits", lite: "1/min", pro: "Unlimited" },
               { name: "Commercial Usage License", lite: "Standard", pro: "Agency Extended" },
               { name: "Support Response", lite: "48h", pro: "Instant Forensics" },
             ].map((row, i) => (
               <div key={i} className={`grid grid-cols-3 p-6 border-b border-border/10 last:border-0 items-center ${row.highlight ? 'bg-accent/[0.02]' : ''}`}>
                  <div className="text-xs font-bold text-text-primary tracking-tight">{row.name}</div>
                  <div className="text-center text-[10px] font-bold text-text-tertiary">{row.lite}</div>
                  <div className={`text-center text-xs font-black ${row.pro === '✔' ? 'text-success' : 'text-text-primary'}`}>{row.pro}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-accent relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-blue/40 via-transparent to-transparent opacity-50" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
            Unleash the hunters.
          </h2>
          <p className="text-lg text-white/80 font-bold mb-12 uppercase tracking-widest italic flex items-center justify-center gap-3">
            <Shield className="w-5 h-5" /> 100% Satisfaction Guarantee <Shield className="w-5 h-5" />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-accent hover:bg-slate-100 font-black uppercase tracking-widest text-sm shadow-2xl">
              Obtain License Now
            </Button>
            <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] text-left">
              Secure payment via LemonSqueezy • SSL Encrypted
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary">
        © 2026 Aletheia Intelligence Systems • [System_Authorized]
      </footer>
    </div>
  );
}
