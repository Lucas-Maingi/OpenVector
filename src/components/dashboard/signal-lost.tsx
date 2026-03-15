"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ServerCrash, RotateCcw, Activity } from "lucide-react";

const SHARDS = [
  { clip: 'polygon(0% 0%, 35% 10%, 25% 45%, 0% 30%)', x: -150, y: -100, z: 200, rx: 45, ry: 45, rz: -30 },
  { clip: 'polygon(35% 10%, 70% 0%, 55% 40%, 25% 45%)', x: 0, y: -150, z: 150, rx: -30, ry: 60, rz: 15 },
  { clip: 'polygon(70% 0%, 100% 0%, 100% 30%, 80% 50%, 55% 40%)', x: 150, y: -100, z: 250, rx: 60, ry: -45, rz: 45 },
  { clip: 'polygon(0% 30%, 25% 45%, 30% 70%, 0% 80%)', x: -180, y: 50, z: 100, rx: 20, ry: 80, rz: -60 },
  { clip: 'polygon(25% 45%, 55% 40%, 65% 65%, 30% 70%)', x: -20, y: -10, z: 300, rx: -80, ry: -20, rz: 90 },
  { clip: 'polygon(55% 40%, 80% 50%, 90% 80%, 65% 65%)', x: 100, y: 50, z: 180, rx: 45, ry: 45, rz: 20 },
  { clip: 'polygon(80% 50%, 100% 30%, 100% 80%, 90% 80%)', x: 200, y: 20, z: 120, rx: -40, ry: 30, rz: -45 },
  { clip: 'polygon(0% 80%, 30% 70%, 45% 100%, 0% 100%)', x: -120, y: 150, z: 160, rx: 60, ry: -60, rz: -20 },
  { clip: 'polygon(30% 70%, 65% 65%, 70% 100%, 45% 100%)', x: 10, y: 180, z: 220, rx: -45, ry: 20, rz: 40 },
  { clip: 'polygon(65% 65%, 90% 80%, 100% 80%, 100% 100%, 70% 100%)', x: 160, y: 160, z: 140, rx: 30, ry: -30, rz: 60 },
];

export function SignalLostError({ onRetry }: { onRetry: () => void }) {
  const [shattered, setShattered] = useState(false);
  const [attempting, setAttempting] = useState(false);
  const [text, setText] = useState("");

  const fullText = "Node Synchronization Interrupted. Attempting Recovery..";

  useEffect(() => {
    // Trigger shatter shortly after mount for dramatic effect
    const timer = setTimeout(() => {
      setShattered(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shattered && !attempting) {
      let i = 0;
      setText("");
      const interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else if (!shattered && attempting) {
      setText("Connection Re-established. Resuming telemetry...");
    }
  }, [shattered, attempting]);

  const handleRetry = () => {
    setAttempting(true);
    // Simulate recovery process
    setTimeout(() => {
      setShattered(false); // Reassemble shards and node
      setTimeout(() => {
        onRetry(); // Close overlay after reassembly is complete
      }, 1500);
    }, 2500);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl h-full w-full overflow-hidden bg-[#0a0a0a]">
      <div className="relative w-48 h-48 perspective-[1200px] mb-12 transform-gpu">
        
        {/* Central Core */}
        <motion.div
          animate={
            shattered 
              ? { translateZ: -200, rotateX: 50, rotateY: -15, opacity: 0.3 } 
              : { translateZ: 0, rotateX: 0, rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 1.2, ease: "backOut" }}
          className={`absolute inset-0 flex items-center justify-center rounded-2xl border-2 transition-colors duration-700 ${shattered ? 'border-rose-500/30 bg-rose-500/10 shadow-none' : 'border-lime-500 bg-lime-500/20 shadow-[0_0_40px_rgba(163,230,53,0.4)]'}`}
        >
          {shattered ? <ServerCrash className="w-16 h-16 text-rose-500/50" /> : <Activity className="w-16 h-16 text-lime-400" />}
        </motion.div>

        {/* Shards Container - Pre-cut glass pane over the core */}
        <div className="absolute inset-0 z-10 pointer-events-none transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
          {SHARDS.map((shard, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20"
              style={{ clipPath: shard.clip }}
              initial={false}
              animate={
                shattered
                  ? { x: shard.x, y: shard.y, z: shard.z, rotateX: shard.rx, rotateY: shard.ry, rotateZ: shard.rz, opacity: 0 }
                  : { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }
              }
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      {/* Copy & Button */}
      <div className="flex flex-col items-center z-20 space-y-8">
        <motion.div
          animate={{ opacity: shattered || attempting ? 1 : 0, y: shattered || attempting ? 0 : 20 }}
          className="text-center h-16"
        >
          <h3 className="text-2xl font-bold font-mono text-white tracking-widest uppercase mb-3 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">
            Signal Lost
          </h3>
          <p className="text-rose-400 font-mono text-sm max-w-md mx-auto h-6">
            {text}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
          </p>
        </motion.div>

        <motion.button
          onClick={handleRetry}
          disabled={attempting || !shattered}
          className="relative px-8 py-3 rounded-lg bg-purple-500/10 border border-purple-500/50 text-purple-300 font-mono text-sm uppercase tracking-widest overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          animate={{
            boxShadow: attempting
              ? ["0 0 15px rgba(168,85,247,0.4)", "0 0 35px rgba(168,85,247,0.8)", "0 0 15px rgba(168,85,247,0.4)"]
              : ["0 0 10px rgba(168,85,247,0.2)", "0 0 20px rgba(168,85,247,0.4)", "0 0 10px rgba(168,85,247,0.2)"]
          }}
          transition={{ repeat: Infinity, duration: attempting ? 1 : 2, ease: "easeInOut" }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <RotateCcw className={`w-4 h-4 ${attempting ? 'animate-spin' : ''}`} />
            {attempting ? "Reconnecting..." : "Retry Connection"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>
      </div>
    </div>
  );
}
