import { Injectable, computed, signal } from '@angular/core';
import { MOCK_DIAMONDS } from '../data/mock-diamonds';
import { DiamondFilters } from '../models/diamond-filter.model';
import { Diamond, DiamondShape } from '../models/diamond.model';

export interface DiamondFacets {
  readonly typeCounts: Record<'natural' | 'lab-grown', number>;
  readonly shapeCounts: Record<DiamondShape, number>;
  readonly colorCounts: Record<string, number>;
  readonly clarityCounts: Record<string, number>;
  readonly cutCounts: Record<string, number>;
  readonly polishCounts: Record<string, number>;
  readonly symmetryCounts: Record<string, number>;
  readonly fluorescenceCounts: Record<string, number>;
  readonly labCounts: Record<string, number>;
  readonly priceMin: number;
  readonly priceMax: number;
  readonly caratMin: number;
  readonly caratMax: number;
}

/** Pure filter engine — unit-tested, backend-shaped, no component logic. */
export function applyDiamondFilters(all: readonly Diamond[], filters: DiamondFilters): Diamond[] {
  let result = all.filter(diamond => {
    if (filters.type && diamond.type !== filters.type) return false;
    if (filters.shapes?.length && !filters.shapes.includes(diamond.shape)) return false;
    if (filters.colors?.length && !filters.colors.includes(diamond.color)) return false;
    if (filters.clarities?.length && !filters.clarities.includes(diamond.clarity)) return false;
    if (filters.cuts?.length && !filters.cuts.includes(diamond.cut)) return false;
    if (filters.polishes?.length && !filters.polishes.includes(diamond.polish)) return false;
    if (filters.symmetries?.length && !filters.symmetries.includes(diamond.symmetry)) return false;
    if (filters.fluorescence?.length && !filters.fluorescence.includes(diamond.fluorescence)) return false;
    if (filters.laboratories?.length && !filters.laboratories.includes(diamond.certificate.laboratory)) return false;
    if (filters.availableOnly && !diamond.inventory.available) return false;
    if (filters.minCarat != null && diamond.carat < filters.minCarat) return false;
    if (filters.maxCarat != null && diamond.carat > filters.maxCarat) return false;
    if (filters.minPrice != null && diamond.pricing.amount < filters.minPrice) return false;
    if (filters.maxPrice != null && diamond.pricing.amount > filters.maxPrice) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const haystack = [
        diamond.name,
        diamond.sku,
        diamond.shape,
        diamond.color,
        diamond.clarity,
        diamond.cut,
        diamond.certificate.number,
        diamond.certificate.laboratory,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.pricing.amount - b.pricing.amount);
      break;
    case 'price-desc':
      result = [...result].sort((a, b) => b.pricing.amount - a.pricing.amount);
      break;
    case 'carat':
      result = [...result].sort((a, b) => b.carat - a.carat);
      break;
    case 'newest':
      result = [...result].sort((a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt));
      break;
    default:
      // Recommended: in-stock first, preserving catalog order.
      result = [...result].sort((a, b) => Number(b.inventory.available) - Number(a.inventory.available));
  }

  return result;
}
export function buildDiamondFacets(all: readonly Diamond[]): DiamondFacets {
  const typeCounts: DiamondFacets['typeCounts'] = { natural: 0, 'lab-grown': 0 };
  const shapeCounts = {} as Record<DiamondShape, number>;
  const colorCounts: Record<string, number> = {};
  const clarityCounts: Record<string, number> = {};
  const cutCounts: Record<string, number> = {};
  const polishCounts: Record<string, number> = {};
  const symmetryCounts: Record<string, number> = {};
  const fluorescenceCounts: Record<string, number> = {};
  const labCounts: Record<string, number> = {};

  let priceMin = Number.POSITIVE_INFINITY;
  let priceMax = 0;
  let caratMin = Number.POSITIVE_INFINITY;
  let caratMax = 0;

  for (const d of all) {
    typeCounts[d.type] += 1;
    increment(shapeCounts, d.shape);
    increment(colorCounts, d.color);
    increment(clarityCounts, d.clarity);
    increment(cutCounts, d.cut);
    increment(polishCounts, d.polish);
    increment(symmetryCounts, d.symmetry);
    increment(fluorescenceCounts, d.fluorescence);
    increment(labCounts, d.certificate.laboratory);
    priceMin = Math.min(priceMin, d.pricing.amount);
    priceMax = Math.max(priceMax, d.pricing.amount);
    caratMin = Math.min(caratMin, d.carat);
    caratMax = Math.max(caratMax, d.carat);
  }

  return {
    typeCounts,
    shapeCounts,
    colorCounts,
    clarityCounts,
    cutCounts,
    polishCounts,
    symmetryCounts,
    fluorescenceCounts,
    labCounts,
    priceMin: Number.isFinite(priceMin) ? priceMin : 0,
    priceMax,
    caratMin: Number.isFinite(caratMin) ? caratMin : 0,
    caratMax,
  };
}

function increment(map: Record<string, number>, key: string): void {
  map[key] = (map[key] ?? 0) + 1;
}

/**
 * Catalog repository. Mock data today; when the HTTP API arrives, only the
 * population of `diamonds` (and any pagination) changes — filters, facets
 * and every component keep consuming the read-only signal.
 */
@Injectable({ providedIn: 'root' })
export class DiamondService {
  private readonly _diamonds = signal<readonly Diamond[]>([]);
  private readonly _loading = signal(true);

  readonly diamonds = this._diamonds.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly facets = computed(() => buildDiamondFacets(this._diamonds()));

  constructor() {
    this.load();
  }

  private load(): void {
    this._loading.set(true);
    setTimeout(() => {
      this._diamonds.set(MOCK_DIAMONDS);
      this._loading.set(false);
    }, 180);
  }

  list(filters: DiamondFilters = {}): Diamond[] {
    return applyDiamondFilters(this._diamonds(), filters);
  }

  getById(id: string): Diamond | undefined {
    return this._diamonds().find(diamond => diamond.id === id);
  }

  getBySlug(slug: string): Diamond | undefined {
    return this._diamonds().find(diamond => diamond.slug === slug);
  }
}
