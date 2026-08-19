import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategoryBySlug, categories as enCategories } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { generateCategoryMetadata, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ToolCard } from '@/components/tools/ToolCard';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale, withLocale } from '@/lib/i18n/config';
import { getDictionary, localizeCategory, localizeTool } from '@/lib/i18n';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return enCategories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const cat = getCategoryBySlug(category);

  if (!cat) return {};

  const localizedCat = localizeCategory(cat, current);

  return generateCategoryMetadata({
    title: localizedCat.seoTitle,
    description: localizedCat.seoDescription,
    slug: localizedCat.slug,
    keywords: localizedCat.keywords,
    locale: current,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);
  const cat = getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const localizedCat = localizeCategory(cat, current);
  const categoryTools = getToolsByCategory(category).map((tool) => localizeTool(tool, current));

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: localizedCat.seoTitle,
    url: siteUrl(withLocale(current, `/tools/${localizedCat.slug}`)),
    description: localizedCat.seoDescription,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: dict.toolPage.home, item: siteUrl(withLocale(current, '/')) },
        { '@type': 'ListItem', position: 2, name: localizedCat.name, item: siteUrl(withLocale(current, `/tools/${localizedCat.slug}`)) },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryTools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: siteUrl(withLocale(current, `/tools/${tool.category}/${tool.slug}`)),
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={collectionSchema} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link href={withLocale(current, '/')} className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" />
          {dict.toolPage.home}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={withLocale(current, '/tools')} className="hover:text-foreground transition-colors">
          {dict.toolPage.allTools}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{localizedCat.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{localizedCat.name}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{localizedCat.description}</p>
      </div>

      {categoryTools.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-sm text-muted-foreground">{dict.categoryPage.emptyTitle}</p>
          <Link
            href={withLocale(current, '/tools')}
            className="text-xs text-primary font-semibold hover:underline mt-2 inline-block"
          >
            {dict.toolsPage.viewAllTools}
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                locale={current}
                categoryName={localizedCat.name}
                categoryColor={localizedCat.color}
                categoryBg={localizedCat.bgColor}
                popularLabel={dict.common.popular}
                useToolLabel={dict.common.useTool}
                freeLabel={dict.common.free}
              />
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm text-muted-foreground leading-relaxed">{localizedCat.longDescription}</p>
          </div>
        </>
      )}
    </div>
  );
}