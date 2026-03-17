import { prisma } from './prisma';
import { createClient } from './supabase/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export const GUEST_ID_BASE = 'guest_';

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

    // Guest Mode: Check for a session cookie
    const cookieStore = await cookies();
    let guestId = cookieStore.get('ale_guest_id')?.value;

    if (!guestId) {
        // Create a new, random guest ID for this session
        guestId = `${GUEST_ID_BASE}${randomUUID()}`;
        // Set cookie for 30 days
        cookieStore.set('ale_guest_id', guestId, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
        });
    }

    return { 
        id: guestId, 
        email: 'guest@openvector.io', 
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
