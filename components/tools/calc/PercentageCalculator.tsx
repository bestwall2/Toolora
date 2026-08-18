'use client';

import { useState, useEffect, useMemo } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

type TabId = 'of' | 'is' | 'change';

export function PercentageCalculator() {
  const L = useToolLabels('percentage-calculator');
  const [activeTab, setActiveTab] = useState<TabId>('of');

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'percentage-calculator' });
  }, []);

  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState('');
  const [m1Y, setM1Y] = useState('');

  // Mode 2: X is what percentage of Y?
  const [m2X, setM2X] = useState('');
  const [m2Y, setM2Y] = useState('');

  // Mode 3: Percentage increase/decrease
  const [m3X, setM3X] = useState('');
  const [m3Y, setM3Y] = useState('');

  const m1Res = useMemo(() => {
    const x = parseFloat(m1X);
    const y = parseFloat(m1Y);
    if (!isNaN(x) && !isNaN(y)) return (x / 100) * y;
    return null;
  }, [m1X, m1Y]);

  const m2Res = useMemo(() => {
    const x = parseFloat(m2X);
    const y = parseFloat(m2Y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) return (x / y) * 100;
    return null;
  }, [m2X, m2Y]);

  const m3Res = useMemo(() => {
    const x = parseFloat(m3X);
    const y = parseFloat(m3Y);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      const diff = y - x;
      const pct = (diff / x) * 100;
      return {
        value: Math.abs(pct),
        type: (pct > 0 ? 'increase' : pct < 0 ? 'decrease' : 'none') as 'increase' | 'decrease' | 'none',
      };
    }
    return null;
  }, [m3X, m3Y]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border">
          {[
            { id: 'of', label: L.of },
            { id: 'is', label: L.is },
            { id: 'change', label: L.change },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as TabId); trackEvent('tool_used', { mode: tab.id }); }}
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'of' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">{L.whatIs}</span>
              <input
                type="number"
                value={m1X}
                onChange={(e) => setM1X(e.target.value)}
                placeholder="X"
                aria-label={L.xLabel}
                className="w-full sm:w-28 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-sm font-medium text-muted-foreground">{L.percentOf}</span>
              <input
                type="number"
                value={m1Y}
                onChange={(e) => setM1Y(e.target.value)}
                placeholder="Y"
                aria-label={L.yLabel}
                className="w-full sm:w-28 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {m1Res !== null && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <span className="text-sm text-muted-foreground">{L.result} </span>
                <span className="text-lg font-bold text-foreground">{m1Res.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'is' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="number"
                value={m2X}
                onChange={(e) => setM2X(e.target.value)}
                placeholder="X"
                aria-label={L.xLabel}
                className="w-full sm:w-28 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-sm font-medium text-muted-foreground">{L.isWhatPercentOf}</span>
              <input
                type="number"
                value={m2Y}
                onChange={(e) => setM2Y(e.target.value)}
                placeholder="Y"
                aria-label={L.yLabel}
                className="w-full sm:w-28 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {m2Res !== null && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <span className="text-sm text-muted-foreground">{L.result} </span>
                <span className="text-lg font-bold text-foreground">
                  {m2Res.toLocaleString(undefined, { maximumFractionDigits: 4 })}%
                </span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'change' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">{L.from}</span>
              <input
                type="number"
                value={m3X}
                onChange={(e) => setM3X(e.target.value)}
                placeholder="Old Value"
                aria-label={L.oldValue}
                className="w-full sm:w-32 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-sm font-medium text-muted-foreground">{L.to}</span>
              <input
                type="number"
                value={m3Y}
                onChange={(e) => setM3Y(e.target.value)}
                placeholder="New Value"
                aria-label={L.newValue}
                className="w-full sm:w-32 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {m3Res !== null && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{L.result} </span>
                <span className="text-lg font-bold text-foreground">
                  {m3Res.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}%
                </span>
                {m3Res.type === 'increase' && (
                  <>
                    <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 font-semibold">
                      Increase
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 font-semibold">
                      Decrease
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
