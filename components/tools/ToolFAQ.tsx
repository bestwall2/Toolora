'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

export function ToolFAQ({ faqs, title = 'Frequently Asked Questions' }: { faqs: FAQ[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-start bg-card hover:bg-muted/50 transition-colors"
              aria-expanded={open === i}
            >
              <span className="font-medium text-sm text-foreground pe-4">{faq.question}</span>
              <ChevronDown
                className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform', open === i && 'rotate-180')}
              />
            </button>
            {open === i && (
              <div className="px-4 py-3.5 border-t border-border bg-muted/20 animate-fade-in">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
