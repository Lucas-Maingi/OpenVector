import { ConnectorResult, SearchResult } from './types';

export function domainSearch(domain: string): ConnectorResult {
    const clean = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];

    const results: SearchResult[] = [
        {
            title: `WHOIS Lookup — ${clean}`,
            url: `https://whois.domaintools.com/${clean}`,
            description: 'Full WHOIS registration data, registrar, creation date, name servers',
            category: 'domain',
            platform: 'DomainTools',
        },
        {
            title: `ICANN WHOIS — ${clean}`,
            url: `https://lookup.icann.org/en/lookup?name=${clean}`,
            description: 'ICANN official WHOIS lookup',
            category: 'domain',
            platform: 'ICANN',
        },
        {
            title: `DNS Records — ${clean}`,
            url: `https://dnschecker.org/#A/${clean}`,
            description: 'A, MX, CNAME, TXT, NS records from global DNS servers',
            category: 'dns',
            platform: 'DNSChecker',
        },
        {
            title: `SecurityTrails — ${clean}`,
            url: `https://securitytrails.com/domain/${clean}/dns`,
            description: 'Historical DNS data, subdomains, IP history',
            category: 'dns',
            platform: 'SecurityTrails',
        },
        {
            title: `SSL Certificate — ${clean}`,
            url: `https://crt.sh/?q=${clean}`,
            description: 'Certificate Transparency logs — find subdomains via SSL certs',
            category: 'ssl',
            platform: 'crt.sh',
        },
        {
            title: `Shodan — ${clean}`,
            url: `https://www.shodan.io/search?query=hostname%3A${clean}`,
            description: 'Internet-connected devices and services associated with this domain',
            category: 'infrastructure',
            platform: 'Shodan',
        },
        {
            title: `BuiltWith — ${clean}`,
            url: `https://builtwith.com/${clean}`,
            description: 'Technology stack fingerprinting',
            category: 'technology',
            platform: 'BuiltWith',
        },
        {
            title: `Wayback Machine — ${clean}`,
            url: `https://web.archive.org/web/*/${clean}`,
            description: 'Historical snapshots of the website',
            category: 'history',
            platform: 'Internet Archive',
        },
        {
            title: `URLScan — ${clean}`,
            url: `https://urlscan.io/search/#domain%3A${clean}`,
            description: 'Past URL scans, screenshots, and behavior analysis',
            category: 'threat_intel',
            platform: 'URLScan',
        },
        {
            title: `VirusTotal — ${clean}`,
            url: `https://www.virustotal.com/gui/domain/${clean}`,
            description: 'Malware and threat reputation check',
            category: 'threat_intel',
            platform: 'VirusTotal',
        },
        {
            title: `MX Toolbox — ${clean}`,
            url: `https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${clean}`,
            description: 'Mail server lookup, blacklist check, and email security (DMARC/SPF)',
            category: 'email',
            platform: 'MXToolbox',
        },
    ];

    return {
        connectorType: 'domain_search',
        query: clean,
        results,
        generatedAt: new Date().toISOString(),
    };
}
