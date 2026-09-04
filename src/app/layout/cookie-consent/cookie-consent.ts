import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/ui/button/ui-button';

const STORAGE_KEY = 'ak_cookie_consent';

@Component({
  selector: 'ak-cookie-consent',
  imports: [RouterLink, UiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!dismissed()) {
      <div class="cookie-banner" role="dialog" aria-label="Cookie consent">
        <div class="cookie-banner__inner">
          <p class="cookie-banner__text">
            We use cookies to improve your experience and analyse site traffic.
            By clicking "Accept All", you agree to our use of cookies.
            <a routerLink="/privacy" class="cookie-banner__link">Learn more</a>
          </p>
          <div class="cookie-banner__actions">
            <button akButton variant="ghost" size="sm" (click)="reject()">Reject All</button>
            <button akButton variant="outline" size="sm" (click)="accept()">Accept All</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .cookie-banner {
      position: fixed;
      bottom: 0;
      inset-inline: 0;
      z-index: var(--z-toast);
      padding: var(--space-sm) var(--container-pad-x);
      padding-bottom: calc(var(--space-sm) + env(safe-area-inset-bottom, 0));
      background: var(--color-surface);
      border-top: var(--border-hairline-strong);
      box-shadow: 0 -4px 20px rgb(0 0 0 / 20%);
    }

    .cookie-banner__inner {
      max-width: var(--container-max);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      align-items: center;
      text-align: center;
    }

    @media (min-width: 768px) {
      .cookie-banner__inner {
        flex-direction: row;
        text-align: left;
      }
    }

    .cookie-banner__text {
      font-size: var(--text-body-sm);
      line-height: var(--leading-normal);
      color: var(--color-text-secondary);
      flex: 1;
    }

    .cookie-banner__link {
      color: var(--color-accent);
      text-decoration: underline;
      text-underline-offset: 0.2em;
      transition: color var(--dur-fast) var(--ease-lux);
    }

    .cookie-banner__link:hover {
      color: var(--color-accent-strong);
    }

    .cookie-banner__actions {
      display: flex;
      gap: var(--space-2xs);
      flex-shrink: 0;
    }
  `,
})
export class CookieConsent {
  protected readonly dismissed = signal(this.hasConsent());

  private hasConsent(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return true;
    }
  }

  private saveConsent(value: string): void {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable — silently accept
    }
    this.dismissed.set(true);
  }

  protected accept(): void {
    this.saveConsent('accepted');
  }

  protected reject(): void {
    this.saveConsent('rejected');
  }
}
