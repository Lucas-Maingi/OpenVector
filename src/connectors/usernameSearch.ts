import { ConnectorResult, SearchResult } from './types';

const PLATFORMS = [
    { name: 'GitHub', url: 'https://github.com/{username}', category: 'development' },
    { name: 'Reddit', url: 'https://www.reddit.com/user/{username}/about.json', category: 'social', isJson: true },
    { name: 'HackerNews', url: 'https://hacker-news.firebaseio.com/v0/user/{username}.json', category: 'tech', isJson: true },
    { name: 'Steam', url: 'https://steamcommunity.com/id/{username}', category: 'gaming' },
    { name: 'Medium', url: 'https://medium.com/@{username}', category: 'blogging' },
    { name: 'Dev.to', url: 'https://dev.to/{username}', category: 'development' },
    { name: 'Keybase', url: 'https://keybase.io/{username}', category: 'security' },
    { name: 'GitLab', url: 'https://gitlab.com/{username}', category: 'development' },
    { name: 'DockerHub', url: 'https://hub.docker.com/v2/users/{username}/', category: 'development', isJson: true },
    { name: 'npm', url: 'https://www.npmjs.com/~{username}', category: 'development' },
];

export async function usernameSearch(username: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    const encodedUsername = encodeURIComponent(username);

    results.push({
        title: `Google: "${username}" across all platforms`,
        url: `https://www.google.com/search?q="${encodedUsername}"`,
        description: `Google search for the exact username "${username}"`,
        category: 'search_engine',
        platform: 'Google',
    });

    // Add unverified links for platforms with strict bot blocking
    const unverifiedPlatforms = [
        { name: 'Twitter/X', url: `https://x.com/${encodedUsername}`, category: 'social' },
        { name: 'Instagram', url: `https://instagram.com/${encodedUsername}`, category: 'social' },
        { name: 'LinkedIn', url: `https://linkedin.com/in/${encodedUsername}`, category: 'professional' },
        { name: 'TikTok', url: `https://tiktok.com/@${encodedUsername}`, category: 'social' },
        { name: 'Facebook', url: `https://facebook.com/${encodedUsername}`, category: 'social' },
        { name: 'Youtube', url: `https://youtube.com/@${encodedUsername}`, category: 'media' },
        { name: 'Telegram', url: `https://t.me/${encodedUsername}`, category: 'messaging' },
    ];

    unverifiedPlatforms.forEach(p => {
        results.push({
            title: `${p.name} — @${username}`,
            url: p.url,
            description: `Check if username "${username}" exists on ${p.name}`,
            category: p.category,
            platform: p.name,
            isVerified: false
        });
    });

    // Async checks for accessible platforms
    const checkPromises = PLATFORMS.map(async (platform) => {
        const targetUrl = platform.url.replace('{username}', encodedUsername);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

            const response = await fetch(targetUrl, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5'
                }
            });
            clearTimeout(timeoutId);

            let verified = false;
            let description = `Username "${username}" verified on ${platform.name}`;

            if (response.ok) {
                if (platform.isJson) {
                    const data = await response.json();
                    if (platform.name === 'Reddit' && !data.error) verified = true;
                    if (platform.name === 'HackerNews' && data && data.id) {
                        verified = true;
                        description += ` (Karma: ${data.karma})`;
                    }
                    if (platform.name === 'DockerHub' && data && data.uuid) verified = true;
                } else {
                    verified = true;
                }
            }

            if (verified) {
                let displayUrl = targetUrl;
                if (platform.name === 'Reddit') displayUrl = `https://www.reddit.com/user/${encodedUsername}`;
                if (platform.name === 'HackerNews') displayUrl = `https://news.ycombinator.com/user?id=${encodedUsername}`;
                if (platform.name === 'DockerHub') displayUrl = `https://hub.docker.com/u/${encodedUsername}`;

                return {
                    title: `${platform.name} Verified — @${username}`,
                    url: displayUrl,
                    description: description,
                    category: platform.category,
                    platform: platform.name,
                    isVerified: true
                };
            }
        } catch (error) {
            // Ignore fetch errors
        }
        return null;
    });

    const verifiedResults = await Promise.all(checkPromises);

    verifiedResults.forEach(res => {
        if (res) results.push(res);
    });

    return {
        connectorType: 'username_search',
        query: username,
        results,
        generatedAt: new Date().toISOString(),
    };
}
