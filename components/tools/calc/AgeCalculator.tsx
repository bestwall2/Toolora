'use client';

import { useState, useEffect, useMemo } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function AgeCalculator() {
  const L = useToolLabels('age-calculator');
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'age-calculator' });
  }, []);

  const result = useMemo(() => {
    if (!birthDate) return null;
    const dob = new Date(birthDate);
    if (isNaN(dob.getTime())) return null;

    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months = 12 + months;
    }

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days = prevMonth.getDate() + days;
      months--;
      if (months < 0) {
        months = 11;
        years--;
      }
    }

    // Total days lived
    const diffTime = Math.abs(today.getTime() - dob.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }, [birthDate]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="birth-date" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.selectDob}</label>
          <input
            id="birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          />
        </div>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            {[
              { label: L.years, value: result.years },
              { label: L.months, value: result.months },
              { label: L.days, value: result.days },
              { label: L.totalDays, value: result.totalDays.toLocaleString() },
            ].map((card) => (
              <div key={card.label} className="p-4 rounded-xl border border-border bg-muted/20 text-center">
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">{card.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
