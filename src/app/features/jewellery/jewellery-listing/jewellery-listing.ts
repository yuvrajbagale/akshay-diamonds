import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { CartService } from '../../../core/services/cart.service';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../../shared/ui/section-heading/ui-section-heading';
import { UiPrice } from '../../../shared/ui/price/ui-price';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiEmptyState } from '../../../shared/ui/empty-state/ui-empty-state';
import { ProductImage } from '../../../shared/ui/product-image/product-image';
import { JewelleryService } from '../../../core/services/jewellery.service';
import { JewelleryProduct } from '../../../core/models/jewellery.model';

@Component({
  selector: 'ak-jewellery-listing',
  imports: [UiBreadcrumb, UiSectionHeading, UiPrice, UiButton, UiEmptyState, ProductImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jewellery-listing.html',
  styleUrl: './jewellery-listing.scss',
})
export class JewelleryListing {
  private readonly seo = inject(SeoService);
  private readonly jewellery = inject(JewelleryService);
  private readonly cart = inject(CartService);

  protected readonly activeCategory = signal<string>('');
  protected readonly filtered = computed(() => {
    const cat = this.activeCategory();
    return cat ? this.jewellery.byCategory(cat) : this.jewellery.allProducts();
  });
  protected readonly categories = this.jewellery.categories;

  constructor() {
    this.seo.setPageMeta({ title: 'Diamond Jewellery', description: 'Explore our diamond jewellery — engagement rings, wedding bands, earrings, necklaces, pendants, bracelets and bangles.', path: '/jewellery' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Jewellery' }];
  }

  protected setCategory(slug: string): void {
    this.activeCategory.set(slug === this.activeCategory() ? '' : slug);
  }

  protected addToCart(product: JewelleryProduct): void {
    this.cart.add(product.id, 1, product.name);
  }
}
