import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/dashboard';
    const cookieStore = await cookies();
    const guestId = cookieStore.get('ale_guest_id')?.value;

    if (code) {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('[Auth Callback] Exchange failure:', error.message);
            return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url));
        }

        const user = data.user;
        if (user) {
            try {
                // Ensure user exists in Prisma
                await prisma.user.upsert({
                    where: { id: user.id },
                    update: { email: user.email || '' },
                    create: { id: user.id, email: user.email || '', role: 'analyst' }
                });

                // Identity Migration: Move guest data to the new permanent account
                if (guestId && guestId !== user.id) {
                    console.log(`[Auth Callback] Migrating data for ${user.email} from guest ${guestId}`);
                    
                    // Transactional migration to keep data integrity
                    await prisma.$transaction([
                        prisma.investigation.updateMany({
                            where: { userId: guestId },
                            data: { userId: user.id }
                        }),
                        prisma.searchLog.updateMany({
                            where: { userId: guestId },
                            data: { userId: user.id }
                        })
                    ]);
                    
                    console.log(`[Auth Callback] Migration complete for ${user.email}`);
                }
            } catch (prErr: any) {
                console.error('[Auth Callback] Prisma Sync/Migration failure:', prErr.message);
            }
        }
    }

    return NextResponse.redirect(new URL(next, request.url));
}
