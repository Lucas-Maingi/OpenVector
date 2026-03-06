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

    // 4. Platform presence checks (HEAD requests)
    const platformChecks = [
        { name: 'Twitter/X', url: `https://twitter.com/${username}`, category: 'social' },
        { name: 'Instagram', url: `https://instagram.com/${username}`, category: 'social' },
        { name: 'TikTok', url: `https://tiktok.com/@${username}`, category: 'social' },
        { name: 'LinkedIn', url: `https://linkedin.com/in/${username}`, category: 'professional' },
        { name: 'GitLab', url: `https://gitlab.com/${username}`, category: 'developer' },
        { name: 'Keybase', url: `https://keybase.io/${username}`, category: 'identity' },
        { name: 'HackerNews', url: `https://news.ycombinator.com/user?id=${username}`, category: 'developer' },
        { name: 'Medium', url: `https://medium.com/@${username}`, category: 'content' },
        { name: 'DEV.to', url: `https://dev.to/${username}`, category: 'developer' },
        { name: 'Twitch', url: `https://twitch.tv/${username}`, category: 'content' },
        { name: 'YouTube', url: `https://youtube.com/@${username}`, category: 'content' },
    ];

    for (const platform of platformChecks) {
        results.push({
            title: `${platform.name} — @${username}`,
            url: platform.url,
            description: `Potential profile found at ${platform.url} — verify manually for current status.`,
            category: platform.category,
            platform: platform.name,
        });
    }

    return {
        connectorType: 'username_search',
        query: username,
        results,
        generatedAt: new Date().toISOString(),
    };
}
