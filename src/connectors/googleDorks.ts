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

    // 1. DuckDuckGo Instant Answer (free, no key, returns JSON)
    try {
        const ddgQuery = encodeURIComponent(`"${query}" site:linkedin.com OR site:twitter.com OR site:github.com`);
        const ddgRes = await fetch(`https://api.duckduckgo.com/?q=${ddgQuery}&format=json&no_redirect=1&no_html=1`, {
            headers: { 'User-Agent': 'OpenVector-OSINT' },
            next: { revalidate: 0 },
        });
        if (ddgRes.ok) {
            const ddg = await ddgRes.json();
            if (ddg.AbstractText) {
                results.push({
                    title: `DDG — ${ddg.AbstractSource || 'Web Extract'}`,
                    url: ddg.AbstractURL || `https://duckduckgo.com/?q=${ddgQuery}`,
                    description: ddg.AbstractText.slice(0, 400),
                    category: 'general',
                    platform: 'DuckDuckGo',
                });
            }
            // Related topics
            (ddg.RelatedTopics || []).slice(0, 3).forEach((t: any) => {
                if (t.Text && t.FirstURL) {
                    results.push({
                        title: `DDG Related — ${t.Text.slice(0, 60)}`,
                        url: t.FirstURL,
                        description: t.Text,
                        category: 'general',
                        platform: 'DuckDuckGo',
                    });
                }
            });
        }
    } catch { /* skip */ }

    // 2. GitHub Code Search — Extremely powerful for finding email mentions in config/source files
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
                        title: `GitHub Code — ${data.total_count} files found`,
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

