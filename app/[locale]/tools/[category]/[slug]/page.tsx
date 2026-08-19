import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getToolBySlug, getRelatedTools, tools as enTools } from '@/data/tools';
import { getCategoryBySlug } from '@/data/categories';
import { generateToolMetadata, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolFAQ } from '@/components/tools/ToolFAQ';
import { HowToUse } from '@/components/tools/HowToUse';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { ToolComponent } from '@/components/tools/ToolComponent';
import { PrivacyBadge } from '@/components/tools/PrivacyBadge';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale, withLocale } from '@/lib/i18n/config';
import { getDictionary, localizeCategory, localizeTool } from '@/lib/i18n';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return enTools.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const localized = localizeTool(tool, current);

  return generateToolMetadata({
    title: localized.seoTitle,
    description: localized.seoDescription,
    slug: localized.slug,
    category: localized.category,
    keywords: localized.keywords,
    locale: current,
  });
}

export default async function ToolPage({ params }: PageProps) {
  const { category, slug } = await params;
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);
  const tool = getToolBySlug(slug);

  if (!tool || tool.category !== category) {
    notFound();
  }

  const localized = localizeTool(tool, current);
  const categoryInfo = getCategoryBySlug(category);
  const localizedCategory = categoryInfo ? localizeCategory(categoryInfo, current) : undefined;
  const related = getRelatedTools(tool).map((t) => localizeTool(t, current));

  const toolUrl = siteUrl(withLocale(current, `/tools/${category}/${tool.slug}`));

  // Structured Schema Markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.toolPage.home, item: siteUrl(withLocale(current, '/')) },
      {
        '@type': 'ListItem',
        position: 2,
        name: localizedCategory?.name || category,
        item: siteUrl(withLocale(current, `/tools/${category}`)),
      },
      { '@type': 'ListItem', position: 3, name: localized.name, item: toolUrl },
    ],
  };

  const faqSchema = localized.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: localized.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: localized.name,
    url: toolUrl,
    description: localized.seoDescription,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: localized.keywords.join(', '),
    inLanguage: current,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={softwareSchema} />

      <ToolLayout
        homeLabel={dict.toolPage.home}
        browserBasedLabel={dict.toolPage.browserBased}
        breadcrumbs={[
          { label: dict.toolPage.allTools, href: withLocale(current, '/tools') },
          { label: localizedCategory?.name || category, href: withLocale(current, `/tools/${category}`) },
          { label: localized.name },
        ]}
        title={localized.name}
        description={localized.longDescription}
        isBrowserSide={tool.isBrowserSide}
        badge={localized.badge}
      >
        <div className="space-y-10">
          {/* Tool Container */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <ToolComponent slug={tool.slug} />
            <PrivacyBadge
              text={dict.toolPage.privacyBadge}
              proofLabel={dict.toolPage.privacyProofLink}
              proofHref={withLocale(current, '/privacy-proof')}
            />
          </div>

          {/* About this tool */}
          <section className="max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {dict.toolPage.about} {localized.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{localized.content}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-10">
            <HowToUse steps={localized.howToSteps} title={dict.toolPage.howToUse} />
            {localized.faq.length > 0 && <ToolFAQ faqs={localized.faq} title={dict.toolPage.faqTitle} />}
          </div>

          <RelatedTools tools={related} title={dict.toolPage.peopleAlsoUse} locale={current} />
        </div>
      </ToolLayout>
    </>
  );
}