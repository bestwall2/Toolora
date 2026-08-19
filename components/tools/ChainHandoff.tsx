'use client';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ArrowRight, Send } from 'lucide-react';
import { withLocale } from '@/lib/i18n/config';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';
import { setChainHandoff } from '@/lib/toolchain/chain-store';
import { trackEvent } from '@/lib/analytics';

interface ChainHandoffProps {
  sourceSlug: string;
  blob: Blob;
  fileName: string;
  variant?: 'panel' | 'menu';
  label?: string;
}

/** Lists tools that can receive this source's output type. */
export function getChainTargets(
  sourceSlug: string,
  tools: { id: string; category: string; name: string; inputType?: string; outputType?: string }[]
) {
  const source = tools.find((t) => t.id === sourceSlug);
  if (!source) return [];
  const acceptedType = source.outputType as 'image' | 'pdf' | undefined;
  if (!acceptedType) return [];
  return tools.filter((t) => t.id !== sourceSlug && (t.inputType as 'image' | 'pdf' | undefined) === acceptedType);
}

export function ChainHandoff({ sourceSlug, blob, fileName, variant = 'panel', label }: ChainHandoffProps) {
  const { locale, tools, t } = useLocaleContext();
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);

  const targets = getChainTargets(sourceSlug, tools);
  if (targets.length === 0) return null;

  const chainTo = (targetId: string) => {
    const target = tools.find((x) => x.id === targetId);
    if (!target) return;
    const mime = sourceSlug.startsWith('pdf') || target.inputType === 'pdf' ? 'application/pdf' : blob.type || 'image/png';
    setChainHandoff(targetId, {
      blob,
      fileName,
      mime,
      source: sourceSlug,
    }).then(() => {
      trackEvent('chain_used', { from: sourceSlug, to: targetId });
      router.push(withLocale(locale, `/tools/${target.category}/${target.id}`));
    });
  };

  const title = label ?? t.chain.title;

  if (variant === 'menu') {
    const openMenu = () => {
      const rect = btnRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    };

    return (
      <>
        <button
          ref={btnRef}
          onClick={openMenu}
          className="p-2 rounded-lg bg-card text-foreground hover:bg-muted shadow-lg transition-transform scale-90 group-hover:scale-100"
          aria-label={t.chain.sendTo}
          title={t.chain.sendTo}
        >
          <Send className="w-4 h-4" />
        </button>
        {pos &&
          createPortal(
            <>
              <div className="fixed inset-0 z-40" onClick={() => setPos(null)} aria-hidden="true" />
              <div
                className="fixed z-50 w-48 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
                style={{ top: pos.top, right: pos.right }}
                role="menu"
              >
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground border-b border-border bg-muted/30">
                  {title}
                </p>
                {targets.map((tgt) => (
                  <button
                    key={tgt.id}
                    data-chain-target={tgt.id}
                    onClick={() => chainTo(tgt.id)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted text-left transition-colors"
                    role="menuitem"
                  >
                    {tgt.name}
                    <ArrowRight className="w-3 h-3 text-muted-foreground rtl:rotate-180" />
                  </button>
                ))}
              </div>
            </>,
            document.body
          )}
      </>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3" data-chain-panel>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {targets.map((tgt) => (
          <button
            key={tgt.id}
            data-chain-target={tgt.id}
            onClick={() => chainTo(tgt.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
          >
            {tgt.name}
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        ))}
      </div>
    </div>
  );
}