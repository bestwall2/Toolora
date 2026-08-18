export const locales = ['en', 'ar', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const rtlLocales: readonly Locale[] = ['ar'];

export const isRtlLocale = (locale: Locale): boolean => rtlLocales.includes(locale);

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español',
};

export const localeHrefLangs: Record<Locale, string> = {
  en: 'en',
  ar: 'ar',
  fr: 'fr',
  es: 'es',
};

/** e.g. /en/contact */
export const withLocale = (locale: Locale, path: string): string =>
  path === '/' ? `/${locale}` : `/${locale}${path.startsWith('/') ? path : `/${path}`}`;