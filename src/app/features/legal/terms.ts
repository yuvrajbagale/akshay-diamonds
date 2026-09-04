import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';

@Component({
  selector: 'ak-terms',
  imports: [UiBreadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="legal">
      <div class="container legal__container">
        <ak-breadcrumb [items]="breadcrumbs" />
        <h1 class="legal__title">Terms of Service</h1>
        <p class="legal__updated">Last updated: 5 September 2026</p>

        <div class="legal__content">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Akshay Diamonds website (akshaydiamonds.in), you agree to be
            bound by these Terms of Service. If you do not agree to these terms, please do not use
            our website.
          </p>

          <h2>2. Products &amp; Pricing</h2>
          <p>
            All diamonds and jewellery displayed on our website are subject to availability. We make
            every effort to display accurate descriptions, images, and pricing. However, colours and
            appearance may vary slightly due to screen settings. Prices are listed in Indian Rupees
            (INR) and are inclusive of applicable taxes unless stated otherwise.
          </p>
          <p>
            Each diamond is independently certified by GIA or IGI. Certificate details are provided
            on the product page for full transparency.
          </p>

          <h2>3. Orders &amp; Payment</h2>
          <p>
            Placing an order constitutes an offer to purchase. We reserve the right to accept or
            decline any order. Payment must be completed before an order is processed. We accept
            UPI, credit/debit cards, net banking, and EMI as displayed at checkout.
          </p>

          <h2>4. Shipping &amp; Delivery</h2>
          <p>
            We offer complimentary insured delivery within India. International shipping rates and
            delivery times vary by destination and will be calculated at checkout. All shipments are
            fully insured during transit.
          </p>

          <h2>5. Returns &amp; Exchanges</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you are not happy with your
            order, you may return it within the specified return window. Items must be in their
            original condition with all documentation. Please refer to our return policy for full
            details.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, graphics, and design
            elements, is the property of Akshay Diamonds and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works without our
            written consent.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            Akshay Diamonds shall not be liable for any indirect, incidental, or consequential
            damages arising from the use of our website or the purchase of our products. Our total
            liability shall not exceed the purchase price of the product in question.
          </p>

          <h2>8. Privacy</h2>
          <p>
            Your use of our website is also governed by our
            <a routerLink="/privacy">Privacy Policy</a>, which describes how we collect, use, and
            protect your personal information.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Changes will be effective
            immediately upon posting. Your continued use of the website constitutes acceptance of
            the updated terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            For any questions about these terms, please contact us at
            <a href="mailto:care@akshaydiamonds.in">care@akshaydiamonds.in</a>.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .legal { padding-block: var(--section-pad-y); }
    .legal__container { max-width: 48rem; }
    .legal__title {
      font-family: var(--font-serif);
      font-size: var(--text-display-2);
      margin-top: var(--space-md);
    }
    .legal__updated {
      font-size: var(--text-body-sm);
      color: var(--color-text-tertiary);
      margin-top: var(--space-2xs);
      margin-bottom: var(--space-xl);
    }
    .legal__content {
      font-size: var(--text-body);
      line-height: var(--leading-normal);
      color: var(--color-text-secondary);
    }
    .legal__content h2 {
      font-family: var(--font-serif);
      font-size: var(--text-title-2);
      color: var(--color-text-primary);
      margin-top: var(--space-xl);
      margin-bottom: var(--space-sm);
    }
    .legal__content p { margin-bottom: var(--space-sm); }
    .legal__content a { color: var(--color-accent); text-underline-offset: 0.2em; }
  `,
})
export class TermsPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({
      title: 'Terms of Service',
      description: 'Terms and conditions for using the Akshay Diamonds website and purchasing our products.',
      path: '/terms',
    });
  }

  protected readonly breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Terms of Service' }];
}
