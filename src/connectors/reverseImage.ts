import { ConnectorResult, SearchResult } from './types';

export async function reverseImageSearch(imageUrl?: string): Promise<ConnectorResult> {
    const results: SearchResult[] = [];

    if (imageUrl) {
        const encodedUrl = encodeURIComponent(imageUrl);

        results.push(
            {
                title: 'Google Lens — Reverse Image Search',
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
                title: 'Yandex Images — Reverse Search',
                url: `https://yandex.com/images/search?rpt=imageview&url=${encodedUrl}`,
                description: 'Yandex reverse image search (strong for face matching)',
                category: 'image_search',
                platform: 'Yandex',
                confidenceScore: 0.80,
                confidenceLabel: 'HIGH'
            },
            {
                title: 'TinEye — Image Origin Finder',
                url: `https://tineye.com/search?url=${encodedUrl}`,
                description: 'Find where this image was first published and how it spread',
                category: 'image_search',
                platform: 'TinEye',
                confidenceScore: 0.85,
                confidenceLabel: 'HIGH'
            }
        );
    } else {
        // Manual upload instructions
        results.push(
            {
                title: 'Google Lens — Upload Image',
                url: 'https://lens.google.com/',
                description: 'Click the camera icon to upload an image for reverse search',
                category: 'image_search',
                platform: 'Google Lens',
                confidenceScore: 0.70,
                confidenceLabel: 'MEDIUM'
            },
            {
                title: 'Bing Visual Search — Upload',
                url: 'https://www.bing.com/visualsearch',
                description: 'Upload an image to find visually similar results and sources',
                category: 'image_search',
                platform: 'Bing',
                confidenceScore: 0.70,
                confidenceLabel: 'MEDIUM'
            },
            {
                title: 'Yandex Images — Upload',
                url: 'https://yandex.com/images/',
                description: 'Yandex reverse image search — excellent for face recognition',
                category: 'image_search',
                platform: 'Yandex',
                confidenceScore: 0.80,
                confidenceLabel: 'HIGH'
            },
            {
                title: 'TinEye — Upload',
                url: 'https://tineye.com/',
                description: 'Find original source, modified versions, and spread of an image',
                category: 'image_search',
                platform: 'TinEye',
                confidenceScore: 0.85,
                confidenceLabel: 'HIGH'
            },
            {
                title: 'PimEyes — Face Search',
                url: 'https://pimeyes.com/',
                description: 'Face recognition search across public web photos (manual upload)',
                category: 'image_search',
                platform: 'PimEyes',
                confidenceScore: 0.90,
                confidenceLabel: 'HIGH'
            },
            {
                title: 'Getty Images Reverse Search',
                url: 'https://www.gettyimages.com/image-search/reverse-image/',
                description: 'Check if image is a stock photo',
                category: 'image_search',
                platform: 'Getty',
                confidenceScore: 0.60,
                confidenceLabel: 'MEDIUM'
            }
        );
    }

    return {
        connectorType: 'reverse_image',
        query: imageUrl || 'manual_upload',
        results,
        generatedAt: new Date().toISOString(),
    };
}
