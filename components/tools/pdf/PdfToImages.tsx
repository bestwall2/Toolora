'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { ChainHandoff } from '@/components/tools/ChainHandoff';
import { useChainedInput } from '@/components/tools/useChainedInput';
import { Button } from '@/components/ui/Button';
import { formatBytes, downloadBlob, dataUrlToBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

interface PdfJsViewport {
  width: number;
  height: number;
}

interface PdfJsPage {
  getViewport: (opts: { scale: number }) => PdfJsViewport;
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfJsViewport;
  }) => { promise: Promise<unknown> };
}

interface PdfJsDocument {
  numPages: number;
  getPage: (n: number) => Promise<PdfJsPage>;
}

interface PdfJsLib {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (params: { data: ArrayBuffer }) => { promise: Promise<PdfJsDocument> };
}

type WindowWithPdfJs = Window & { pdfjsLib?: PdfJsLib };

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120';

export function PdfToImages() {
  const L = useToolLabels('pdf-to-images');
  const { t } = useLocaleContext();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (files: File[]) => {
    setFile(files[0]);
    setImages([]);
    setError(null);
    trackEvent('tool_opened', { tool: 'pdf-to-images' });
  };

  useChainedInput('pdf-to-images', 'pdf', ({ blob, fileName }) => {
    handleFile([new File([blob], fileName, { type: 'application/pdf' })]);
  });

  const convertToImages = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setProgress('Loading PDF library…');

    try {
      // Load pdfjs-dist from CDN at runtime to avoid SSR/bundling issues in Next.js
      const pdfjsLib = await new Promise<PdfJsLib>((resolve, reject) => {
        const w = window as WindowWithPdfJs;
        if (w.pdfjsLib) {
          resolve(w.pdfjsLib);
          return;
        }
        const script = document.createElement('script');
        script.src = `${PDFJS_CDN}/pdf.min.js`;
        script.onload = () => {
          const loaded = (window as WindowWithPdfJs).pdfjsLib;
          if (loaded) resolve(loaded);
          else reject(new Error('Failed to load PDF library.'));
        };
        script.onerror = () => reject(new Error('Failed to load PDF library.'));
        document.head.appendChild(script);
      });

      pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`;

      setProgress('Reading PDF file…');
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const urls: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgress(`Rendering page ${i} of ${totalPages}…`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          const url = canvas.toDataURL('image/png');
          urls.push(url);
        }
      }

      setImages(urls);
      trackEvent('file_processed', { tool: 'pdf-to-images', pageCount: totalPages });
    } catch (err) {
      console.error(err);
      setError(L.convertFailed);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const downloadAll = () => {
    images.forEach((url, i) => {
      fetch(url)
        .then((r) => r.blob())
        .then((b) => {
          downloadBlob(b, `page-${i + 1}.png`);
        });
    });
    trackEvent('download_clicked', { tool: 'pdf-to-images', count: images.length });
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
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setFile(null); setImages([]); setError(null); }}>
                {t.toolUi.common.change}
              </Button>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

            {images.length === 0 && !loading && (
              <Button onClick={convertToImages}>{L.convert}</Button>
            )}

            {loading && (
              <div className="flex items-center gap-3 py-4 text-sm text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span>{progress}</span>
              </div>
            )}

            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Converted {images.length} Pages</p>
                  <Button variant="secondary" size="sm" onClick={downloadAll} icon={<Download className="w-4 h-4" />}>
                    {t.toolUi.common.download} All
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group border border-border rounded-xl bg-muted/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`${L.page} ${idx + 1}`} className="w-full h-auto object-contain rounded-xl" />
                      <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <button
                          onClick={() => {
                            fetch(img).then(r => r.blob()).then(b => downloadBlob(b, `page-${idx + 1}.png`));
                          }}
                          className="p-2 rounded-lg bg-card text-foreground hover:bg-muted shadow-lg transition-transform scale-90 group-hover:scale-100"
                          aria-label={t.toolUi.common.download}
                          title={t.toolUi.common.download}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <ChainHandoff
                          variant="menu"
                          sourceSlug="pdf-to-images"
                          blob={dataUrlToBlob(img)}
                          fileName={`page-${idx + 1}.png`}
                        />
                      </div>
                      <span className="absolute bottom-2 left-2 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white font-medium">
                        {L.page} {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
