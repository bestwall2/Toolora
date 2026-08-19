import { Metadata } from 'next';
import { Shield, Zap, RefreshCw } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, SITE_NAME, SITE_URL } from '@/lib/seo';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return generatePageMetadata({
    title: `${dict.aboutPage.title} — Discover Toollora`,
    description:
      'Learn about Toollora, a fast, privacy-focused online tools platform for processing files completely client-side in the browser.',
    path: '/about',
    keywords: ['about toollora', 'free online tools', 'privacy focused tools', 'browser based tools'],
    locale: current,
  });
}

export default async function AboutPage() {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/${current}`,
    description: dict.meta.defaultDescription,
  };

  const features = [
    { icon: Shield, title: dict.aboutPage.features[0].title, desc: dict.aboutPage.features[0].desc },
    { icon: Zap, title: dict.aboutPage.features[1].title, desc: dict.aboutPage.features[1].desc },
    { icon: RefreshCw, title: dict.aboutPage.features[2].title, desc: dict.aboutPage.features[2].desc },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <JsonLd data={organizationSchema} />

      <div className="space-y-3 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{dict.aboutPage.title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{dict.aboutPage.subtitle}</p>
      </div>

      <div className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed space-y-4">
        <p>{dict.aboutPage.p1}</p>
        <p>{dict.aboutPage.p2}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div key={feat.title} className="space-y-2 p-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{feat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}