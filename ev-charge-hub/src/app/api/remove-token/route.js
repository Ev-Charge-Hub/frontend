import { serialize } from 'cookie';

export async function GET(req) {
  // Set cookie to expire in the past, effectively removing it
  const headers = new Headers();
  headers.append('Set-Cookie', serialize('token', '', {
    httpOnly: true,  // Cookie still not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production',  // Secure in production
    sameSite: 'strict',  // Maintains CSRF protection
    maxAge: 0,      // Immediately expire the cookie
    expires: new Date(0),  // Adding an explicit expiration date in the past
    path: '/',       // Ensure the cookie is deleted across the entire site
  }));

  return new Response(JSON.stringify({ message: 'Token removed successfully' }), {
    status: 200,
    headers: {
      ...Object.fromEntries(headers.entries()),
      'Content-Type': 'application/json'
    }
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 200 });
}