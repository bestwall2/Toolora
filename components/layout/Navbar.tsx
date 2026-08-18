'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Sun, Moon, Search, Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { withLocale } from '@/lib/i18n/config';

const emptySubscribe = () => () => {};

const SearchModal = dynamic(
  () => import('@/components/search/SearchModal').then((m) => m.SearchModal),
  { ssr: false }
);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const pathname = usePathname();
  const { locale, t } = useLocaleContext();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const cycleTheme = () => {
    if (resolvedTheme === 'light') setTheme('dark');
    else setTheme('light');
  };

  const navLinks = [
    { href: withLocale(locale, '/tools'), label: t.nav.allTools },
    { href: withLocale(locale, '/tools/image'), label: t.nav.images },
    { href: withLocale(locale, '/tools/pdf'), label: t.nav.pdf },
    { href: withLocale(locale, '/tools/developer'), label: t.nav.devTools },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-200',
          isScrolled
            ? 'bg-card/90 backdrop-blur-md border-b border-border shadow-card'
            : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={withLocale(locale, '/')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                <Zap className="w-4 h-4 text-white fill-white" strokeWidth={0} />
              </div>
              <span className="font-semibold text-lg tracking-tight text-foreground">Toolora</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href || pathname?.startsWith(link.href + '/')
                      ? 'text-primary bg-primary/8'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all bg-muted/50 hover:bg-muted"
                aria-label={t.nav.searchTools}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{t.nav.searchPlaceholder}</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-background border border-border font-mono">
                  ⌃K
                </kbd>
              </button>

              {/* Mobile search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={t.nav.search}
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Language switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={cycleTheme}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label={t.nav.toggleTheme}
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-4.5 h-4.5" />
                  ) : (
                    <Moon className="w-4.5 h-4.5" />
                  )}
                </button>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.toggleMenu}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/8'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}