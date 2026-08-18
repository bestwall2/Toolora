import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { SITE_URL } from '@/lib/seo';
import { locales, localeHrefLangs, withLocale } from '@/lib/i18n/config';

function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHrefLangs[l]] = `${SITE_URL}${withLocale(l, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${withLocale('en', path)}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths = ['/', '/tools', '/about', '/contact', '/privacy', '/terms'];
  const categoryPaths = categories.map((cat) => `/tools/${cat.slug}`);
  const toolPaths = tools.map((tool) => `/tools/${tool.category}/${tool.slug}`);

  const routeEntries: MetadataRoute.Sitemap = [...staticPaths, ...categoryPaths, ...toolPaths].flatMap(
    (path) =>
      locales.map((l) => ({
        url: `${SITE_URL}${withLocale(l, path)}`,
        lastModified,
        changeFrequency: (path === '/' || path === '/tools' ? 'weekly' : path.startsWith('/tools/') ? 'weekly' : 'monthly') as
          | 'weekly'
          | 'monthly',
        priority: path === '/' ? 1.0 : path === '/tools' ? 0.9 : path.startsWith('/tools/') ? 0.8 : 0.5,
        alternates: { languages: languagesFor(path) },
      }))
  );

  return routeEntries;
}