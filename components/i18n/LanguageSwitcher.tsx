'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeNames, withLocale } from '@/lib/i18n/config';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';

const LOCALE_COOKIE = 'locale';

export function LanguageSwitcher() {
  const { locale } = useLocaleContext();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (value: string) => {
    if (value === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
    const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr|es)(?=\/|$)/, '') || '/';
    router.push(withLocale(value as (typeof locales)[number], pathWithoutLocale));
    router.refresh();
  };

  return (
    <div className="relative">
      <label htmlFor="language-switcher" className="sr-only">
        Language
      </label>
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-border bg-muted/50 text-muted-foreground">
        <Globe className="w-4 h-4 shrink-0" aria-hidden />
        <select
          id="language-switcher"
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent text-sm font-medium text-foreground outline-none cursor-pointer appearance-none pr-2"
        >
          {locales.map((l) => (
            <option key={l} value={l}>
              {localeNames[l]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}