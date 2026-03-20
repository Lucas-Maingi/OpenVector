"use client";

import { motion } from "framer-motion";
import { Shield, ExternalLink, User, Calendar, Info } from "lucide-react";
import { FacialMatch } from "@/connectors/visualIntel";
import { Progress } from "@/components/ui/progress";

export function FacialAnalysis({ matches, isScanning }: { matches: FacialMatch[], isScanning: boolean }) {
  if (!isScanning && matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-surface/50 rounded-xl border border-white/5 border-dashed">
        <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-4">
          <Shield className="w-8 h-8 text-white/20" />
        </div>
        <p className="text-sm text-text-muted font-mono uppercase tracking-widest">No Biometric Matches Identified</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#020617] border border-white/5 rounded-2xl overflow-hidden hover:border-accent/40 transition-all shadow-xl hover:shadow-accent/5"
          >
            {/* Confidence Gradient Overlay */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getConfidenceColor(match.confidence)}`} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-inner bg-surface">
                    <img src={match.imageUrl} alt="Visual Match" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-1 rounded-md bg-accent text-slate-900 border border-white/20 shadow-lg">
                    <User className="w-3 h-3" />
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-xl font-bold font-mono ${match.confidence > 0.9 ? 'text-accent' : match.confidence > 0.7 ? 'text-warning' : 'text-text-muted'}`}>
                    {(match.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-[10px] text-text-muted uppercase tracking-tighter font-medium">Confidence Score</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-bold text-white mb-1 truncate">{match.platform}</div>
                <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono">
                  <Calendar className="w-3 h-3" />
                  Archived: {new Date(match.timestamp).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[10px] font-mono text-text-muted uppercase tracking-widest">
                  <span>Match Strength</span>
                  <span>{match.confidence > 0.9 ? 'EXTREME' : 'ELEVATED'}</span>
                </div>
                <Progress value={match.confidence * 100} className="h-1 bg-white/5" indicatorClassName={getConfidenceBg(match.confidence)} />
              </div>

              <a 
                href={match.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition-colors"
              >
                Access Source Node <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
        
        {isScanning && (
          <div className="bg-[#020617] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 animate-pulse">
            <div className="w-12 h-12 rounded-full border-2 border-accent/20 border-t-accent animate-spin mb-4" />
            <p className="text-[10px] text-accent font-mono uppercase tracking-[0.2em]">Recalibrating Biometric Mesh...</p>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex gap-4 items-start">
        <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed font-sans">
          <span className="text-accent font-bold uppercase tracking-widest block mb-1">Analyst Protocol:</span>
          Visual intelligence is derived from cross-referencing public archival images, social metadata, and leaked biometrics. Confidence scores are probabilistic. Cross-verify with technical signatures for definitive attribution.
        </div>
      </div>
    </div>
  );
}

function getConfidenceColor(conf: number) {
  if (conf > 0.9) return "from-accent to-blue-500";
  if (conf > 0.7) return "from-warning to-orange-500";
  return "from-slate-500 to-slate-700";
}

function getConfidenceBg(conf: number) {
  if (conf > 0.9) return "bg-accent";
  if (conf > 0.7) return "bg-warning";
  return "bg-slate-500";
}
