'use client';

import { useState, useEffect, useMemo } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function DiscountCalculator() {
  const L = useToolLabels('discount-calculator');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'discount-calculator' });
  }, []);

  const result = useMemo(() => {
    const p = parseFloat(price);
    const d = parseFloat(discount);

    if (!isNaN(p) && !isNaN(d)) {
      const saved = (p * d) / 100;
      const final = p - saved;
      return { saved, final };
    }
    return null;
  }, [price, discount]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="discount-price" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.price}</label>
            <input
              id="discount-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={L.pricePlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="discount-percent" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.discount}</label>
            <input
              id="discount-percent"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder={L.discountPlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              min={0}
              max={100}
            />
          </div>
        </div>

        {result && (
          <div className="mt-5 p-4 rounded-xl bg-muted/20 border border-border grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">{L.youSave}</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${result.saved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{L.finalPrice}</p>
              <p className="text-2xl font-bold text-foreground">
                ${result.final.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
