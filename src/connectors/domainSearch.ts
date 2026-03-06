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
                    });
                }
            }
        } catch { /* skip */ }
    }

    // 4. URLScan.io — recent web scans of domain
    try {
        const urlscanRes = await fetch(
            `https://urlscan.io/api/v1/search/?q=domain:${cleanDomain}&size=3`,
            { headers: { 'User-Agent': 'OpenVector-OSINT' }, next: { revalidate: 0 } }
        );
        if (urlscanRes.ok) {
            const urlscan = await urlscanRes.json();
            if (urlscan.results?.length > 0) {
                const latest = urlscan.results[0];
                results.push({
                    title: `URLScan.io — ${cleanDomain}`,
                    url: latest.result,
                    description: [
                        `Last scanned: ${new Date(latest.task?.time).toDateString()}`,
                        latest.page?.ip ? `IP: ${latest.page.ip}` : null,
                        latest.page?.country ? `Server country: ${latest.page.country}` : null,
                        latest.page?.server ? `Server: ${latest.page.server}` : null,
                        `${urlscan.total} total scans found.`,
                    ].filter(Boolean).join(' · '),
                    category: 'web',
                    platform: 'URLScan.io',
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
