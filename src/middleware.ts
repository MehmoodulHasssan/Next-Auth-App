import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isPublicPath =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup';
  const profilePath = request.nextUrl.pathname.startsWith('/profile');
  const cookie = request.cookies.get('token');

  if (cookie && cookie.value !== '' && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!cookie && profilePath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = ['/profile/:id*', '/', '/login', 'signup'];
