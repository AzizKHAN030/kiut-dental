import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLocaleFromPath, isLocale, getDefaultLocale, getLocalizedPath } from './lib/i18n';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const DEFAULT_LOCALE = getDefaultLocale();
const SUPPORTED_LOCALES = ['en', 'ru'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const pathLocale = getLocaleFromPath(pathname);
  
  // If pathname has a locale, validate it and proceed
  if (pathLocale && isLocale(pathLocale)) {
    const response = NextResponse.next();
    
    // Set locale cookie
    response.cookies.set(LOCALE_COOKIE_NAME, pathLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    // Add locale to request headers
    response.headers.set('x-locale', pathLocale);
    
    return response;
  }

  // No locale in path - need to redirect
  // Get locale from cookie or detect from Accept-Language header
  let locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    // Try to detect from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      // Parse Accept-Language header (e.g., "en-US,en;q=0.9,ru;q=0.8")
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0]);
      
      // Find first supported locale
      locale = languages.find(lang => SUPPORTED_LOCALES.includes(lang)) || DEFAULT_LOCALE;
    } else {
      locale = DEFAULT_LOCALE;
    }
  }

  // Redirect to localized path
  const localizedPath = getLocalizedPath(pathname, locale);
  const url = request.nextUrl.clone();
  url.pathname = localizedPath;
  
  const response = NextResponse.redirect(url);
  
  // Set locale cookie
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
  
  // Add locale to request headers
  response.headers.set('x-locale', locale);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static files (files with extensions)
     * - favicon.ico
     */
    '/((?!api|_next|.*\\..*|favicon.ico).*)',
  ],
};
