import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return generatePageMetadata({
    title: dict.termsPage.title,
    description:
      'Review the terms of service for using Toollora. Free client-side tools provided with no liabilities.',
    path: '/terms',
    keywords: ['terms of service', 'terms of use', 'toollora terms'],
    locale: current,
  });
}

export default async function TermsPage() {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{dict.termsPage.title}</h1>
      <p className="text-xs text-muted-foreground">
        {dict.termsPage.updated} August 17, 2026
      </p>

      <div className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed space-y-6">
        {dict.termsPage.sections.map((section, i) => (
          <section key={i} className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              {i + 1}. {section.heading}
            </h2>
            {section.body.map((paragraph, j) => (
              <p key={j}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}