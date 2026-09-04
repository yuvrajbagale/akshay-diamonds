import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Shimmer loading placeholder for lines, blocks and avatars. */
@Component({
  selector: 'ak-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ak-skeleton',
    '[class.ak-skeleton--circle]': `shape() === 'circle'`,
    '[class.ak-skeleton--block]': `shape() === 'block'`,
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    'aria-hidden': 'true',
  },
  template: '',
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 0.75rem;
      border-radius: var(--radius-xs);
      background: linear-gradient(
        100deg,
        var(--color-surface-muted) 40%,
        var(--color-accent-soft) 50%,
        var(--color-surface-muted) 60%
      );
      background-size: 200% 100%;
      animation: ak-shimmer 1.4s linear infinite;
    }

    :host(.ak-skeleton--block) {
      height: 12rem;
      border-radius: var(--radius-sm);
    }

    :host(.ak-skeleton--circle) {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        animation: none;
      }
    }
  `,
})
export class UiSkeleton {
  readonly shape = input<'line' | 'block' | 'circle'>('line');
  readonly width = input<string | null>(null);
  readonly height = input<string | null>(null);
}
