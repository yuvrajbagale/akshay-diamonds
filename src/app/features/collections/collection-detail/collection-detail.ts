import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { COLLECTIONS, CollectionDetail as CollectionData } from '../../../core/data/collections-data';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiEmptyState } from '../../../shared/ui/empty-state/ui-empty-state';
import { HeroImage, HeroImageVariant } from '../../../shared/ui/hero-image/hero-image';
import { Icon } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'ak-collection-detail',
  imports: [RouterLink, UiBreadcrumb, UiButton, UiEmptyState, HeroImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.scss',
})
export class CollectionDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  protected readonly collection = signal<CollectionData | undefined>(undefined);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const item = COLLECTIONS.find(c => c.slug === slug);
    this.collection.set(item);
    if (item) {
      this.seo.setPageMeta({
        title: item.name,
        description: item.story,
        path: `/collections/${item.slug}`,
      });
    }
  }

  protected get breadcrumbs() {
    const c = this.collection();
    return [
      { label: 'Home', path: '/' },
      { label: 'Collections', path: '/collections' },
      { label: c?.name ?? 'Collection' },
    ];
  }

  protected heroVariant(c: CollectionData): HeroImageVariant {
    return c.tone === 'dark' ? 'hero' : 'collection';
  }
}
