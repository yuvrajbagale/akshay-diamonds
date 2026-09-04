import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DiamondFilters } from '../../../core/models/diamond-filter.model';
import { DiamondFacets } from '../../../core/services/diamond.service';
import { DiamondShape, DiamondType } from '../../../core/models/diamond.model';
import { InrCurrencyPipe } from '../../../shared/pipes/inr-currency.pipe';
import { Icon } from '../../../shared/ui/icon/icon';
import { ShapeGlyph, DiamondShapeName } from '../../../shared/ui/shape-glyph/shape-glyph';
import { UiRangeSlider } from '../../../shared/ui/range-slider/ui-range-slider';

type ListKey =
  | 'shapes'
  | 'colors'
  | 'clarities'
  | 'cuts'
  | 'polishes'
  | 'symmetries'
  | 'fluorescence'
  | 'laboratories';

/**
 * The filter panel — used both as the desktop persistent sidebar and inside
 * the mobile filter drawer. Stateless: the listing owns the filters signal,
 * this panel only emits changes.
 */
@Component({
  selector: 'ak-diamond-filters',
  imports: [Icon, ShapeGlyph, UiRangeSlider, InrCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diamond-filters.html',
  styleUrl: './diamond-filters.scss',
})
export class DiamondFiltersPanel {
  readonly filters = input.required<DiamondFilters>();
  readonly facets = input.required<DiamondFacets>();
  readonly filtersChange = output<DiamondFilters>();

  protected readonly shapeNames = computed(() => Object.keys(this.facets().shapeCounts));
  protected readonly colorKeys = computed(() => Object.entries(this.facets().colorCounts).sort(([a], [b]) => a.localeCompare(b)).map(([k]) => k));
  protected readonly clarityKeys = computed(() => Object.keys(this.facets().clarityCounts));
  protected readonly cutKeys = computed(() => Object.keys(this.facets().cutCounts));
  protected readonly labKeys = computed(() => Object.keys(this.facets().labCounts));
  protected readonly fluorescenceKeys = computed(() => Object.keys(this.facets().fluorescenceCounts));

  protected shapeGlyph(shape: string): DiamondShapeName {
    return shape as DiamondShapeName;
  }

  protected shapeCount(shape: string): number {
    return this.facets().shapeCounts[shape as DiamondShape] ?? 0;
  }

  protected readonly activeCount = computed(() => {
    const f = this.filters();
    let n = 0;
    if (f.type) n += 1;
    for (const key of ['shapes', 'colors', 'clarities', 'cuts', 'polishes', 'symmetries', 'fluorescence', 'laboratories'] as const) {
      n += (f[key]?.length ?? 0);
    }
    if (f.availableOnly) n += 1;
    return n;
  });

  protected patch(patch: Partial<DiamondFilters>): void {
    this.filtersChange.emit({ ...this.filters(), ...patch });
  }

  protected isChecked(list: ListKey, value: string): boolean {
    return ((this.filters()[list] ?? []) as readonly string[]).includes(value);
  }

  protected toggle(list: ListKey, value: string, checked: boolean): void {
    const current = (this.filters()[list] ?? []) as readonly string[];
    const next = checked ? [...current, value] : current.filter(x => x !== value);
    const patch: Record<string, unknown> = { [list]: next.length ? next : undefined };
    this.patch(patch as Partial<DiamondFilters>);
  }

  protected setType(type: DiamondType): void {
    const next = this.filters().type === type ? null : type;
    this.patch({ type: next });
  }

  protected toggleAvailable(checked: boolean): void {
    this.patch({ availableOnly: checked || undefined });
  }

  protected onCarat(low: number, high: number): void {
    const facets = this.facets();
    this.patch({
      minCarat: low <= facets.caratMin ? undefined : Math.round(low * 100) / 100,
      maxCarat: high >= facets.caratMax ? undefined : Math.round(high * 100) / 100,
    });
  }

  protected onPrice(low: number, high: number): void {
    const facets = this.facets();
    this.patch({
      minPrice: low <= facets.priceMin ? undefined : Math.round(low / 1000) * 1000,
      maxPrice: high >= facets.priceMax ? undefined : Math.round(high / 1000) * 1000,
    });
  }

  protected clearAll(): void {
    const sort = this.filters().sort ?? 'recommended';
    this.filtersChange.emit({ sort });
  }
}