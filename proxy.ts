import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales } from '@/lib/i18n/config';

function getLocaleFromRequest(request: NextRequest): string {
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const part of acceptLanguage.split(',')) {
      const tag = part.split(';')[0].trim().toLowerCase();
      const code = tag.split('-')[0];
      if (isLocale(code)) return code;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (static files)
     * - api (API routes)
     * - favicon.ico
     * - public files with an extension (images, fonts, etc.)
     * - sitemap.xml, robots.txt, manifest.webmanifest
     */
    '/((?!_next|api|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|css|js)$).*)',
  ],
};