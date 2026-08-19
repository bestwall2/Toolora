'use client';

import { useState } from 'react';
import { Download, GripVertical, X, ArrowUp, ArrowDown } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { ChainHandoff } from '@/components/tools/ChainHandoff';
import { useChainedInput } from '@/components/tools/useChainedInput';
import { Button } from '@/components/ui/Button';
import { formatBytes, downloadBlob, bytesToBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

interface PdfFile {
  id: string;
  file: File;
}

export function PdfMerger() {
  const L = useToolLabels('pdf-merger');
  const { t } = useLocaleContext();
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleFiles = (incoming: File[]) => {
    const newFiles = incoming.map((f) => ({ id: crypto.randomUUID(), file: f }));
    setFiles((prev) => [...prev, ...newFiles]);
    setSuccess(false);
    setResultBlob(null);
    trackEvent('tool_opened', { tool: 'pdf-merger' });
  };

  useChainedInput('pdf-merger', 'pdf', ({ blob, fileName }) => {
    handleFiles([new File([blob], fileName, { type: 'application/pdf' })]);
  });

  const remove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const moveUp = (i: number) => {
    if (i === 0) return;
    setFiles((prev) => {
      const arr = [...prev];
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      return arr;
    });
  };

  const moveDown = (i: number) => {
    setFiles((prev) => {
      if (i >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      return arr;
    });
  };

  const merge = async () => {
    if (files.length < 2) {
      setError(t.toolUi.common.invalidFile);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();
      for (const { file } of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const mergedBytes = await merged.save();
      downloadBlob(bytesToBlob(mergedBytes, 'application/pdf'), 'merged.pdf');
      setResultBlob(bytesToBlob(mergedBytes, 'application/pdf'));
      setSuccess(true);
      trackEvent('file_processed', { tool: 'pdf-merger', fileCount: files.length });
      trackEvent('download_clicked', { tool: 'pdf-merger' });
    } catch {
      setError(t.toolUi.common.invalidFile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <ToolDropzone
          onFiles={handleFiles}
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple
          label={L.uploadLabel}
          sublabel={L.uploadSublabel}
        />

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{files.length} file{files.length !== 1 ? 's' : ''} — drag to reorder</p>
            {files.map((f, i) => (
              <div key={f.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/40 border border-border">
                <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(f.file.size)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors">
                    <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => moveDown(i)} disabled={i === files.length - 1} className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors">
                    <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => remove(f.id)} className="p-1 rounded hover:bg-muted transition-colors">
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}
        {success && (
          <p className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-lg">
            ✓ PDFs merged and downloaded successfully!
          </p>
        )}

        {resultBlob && (
          <ChainHandoff sourceSlug="pdf-merger" blob={resultBlob} fileName="merged.pdf" />
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={merge} loading={loading} disabled={files.length < 2} icon={<Download className="w-4 h-4" />}>
            {loading ? L.merging : L.merge}
          </Button>
          {files.length > 0 && (
            <Button variant="ghost" onClick={() => { setFiles([]); setSuccess(false); setResultBlob(null); }}>{t.toolUi.common.clear}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
