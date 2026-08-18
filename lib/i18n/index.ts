import type { Locale } from './config';
import { locales } from './config';
import en from './dictionaries/en';
import ar from './dictionaries/ar';
import fr from './dictionaries/fr';
import es from './dictionaries/es';
import type { Dictionary } from './types';
import type { Tool } from '@/data/tools';
import type { Category } from '@/data/categories';

const dictionaries: Record<Locale, Dictionary> = { en, ar, fr, es };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const isDefaultLocale = (locale: Locale): boolean => locale === 'en';

/**
 * Returns tool content localized for the given locale, falling back to the
 * English copy stored in `data/tools.ts` when no translation exists.
 */
export function localizeTool(tool: Tool, locale: Locale): Tool {
  if (isDefaultLocale(locale)) return tool;
  const t = dictionaries[locale].toolsContent[tool.id];
  if (!t) return tool;
  return {
    ...tool,
    name: t.name,
    description: t.description,
    longDescription: t.longDescription,
    keywords: t.keywords,
    seoTitle: t.seoTitle,
    seoDescription: t.seoDescription,
    content: t.content,
    howToSteps: t.howToSteps,
    faq: t.faq,
    badge: t.badge ?? tool.badge,
  };
}

/** Returns category content localized for the given locale. */
export function localizeCategory(category: Category, locale: Locale): Category {
  if (isDefaultLocale(locale)) return category;
  const c = dictionaries[locale].categoriesContent[category.id];
  if (!c) return category;
  return {
    ...category,
    name: c.name,
    description: c.description,
    seoTitle: c.seoTitle,
    seoDescription: c.seoDescription,
    longDescription: c.longDescription,
    keywords: c.keywords,
  };
}

export { locales };
export type { Locale, Dictionary };