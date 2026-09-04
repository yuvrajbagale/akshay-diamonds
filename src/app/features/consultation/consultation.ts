import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { BrandConfig, BRAND_CONFIG } from '../../core/config/brand.config';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../shared/ui/section-heading/ui-section-heading';
import { UiButton } from '../../shared/ui/button/ui-button';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'ak-consultation',
  imports: [FormsModule, UiBreadcrumb, UiSectionHeading, UiButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './consultation.html',
  styleUrl: './consultation.scss',
})
export class Consultation {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  protected readonly brand = inject<BrandConfig>(BRAND_CONFIG);

  protected readonly submitted = signal(false);
  protected readonly name = signal('');
  protected readonly phoneValue = signal('');
  protected readonly preferredTime = signal('Morning (10am–12pm)');
  protected readonly nameError = signal('');
  protected readonly phoneError = signal('');

  constructor() {
    this.seo.setPageMeta({ title: 'Speak With a Diamond Expert', description: 'Book a consultation with our diamond experts — by phone, WhatsApp, video call or in-store visit.', path: '/consultation' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Consultation' }];
  }

  protected validateName(value: string): void {
    this.name.set(value);
    this.nameError.set(value.trim().length < 2 ? 'Please enter your full name.' : '');
  }

  protected validatePhone(value: string): void {
    this.phoneValue.set(value);
    const digits = value.replace(/\D/g, '');
    this.phoneError.set(digits.length < 10 ? 'Please enter a valid phone number.' : '');
  }

  protected whatsapp(): void {
    this.analytics.track('whatsapp_clicked', { source: 'consultation' });
  }

  protected phone(): void {
    this.analytics.track('phone_clicked', { source: 'consultation' });
  }

  protected submit(): void {
    this.validateName(this.name());
    this.validatePhone(this.phoneValue());

    if (this.nameError() || this.phoneError()) return;

    this.submitted.set(true);
    this.analytics.track('consultation_started', { source: 'form' });
  }
}
