import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DiamondService } from '../../core/services/diamond.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SeoService } from '../../core/services/seo.service';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiEmptyState } from '../../shared/ui/empty-state/ui-empty-state';
import { UiButton } from '../../shared/ui/button/ui-button';
import { UiPrice } from '../../shared/ui/price/ui-price';
import { ShapeGlyph } from '../../shared/ui/shape-glyph/shape-glyph';
import { RouterLink } from '@angular/router';
import { Diamond } from '../../core/models/diamond.model';
import { DiamondShapeName } from '../../shared/ui/shape-glyph/shape-glyph';

@Component({
  selector: 'ak-wishlist',
  imports: [UiBreadcrumb, UiEmptyState, UiButton, UiPrice, ShapeGlyph, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.scss',
})
export class WishlistPage {
  private readonly diamonds = inject(DiamondService);
  private readonly wishlist = inject(WishlistService);
  protected readonly cart = inject(CartService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  protected readonly items = computed(() =>
    this.wishlist.ids().map(id => this.diamonds.getById(id)).filter((d): d is Diamond => !!d));

  constructor() { this.seo.setPageMeta({ title:'Your Wishlist', description:'Diamonds you have saved for later.', path:'/wishlist' }); }

  protected shapeOf(d: Diamond): DiamondShapeName { return d.shape as DiamondShapeName; }
  protected moveToCart(d: Diamond): void { this.cart.add(d.id, 1, d.name); this.analytics.track('add_to_cart', { id: d.id }); }
  protected remove(id: string): void { this.wishlist.remove(id); }
}

