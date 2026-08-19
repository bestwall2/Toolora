'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Sparkles, RotateCcw, Expand } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { ChainHandoff } from '@/components/tools/ChainHandoff';
import { useChainedInput } from '@/components/tools/useChainedInput';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { downloadDataUrl, dataUrlToBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

interface Adjust {
  brightness: number;
  contrast: number;
  saturation: number;
  sharpness: number;
}

const DEFAULT_ADJUST: Adjust = { brightness: 0, contrast: 0, saturation: 0, sharpness: 0 };
const AUTO_ADJUST: Adjust = { brightness: 8, contrast: 12, saturation: 12, sharpness: 1.2 };
const MAX_DIM = 2560;
const UPSCALE_SCALE = 2;

interface UpscalerLike {
  upscale: (src: string, opts?: { patchSize?: number }) => Promise<string>;
}

function enhanceImageData(data: ImageData, adjust: Adjust): ImageData {
  const { brightness, contrast, saturation, sharpness } = adjust;
  const { data: px, width, height } = data;
  const out = new Uint8ClampedArray(px);
  const contrastFactor = 1 + contrast / 100;
  const satFactor = 1 + saturation / 100;
  const brightOffset = brightness * 1.28;

  const transform = (v: number) => {
    let x = v + brightOffset;
    x = (x - 128) * contrastFactor + 128;
    if (satFactor !== 1) {
      // saturation is applied below per-pixel using luminance
    }
    return x;
  };

  for (let i = 0; i < px.length; i += 4) {
    let r = px[i];
    let g = px[i + 1];
    let b = px[i + 2];
    r = transform(r);
    g = transform(g);
    b = transform(b);
    if (satFactor !== 1) {
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      r = lum + (r - lum) * satFactor;
      g = lum + (g - lum) * satFactor;
      b = lum + (b - lum) * satFactor;
    }
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
    out[i + 3] = px[i + 3];
  }

  if (sharpness > 0) {
    // Unsharp mask: result = original + amount * (original - blurred)
    const amount = sharpness;
    const blurred = new Float32Array(px.length);
    // Separable box blur (radius 1 -> 3x3 kernel)
    const tmp = new Float32Array(px.length);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (let c = 0; c < 3; c++) {
          const idx = (y * width + x) * 4 + c;
          let sum = 0;
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= height) continue;
            for (let dx = -1; dx <= 1; dx++) {
              const nx = x + dx;
              if (nx < 0 || nx >= width) continue;
              sum += out[(ny * width + nx) * 4 + c];
              count++;
            }
          }
          tmp[idx] = sum / count;
        }
      }
    }
    // Second horizontal pass for a slightly wider blur
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (let c = 0; c < 3; c++) {
          const idx = (y * width + x) * 4 + c;
          let sum = 0;
          let count = 0;
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            sum += tmp[(y * width + nx) * 4 + c];
            count++;
          }
          blurred[idx] = sum / count;
        }
      }
    }
    for (let i = 0; i < px.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        const idx = i + c;
        out[idx] = out[idx] + amount * (out[idx] - blurred[idx]);
      }
    }
  }

  return new ImageData(out, width, height);
}

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('load failed'));
    img.src = src;
  });

