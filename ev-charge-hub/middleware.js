// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// Add this at the top of your middleware.js
import fs from 'fs';

// Then in your middleware function
fs.appendFileSync('middleware-logs.txt', `${new Date().toISOString()} - Path: ${path}\n`);

export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  console.log("Middleware processing path:", path);

  // Check if the path is for public resources
  const isPublicFile = path.startsWith('/_next') ||
                       path.startsWith('/favicon.ico') ||
                       path.includes('/api/') ||
                       path.includes('.jpg') ||
                       path.includes('.png') ||
                       path.includes('.svg') ||
                       path.includes('.ico') ||
                       path.includes('sitemap.xml') ||
                       path.includes('robots.txt');

  // If it's a public file, allow the request to proceed
  if (isPublicFile) {
    return NextResponse.next();
  }

  // For other routes, check authentication
  const token = request.cookies.get('token')?.value;

  // Define route categories
  const isProtectedRoute = path.startsWith('/dashboard') ||
                           path.startsWith('/profile') ||
                           path.startsWith('/admin');

  const isHomePage = path === '/';
  const isLoginPage = path === '/login' || path === '/register';

  // Allow login/register pages without token
  if (isLoginPage) {
    return NextResponse.next();
  }

  // If there's no token and trying to access a protected route, redirect to login
  if (!token && isProtectedRoute) {
    console.log("Redirecting to login: No token for protected route");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there is a token and it's a protected route, verify the token
  if (token && isProtectedRoute) {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      // Token is valid, allow access to protected route
      return NextResponse.next();
    } catch (error) {
      // Token verification failed, redirect to login
      console.log("Redirecting to login: Invalid token");
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For all other routes (not home, not login, not protected, not public files)
  // Redirect to home page
  if (!isHomePage && !isLoginPage && !isProtectedRoute) {
    console.log("Redirecting to home: Unauthorized path access", path);
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed for the home page and any case not handled above
  return NextResponse.next();
}

// Configure middleware to run on all paths except excluded ones
export const config = {
  matcher: [
    // Match all request paths except for the ones we explicitly exclude
    // This ensures our middleware runs on all routes we want
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};