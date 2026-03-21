import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';

export async function PATCH(request: Request) {
    try {
        const { id: userId, isGuest } = await getEffectiveUserId();
        
        if (isGuest) {
            return NextResponse.json({ error: 'Authentication required for profile updates' }, { status: 401 });
        }

        const body = await request.json();
        const { name, avatarUrl } = body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name !== undefined ? name : undefined,
                avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                plan: true,
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.error('[API Profile Patch] Error:', error.message);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
