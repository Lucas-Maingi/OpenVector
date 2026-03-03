// Simple in-memory rate limiter for API routes
// In production, replace with Redis-backed solution

interface RateLimitStore {
    [key: string]: { count: number; resetAt: number };
}

const store: RateLimitStore = {};

interface RateLimitOptions {
    limit?: number;       // requests per window
    windowMs?: number;    // window size in ms
}

export function rateLimit(key: string, options: RateLimitOptions = {}) {
    const { limit = 10, windowMs = 60000 } = options;
    const now = Date.now();

    if (!store[key] || store[key].resetAt < now) {
        store[key] = { count: 1, resetAt: now + windowMs };
        return { success: true, remaining: limit - 1 };
    }

    store[key].count++;

    if (store[key].count > limit) {
        return {
            success: false,
            remaining: 0,
            resetAt: store[key].resetAt,
        };
    }

    return {
        success: true,
        remaining: limit - store[key].count,
        resetAt: store[key].resetAt,
    };
}

export function getRateLimitKey(userId: string, action: string) {
    return `${userId}:${action}`;
}
