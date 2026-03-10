import { ConnectorResult, SearchResult } from './types';

/**
 * Domain Search — fetches real data from free public APIs.
 * Sources: crt.sh (subdomains), RDAP/WHOIS (registration), Cloudflare DNS (records), URLScan.io
 * No API key required.
 */
export async function domainSearch(domain: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase().trim();

    // 1. Certificate Transparency — crt.sh (finds subdomains)
    try {
        const crtRes = await fetch(`https://crt.sh/?q=%.${cleanDomain}&output=json`, {
            next: { revalidate: 0 }
        });
        if (crtRes.ok) {
            const certs: any[] = await crtRes.json();
            // Deduplicate subdomains
            const subdomains = [...new Set(
                certs
                    .map(c => c.name_value as string)
                    .flatMap(n => n.split('\n'))
                    .filter(n => n && !n.includes('*') && n.endsWith(cleanDomain))
                    .slice(0, 20)
            )];

            if (subdomains.length > 0) {
                const firstSeen = certs.reduce((min, c) => c.not_before < min ? c.not_before : min, certs[0].not_before);
                results.push({
                    title: `SSL Certificates — ${cleanDomain}`,
                    url: `https://crt.sh/?q=%.${cleanDomain}`,
                    description: `Found ${certs.length} certificates. ${subdomains.length} unique subdomains: ${subdomains.slice(0, 8).join(', ')}${subdomains.length > 8 ? `... +${subdomains.length - 8} more` : ''}. Oldest cert: ${new Date(firstSeen).toDateString()}.`,
                    category: 'infrastructure',
                    platform: 'Certificate Transparency',
                    metadata: { subdomains },
                    confidenceScore: 0.95,
                    confidenceLabel: 'HIGH'
                });
            }
        }
    } catch { /* skip */ }

    // 2. RDAP — WHOIS replacement (registration info)
    try {
        const rdapRes = await fetch(`https://rdap.org/domain/${cleanDomain}`, {
            next: { revalidate: 0 }
        });
        if (rdapRes.ok) {
            const rdap = await rdapRes.json();
            const registrar = rdap.entities?.find((e: any) => e.roles?.includes('registrar'));
            const registrant = rdap.entities?.find((e: any) => e.roles?.includes('registrant'));

            const events: Record<string, string> = {};
            (rdap.events || []).forEach((ev: any) => {
                events[ev.eventAction] = ev.eventDate;
            });

            const nameservers = (rdap.nameservers || []).map((ns: any) => ns.ldhName).join(', ');

            results.push({
                title: `WHOIS / RDAP — ${cleanDomain}`,
                url: `https://rdap.org/domain/${cleanDomain}`,
                description: [
                    registrar?.vcardArray?.[1]?.find((a: any) => a[0] === 'fn')?.[3] ? `Registrar: ${registrar.vcardArray[1].find((a: any) => a[0] === 'fn')[3]}` : null,
                    events.registration ? `Registered: ${new Date(events.registration).toDateString()}` : null,
                    events.expiration ? `Expires: ${new Date(events.expiration).toDateString()}` : null,
                    events['last changed'] ? `Updated: ${new Date(events['last changed']).toDateString()}` : null,
                    nameservers ? `Nameservers: ${nameservers}` : null,
                    rdap.status?.length ? `Status: ${rdap.status.join(', ')}` : null,
                ].filter(Boolean).join(' · '),
                category: 'registry',
                platform: 'RDAP',
                metadata: { rdap },
                confidenceScore: 0.95,
                confidenceLabel: 'HIGH'
            });
        }
    } catch { /* skip */ }

    // 3. DNS Records via Cloudflare DNS-over-HTTPS
    const dnsTypes = [
        { type: 'A', label: 'A (IP)' },
        { type: 'MX', label: 'MX (Mail)' },
        { type: 'TXT', label: 'TXT (SPF/DKIM)' },
        { type: 'NS', label: 'NS (Nameservers)' },
        { type: 'AAAA', label: 'AAAA (IPv6)' },
    ];

    for (const { type, label } of dnsTypes) {
        try {
            const dnsRes = await fetch(
                `https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=${type}`,
                { headers: { Accept: 'application/dns-json' }, next: { revalidate: 0 } }
            );
            if (dnsRes.ok) {
                const dns = await dnsRes.json();
                const records: string[] = (dns.Answer || []).map((r: any) => r.data);
                if (records.length > 0) {
                    results.push({
                        title: `DNS ${label} — ${cleanDomain}`,
                        url: `https://dnschecker.org/#${type}/${cleanDomain}`,
                        description: `${records.length} record(s): ${records.join(', ')}`,
                        category: 'dns',
                        platform: 'Cloudflare DNS',
                        metadata: { records },
                        confidenceScore: 0.90,
                        confidenceLabel: 'HIGH'
                    });
                }
            }
        } catch { /* skip */ }
    }

    // 4. URLScan.io — Removed (requires API key for search endpoint in v1)

    // 5. HackerTarget — DNS Host Search & Headers
    try {
        const htRes = await fetch(`https://api.hackertarget.com/hostsearch/?q=${cleanDomain}`, {
            next: { revalidate: 0 }
        });
        if (htRes.ok) {
            const htText = await htRes.text();
            if (!htText.includes('error')) {
                const lines = htText.split(/\r?\n/).filter(l => l.trim().length > 0);
                const hosts = lines.map(line => line.split(',')[0]);
                const ips = [...new Set(lines.map(line => line.split(',')[1]))];
                if (lines.length > 0) {
                    results.push({
                        title: `HackerTarget DNS — ${cleanDomain}`,
                        url: `https://hackertarget.com/domain-profiling/`,
                        description: `Found ${lines.length} DNS host mappings across ${ips.length} unique IPs. Mapped IPs: ${ips.join(', ')}`,
                        category: 'dns',
                        platform: 'HackerTarget',
                        metadata: { hosts, ips },
                        confidenceScore: 0.85,
                        confidenceLabel: 'HIGH'
                    });
                }
            }
        }
    } catch { /* skip */ }

    // 6. Active Website Content Scraper (Fetch homepage meta tags)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch(`http://${cleanDomain}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            next: { revalidate: 0 },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
            const html = await res.text();

            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const rawTitle = titleMatch ? titleMatch[1].trim() : '';

            const descMatch = html.match(/<meta[^>]+(?:name|property)="[^"]*description"[^>]+content="([^"]+)"/i) ||
                html.match(/<meta[^>]+content="([^"]+)"[^>]+(?:name|property)="[^"]*description"/i);

            let desc = descMatch ? descMatch[1].trim() : 'No meta description found.';

            desc = desc.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
            const title = rawTitle.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

            if (title) {
                results.push({
                    title: `Website Content — ${cleanDomain}`,
                    url: `http://${cleanDomain}`,
                    description: `Live Homepage Scraped:\nTitle: ${title}\nDescription: ${desc}`,
                    category: 'content',
                    platform: 'Web Scraper',
                    confidenceScore: 0.75,
                    confidenceLabel: 'MEDIUM'
                });
            }
        }
    } catch { /* skip if site is down or blocks bots */ }

    // 7. IP-API Geolocation (Resolve Domain to IP, then Geolocate)
    try {
        const ipRes = await fetch(`http://ip-api.com/json/${cleanDomain}?fields=status,country,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
            next: { revalidate: 0 }
        });
        if (ipRes.ok) {
            const geo = await ipRes.json();
            if (geo.status === 'success') {
                results.push({
                    title: `IP Geolocation — ${geo.query}`,
                    url: `https://ip-api.com/#${geo.query}`,
                    description: `Server physically located in ${geo.city}, ${geo.regionName}, ${geo.country}. ISP: ${geo.isp} (${geo.as}). Org: ${geo.org}`,
                    category: 'infrastructure',
                    platform: 'IP-API Geolocation',
                    metadata: geo,
                    confidenceScore: 0.80,
                    confidenceLabel: 'HIGH'
                });
            }
        }
    } catch { /* skip */ }

    return {
        connectorType: 'domain_search',
        query: cleanDomain,
        results,
        generatedAt: new Date().toISOString(),
    };
}
