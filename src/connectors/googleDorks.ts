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

    // 2. Structured dork search links (Google + DuckDuckGo)
    const dorks: { label: string; dork: string; category: string }[] = [];

    if (email) {
        dorks.push(
            { label: 'Email Mentions', dork: `"${email}"`, category: 'identity' },
            { label: 'Email + Password Leaks', dork: `"${email}" password | leaked | breach`, category: 'breach' },
            { label: 'Email + Pastebin', dork: `site:pastebin.com "${email}"`, category: 'breach' },
        );
    }
    if (username) {
        dorks.push(
            { label: 'Username Mentions', dork: `"${username}"`, category: 'identity' },
            { label: 'Username + Profiles', dork: `"${username}" site:linkedin.com OR site:twitter.com OR site:github.com`, category: 'social' },
            { label: 'Username + Leaks', dork: `"${username}" site:pastebin.com OR site:raidforums.com`, category: 'breach' },
        );
    }
    if (name) {
        dorks.push(
            { label: 'Full Name Search', dork: `"${name}"`, category: 'identity' },
            { label: 'Full Name + Social', dork: `"${name}" site:facebook.com OR site:linkedin.com OR site:twitter.com`, category: 'social' },
            { label: 'Full Name + Phone/Email', dork: `"${name}" phone | email | contact`, category: 'contact' },
            { label: 'Full Name + Images', dork: `"${name}" filetype:jpg OR filetype:png`, category: 'media' },
        );
    }

    for (const dork of dorks) {
        const encoded = encodeURIComponent(dork.dork);
        results.push({
            title: `Dork: ${dork.label}`,
            url: `https://duckduckgo.com/?q=${encoded}`,
            description: `Search query: ${dork.dork}`,
            category: dork.category,
            platform: 'DuckDuckGo Search',
        });
    }

    return {
        connectorType: 'google_dork',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}
