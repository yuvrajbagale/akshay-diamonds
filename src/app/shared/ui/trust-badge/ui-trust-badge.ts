import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

/**
 * Trust cue: icon + promise + optional supporting note. Used in the trust
 * strip, near checkout CTAs and in the footer. Claims must be true —
 * content comes from BrandConfig, never hardcoded marketing.
 */
@Component({
  selector: 'ak-trust-badge',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ak-trust-badge__icon" aria-hidden="true">
      <ak-icon [name]="icon()" />
    </span>
    <span class="ak-trust-badge__text">
      <span class="ak-trust-badge__label">{{ label() }}</span>
      @if (note()) {
        <span class="ak-trust-badge__note">{{ note() }}</span>
      }
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      text-align: start;
    }

    .ak-trust-badge__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      flex-shrink: 0;
      border-radius: var(--radius-pill);
      border: var(--border-hairline);
      background: var(--color-surface);
      color: var(--color-accent-strong);
    }

    .ak-trust-badge__text {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .ak-trust-badge__label {
      font-size: var(--text-body-sm);
      font-weight: var(--weight-medium);
      color: var(--color-text-primary);
    }

    .ak-trust-badge__note {
      font-size: var(--text-caption);
      color: var(--color-text-secondary);
    }
  `,
})
export class UiTrustBadge {
  readonly icon = input.required<IconName>();
  readonly label = input.required<string>();
  readonly note = input('');
}
