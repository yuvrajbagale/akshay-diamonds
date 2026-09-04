import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core';

export type BadgeVariant = 'neutral' | 'gold' | 'dark' | 'outline' | 'success';

/** Small status/categorisation label. Never used for fake promotions. */
@Component({
  selector: 'ak-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    @if (dot()) {
      <span class="ak-badge__dot" aria-hidden="true"></span>
    }
    <ng-content />
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.45em;
      padding: 0.45em 0.9em;
      border-radius: var(--radius-pill);
      font-size: 0.6875rem;
      font-weight: var(--weight-semibold);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1;
      white-space: nowrap;
    }

    .ak-badge__dot {
      width: 0.3em;
      height: 0.3em;
      border-radius: 50%;
      background: currentColor;
    }

    :host(.ak-badge--neutral) {
      background: var(--color-surface-muted);
      color: var(--color-text-secondary);
    }

    :host(.ak-badge--gold) {
      background: var(--color-accent-soft);
      color: var(--color-accent-strong);
    }

    :host(.ak-badge--dark) {
      background: var(--color-text-primary);
      color: var(--color-bg);
    }

    :host(.ak-badge--outline) {
      border: var(--border-hairline-strong);
      color: var(--color-text-secondary);
      background: transparent;
    }

    :host(.ak-badge--success) {
      background: var(--color-success-soft);
      color: var(--color-success);
    }
  `,
})
export class UiBadge {
  readonly variant = input<BadgeVariant>('neutral');
  readonly dot = input(false, { transform: booleanAttribute });

  protected readonly hostClasses = computed(() => `ak-badge ak-badge--${this.variant()}`);
}
