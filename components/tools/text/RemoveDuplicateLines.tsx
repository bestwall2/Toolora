'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function RemoveDuplicateLines() {
  const L = useToolLabels('remove-duplicate-lines');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Options
  const [keepOccurrence, setKeepOccurrence] = useState<'first' | 'last'>('first');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'remove-duplicate-lines' });
  }, []);

  const processText = () => {
    if (!text) return;
    
    const lines = text.split(/\r?\n/);
    const seen = new Set<string>();
    const processedLines: string[] = [];

    if (keepOccurrence === 'first') {
      for (const line of lines) {
        if (removeEmptyLines && line.trim() === '') continue;
        const compareKey = caseSensitive ? line : line.toLowerCase();
        if (!seen.has(compareKey)) {
          seen.add(compareKey);
          processedLines.push(line);
        }
      }
    } else {
      // Keep last occurrence: process backwards
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        if (removeEmptyLines && line.trim() === '') continue;
        const compareKey = caseSensitive ? line : line.toLowerCase();
        if (!seen.has(compareKey)) {
          seen.add(compareKey);
          processedLines.unshift(line);
        }
      }
    }

    if (sortAlphabetically) {
      processedLines.sort((a, b) => a.localeCompare(b));
    }

    setResult(processedLines.join('\n'));
    trackEvent('file_processed', { tool: 'remove-duplicate-lines' });
  };

  const handleCopy = () => {
    copyToClipboard(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('download_clicked', { tool: 'remove-duplicate-lines' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="dup-input" className="text-xs font-medium text-muted-foreground">{L.input}</label>
            <textarea
              id="dup-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={L.inputPlaceholder}
              className="w-full h-64 p-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="dup-result" className="text-xs font-medium text-muted-foreground">{L.result}</label>
            <textarea
              id="dup-result"
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
          
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.mode}</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="radio"
                  name="occurrence"
                  checked={keepOccurrence === 'first'}
                  onChange={() => setKeepOccurrence('first')}
                  className="text-primary"
                />
                {L.keepFirst}
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="radio"
                  name="occurrence"
                  checked={keepOccurrence === 'last'}
                  onChange={() => setKeepOccurrence('last')}
                  className="text-primary"
                />
                {L.keepLast}
              </label>
            </div>
          </div>

          <hr className="border-border" />

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.filtering}</p>
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                {L.caseSensitive}
              </label>
              <label className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeEmptyLines}
                  onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                {L.removeEmptyLines}
              </label>
              <label className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={sortAlphabetically}
                  onChange={(e) => setSortAlphabetically(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                {L.sortAlphabetically}
              </label>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button onClick={processText} icon={<ListFilter className="w-4 h-4" />} className="w-full">
              {L.remove}
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
