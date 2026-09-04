import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/ui/button/ui-button';

/** Elegant 404 — an interrupted journey, not a dead end. */
@Component({
  selector: 'ak-not-found',
  imports: [RouterLink, UiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="lost">
      <div class="container lost__inner">
        <p class="ak-eyebrow">404</p>
        <h1 class="lost__title">Something interrupted your diamond journey.</h1>
        <p class="lost__copy">
          The page you were looking for isn't here. Let's guide you back — or reach an expert who
          can help you find exactly what you need.
        </p>
        <div class="lost__actions">
          <a akButton routerLink="/">Return Home</a>
          <a akButton variant="outline" routerLink="/consultation">Contact an Expert</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .lost {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 52svh;
      padding-block: var(--section-pad-y);
    }

    .lost__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 44rem;
    }

    .lost__title {
      margin-top: var(--space-sm);
      font-size: var(--text-display-2);
    }

    .lost__copy {
      margin-top: var(--space-md);
      max-width: 34rem;
      font-size: var(--text-body-lg);
      line-height: var(--leading-normal);
      color: var(--color-text-secondary);
    }

    .lost__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-sm);
      margin-top: var(--space-xl);
    }
  `,
})
export class NotFound {}
