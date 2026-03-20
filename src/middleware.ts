import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const guestId = request.cookies.get('ale_guest_id')?.value;

  // If no guest cookie exists, we provision one immediately.
  // This prevents "identity drift" between Server Components and APIs.
  if (!guestId) {
    const newGuestId = crypto.randomUUID();
    response.cookies.set('ale_guest_id', newGuestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }

  return response;
}

// Ensure it runs on all dashboard and API routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
