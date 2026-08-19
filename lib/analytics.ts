// Analytics abstraction layer.
// Replace the stub implementations with your analytics provider (GA4, Plausible, PostHog, etc.)

type EventName =
  | 'tool_opened'
  | 'tool_used'
  | 'file_processed'
  | 'download_clicked'
  | 'search_used'
  | 'category_opened'
  | 'error_shown'
  | 'chain_used'
  | 'upscale_used';

type EventProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: EventName, properties?: EventProperties): void {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, properties);
  }

  // ─── Google Analytics 4 ───────────────────────────────────────────────────
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', name, properties);
  // }

  // ─── Plausible ────────────────────────────────────────────────────────────
  // if (typeof window !== 'undefined' && (window as any).plausible) {
  //   (window as any).plausible(name, { props: properties });
  // }

  // ─── PostHog ─────────────────────────────────────────────────────────────
  // if (typeof window !== 'undefined' && (window as any).posthog) {
  //   (window as any).posthog.capture(name, properties);
  // }
}
