'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocaleContext();
  const form = t.contactPage.form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    // Simulate sending email / webhook
    setSubmitted(true);
    trackEvent('file_processed', { tool: 'contact-form' }); // using existing category
  };

  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
      {submitted ? (
        <div className="text-center py-8 space-y-3">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h3 className="font-semibold text-lg text-foreground">{form.successTitle}</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">{form.successDesc}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', message: '' });
            }}
          >
            {form.sendAnother}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="contact-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {form.name}
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={form.namePlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {form.email}
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={form.emailPlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {form.message}
            </label>
            <textarea
              id="contact-message"
              value={formData.message}
              required
              rows={4}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={form.messagePlaceholder}
              className="w-full p-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-y"
            />
          </div>

          <Button type="submit" className="w-full" icon={<Mail className="w-4 h-4" />}>
            {form.send}
          </Button>
        </form>
      )}
    </div>
  );
}