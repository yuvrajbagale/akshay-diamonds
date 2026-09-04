import { isDevMode } from '@angular/core';
import { AnalyticsProvider, AnalyticsEvent, AnalyticsPayload } from './analytics.service';

declare global {
  interface Window {
    readonly gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 provider.
 *
 * To enable, add the GA4 script to index.html and set the measurement ID:
 *   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
 *   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');</script>
 *
 * Then provide this via ANALYTICS_PROVIDER in app.config.ts:
 *   { provide: ANALYTICS_PROVIDER, useValue: GA4_ANALYTICS_PROVIDER }
 */
export const GA4_ANALYTICS_PROVIDER: AnalyticsProvider = {
  name: 'ga4',

  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
    if (isDevMode()) {
      console.info(`[ga4] ${event}`, payload ?? {});
      return;
    }

    if (typeof window.gtag !== 'function') return;

    // Map canonical events to GA4 event names
    const ga4Event = MAP[event] ?? event;
    window.gtag('event', ga4Event, sanitizePayload(payload));
  },
};

/** Maps canonical analytics events to GA4-compatible event names. */
const MAP: Record<AnalyticsEvent, string> = {
  homepage_viewed: 'page_view',
  diamond_search: 'search',
  filter_applied: 'filter_apply',
  diamond_viewed: 'view_item',
  certificate_viewed: 'view_item',
  compare_added: 'add_to_compare',
  wishlist_added: 'add_to_wishlist',
  add_to_cart: 'add_to_cart',
  checkout_started: 'begin_checkout',
  payment_started: 'add_payment_info',
  purchase_completed: 'purchase',
  consultation_started: 'generate_lead',
  whatsapp_clicked: 'contact_whatsapp',
  phone_clicked: 'contact_phone',
  menu_opened: 'menu_open',
  search_opened: 'search_open',
};

function sanitizePayload(payload?: AnalyticsPayload): Record<string, unknown> {
  if (!payload) return {};
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }
  return result;
}
