import { Directive, ElementRef, OnDestroy, OnInit, inject, input, numberAttribute } from '@angular/core';

/**
 * Applies a subtle 3D perspective tilt based on cursor position inside the host.
 * The host must have `transform-style: preserve-3d` and a `perspective` ancestor.
 *
 * Usage: `<div akTilt3D>Tilt me</div>`
 * Optional: `[tiltMax]="12"` (max degrees, default 8)
 */
@Directive({ selector: '[akTilt3D]' })
export class Tilt3DDirective implements OnInit, OnDestroy {
  readonly tiltMax = input(8, { alias: 'tiltMax', transform: numberAttribute });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private rafId = 0;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private animating = false;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    const reducedMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    el.classList.add('ak-tilt-3d');

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      this.targetX = (y - 0.5) * this.tiltMax() * -1;
      this.targetY = (x - 0.5) * this.tiltMax();

      if (!this.animating) {
        this.animating = true;
        this.animate();
      }
    };

    const handleLeave = () => {
      this.targetX = 0;
      this.targetY = 0;
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);

    (el as any).__akTilt3DCleanup = () => {
      cancelAnimationFrame(this.rafId);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.classList.remove('ak-tilt-3d');
    };
  }

  private animate(): void {
    const lerp = 0.12;
    this.currentX += (this.targetX - this.currentX) * lerp;
    this.currentY += (this.targetY - this.currentY) * lerp;

    const el = this.host.nativeElement;

    if (Math.abs(this.targetX - this.currentX) > 0.01 || Math.abs(this.targetY - this.currentY) > 0.01) {
      el.style.transform = `perspective(800px) rotateX(${this.currentX}deg) rotateY(${this.currentY}deg) scale3d(1.02, 1.02, 1.02)`;
      this.rafId = requestAnimationFrame(() => this.animate());
    } else {
      el.style.transform = '';
      this.animating = false;
    }
  }

  ngOnDestroy(): void {
    (this.host.nativeElement as any).__akTilt3DCleanup?.();
  }
}
