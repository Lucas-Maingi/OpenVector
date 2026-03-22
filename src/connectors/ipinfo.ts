import { ConnectorResult, SearchResult } from './types';

/**
 * IPinfo Connector — precise geolocation and ASN intelligence.
 * Uses public endpoint by default, or API key if available in env.
 */
export async function ipinfo(ip: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    const token = process.env.IPINFO_TOKEN;
    const url = token ? `https://ipinfo.io/${ip}?token=${token}` : `https://ipinfo.io/${ip}/json`;

    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(url, { signal: controller.signal });
        
        if (res.ok) {
            const data = await res.json();
            if (data.ip) {
                results.push({
                    title: `IP Intelligence — ${data.ip}`,
                    url: `https://ipinfo.io/${data.ip}`,
                    description: [
                        data.city && data.region ? `Location: ${data.city}, ${data.region}, ${data.country}` : null,
                        data.org ? `ISP/Org: ${data.org}` : null,
                        data.timezone ? `Timezone: ${data.timezone}` : null,
                        data.loc ? `Coordinates: ${data.loc}` : null
                    ].filter(Boolean).join(' · '),
                    category: 'geolocation',
                    platform: 'IPinfo',
                    metadata: data,
                    confidenceScore: 0.90,
                    confidenceLabel: 'HIGH'
                });
            }
        }
    } catch { /* skip */ }

    return {
        connectorType: 'ipinfo',
        query: ip,
        results,
        generatedAt: new Date().toISOString(),
    };
}
