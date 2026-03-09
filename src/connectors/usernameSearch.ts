import { ConnectorResult, SearchResult } from './types';

/**
 * Username Search — queries real public APIs for actual profile data.
 * No API key required. Sources: GitHub, Reddit, npm + Active HTML scraping for social platforms.
 */
export async function usernameSearch(username: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    // Helper: fetch with a hard 2-second timeout (Vercel-safe)
    const quickFetch = (url: string, opts: RequestInit = {}) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 2000);
        return fetch(url, { ...opts, signal: controller.signal })
            .finally(() => clearTimeout(id));
    };

    // --- PHASE 1: Real API lookups (run in parallel) ---
    const apiPromises = [
        // 1. GitHub Profile
        (async () => {
            try {
                const ghRes = await quickFetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
                    headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OpenVector-OSINT' },
                });
                if (ghRes.ok) {
                    const gh = await ghRes.json();
                    results.push({
                        title: `GitHub — ${gh.login}`,
                        url: gh.html_url,
                        description: [
                            gh.name ? `Name: ${gh.name}` : null,
                            gh.bio ? `Bio: ${gh.bio}` : null,
                            gh.company ? `Company: ${gh.company}` : null,
                            gh.location ? `Location: ${gh.location}` : null,
                            `Followers: ${gh.followers} | Following: ${gh.following}`,
                            `Public repos: ${gh.public_repos}`,
                            gh.created_at ? `Joined: ${new Date(gh.created_at).toDateString()}` : null,
                            gh.email ? `Email: ${gh.email}` : null,
                            gh.blog ? `Website: ${gh.blog}` : null,
                        ].filter(Boolean).join(' · '),
                        category: 'developer',
                        platform: 'GitHub',
                        metadata: {
                            avatarUrl: gh.avatar_url,
                            followers: gh.followers,
                            repos: gh.public_repos,
                            profileUrl: gh.html_url,
                        }
                    });
                }
            } catch { /* skip */ }
        })(),

        // 2. Reddit Profile
        (async () => {
            try {
                const rdRes = await quickFetch(`https://www.reddit.com/user/${encodeURIComponent(username)}/about.json`, {
                    headers: { 'User-Agent': 'OpenVector-OSINT/1.0' },
                });
                if (rdRes.ok) {
                    const rd = await rdRes.json();
                    const d = rd?.data;
                    if (d && !d.is_suspended) {
                        results.push({
                            title: `Reddit — u/${d.name}`,
                            url: `https://reddit.com/user/${d.name}`,
                            description: [
                                `Link karma: ${d.link_karma?.toLocaleString()}`,
                                `Comment karma: ${d.comment_karma?.toLocaleString()}`,
                                d.created_utc ? `Account created: ${new Date(d.created_utc * 1000).toDateString()}` : null,
                                d.subreddit?.public_description ? `Bio: ${d.subreddit.public_description}` : null,
                                d.is_gold ? 'Reddit Gold member' : null,
                            ].filter(Boolean).join(' · '),
                            category: 'social',
                            platform: 'Reddit',
                            metadata: {
                                avatarUrl: d.icon_img || d.subreddit?.icon_img,
                                karma: (d.link_karma || 0) + (d.comment_karma || 0),
                                profileUrl: `https://reddit.com/user/${d.name}`,
                            }
                        });
                    }
                }
            } catch { /* skip */ }
        })(),

        // 3. npm packages by author
        (async () => {
            try {
                const npmRes = await quickFetch(`https://registry.npmjs.org/-/v1/search?text=author:${encodeURIComponent(username)}&size=3`);
                if (npmRes.ok) {
                    const npm = await npmRes.json();
                    if (npm.objects?.length > 0) {
                        const pkgList = npm.objects.map((o: any) => o.package.name).join(', ');
                        results.push({
                            title: `npm — ${username}`,
                            url: `https://www.npmjs.com/~${encodeURIComponent(username)}`,
                            description: `Published ${npm.total} npm package(s). Recent packages: ${pkgList}`,
                            category: 'developer',
                            platform: 'npm',
                        });
                    }
                }
            } catch { /* skip */ }
        })(),
    ];

    await Promise.allSettled(apiPromises);

    // --- PHASE 2: Active HTML Scraping (ALL platforms in parallel with 2s timeout) ---
    const platformChecks = [
        { name: 'Twitter/X', url: `https://x.com/${username}`, category: 'social' },
        { name: 'Instagram', url: `https://www.instagram.com/${username}/`, category: 'social' },
        { name: 'TikTok', url: `https://www.tiktok.com/@${username}`, category: 'social' },
        { name: 'LinkedIn', url: `https://www.linkedin.com/in/${username}`, category: 'professional' },
        { name: 'YouTube', url: `https://www.youtube.com/@${username}`, category: 'content' },
        { name: 'Medium', url: `https://medium.com/@${username}`, category: 'content' },
    ];

    const scrapePromises = platformChecks.map(async (platform) => {
        try {
            const res = await quickFetch(platform.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                    'Accept': 'text/html,application/xhtml+xml',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
            });

            if (!res.ok) return;

            const html = await res.text();

            // Extract <title>
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const rawTitle = titleMatch ? titleMatch[1].trim() : '';

            // Extract meta description
            const descMatch = html.match(/<meta[^>]+(?:name|property)="[^"]*description"[^>]+content="([^"]+)"/i) ||
                html.match(/<meta[^>]+content="([^"]+)"[^>]+(?:name|property)="[^"]*description"/i);
            let desc = descMatch ? descMatch[1].trim() : '';

            // Clean HTML entities
            desc = desc.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
            const title = rawTitle.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

            if (!title) return;

            // Validate it's a real profile, not a 404/login page
            const lTitle = title.toLowerCase();
            const lDesc = desc.toLowerCase();
            const lUser = username.toLowerCase();

            const isRelevant = lTitle.includes(lUser) || lDesc.includes(lUser);
            const is404 = lTitle.includes('page not found') || lTitle.includes('404') || lTitle.includes('not found');

            if (isRelevant && !is404) {
                results.push({
                    title: `${platform.name} — @${username}`,
                    url: platform.url,
                    description: `VERIFIED PROFILE SCRAPED:\nPage Title: ${title}\nProfile Bio: ${desc || 'No public bio available.'}`,
                    category: platform.category,
                    platform: platform.name,
                });
            }
        } catch { /* timeout or network block — skip silently */ }
    });

    await Promise.allSettled(scrapePromises);

    return {
        connectorType: 'username_search',
        query: username,
        results,
        generatedAt: new Date().toISOString(),
    };
}
