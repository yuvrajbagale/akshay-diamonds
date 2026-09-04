import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';

@Component({
  selector: 'ak-privacy',
  imports: [UiBreadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="legal">
      <div class="container legal__container">
        <ak-breadcrumb [items]="breadcrumbs" />
        <h1 class="legal__title">Privacy Policy</h1>
        <p class="legal__updated">Last updated: 5 September 2026</p>

        <div class="legal__content">
          <h2>1. Information We Collect</h2>
          <p>
            When you visit Akshay Diamonds, we may collect personal information you provide directly,
            such as your name, email address, phone number, and shipping address when you place an
            order, register an account, or submit a consultation request.
          </p>
          <p>
            We also automatically collect certain information about your device and browsing
            behaviour, including IP address, browser type, pages visited, and time spent on our site,
            through cookies and similar technologies.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfil your orders, including shipping and insurance</li>
            <li>Communicate with you about your orders, consultations, and enquiries</li>
            <li>Improve our website, products, and services</li>
            <li>Send you marketing communications (only with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Cookies</h2>
          <p>
            We use essential cookies to enable core site functionality and optional analytics cookies
            to understand how visitors interact with our site. You can manage your cookie preferences
            at any time through our cookie consent banner.
          </p>

          <h2>4. Data Sharing</h2>
          <p>
            We do not sell your personal information. We share your data only with trusted service
            providers who assist in operating our website and conducting our business, including
            payment processors, shipping partners, and analytics providers. These providers are
            contractually obligated to keep your information confidential.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information.
            However, no method of electronic transmission or storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfil the purposes
            for which it was collected, or as required by applicable law.
          </p>

          <h2>8. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own.
            We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            For any privacy-related enquiries, please contact us at
            <a href="mailto:care@akshaydiamonds.in">care@akshaydiamonds.in</a> or write to us at
            42, Maker Chambers IV, Nariman Point, Mumbai 400021, India.
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
    .legal__content ul {
      list-style: disc;
      margin-inline-start: var(--space-lg);
      margin-bottom: var(--space-sm);
    }
    .legal__content li { margin-bottom: var(--space-3xs); }
    .legal__content a { color: var(--color-accent); text-underline-offset: 0.2em; }
  `,
})
export class PrivacyPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({
      title: 'Privacy Policy',
      description: 'How Akshay Diamonds collects, uses, and protects your personal information.',
      path: '/privacy',
    });
  }

  protected readonly breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }];
}
