import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Diamond } from '../../../core/models/diamond.model';
import { CertificateService, CertificateVerificationStatus } from '../../../core/services/certificate.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { UiButton } from '../button/ui-button';
import { UiSpinner } from '../spinner/ui-spinner';
import { Icon } from '../icon/icon';

/**
 * "Verify This Diamond" card. The certificate facts are always shown; the
 * verification action uses CertificateService, which never fakes a result.
 */
@Component({
  selector: 'ak-certificate-card',
  imports: [RouterLink, UiButton, UiSpinner, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certificate-card.html',
  styleUrl: './certificate-card.scss',
})
export class CertificateCard {
  readonly diamond = input.required<Diamond>();

  private readonly certificate = inject(CertificateService);
  private readonly analytics = inject(AnalyticsService);

  protected readonly status = signal<CertificateVerificationStatus>('idle');
  protected readonly message = signal('');

  protected async verify(): Promise<void> {
    if (this.status() !== 'idle') return;
    this.status.set('verifying');
    const result = await this.certificate.verify(
      this.diamond().certificate.laboratory,
      this.diamond().certificate.number,
    );
    this.status.set(result.status);
    this.message.set(result.message);
    this.analytics.track('certificate_viewed', {
      laboratory: this.diamond().certificate.laboratory,
      certificateNumber: this.diamond().certificate.number,
    });
  }
}