import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { FocusTrapDirective } from '../../directives/focus-trap.directive';
import { UiIconButton } from '../icon-button/ui-icon-button';

const EXIT_ANIMATION_MS = 200;

/**
 * Accessible centered dialog. Renders on open, plays a closing animation,
 * locks body scroll, traps focus and closes on Escape or overlay click.
 */
@Component({
  selector: 'ak-modal',
  imports: [FocusTrapDirective, UiIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (render()) {
      <div class="ak-modal" [class.ak-modal--closing]="closing()">
        <div class="ak-modal__overlay" (click)="requestClose()"></div>
        <div
          class="ak-modal__panel"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="heading()"
          akFocusTrap
          (keydown.escape)="requestClose()"
          (click)="$event.stopPropagation()"
        >
          <header class="ak-modal__head">
            <h2 class="ak-modal__heading">{{ heading() }}</h2>
            <button akIconButton type="button" icon="close" [label]="'Close ' + heading()" (click)="requestClose()"></button>
          </header>
          <div class="ak-modal__body">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .ak-modal {
      position: fixed;
      inset: 0;
      z-index: var(--z-modal);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-md);
    }

    .ak-modal__overlay {
      position: absolute;
      inset: 0;
      background: var(--color-overlay);
      animation: ak-fade-in var(--dur-base) var(--ease-lux) both;
    }

    .ak-modal__panel {
      position: relative;
      display: flex;
      flex-direction: column;
      width: min(34rem, 100%);
      max-height: min(85svh, 52rem);
      background: var(--color-bg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      animation: ak-slide-up var(--dur-slow) var(--ease-lux) both;
    }

    .ak-modal__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-bottom: var(--border-hairline);
    }

    .ak-modal__heading {
      font-size: var(--text-title-3);
    }

    .ak-modal__body {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-md);
      -webkit-overflow-scrolling: touch;
    }

    .ak-modal--closing .ak-modal__overlay {
      animation: ak-fade-out var(--dur-base) var(--ease-in-out) both;
    }

    .ak-modal--closing .ak-modal__panel {
      animation: ak-fade-out var(--dur-base) var(--ease-in-out) both;
    }
  `,
})
export class UiModal {
  readonly open = input.required<boolean>();
  readonly openChange = output<boolean>();
  readonly heading = input.required<string>();

  protected readonly render = signal(false);
  protected readonly closing = signal(false);

  private exitTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      if (this.open()) {
        clearTimeout(this.exitTimer);
        this.closing.set(false);
        this.render.set(true);
      } else if (this.render()) {
        this.closing.set(true);
        this.exitTimer = setTimeout(() => {
          this.render.set(false);
          this.closing.set(false);
        }, EXIT_ANIMATION_MS);
      }
    });

    effect(() => {
      document.body.classList.toggle('ak-scroll-locked', this.render() && !this.closing());
    });

    destroyRef.onDestroy(() => {
      clearTimeout(this.exitTimer);
      document.body.classList.remove('ak-scroll-locked');
    });
  }

  protected requestClose(): void {
    this.openChange.emit(false);
  }
}
