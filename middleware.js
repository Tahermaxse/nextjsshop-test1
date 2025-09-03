import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Skip middleware completely for preview routes to allow iframe embedding
  if (pathname.startsWith('/templates/') && pathname.endsWith('/preview')) {
    return NextResponse.next();
  }
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // API Route Protection - Require authentication for sensitive APIs
  if (pathname.startsWith('/api/')) {
    // Allow public APIs (auth endpoints, etc.)
    const publicApis = [
      '/api/auth',
      '/api/signup',
      '/api/login',
      '/api/verify',
      '/api/forgot-password',
      '/api/reset-password',
      '/api/check',
      '/api/components',
      '/api/templates',
      '/api/recentcomponents',
      '/api/recenttemplates',
      '/api/sitemap.xml',
      '/api/comments',
      '/api/template-comments',
      '/api/contact-requests',
      '/api/templates/category',
      '/api/components/category',
      '/api/cookie-consent'
    ];

    const isPublicApi = publicApis.some(api => pathname.startsWith(api));
    
    if (!isPublicApi && !token) {
      console.warn(`Unauthorized API access attempt: ${pathname}`);
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // If user is not logged in and trying to access protected routes
  if (!token) {
    if (pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (!token) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/fuck-you', req.url));
    }
  }

  // If user is logged in but not an admin trying to access admin routes
  if (token && pathname.startsWith('/admin')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/fuck-you', req.url));
    }
  }

  // If user is logged in, prevent access to login & signup pages
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow access for authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ]
};