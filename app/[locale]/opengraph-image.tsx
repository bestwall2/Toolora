import { createOgImage, OG_SIZE } from '@/lib/og';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

export const alt = 'Toolora — Free online tools for everyday tasks';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return createOgImage({
    title: dict.meta.defaultTitle,
    subtitle: dict.meta.defaultDescription,
  });
}