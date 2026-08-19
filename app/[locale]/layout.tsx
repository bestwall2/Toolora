import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { locale } from 'next/root-params';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { locales, isRtlLocale, isLocale, defaultLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);
  const dir = isRtlLocale(current) ? 'rtl' : 'ltr';

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
// Google verification metadata
    verification: {
      google: 'exAAHpiMsljDHyf5dcUDz6KESuX79fZMvd1HLDsb0p0',
    },
    title: {
      default: dict.meta.defaultTitle,
      template: '%s | Toollora',
    },
    description: dict.meta.defaultDescription,
    keywords: dict.meta.keywords,
    authors: [{ name: 'Toollora' }],
    creator: 'Toollora',
    alternates: { canonical: `/${current}` },
    openGraph: {
      type: 'website',
      locale: current,
      url: `${SITE_URL}/${current}`,
      siteName: SITE_NAME,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
    },
    other: {
      'Content-Language': dir === 'rtl' ? `${current},ar` : current,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);
  const dir = isRtlLocale(current) ? 'rtl' : 'ltr';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${current}`,
    description: dict.meta.defaultDescription,
    inLanguage: current,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${current}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/${current}`,
    },
  };

  return (
    <html lang={current} dir={dir} suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider>
          <LocaleProvider locale={current} dict={dict}>
            <JsonLd data={websiteSchema} />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer locale={current} />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}