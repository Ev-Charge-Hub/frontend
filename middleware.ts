// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /login, /admin)
  const path = request.nextUrl.pathname;

  // Only allow the home page (/) and any static assets or API routes
  const isHomePage = path === '/';
  const isStaticFile = path.startsWith('/_next') ||
                       path.startsWith('/favicon.ico') ||
                       path.startsWith('/api/');

  // If the request is not for the home page and not for static assets, redirect to home
  if (!isHomePage && !isStaticFile) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue with the request if it's allowed
  return NextResponse.next();
}

// Configure which paths should be processed by the middleware
// In this case, we want to check all paths except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};