import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { InrCurrencyPipe } from '../../pipes/inr-currency.pipe';

/**
 * Price presentation with Indian digit grouping (₹1,42,500).
 * `compareAt` is only for genuine reductions — never decorative discounts.
 */
@Component({
  selector: 'ak-price',
  imports: [InrCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    <span class="ak-price__amount">{{ value() | inr: { decimals: decimals() } }}</span>
    @if (compareAt(); as original) {
      <span class="ak-price__compare">{{ original | inr }}</span>
    }
    @if (suffix()) {
      <span class="ak-price__suffix">{{ suffix() }}</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: baseline;
      gap: var(--space-2xs);
      font-family: var(--font-sans);
      font-weight: var(--weight-semibold);
      color: var(--color-text-primary);
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }

    .ak-price__compare {
      font-weight: var(--weight-regular);
      font-size: 0.8em;
      color: var(--color-text-tertiary);
      text-decoration: line-through;
    }

    .ak-price__suffix {
      font-weight: var(--weight-regular);
      font-size: 0.75em;
      letter-spacing: 0.04em;
      color: var(--color-text-secondary);
    }

    :host(.ak-price--sm) .ak-price__amount {
      font-size: var(--text-body-sm);
    }

    :host(.ak-price--md) .ak-price__amount {
      font-size: var(--text-body-lg);
    }

    :host(.ak-price--lg) .ak-price__amount {
      font-size: 1.5rem;
    }
  `,
})
export class UiPrice {
  readonly value = input.required<number>();
  readonly compareAt = input<number | null>(null);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly decimals = input(0);
  readonly suffix = input('');

  protected readonly hostClasses = computed(() => `ak-price ak-price--${this.size()}`);
}
