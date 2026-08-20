'use client';

import { useState } from 'react';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { useChainedInput } from '@/components/tools/useChainedInput';
import { Button } from '@/components/ui/Button';
import { downloadDataUrl, dataUrlToBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';
import { ChainHandoff } from '@/components/tools/ChainHandoff';

const RESOLUTIONS = ['512x512', '512x768', '768x512', '768x768'];

interface GenerateResponse {
  dataUrl?: string;
  mimeType?: string;
  error?: string;
}

export function ImageGenerator() {
  const L = useToolLabels('image-generator');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [resolution, setResolution] = useState('512x512');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultName, setResultName] = useState('generated-image.png');

  useChainedInput('image-generator', 'image', ({ blob, fileName }) => {
    setError(L.serverSideOnly);
  });

  const generate = async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/image-generator', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          negativePrompt: negativePrompt.trim() || undefined,
          seed: seed.trim() ? Number(seed.trim()) : undefined,
          resolution,
        }),
      });
      const data: GenerateResponse = await res.json();
      if (!res.ok || !data.dataUrl) {
        throw new Error(data.error || 'Generation failed');
      }
      setResult(data.dataUrl);
      setResultName(`ai-image-${Date.now()}.${data.mimeType?.includes('png') ? 'png' : 'jpg'}`);
      trackEvent('tool_used', { tool: 'image-generator', resolution });
    } catch (e) {
      setError(e instanceof Error ? e.message : L.error);
      trackEvent('error_shown', { tool: 'image-generator' });
    } finally {
      setGenerating(false);
    }
  };

  const download = () => {
    if (!result) return;
    downloadDataUrl(result, resultName);
    trackEvent('download_clicked', { tool: 'image-generator' });
  };

  const resultBlob = result ? dataUrlToBlob(result) : null;

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

          {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex flex-wrap gap-3">
            <Button onClick={generate} disabled={generating || !prompt.trim()} icon={generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}>
              {generating ? L.generating : L.generate}
            </Button>
            {result && (
              <Button variant="secondary" onClick={download} icon={<Download className="w-4 h-4" />}>
                {L.download}
              </Button>
            )}
          </div>

          {generating && <p className="text-sm text-muted-foreground">{L.waitNote}</p>}

          {result && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.result}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result} alt={L.result} className="w-full rounded-xl object-contain max-h-96 bg-muted/30" />
            </div>
          )}

          {resultBlob && (
            <ChainHandoff sourceSlug="image-generator" blob={resultBlob} fileName={resultName} />
          )}
        </div>
      </div>
    </div>
  );
}