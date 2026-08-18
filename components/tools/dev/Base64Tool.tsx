'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

export function Base64Tool() {
  const L = useToolLabels('base64-tool');
  const { t } = useLocaleContext();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'base64-tool' });
  }, []);

  const handleProcess = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        // Use btoa safely supporting unicode characters via escape & encodeURIComponent
        const unicodeBase64 = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(unicodeBase64);
      } else {
        const decoded = decodeURIComponent(
          atob(input)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        setOutput(decoded);
      }
      trackEvent('file_processed', { tool: 'base64-tool', mode });
    } catch {
      setError(
        mode === 'decode'
          ? L.decodeError
          : L.encodeError
      );
      setOutput('');
    }
  };

  const handleCopy = () => {
    copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('download_clicked', { tool: 'base64-tool' });
  };

  const swapMode = () => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput(input);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-foreground">
            {mode === 'encode' ? L.encodeTitle : L.decodeTitle}
          </p>
          <Button variant="ghost" size="sm" onClick={swapMode} icon={<ArrowDownUp className="w-3.5 h-3.5" />}>
            {L.swap}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="base64-input" className="text-xs text-muted-foreground">{L.input}</label>
            <textarea
              id="base64-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? L.inputPlaceholderEncode : L.inputPlaceholderDecode}
              className="w-full h-48 p-3 rounded-xl border border-border bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="base64-output" className="text-xs text-muted-foreground">{L.output}</label>
            <textarea
              id="base64-output"
              value={output}
              readOnly
              placeholder={L.outputPlaceholder}
              className="w-full h-48 p-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm resize-y focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}

        <div className="flex gap-2 justify-between items-center pt-3 border-t border-border">
          <div className="flex gap-2">
            <Button onClick={handleProcess}>
              {mode === 'encode' ? L.encode : L.decode}
            </Button>
            {output && (
              <Button variant="secondary" onClick={handleCopy} icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}>
                {copied ? t.toolUi.common.copied : L.copyResult}
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setInput(''); setOutput(''); setError(null); }}>
            {t.toolUi.common.clear}
          </Button>
        </div>
      </div>
    </div>
  );
}
