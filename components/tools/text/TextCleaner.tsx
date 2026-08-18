'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Eraser } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function TextCleaner() {
  const L = useToolLabels('text-cleaner');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Options
  const [options, setOptions] = useState({
    trimLines: true,
    removeExtraSpaces: true,
    removeEmptyLines: true,
    removeDuplicates: false,
    normalizeLineBreaks: true,
  });

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'text-cleaner' });
  }, []);

  const cleanText = () => {
    if (!text) return;
    
    let processed = text;

    // Normalize line breaks to \n
    if (options.normalizeLineBreaks) {
      processed = processed.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    let lines = processed.split('\n');

    // Trim lines
    if (options.trimLines) {
      lines = lines.map((line) => line.trim());
    }

    // Remove empty lines
    if (options.removeEmptyLines) {
      lines = lines.filter((line) => line.length > 0);
    }

    // Remove duplicates
    if (options.removeDuplicates) {
      const seen = new Set<string>();
      lines = lines.filter((line) => {
        if (seen.has(line)) return false;
        seen.add(line);
        return true;
      });
    }

    processed = lines.join('\n');

    // Remove extra spaces (e.g., multiple spaces inside lines to a single space)
    if (options.removeExtraSpaces) {
      processed = processed.replace(/[ \t]+/g, ' ');
    }

    setResult(processed);
    trackEvent('file_processed', { tool: 'text-cleaner' });
  };

  const handleCopy = () => {
    copyToClipboard(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('download_clicked', { tool: 'text-cleaner' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="cleaner-input" className="text-xs font-medium text-muted-foreground">{L.input}</label>
            <textarea
              id="cleaner-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={L.inputPlaceholder}
              className="w-full h-64 p-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cleaner-result" className="text-xs font-medium text-muted-foreground">{L.cleaned}</label>
            <textarea
              id="cleaner-result"
              value={result}
              readOnly
              placeholder={L.resultPlaceholder}
              className="w-full h-64 p-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm resize-y focus:outline-none"
            />
          </div>
        </div>

        {/* Options Panel */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-card space-y-5 h-fit">
          <h3 className="text-sm font-semibold text-foreground">{L.optionsTitle}</h3>
          
          <div className="flex flex-col gap-3">
            {[
              { key: 'trimLines', label: L.trimLines, desc: L.trimLinesDesc },
              { key: 'removeExtraSpaces', label: L.extraSpaces, desc: L.extraSpacesDesc },
              { key: 'removeEmptyLines', label: L.removeEmptyLines, desc: L.removeEmptyLinesDesc },
              { key: 'removeDuplicates', label: L.removeDuplicates, desc: L.removeDuplicatesDesc },
              { key: 'normalizeLineBreaks', label: L.normalizeBreaks, desc: L.normalizeBreaksDesc },
            ].map((opt) => (
              <label key={opt.key} className="flex items-start gap-2.5 text-sm text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options[opt.key as keyof typeof options]}
                  onChange={(e) => setOptions((prev) => ({ ...prev, [opt.key]: e.target.checked }))}
                  className="rounded text-primary focus:ring-primary mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button onClick={cleanText} icon={<Eraser className="w-4 h-4" />} className="w-full">
              {L.clean}
            </Button>
            {result && (
              <Button
                variant="secondary"
                onClick={handleCopy}
                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                className="w-full"
              >
                {copied ? 'Copied!' : L.copyResult}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
