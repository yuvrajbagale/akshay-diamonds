import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Minimal loading indicator. Prefer skeletons for content areas. */
@Component({
  selector: 'ak-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': `'spinner-' + size()` },
  template: `<span class="ak-spinner" role="status" [attr.aria-label]="label()"></span>`,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }

    .ak-spinner {
      display: block;
      width: var(--spinner-size, 1.625rem);
      height: var(--spinner-size, 1.625rem);
      border: 2px solid var(--color-border-strong);
      border-top-color: var(--color-accent-strong);
      border-radius: 50%;
      animation: ak-spin 700ms linear infinite;
    }

    :host(.spinner-sm) {
      --spinner-size: 1.125rem;
    }

    :host(.spinner-md) {
      --spinner-size: 1.625rem;
    }

    :host(.spinner-lg) {
      --spinner-size: 2.25rem;
    }

    @media (prefers-reduced-motion: reduce) {
      .ak-spinner {
        animation-duration: 2.5s;
      }
    }
  `,
})
export class UiSpinner {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly label = input('Loading');
}
