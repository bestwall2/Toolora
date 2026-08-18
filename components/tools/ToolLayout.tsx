import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ToolLayoutProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  description: string;
  isBrowserSide?: boolean;
  badge?: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  homeLabel?: string;
  homeHref?: string;
  browserBasedLabel?: string;
}

export function ToolLayout({
  breadcrumbs,
  title,
  description,
  isBrowserSide = true,
  badge,
  children,
  sidebar,
  homeLabel = 'Home',
  homeHref = '/',
  browserBasedLabel = 'Browser-based',
}: ToolLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link href={homeHref} className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" />
          {homeLabel}
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3" />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-foreground transition-colors capitalize">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
          <div className="flex items-center gap-2 mt-1">
            {isBrowserSide && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                {browserBasedLabel}
              </span>
            )}
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {badge}
              </span>
            )}
          </div>
        </div>
        <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
      </div>

      {/* Main content */}
      <div className={cn('gap-8', sidebar ? 'lg:grid lg:grid-cols-3' : '')}>
        <div className={sidebar ? 'lg:col-span-2' : ''}>{children}</div>
        {sidebar && <aside className="space-y-6 mt-8 lg:mt-0">{sidebar}</aside>}
      </div>
    </div>
  );
}