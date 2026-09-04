import { DiamondShape, DiamondType } from './diamond.model';

export type DiamondSort = 'recommended' | 'price-asc' | 'price-desc' | 'carat' | 'newest';

/** Listing filters — the same contract the beginner wizard deep-links into. */
export interface DiamondFilters {
  readonly type?: DiamondType | null;
  readonly shapes?: readonly DiamondShape[];
  readonly colors?: readonly string[];
  readonly clarities?: readonly string[];
  readonly cuts?: readonly string[];
  readonly polishes?: readonly string[];
  readonly symmetries?: readonly string[];
  readonly fluorescence?: readonly string[];
  readonly laboratories?: readonly string[];
  readonly minCarat?: number | null;
  readonly maxCarat?: number | null;
  readonly minPrice?: number | null;
  readonly maxPrice?: number | null;
  readonly availableOnly?: boolean;
  readonly q?: string;
  readonly sort?: DiamondSort;
}

export const COLOR_GRADES = ['D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;
export const CLARITY_GRADES = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'] as const;
export const QUALITY_GRADES = ['Excellent', 'Very Good', 'Good'] as const;
export const FLUORESCENCE_GRADES = ['None', 'Faint', 'Medium'] as const;
export const CERTIFICATION_LABS = ['GIA', 'IGI'] as const;

export const SORT_OPTIONS: { readonly value: DiamondSort; readonly label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'carat', label: 'Carat Weight' },
  { value: 'newest', label: 'Newest' },
];

export const DEFAULT_DIAMOND_FILTERS: DiamondFilters = { sort: 'recommended' };