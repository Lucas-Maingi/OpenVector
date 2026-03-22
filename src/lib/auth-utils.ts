import { prisma } from './prisma';
import { createClient } from './supabase/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export const GUEST_ID_BASE = '';

/**
 * Gets the effective user ID for the current request.
 * Prioritizes Supabase Auth, then falls back to a session-bound Guest ID in cookies.
 */
export async function getEffectiveUserId(): Promise<{ id: string; email: string; isGuest: boolean }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        return { 
            id: user.id, 
            email: user.email || '', 
            isGuest: false 
        };
    }

    // Guest Mode: Check for a session cookie OR a middleware-injected header
    const cookieStore = await cookies();
    const guestId = cookieStore.get('ale_guest_id')?.value;
    
    // In Next.js, the middleware can set headers on the request before it reaches the API route.
    // This allows us to bridge the "First Request Gap" where the cookie isn't in the request yet.
    const headerStore = await import('next/headers').then(m => m.headers());
    const headerGuestId = (await headerStore).get('x-ale-guest-id');

    const identity = guestId || headerGuestId || `temp-${randomUUID()}`;

    console.log(`[Auth] Unified Identity: ${user ? 'Authenticated' : 'Guest'} - ${user?.id || identity}`);

    return { 
        id: identity, 
        email: `${identity}@openvector.io`, 
        isGuest: true 
    };
}

/**
 * Validates that the current user owns the specified investigation.
 * Throws an error or returns false if unauthorized.
 */
export async function validateOwnership(investigationId: string, userId: string): Promise<boolean> {
    try {
        const investigation = await prisma.investigation.findUnique({
            where: { id: investigationId },
            select: { userId: true }
        });

        if (!investigation) return false;
        return investigation.userId === userId;
    } catch (err) {
        console.error('[Security] Ownership validation failed:', err);
        return false;
    }
}