export function ImageEnhancer() {
  const L = useToolLabels('image-enhancer');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [adjust, setAdjust] = useState<Adjust>(DEFAULT_ADJUST);
  const [result, setResult] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upscaling, setUpscaling] = useState(false);
  const [upscaleError, setUpscaleError] = useState<string | null>(null);
  const [upscaled, setUpscaled] = useState(false);
  const cancelRef = useRef(false);
  const upscalerRef = useRef<UpscalerLike | null>(null);

  const getUpscaler = async (): Promise<UpscalerLike> => {
    if (!upscalerRef.current) {
      const mod = (await import('upscaler')) as unknown as {
        default: new (opts?: { model?: Record<string, unknown> }) => UpscalerLike;
      };
      upscalerRef.current = new mod.default({
        model: {
          path: '/models/upscaler/model.json',
          scale: UPSCALE_SCALE,
          modelType: 'layers',
          inputRange: [0, 255],
          outputRange: [0, 255],
          meta: { architecture: 'rdn' },
        },
      });
    }
    return upscalerRef.current;
  };

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setError(null);
    setAdjust(DEFAULT_ADJUST);
    setResult(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    trackEvent('tool_opened', { tool: 'image-enhancer' });
  };

  useChainedInput('image-enhancer', 'image', ({ blob, fileName }) => {
    handleFile([new File([blob], fileName, { type: blob.type || 'image/png' })]);
  });

  const isAuto = useMemo(
    () => JSON.stringify(adjust) === JSON.stringify(AUTO_ADJUST),
    [adjust]
  );

  useEffect(() => {
    if (!preview) return;
    cancelRef.current = false;
    setUpscaled(false);
    setProcessing(true);
    const timer = setTimeout(async () => {
      try {
        const img = await loadImageElement(preview);
        const scale = Math.min(1, MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('no context');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (cancelRef.current) return;
        const enhanced = enhanceImageData(imageData, adjust);
        ctx.putImageData(enhanced, 0, 0);
        if (cancelRef.current) return;
        setResult(canvas.toDataURL('image/png'));
        setError(null);
      } catch {
        setError(t.toolUi.common.invalidFile);
      } finally {
        setProcessing(false);
      }
    }, 120);
    return () => {
      cancelRef.current = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, adjust]);

  const upscale = async () => {
    if (!result || upscaling) return;
    setUpscaling(true);
    setUpscaleError(null);
    try {
      const up = await getUpscaler();
      const base64 = await up.upscale(result, { patchSize: 128 });
      if (typeof base64 === 'string') {
        setResult(base64);
        setUpscaled(true);
        trackEvent('upscale_used', { tool: 'image-enhancer' });
      }
    } catch {
      setUpscaleError(L.upscaleError);
    } finally {
      setUpscaling(false);
    }
  };

  const download = () => {
    if (!result || !file) return;
    const base = file.name.replace(/\.[^.]+$/, '');
    downloadDataUrl(result, `${upscaled ? 'upscaled' : 'enhanced'}-${base}.png`);
    trackEvent('download_clicked', { tool: 'image-enhancer' });
  };

  const resultBlob = useMemo(() => (result ? dataUrlToBlob(result) : null), [result]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
        {!file ? (
          <ToolDropzone
            onFiles={handleFile}
            accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }}
            label={L.uploadLabel}
            sublabel={L.uploadSublabel}
          />
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.original}</p>
                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt={L.original} className="w-full rounded-xl object-contain max-h-56 bg-muted/30" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.enhanced}</p>
                {result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={result} alt={L.enhanced} className="w-full rounded-xl object-contain max-h-56 bg-muted/30" />
                ) : (
                  <div className="w-full rounded-xl max-h-56 h-56 bg-muted/30 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">{processing ? L.processing : '—'}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Slider label={L.brightness} valueLabel={`${adjust.brightness > 0 ? '+' : ''}${adjust.brightness}`} min={-50} max={50} value={adjust.brightness} onChange={(e) => setAdjust((a) => ({ ...a, brightness: Number(e.target.value) }))} />
              <Slider label={L.contrast} valueLabel={`${adjust.contrast > 0 ? '+' : ''}${adjust.contrast}`} min={-50} max={100} value={adjust.contrast} onChange={(e) => setAdjust((a) => ({ ...a, contrast: Number(e.target.value) }))} />
              <Slider label={L.saturation} valueLabel={`${adjust.saturation > 0 ? '+' : ''}${adjust.saturation}`} min={-100} max={100} value={adjust.saturation} onChange={(e) => setAdjust((a) => ({ ...a, saturation: Number(e.target.value) }))} />
              <Slider label={L.sharpness} valueLabel={adjust.sharpness.toFixed(1)} min={0} max={3} step={0.1} value={adjust.sharpness} onChange={(e) => setAdjust((a) => ({ ...a, sharpness: Number(e.target.value) }))} />
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

            <div className="flex flex-wrap gap-3">
              <Button variant={isAuto ? 'primary' : 'secondary'} onClick={() => setAdjust(AUTO_ADJUST)} icon={<Sparkles className="w-4 h-4" />}>
                {L.auto}
              </Button>
              <Button variant="ghost" onClick={() => setAdjust(DEFAULT_ADJUST)} icon={<RotateCcw className="w-4 h-4" />}>
                {L.reset}
              </Button>
              {result && (
                <Button variant="secondary" onClick={upscale} disabled={upscaling} icon={<Expand className="w-4 h-4" />}>
                  {L.upscale}
                </Button>
              )}
              {result && (
                <Button variant="secondary" onClick={download} icon={<Download className="w-4 h-4" />}>
                  {t.toolUi.common.download}
                </Button>
              )}
              <Button variant="ghost" onClick={() => { setFile(null); setResult(null); }}>
                {L.changeImage}
              </Button>
            </div>

            {upscaling && <p className="text-sm text-muted-foreground">{L.upscaling}</p>}
            {upscaleError && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{upscaleError}</p>}

            {resultBlob && (
              <ChainHandoff sourceSlug="image-enhancer" blob={resultBlob} fileName={`${upscaled ? 'upscaled' : 'enhanced'}-${(file.name || 'image').replace(/\.[^.]+$/, '')}.png`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}