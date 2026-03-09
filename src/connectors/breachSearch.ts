import { ConnectorResult, SearchResult } from './types';

/**
 * Breach Search — ACTIVELY scrapes breach databases and search engines
 * for real evidence of the email appearing in leaked data.
 * No API keys required — uses publicly accessible endpoints.
 */
export async function breachSearch(email: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    const quickFetch = (url: string, opts: RequestInit = {}) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000);
        return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(id));
    };

    const allChecks = [
        // 1. Gravatar (real API check — confirms email is registered)
        (async () => {
            try {
                const crypto = await import('crypto');
                const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
                const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404&s=200`;
                const gRes = await quickFetch(gravatarUrl, { method: 'HEAD' });

                if (gRes.ok) {
                    // Fetch the full Gravatar profile JSON for real data
                    try {
                        const profileRes = await quickFetch(`https://en.gravatar.com/${hash}.json`);
                        if (profileRes.ok) {
                            const profileData = await profileRes.json();
                            const entry = profileData?.entry?.[0];
                            const displayName = entry?.displayName || 'Unknown';
                            const location = entry?.currentLocation || 'Not disclosed';
                            const aboutMe = entry?.aboutMe || 'No bio';
                            const profileUrl = entry?.profileUrl || `https://gravatar.com/${hash}`;
                            const accounts = entry?.accounts?.map((a: any) => `${a.shortname}: ${a.url}`).join('\n') || 'None linked';

                            results.push({
                                title: `Gravatar Profile — ${email}`,
                                url: profileUrl,
                                description: `VERIFIED ACCOUNT FOUND\nDisplay Name: ${displayName}\nLocation: ${location}\nBio: ${aboutMe}\nAvatar: ${gravatarUrl.replace('?d=404&s=200', '?s=200')}\nLinked Accounts:\n${accounts}`,
                                category: 'identity',
                                platform: 'Gravatar',
                                metadata: {
                                    avatarUrl: gravatarUrl.replace('?d=404&s=200', '?s=200'),
                                    profileUrl,
                                }
                            });
                        } else {
                            results.push({
                                title: `Gravatar Profile — ${email}`,
                                url: `https://gravatar.com/${hash}`,
                                description: `VERIFIED: Email has an active Gravatar avatar (account exists).\nAvatar URL: ${gravatarUrl.replace('?d=404&s=200', '?s=200')}`,
                                category: 'identity',
                                platform: 'Gravatar',
                                metadata: { avatarUrl: gravatarUrl.replace('?d=404&s=200', '?s=200') }
                            });
                        }
                    } catch {
                        results.push({
                            title: `Gravatar — ${email}`,
                            url: `https://gravatar.com/${hash}`,
                            description: `CONFIRMED: Active Gravatar avatar found for this email.\nAvatar: ${gravatarUrl.replace('?d=404&s=200', '?s=200')}`,
                            category: 'identity',
                            platform: 'Gravatar',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 2. Ahmia (Tor Search Engine — searches for email on indexed .onion sites)
        (async () => {
            try {
                const res = await quickFetch(`https://ahmia.fi/search/?q=${encodeURIComponent(email)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    }
                });
                if (res.ok) {
                    const html = await res.text();
                    // Extract search result titles and snippets
                    const resultBlocks = html.match(/<li class="result">([\s\S]*?)<\/li>/g);
                    if (resultBlocks && resultBlocks.length > 0) {
                        const snippets = resultBlocks.slice(0, 3).map(block => {
                            const titleMatch = block.match(/<a[^>]*>([^<]+)<\/a>/);
                            const snippetMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/);
                            const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Unknown';
                            const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : '';
                            return `• ${title}: ${snippet}`;
                        });

                        results.push({
                            title: `Dark Web Mentions — ${email}`,
                            url: `https://ahmia.fi/search/?q=${encodeURIComponent(email)}`,
                            description: `FOUND ${resultBlocks.length} dark web references for this email.\nIndexed .onion site mentions:\n\n${snippets.join('\n\n')}`,
                            category: 'dark_web',
                            platform: 'Ahmia',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 3. DuckDuckGo breach dork — searches for the email mentioned alongside "leak" "breach" "dump" "password"
        (async () => {
            try {
                const dorkQuery = `"${email}" breach OR leak OR dump OR password OR database`;
                const res = await quickFetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(dorkQuery)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    }
                });
                if (res.ok) {
                    const html = await res.text();
                    const snippetMatches = html.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g);

                    if (snippetMatches && snippetMatches.length > 0) {
                        const cleanSnippets = snippetMatches.slice(0, 4).map(s =>
                            s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").trim()
                        );
                        const urlMatches = html.match(/<a class="result__url" href="([^"]+)"/g);
                        const firstUrl = urlMatches?.[0]?.match(/href="([^"]+)"/)?.[1] || '#';

                        results.push({
                            title: `Breach Intelligence — ${email}`,
                            url: firstUrl.startsWith('//') ? `https:${firstUrl}` : firstUrl,
                            description: `FOUND ${snippetMatches.length} web references mentioning this email in breach/leak context:\n\n${cleanSnippets.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}`,
                            category: 'breach',
                            platform: 'Web Intelligence',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 4. Pastebin dork — searches for the email on paste sites
        (async () => {
            try {
                const pasteQuery = `"${email}" site:pastebin.com OR site:ghostbin.com OR site:rentry.co`;
                const res = await quickFetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(pasteQuery)}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    }
                });
                if (res.ok) {
                    const html = await res.text();
                    const snippetMatches = html.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g);

                    if (snippetMatches && snippetMatches.length > 0) {
                        const cleanSnippets = snippetMatches.slice(0, 3).map(s =>
                            s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim()
                        );
                        results.push({
                            title: `Paste Site Exposure — ${email}`,
                            url: `https://duckduckgo.com/?q=${encodeURIComponent(pasteQuery)}`,
                            description: `FOUND ${snippetMatches.length} paste entries containing this email:\n\n${cleanSnippets.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}`,
                            category: 'breach',
                            platform: 'Paste Sites',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 5. GitHub code search — check if email appears in public source code
        (async () => {
            try {
                const res = await quickFetch(`https://api.github.com/search/code?q=${encodeURIComponent(email)}`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'OpenVector-OSINT'
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.total_count > 0) {
                        const files = data.items?.slice(0, 3).map((item: any) =>
                            `• ${item.repository?.full_name || 'unknown'}/${item.name} (${item.path})`
                        ).join('\n') || '';

                        results.push({
                            title: `GitHub Code Exposure — ${email}`,
                            url: `https://github.com/search?q=${encodeURIComponent(email)}&type=code`,
                            description: `FOUND in ${data.total_count} public code file(s) on GitHub.\nThis email appears in source code, configs, or commits:\n\n${files}`,
                            category: 'breach',
                            platform: 'GitHub',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 6. Emailrep.io — email reputation check (free, no key needed for basic)
        (async () => {
            try {
                const res = await quickFetch(`https://emailrep.io/${encodeURIComponent(email)}`, {
                    headers: {
                        'User-Agent': 'OpenVector-OSINT',
                        'Accept': 'application/json',
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.email) {
                        const details = [
                            `Reputation: ${data.reputation || 'unknown'}`,
                            `Suspicious: ${data.suspicious ? 'YES' : 'No'}`,
                            `Malicious Activity: ${data.references > 0 ? `YES (${data.references} references)` : 'None found'}`,
                            `Profiles Found: ${data.details?.profiles?.join(', ') || 'None'}`,
                            `Domain Age: ${data.details?.domain_reputation || 'unknown'}`,
                            `Free Provider: ${data.details?.free_provider ? 'Yes' : 'No'}`,
                            `Disposable: ${data.details?.disposable ? 'YES ⚠️' : 'No'}`,
                            `Data Breach: ${data.details?.data_breach ? 'YES — appears in known breaches' : 'Not found in indexed breaches'}`,
                            `Spam: ${data.details?.spam ? 'YES' : 'No'}`,
                            data.details?.last_seen ? `Last Seen: ${data.details.last_seen}` : null,
                        ].filter(Boolean).join('\n');

                        results.push({
                            title: `Email Reputation Report — ${email}`,
                            url: `https://emailrep.io/${encodeURIComponent(email)}`,
                            description: `LIVE EMAIL INTELLIGENCE:\n${details}`,
                            category: 'identity',
                            platform: 'EmailRep',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),
    ];

    await Promise.allSettled(allChecks);

    return {
        connectorType: 'breach_search',
        query: email,
        results,
        generatedAt: new Date().toISOString(),
    };
}
