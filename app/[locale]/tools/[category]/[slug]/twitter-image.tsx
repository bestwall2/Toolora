import { getToolBySlug } from '@/data/tools';
import { createOgImage, OG_SIZE } from '@/lib/og';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import { localizeTool } from '@/lib/i18n';

export const alt = 'Toolora — free online tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const tool = getToolBySlug(slug);
  const localized = tool ? localizeTool(tool, current) : undefined;

  return createOgImage({
    title: localized?.name ?? 'Online Tools',
    subtitle: localized?.seoDescription ?? 'Fast, private, browser-based tools on Toolora.',
  });
}