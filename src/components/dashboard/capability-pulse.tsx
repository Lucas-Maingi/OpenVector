"use client";

import { motion } from 'framer-motion';
import { 
  Shield, Zap, Globe, Fingerprint, Database, 
  Cpu, Lock, Activity, Search, Share2 
} from 'lucide-react';
import { CapabilityLayer } from '@/lib/osint/registry';

interface CapabilityNodeProps {
  layer: CapabilityLayer;
  status: 'active' | 'idle' | 'complete' | 'error';
  label: string;
}

const LAYER_ICONS: Record<CapabilityLayer, any> = {
  [CapabilityLayer.IDENTITY]: Fingerprint,
  [CapabilityLayer.INFRA]: Shield,
  [CapabilityLayer.PHONE]: Zap,
  [CapabilityLayer.GEO]: Globe,
  [CapabilityLayer.BUSINESS]: Database,
  [CapabilityLayer.SOCIAL]: Share2,
  [CapabilityLayer.IMAGE]: Cpu,
  [CapabilityLayer.THREAT]: Lock,
  [CapabilityLayer.SEARCH]: Search,
  [CapabilityLayer.GRAPH]: Activity,
};

export function CapabilityPulse({ activeLayers = [] }: { activeLayers?: CapabilityLayer[] }) {
  const allLayers = Object.values(CapabilityLayer);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {allLayers.map((layer) => {
        const Icon = LAYER_ICONS[layer];
        const isActive = activeLayers.includes(layer);
        
        return (
          <motion.div
            key={layer}
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: isActive ? 1 : 0.4,
              scale: isActive ? 1.05 : 1
            }}
            className={`p-3 rounded-xl border transition-all duration-500 flex items-center gap-3 ${
              isActive 
                ? 'bg-accent/10 border-accent shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                : 'bg-surface/20 border-border/10'
            }`}
          >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-accent/20 text-accent' : 'bg-foreground/5 text-text-tertiary'}`}>
              <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-text-primary' : 'text-text-tertiary'}`}>
                {layer}
              </span>
              <span className={`text-[8px] font-bold uppercase tracking-tighter ${isActive ? 'text-success' : 'text-text-tertiary/40'}`}>
                {isActive ? 'Active Node' : 'Standby'}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
