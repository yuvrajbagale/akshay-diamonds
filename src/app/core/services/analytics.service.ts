import { Injectable, InjectionToken, inject, isDevMode } from '@angular/core';

/** Canonical analytics events (product spec §50). */
export type AnalyticsEvent =
  | 'homepage_viewed'
  | 'diamond_search'
  | 'filter_applied'
  | 'diamond_viewed'
  | 'certificate_viewed'
  | 'compare_added'
  | 'wishlist_added'
  | 'add_to_cart'
  | 'checkout_started'
  | 'payment_started'
  | 'purchase_completed'
  | 'consultation_started'
  | 'whatsapp_clicked'
  | 'phone_clicked'
  | 'menu_opened'
  | 'search_opened';

export type AnalyticsPayload = Readonly<Record<string, string | number | boolean | null | undefined>>;

export interface AnalyticsProvider {
  readonly name: string;
  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void;
}

/**
 * Default provider: logs in development, silent in production.
 * Swap via ANALYTICS_PROVIDER (GA4 / GTM / Segment) — no component changes.
 */
export const CONSOLE_ANALYTICS_PROVIDER: AnalyticsProvider = {
  name: 'console',
  track(event, payload) {
    if (isDevMode()) {
      console.info(`[analytics] ${event}`, payload ?? {});
    }
  },
};

export const ANALYTICS_PROVIDER = new InjectionToken<AnalyticsProvider>('ANALYTICS_PROVIDER', {
  providedIn: 'root',
  factory: () => CONSOLE_ANALYTICS_PROVIDER,
});

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly provider = inject(ANALYTICS_PROVIDER);

  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
    this.provider.track(event, payload);
  }
}
