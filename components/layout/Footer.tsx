import Link from 'next/link';
import { Zap } from 'lucide-react';
import { withLocale } from '@/lib/i18n/config';
import { getDictionary, localizeTool } from '@/lib/i18n';
import { getToolBySlug } from '@/data/tools';
import type { Locale } from '@/lib/i18n/config';

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const t = getDictionary(locale);

  const toolLinks = [
    { href: withLocale(locale, '/tools'), label: t.footer.allTools },
    { href: withLocale(locale, '/tools/image'), label: t.footer.imageTools },
    { href: withLocale(locale, '/tools/pdf'), label: t.footer.pdfTools },
    { href: withLocale(locale, '/tools/text'), label: t.footer.textTools },
    { href: withLocale(locale, '/tools/developer'), label: t.footer.developerTools },
    { href: withLocale(locale, '/tools/calculator'), label: t.footer.calculators },
  ];

  const popularSlugs = [
    'image-compressor',
    'pdf-merger',
    'word-counter',
    'json-formatter',
    'qr-code-generator',
    'image-converter',
  ];

  const popularLinks = popularSlugs.map((slug) => {
    const tool = getToolBySlug(slug);
    const localized = tool ? localizeTool(tool, locale) : undefined;
    return {
      href: withLocale(locale, `/tools/${tool?.category}/${slug}`),
      label: localized?.name ?? slug,
    };
  });

  const companyLinks = [
    { href: withLocale(locale, '/about'), label: t.footer.about },
    { href: withLocale(locale, '/contact'), label: t.footer.contact },
    { href: withLocale(locale, '/privacy'), label: t.footer.privacy },
    { href: withLocale(locale, '/terms'), label: t.footer.terms },
    { href: '/sitemap.xml', label: t.footer.sitemap },
  ];

  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={withLocale(locale, '/')} className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white fill-white" strokeWidth={0} />
              </div>
              <span className="font-semibold text-base text-foreground">Toollora</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t.footer.tagline}</p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">{t.footer.toolsTitle}</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">{t.footer.popularTitle}</h3>
            <ul className="space-y-2">
              {popularLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">{t.footer.companyTitle}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} Toollora. {t.footer.rights} {t.footer.madeWith}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground mr-2">{t.footer.browserProcessed}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}