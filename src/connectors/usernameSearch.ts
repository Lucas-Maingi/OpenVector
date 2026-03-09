import { ConnectorResult, SearchResult } from './types';

/**
 * Username Search — queries real public APIs for actual profile data.
 * No API key required. Sources: GitHub, Reddit, npm, Gravatar (by email).
 */
export async function usernameSearch(username: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    // 1. GitHub Profile
    try {
        const ghRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OpenVector-OSINT' },
            next: { revalidate: 0 },
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
    } catch { /* network error — skip */ }

    // 2. Reddit Profile
    try {
        const rdRes = await fetch(`https://www.reddit.com/user/${encodeURIComponent(username)}/about.json`, {
            headers: { 'User-Agent': 'OpenVector-OSINT/1.0' },
            next: { revalidate: 0 },
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

    // 3. npm packages by author
    try {
        const npmRes = await fetch(`https://registry.npmjs.org/-/v1/search?text=author:${encodeURIComponent(username)}&size=3`, {
            next: { revalidate: 0 }
        });
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

    // 4. Platform presence checks (Active HTML Scraping)
    const platformChecks = [
        { name: 'Twitter/X', url: `https://twitter.com/${username}`, category: 'social' },
        { name: 'Instagram', url: `https://instagram.com/${username}`, category: 'social' },
        { name: 'TikTok', url: `https://tiktok.com/@${username}`, category: 'social' },
        { name: 'LinkedIn', url: `https://www.linkedin.com/in/${username}`, category: 'professional' },
        { name: 'GitLab', url: `https://gitlab.com/${username}`, category: 'developer' },
        { name: 'HackerNews', url: `https://news.ycombinator.com/user?id=${username}`, category: 'developer' },
        { name: 'Medium', url: `https://medium.com/@${username}`, category: 'content' },
        { name: 'DEV.to', url: `https://dev.to/${username}`, category: 'developer' },
        { name: 'YouTube', url: `https://youtube.com/@${username}`, category: 'content' },
    ];

    // Helper to scrape basic meta tags safely bypassing basic blocks
    const fetchMetadata = async (url: string) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                    'Accept': 'text/html,application/xhtml+xml',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
                next: { revalidate: 0 },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!res.ok) return null;

            const html = await res.text();

            // Extract <title>
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const rawTitle = titleMatch ? titleMatch[1].trim() : '';

            // Extract <meta name="description" content="..." /> OR <meta property="og:description" ... />
            const descMatch = html.match(/<meta[^>]+(?:name|property)="[^"]*description"[^>]+content="([^"]+)"/i) ||
                html.match(/<meta[^>]+content="([^"]+)"[^>]+(?:name|property)="[^"]*description"/i);

            let desc = descMatch ? descMatch[1].trim() : '';

            // Clean up common HTML entities
            desc = desc.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
            const title = rawTitle.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

            if (!title) return null;

            return { title, desc };
        } catch {
            return null; // Ignore timeouts or network blocks
        }
    };

    // Run scrapers in parallel but chunked to avoid memory spikes
    const chunkSize = 3;
    for (let i = 0; i < platformChecks.length; i += chunkSize) {
        const chunk = platformChecks.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (platform) => {
            const meta = await fetchMetadata(platform.url);

            if (meta && (meta.title.toLowerCase().includes(username.toLowerCase()) || meta.desc.toLowerCase().includes(username.toLowerCase()))) {
                // If it looks like a real profile (not a 404 page title)
                if (!meta.title.toLowerCase().includes('page not found') && !meta.title.toLowerCase().includes('404')) {
                    results.push({
                        title: `${platform.name} — @${username}`,
                        url: platform.url,
                        description: `Live Profile Data Scraped:\nTitle: ${meta.title}\nBio/Details: ${meta.desc || 'No description found.'}`,
                        category: platform.category,
                        platform: platform.name,
                    });
                }
            }
        }));
    }

    return {
        connectorType: 'username_search',
        query: username,
        results,
        generatedAt: new Date().toISOString(),
    };
}
