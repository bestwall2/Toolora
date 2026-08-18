'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

export function UuidGenerator() {
  const L = useToolLabels('uuid-generator');
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, () => uuidv4()));
  const [count, setCount] = useState<number>(5);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'uuid-generator' });
  }, []);

  const generate = () => {
    const list = Array.from({ length: count }, () => uuidv4());
    setUuids(list);
    trackEvent('file_processed', { tool: 'uuid-generator', count });
  };

  const handleCopyAll = () => {
    copyToClipboard(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
    trackEvent('download_clicked', { tool: 'uuid-generator', type: 'all' });
  };

  const handleCopySingle = (text: string, index: number) => {
    copyToClipboard(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    trackEvent('download_clicked', { tool: 'uuid-generator', type: 'single' });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">{L.count}</span>
            <div className="flex gap-1.5">
              {[1, 5, 10, 50, 100].map((num) => (
                <button
                  key={num}
                  onClick={() => setCount(num)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    count === num
                      ? 'border-primary bg-primary/8 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={generate} icon={<RefreshCw className="w-4 h-4" />}>
              {L.generate}
            </Button>
            {uuids.length > 0 && (
              <Button
                variant="secondary"
                onClick={handleCopyAll}
                icon={copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copiedAll ? L.copied : L.copy}
              </Button>
            )}
          </div>
        </div>

        {uuids.length > 0 && (
          <div className="border border-border rounded-xl bg-muted/20 divide-y divide-border max-h-96 overflow-y-auto font-mono text-sm">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/40 transition-colors">
                <span className="text-foreground">{uuid}</span>
                <button
                  onClick={() => handleCopySingle(uuid, idx)}
                  className="p-1.5 rounded-lg border border-border hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
                  title={L.copy}
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
