import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DiamondFilters, DiamondSort, SORT_OPTIONS } from '../../../core/models/diamond-filter.model';
import { DiamondShape, DiamondType } from '../../../core/models/diamond.model';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { CompareService } from '../../../core/services/compare.service';
import { DiamondService } from '../../../core/services/diamond.service';
import { SeoService } from '../../../core/services/seo.service';
import { UiDrawer } from '../../../shared/ui/drawer/ui-drawer';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiSkeleton } from '../../../shared/ui/skeleton/ui-skeleton';
import { UiEmptyState } from '../../../shared/ui/empty-state/ui-empty-state';
import { DiamondCard } from '../../../shared/ui/diamond-card/diamond-card';
import { DiamondFiltersPanel } from '../filters/diamond-filters';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/ui/icon/icon';

function isSort(value: string | null): value is DiamondSort {
  return SORT_OPTIONS.some(option => option.value === value);
}

function toNumber(value: string | null): number | null | undefined {
  if (value == null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function filtersFromParams(params: ParamMap): DiamondFilters {
  const type = params.get('type');
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? undefined,
    type: type === 'natural' || type === 'lab-grown' ? type : undefined,
    shapes: (params.getAll('shape') as DiamondShape[]) || undefined,
    colors: params.getAll('color') || undefined,
    clarities: params.getAll('clarity') || undefined,
    cuts: params.getAll('cut') || undefined,
    laboratories: params.getAll('certification').map(value => value.toUpperCase()) || undefined,
    fluorescence: params.getAll('fluorescence') || undefined,
    minCarat: toNumber(params.get('minCarat')),
    maxCarat: toNumber(params.get('maxCarat')),
    minPrice: toNumber(params.get('minPrice')),
    maxPrice: toNumber(params.get('maxPrice')),
    availableOnly: params.get('available') === 'true' ? true : undefined,
    sort: isSort(sort) ? sort : 'recommended',
  };
}

/**
 * Diamond listing — the expert path into the catalogue. Filters live in the
 * URL query string so every state is shareable and deep-linkable; the
 * beginner wizard and the search overlay both hand this page presets.
 */
@Component({
  selector: 'ak-diamond-listing',
  imports: [
    RouterLink,
    Icon,
    UiDrawer,
    UiButton,
    UiSkeleton,
    UiEmptyState,
    DiamondCard,
    DiamondFiltersPanel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diamond-listing.html',
  styleUrl: './diamond-listing.scss',
})
export class DiamondListing {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly diamonds = inject(DiamondService);
  protected readonly compare = inject(CompareService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  protected readonly sortOptions = SORT_OPTIONS;
  protected readonly facets = this.diamonds.facets;

  protected readonly filters = signal<DiamondFilters>(filtersFromParams(this.route.snapshot.queryParamMap));
  protected readonly query = signal(filtersFromParams(this.route.snapshot.queryParamMap).q ?? '');
  protected readonly filtersOpen = signal(false);

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly results = computed(() => this.diamonds.list(this.filters()));
  protected readonly count = computed(() => this.results().length);

  protected readonly skeletonItems = (): number[] => [0, 1, 2, 3, 4, 5, 6, 7];

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const fromParams = filtersFromParams(params);
        if (this.normalized(fromParams) !== this.normalized(this.filters())) {
          this.filters.set(fromParams);
        }
      });

    effect(() => {
      const current = this.filters();
      const fromParams = filtersFromParams(this.params());
      if (this.normalized(fromParams) !== this.normalized(current)) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: this.filtersToParams(current),
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });

    this.seo.setPageMeta({
      title: 'Certified Diamonds',
      description:
        'Browse certified natural and lab-grown diamonds — search and filter by shape, carat, colour, clarity, cut and budget, with transparent pricing.',
      path: '/diamonds',
    });
  }

  protected apply(filters: DiamondFilters): void {
    this.filters.set(filters);
    this.analytics.track('filter_applied', { activeFilterCount: this.activeCount(filters) });
  }

  protected setType(type: DiamondType): void {
    const next = this.filters().type === type ? undefined : type;
    this.apply({ ...this.filters(), type: next });
  }

  protected setSort(event: Event): void {
    const sort = (event.target as HTMLSelectElement).value as DiamondSort;
    this.apply({ ...this.filters(), sort });
  }

  protected search(event: Event): void {
    event.preventDefault();
    const q = this.query().trim();
    this.apply({ ...this.filters(), q: q || undefined });
    this.analytics.track('diamond_search', { query: q });
  }

  protected activeCount(filters: DiamondFilters): number {
    let n = 0;
    if (filters.type) n += 1;
    for (const key of ['shapes', 'colors', 'clarities', 'cuts', 'polishes', 'symmetries', 'fluorescence', 'laboratories'] as const) {
      n += filters[key]?.length ?? 0;
    }
    if (filters.availableOnly) n += 1;
    return n;
  }

  private normalized(filters: DiamondFilters): string {
    return JSON.stringify({
      q: filters.q ?? null,
      type: filters.type ?? null,
      shapes: [...(filters.shapes ?? [])].sort(),
      colors: [...(filters.colors ?? [])].sort(),
      clarities: [...(filters.clarities ?? [])].sort(),
      cuts: [...(filters.cuts ?? [])].sort(),
      laboratories: [...(filters.laboratories ?? [])].map(value => value.toUpperCase()).sort(),
      fluorescence: [...(filters.fluorescence ?? [])].sort(),
      minCarat: filters.minCarat ?? null,
      maxCarat: filters.maxCarat ?? null,
      minPrice: filters.minPrice ?? null,
      maxPrice: filters.maxPrice ?? null,
      availableOnly: filters.availableOnly ?? null,
      sort: filters.sort ?? 'recommended',
    });
  }

  private filtersToParams(filters: DiamondFilters): Record<string, string | number | string[] | null> {
    return {
      q: filters.q ?? null,
      type: filters.type ?? null,
      shape: filters.shapes?.length ? [...filters.shapes] : null,
      color: filters.colors?.length ? [...filters.colors] : null,
      clarity: filters.clarities?.length ? [...filters.clarities] : null,
      cut: filters.cuts?.length ? [...filters.cuts] : null,
      certification: filters.laboratories?.length ? [...filters.laboratories] : null,
      fluorescence: filters.fluorescence?.length ? [...filters.fluorescence] : null,
      minCarat: filters.minCarat ?? null,
      maxCarat: filters.maxCarat ?? null,
      minPrice: filters.minPrice ?? null,
      maxPrice: filters.maxPrice ?? null,
      available: filters.availableOnly ? 'true' : null,
      sort: filters.sort === 'recommended' ? null : (filters.sort ?? null),
    };
  }
}