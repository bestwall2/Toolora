'use client';

import { useState } from 'react';
import { Download, RefreshCcw } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { Button } from '@/components/ui/Button';
import { downloadDataUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

type Format = 'image/jpeg' | 'image/png' | 'image/webp';
const FORMAT_LABELS: Record<Format, string> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
};

export function ImageConverter() {
  const L = useToolLabels('image-converter');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<Format>('image/webp');
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setResult(null);
    setPreview(URL.createObjectURL(f));
    // Auto-suggest target format
    if (f.type === 'image/jpeg') setTargetFormat('image/webp');
    else if (f.type === 'image/png') setTargetFormat('image/webp');
    else setTargetFormat('image/jpeg');
    trackEvent('tool_opened', { tool: 'image-converter' });
  };

  const convert = () => {
    if (!file || !preview) return;
    setLoading(true);
    setError(null);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { setError(t.toolUi.common.invalidFile); setLoading(false); return; }
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      setResult(canvas.toDataURL(targetFormat, quality / 100));
      setLoading(false);
      trackEvent('file_processed', { tool: 'image-converter' });
    };
    img.onerror = () => { setError(t.toolUi.common.invalidFile); setLoading(false); };
    img.src = preview;
  };

  const download = () => {
    if (!result || !file) return;
    const ext = targetFormat === 'image/jpeg' ? 'jpg' : targetFormat === 'image/png' ? 'png' : 'webp';
    const base = file.name.replace(/\.[^.]+$/, '');
    downloadDataUrl(result, `${base}.${ext}`);
    trackEvent('download_clicked', { tool: 'image-converter' });
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
            {preview && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={preview} alt="Original" className="w-full rounded-xl max-h-48 object-contain bg-muted/30" />
            )}
            <p className="text-sm text-muted-foreground">
              Source format: <strong className="text-foreground">{FORMAT_LABELS[file.type as Format] || file.type}</strong>
            </p>

            {/* Quick conversion buttons */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Convert to</p>
              <div className="flex flex-wrap gap-2">
                {(['image/jpeg', 'image/png', 'image/webp'] as Format[])
                  .filter(f => f !== file.type)
                  .map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => { setTargetFormat(fmt); setResult(null); }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        targetFormat === fmt
                          ? 'border-primary bg-primary/8 text-primary'
                          : 'border-border hover:border-primary/40 text-muted-foreground'
                      }`}
                    >
                      {FORMAT_LABELS[fmt]}
                    </button>
                  ))}
              </div>
            </div>

            {targetFormat !== 'image/png' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{L.quality}</span>
                  <span className="font-medium">{quality}%</span>
                </div>
                <input type="range" min={10} max={100} value={quality} aria-label={L.quality}
                  onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

            {result && (
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  ✓ {L.converted} {FORMAT_LABELS[targetFormat]} {L.successfully}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={convert} loading={loading} icon={<RefreshCcw className="w-4 h-4" />}>
                {loading ? L.converting : L.convert}
              </Button>
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
