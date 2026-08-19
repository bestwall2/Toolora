import { Metadata } from 'next';
import { tools as enTools } from '@/data/tools';
import { categories as enCategories } from '@/data/categories';
import { ToolCard } from '@/components/tools/ToolCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, siteUrl } from '@/lib/seo';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale, withLocale } from '@/lib/i18n/config';
import { getDictionary, localizeCategory, localizeTool } from '@/lib/i18n';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return generatePageMetadata({
    title: dict.toolsPage.title,
    description: dict.toolsPage.subtitle,
    path: '/tools',
    keywords: ['free online tools directory', 'image tools', 'pdf tools', 'developer tools', 'online utilities'],
    locale: current,
  });
}

function filterTools(tools: typeof enTools, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return tools;
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.keywords.some((k) => k.toLowerCase().includes(query))
  );
}

export default async function AllToolsPage({ searchParams }: PageProps) {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);
  const categories = enCategories.map((c) => localizeCategory(c, current));
  const localizedTools = enTools.map((tool) => localizeTool(tool, current));

  const { q } = await searchParams;
  const query = (typeof q === 'string' ? q : '').trim();
  const visibleTools = filterTools(localizedTools, query);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: query ? `${dict.toolsPage.searchResults} "${query}"` : dict.toolsPage.allTools,
    itemListElement: visibleTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: siteUrl(withLocale(current, `/tools/${tool.category}/${tool.slug}`)),
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={itemListSchema} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link href={withLocale(current, '/')} className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" />
          {dict.toolPage.home}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{dict.toolsPage.allTools}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {query ? `${dict.toolsPage.searchResults} "${query}"` : dict.toolsPage.title}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {query
            ? `"${query}" — ${dict.toolsPage.showingResults} ${visibleTools.length}`
            : dict.toolsPage.subtitle}
        </p>
      </div>

      {/* Categories quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={withLocale(current, `/tools/${cat.slug}`)}
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors font-medium"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {visibleTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTools.map((tool) => {
            const cat = categories.find((c) => c.slug === tool.category);
            return (
              <ToolCard
                key={tool.id}
                tool={tool}
                locale={current}
                categoryName={cat?.name}
                categoryColor={cat?.color}
                categoryBg={cat?.bgColor}
                popularLabel={dict.common.popular}
                useToolLabel={dict.common.useTool}
                freeLabel={dict.common.free}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-sm text-muted-foreground">
            {dict.toolsPage.noResults} &ldquo;{query}&rdquo;.
          </p>
          <Link
            href={withLocale(current, '/tools')}
            className="text-xs text-primary font-semibold hover:underline mt-2 inline-block"
          >
            {dict.toolsPage.viewAllTools}
          </Link>
        </div>
      )}
    </div>
  );
}