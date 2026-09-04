import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../../shared/ui/section-heading/ui-section-heading';

@Component({
  selector: 'ak-certification',
  imports: [RouterLink, UiBreadcrumb, UiSectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certification.html',
  styleUrl: './certification.scss',
})
export class Certification {
  private readonly seo = inject(SeoService);

  protected readonly labs = [
    { name: 'GIA', full: 'Gemological Institute of America', gold: true },
    { name: 'IGI', full: 'International Gemological Institute', gold: false },
    { name: 'HRD', full: 'Hoge Raad voor Diamant', gold: false },
    { name: 'SGL', full: 'Solitaire Gem Labs', gold: false },
  ];

  constructor() {
    this.seo.setPageMeta({ title: 'Diamond Certification', description: 'Every diamond we sell is certified by an independent laboratory. Learn what that means and how to verify your stone.', path: '/learn/certification' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Certification' }];
  }
}
