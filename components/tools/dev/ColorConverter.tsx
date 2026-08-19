'use client';

import { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

interface RGB { r: number; g: number; b: number }
interface HSL { h: number; s: number; l: number }

const hexToRgb = (hex: string): RGB | null => {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

const rgbToHex = ({ r, g, b }: RGB): string =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      default: h = (rn - gn) / d + 4;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = ({ h, s, l }: HSL): RGB => {
  const sn = s / 100;
  const ln = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(v)));

const INITIAL: RGB = { r: 37, g: 99, b: 235 };

export function ColorConverter() {
  const L = useToolLabels('color-converter');
  const [rgb, setRgb] = useState<RGB>(INITIAL);
  const [hexDraft, setHexDraft] = useState(rgbToHex(INITIAL));
  const [rgbDraft, setRgbDraft] = useState({ r: '37', g: '99', b: '235' });
  const [hslDraft, setHslDraft] = useState({ h: '221', s: '83', l: '53' });
  const [copied, setCopied] = useState<'hex' | 'rgb' | 'hsl' | null>(null);

  const syncFromRgb = (next: RGB) => {
    setHexDraft(rgbToHex(next));
    setRgbDraft({ r: String(next.r), g: String(next.g), b: String(next.b) });
    const hsl = rgbToHsl(next);
    setHslDraft({ h: String(hsl.h), s: String(hsl.s), l: String(hsl.l) });
  };

  const commit = (next: RGB) => {
    if (next.r < 0 || next.r > 255 || next.g < 0 || next.g > 255 || next.b < 0 || next.b > 255) return;
    setRgb(next);
    syncFromRgb(next);
    trackEvent('tool_used', { tool: 'color-converter' });
  };

  const copyFormat = async (which: 'hex' | 'rgb' | 'hsl', value: string) => {
    await copyToClipboard(value);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
    trackEvent('tool_used', { tool: 'color-converter', format: which });
  };

  const hslText = () => {
    const hsl = rgbToHsl(rgb);
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  };

  const rgbText = () => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const onHex = (v: string) => {
    setHexDraft(v);
    const parsed = hexToRgb(v);
    if (parsed) commit(parsed);
  };

  const onRgbChannel = (channel: 'r' | 'g' | 'b', v: string) => {
    setRgbDraft((d) => ({ ...d, [channel]: v }));
    const n = Number(v);
    if (Number.isNaN(n)) return;
    commit({ ...rgb, [channel]: clamp(n, 0, 255) });
  };

  const onHslChannel = (channel: 'h' | 's' | 'l', v: string) => {
    setHslDraft((d) => ({ ...d, [channel]: v }));
    const n = Number(v);
    if (Number.isNaN(n)) return;
    const current = rgbToHsl(rgb);
    const next = { ...current, [channel]: clamp(n, channel === 'h' ? 0 : 0, channel === 'h' ? 360 : 100) };
    commit(hslToRgb(next));
  };

  const numInput =
    'w-20 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground';

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl border border-border shadow-card shrink-0"
            style={{ backgroundColor: rgbToHex(rgb) }}
            aria-label={L.preview}
          />
          <div className="flex-1 space-y-1">
            <label className="flex items-center justify-between gap-2 text-xs text-muted-foreground font-medium">
              {L.hex}
              <input
                type="color"
                value={rgbToHex(rgb)}
                onChange={(e) => onHex(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-border bg-transparent"
                aria-label={L.pick}
              />
            </label>
            <input
              type="text"
              value={hexDraft}
              onChange={(e) => onHex(e.target.value)}
              spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">{L.rgbLabel}</label>
            <div className="flex gap-1.5">
              {(['r', 'g', 'b'] as const).map((c) => (
                <input
                  key={c}
                  type="number"
                  min={0}
                  max={255}
                  value={rgbDraft[c]}
                  onChange={(e) => onRgbChannel(c, e.target.value)}
                  aria-label={c.toUpperCase()}
                  className={numInput}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">{L.hslLabel}</label>
            <div className="flex gap-1.5">
              {(['h', 's', 'l'] as const).map((c) => (
                <input
                  key={c}
                  type="number"
                  min={0}
                  max={c === 'h' ? 360 : 100}
                  value={hslDraft[c]}
                  onChange={(e) => onHslChannel(c, e.target.value)}
                  aria-label={c.toUpperCase()}
                  className={numInput}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">{L.preview}</label>
            <div className="space-y-1.5">
              {[
                { key: 'hex' as const, label: rgbToHex(rgb) },
                { key: 'rgb' as const, label: rgbText() },
                { key: 'hsl' as const, label: hslText() },
              ].map((row) => (
                <Button key={row.key} variant="secondary" size="sm" className="w-full justify-between"
                  onClick={() => copyFormat(row.key, row.label)}
                  icon={copied === row.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  <span className="truncate font-mono text-[11px]">{row.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Palette className="w-4 h-4 flex-shrink-0" />
          {L.hint}
        </div>
      </div>
    </div>
  );
}