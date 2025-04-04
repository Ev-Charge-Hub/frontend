import { serialize } from 'cookie';

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return new Response(JSON.stringify({ message: 'Token is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Set cookie
  const headers = new Headers();
  headers.append('Set-Cookie', serialize('token', token, {
    httpOnly: true,  // Ensures the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production',  // Secure in production, allows HTTP in development
    sameSite: 'strict',  // Prevents CSRF attacks
    maxAge: 60 * 60 * 24 * 7,  // 7 days expiration
    path: '/',  // Cookie available throughout the site
  }));

  return new Response(JSON.stringify({ message: 'Token saved successfully' }), {
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