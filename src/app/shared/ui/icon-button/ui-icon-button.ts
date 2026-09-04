import { ChangeDetectionStrategy, Component, booleanAttribute, computed, inject, input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Icon, IconName, IconSize } from '../icon/icon';

/**
 * Circular icon-only action. The accessible label is mandatory —
 * icon-only controls must never be unnamed.
 */
@Component({
  selector: 'button[akIconButton], a[akIconButton]',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ak-icon-button',
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'label()',
    '[attr.title]': 'label()',
    '[attr.disabled]': `isAnchor() ? null : disabled() ? '' : null`,
    '[attr.aria-disabled]': `!isAnchor() ? null : disabled() ? 'true' : null`,
    '[attr.tabindex]': `isAnchor() && disabled() ? '-1' : null`,
  },
  template: `<ak-icon [name]="icon()" [size]="size()" />`,
  styles: `
    .ak-icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-button-size, 2.5rem);
      height: var(--icon-button-size, 2.5rem);
      border-radius: var(--radius-pill);
      color: var(--color-text-primary);
      background: transparent;
      border: 0;
      cursor: pointer;
      transition:
        background-color var(--dur-fast) var(--ease-lux),
        color var(--dur-fast) var(--ease-lux);
    }

    .ak-icon-button:hover:not(:disabled) {
      background: var(--color-surface-muted);
    }

    .ak-icon-button:disabled,
    .ak-icon-button[aria-disabled='true'] {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .ak-icon-button--sm {
      --icon-button-size: 2rem;
    }

    .ak-icon-button--md {
      --icon-button-size: 2.5rem;
    }

    .ak-icon-button--lg {
      --icon-button-size: 3rem;
    }
  `,
})
export class UiIconButton {
  readonly label = input.required<string>();
  readonly icon = input.required<IconName>();
  readonly size = input<IconSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly isAnchor = computed(() => this.elementRef.nativeElement.tagName === 'A');

  protected readonly hostClasses = computed(() => `ak-icon-button ak-icon-button--${this.size()}`);
}
