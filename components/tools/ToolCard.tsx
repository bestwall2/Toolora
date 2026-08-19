import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArrowRight } from 'lucide-react';
import { withLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    slug: string;
    category: string;
    isPopular?: boolean;
    icon: ComponentType<{ className?: string }>;
  };
  locale: Locale;
  categoryName?: string;
  categoryColor?: string;
  categoryBg?: string;
  popularLabel?: string;
  useToolLabel?: string;
}

export function ToolCard({
  tool,
  locale,
  categoryName,
  categoryColor,
  categoryBg,
  popularLabel = 'Popular',
  useToolLabel = 'Use Tool',
}: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={withLocale(locale, `/tools/${tool.category}/${tool.slug}`)}
      className="group block p-5 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/25 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl ${categoryBg || 'bg-muted'} flex-shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon className={`w-5 h-5 ${categoryColor || 'text-muted-foreground'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
            {tool.isPopular && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400 font-medium">
                {popularLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{tool.description}</p>
        </div>
      </div>
      <div className="mt-3.5 flex items-center justify-between">
        <span className={`text-xs font-medium capitalize ${categoryColor || 'text-muted-foreground'}`}>
          {categoryName || tool.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary group-hover:gap-1.5 transition-all">
          {useToolLabel} <ArrowRight className="w-3 h-3 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}