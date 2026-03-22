import { ConnectorResult, SearchResult } from './types';

/**
 * WhatsMyName Connector — high-fidelity username scouting across social layers.
 * Iterates through a curated list of high-probability platforms.
 */
export async function whatsMyName(username: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];
    const cleanUsername = username.trim().toLowerCase();

    const platforms = [
        { name: 'GitHub', url: `https://github.com/${cleanUsername}` },
        { name: 'Reddit', url: `https://www.reddit.com/user/${cleanUsername}` },
        { name: 'Instagram', url: `https://www.instagram.com/${cleanUsername}/` },
        { name: 'Twitter/X', url: `https://twitter.com/${cleanUsername}` },
        { name: 'Pinterest', url: `https://www.pinterest.com/${cleanUsername}/` },
        { name: 'Medium', url: `https://medium.com/@${cleanUsername}` },
        { name: 'Linktree', url: `https://linktr.ee/${cleanUsername}` },
        { name: 'Steam', url: `https://steamcommunity.com/id/${cleanUsername}` }
    ];

    const checkPlatform = async (p: { name: string, url: string }) => {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(p.url, { 
                method: 'GET',
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
                signal: controller.signal 
            }).finally(() => clearTimeout(id));

            if (res.ok) {
                results.push({
                    title: `${p.name} Profile — ${cleanUsername}`,
                    url: p.url,
                    description: `Confirmed account presence on ${p.name}. Identifier match detected.`,
                    category: 'social',
                    platform: p.name,
                    confidenceScore: 0.85,
                    confidenceLabel: 'HIGH'
                });
            }
        } catch { /* skip */ }
    };

    // Execute in parallel chunks of 4 to avoid rate limits
    const chunks = [];
    for (let i = 0; i < platforms.length; i += 4) {
        chunks.push(platforms.slice(i, i + 4));
    }

    for (const chunk of chunks) {
        await Promise.allSettled(chunk.map(checkPlatform));
    }

    return {
        connectorType: 'whatsmyname',
        query: cleanUsername,
        results,
        generatedAt: new Date().toISOString(),
    };
}
