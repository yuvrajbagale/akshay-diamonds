import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { JEWELLERY_IMAGES, FALLBACK_IMAGE } from '../../../core/data/images.data';

export type ProductImageSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const SIZE_MAP: Record<ProductImageSize, string> = {
  sm: '120px',
  md: '200px',
  lg: '320px',
  xl: '480px',
  full: '100%',
};

@Component({
  selector: 'ak-product-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pimg" [style.--pimg-size]="sizePx()">
      <img
        class="pimg__img"
        [src]="imageUrl()"
        [alt]="category() + ' jewellery'"
        loading="lazy"
        decoding="async"
      />
      <span class="pimg__shimmer" aria-hidden="true"></span>
    </div>
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }

    .pimg {
      position: relative;
      width: var(--pimg-size, 200px);
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: var(--radius-md, 0.5rem);
      background: var(--color-surface, #faf8f5);
    }

    .pimg__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.4s ease;
    }

    .pimg__shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 30%,
        rgba(255,255,255,0.15) 50%,
        transparent 70%
      );
      animation: pimg-shimmer 2.5s ease-in-out infinite;
    }

    @keyframes pimg-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @media (prefers-reduced-motion: reduce) {
      .pimg__shimmer { animation: none; }
    }
  `,
})
export class ProductImage {
  readonly category = input.required<string>();
  readonly size = input<ProductImageSize>('md');

  protected readonly sizePx = computed(() => SIZE_MAP[this.size()]);
  protected readonly imageUrl = computed(() =>
    JEWELLERY_IMAGES[this.category()] ?? FALLBACK_IMAGE
  );
}
