import { AnalyticsEventType, AnalyticsPayload } from '../types/prompt';

/**
 * Lightweight privacy-conscious event tracking handler.
 * Can be connected to GA4, Plausible, or custom analytics provider.
 */
export function trackEvent(eventName: AnalyticsEventType, payload?: AnalyticsPayload): void {
  const timestamp = new Date().toISOString();
  
  if (import.meta.env.DEV) {
    console.groupCollapsed(`[Analytics] ${eventName}`);
    console.log('Timestamp:', timestamp);
    console.log('Payload:', payload);
    console.groupEnd();
  }

  // Hook for custom analytics integrations (e.g. window.gtag, window.plausible)
  if (typeof window !== 'undefined') {
    // Example: (window as any).gtag?.('event', eventName, payload);
  }
}
