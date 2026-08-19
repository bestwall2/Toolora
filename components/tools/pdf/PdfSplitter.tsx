'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { ChainHandoff } from '@/components/tools/ChainHandoff';
import { useChainedInput } from '@/components/tools/useChainedInput';
import { Button } from '@/components/ui/Button';
import { formatBytes, downloadBlob, bytesToBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

type SplitMode = 'all' | 'range' | 'every';

export function PdfSplitter() {
  const L = useToolLabels('pdf-splitter');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<SplitMode>('all');
  const [range, setRange] = useState('');
  const [every, setEvery] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleFile = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setError(null);
    setSuccess(false);
    setResultBlob(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch {
      setError(L.invalidPdf);
    }
    trackEvent('tool_opened', { tool: 'pdf-splitter' });
  };

  useChainedInput('pdf-splitter', 'pdf', ({ blob, fileName }) => {
    handleFile([new File([blob], fileName, { type: 'application/pdf' })]);
  });

  const parseRange = (input: string, max: number): number[] => {
    const pages: Set<number> = new Set();
    const parts = input.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number);
        for (let i = start; i <= Math.min(end, max); i++) pages.add(i);
      } else {
        const n = Number(trimmed);
        if (n >= 1 && n <= max) pages.add(n);
      }
    }
    return [...pages].sort((a, b) => a - b);
  };

  const split = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);

      if (mode === 'all') {
        // Each page → separate PDF
        for (let i = 0; i < pageCount; i++) {
          const newDoc = await PDFDocument.create();
          const [page] = await newDoc.copyPages(srcDoc, [i]);
          newDoc.addPage(page);
          const blob = bytesToBlob(await newDoc.save(), 'application/pdf');
          downloadBlob(blob, `page-${i + 1}.pdf`);
        }
      } else if (mode === 'range') {
        const pages = parseRange(range, pageCount);
        if (pages.length === 0) { setError(L.noValidPages); setLoading(false); return; }
        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(srcDoc, pages.map((p) => p - 1));
        copied.forEach((p) => newDoc.addPage(p));
        const blob = bytesToBlob(await newDoc.save(), 'application/pdf');
        setResultBlob(blob);
        downloadBlob(blob, `pages-${range}.pdf`);
      } else if (mode === 'every') {
        let chunk = 0;
        for (let i = 0; i < pageCount; i += every) {
          chunk++;
          const newDoc = await PDFDocument.create();
          const indices = Array.from({ length: Math.min(every, pageCount - i) }, (_, j) => i + j);
          const copied = await newDoc.copyPages(srcDoc, indices);
          copied.forEach((p) => newDoc.addPage(p));
          downloadBlob(bytesToBlob(await newDoc.save(), 'application/pdf'), `part-${chunk}.pdf`);
        }
      }

      setSuccess(true);
      trackEvent('file_processed', { tool: 'pdf-splitter', mode });
    } catch {
      setError(L.splitFailed);
    } finally {
      setLoading(false);
    }
  };

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
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)} · {pageCount} {pageCount !== 1 ? L.pages : L.page}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPageCount(0); setSuccess(false); setResultBlob(null); }}>{t.toolUi.common.change}</Button>
            </div>

            {/* Mode */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">{L.splitMode}</p>
              <div className="flex flex-col gap-2">
                {([
                  { val: 'all', label: L.splitAll, desc: `${L.splitAllDesc} ${pageCount} ${L.splitAllDesc2}` },
                  { val: 'range', label: L.splitRange, desc: L.splitRangeDesc },
                  { val: 'every', label: L.splitEvery, desc: L.splitEveryDesc },
                ] as { val: SplitMode; label: string; desc: string }[]).map((opt) => (
                  <label key={opt.val} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${mode === opt.val ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <input type="radio" name="mode" value={opt.val} checked={mode === opt.val} onChange={() => setMode(opt.val)} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {mode === 'range' && (
                <input type="text" value={range} onChange={(e) => setRange(e.target.value)}
                  placeholder={L.splitRangeDesc}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              )}
              {mode === 'every' && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{L.splitEveryLabel}</span>
                  <input type="number" value={every} min={1} max={pageCount}
                    onChange={(e) => setEvery(Math.max(1, Number(e.target.value)))}
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm text-muted-foreground">{L.pagesUnit}</span>
                </div>
              )}
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}
            {success && <p className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-lg">✓ {L.success}</p>}

            {resultBlob && (
              <ChainHandoff sourceSlug="pdf-splitter" blob={resultBlob} fileName={`pages-${range}.pdf`} />
            )}

            <Button onClick={split} loading={loading} icon={<Download className="w-4 h-4" />}>
              {loading ? L.splitting : L.split}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
