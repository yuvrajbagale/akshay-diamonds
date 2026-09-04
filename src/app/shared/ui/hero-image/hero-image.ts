import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HERO_IMAGES, FALLBACK_IMAGE } from '../../../core/data/images.data';

export type HeroImageVariant = 'hero' | 'editorial' | 'collection' | 'lifestyle';

@Component({
  selector: 'ak-hero-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="heroimg" [class]="'heroimg--' + variant()">
      <img
        class="heroimg__img"
        [src]="imageUrl()"
        [alt]="variant() + ' editorial image'"
        loading="lazy"
        decoding="async"
      />
      <span class="heroimg__vignette" aria-hidden="true"></span>
    </div>
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }

    .heroimg {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: var(--radius-lg, 0.75rem);
      background: var(--color-surface, #faf8f5);
    }

    .heroimg--hero {
      aspect-ratio: 21 / 9;
      @media (min-width: 768px) { aspect-ratio: 21 / 8; }
    }

    .heroimg--editorial { aspect-ratio: 4 / 3; }
    .heroimg--collection { aspect-ratio: 16 / 10; }
    .heroimg--lifestyle { aspect-ratio: 3 / 2; }

    .heroimg__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .heroimg__vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.2) 100%);
      pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .heroimg__img { transition: none; }
    }
  `,
})
export class HeroImage {
  readonly variant = input<HeroImageVariant>('editorial');

  protected readonly imageUrl = computed(() =>
    HERO_IMAGES[this.variant()] ?? FALLBACK_IMAGE
  );
}
