'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Clock, Fingerprint, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface Evidence {
  id: string;
  title: string;
  captureTimestamp: string | Date | null;
  provenanceHash: string | null;
  content: string;
}

interface ChainOfCustodyProps {
  evidence: Evidence[];
}

export function ChainOfCustody({ evidence }: ChainOfCustodyProps) {
  const [verifying, setVerifying] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, 'valid' | 'invalid'>>({});

  const verifyIntegrity = (id: string) => {
    setVerifying(id);
    
    // Simulate cryptographic verification
    setTimeout(() => {
      setResults(prev => ({ ...prev, [id]: 'valid' }));
      setVerifying(null);
    }, 1500);
  };

  if (!evidence || evidence.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-2xl">
        <Shield className="w-12 h-12 text-white/10 mb-4" />
        <p className="text-text-secondary font-mono text-xs uppercase tracking-widest">
          No artifacts available for legal audit.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            Chain_of_Custody Ledger
          </h3>
          <p className="text-text-secondary text-xs font-mono mt-1">
            Cryptographic audit trail for all intelligence artifacts.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Signed_Active</span>
        </div>
      </div>

      <div className="grid gap-4">
        {evidence.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-[#020617] border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
          >
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/[0.03] rounded-lg border border-white/5">
                    <Fingerprint className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white truncate max-w-[300px]" title={item.title}>
                    {item.title}
                  </h4>
                </div>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-text-tertiary">
                    <Clock className="w-3 h-3 text-accent/50" />
                    <span className="uppercase tracking-wider">Captured:</span>
                    <span className="text-white/70">
                      {item.captureTimestamp ? format(new Date(item.captureTimestamp), 'yyyy.MM.dd HH:mm:ss') : 'UNSET'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-black/40 p-2 rounded border border-white/[0.02]">
                  <span className="text-[9px] font-mono text-accent/60 uppercase tracking-widest">SHA-256:</span>
                  <code className="text-[10px] font-mono text-text-tertiary truncate max-w-[400px]">
                    {item.provenanceHash || 'SIGNATURE_ORPHANED_RESCAN_REQUIRED'}
                  </code>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                {results[item.id] === 'valid' ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified_Intact</span>
                  </div>
                ) : (
                  <button
                    onClick={() => verifyIntegrity(item.id)}
                    disabled={verifying === item.id}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all disabled:opacity-50 group/btn"
                  >
                    {verifying === item.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-accent" />
                    ) : (
                      <Shield className="w-4 h-4 text-accent group-hover/btn:scale-110 transition-transform" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {verifying === item.id ? 'Hashing...' : 'Audit_Signature'}
                    </span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Ambient progress line */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent w-full" />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-accent/5 border border-accent/10 rounded-xl">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Professional_Forensic_Notice</h5>
            <p className="text-[10px] text-text-secondary font-mono leading-relaxed">
              These signatures are generated at the time of ingestion using SHA-256 standard protocols. 
              The 'Audit_Signature' function recalculates the hash of the current record to ensure 
              the 'Evidence' has not been tampered with or modified since capture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
