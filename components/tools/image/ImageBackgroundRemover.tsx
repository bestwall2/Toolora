'use client';

import { useRef, useState } from 'react';
import { Download, Eraser } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { Button } from '@/components/ui/Button';
import { downloadDataUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

const WASM_PATH = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm';
const MODEL_PATH =
  'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite';

interface SegmenterHandle {
  segment: (image: HTMLImageElement) => { confidenceMasks: { getAsUint8Array: () => Uint8Array }[] };
}

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('load failed'));
    img.src = src;
  });

export function ImageBackgroundRemover() {
  const L = useToolLabels('image-background-remover');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'person' | 'background'>('person');
  const segmenterRef = useRef<SegmenterHandle | null>(null);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setResult(null);
    setError(null);
    setPreview(URL.createObjectURL(f));
    trackEvent('tool_opened', { tool: 'image-background-remover' });
  };

  const getSegmenter = async (): Promise<SegmenterHandle> => {
    if (segmenterRef.current) return segmenterRef.current;
    const { FilesetResolver, ImageSegmenter } = await import('@mediapipe/tasks-vision');
    const fileset = await FilesetResolver.forVisionTasks(WASM_PATH);
    const segmenter = await ImageSegmenter.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL_PATH },
      runningMode: 'IMAGE',
      outputConfidenceMasks: true,
    });
    segmenterRef.current = segmenter as SegmenterHandle;
    return segmenterRef.current;
  };

  const removeBackground = async () => {
    if (!file || !preview) return;
    setLoading(true);
    setError(null);
    try {
      const segmenter = await getSegmenter();
      const img = await loadImage(preview);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no context');
      ctx.drawImage(img, 0, 0);

      const seg = segmenter.segment(img);
      const mask = new Uint8Array(seg.confidenceMasks[0].getAsUint8Array());
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;
      const px = canvas.width * canvas.height;
      const stride = mask.length === px ? 1 : 4;
      const keepPerson = mode === 'person';
      for (let i = 0; i < px; i++) {
        const isPerson = mask[i * stride] > 128;
        if ((keepPerson && !isPerson) || (!keepPerson && isPerson)) d[i * 4 + 3] = 0;
      }
      ctx.putImageData(imgData, 0, 0);
      setResult(canvas.toDataURL('image/png'));
      trackEvent('file_processed', { tool: 'image-background-remover' });
    } catch {
      setError(L.error);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!result || !file) return;
    const base = file.name.replace(/\.[^.]+$/, '');
    downloadDataUrl(result, `${base}-no-bg.png`);
    trackEvent('download_clicked', { tool: 'image-background-remover' });
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
            <div className="flex flex-wrap gap-2">
              {(['person', 'background'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setResult(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    mode === m ? 'border-primary bg-primary/8 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
                  }`}
                >
                  {m === 'person' ? L.keepPerson : L.keepBackground}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">{L.original}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview || ''} alt={L.original} className="w-full rounded-xl max-h-56 object-contain bg-muted/30" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">{L.result}</p>
                {result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={result} alt={L.result} className="w-full rounded-xl max-h-56 object-contain bg-[repeating-conic-gradient(#e5e7eb_0%_25%,#f9fafb_0%_50%)] bg-[length:16px_16px]" />
                ) : (
                  <div className="w-full rounded-xl max-h-56 aspect-[4/3] flex items-center justify-center border border-dashed border-border text-xs text-muted-foreground">
                    {loading ? L.loadingModel : '—'}
                  </div>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

            <div className="flex flex-wrap gap-3">
              <Button onClick={removeBackground} loading={loading} icon={<Eraser className="w-4 h-4" />}>
                {loading ? L.removing : mode === 'person' ? L.removeBg : L.removePerson}
              </Button>
              {result && (
                <Button variant="secondary" onClick={download} icon={<Download className="w-4 h-4" />}>{L.download}</Button>
              )}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(null); setResult(null); }}>{L.changeImage}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}