'use client';

import { useState, useEffect } from 'react';
import QRCode, { type QRCodeErrorCorrectionLevel } from 'qrcode';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { downloadDataUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useToolLabels } from '@/components/i18n/LocaleProvider';

type QRType = 'text' | 'url' | 'email' | 'wifi';

export function QrCodeGenerator() {
  const L = useToolLabels('qr-generator');
  const [type, setType] = useState<QRType>('url');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });
  const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });

  // Customization
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<QRCodeErrorCorrectionLevel>('M');
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('tool_opened', { tool: 'qr-code-generator' });
  }, []);

  const payload = (() => {
    switch (type) {
      case 'url':
        return url;
      case 'email':
        return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
      case 'wifi':
        return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};;`;
      case 'text':
      default:
        return text;
    }
  })();

  useEffect(() => {
    if (!payload.trim()) return;
    let cancelled = false;
    QRCode.toDataURL(payload, {
      width: size,
      errorCorrectionLevel: errorLevel,
      margin: 2,
    })
      .then((dataUrl) => {
        if (!cancelled) {
          setQrUrl(dataUrl);
          trackEvent('file_processed', { tool: 'qr-code-generator', type });
        }
      })
      .catch(() => {
        if (!cancelled) setQrUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [payload, size, errorLevel, type]);

  const handleDownload = () => {
    if (!qrUrl) return;
    downloadDataUrl(qrUrl, 'qrcode.png');
    trackEvent('download_clicked', { tool: 'qr-code-generator' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-card space-y-5">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            {[
              { id: 'url', label: L.url },
              { id: 'text', label: L.text },
              { id: 'email', label: L.email },
              { id: 'wifi', label: L.wifi },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setType(tab.id as QRType)}
                className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
                  type === tab.id
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            {type === 'url' && (
              <div className="space-y-1.5">
                <label htmlFor="qr-url" className="text-xs text-muted-foreground">{L.websiteUrl}</label>
                <input
                  id="qr-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={L.urlPlaceholder}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>
            )}

            {type === 'text' && (
              <div className="space-y-1.5">
                <label htmlFor="qr-text" className="text-xs text-muted-foreground">{L.plainText}</label>
                <textarea
                  id="qr-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={L.textPlaceholder}
                  className="w-full h-24 p-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-y"
                />
              </div>
            )}

            {type === 'email' && (
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <label htmlFor="qr-email-to" className="text-xs text-muted-foreground">{L.emailTo}</label>
                  <input
                    id="qr-email-to"
                    type="email"
                    value={email.to}
                    onChange={(e) => setEmail({ ...email, to: e.target.value })}
                    placeholder={L.emailPlaceholder}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="qr-email-subject" className="text-xs text-muted-foreground">{L.subject}</label>
                  <input
                    id="qr-email-subject"
                    type="text"
                    value={email.subject}
                    onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                    placeholder={L.subjectPlaceholder}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="qr-email-body" className="text-xs text-muted-foreground">{L.message}</label>
                  <textarea
                    id="qr-email-body"
                    value={email.body}
                    onChange={(e) => setEmail({ ...email, body: e.target.value })}
                    placeholder={L.messagePlaceholder}
                    className="w-full h-20 p-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-y"
                  />
                </div>
              </div>
            )}

            {type === 'wifi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="qr-wifi-ssid" className="text-xs text-muted-foreground">{L.ssid}</label>
                  <input
                    id="qr-wifi-ssid"
                    type="text"
                    value={wifi.ssid}
                    onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                    placeholder={L.ssidPlaceholder}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="qr-wifi-encryption" className="text-xs text-muted-foreground">{L.encryption}</label>
                  <select
                    id="qr-wifi-encryption"
                    value={wifi.encryption}
                    onChange={(e) => setWifi({ ...wifi, encryption: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="qr-wifi-password" className="text-xs text-muted-foreground">{L.password}</label>
                  <input
                    id="qr-wifi-password"
                    type="password"
                    value={wifi.password}
                    onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                    placeholder={L.passwordPlaceholder}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-card space-y-5 text-center flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-foreground">{L.yourQr}</h3>
          {qrUrl && payload.trim() ? (
            <div className="p-3 bg-white rounded-xl border border-border flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt={L.yourQr} className="w-40 h-40 object-contain" />
            </div>
          ) : (
            <div className="w-40 h-40 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              {L.enterContent}
            </div>
          )}

          <div className="w-full space-y-3.5">
            <div className="grid grid-cols-2 gap-2 text-start">
              <div className="space-y-1">
                <label htmlFor="qr-size" className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">{L.imageSize}</label>
                <select
                  id="qr-size"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted/40 text-xs focus:outline-none text-foreground"
                >
                  <option value={150}>Small (150px)</option>
                  <option value={256}>Medium (256px)</option>
                  <option value={512}>Large (512px)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="qr-error-level" className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">{L.errorCorrection}</label>
                <select
                  id="qr-error-level"
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as QRCodeErrorCorrectionLevel)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted/40 text-xs focus:outline-none text-foreground"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quarter (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <Button onClick={handleDownload} disabled={!qrUrl} icon={<Download className="w-4 h-4" />} className="w-full">
              {L.download}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
