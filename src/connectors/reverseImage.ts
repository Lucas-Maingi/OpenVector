import { ConnectorResult, SearchResult } from './types';

/**
 * Reverse Image Search — generates links to major visual intelligence engines.
 * No API keys required as it generates public search URLs.
 */
export async function reverseImageSearch(imageUrl?: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    const quickFetch = (url: string, opts: RequestInit = {}) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 10000);
        return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(id));
    };

    if (imageUrl) {
        const encodedUrl = encodeURIComponent(imageUrl);
        results.push(
            {
                title: 'Google Lens — Visual Search',
                url: `https://lens.google.com/uploadbyurl?url=${encodedUrl}`,
                description: 'Google Lens visual search using direct image URL',
                category: 'image_search',
                platform: 'Google Lens',
                confidenceScore: 0.70,
                confidenceLabel: 'MEDIUM'
            },
            {
                title: 'Bing Visual Search',
                url: `https://www.bing.com/images/search?view=detailv2&q=imgurl:${encodedUrl}&iss=sbi`,
                description: 'Bing reverse image search using image URL',
                category: 'image_search',
                platform: 'Bing',
                confidenceScore: 0.70,
                confidenceLabel: 'MEDIUM'
            },
            {
                title: 'Yandex Images — Face Search',
                url: `https://yandex.com/images/search?rpt=imageview&url=${encodedUrl}`,
                description: 'Yandex reverse image search (strongest face identification engine)',
                category: 'image_search',
                platform: 'Yandex',
                confidenceScore: 0.85,
                confidenceLabel: 'HIGH'
            }
        );
    } else {
        results.push({
            title: 'Visual Intelligence Hub',
            url: 'https://lens.google.com/',
            description: 'Manual image upload required for visual analysis.',
            category: 'image_search',
            platform: 'Manual Cluster'
        });
    }

    return {
        connectorType: 'reverse_image',
        query: imageUrl || 'manual_upload',
        results,
        generatedAt: new Date().toISOString(),
    };
}
