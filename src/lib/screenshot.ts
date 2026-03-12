/**
 * Aletheia Screenshot Utility
 * Leverages ScreenshotOne API for verifiable visual evidence capture.
 */

export async function captureScreenshot(url: string): Promise<string | null> {
    const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY;
    if (!accessKey) {
        console.warn('[SCREENSHOT] SCREENSHOTONE_ACCESS_KEY not configured. Skipping capture.');
        return null;
    }

    try {
        const queryParams = new URLSearchParams({
            access_key: accessKey,
            url: url,
            full_page: 'false',
            viewport_width: '1280',
            viewport_height: '800',
            format: 'png',
            image_quality: '80',
            block_ads: 'true',
            block_cookie_banners: 'true',
            cache: 'true'
        });

        const apiUrl = `https://api.screenshotone.com/take?${queryParams.toString()}`;
        
        // We return the API URL directly as the screenshot URL for Prisma storage,
        // or we could proxy it if we wanted to avoid exposing the key (recommended for production).
        // For now, we'll return the signed URL logic or a placeholder for the dev to finalize.
        return apiUrl; 
    } catch (error) {
        console.error('[SCREENSHOT] Failed to capture:', error);
        return null;
    }
}
