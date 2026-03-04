"use client";

import React, { useMemo } from 'react';
import { Shield, Zap, AtSign, Mail, Globe, Database, User } from 'lucide-react';

interface Node {
    id: string;
    label: string;
    type: string;
    x: number;
    y: number;
}

interface Edge {
    source: string;
    target: string;
}

export function InvestigationGraph({ entities, evidence, title }: { entities: any[], evidence: any[], title: string }) {
    // Basic force-simulation or simple layout for nodes
    const graphData = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        // Central Node (The Investigation)
        const centralNodeId = "center";
        nodes.push({ id: centralNodeId, label: title, type: 'center', x: 400, y: 300 });

        // Primary Entities (from Target Vector)
        entities.forEach((entity, index) => {
            const angle = (index / (entities.length || 1)) * Math.PI * 2;
            const radius = 150;
            const x = 400 + Math.cos(angle) * radius;
            const y = 300 + Math.sin(angle) * radius;

            nodes.push({ id: entity.id, label: entity.value, type: entity.type, x, y });
            edges.push({ source: centralNodeId, target: entity.id });
        });

        // Evidence Nodes (Link them to entities or center)
        evidence.slice(0, 15).forEach((ev, index) => {
            const angle = (index / 15) * Math.PI * 2;
            const radius = 250;
            const x = 400 + Math.cos(angle) * radius;
            const y = 300 + Math.sin(angle) * radius;

            nodes.push({ id: ev.id, label: ev.title, type: 'evidence', x, y });

            // Link to a matching entity or the center
            const matchedEntity = entities.find(e => ev.title.includes(e.value) || ev.content.includes(e.value));
            edges.push({ source: matchedEntity ? matchedEntity.id : centralNodeId, target: ev.id });
        });

        return { nodes, edges };
    }, [entities, evidence, title]);

    return (
        <div className="relative w-full aspect-video bg-background/40 border border-white/5 rounded-2xl overflow-hidden shadow-inner">
            <svg viewBox="0 0 800 600" className="w-full h-full">
                {/* Connections */}
                {graphData.edges.map((edge, i) => {
                    const source = graphData.nodes.find(n => n.id === edge.source);
                    const target = graphData.nodes.find(n => n.id === edge.target);
                    if (!source || !target) return null;
                    return (
                        <line
                            key={`edge-${i}`}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="rgba(0, 240, 255, 0.15)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        >
                            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
                        </line>
                    );
                })}

                {/* Nodes */}
                {graphData.nodes.map((node) => (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <circle
                            r={node.type === 'center' ? 30 : 20}
                            className={`${node.type === 'center' ? 'fill-accent/20 stroke-accent' :
                                node.type === 'evidence' ? 'fill-success/10 stroke-success/40' :
                                    'fill-accent-blue/10 stroke-accent-blue/40'
                                }`}
                            strokeWidth="2"
                        />
                        <foreignObject x="-10" y="-10" width="20" height="20" className="pointer-events-none">
                            <div className="flex items-center justify-center text-text-primary">
                                {node.type === 'center' && <Shield className="w-4 h-4 text-accent" />}
                                {node.type === 'evidence' && <Globe className="w-3 h-3 text-success" />}
                                {node.type === 'social_node' && <AtSign className="w-3 h-3 text-accent-blue" />}
                                {node.type === 'developer' && <Zap className="w-3 h-3 text-accent-blue" />}
                                {node.type !== 'center' && node.type !== 'evidence' && node.type !== 'social_node' && node.type !== 'developer' && <Database className="w-3 h-3 text-text-tertiary" />}
                            </div>
                        </foreignObject>
                        <text
                            y="35"
                            className="text-[10px] font-mono fill-text-tertiary select-none"
                            textAnchor="middle"
                        >
                            {node.label.length > 20 ? node.label.substring(0, 17) + '...' : node.label}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4 bg-surface/80 backdrop-blur-sm border border-white/5 p-3 rounded-xl text-[10px] font-mono">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent" /> Target</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent-blue" /> Identities</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success" /> Evidence</div>
            </div>
        </div>
    );
}
