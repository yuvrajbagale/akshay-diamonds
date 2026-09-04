import { Directive, ElementRef, OnDestroy, OnInit, inject, input, numberAttribute } from '@angular/core';

export type RevealDirection = 'up' | 'fade' | 'left' | 'right';

/**
 * Adds a subtle, one-time reveal as the element enters the viewport.
 * Honours prefers-reduced-motion (reveals immediately) and works without
 * IntersectionObserver (older browsers reveal immediately).
 */
@Directive({ selector: '[akReveal]' })
export class ScrollRevealDirective implements OnInit, OnDestroy {
  readonly akReveal = input<RevealDirection | ''>('');
  readonly revealDelay = input(0, { transform: numberAttribute });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    const direction = this.akReveal() || 'up';

    el.classList.add('reveal');
    if (direction !== 'up') {
      el.classList.add(`reveal--${direction}`);
    }
    if (this.revealDelay() > 0) {
      el.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);
    }

    const reducedMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
