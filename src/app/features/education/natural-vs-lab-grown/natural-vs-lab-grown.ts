import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../../shared/ui/section-heading/ui-section-heading';

@Component({
  selector: 'ak-natural-vs-lab-grown',
  imports: [RouterLink, UiBreadcrumb, UiSectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './natural-vs-lab-grown.html',
  styleUrl: './natural-vs-lab-grown.scss',
})
export class NaturalVsLabGrown {
  private readonly seo = inject(SeoService);

  protected readonly rows = [
    { aspect: 'Origin', natural: 'Formed deep within the Earth over billions of years.', lab: 'Created in a laboratory over several weeks.' },
    { aspect: 'Formation', natural: 'Extreme heat and pressure crystallise carbon.', lab: 'HPHT or CVD processes replicate natural conditions.' },
    { aspect: 'Appearance', natural: 'Identical to lab-grown at the atomic level.', lab: 'Identical to natural at the atomic level.' },
    { aspect: 'Certification', natural: 'Graded by GIA, IGI and other laboratories.', lab: 'Graded by the same laboratories, clearly disclosed.' },
    { aspect: 'Price', natural: 'Higher due to rarity and natural origin.', lab: 'Typically 40–60% less than equivalent natural diamonds.' },
    { aspect: 'Rarity', natural: 'Finite supply; each stone is unique.', lab: 'Renewable supply; consistent quality achievable.' },
    { aspect: 'Environmental considerations', natural: 'Mining has land and energy impacts; responsible sourcing matters.', lab: 'Lower land impact; energy source determines footprint.' },
    { aspect: 'Resale considerations', natural: 'Historically holds value more predictably.', lab: 'Resale market is still developing; values differ from natural.' },
  ];

  constructor() {
    this.seo.setPageMeta({ title: 'Natural vs Lab-Grown Diamonds', description: 'An honest comparison of natural and lab-grown diamonds — their origin, characteristics and considerations.', path: '/learn/natural-vs-lab-grown' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Natural vs Lab-Grown' }];
  }
}
