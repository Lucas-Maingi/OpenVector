import { ConnectorResult, SearchResult } from './types';

const PLATFORMS = [
    { name: 'GitHub', url: 'https://github.com/{username}', category: 'development' },
    { name: 'Twitter/X', url: 'https://x.com/{username}', category: 'social' },
    { name: 'Instagram', url: 'https://instagram.com/{username}', category: 'social' },
    { name: 'Reddit', url: 'https://reddit.com/user/{username}', category: 'social' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/{username}', category: 'professional' },
    { name: 'TikTok', url: 'https://tiktok.com/@{username}', category: 'social' },
    { name: 'YouTube', url: 'https://youtube.com/@{username}', category: 'media' },
    { name: 'Facebook', url: 'https://facebook.com/{username}', category: 'social' },
    { name: 'Pinterest', url: 'https://pinterest.com/{username}', category: 'social' },
    { name: 'Twitch', url: 'https://twitch.tv/{username}', category: 'gaming' },
    { name: 'Steam', url: 'https://steamcommunity.com/id/{username}', category: 'gaming' },
    { name: 'Snapchat', url: 'https://snapchat.com/add/{username}', category: 'social' },
    { name: 'Telegram', url: 'https://t.me/{username}', category: 'messaging' },
    { name: 'Medium', url: 'https://medium.com/@{username}', category: 'blogging' },
    { name: 'Dev.to', url: 'https://dev.to/{username}', category: 'development' },
    { name: 'Keybase', url: 'https://keybase.io/{username}', category: 'security' },
    { name: 'GitLab', url: 'https://gitlab.com/{username}', category: 'development' },
    { name: 'Bitbucket', url: 'https://bitbucket.org/{username}', category: 'development' },
    { name: 'HackerNews', url: 'https://news.ycombinator.com/user?id={username}', category: 'tech' },
    { name: 'Patreon', url: 'https://patreon.com/{username}', category: 'content' },
    { name: 'Fiverr', url: 'https://fiverr.com/{username}', category: 'professional' },
    { name: 'Upwork', url: 'https://upwork.com/freelancers/{username}', category: 'professional' },
    { name: 'DockerHub', url: 'https://hub.docker.com/u/{username}', category: 'development' },
    { name: 'npm', url: 'https://npmjs.com/~{username}', category: 'development' },
];

export function usernameSearch(username: string): ConnectorResult {
    const results: SearchResult[] = PLATFORMS.map((platform) => ({
        title: `${platform.name} — @${username}`,
        url: platform.url.replace('{username}', encodeURIComponent(username)),
        description: `Check if username "${username}" exists on ${platform.name}`,
        category: platform.category,
        platform: platform.name,
    }));

    // Also add a Google search for the username
    results.push({
        title: `Google: "${username}" across all platforms`,
        url: `https://www.google.com/search?q="${encodeURIComponent(username)}"`,
        description: `Google search for the exact username "${username}"`,
        category: 'search_engine',
        platform: 'Google',
    });

    return {
        connectorType: 'username_search',
        query: username,
        results,
        generatedAt: new Date().toISOString(),
    };
}
