import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { ToastService } from '../../core/services/toast.service';
import { NewsletterService } from '../../core/services/newsletter.service';
import { Icon } from '../../shared/ui/icon/icon';
import { UiButton } from '../../shared/ui/button/ui-button';
import { BrandLogo } from '../brand-logo/brand-logo';
import { UiTrustBadge } from '../../shared/ui/trust-badge/ui-trust-badge';

/**
 * Dark-luxury footer: brand statement + newsletter, link columns, contact,
 * trust row and legal. All claims come from BrandConfig.
 */
@Component({
  selector: 'ak-footer',
  imports: [RouterLink, Icon, UiButton, BrandLogo, UiTrustBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly brand = inject(BRAND_CONFIG);
  private readonly newsletterService = inject(NewsletterService);
  private readonly toast = inject(ToastService);

  protected readonly year = new Date().getFullYear();
  protected readonly email = signal('');
  protected readonly subscribing = signal(false);

  protected onInput(value: string): void {
    this.email.set(value);
  }

  protected async subscribe(event: Event): Promise<void> {
    event.preventDefault();

    const email = this.email().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.toast.error('Please enter a valid email address.');
      return;
    }

    this.subscribing.set(true);
    try {
      await this.newsletterService.subscribe(email);
      this.toast.success('Welcome — notes on new pieces and guides are on their way.');
      this.email.set('');
    } finally {
      this.subscribing.set(false);
    }
  }
}
