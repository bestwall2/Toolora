import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales, localeHrefLangs, withLocale } from '@/lib/i18n/config';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.toollora.online';
export const SITE_NAME = 'Toollora';

export const siteUrl = (path = ''): string => `${SITE_URL}${path}`;

/** All hreflang alternates (including x-default) for a locale-prefixed path. */
export function alternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHrefLangs[l]] = siteUrl(withLocale(l, path));
  }
  languages['x-default'] = siteUrl(withLocale('en', path));
  return languages;
}

export function generateToolMetadata(params: {
  title: string;
  description: string;
  slug: string;
  category: string;
  keywords: string[];
  locale: Locale;
}): Metadata {
  const path = `/tools/${params.category}/${params.slug}`;
  const canonicalPath = withLocale(params.locale, path);
  const canonical = siteUrl(canonicalPath);
  const ogTitle = params.title;
  const ogDescription = params.description;

  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    alternates: { canonical, languages: alternateLanguages(path) },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: localeHrefLangs[params.locale],
      images: [siteUrl(withLocale(params.locale, '/opengraph-image'))],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [siteUrl(withLocale(params.locale, '/twitter-image'))],
    },
  };
}

export function generateCategoryMetadata(params: {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  locale: Locale;
}): Metadata {
  const path = `/tools/${params.slug}`;
  const canonicalPath = withLocale(params.locale, path);
  const canonical = siteUrl(canonicalPath);
  const ogTitle = params.title;
  const ogDescription = params.description;

  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    alternates: { canonical, languages: alternateLanguages(path) },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: localeHrefLangs[params.locale],
      images: [siteUrl(withLocale(params.locale, `/tools/${params.slug}/opengraph-image`))],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [siteUrl(withLocale(params.locale, `/tools/${params.slug}/opengraph-image`))],
    },
  };
}

export function generatePageMetadata(params: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  locale: Locale;
}): Metadata {
  const path = params.path || '/';
  const canonicalPath = withLocale(params.locale, path);
  const canonical = siteUrl(canonicalPath);
  const ogTitle = params.title;
  const ogDescription = params.description;

  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    alternates: { canonical, languages: alternateLanguages(path) },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: localeHrefLangs[params.locale],
      images: [siteUrl(withLocale(params.locale, '/opengraph-image'))],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [siteUrl(withLocale(params.locale, '/twitter-image'))],
    },
  };
}