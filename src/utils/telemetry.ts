/**
 * SOUL MEDIA TELEMETRY & EVENT TRACKING ENGINE
 * 
 * Provides type-safe event tracking, conversion funnel measurement,
 * and optional PostHog / GA4 telemetry with zero UX impact and zero cookie banners.
 */

export interface TelemetryEventPayload {
  [key: string]: string | number | boolean | string[] | undefined | null;
}

// Global window telemetry extensions
declare global {
  interface Window {
    posthog?: {
      init: (key: string, config: Record<string, any>) => void;
      capture: (event: string, properties?: Record<string, any>) => void;
    };
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

let isInitialized = false;

/**
 * Initialize Telemetry Services (PostHog & GA4) asynchronously after page load
 */
export const initTelemetry = (posthogKey?: string, ga4Id?: string): void => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  // 1. PostHog Telemetry (Cookieless mode via Netlify proxy)
  if (posthogKey) {
    const script = document.createElement('script');
    script.async = true;
    script.src = '/ingest/static/array.js';
    script.onload = () => {
      if (window.posthog) {
        window.posthog.init(posthogKey, {
          api_host: '/ingest',
          ui_host: 'https://us.posthog.com',
          autocapture: true,
          capture_pageview: true,
          persistence: 'memory', // Cookie-less (No consent banner needed!)
          disable_session_recording: false,
        });
        console.log('[Soul Telemetry] PostHog initialized via Netlify Proxy');
      }
    };
    document.head.appendChild(script);
  }

  // 2. Google Analytics 4 (GA4) Asynchronous Script Loader
  if (ga4Id) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        if (window.dataLayer) {
          window.dataLayer.push(args);
        }
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ga4Id, { anonymize_ip: true });
      console.log('[Soul Telemetry] GA4 initialized:', ga4Id);
    };
    document.head.appendChild(script);
  }
};

/**
 * Dispatch Custom Telemetry Event across active channels
 */
export const trackEvent = (eventName: string, payload: TelemetryEventPayload = {}): void => {
  const timestamp = new Date().toISOString();
  const enrichedPayload = {
    ...payload,
    origin_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp,
  };

  console.log(`[Soul Telemetry Event] ${eventName}:`, enrichedPayload);

  // PostHog Event Dispatch
  if (typeof window !== 'undefined' && window.posthog) {
    try {
      window.posthog.capture(eventName, enrichedPayload);
    } catch (err) {
      console.warn('[Soul Telemetry] PostHog capture warning:', err);
    }
  }

  // GA4 Event Dispatch
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, enrichedPayload);
    } catch (err) {
      console.warn('[Soul Telemetry] GA4 capture warning:', err);
    }
  }
};
