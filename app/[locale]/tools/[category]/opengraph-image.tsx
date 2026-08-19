import { getCategoryBySlug } from '@/data/categories';
import { createOgImage, OG_SIZE } from '@/lib/og';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import { localizeCategory } from '@/lib/i18n';

export const alt = 'Toollora — free online tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const cat = getCategoryBySlug(category);
  const localized = cat ? localizeCategory(cat, current) : undefined;

  return createOgImage({
    title: localized ? localized.name : 'Online Tools',
    subtitle: localized?.description ?? 'Fast, private, browser-based tools on Toollora.',
  });
}