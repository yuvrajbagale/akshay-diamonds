import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './analytics.service';

/**
 * Sets up automatic page-view tracking on route changes.
 * Also injects the GA4 provider when measurement ID is configured.
 */
export function provideAnalytics(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: Analytics_INITIALIZER,
      useFactory: () => {
        const router = inject(Router);
        const analytics = inject(AnalyticsService);

        router.events
          .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
          .subscribe(event => {
            analytics.track('homepage_viewed', {
              page: event.urlAfterRedirects,
              title: document.title,
            });
          });

        return () => {};
      },
      deps: [],
      multi: true,
    },
  ]);
}

/** @internal token for the initializer */
const Analytics_INITIALIZER = Symbol('ANALYTICS_INITIALIZER');
