import { ConnectorResult, SearchResult } from './types';

/**
 * Intelligence Dorks — uses DuckDuckGo Instant Answer, Wikipedia API, 
 * and DuckDuckGo HTML search to find real information about the target.
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

    const quickFetch = (url: string, opts: RequestInit = {}) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 5000);
        return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(id));
    };

    const allChecks = [
        // 1. DuckDuckGo Instant Answer
        (async () => {
            try {
                const ddgQuery = encodeURIComponent(query);
                const ddgRes = await quickFetch(`https://api.duckduckgo.com/?q=${ddgQuery}&format=json&no_redirect=1&no_html=1`, {
                    headers: { 'User-Agent': 'OpenVector-OSINT-Engine/1.0' },
                });
                if (ddgRes.ok) {
                    const text = await ddgRes.text();
                    if (text && text.trim().startsWith('{')) {
                        try {
                            const ddg = JSON.parse(text);
                            if (ddg.AbstractText) {
                                results.push({
                                    title: `${ddg.AbstractSource || 'Web Encyclopedia'} — ${ddg.Heading || query}`,
                                    url: ddg.AbstractURL || `https://duckduckgo.com/?q=${ddgQuery}`,
                                    description: ddg.AbstractText.slice(0, 1500),
                                    category: 'identity',
                                    platform: ddg.AbstractSource || 'DuckDuckGo',
                                    confidenceScore: 0.85,
                                    confidenceLabel: 'HIGH'
                                });
                            }
                        } catch { /* skip */ }
                    }
                }
            } catch { /* skip */ }
        })(),

        // 2. Wikipedia API — Case-insensitive search with opensearch first, then extract
        (async () => {
            if (!name && !username) return;
            const wikiTarget = name || username || '';
            try {
                // Use opensearch to find the correct article title (handles case)
                const searchRes = await quickFetch(
                    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(wikiTarget)}&limit=1&format=json`,
                    { headers: { 'User-Agent': 'OpenVector-OSINT-Scanner/1.0 (info@openvector.dev)' } }
                );
                if (!searchRes.ok) return;

                const searchData = await searchRes.json();
                const articleTitle = searchData?.[1]?.[0]; // First result title

                if (!articleTitle) return;

                // Now fetch the full extract using the correct title
                const wikiRes = await quickFetch(
                    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(articleTitle)}`,
                    { headers: { 'User-Agent': 'OpenVector-OSINT-Scanner/1.0 (info@openvector.dev)' } }
                );
                if (!wikiRes.ok) return;

                const wikiData = await wikiRes.json();
                const pages = wikiData.query?.pages;
                if (!pages) return;

                const pageId = Object.keys(pages)[0];
                if (pageId !== '-1' && pages[pageId].extract) {
                    results.push({
                        title: `Wikipedia — ${pages[pageId].title}`,
                        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(pages[pageId].title)}`,
                        description: pages[pageId].extract.slice(0, 2000),
                        category: 'identity',
                        platform: 'Wikipedia',
                        confidenceScore: 0.90,
                        confidenceLabel: 'HIGH'
                    });
                }
            } catch { /* skip */ }
        })(),

        // 3. DuckDuckGo HTML Search — finds news articles, interviews, public records
        (async () => {
            try {
                const searchQuery = name || username || email || '';
                const res = await quickFetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    },
                });
                if (!res.ok) return;

                const html = await res.text();
                const titleMatches = html.match(/<a class="result__a"[^>]*>([\s\S]*?)<\/a>/g);
                const snippetMatches = html.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g);
                const urlMatches = html.match(/<a class="result__url" href="([^"]+)"/g);

                if (titleMatches && titleMatches.length > 0 && snippetMatches && snippetMatches.length > 0) {
                    const entries = titleMatches.slice(0, 5).map((t, i) => {
                        const title = t.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();
                        const snippet = snippetMatches[i]?.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").trim() || '';
                        let url = urlMatches?.[i]?.match(/href="([^"]+)"/)?.[1] || '#';
                        if (url.startsWith('//')) url = `https:${url}`;
                        return `• ${title}\n  ${snippet}\n  Source: ${url}`;
                    });

                    results.push({
                        title: `Web Intelligence — ${searchQuery}`,
                        url: `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`,
                        description: `TOP ${Math.min(5, titleMatches.length)} SEARCH RESULTS:\n\n${entries.join('\n\n')}`,
                        category: 'general',
                        platform: 'DuckDuckGo',
                        confidenceScore: 0.60,
                        confidenceLabel: 'MEDIUM'
                    });
                }
            } catch { /* skip */ }
        })(),

        // 4. GitHub Code Search (for emails only)
        (async () => {
            if (!email) return;
            try {
                const ghRes = await quickFetch(`https://api.github.com/search/code?q=${encodeURIComponent(email)}`, {
                    headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OpenVector-OSINT' },
                });
                if (ghRes.ok) {
                    const data = await ghRes.json();
                    if (data.total_count > 0) {
                        const files = data.items?.slice(0, 5).map((item: any) =>
                            `• ${item.repository?.full_name}/${item.name}`
                        ).join('\n') || '';

                        results.push({
                            title: `GitHub Code Exposure — ${data.total_count} files`,
                            url: `https://github.com/search?q=${encodeURIComponent(email)}&type=code`,
                            description: `FOUND ${email} in ${data.total_count} public code file(s):\n\n${files}`,
                            category: 'breach',
                            platform: 'GitHub',
                            confidenceScore: 0.90,
                            confidenceLabel: 'HIGH'
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 5. Broad-Spectrum Social Site Dorks
        (async () => {
            if (!name && !username) return;
            const target = name || username || '';
            const platforms = [
                { name: 'Truth Social', site: 'truthsocial.com' },
                { name: 'Twitter/X', site: 'x.com OR site:twitter.com' },
                { name: 'LinkedIn', site: 'linkedin.com/in' },
                { name: 'Instagram', site: 'instagram.com' },
                { name: 'Facebook', site: 'facebook.com' },
            ];

            for (const p of platforms) {
                try {
                    const dork = `site:${p.site} "${target}"`;
                    const res = await quickFetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(dork)}`, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        },
                    });
                    if (!res.ok) continue;

                    const html = await res.text();

                    // Better parsing: match entire result blocks first, then extract pieces
                    const resultBlocks = html.split('class="result ').slice(1, 4);

                    for (const block of resultBlocks) {
                        const titleMatch = block.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>(.*?)<\/a>/);
                        const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);
                        const urlMatch = block.match(/<a class="result__url" href="([^"]+)"/);

                        if (titleMatch && urlMatch) {
                            const title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
                            const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : 'No biography available.';
                            let url = urlMatch[1];
                            if (url.startsWith('//')) url = `https:${url}`;

                            // Only accept if highly relevant to avoid generic results
                            const isHighlyRelevant = title.toLowerCase().includes(target.toLowerCase()) ||
                                snippet.toLowerCase().includes(target.toLowerCase()) ||
                                url.toLowerCase().includes(target.replace(/\s+/g, '').toLowerCase());

                            if (isHighlyRelevant && !results.some(r => r.url === url)) {
                                results.push({
                                    title: `${p.name} — ${title}`,
                                    url,
                                    description: `### 🪪 Social Profile Postcard\n\n**Platform:** ${p.name}\n**Profile Name:** ${title}\n\n**Biography / Snippet:**\n> ${snippet}\n\n**Direct Link:** ${url}`,
                                    category: 'social',
                                    platform: p.name,
                                    confidenceScore: 0.90,
                                    confidenceLabel: 'HIGH'
                                });
                                break; // Found the best match for this platform, move to next platform
                            }
                        }
                    }
                } catch { /* skip platform */ }
            }
        })(),

        // 6. High-Profile Global Icon Search (Fallback for Names Only)
        (async () => {
            if (!name || username || email) return;
            try {
                // Specialized dork for profile gathering for major public figures
                const dork = `"${name}" (site:x.com OR site:truthsocial.com OR site:instagram.com OR site:linkedin.com/in) -news -article`;
                const res = await quickFetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(dork)}`, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
                });
                if (!res.ok) return;

                const html = await res.text();
                const resultBlocks = html.split('class="result ').slice(1, 5);

                for (const block of resultBlocks) {
                    const titleMatch = block.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>(.*?)<\/a>/);
                    const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);
                    const urlMatch = block.match(/<a class="result__url" href="([^"]+)"/);

                    if (titleMatch && urlMatch) {
                        const title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
                        const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : 'No biography available.';
                        let url = urlMatch[1];
                        if (url.startsWith('//')) url = `https:${url}`;

                        // Parse platform from URL
                        let platform = 'Web';
                        if (url.includes('x.com') || url.includes('twitter.com')) platform = 'X/Twitter';
                        else if (url.includes('truthsocial.com')) platform = 'Truth Social';
                        else if (url.includes('instagram.com')) platform = 'Instagram';
                        else if (url.includes('linkedin.com')) platform = 'LinkedIn';

                        if (platform !== 'Web' && !results.some(r => r.url === url)) {
                            results.push({
                                title: `Verified Global Profile — ${title}`,
                                url,
                                description: `### 🪪 Verified Profile Postcard\n\n**Platform:** ${platform}\n**Identity:** ${title}\n\n**Biography / Snippet:**\n> ${snippet}\n\n**Direct Link:** ${url}`,
                                category: 'social',
                                platform,
                                confidenceScore: 0.95,
                                confidenceLabel: 'HIGH'
                            });
                        }
                    }
                }
            } catch { /* skip */ }
        })(),
    ];

    await Promise.allSettled(allChecks);

    return {
        connectorType: 'google_dork',
        query,
        results,
        generatedAt: new Date().toISOString(),
    };
}
