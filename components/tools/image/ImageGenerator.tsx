'use client';

import { useState } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';
import { useTheme } from 'next-themes';
import { trackEvent } from '@/lib/analytics';

const GENERATOR_URL = 'https://8a3a4dfaf29b4be8eead43dd8c912667.perchance.org/3y4owlpd4l';
const EMBED_ID = 'toolora';
const RESOLUTIONS = ['512x512', '512x768', '768x512', '768x768'];

const PERCHANCE_LANGS: Record<string, string> = {
  en: 'en',
  fr: 'fr',
  es: 'es',
  ar: 'ar',
};

export function ImageGenerator() {
  const L = useToolLabels('image-generator');
  const { locale } = useLocaleContext();
  const { resolvedTheme } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [resolution, setResolution] = useState('512x512');
  const [openUrl, setOpenUrl] = useState<string | null>(null);

  const buildUrl = () => {
    const url = new URL(GENERATOR_URL);
    url.searchParams.set('embed', '1');
    url.searchParams.set('embid', EMBED_ID);
    url.searchParams.set('prompt', prompt.trim());
    url.searchParams.set('resolution', resolution);
    url.searchParams.set('seed', seed.trim() ? seed.trim() : '-1');
    if (negativePrompt.trim()) {
      url.searchParams.set('negative', negativePrompt.trim());
    }
    url.searchParams.set('lang', PERCHANCE_LANGS[locale] ?? 'en');
    url.searchParams.set('theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    url.searchParams.set('bg', 'transparent');
    return url.toString();
  };

  const generate = () => {
    if (!prompt.trim()) return;
    const url = buildUrl();
    setOpenUrl(url);
    window.open(url, '_blank', 'noopener');
    trackEvent('tool_used', { tool: 'image-generator', resolution });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">{L.prompt}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={L.promptPlaceholder}
              rows={4}
              maxLength={4000}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">{L.negativePrompt}</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder={L.negativePlaceholder}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm text-muted-foreground">{L.seed}</label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder={L.random}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm text-muted-foreground">{L.resolution}</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {RESOLUTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={generate} disabled={!prompt.trim()} icon={<Sparkles className="w-4 h-4" />}>
              {L.generate}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">{L.waitNote}</p>
        </div>
      </div>

      {openUrl && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.result}</p>
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {L.openInNewTab}
            </a>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-background p-4 text-sm text-foreground">
            <p>{L.openedInNewTab}</p>
            <p className="mt-2 text-muted-foreground">{L.blockedHint}</p>
          </div>
        </div>
      )}
    </div>
  );
}