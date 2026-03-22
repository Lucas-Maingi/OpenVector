/**
 * Aletheia Intelligence Registry v3.0
 * Centralized management for 100+ OSINT sources and capability layers.
 */

export enum CapabilityLayer {
  IDENTITY = 'IDENTITY',
  INFRA = 'INFRA',
  PHONE = 'PHONE',
  GEO = 'GEO',
  BUSINESS = 'BUSINESS',
  SOCIAL = 'SOCIAL',
  IMAGE = 'IMAGE',
  THREAT = 'THREAT',
  SEARCH = 'SEARCH',
  GRAPH = 'GRAPH'
}

export type SourceTier = 'LITE' | 'PRO' | 'LIFETIME' | 'ENTERPRISE';

export interface IntelligenceSource {
  id: string;
  name: string;
  layer: CapabilityLayer;
  tier: SourceTier;
  confidenceWeight: number; // 0.0 to 1.0
  description: string;
}

export const SOURCE_REGISTRY: IntelligenceSource[] = [
  // CATEGORY 1: IDENTITY / BREACH
  { id: 'hibp', name: 'HaveIBeenPwned', layer: CapabilityLayer.IDENTITY, tier: 'LITE', confidenceWeight: 0.95, description: 'Gold-standard breach verification.' },
  { id: 'dehashed', name: 'DeHashed', layer: CapabilityLayer.IDENTITY, tier: 'PRO', confidenceWeight: 0.90, description: 'Deep-web credential auditing.' },
  { id: 'hudsonrock', name: 'HudsonRock', layer: CapabilityLayer.IDENTITY, tier: 'ENTERPRISE', confidenceWeight: 0.98, description: 'Infra-level breach intelligence.' },
  
  // CATEGORY 2: INFRASTRUCTURE
  { id: 'shodan', name: 'Shodan', layer: CapabilityLayer.INFRA, tier: 'PRO', confidenceWeight: 0.92, description: 'Internet-of-Things search engine.' },
  { id: 'sectrails', name: 'SecurityTrails', layer: CapabilityLayer.INFRA, tier: 'PRO', confidenceWeight: 0.88, description: 'Historical DNS and IP intelligence.' },
  { id: 'urlscan', name: 'URLScan', layer: CapabilityLayer.INFRA, tier: 'LITE', confidenceWeight: 0.85, description: 'Website analysis and safety auditing.' },

  // CATEGORY 4: GEO / LOCATION
  { id: 'ipinfo', name: 'IPinfo', layer: CapabilityLayer.GEO, tier: 'LITE', confidenceWeight: 0.90, description: 'High-precision IP geolocation.' },
  { id: 'geo_lite', name: 'MaxMind GeoLite', layer: CapabilityLayer.GEO, tier: 'LITE', confidenceWeight: 0.75, description: 'Standard IP-to-Country mapping.' },

  // CATEGORY 7: IMAGE / VISION
  { id: 'google_vision', name: 'Google Vision', layer: CapabilityLayer.IMAGE, tier: 'PRO', confidenceWeight: 0.95, description: 'Automated OCR and landmark recognition.' },
  { id: 'facial_ai', name: 'FaceSync AI', layer: CapabilityLayer.IMAGE, tier: 'PRO', confidenceWeight: 0.85, description: 'Biometric cross-referencing engine.' },

  // CATEGORY 10: RELATIONSHIP / ENRICHMENT
  { id: 'openai', name: 'OpenAI (Reasoning)', layer: CapabilityLayer.GRAPH, tier: 'LITE', confidenceWeight: 0.70, description: 'AI-driven entity correlation.' },
  { id: 'wikidata', name: 'Wikidata Graph', layer: CapabilityLayer.GRAPH, tier: 'LITE', confidenceWeight: 0.80, description: 'Public entity relationship mapping.' }
];

/**
 * Calculates a normalized confidence score (0-100) for a piece of evidence.
 * @param sourceId The ID of the source that found the data
 * @param crossConfirmed Whether the data was found by multiple independent sources
 * @param baseScore Optional manual score from the connector (0.0 to 1.0)
 */
export function calculateConfidence(sourceId: string, crossConfirmed: boolean = false, baseScore?: number): number {
  const source = SOURCE_REGISTRY.find(s => s.id === sourceId);
  const weight = source?.confidenceWeight || 0.5;
  const rawScore = baseScore ?? weight;
  
  // Boost score if cross-confirmed
  const finalScore = crossConfirmed 
    ? Math.min(1.0, rawScore + 0.15) 
    : rawScore;

  return Math.round(finalScore * 100);
}

/**
 * Returns the human-readable label for a confidence score.
 */
export function getConfidenceLabel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'VERIFIED' {
  if (score >= 90) return 'VERIFIED';
  if (score >= 70) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}
