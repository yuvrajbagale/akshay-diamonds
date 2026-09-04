import { Directive, ElementRef, HostListener, OnDestroy, afterNextRender, booleanAttribute, inject, input } from '@angular/core';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Traps Tab focus inside dialogs/drawers/overlays, moves focus to the
 * first focusable element on attach and restores it to the trigger on
 * destroy. Used by UiDrawer, UiModal and the search overlay.
 */
@Directive({ selector: '[akFocusTrap]' })
export class FocusTrapDirective implements OnDestroy {
  readonly autoFocus = input(true, { transform: booleanAttribute });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => {
      this.previouslyFocused = document.activeElement as HTMLElement | null;

      if (!this.autoFocus()) {
        return;
      }

      const target = this.focusables()[0];
      if (target) {
        target.focus();
      } else {
        // Ensure the container itself can receive focus.
        const el = this.host.nativeElement;
        el.setAttribute('tabindex', '-1');
        el.focus();
      }
    });
  }

  ngOnDestroy(): void {
    this.previouslyFocused?.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const focusables = this.focusables();
    if (focusables.length === 0) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    const inside = this.host.nativeElement.contains(active);

    if (event.shiftKey && (active === first || !inside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !inside)) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusables(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      el => el.offsetParent !== null || el.getClientRects().length > 0,
    );
  }
}
