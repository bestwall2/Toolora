'use client';

import { useEffect, useState } from 'react';
import { Copy, Check, Upload, X, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatBytes, copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

type Algo = 'SHA-256' | 'SHA-384' | 'SHA-512';

const ALGOS: { value: Algo; label: string }[] = [
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-384', label: 'SHA-384' },
  { value: 'SHA-512', label: 'SHA-512' },
];

export function ShaHashGenerator() {
  const L = useToolLabels('sha-hash-generator');
  const [algo, setAlgo] = useState<Algo>('SHA-256');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      try {
        let data: ArrayBuffer;
        if (text) {
          data = new TextEncoder().encode(text).buffer;
        } else if (file) {
          data = await file.arrayBuffer();
        } else {
          setHash('');
          return;
        }
        const digest = await crypto.subtle.digest(algo, data);
        if (cancelled) return;
        setHash(
          Array.from(new Uint8Array(digest))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
        );
      } catch {
        if (!cancelled) setHash('');
      }
    };
    void compute();
    return () => {
      cancelled = true;
    };
  }, [algo, text, file]);

  const copyHash = async () => {
    if (!hash) return;
    await copyToClipboard(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    trackEvent('tool_used', { tool: 'sha-hash-generator', algo });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <div className="flex flex-wrap gap-2">
          {ALGOS.map((a) => (
            <button
              key={a.value}
              onClick={() => setAlgo(a.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                algo === a.value ? 'border-primary bg-primary/8 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground font-medium">
            <span>{L.textTab}</span>
            {file && (
              <span className="inline-flex items-center gap-1 text-[11px]">
                <span>{formatBytes(file.size)}</span>
                <button
                  onClick={() => setFile(null)}
                  className="p-0.5 rounded hover:text-foreground hover:bg-muted"
                  aria-label={L.changeFile}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={L.placeholder}
            rows={4}
            disabled={!!file}
            className="w-full p-3 rounded-xl border border-border bg-muted/20 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y text-foreground disabled:opacity-50"
          />
          {file ? (
            <Button variant="secondary" size="sm" onClick={() => setFile(null)} icon={<X className="w-4 h-4" />}>
              {L.changeFile}: {file.name}
            </Button>
          ) : (
            <label className="inline-flex items-center gap-2 text-xs font-medium text-primary cursor-pointer hover:underline">
              <Upload className="w-3.5 h-3.5" />
              {L.chooseFile}
              <input
                type="file"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setFile(f);
                    setText('');
                  }
                }}
              />
            </label>
          )}
          <p className="text-xs text-muted-foreground">{L.fileHint}</p>
        </div>

        {hash && (
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">{L.hash} ({algo})</p>
              <Button variant="ghost" size="sm" onClick={copyHash} icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}>
                {copied ? L.copied : L.copy}
              </Button>
            </div>
            <p className="font-mono text-xs break-all text-foreground leading-relaxed">{hash}</p>
          </div>
        )}

        {!hash && (
          <div className="flex items-center gap-2 p-4 rounded-xl border border-dashed border-border text-xs text-muted-foreground">
            <Fingerprint className="w-4 h-4 flex-shrink-0" />
            {L.emptyHint}
          </div>
        )}
      </div>
    </div>
  );
}