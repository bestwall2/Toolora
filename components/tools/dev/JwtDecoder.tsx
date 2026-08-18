'use client';

import { useState, useEffect, useMemo } from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export function JwtDecoder() {
  const L = useToolLabels('jwt-decoder');
  const [token, setToken] = useState('');

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'jwt-decoder' });
  }, []);

  const { header, payload, error } = useMemo(() => {
    if (!token.trim()) return { header: '', payload: '', error: null as string | null };

    const parts = token.split('.');
    if (parts.length !== 3) {
      return { header: '', payload: '', error: L.invalidStructure };
    }

    try {
      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));
      return {
        header: JSON.stringify(decodedHeader, null, 2),
        payload: JSON.stringify(decodedPayload, null, 2),
        error: null,
      };
    } catch {
      return { header: '', payload: '', error: L.invalidClaims };
    }
  }, [token, L.invalidClaims, L.invalidStructure]);

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 flex gap-3 text-sm text-blue-700 dark:text-blue-400">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">{L.privacyTitle}</p>
          <p className="text-xs leading-relaxed text-blue-600/90 dark:text-blue-400/90">
            {L.privacyDesc}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="jwt-token" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.pasteToken}</label>
        <textarea
          id="jwt-token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={L.tokenPlaceholder}
          className="w-full h-24 p-3 rounded-xl border border-border bg-card font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-y"
        />
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 text-xs text-red-700 dark:text-red-400 flex gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {header && payload && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.header}</p>
            <pre className="p-4 rounded-xl border border-border bg-muted/20 text-xs font-mono overflow-auto h-64 text-foreground">
              {header}
            </pre>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{L.payload}</p>
            <pre className="p-4 rounded-xl border border-border bg-muted/20 text-xs font-mono overflow-auto h-64 text-foreground">
              {payload}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
