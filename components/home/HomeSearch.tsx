'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';

const SearchModal = dynamic(
  () => import('@/components/search/SearchModal').then((m) => m.SearchModal),
  { ssr: false }
);

export function HomeSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useLocaleContext();

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all shadow-sm text-sm group"
      >
        <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span>{t.searchModal.placeholder}</span>
        <kbd className="ml-auto inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-muted border border-border font-mono">
          ⌃K
        </kbd>
      </button>
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}