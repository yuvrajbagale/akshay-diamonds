import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { OrderService } from '../../core/services/order.service';
import { BrandConfig, BRAND_CONFIG } from '../../core/config/brand.config';
import { UiSectionHeading } from '../../shared/ui/section-heading/ui-section-heading';
import { UiButton } from '../../shared/ui/button/ui-button';

@Component({
  selector: 'ak-order-confirmation',
  imports: [UiSectionHeading, UiButton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.scss',
})
export class OrderConfirmation {
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly orders = inject(OrderService);
  protected readonly brand = inject<BrandConfig>(BRAND_CONFIG);

  protected readonly orderId = this.route.snapshot.queryParamMap.get('id') ?? '';
  protected readonly order = this.orderId ? this.orders.getById(this.orderId) : undefined;

  constructor() {
    this.seo.setPageMeta({ title: 'Order Confirmed', description: 'Thank you for your purchase.', path: '/order-confirmation' });
  }
}
