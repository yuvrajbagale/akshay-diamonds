import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DiamondService } from '../../../core/services/diamond.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CompareService } from '../../../core/services/compare.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';
import { BRAND_CONFIG, BrandConfig } from '../../../core/config/brand.config';
import { explainDiamond } from '../../../core/utils/diamond-explaner';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { DiamondGallery } from '../../../shared/ui/diamond-gallery/diamond-gallery';
import { DiamondSpecs } from '../../../shared/ui/diamond-specs/diamond-specs';
import { CertificateCard } from '../../../shared/ui/certificate-card/certificate-card';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiIconButton } from '../../../shared/ui/icon-button/ui-icon-button';
import { UiPrice } from '../../../shared/ui/price/ui-price';
import { UiBadge } from '../../../shared/ui/badge/ui-badge';
import { UiEmptyState } from '../../../shared/ui/empty-state/ui-empty-state';
import { Icon } from '../../../shared/ui/icon/icon';
import { ShapeGlyph, DiamondShapeName } from '../../../shared/ui/shape-glyph/shape-glyph';

/**
 * Diamond product detail (§18–§22). Left: gallery/Zoom/360°/video slots.
 * Right: grades, price, Add to Bag / Buy Now / Compare / Wishlist /
 * Talk to an Expert, then specs, why-this-diamond and certificate.
 */
@Component({
  selector: 'ak-diamond-detail',
  imports: [
    RouterLink,
    UiBreadcrumb,
    DiamondGallery,
    DiamondSpecs,
    CertificateCard,
    UiButton,
    UiIconButton,
    UiPrice,
    UiBadge,
    UiEmptyState,
    Icon,
    ShapeGlyph,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diamond-detail.html',
  styleUrl: './diamond-detail.scss',
})
export class DiamondDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly diamonds = inject(DiamondService);
  protected readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly compare = inject(CompareService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);
  private readonly brand = inject<BrandConfig>(BRAND_CONFIG);

  protected readonly slug = signal(this.route.snapshot.paramMap.get('slug') ?? '');
  protected readonly diamond = computed(() => this.diamonds.getBySlug(this.slug()));

  protected readonly shapeName = computed<DiamondShapeName>(
    () => this.diamond()?.shape as DiamondShapeName,
  );
  protected readonly explanation = computed(() =>
    this.diamond() ? explainDiamond(this.diamond()!) : null,
  );
  protected readonly wishlisted = computed(() =>
    this.diamond() ? this.wishlist.isWishlisted(this.diamond()!.id) : false,
  );
  protected readonly compared = computed(() =>
    this.diamond() ? this.compare.isCompared(this.diamond()!.id) : false,
  );
  protected readonly perCarat = computed(() =>
    this.diamond()
      ? Math.round(this.diamond()!.pricing.amount / this.diamond()!.carat / 100) * 100
      : 0,
  );

  constructor() {
    const d = this.diamond();
    this.seo.setPageMeta({
      title: d?.name ?? 'Diamond',
      description: `Explore a certified ${d?.shape ?? ''} diamond — ₹${(d?.pricing.amount ?? 0).toLocaleString('en-IN')} · ${d?.carat ?? ''} ct · ${d?.color ?? ''} · ${d?.clarity ?? ''}.`,
      path: d?.slug ? `/diamonds/${d.slug}` : '/diamonds',
    });

    if (d) {
      this.seo.setJsonLd('product-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: d.name,
        description: `${d.shape} diamond — ${d.carat}ct, ${d.color}, ${d.clarity}, ${d.cut} cut. Certified by ${d.certificate.laboratory}.`,
        image: d.media.images?.[0] ?? '',
        brand: { '@type': 'Brand', name: 'Akshay Diamonds' },
        offers: {
          '@type': 'Offer',
          price: d.pricing.amount,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${this.brand.siteUrl}diamonds/${d.slug}`,
        },
        certification: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: d.certificate.laboratory,
          identifier: d.certificate.number,
        },
      });
    }

    this.analytics.track('diamond_viewed', { id: d?.id });
  }

  protected addToCart(): void {
    if (!this.diamond()) return;
    this.cart.add(this.diamond()!.id, 1, this.diamond()!.name);
    this.analytics.track('add_to_cart', { id: this.diamond()!.id });
  }

  protected buyNow(): void {
    if (!this.diamond()) return;
    this.cart.add(this.diamond()!.id, 1, this.diamond()!.name);
    this.analytics.track('checkout_started', { id: this.diamond()!.id });
  }

  protected toggleWishlist(): void {
    if (!this.diamond()) return;
    this.wishlist.toggle(this.diamond()!.id, this.diamond()!.name);
    if (!this.wishlisted()) {
      this.analytics.track('wishlist_added', { id: this.diamond()!.id });
    }
  }

  protected toggleCompare(): void {
    if (!this.diamond()) return;
    this.compare.toggle(this.diamond()!.id, this.diamond()!.name);
    this.analytics.track('compare_added', { id: this.diamond()!.id });
  }
}