import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { FocusTrapDirective } from '../../directives/focus-trap.directive';
import { UiIconButton } from '../icon-button/ui-icon-button';

const EXIT_ANIMATION_MS = 240;

/**
 * Accessible side drawer (mobile menu, filters). Renders on open, plays a
 * closing animation, locks body scroll, traps focus and closes on Escape
 * or overlay click. Dark side variants come free from the token themes.
 */
@Component({
  selector: 'ak-drawer',
  imports: [FocusTrapDirective, UiIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (render()) {
      <div class="ak-drawer" [class.ak-drawer--closing]="closing()">
        <div class="ak-drawer__overlay" (click)="requestClose()"></div>
        <aside
          class="ak-drawer__panel"
          [class.ak-drawer__panel--left]="side() === 'left'"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="heading()"
          akFocusTrap
          (keydown.escape)="requestClose()"
          (click)="$event.stopPropagation()"
        >
          <header class="ak-drawer__head">
            <h2 class="ak-drawer__heading">{{ heading() }}</h2>
            <button akIconButton type="button" icon="close" [label]="'Close ' + heading()" (click)="requestClose()"></button>
          </header>
          <div class="ak-drawer__body">
            <ng-content />
          </div>
        </aside>
      </div>
    }
  `,
  styles: `
    .ak-drawer {
      position: fixed;
      inset: 0;
      z-index: var(--z-drawer);
    }

    .ak-drawer__overlay {
      position: absolute;
      inset: 0;
      background: var(--color-overlay);
      animation: ak-fade-in var(--dur-base) var(--ease-lux) both;
    }

    .ak-drawer__panel {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      width: min(26.25rem, 100%);
      background: var(--color-bg);
      box-shadow: var(--shadow-lg);
      animation: ak-slide-in-right var(--dur-slow) var(--ease-lux) both;
    }

    .ak-drawer__panel--left {
      right: auto;
      left: 0;
      animation-name: ak-slide-in-left;
    }

    .ak-drawer__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-bottom: var(--border-hairline);
    }

    .ak-drawer__heading {
      font-size: var(--text-title-3);
    }

    .ak-drawer__body {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-md);
      -webkit-overflow-scrolling: touch;
    }

    .ak-drawer--closing .ak-drawer__overlay {
      animation: ak-fade-out var(--dur-base) var(--ease-in-out) both;
    }

    .ak-drawer--closing .ak-drawer__panel {
      animation: ak-slide-out-right var(--dur-base) var(--ease-in-out) both;
    }

    .ak-drawer--closing .ak-drawer__panel--left {
      animation-name: ak-slide-out-left;
    }
  `,
})
export class UiDrawer {
  readonly open = input.required<boolean>();
  readonly openChange = output<boolean>();
  readonly side = input<'left' | 'right'>('right');
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
