import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../../shared/ui/section-heading/ui-section-heading';

@Component({
  selector: 'ak-care',
  imports: [RouterLink, UiBreadcrumb, UiSectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './care.html',
  styleUrl: './care.scss',
})
export class Care {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({
      title: 'Diamond Care',
      description: 'How to care for, clean and protect your diamond jewellery to keep it brilliant for a lifetime.',
      path: '/learn/care',
    });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Diamond Care' }];
  }
}
