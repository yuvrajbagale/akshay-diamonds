import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DiamondService } from '../../core/services/diamond.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
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
import { CartItem } from '../../core/models/cart.model';

interface CartLine {
  item: CartItem;
  diamond?: Diamond;
  quantity: number;
  lineTotal: number;
}

interface CartLine {
  item: CartItem;
  diamond?: Diamond;
  quantity: number;
  lineTotal: number;
}

@Component({
  selector: 'ak-cart',
  imports: [UiBreadcrumb, UiEmptyState, UiButton, UiPrice, ShapeGlyph, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private readonly diamonds = inject(DiamondService);
  protected readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  protected readonly lines = computed(() =>
    this.cart.items().map(item => {
      const diamond = this.diamonds.getById(item.diamondId);
      const isRing = item.type === 'ring';
      const lineTotal = isRing ? (item.ringConfig?.total ?? 0) * item.quantity : (diamond?.pricing.amount ?? 0) * item.quantity;
      return { item, diamond, quantity: item.quantity, lineTotal } as CartLine;
    }).filter(l => l.diamond || l.item.type === 'ring'));

  protected readonly subtotal = computed(() => this.lines().reduce((s, l) => s + l.lineTotal, 0));
  protected readonly shipping = 0;
  protected readonly total = computed(() => this.subtotal());

  constructor() { this.seo.setPageMeta({ title: 'Your Bag', description: 'Review your selected diamonds before checkout.', path: '/cart' }); }

  protected shapeOf(d: Diamond): DiamondShapeName { return d.shape as DiamondShapeName; }
  protected ringShape(s: string): DiamondShapeName { return s as DiamondShapeName; }
  protected onQty(id: string, qty: number): void { this.cart.setQuantity(id, qty); }
  protected remove(id: string): void { this.cart.remove(id); }
  protected saveForLater(d: Diamond): void { this.wishlist.add(d.id, d.name); this.cart.remove(d.id); }
  protected checkout(): void { this.analytics.track('checkout_started', { count: this.cart.count() }); }
}

