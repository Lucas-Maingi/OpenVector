import { ConnectorResult, SearchResult } from './types';

/**
 * Google Dorks — uses DuckDuckGo Instant Answer API (free, no key).
 * Also generates structured dork search links with real query strings.
 */
export async function googleDorks({ name, username, email }: {
    name?: string;
    username?: string;
    email?: string;
}): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    const query = email || username || name || '';

    if (!query) {
        return { connectorType: 'google_dork', query: '', results: [], generatedAt: new Date().toISOString() };
    }

    // 1. DuckDuckGo Instant Answer
    try {
        const ddgQuery = encodeURIComponent(query);
        const ddgRes = await fetch(`https://api.duckduckgo.com/?q=${ddgQuery}&format=json&no_redirect=1&no_html=1`, {
            headers: { 'User-Agent': 'OpenVector-OSINT-Engine/1.0' },
            cache: 'no-store',
        });
        if (ddgRes.ok) {
            const text = await ddgRes.text();
            // Guard against empty or malformed JSON from DDG
            if (text && text.trim().startsWith('{')) {
                try {
                    const ddg = JSON.parse(text);
                    if (ddg.AbstractText) {
                        results.push({
                            title: `DuckDuckGo Instant — ${ddg.AbstractSource || 'Web Extract'}`,
                            url: ddg.AbstractURL || `https://duckduckgo.com/?q=${ddgQuery}`,
                            description: ddg.AbstractText.slice(0, 500),
                            category: 'general',
                            platform: 'DuckDuckGo',
                        });
                    }
                } catch { /* malformed JSON — skip silently */ }
            }
        }
    } catch { /* network error — skip silently */ }

    // 2. Wikipedia API — Crucial for High-Profile Names
    if (name || username) {
        try {
            const wikiTarget = name || username || '';
            const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(wikiTarget)}`, {
                headers: { 'User-Agent': 'OpenVector-OSINT-Scanner/1.0 (info@openvector.dev)' },
                cache: 'no-store',
            });
            if (wikiRes.ok) {
                const wikiData = await wikiRes.json();
                const pages = wikiData.query?.pages;
                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    if (pageId !== '-1' && pages[pageId].extract) {
                        results.push({
                            title: `Wikipedia Biography — ${pages[pageId].title}`,
                            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(pages[pageId].title)}`,
                            description: pages[pageId].extract.slice(0, 2000), // Feed first 2000 chars of bio to give AI deep context
                            category: 'identity',
                            platform: 'Wikipedia',
                        });
                    }
                }
            } else {
                console.warn(`Wikipedia API returned status ${wikiRes.status} for "${wikiTarget}"`,
                );
            }
        } catch { /* skip silently */ }
    }

    // 3. GitHub Code Search — Extremely powerful for finding email mentions in config/source files
    if (email) {
        try {
            const ghRes = await fetch(`https://api.github.com/search/code?q=${encodeURIComponent(email)}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'OpenVector-OSINT'
                },
                next: { revalidate: 3600 }
            });
            if (ghRes.ok) {
                const data = await ghRes.json();
                if (data.total_count > 0) {
                    results.push({
                        title: `GitHub Code Extracts — ${data.total_count} files found`,
                        url: `https://github.com/search?q=${encodeURIComponent(email)}&type=code`,
                        description: `Found ${data.total_count} public code files on GitHub containing "${email}". This may indicate config leaks or project involvement.`,
                        category: 'breach',
                        platform: 'GitHub',
                    });
                }
            }
        } catch { /* skip */ }
    }

    return {
        connectorType: 'google_dork',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}

