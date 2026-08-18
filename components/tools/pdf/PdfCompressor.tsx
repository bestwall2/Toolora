'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { Button } from '@/components/ui/Button';
import { formatBytes, downloadBlob, bytesToBlob, getCompressionPercentage } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

export function PdfCompressor() {
  const L = useToolLabels('pdf-compressor');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setOriginalSize(f.size);
    setSuccess(false);
    setError(null);
    trackEvent('tool_opened', { tool: 'pdf-compressor' });
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      // Import pdf-lib
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);

      // Optimize metadata and object streams; re-save the document.
      const compressedBytes = await doc.save({
        useObjectStreams: true,
      });

      const blob = bytesToBlob(compressedBytes, 'application/pdf');

      setCompressedSize(blob.size);
      downloadBlob(blob, `compressed-${file.name}`);
      setSuccess(true);
      trackEvent('file_processed', { tool: 'pdf-compressor', originalSize, compressedSize: blob.size });
      trackEvent('download_clicked', { tool: 'pdf-compressor' });
    } catch {
      setError(L.compressFailed);
    } finally {
      setLoading(false);
    }
  };

  const saved = getCompressionPercentage(originalSize, compressedSize);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        {!file ? (
          <ToolDropzone
            onFiles={handleFile}
            accept={{ 'application/pdf': ['.pdf'] }}
            label={L.uploadLabel}
            sublabel={L.uploadSublabel}
          />
        ) : (
          <>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(originalSize)}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setFile(null); setSuccess(false); }}>{t.toolUi.common.change}</Button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-lg">
                <strong>Notice:</strong> Browser-side PDF compression optimizes metadata and object structures. Highly compressed image PDFs might need a backend server for deeper raster/downsampling.
              </p>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}
            {success && (
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 space-y-1">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">✓ {L.compressed}</p>
                <p className="text-xs text-muted-foreground">
                  Original: {formatBytes(originalSize)} · {L.compressed}: {formatBytes(compressedSize)} · Saved: <span className="text-green-600 font-semibold">{saved}%</span>
                </p>
              </div>
            )}

            <Button onClick={compress} loading={loading} icon={<Download className="w-4 h-4" />}>
              {loading ? L.compressing : L.compress}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
