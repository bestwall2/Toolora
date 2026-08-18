import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tool } from '@/data/tools';
import { categories as enCategories } from '@/data/categories';
import { localizeCategory } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

export function RelatedTools({ tools, title = 'People also use', locale = 'en' }: { tools: Tool[]; title?: string; locale?: Locale }) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.slice(0, 6).map((tool) => {
          const cat = localizeCategory(enCategories.find((c) => c.id === tool.category)!, locale);
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={withLocale(locale, `/tools/${tool.category}/${tool.slug}`)}
              className="group flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-card-hover transition-all duration-200"
            >
              <div className={`p-2 rounded-lg ${cat?.bgColor || 'bg-muted'} flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${cat?.color || 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{tool.description}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}