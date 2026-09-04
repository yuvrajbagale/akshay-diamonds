import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DiamondShapeName } from '../shape-glyph/shape-glyph';
import { DIAMOND_IMAGES, FALLBACK_IMAGE } from '../../../core/data/images.data';

export type ImageSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const SIZE_MAP: Record<ImageSize, string> = {
  sm: '120px',
  md: '200px',
  lg: '320px',
  xl: '480px',
  full: '100%',
};

@Component({
  selector: 'ak-diamond-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dimg" [style.--dimg-size]="sizePx()">
      <img
        class="dimg__img"
        [src]="imageUrl()"
        [alt]="shape() + ' diamond'"
        loading="lazy"
        decoding="async"
      />
      <span class="dimg__shimmer" aria-hidden="true"></span>
    </div>
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }

    .dimg {
      position: relative;
      width: var(--dimg-size, 200px);
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: var(--radius-md, 0.5rem);
      background: var(--color-surface, #faf8f5);
    }

    .dimg__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.4s ease;
    }

    .dimg__shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 30%,
        rgba(255,255,255,0.15) 50%,
        transparent 70%
      );
      animation: dimg-shimmer 2.5s ease-in-out infinite;
    }

    @keyframes dimg-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @media (prefers-reduced-motion: reduce) {
      .dimg__shimmer { animation: none; }
    }
  `,
})
export class DiamondImage {
  readonly shape = input.required<DiamondShapeName>();
  readonly size = input<ImageSize>('md');

  protected readonly sizePx = computed(() => SIZE_MAP[this.size()]);
  protected readonly imageUrl = computed(() =>
    DIAMOND_IMAGES[this.shape()] ?? FALLBACK_IMAGE
  );
}
