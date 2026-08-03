import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // HSTS (HTTP Strict Transport Security) - only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // CSP (Content Security Policy)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://maps.google.com https://maps.googleapis.com https://www.youtube.com https://www.youtube-nocookie.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' blob: https://atlanticcatering-gh.com https://*.atlanticcatering-gh.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://atlanticcatering-gh.com https://*.odoo.com",
    "frame-src 'self' https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Prevent caching of sensitive pages
  const noCachePaths = ['/api/', '/contact', '/admin'];
  if (noCachePaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Redirect www to non-www (or vice versa)
  const host = request.headers.get('host');
  if (host?.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = host.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\.png$).*)',
  ],
};