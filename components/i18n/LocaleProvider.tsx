'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Dictionary } from '@/lib/i18n/types';
import type { Locale } from '@/lib/i18n/config';
import { isRtlLocale } from '@/lib/i18n/config';
import { tools as enTools } from '@/data/tools';
import { categories as enCategories } from '@/data/categories';
import type { Tool } from '@/data/tools';
import type { Category } from '@/data/categories';

interface LocaleContextValue {
  locale: Locale;
  isRtl: boolean;
  t: Dictionary;
  tools: Tool[];
  categories: Category[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function localizeToolList(tools: Tool[], dict: Dictionary): Tool[] {
  if (dict.toolsContent && Object.keys(dict.toolsContent).length === 0) return tools;
  return tools.map((tool) => {
    const t = dict.toolsContent[tool.id];
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
  });
}

function localizeCategoryList(categories: Category[], dict: Dictionary): Category[] {
  if (dict.categoriesContent && Object.keys(dict.categoriesContent).length === 0) return categories;
  return categories.map((category) => {
    const c = dict.categoriesContent[category.id];
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
  });
}

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      isRtl: isRtlLocale(locale),
      t: dict,
      tools: localizeToolList(enTools, dict),
      categories: localizeCategoryList(enCategories, dict),
    }),
    [locale, dict]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocaleContext must be used within a LocaleProvider');
  return ctx;
}

/** Returns the localized UI labels for a specific tool (e.g. `toolUi.tools['pdf-splitter']`). */
export function useToolLabels(slug: string): Record<string, string> {
  const { t } = useLocaleContext();
  const key = slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  return t.toolUi.tools[key] ?? {};
}