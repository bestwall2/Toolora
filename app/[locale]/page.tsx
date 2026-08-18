import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Shield, Smartphone } from 'lucide-react';
import { locale } from 'next/root-params';
import { JsonLd } from '@/components/seo/JsonLd';
import { HomeSearch } from '@/components/home/HomeSearch';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { ToolCard } from '@/components/tools/ToolCard';
import { categories as enCategories } from '@/data/categories';
import { getPopularTools } from '@/data/tools';
import { isLocale, defaultLocale, withLocale } from '@/lib/i18n/config';
import { getDictionary, localizeCategory, localizeTool } from '@/lib/i18n';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return generatePageMetadata({
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    path: '/',
    keywords: dict.meta.keywords,
    locale: current,
  });
}

const popularQuickLinkSlugs = ['image/image-compressor', 'pdf/pdf-merger', 'text/word-counter', 'developer/json-formatter', 'qr/qr-code-generator'];

export default async function HomePage() {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);
  const categories = enCategories.map((c) => localizeCategory(c, current));
  const popular = getPopularTools().map((tool) => localizeTool(tool, current));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.home.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const popularQuickLinks = popularQuickLinkSlugs.map((slugPath) => ({
    slug: slugPath,
    label: (() => {
      const tool = popular.find((t) => `${t.category}/${t.slug}` === slugPath);
      return tool?.name ?? slugPath;
    })(),
  }));

  const whyChooseFeatures = [
    { icon: Shield, title: dict.home.whyFeatures[0].title, desc: dict.home.whyFeatures[0].desc },
    { icon: Zap, title: dict.home.whyFeatures[1].title, desc: dict.home.whyFeatures[1].desc },
    { icon: Smartphone, title: dict.home.whyFeatures[2].title, desc: dict.home.whyFeatures[2].desc },
  ];

  return (
    <>
      <JsonLd data={faqSchema} />

      <div className="relative overflow-hidden gradient-hero min-h-[60vh] flex flex-col justify-center py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground text-balance">
            {dict.home.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            {dict.home.heroSubtitle}
          </p>

          <div className="max-w-lg mx-auto">
            <HomeSearch />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{dict.home.popular}</span>
            {popularQuickLinks.map((tool) => (
              <Link
                key={tool.slug}
                href={withLocale(current, `/tools/${tool.slug}`)}
                className="hover:text-primary transition-colors hover:underline"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <section className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-foreground">{dict.home.browseByCategory}</h2>
            <p className="text-sm text-muted-foreground mt-1">{dict.home.browseByCategoryDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={withLocale(current, `/tools/${cat.slug}`)}
                  className="group p-5 rounded-2xl border border-border bg-card shadow-card hover:border-primary/20 hover:shadow-card-hover transition-all duration-200"
                >
                  <div className={`p-2.5 rounded-xl ${cat.bgColor} w-fit group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mt-4 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{dict.home.popularTools}</h2>
            <p className="text-sm text-muted-foreground mt-1">{dict.home.popularToolsDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.map((tool) => {
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
                />
              );
            })}
          </div>
        </section>

        <section className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{dict.home.whyChoose}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{dict.home.whyChooseDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyChooseFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="space-y-3 p-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{feat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{dict.home.faqTitle}</h2>
            <p className="text-sm text-muted-foreground">{dict.home.faqDesc}</p>
          </div>
          <FaqAccordion />
        </section>
      </div>
    </>
  );
}