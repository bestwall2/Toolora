'use client';

import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Download, ImageIcon } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { formatBytes, downloadBlob, getCompressionPercentage } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

export function ImageCompressor() {
  const L = useToolLabels('image-compressor');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setCompressedUrl(null);
    setError(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
    trackEvent('tool_opened', { tool: 'image-compressor' });
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const opts = {
        maxSizeMB: 50,
        useWebWorker: true,
        initialQuality: quality / 100,
        fileType: file.type as 'image/jpeg' | 'image/png' | 'image/webp',
      };
      const compressed = await imageCompression(file, opts);
      const url = URL.createObjectURL(compressed);
      setCompressedUrl(url);
      setCompressedSize(compressed.size);
      trackEvent('file_processed', { tool: 'image-compressor', originalSize: file.size, compressedSize: compressed.size });
    } catch {
      setError(t.toolUi.common.invalidFile);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!compressedUrl || !file) return;
    fetch(compressedUrl)
      .then((r) => r.blob())
      .then((b) => {
        downloadBlob(b, `compressed-${file.name}`);
        trackEvent('download_clicked', { tool: 'image-compressor' });
      });
  };

  const saved = file ? getCompressionPercentage(file.size, compressedSize) : 0;

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
            {/* Before/After preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.original}</p>
                {preview && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={preview} alt={L.original} className="w-full rounded-xl object-contain max-h-48 bg-muted/30" />
                )}
                <p className="text-sm text-muted-foreground">{file.name} · <strong className="text-foreground">{formatBytes(file.size)}</strong></p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.compressed}</p>
                {compressedUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={compressedUrl} alt={L.compressed} className="w-full rounded-xl object-contain max-h-48 bg-muted/30" />
                ) : (
                  <div className="w-full rounded-xl max-h-48 h-48 bg-muted/30 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                )}
                {compressedUrl && (
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{formatBytes(compressedSize)}</strong>
                    {' '}·{' '}
                    <span className="text-green-600 dark:text-green-400 font-semibold">{saved}% {L.smaller}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Quality */}
            <Slider
              label={L.quality}
              valueLabel={`${quality}%`}
              min={10}
              max={100}
              value={quality}
              onChange={(e) => { setQuality(Number(e.target.value)); setCompressedUrl(null); }}
            />

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={compress} loading={loading} disabled={loading}>
                {loading ? L.compressing : L.compress}
              </Button>
              {compressedUrl && (
                <Button variant="secondary" onClick={download} icon={<Download className="w-4 h-4" />}>
                  {t.toolUi.common.download}
                </Button>
              )}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(null); setCompressedUrl(null); }}>
                {L.changeImage}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}