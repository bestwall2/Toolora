'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';

export function FaqAccordion() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const { t } = useLocaleContext();
  const faqs = t.home.faqs;

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-xl bg-card overflow-hidden">
          <button
            onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-start hover:bg-muted/40 transition-colors"
          >
            <span className="font-semibold text-sm text-foreground pe-4">{faq.question}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}
            />
          </button>
          {faqOpen === i && (
            <div className="px-5 py-4 border-t border-border bg-muted/10">
              <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}