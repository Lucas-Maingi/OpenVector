import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const cookieStore = await cookies();
        const guestId = cookieStore.get('ale_guest_id')?.value;
        
        if (guestId && guestId !== user.id) {
            console.log(`[Auth Sync] Automatically migrating data for ${user.email} from guest ${guestId}`);
            
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
            
            // Clear the guest cookie after successful migration
            (await cookies()).delete('ale_guest_id');
            
            return NextResponse.json({ 
                success: true, 
                message: 'Data synchronized successfully',
                migrated: true 
            });
        }
        
        return NextResponse.json({ success: true, migrated: false });
        
    } catch (error: any) {
        console.error('[Auth Sync] Failure:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
