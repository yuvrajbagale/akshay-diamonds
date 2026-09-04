import { ChangeDetectionStrategy, Component, ElementRef, booleanAttribute, computed, inject, input } from '@angular/core';
import { Icon } from '../icon/icon';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Brand button, applied as an attribute so native <button>/<a> semantics,
 * keyboard behaviour and form participation are preserved.
 *
 * <button akButton>Make It Yours</button>
 * <a akButton variant="accent" routerLink="/diamonds">Explore Diamonds</a>
 */
@Component({
  selector: 'button[akButton], a[akButton]',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': `isAnchor() ? null : (disabled() || loading()) ? '' : null`,
    '[attr.aria-disabled]': `!isAnchor() ? null : (disabled() || loading()) ? 'true' : null`,
    '[attr.aria-busy]': `loading() ? 'true' : null`,
    '[attr.tabindex]': `isAnchor() && (disabled() || loading()) ? '-1' : null`,
  },
  template: `
    @if (loading()) {
      <ak-icon name="loader" size="sm" class="ak-button__spinner" />
    }
    <ng-content />
  `,
  styles: `
    .ak-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2xs);
      border: 1px solid transparent;
      border-radius: var(--radius-xs);
      font-family: var(--font-sans);
      font-size: var(--text-caption);
      font-weight: var(--weight-semibold);
      letter-spacing: var(--tracking-button);
      text-transform: uppercase;
      line-height: 1;
      cursor: pointer;
      white-space: nowrap;
      text-decoration: none;
      transition:
        background-color var(--dur-fast) var(--ease-lux),
        border-color var(--dur-fast) var(--ease-lux),
        color var(--dur-fast) var(--ease-lux),
        box-shadow var(--dur-fast) var(--ease-lux);
    }

    .ak-button:disabled,
    .ak-button[aria-disabled='true'] {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .ak-button--disabled {
      pointer-events: none;
    }

    .ak-button--sm {
      padding: 0.625em 1.25em;
    }

    .ak-button--md {
      padding: 0.875em 1.75em;
    }

    .ak-button--lg {
      padding: 1em 2em;
      font-size: var(--text-body-sm);
    }

    .ak-button--block {
      display: flex;
      width: 100%;
    }

    .ak-button--primary {
      background: var(--color-text-primary);
      color: var(--color-bg);
    }

    .ak-button--primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--color-text-primary) 86%, var(--color-accent));
    }

    .ak-button--accent {
      background: var(--color-accent);
      color: var(--color-accent-contrast);
    }

    .ak-button--accent:hover:not(:disabled) {
      background: var(--color-accent-strong);
    }

    .ak-button--outline {
      border-color: var(--color-border-strong);
      color: var(--color-text-primary);
      background: transparent;
    }

    .ak-button--outline:hover:not(:disabled) {
      border-color: var(--color-text-primary);
    }

    .ak-button--ghost {
      color: var(--color-text-secondary);
      background: transparent;
    }

    .ak-button--ghost:hover:not(:disabled) {
      color: var(--color-text-primary);
      background: var(--color-surface-muted);
    }

    .ak-button--link {
      padding-inline: 0;
      color: var(--color-text-primary);
      text-decoration: underline;
      text-underline-offset: 0.4em;
      text-decoration-color: var(--color-border-strong);
    }

    .ak-button--link:hover:not(:disabled) {
      text-decoration-color: var(--color-accent-strong);
    }

    .ak-button__spinner {
      animation: ak-spin 800ms linear infinite;
    }
  `,
})
export class UiButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly block = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly isAnchor = computed(() => this.elementRef.nativeElement.tagName === 'A');

  protected readonly hostClasses = computed(() =>
    [
      'ak-button',
      `ak-button--${this.variant()}`,
      `ak-button--${this.size()}`,
      this.block() ? 'ak-button--block' : '',
      this.isAnchor() && (this.disabled() || this.loading()) ? 'ak-button--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
