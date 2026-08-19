'use client';

import { useState, useRef, useMemo } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Download } from 'lucide-react';
import { ToolDropzone } from '@/components/tools/ToolDropzone';
import { ChainHandoff } from '@/components/tools/ChainHandoff';
import { useChainedInput } from '@/components/tools/useChainedInput';
import { Button } from '@/components/ui/Button';
import { downloadDataUrl, dataUrlToBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

const RATIOS: { label: string; value: number | undefined }[] = [
  { label: 'Free', value: undefined },
  { label: '1:1', value: 1 },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:2', value: 3 / 2 },
];

function centerAspectCrop(w: number, h: number, aspect: number): Crop {
  return centerCrop(makeAspectCrop({ unit: '%', width: 80 }, aspect, w, h), w, h);
}

export function ImageCropper() {
  const L = useToolLabels('image-cropper');
  const { t } = useLocaleContext();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result as string);
    reader.readAsDataURL(f);
    trackEvent('tool_opened', { tool: 'image-cropper' });
  };

  useChainedInput('image-cropper', 'image', ({ blob, fileName }) => {
    handleFile([new File([blob], fileName, { type: blob.type || 'image/png' })]);
  });

  const resultBlob = useMemo(() => (result ? dataUrlToBlob(result) : null), [result]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(w, h, aspect));
    } else {
      setCrop({ unit: '%', x: 10, y: 10, width: 80, height: 80 });
    }
  };

  const setRatio = (value: number | undefined) => {
    setAspect(value);
    if (imgRef.current) {
      const { naturalWidth: w, naturalHeight: h } = imgRef.current;
      if (value) setCrop(centerAspectCrop(w, h, value));
      else setCrop({ unit: '%', x: 10, y: 10, width: 80, height: 80 });
    }
  };

  const cropImage = () => {
    if (!imgRef.current || !crop) return;
    setLoading(true);
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelCrop = completedCrop ?? {
      x: (crop.x / 100) * image.naturalWidth,
      y: (crop.y / 100) * image.naturalHeight,
      width: (crop.width / 100) * image.naturalWidth,
      height: (crop.height / 100) * image.naturalHeight,
    };
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width * scaleX;
    canvas.height = pixelCrop.height * scaleY;
    const ctx = canvas.getContext('2d');
    if (!ctx) { setLoading(false); return; }
    ctx.drawImage(
      image,
      pixelCrop.x * scaleX, pixelCrop.y * scaleY,
      pixelCrop.width * scaleX, pixelCrop.height * scaleY,
      0, 0, canvas.width, canvas.height
    );
    const dataUrl = canvas.toDataURL('image/png');
    const base = (file?.name || 'image').replace(/\.[^.]+$/, '');
    setResult(dataUrl);
    downloadDataUrl(dataUrl, `cropped-${base}.png`);
    setLoading(false);
    trackEvent('download_clicked', { tool: 'image-cropper' });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
        {!imgSrc ? (
          <ToolDropzone
            onFiles={handleFile}
            accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }}
            label={L.uploadLabel}
            sublabel={L.uploadSublabel}
          />
        ) : (
          <div className="space-y-5">
            {/* Ratio buttons */}
            <div className="flex flex-wrap gap-2">
              {RATIOS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setRatio(r.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    aspect === r.value ? 'border-primary bg-primary/8 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Cropper */}
            <div className="flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(_, pct) => setCrop(pct)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                className="max-w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt="Crop me"
                  onLoad={onImageLoad}
                  className="max-h-96 w-auto"
                  style={{ maxWidth: '100%' }}
                />
              </ReactCrop>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={cropImage} loading={loading} icon={<Download className="w-4 h-4" />}>
                {loading ? t.toolUi.common.processing : L.download}
              </Button>
              <Button variant="ghost" onClick={() => { setImgSrc(null); setFile(null); setResult(null); }}>{L.changeImage}</Button>
            </div>

            {resultBlob && (
              <ChainHandoff sourceSlug="image-cropper" blob={resultBlob} fileName={`cropped-${(file?.name || 'image').replace(/\.[^.]+$/, '')}.png`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
