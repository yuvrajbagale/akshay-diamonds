import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { JewelleryService } from '../../../core/services/jewellery.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { JewelleryProduct } from '../../../core/models/jewellery.model';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiPrice } from '../../../shared/ui/price/ui-price';
import { UiEmptyState } from '../../../shared/ui/empty-state/ui-empty-state';
import { ProductImage } from '../../../shared/ui/product-image/product-image';
import { Icon } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'ak-jewellery-detail',
  imports: [RouterLink, UiBreadcrumb, UiButton, UiPrice, UiEmptyState, ProductImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jewellery-detail.html',
  styleUrl: './jewellery-detail.scss',
})
export class JewelleryDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly jewellery = inject(JewelleryService);
  private readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  protected readonly product = signal<JewelleryProduct | undefined>(undefined);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const item = this.jewellery.getBySlug(slug);
    this.product.set(item);
    if (item) {
      this.seo.setPageMeta({
        title: item.name,
        description: item.description,
        path: `/jewellery/${item.slug}`,
      });
    }
  }

  protected get breadcrumbs() {
    const p = this.product();
    return [
      { label: 'Home', path: '/' },
      { label: 'Jewellery', path: '/jewellery' },
      { label: p?.name ?? 'Product' },
    ];
  }

  protected isInCart(): boolean {
    const p = this.product();
    return p ? this.cart.isInCart(p.id) : false;
  }

  protected addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cart.add(p.id, 1, p.name);
    this.analytics.track('add_to_cart', { id: p.id, name: p.name });
  }

  protected toggleWishlist(): void {
    const p = this.product();
    if (!p) return;
    this.wishlist.toggle(p.id, p.name);
  }

  protected isWishlisted(): boolean {
    const p = this.product();
    return p ? this.wishlist.isWishlisted(p.id) : false;
  }

  protected categoryName(slug: string): string {
    return this.jewellery.categoryName(slug);
  }
}
