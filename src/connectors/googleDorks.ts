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

    // 3. Structured dork search links (Google + DuckDuckGo)
    const dorks: { label: string; dork: string; category: string; explanation: string }[] = [];

    if (email) {
        dorks.push(
            { label: 'Email Mentions', dork: `"${email}"`, category: 'identity', explanation: 'General web mentions of this email address.' },
            { label: 'Email + Password Leaks', dork: `"${email}" password | leaked | breach`, category: 'breach', explanation: 'Searching for potential credential leaks in public text dumps.' },
            { label: 'Email + Pastebin', dork: `site:pastebin.com "${email}"`, category: 'breach', explanation: 'Identifying dumps or sensitive data on Pastebin.' },
        );
    }
    if (username) {
        dorks.push(
            { label: 'Username Mentions', dork: `"${username}"`, category: 'identity', explanation: 'General web mentions of this username.' },
            { label: 'Username + Profiles', dork: `"${username}" site:linkedin.com OR site:twitter.com OR site:github.com`, category: 'social', explanation: 'Identifying associated social media and developer profiles.' },
            { label: 'Username + Leaks', dork: `"${username}" site:pastebin.com OR site:raidforums.com`, category: 'breach', explanation: 'Checking for mentions in known hacker forums and paste sites.' },
        );
    }
    if (name) {
        dorks.push(
            { label: 'Full Name Search', dork: `"${name}"`, category: 'identity', explanation: 'Searching for exact matches of full name across the web.' },
            { label: 'Full Name + Social', dork: `"${name}" site:facebook.com OR site:linkedin.com OR site:twitter.com`, category: 'social', explanation: 'Identifying potential social media accounts.' },
            { label: 'Full Name + Phone/Email', dork: `"${name}" phone | email | contact`, category: 'contact', explanation: 'Searching for public contact information associations.' },
            { label: 'Full Name + Images', dork: `"${name}" filetype:jpg OR filetype:png`, category: 'media', explanation: 'Identifying indexed images or photos.' },
        );
    }

    for (const dork of dorks) {
        const encoded = encodeURIComponent(dork.dork);
        results.push({
            title: `Dork: ${dork.label}`,
            url: `https://duckduckgo.com/?q=${encoded}`,
            description: `${dork.explanation}\nQuery: ${dork.dork}`,
            category: dork.category,
            platform: 'OSINT Vector Search',
        });
    }

    return {
        connectorType: 'google_dork',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}

