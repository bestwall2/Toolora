'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchTools } from '@/lib/search';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';
import { withLocale } from '@/lib/i18n/config';

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [rawActiveIndex, setRawActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t, tools, categories, locale } = useLocaleContext();

  const results = useMemo(() => (query.trim() ? searchTools(tools, query) : []), [query, tools]);
  const activeIndex = Math.min(rawActiveIndex, results.length - 1);
  const popularTools = useMemo(() => tools.filter((tool) => tool.isPopular).slice(0, 6), [tools]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
    trackEvent('search_used', { query: '' });
  }, []);

  const goToTool = useCallback(
    (category: string, slug: string) => {
      router.push(withLocale(locale, `/tools/${category}/${slug}`));
      onClose();
    },
    [router, onClose, locale]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setRawActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setRawActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        const tool = results[activeIndex];
        goToTool(tool.category, tool.slug);
      }
    },
    [results, activeIndex, onClose, goToTool]
  );

  const getCategoryColor = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.color || 'text-muted-foreground';
  };

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || categoryId;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.searchModal.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-xl animate-slide-up overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            aria-label={t.searchModal.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setRawActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t.searchModal.placeholder}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t.common.clear}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono hover:text-foreground transition-colors"
          >
            {t.searchModal.esc}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((tool, i) => (
              <li key={tool.id}>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-start transition-colors',
                    i === activeIndex ? 'bg-muted' : 'hover:bg-muted/60'
                  )}
                  onClick={() => goToTool(tool.category, tool.slug)}
                  onMouseEnter={() => setRawActiveIndex(i)}
                >
                  <span
                    className={cn(
                      'text-xs font-medium capitalize px-1.5 py-0.5 rounded bg-muted',
                      getCategoryColor(tool.category)
                    )}
                  >
                    {getCategoryName(tool.category)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{tool.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 rtl:rotate-180" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty */}
        {query && results.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t.searchModal.noResults} &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-1">{t.searchModal.tryDifferent}</p>
          </div>
        )}

        {/* Default state */}
        {!query && (
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-3 font-medium">{t.searchModal.popularTools}</p>
            <div className="flex flex-wrap gap-2">
              {popularTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setQuery(tool.name)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center gap-4 text-xs text-muted-foreground">
          <span>↑↓ {t.searchModal.navigate}</span>
          <span>↵ {t.searchModal.open}</span>
          <span>{t.searchModal.esc} {t.searchModal.close}</span>
        </div>
      </div>
    </div>
  );
}