import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const OG_SIZE = { width: 1200, height: 630 } as const;

interface OgImageProps {
  title: string;
  subtitle: string;
}

export function createOgImage({ title, subtitle }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #0f766e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 700,
              color: '#1e1b4b',
            }}
          >
            T
          </div>
          <div style={{ fontSize: '30px', fontWeight: 700 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '940px' }}>
          <div style={{ fontSize: '62px', fontWeight: 700, lineHeight: 1.08 }}>{title}</div>
          <div style={{ fontSize: '26px', opacity: 0.85, maxWidth: '820px', lineHeight: 1.45 }}>{subtitle}</div>
        </div>

        <div style={{ display: 'flex', fontSize: '20px', opacity: 0.7 }}>
          {`${SITE_URL.replace('https://', '')} — Free online tools. Private, browser-based, no sign-up.`}
        </div>
      </div>
    ),
    OG_SIZE
  );
}