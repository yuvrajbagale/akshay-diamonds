import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CompareService } from '../../core/services/compare.service';
import { SeoService } from '../../core/services/seo.service';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiEmptyState } from '../../shared/ui/empty-state/ui-empty-state';
import { UiButton } from '../../shared/ui/button/ui-button';
import { UiPrice } from '../../shared/ui/price/ui-price';

type Tab = 'orders' | 'wishlist' | 'compare';

@Component({
  selector: 'ak-account',
  imports: [DatePipe, RouterLink, UiBreadcrumb, UiEmptyState, UiPrice],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  private readonly orders = inject(OrderService);
  private readonly wishlist = inject(WishlistService);
  private readonly compare = inject(CompareService);
  private readonly seo = inject(SeoService);

  protected readonly tab = signal<Tab>('orders');
  protected readonly orderList = this.orders.orders;
  protected readonly wishlistIds = this.wishlist.ids;
  protected readonly compareIds = this.compare.ids;

  constructor() {
    this.seo.setPageMeta({ title: 'Your Account', description: 'Manage your orders, saved diamonds, and consultations.', path: '/account' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Your Account' }];
  }

  protected setTab(t: Tab): void { this.tab.set(t); }

  protected statusLabel(s: string): string {
    return { confirmed: 'Confirmed', processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered' }[s] ?? s;
  }
}
