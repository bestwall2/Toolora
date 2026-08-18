'use client';

import { useState } from 'react';
import { Download, Lock, Unlock } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { downloadDataUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

type Format = 'image/jpeg' | 'image/png' | 'image/webp';

const PRESETS = [
  { label: 'HD 1080p', w: 1920, h: 1080 },
  { label: '720p', w: 1280, h: 720 },
  { label: 'Square', w: 800, h: 800 },
  { label: 'Twitter', w: 1200, h: 628 },
  { label: 'Instagram', w: 1080, h: 1080 },
];

export function ImageResizer() {
  const L = useToolLabels('image-resizer');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [locked, setLocked] = useState(true);
  const [format, setFormat] = useState<Format>('image/jpeg');
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setResult(null);
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      setOrigW(img.naturalWidth);
      setOrigH(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setPreview(url);
    };
    img.src = url;
    trackEvent('tool_opened', { tool: 'image-resizer' });
  };

  const onWidthChange = (v: number) => {
    setWidth(v);
    if (locked && origW > 0) setHeight(Math.round((v / origW) * origH));
    setResult(null);
  };
  const onHeightChange = (v: number) => {
    setHeight(v);
    if (locked && origH > 0) setWidth(Math.round((v / origH) * origW));
    setResult(null);
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setResult(null);
  };

  const resize = () => {
    if (!file || !preview) return;
    setLoading(true);
    setError(null);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { setError(t.toolUi.common.invalidFile); setLoading(false); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL(format, quality / 100);
      setResult(dataUrl);
      setLoading(false);
      trackEvent('file_processed', { tool: 'image-resizer' });
    };
    img.onerror = () => { setError(t.toolUi.common.invalidFile); setLoading(false); };
    img.src = preview;
  };

  const download = () => {
    if (!result || !file) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
    downloadDataUrl(result, `resized-${width}x${height}.${ext}`);
    trackEvent('download_clicked', { tool: 'image-resizer' });
  };

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
            {/* Preview */}
            {preview && (
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" className="rounded-xl max-h-48 object-contain bg-muted/30 w-full" />
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">{L.original}: {origW} × {origH} px</p>

            {/* Presets */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">{L.presets}</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p.w, p.h)}
                    className="text-xs px-2.5 py-1 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors text-muted-foreground"
                  >
                    {p.label} ({p.w}×{p.h})
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <label htmlFor="resize-width" className="text-xs text-muted-foreground">{L.width}</label>
                <input
                  id="resize-width"
                  type="number"
                  value={width}
                  onChange={(e) => onWidthChange(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  min={1}
                />
              </div>
              <button
                onClick={() => setLocked(!locked)}
                className="mt-5 p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                aria-label={L.lockAspect}
              >
                {locked ? <Lock className="w-4 h-4 text-primary" /> : <Unlock className="w-4 h-4 text-muted-foreground" />}
              </button>
              <div className="flex-1 space-y-1">
                <label htmlFor="resize-height" className="text-xs text-muted-foreground">{L.height}</label>
                <input
                  id="resize-height"
                  type="number"
                  value={height}
                  onChange={(e) => onHeightChange(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  min={1}
                />
              </div>
            </div>

            {/* Format + Quality */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="resize-format" className="text-xs text-muted-foreground">{L.outputFormat}</label>
                <select
                  id="resize-format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as Format)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              {format !== 'image/png' && (
                <Slider label={L.quality} valueLabel={`${quality}%`} min={10} max={100} value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))} />
              )}
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

            {result && (
              <div className="p-3 rounded-xl bg-muted/30 border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result} alt="Resized" className="w-full rounded-lg max-h-40 object-contain" />
                <p className="text-xs text-muted-foreground mt-2">{L.output}: {width} × {height} px</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={resize} loading={loading}>{loading ? L.resizing : L.resize}</Button>
              {result && (
                <Button variant="secondary" onClick={download} icon={<Download className="w-4 h-4" />}>{t.toolUi.common.download}</Button>
              )}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(null); setResult(null); }}>{L.changeImage}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
