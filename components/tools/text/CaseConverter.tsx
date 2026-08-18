'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function CaseConverter() {
  const L = useToolLabels('case-converter');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'case-converter' });
  }, []);

  const handleCopy = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('download_clicked', { tool: 'case-converter' });
  };

  const toUpper = () => {
    setText(text.toUpperCase());
    trackEvent('file_processed', { tool: 'case-converter', type: 'upper' });
  };

  const toLower = () => {
    setText(text.toLowerCase());
    trackEvent('file_processed', { tool: 'case-converter', type: 'lower' });
  };

  const toTitle = () => {
    const titleCased = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(titleCased);
    trackEvent('file_processed', { tool: 'case-converter', type: 'title' });
  };

  const toSentence = () => {
    const sentences = text.split(/([.!?]\s*)/);
    const result = sentences
      .map((s, idx) => {
        // If it's a punctuation separator, return as is
        if (idx % 2 !== 0) return s;
        // Trim and capitalize first letter
        const trimmed = s.trim();
        if (!trimmed) return s;
        return s.replace(trimmed, trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
      })
      .join('');
    setText(result);
    trackEvent('file_processed', { tool: 'case-converter', type: 'sentence' });
  };

  const toCamel = () => {
    const words = text.toLowerCase().replace(/[^a-zA-Z0-9\s-_]/g, '').split(/[\s-_]+/);
    const result = words
      .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join('');
    setText(result);
    trackEvent('file_processed', { tool: 'case-converter', type: 'camel' });
  };

  const toPascal = () => {
    const words = text.toLowerCase().replace(/[^a-zA-Z0-9\s-_]/g, '').split(/[\s-_]+/);
    const result = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    setText(result);
    trackEvent('file_processed', { tool: 'case-converter', type: 'pascal' });
  };

  const toSnake = () => {
    const result = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .trim()
      .split(/[\s-_]+/)
      .join('_');
    setText(result);
    trackEvent('file_processed', { tool: 'case-converter', type: 'snake' });
  };

  const toKebab = () => {
    const result = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .trim()
      .split(/[\s-_]+/)
      .join('-');
    setText(result);
    trackEvent('file_processed', { tool: 'case-converter', type: 'kebab' });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label={L.ariaLabel}
          placeholder={L.placeholder}
          className="w-full h-64 p-4 rounded-xl border border-border bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button variant="secondary" size="sm" onClick={toUpper}>{L.upper}</Button>
          <Button variant="secondary" size="sm" onClick={toLower}>{L.lower}</Button>
          <Button variant="secondary" size="sm" onClick={toTitle}>{L.titleCase}</Button>
          <Button variant="secondary" size="sm" onClick={toSentence}>{L.sentenceCase}</Button>
          <Button variant="secondary" size="sm" onClick={toCamel}>{L.camelCase}</Button>
          <Button variant="secondary" size="sm" onClick={toPascal}>{L.pascalCase}</Button>
          <Button variant="secondary" size="sm" onClick={toSnake}>{L.snakeCase}</Button>
          <Button variant="secondary" size="sm" onClick={toKebab}>{L.kebabCase}</Button>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {text.length} {L.characters} · {text.trim().split(/\s+/).filter(Boolean).length} {L.words}
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={!text}
              onClick={handleCopy}
              icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : L.copyText}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setText('')}>
              {L.clear}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
