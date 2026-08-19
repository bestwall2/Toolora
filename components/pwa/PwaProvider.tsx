'use client';

import { useEffect, useState, useCallback } from 'react';
import { WifiOff, Download, X, RotateCw } from 'lucide-react';

interface PwaStrings {
  installTitle: string;
  installDesc: string;
  installNow: string;
  dismiss: string;
  offlineTitle: string;
  offlineDesc: string;
  tryAgain: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaProvider({ strings }: { strings: PwaStrings }) {
  const [online, setOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('toollora-install-dismissed') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setDeferredPrompt(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismissInstall = useCallback(() => {
    setDeferredPrompt(null);
    setInstallDismissed(true);
    try {
      sessionStorage.setItem('toollora-install-dismissed', '1');
    } catch {
      /* ignore */
    }
  }, []);

  const showInstall = deferredPrompt && !installDismissed;

  return (
    <>
      {!online && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-0 inset-x-0 z-50 bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-900 px-4 py-2"
        >
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300 flex-1">
              {strings.offlineTitle} — {strings.offlineDesc}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
              {strings.tryAgain}
            </button>
          </div>
        </div>
      )}

      {showInstall && (
        <div
          role="dialog"
          aria-label={strings.installTitle}
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:max-w-sm z-50 rounded-2xl border border-border bg-card shadow-lg p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">{strings.installTitle}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{strings.installDesc}</p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleInstall}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  {strings.installNow}
                </button>
                <button
                  type="button"
                  onClick={dismissInstall}
                  className="rounded-lg border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent transition-colors"
                >
                  {strings.dismiss}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissInstall}
              aria-label={strings.dismiss}
              className="text-muted-foreground hover:text-foreground p-1 -m-1"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}