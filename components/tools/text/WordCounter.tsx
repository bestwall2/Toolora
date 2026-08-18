'use client';

import { useState, useEffect, useMemo } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function WordCounter() {
  const L = useToolLabels('word-counter');
  const [text, setText] = useState('');

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'word-counter' });
  }, []);

  const { stats, keywordDensity } = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;

    // Words count
    const wordsArray = text.trim().split(/\s+/).filter(Boolean);
    const words = wordsArray.length;

    // Sentences count (split by punctuation followed by space or end of string)
    const sentences = text.split(/[.!?]+(\s|$)/).filter(p => p && p.trim().length > 0).length;

    // Paragraphs count (split by double line breaks or single line breaks that are not empty)
    const paragraphs = text.split(/\n+/).filter(p => p && p.trim().length > 0).length;

    // Reading time (average 200 WPM)
    const readingTime = Math.ceil(words / 200);

    const stats = { chars, charsNoSpaces, words, sentences, paragraphs, readingTime };

    // Calculate Keyword Density (exclude short words, lowercase everything)
    const wordCounts: Record<string, number> = {};
    wordsArray.forEach((w) => {
      const cleaned = w.toLowerCase().replace(/[^a-zA-Z0-9'-]/g, '');
      if (cleaned.length > 3) {
        wordCounts[cleaned] = (wordCounts[cleaned] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
        percent: words > 0 ? Math.round((count / words) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return { stats, keywordDensity };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: L.words, value: stats.words },
          { label: L.characters, value: stats.chars },
          { label: L.noSpaces, value: stats.charsNoSpaces },
          { label: L.sentences, value: stats.sentences },
          { label: L.paragraphs, value: stats.paragraphs },
          { label: L.readingTime, value: `${stats.readingTime} ${L.minutes}` },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl border border-border bg-card shadow-sm text-center">
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label={L.ariaLabel}
            placeholder={L.placeholder}
            className="w-full h-80 p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
          />
          {text && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setText('')}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {L.clearText}
              </button>
            </div>
          )}
        </div>

        {/* Keyword Density */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-foreground">{L.topKeywords}</h3>
          {keywordDensity.length === 0 ? (
            <p className="text-xs text-muted-foreground">{L.typeHint}</p>
          ) : (
            <ul className="space-y-3">
              {keywordDensity.map((item) => (
                <li key={item.word} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground truncate max-w-[120px]">{item.word}</span>
                    <span className="text-muted-foreground">{item.count} times ({item.percent}%)</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(100, item.percent * 2)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
