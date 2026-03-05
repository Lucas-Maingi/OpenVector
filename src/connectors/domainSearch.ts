import { promises as dns } from 'dns';
import { ConnectorResult, SearchResult } from './types';

export async function domainSearch(domain: string): Promise<ConnectorResult> {
    const clean = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];

    const results: SearchResult[] = [];

    // Base Search URL Results (Existing functionality)
    results.push(
        {
            title: `WHOIS Lookup — ${clean}`,
            url: `https://whois.domaintools.com/${clean}`,
            description: 'Full WHOIS registration data, registrar, creation date, name servers',
            category: 'domain',
            platform: 'DomainTools',
        },
        {
            title: `SecurityTrails — ${clean}`,
            url: `https://securitytrails.com/domain/${clean}/dns`,
            description: 'Historical DNS data, subdomains, IP history',
            category: 'dns',
            platform: 'SecurityTrails',
        },
        {
            title: `Shodan — ${clean}`,
            url: `https://www.shodan.io/search?query=hostname%3A${clean}`,
            description: 'Internet-connected devices and services associated with this domain',
            category: 'infrastructure',
            platform: 'Shodan',
        }
    );

    // 1. Native DNS Resolution (A Records)
    try {
        const aRecords = await dns.resolve4(clean);
        results.push({
            title: `A Records (IPv4)`,
            url: `https://bgp.he.net/ip/${aRecords[0]}`,
            description: `Resolved IPs: ${aRecords.join(', ')}`,
            category: 'dns',
            platform: 'Native DNS',
            isVerified: true
        });
    } catch (error) {
        // No A records or error
    }

    // 2. Native Mail Servers (MX Records)
    try {
        const mxRecords = await dns.resolveMx(clean);
        // Sort by priority
        mxRecords.sort((a, b) => a.priority - b.priority);
        const mxStrings = mxRecords.map(mx => `${mx.exchange} (Priority: ${mx.priority})`).join(', ');
        results.push({
            title: `Mail Exchangers (MX)`,
            url: `https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${clean}`,
            description: `Mail Servers: ${mxStrings || 'None found'}`,
            category: 'email',
            platform: 'Native DNS',
            isVerified: true
        });
    } catch (error) {
        // No MX returning empty or caught
    }

    // 3. Native TXT Records (SPF/DMARC/Verification)
    try {
        const txtRecordsList = await dns.resolveTxt(clean);
        const txtRecords = txtRecordsList.map(t => t.join('')).filter(t => t.includes('v=spf') || t.includes('google-site-verification'));

        if (txtRecords.length > 0) {
            results.push({
                title: `TXT Records (SPF & Verification)`,
                url: `https://mxtoolbox.com/SuperTool.aspx?action=txt%3a${clean}`,
                description: `Important TXT: ${txtRecords.join(' | ')}`,
                category: 'dns',
                platform: 'Native DNS',
                isVerified: true
            });
        }
    } catch (error) {
        // Ignored
    }

    // 4. Free API: crt.sh (Certificate Transparency) for subdomains
    try {
        // Use a short timeout to prevent hang
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const response = await fetch(`https://crt.sh/?q=${clean}&output=json`, {
            signal: controller.signal,
            headers: { 'User-Agent': 'OpenVector OSINT/1.0' }
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const certs = await response.json();
            // Extract unique subdomains
            const subdomains = new Set<string>();
            certs.slice(0, 100).forEach((c: any) => {
                if (c.name_value) {
                    c.name_value.split('\n').forEach((nv: string) => {
                        if (nv.toLowerCase() !== clean.toLowerCase() && !nv.includes('*')) {
                            subdomains.add(nv);
                        }
                    });
                }
            });

            const uniqueSubs = Array.from(subdomains).slice(0, 5); // Take top 5 for summary

            if (uniqueSubs.length > 0) {
                results.push({
                    title: `Discovered Subdomains (crt.sh)`,
                    url: `https://crt.sh/?q=${clean}`,
                    description: `Active subdomains via SSL certs: ${uniqueSubs.join(', ')}... (and ${Math.max(0, subdomains.size - 5)} more)`,
                    category: 'infrastructure',
                    platform: 'crt.sh (CT Logs)',
                    isVerified: true
                });
            }
        }
    } catch (error) {
        console.error('crt.sh fetch error for', clean, error);
    }

    return {
        connectorType: 'domain_search',
        query: clean,
        results,
        generatedAt: new Date().toISOString(),
    };
}
