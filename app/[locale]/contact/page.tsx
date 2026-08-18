import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { generatePageMetadata } from '@/lib/seo';
import { locale } from 'next/root-params';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return generatePageMetadata({
    title: `${dict.contactPage.title} — Feedback & Support`,
    description:
      'Contact Toolora with feedback, bug reports or feature requests. We read every message and reply when needed.',
    path: '/contact',
    keywords: ['contact toolora', 'toolora support', 'feature request', 'report a bug'],
    locale: current,
  });
}

export default async function ContactPage() {
  const l = await locale();
  const current = isLocale(l) ? l : defaultLocale;
  const dict = getDictionary(current);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{dict.contactPage.title}</h1>
        <p className="text-sm text-muted-foreground">{dict.contactPage.subtitle}</p>
      </div>

      <ContactForm />
    </div>
  );
}