import { ConnectorResult, SearchResult } from './types';

/**
 * Dark Web / Deep Web Search — actively scrapes Ahmia.fi (Tor search engine)
 * and DuckDuckGo dark web dorks to find real mentions of the target.
 */
export async function darkWebSearch(query: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    const quickFetch = (url: string, opts: RequestInit = {}) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000);
        return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(id));
    };

    const allChecks = [
        // 1. Ahmia.fi — Tor Hidden Service Search Engine (actually indexes .onion sites)
        (async () => {
            try {
                const res = await quickFetch(`https://ahmia.fi/search/?q=${encodeURIComponent(query)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    },
                });
                if (res.ok) {
                    const html = await res.text();
                    // Extract actual search result blocks
                    const titleMatches = html.match(/<h4>\s*<a[^>]*>([^<]+)<\/a>/g);
                    const snippetMatches = html.match(/<p[^>]*class="[^"]*"[^>]*>([\s\S]*?)<\/p>/g);

                    if (titleMatches && titleMatches.length > 0) {
                        const entries = titleMatches.slice(0, 5).map((t, i) => {
                            const title = t.replace(/<[^>]+>/g, '').trim();
                            const snippet = snippetMatches?.[i]?.replace(/<[^>]+>/g, '').trim() || '';
                            return `• ${title}\n  ${snippet}`;
                        });

                        results.push({
                            title: `Tor Hidden Services — ${query}`,
                            url: `https://ahmia.fi/search/?q=${encodeURIComponent(query)}`,
                            description: `FOUND ${titleMatches.length} indexed dark web pages mentioning "${query}":\n\n${entries.join('\n\n')}`,
                            category: 'dark_web',
                            platform: 'Ahmia',
                            confidenceScore: 0.85,
                            confidenceLabel: 'HIGH',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 2. DuckDuckGo dark web context dork
        (async () => {
            try {
                const dorkQuery = `"${query}" dark web OR darknet OR forum OR leak OR paste`;
                const res = await quickFetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(dorkQuery)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    },
                });
                if (res.ok) {
                    const html = await res.text();
                    const snippetMatches = html.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g);

                    if (snippetMatches && snippetMatches.length > 0) {
                        const cleanSnippets = snippetMatches.slice(0, 4).map(s =>
                            s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim()
                        );
                        results.push({
                            title: `Deep Web Mentions — ${query}`,
                            url: `https://duckduckgo.com/?q=${encodeURIComponent(dorkQuery)}`,
                            description: `FOUND ${snippetMatches.length} web references in dark web / forum context:\n\n${cleanSnippets.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}`,
                            category: 'dark_web',
                            platform: 'Web Dork',
                            confidenceScore: 0.60,
                            confidenceLabel: 'MEDIUM',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 3. IntelX public frontend scrape
        (async () => {
            try {
                const res = await quickFetch(`https://intelx.io/?s=${encodeURIComponent(query)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                        'Accept': 'text/html',
                    },
                });
                if (res.ok) {
                    const html = await res.text();
                    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
                    const descMatch = html.match(/<meta[^>]+(?:name|property)="[^"]*description"[^>]+content="([^"]+)"/i);

                    const title = titleMatch ? titleMatch[1].trim() : '';
                    const desc = descMatch ? descMatch[1].trim() : '';

                    if (title && !title.includes('404')) {
                        results.push({
                            title: `Intelligence X — ${query}`,
                            url: `https://intelx.io/?s=${encodeURIComponent(query)}`,
                            description: `IntelX Page Scraped:\nTitle: ${title}\nDescription: ${desc || 'No public description available — login may be required for full results.'}`,
                            category: 'dark_web',
                            platform: 'IntelX',
                            confidenceScore: 0.80,
                            confidenceLabel: 'HIGH',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),
    ];

    await Promise.allSettled(allChecks);

    return {
        connectorType: 'dark_web',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}
