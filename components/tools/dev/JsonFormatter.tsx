'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Code2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard, downloadBlob } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels, useLocaleContext } from '@/components/i18n/LocaleProvider';

export function JsonFormatter() {
  const L = useToolLabels('json-formatter');
  const { t } = useLocaleContext();
  const [json, setJson] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<{ message: string; line?: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'json-formatter' });
  }, []);

  const validateAndProcess = (mode: 'format' | 'minify') => {
    setError(null);
    if (!json.trim()) {
      setResult('');
      return;
    }

    try {
      const parsed = JSON.parse(json);
      const output = mode === 'format' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
      setResult(output);
      trackEvent('file_processed', { tool: 'json-formatter', mode });
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      let lineNum: number | undefined;
      const match = err.message.match(/at position (\d+)/);
      if (match) {
        const pos = Number(match[1]);
        lineNum = json.substring(0, pos).split('\n').length;
      }
      setError({
        message: err.message,
        line: lineNum,
      });
      trackEvent('error_shown', { tool: 'json-formatter', msg: err.message });
    }
  };

  const handleCopy = () => {
    copyToClipboard(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('download_clicked', { tool: 'json-formatter' });
  };

  const handleDownload = () => {
    downloadBlob(new Blob([result], { type: 'application/json' }), 'formatted.json');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="json-input" className="text-xs font-medium text-muted-foreground">{L.input}</label>
            {json && (
              <button
                onClick={() => { setJson(''); setResult(''); setError(null); }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {L.clear}
              </button>
            )}
          </div>
          <textarea
            id="json-input"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder={L.inputPlaceholder}
            className="w-full h-[400px] p-3.5 rounded-xl border border-border bg-card font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
          />
        </div>

        {/* Output */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="json-output" className="text-xs font-medium text-muted-foreground">{L.output}</label>
            {result && (
              <div className="flex gap-2">
                <button onClick={handleCopy} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? t.toolUi.common.copied : L.copy}
                </button>
                <button onClick={handleDownload} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {L.download}
                </button>
              </div>
            )}
          </div>
          <div className="relative h-[400px] rounded-xl border border-border bg-muted/20 font-mono text-xs overflow-hidden flex flex-col">
            {error ? (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 overflow-y-auto h-full space-y-2">
                <p className="font-semibold">{L.errorTitle}</p>
                <p className="text-xs leading-relaxed">{error.message}</p>
                {error.line && (
                  <p className="text-[10px] uppercase font-bold tracking-wider text-red-500 mt-1">
                    {L.errorNearLine} {error.line}
                  </p>
                )}
              </div>
            ) : (
              <textarea
                id="json-output"
                value={result}
                readOnly
                placeholder={L.outputPlaceholder}
                className="w-full h-full p-3.5 bg-transparent outline-none resize-none overflow-y-auto text-foreground"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => validateAndProcess('format')} icon={<Code2 className="w-4 h-4" />}>
          {L.format}
        </Button>
        <Button variant="secondary" onClick={() => validateAndProcess('minify')}>
          {L.minify}
        </Button>
      </div>
    </div>
  );
}
