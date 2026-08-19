'use client';

import { useState } from 'react';
import { Download, Copy, Check, ScanText } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { Button } from '@/components/ui/Button';
import { downloadBlob, copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

const LANG_MAP: Record<string, string> = { en: 'eng', ar: 'ara', fr: 'fra', es: 'spa' };

export function ImageToText() {
  const L = useToolLabels('image-to-text');
  const { locale } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setText('');
    setError(null);
    setPreview(URL.createObjectURL(f));
    trackEvent('tool_opened', { tool: 'image-to-text' });
  };

  const extract = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const lang = LANG_MAP[locale] || 'eng';
    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker(lang);
      const { data } = await worker.recognize(file);
      setText((data.text || '').trim());
      await worker.terminate();
      trackEvent('file_processed', { tool: 'image-to-text', lang });
    } catch {
      setError(L.error);
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    if (!text) return;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    trackEvent('tool_used', { tool: 'image-to-text' });
  };

  const downloadTxt = () => {
    if (!text) return;
    const base = file?.name.replace(/\.[^.]+$/, '') || 'ocr';
    downloadBlob(new Blob([text], { type: 'text/plain;charset=utf-8' }), `${base}-text.txt`);
    trackEvent('download_clicked', { tool: 'image-to-text' });
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">{L.source}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview || ''} alt={L.source} className="w-full rounded-xl max-h-56 object-contain bg-muted/30" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-muted-foreground mb-2">{L.result}</p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={loading ? L.extracting : L.resultPlaceholder}
                  rows={8}
                  className="w-full flex-1 min-h-36 p-3 rounded-xl border border-border bg-muted/20 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y text-foreground"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

            <div className="flex flex-wrap gap-3">
              <Button onClick={extract} loading={loading} icon={<ScanText className="w-4 h-4" />}>
                {loading ? L.extracting : L.extract}
              </Button>
              {text && (
                <>
                  <Button variant="secondary" onClick={copyText} icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}>
                    {copied ? L.copied : L.copyText}
                  </Button>
                  <Button variant="secondary" onClick={downloadTxt} icon={<Download className="w-4 h-4" />}>{L.downloadTxt}</Button>
                </>
              )}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(null); setText(''); }}>{L.changeImage}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}