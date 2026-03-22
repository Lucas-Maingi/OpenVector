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

    // Guest Mode: Check for a session cookie assigned by middleware
    const cookieStore = await cookies();
    const guestId = cookieStore.get('ale_guest_id')?.value;
    
    // If no guest ID is found, we generate one for this specific request 
    // to ensure database operations don't collide.
    const uniqueSessionId = guestId || `guest-${randomUUID()}`;

    console.log(`[Auth] Using ${user ? 'Authenticated' : 'Guest'} identity: ${user?.id || uniqueSessionId}`);

    return { 
        id: uniqueSessionId, 
        email: `${uniqueSessionId}@openvector.io`, 
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
