import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../../shared/ui/section-heading/ui-section-heading';

@Component({
  selector: 'ak-four-cs',
  imports: [RouterLink, UiBreadcrumb, UiSectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './four-cs.html',
  styleUrl: './four-cs.scss',
})
export class FourCs {
  private readonly seo = inject(SeoService);

  protected readonly cs = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  protected readonly clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];
  protected readonly cuts = ['Excellent', 'Very Good', 'Good', 'Fair'];

  constructor() {
    this.seo.setPageMeta({ title: 'The 4Cs of Diamonds', description: 'Understand carat, color, clarity and cut — the four characteristics that define a diamond\'s quality.', path: '/learn/four-cs' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'The 4Cs' }];
  }
}
