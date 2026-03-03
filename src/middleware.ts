import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // Public routes
    const publicRoutes = ['/auth/login', '/auth/signup', '/auth/callback', '/', '/design-test'];
    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith('/auth/'));

    /* Bypass Auth for Local Verification */
    if (process.env.NODE_ENV === 'development') {
        return supabaseResponse;
    }

    if (!user && !isPublicRoute) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (user && (pathname === '/auth/login' || pathname === '/auth/signup')) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
