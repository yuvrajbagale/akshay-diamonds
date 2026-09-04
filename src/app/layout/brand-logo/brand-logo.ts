import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input } from '@angular/core';
import { BRAND_CONFIG } from '../../core/config/brand.config';

/**
 * Original wordmark: brand name in tracked caps with a diamond mark.
 * Inline SVG + text â€” no image asset, crisp at every size, adapts to any
 * token theme.
 */
@Component({
  selector: 'ak-brand-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo" [class.logo--compact]="compact()">
      <svg class="logo__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 3.2 20.2 9.6 12 20.8 3.8 9.6Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linejoin="round"
        />
        <path
          d="M3.8 9.6h16.4M12 3.2 8.9 9.6 12 20.8l3.1-11.2L12 3.2Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linejoin="round"
        />
      </svg>
      <span class="logo__word">
        <span class="logo__primary">{{ brand.wordmarkPrimary }}</span>
        <span class="logo__secondary">{{ brand.wordmarkSecondary }}</span>
      </span>
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      color: var(--color-text-primary);
    }

    .logo__mark {
      width: 1.75rem;
      height: 1.75rem;
      color: var(--color-accent-strong);
      flex-shrink: 0;
    }

    .logo__word {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .logo__primary {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-weight: var(--weight-semibold);
      line-height: 1;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .logo__secondary {
      font-size: 0.5rem;
      font-weight: var(--weight-semibold);
      letter-spacing: var(--tracking-wordmark);
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }

    .logo--compact .logo__mark {
      width: 1.4rem;
      height: 1.4rem;
    }

    .logo--compact .logo__primary {
      font-size: 1.1rem;
    }
  `,
})
export class BrandLogo {
  protected readonly brand = inject(BRAND_CONFIG);
  readonly compact = input(false, { transform: booleanAttribute });
}
