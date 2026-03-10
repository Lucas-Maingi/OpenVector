"use client";

import React, { useMemo, useState } from 'react';
import { Shield, Zap, AtSign, Mail, Globe, Database, User, X, Link as LinkIcon } from 'lucide-react';

interface Node {
    id: string;
    label: string;
    type: string;
    x: number;
    y: number;
    data?: any;
}

interface Edge {
    source: string;
    target: string;
}

export function InvestigationGraph({ entities, evidence, title }: { entities: any[], evidence: any[], title: string }) {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    // Basic force-simulation or simple layout for nodes
    const graphData = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        // Central Node (The Investigation)
        const centralNodeId = "center";
        nodes.push({ id: centralNodeId, label: title, type: 'center', x: 400, y: 300, data: { title, description: "Core target of the investigation." } });

        // Primary Entities (from Target Vector)
        entities.forEach((entity, index) => {
            const angle = (index / (entities.length || 1)) * Math.PI * 2;
            const radius = 150;
            const x = 400 + Math.cos(angle) * radius;
            const y = 300 + Math.sin(angle) * radius;

            nodes.push({ id: entity.id, label: entity.value || 'Unknown', type: entity.type, x, y, data: entity });
            edges.push({ source: centralNodeId, target: entity.id });
        });

        // Evidence Nodes (Link them to entities or center)
        evidence.slice(0, 15).forEach((ev, index) => {
            const angle = (index / 15) * Math.PI * 2;
            const radius = 250;
            const x = 400 + Math.cos(angle) * radius;
            const y = 300 + Math.sin(angle) * radius;

            nodes.push({ id: ev.id, label: ev.title || 'Unknown Evidence', type: 'evidence', x, y, data: ev });

            // Link to the parent evidence that discovered this, matching entity, or the center
            const parentEvidenceId = ev.provenanceSourceId;
            const matchedEntity = entities?.find(e =>
                (ev.title && ev.title?.includes(e.value || "")) ||
                (ev.content && ev.content?.includes(e.value || ""))
            );

            if (parentEvidenceId) {
                edges.push({ source: parentEvidenceId, target: ev.id });
            } else {
                edges.push({ source: matchedEntity ? matchedEntity.id : centralNodeId, target: ev.id });
            }
        });

        return { nodes, edges };
    }, [entities, evidence, title]);

    const selectedNode = graphData.nodes.find(n => n.id === selectedNodeId);

    return (
        <div className="relative w-full aspect-video bg-background/40 border border-white/5 rounded-2xl overflow-hidden shadow-inner flex">
            {/* SVG Graph Layer */}
            <div className="flex-1 relative h-full">
                <svg viewBox="0 0 800 600" className="w-full h-full cursor-grab active:cursor-grabbing">
                    {/* Connections */}
                    {graphData.edges.map((edge, i) => {
                        const source = graphData.nodes.find(n => n.id === edge.source);
                        const target = graphData.nodes.find(n => n.id === edge.target);
                        if (!source || !target) return null;
                        const isHighlighted = selectedNodeId === source.id || selectedNodeId === target.id;
                        return (
                            <line
                                key={`edge-${i}`}
                                x1={source.x}
                                y1={source.y}
                                x2={target.x}
                                y2={target.y}
                                stroke={isHighlighted ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 240, 255, 0.15)"}
                                strokeWidth={isHighlighted ? "2" : "1"}
                                strokeDasharray={isHighlighted ? "4 4" : "2 6"}
                            >
                                {isHighlighted && <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />}
                            </line>
                        );
                    })}

                    {/* Nodes */}
                    {graphData.nodes.map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                            <g
                                key={node.id}
                                transform={`translate(${node.x}, ${node.y})`}
                                onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                                className="cursor-pointer"
                            >
                                {/* Selection Halo */}
                                {isSelected && (
                                    <circle r={node.type === 'center' ? 38 : 28} className="fill-accent/20 animate-pulse" />
                                )}
                                <circle
                                    r={node.type === 'center' ? 30 : 20}
                                    className={`${node.type === 'center' ? 'fill-accent/20 stroke-accent' :
                                        node.type === 'evidence' ? 'fill-success/10 stroke-success/40' :
                                            'fill-accent-blue/10 stroke-accent-blue/40'
                                        } hover:fill-opacity-50 transition-all`}
                                    strokeWidth={isSelected ? "3" : "2"}
                                />
                                <text
                                    y="4"
                                    className="text-[12px] font-mono fill-white opacity-80 select-none pointer-events-none"
                                    textAnchor="middle"
                                >
                                    {node.type === 'center' ? '🛡️' : node.type === 'evidence' ? '🌐' : '👤'}
                                </text>
                                <text
                                    y="35"
                                    className={`text-[10px] font-mono select-none pointer-events-none transition-colors ${isSelected ? 'fill-white font-bold' : 'fill-text-tertiary'}`}
                                    textAnchor="middle"
                                >
                                    {(node.label || 'Unknown').length > 20 ? (node.label || 'Unknown').substring(0, 17) + '...' : (node.label || 'Unknown')}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex gap-4 bg-surface/80 backdrop-blur-sm border border-white/5 p-3 rounded-xl text-[10px] font-mono z-10">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent" /> Target</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-blue" /> Identities</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success" /> Evidence</div>
                </div>
            </div>

            {/* Sliding Side Panel for Node Details */}
            <div className={`absolute top-0 right-0 h-full w-80 bg-surface/90 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out z-20 flex flex-col ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
                {selectedNode && (
                    <>
                        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-2 text-sm font-bold text-white">
                                {selectedNode.type === 'center' && <Shield className="w-4 h-4 text-accent" />}
                                {selectedNode.type === 'evidence' && <Globe className="w-4 h-4 text-success" />}
                                {selectedNode.type !== 'center' && selectedNode.type !== 'evidence' && <User className="w-4 h-4 text-accent-blue" />}
                                <span className="truncate">{selectedNode.label}</span>
                            </div>
                            <button onClick={() => setSelectedNodeId(null)} className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                            <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">
                                Type: {selectedNode.type}
                            </div>

                            {selectedNode.type === 'evidence' ? (
                                <div className="space-y-4">
                                    {selectedNode.data?.tags && (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedNode.data.tags.split(',').map((tag: string, i: number) => (
                                                <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/70 font-mono">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Raw Intelligence</h4>
                                        <div className="text-[11px] text-text-secondary whitespace-pre-wrap bg-black/50 p-3 rounded-lg border border-white/5 font-mono">
                                            {selectedNode.data?.content || "No intel content available."}
                                        </div>
                                    </div>

                                    {selectedNode.data?.sourceUrl && (
                                        <a href={selectedNode.data.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-accent hover:text-accent-hover transition-colors mt-4 bg-accent/10 border border-accent/20 px-3 py-2 rounded-lg justify-center font-semibold">
                                            <LinkIcon className="w-3.5 h-3.5" /> Open Direct Source
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-sm text-text-secondary">
                                        {selectedNode.data?.description || `Entity vector discovered during OSINT automated profiling. Related evidence points directly to this node.`}
                                    </div>
                                    {selectedNode.data?.metadata && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Metadata</h4>
                                            <pre className="text-[10px] text-text-secondary whitespace-pre-wrap bg-black/50 p-3 rounded-lg border border-white/5 font-mono">
                                                {JSON.stringify(selectedNode.data.metadata, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
