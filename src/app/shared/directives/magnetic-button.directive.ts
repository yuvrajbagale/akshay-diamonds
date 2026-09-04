import { Directive, ElementRef, OnDestroy, OnInit, inject, input, numberAttribute } from '@angular/core';

/**
 * Makes the host element subtly follow the cursor when nearby, creating a
 * magnetic pull effect. Ideal for CTA buttons and interactive elements.
 *
 * Usage: `<a akMagneticButton>Explore</a>`
 * Optional: `[magneticStrength]="0.3"` (0-1, default 0.35)
 */
@Directive({ selector: 'a[akMagneticButton], button[akMagneticButton]' })
export class MagneticButtonDirective implements OnInit, OnDestroy {
  readonly magneticStrength = input(0.35, { alias: 'magneticStrength', transform: numberAttribute });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private rafId = 0;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    const reducedMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    el.classList.add('ak-magnetic');

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * this.magneticStrength();
        const deltaY = (e.clientY - centerY) * this.magneticStrength();
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    };

    const handleLeave = () => {
      el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = '';
      setTimeout(() => {
        el.style.transition = '';
      }, 400);
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);

    (el as any).__akMagneticCleanup = () => {
      cancelAnimationFrame(this.rafId);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.classList.remove('ak-magnetic');
    };
  }

  ngOnDestroy(): void {
    (this.host.nativeElement as any).__akMagneticCleanup?.();
  }
}
