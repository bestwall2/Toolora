'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useToolLabels } from '@/components/i18n/LocaleProvider';
import { trackEvent } from '@/lib/analytics';

const RESOLUTIONS = ['512x512', '512x768', '768x512', '768x768', '768x1024', '1024x1024'];

const MODELS = [
  { id: '@cf/bytedance/stable-diffusion-xl-lightning', label: 'SDXL Lightning (fast)' },
  { id: '@cf/stabilityai/stable-diffusion-xl-base-1.0', label: 'Stable Diffusion XL Base 1.0' },
  { id: '@cf/blackforestlabs/ux-1-schnell', label: 'Flux 1 Schnell' },
  { id: '@cf/lykon/dreamshaper-8-lcm', label: 'Dreamshaper 8 LCM' },
];

function extensionFromType(type: string): string {
  if (type.includes('png')) return '.png';
  if (type.includes('webp')) return '.webp';
  return '.jpg';
}

export function ImageGenerator() {
  const L = useToolLabels('image-generator');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [resolution, setResolution] = useState('512x512');
  const [steps, setSteps] = useState('');
  const [guidance, setGuidance] = useState('');
  const [model, setModel] = useState(MODELS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extension, setExtension] = useState('.jpg');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    const [width, height] = resolution.split('x').map(Number);

    try {
      const res = await fetch('/api/image-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          negative_prompt: negativePrompt.trim() || undefined,
          width,
          height,
          seed: seed.trim() ? Number(seed) : undefined,
          num_steps: steps.trim() ? Number(steps) : undefined,
          guidance: guidance.trim() ? Number(guidance) : undefined,
          model,
        }),
      });

      if (!res.ok) {
        let message = L.error;
        try {
          const data = await res.json();
          if (data?.error) message = data.error;
        } catch {
          /* keep default */
        }
        throw new Error(message);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      setExtension(extensionFromType(blob.type));
      trackEvent('tool_used', { tool: 'image-generator', resolution });
    } catch (e) {
      setError(e instanceof Error ? e.message : L.error);
    } finally {
      setLoading(false);
    }
  };

  const fieldInput =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary';
  const fieldLabel = 'block text-xs font-medium text-muted-foreground uppercase tracking-wide';

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">{L.prompt}</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={L.promptPlaceholder}
            rows={4}
            maxLength={4000}
            className={`${fieldInput} resize-y`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={generate} disabled={!prompt.trim()} loading={loading} icon={<Sparkles className="w-4 h-4" />}>
            {loading ? L.generating : L.generate}
          </Button>
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform duration-150', showAdvanced && 'rotate-180')} />
            {L.advanced || 'Advanced options'}
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-border/60">
            <div className="space-y-1.5">
              <label className={fieldLabel}>{L.model}</label>
              <select value={model} onChange={(e) => setModel(e.target.value)} className={fieldInput}>
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className={fieldLabel}>{L.resolution}</label>
              <select value={resolution} onChange={(e) => setResolution(e.target.value)} className={fieldInput}>
                {RESOLUTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className={fieldLabel}>{L.negativePrompt}</label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder={L.negativePlaceholder}
                className={fieldInput}
              />
            </div>

            <div className="space-y-1.5">
              <label className={fieldLabel}>{L.seed}</label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder={L.random}
                className={fieldInput}
              />
            </div>

            <div className="space-y-1.5">
              <label className={fieldLabel}>{L.steps}</label>
              <input
                type="number"
                min={1}
                max={50}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="20"
                className={fieldInput}
              />
            </div>

            <div className="space-y-1.5">
              <label className={fieldLabel}>{L.guidance}</label>
              <input
                type="number"
                min={1}
                max={30}
                step={0.5}
                value={guidance}
                onChange={(e) => setGuidance(e.target.value)}
                placeholder="7"
                className={fieldInput}
              />
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">{L.waitNote}</p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl border border-destructive/40 bg-destructive/10 text-sm text-destructive">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.result}</p>
            <a
              href={imageUrl}
              download={`generated-image${extension}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border border-border bg-secondary text-foreground hover:bg-muted"
            >
              <Download className="w-3.5 h-3.5" />
              {L.download}
            </a>
          </div>
          <div className="rounded-xl overflow-hidden bg-background">
            <img src={imageUrl} alt={prompt} className="w-full h-auto max-w-[640px] mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
}