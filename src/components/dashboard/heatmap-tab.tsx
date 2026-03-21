"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, Activity, Shield, Info } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Location {
    city: string;
    country: string;
    lat: number;
    lng: number;
    source: string;
}

export function HeatmapTab({ reportContent }: { reportContent: string }) {
    const locations = useMemo(() => {
        try {
            const match = reportContent.match(/\[SIGINT_GEO: (\{.*\})\]/);
            if (match && match[1]) {
                const data = JSON.parse(match[1]);
                return (data.locations || []) as Location[];
            }
        } catch (e) {
            console.warn("[SIGINT] Failed to parse geo-metadata:", e);
        }
        return [] as Location[];
    }, [reportContent]);

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    // Coordinate to SVG % Mapping (Mercator-ish approximation for visual pulses)
    const getPos = (lat: number, lng: number) => {
        const x = ((lng + 180) * (100 / 360));
        const y = ((90 - lat) * (100 / 180));
        return { x, y };
    };

    if (locations.length === 0) {
        return (
            <div className="h-[500px] w-full bg-slate-950/20 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-12 space-y-4">
                <div className="opacity-20 animate-pulse"><Globe className="w-12 h-12" /></div>
                <div className="space-y-1">
                    <h3 className="text-xs font-mono font-black uppercase tracking-[0.2em] text-white/40">SIGINT_SILENCE</h3>
                    <p className="text-[11px] font-mono text-white/20 max-w-sm">No geographic metadata isolated from the current intelligence cluster. The target may be utilizing high-level obfuscation or proxy routing.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Map Container */}
            <div className="lg:col-span-3 h-[500px] bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03),transparent)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
                
                {/* Simplified World Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
                    <Globe className="w-[800px] h-[800px] text-white" strokeWidth={0.5} />
                </div>

                {/* Status HUD Overlay */}
                <div className="absolute top-6 left-6 z-20 space-y-1">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 backdrop-blur-md">
                        <Activity className="w-3 h-3 text-accent animate-pulse" />
                        <span className="text-[10px] font-mono font-black text-accent uppercase tracking-widest">Active_Geospatial_Pulse</span>
                    </div>
                    <p className="text-[9px] font-mono text-white/20 pl-1 uppercase tracking-tighter">SIGINT_INTERCEPT_NODES: {locations.length}</p>
                </div>

                {/* Coordinate Pulses */}
                {locations.map((loc, i) => {
                    const pos = getPos(loc.lat, loc.lng);
                    const isSelected = selectedLocation === loc;
                    return (
                        <div 
                            key={i} 
                            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/node"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                            onMouseEnter={() => setSelectedLocation(loc)}
                        >
                            <div className={`relative w-4 h-4 rounded-full transition-all duration-500 ${isSelected ? 'scale-150' : ''}`}>
                                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75" />
                                <div className="relative w-full h-full bg-accent rounded-full border-2 border-white/20 shadow-[0_0_15px_#00f0ff]" />
                            </div>
                            
                            {/* Desktop Tooltip */}
                            <div className="absolute bottom-full mb-3 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none z-50">
                                <div className="bg-slate-900/95 backdrop-blur-xl border border-accent/40 px-4 py-2.5 rounded-xl shadow-2xl min-w-[200px]">
                                    <div className="text-[10px] font-mono font-black text-accent mb-1 uppercase tracking-[0.2em]">{loc.city}, {loc.country}</div>
                                    <div className="text-[9px] text-white/40 font-mono tracking-tighter">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* CRT Screen Effect overlay */}
                <div className="absolute inset-0 scanline opacity-[0.03] pointer-events-none" />
                <div className="absolute inset-0 crt-overlay opacity-5 pointer-events-none" />
            </div>

            {/* Sidebar Signal Log */}
            <div className="lg:col-span-1 space-y-6">
                <div className="p-5 bg-slate-950/20 rounded-2xl border border-white/5 space-y-4">
                    <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        Signal_Intercepts
                    </h4>
                    
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {locations.map((loc, i) => (
                            <button 
                                key={i}
                                onClick={() => setSelectedLocation(loc)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group/btn ${
                                    selectedLocation === loc ? 'bg-accent/10 border-accent/40 translate-x-1' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline" className={`text-[8px] font-mono font-black h-4 px-1.5 ${
                                        selectedLocation === loc ? 'bg-accent text-accent-foreground border-transparent' : 'bg-white/5 text-white/40 border-white/10'
                                    }`}>
                                        {loc.source.toUpperCase() || 'NODE_SIG'}
                                    </Badge>
                                    <Shield className={`w-3 h-3 ${selectedLocation === loc ? 'text-accent animate-pulse' : 'text-white/10'}`} />
                                </div>
                                <div className={`text-xs font-mono font-black transition-colors ${selectedLocation === loc ? 'text-accent' : 'text-white/80'}`}>
                                    {loc.city}, {loc.country}
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-[9px] text-white/20 font-mono tracking-tighter">
                                    {loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                            <Info className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <p className="text-[9px] text-white/40 leading-relaxed italic font-mono">
                                Geospatial pulses are derived from metadata clustering and DNS resolution trails. Coordinates are estimated for visual tactical oversight.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
