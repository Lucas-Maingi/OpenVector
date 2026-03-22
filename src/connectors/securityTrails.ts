import { ConnectorResult, SearchResult } from './types';

/**
 * SecurityTrails Connector — historical DNS and subdomain enumeration.
 * Requires API key in env. If missing, this connector will return empty.
 */
export async function securityTrails(domain: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    const apiKey = process.env.SECURITYTRAILS_API_KEY;
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase().trim();

    if (!apiKey) {
        return { connectorType: 'security_trails', query: cleanDomain, results, generatedAt: new Date().toISOString() };
    }

    // 1. Subdomain Search
    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`https://api.securitytrails.com/v1/domain/${cleanDomain}/subdomains`, {
            headers: { 'APIKEY': apiKey },
            signal: controller.signal
        });

        if (res.ok) {
            const data = await res.json();
            if (data.subdomains && data.subdomains.length > 0) {
                results.push({
                    title: `Infrastructure History — ${cleanDomain}`,
                    url: `https://securitytrails.com/domain/${cleanDomain}/dns`,
                    description: `Detected ${data.subdomains.length} subdomains via SecurityTrails infrastructure index. Subdomain count indicates high footprint complexity.`,
                    category: 'infrastructure',
                    platform: 'SecurityTrails',
                    metadata: { subdomains_count: data.subdomains.length },
                    confidenceScore: 0.95,
                    confidenceLabel: 'HIGH'
                });
            }
        }
    } catch { /* skip */ }

    // 2. DNS History Summary
    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`https://api.securitytrails.com/v1/history/${cleanDomain}/dns/a`, {
            headers: { 'APIKEY': apiKey },
            signal: controller.signal
        });

        if (res.ok) {
            const data = await res.json();
            if (data.records && data.records.length > 0) {
                results.push({
                    title: `DNS Evolution — ${cleanDomain}`,
                    url: `https://securitytrails.com/domain/${cleanDomain}/history/a`,
                    description: `Found ${data.records.length} historical A-record modifications. High fidelity evidence of hosting infrastructure evolution.`,
                    category: 'dns',
                    platform: 'SecurityTrails',
                    metadata: { record_history: data.records.length },
                    confidenceScore: 0.92,
                    confidenceLabel: 'HIGH'
                });
            }
        }
    } catch { /* skip */ }

    return {
        connectorType: 'security_trails',
        query: cleanDomain,
        results,
        generatedAt: new Date().toISOString(),
    };
}
