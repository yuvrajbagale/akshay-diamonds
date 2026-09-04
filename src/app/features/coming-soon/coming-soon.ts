import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/ui/button/ui-button';

/**
 * Elegant staging page for destinations opening in an upcoming phase.
 * Keeps every navigation path alive between releases — never a dead end,
 * never a blank screen.
 */
@Component({
  selector: 'ak-coming-soon',
  imports: [RouterLink, UiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="soon">
      <div class="container soon__inner">
        <p class="ak-eyebrow">Coming soon</p>
        <h1 class="soon__title">{{ heading() }} is taking shape.</h1>
        <p class="soon__copy">
          This experience opens in an upcoming phase of our journey. In the meantime, explore the
          collection, or speak with a diamond expert for personal guidance.
        </p>
        <div class="soon__actions">
          <a akButton routerLink="/diamonds">Explore Diamonds</a>
          <a akButton variant="outline" routerLink="/consultation">Speak With a Diamond Expert</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .soon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 52svh;
      padding-block: var(--section-pad-y);
    }

    .soon__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 44rem;
    }

    .soon__title {
      margin-top: var(--space-sm);
      font-size: var(--text-display-2);
    }

    .soon__copy {
      margin-top: var(--space-md);
      max-width: 34rem;
      font-size: var(--text-body-lg);
      line-height: var(--leading-normal);
      color: var(--color-text-secondary);
    }

    .soon__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-sm);
      margin-top: var(--space-xl);
    }
  `,
})
export class ComingSoon {
  readonly heading = input('This experience');
}
