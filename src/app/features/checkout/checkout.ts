import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SeoService } from '../../core/services/seo.service';
import { UiButton } from '../../shared/ui/button/ui-button';
import { UiPrice } from '../../shared/ui/price/ui-price';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';
import { ShapeGlyph } from '../../shared/ui/shape-glyph/shape-glyph';
import { DiamondShapeName } from '../../shared/ui/shape-glyph/shape-glyph';
import { Diamond } from '../../core/models/diamond.model';
import { PaymentMethod } from '../../core/models/order.model';

@Component({
  selector: 'ak-checkout',
  imports: [ReactiveFormsModule, TitleCasePipe, UiButton, UiPrice, UiBreadcrumb, ShapeGlyph],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  private readonly _step = signal<'contact' | 'shipping' | 'payment' | 'review'>('contact');
  protected readonly step = this._step.asReadonly();

  protected readonly items = computed(() => this.cart.items());
  protected readonly subtotal = computed(() =>
    this.items().reduce((s, i) => s + (this.cart.diamond(i.diamondId)?.pricing.amount ?? 0) * i.quantity, 0));
  protected readonly shippingCost = 0;
  protected readonly total = computed(() => this.subtotal() + this.shippingCost);

  protected readonly contact = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
  });

  protected readonly shipping = this.fb.group({
    fullName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  protected readonly paymentMethod = signal<PaymentMethod>('card');

  protected payOptions = [
    { id: 'card' as const, label: 'Credit / Debit Card' },
    { id: 'upi' as const, label: 'UPI' },
    { id: 'netbanking' as const, label: 'Net Banking' },
    { id: 'emi' as const, label: 'EMI' },
  ];

  constructor() {
    this.seo.setPageMeta({ title: 'Checkout', description: 'Complete your diamond purchase securely.', path: '/checkout' });
  }

  protected shapeOf(d: Diamond): DiamondShapeName { return d.shape as DiamondShapeName; }
  protected diamondFor(id: string) { return this.cart.diamond(id); }

  protected get breadcrumbs() {
    return [
      { label: 'Home', path: '/' },
      { label: 'Bag', path: '/cart' },
      { label: 'Checkout' },
    ];
  }

  protected canContact(): boolean { return this.contact.valid; }
  protected canShip(): boolean { return this.shipping.valid; }

  protected nextFromContact(): void {
    this.analytics.track('checkout_started', { step: 'contact' });
    this._step.set('shipping');
  }
  protected nextFromShipping(): void {
    this._step.set('payment');
  }
  protected nextFromPayment(): void {
    this._step.set('review');
  }
  protected back(): void {
    const map: Record<string, 'contact' | 'shipping' | 'payment'> = {
      shipping: 'contact', payment: 'shipping', review: 'payment',
    };
    const prev = map[this.step()];
    if (prev) this._step.set(prev);
  }

  protected place(): void {
    const order = this.orders.placeOrder({
      items: this.items().map(i => {
        const d = this.cart.diamond(i.diamondId);
        return { diamondId: i.diamondId, name: d?.name ?? '', carat: d?.carat ?? 0, price: d?.pricing.amount ?? 0, quantity: i.quantity };
      }),
      contact: { email: this.contact.value.email!, phone: this.contact.value.phone! },
      shipping: {
        fullName: this.shipping.value.fullName!,
        line1: this.shipping.value.line1!,
        line2: this.shipping.value.line2 ?? undefined,
        city: this.shipping.value.city!,
        state: this.shipping.value.state!,
        pincode: this.shipping.value.pincode!,
        phone: this.contact.value.phone!,
      },
      payment: this.paymentMethod(),
      subtotal: this.subtotal(),
      shippingCost: this.shippingCost,
      total: this.total(),
    });
    this.analytics.track('purchase_completed', { orderId: order.id, total: order.total });
    this.cart.clear();
    this.router.navigate(['/order-confirmation'], { queryParams: { id: order.id } });
  }
}
