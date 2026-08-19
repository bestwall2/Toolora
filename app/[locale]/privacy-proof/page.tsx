import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, SearchCheck, Cpu, ListChecks } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale, withLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return generatePageMetadata({
    title: dict.privacyProofPage.title,
    description: dict.privacyProofPage.metaDescription,
    path: '/privacy-proof',
    keywords: [
      'privacy proof',
      'client side processing',
      'no upload',
      'browser processing',
      'data privacy',
      'privacy verification',
    ],
    locale: current,
  });
}

export default async function PrivacyProofPage() {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  const iconClass = 'w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-900 bg-green-50/70 dark:bg-green-950/20 px-3 py-1">
          <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
          <span className="text-xs font-semibold text-green-700 dark:text-green-400">
            {dict.toolPage.browserBased}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          {dict.privacyProofPage.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed">{dict.privacyProofPage.subtitle}</p>
      </header>

      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <SearchCheck className={iconClass} aria-hidden="true" />
          {dict.privacyProofPage.verifyTitle}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{dict.privacyProofPage.verifyIntro}</p>
        <ol className="space-y-3">
          {dict.privacyProofPage.verifySteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Cpu className={iconClass} aria-hidden="true" />
          {dict.privacyProofPage.howTitle}
        </h2>
        {dict.privacyProofPage.howBody.map((paragraph, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ListChecks className={iconClass} aria-hidden="true" />
          {dict.privacyProofPage.guaranteesTitle}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {dict.privacyProofPage.guarantees.map((g) => (
            <div key={g.title} className="rounded-xl border border-border bg-background p-4">
              <h3 className="text-sm font-bold text-foreground mb-1">{g.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50/70 dark:bg-green-950/20 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 space-y-1">
          <h2 className="text-lg font-bold text-foreground">{dict.privacyProofPage.ctaTitle}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{dict.privacyProofPage.ctaBody}</p>
        </div>
        <Link
          href={withLocale(current, '/tools')}
          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          {dict.privacyProofPage.ctaButton}
        </Link>
      </section>
    </div>
  );
}