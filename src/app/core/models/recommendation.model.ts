import type { DiamondShapeName } from '../../shared/ui/shape-glyph/shape-glyph';

export type RecommendationOccasion = 'engagement' | 'wedding' | 'anniversary' | 'gift' | 'self-purchase';

export type BudgetTier = 'under-1l' | '1-2l' | '2-5l' | '5l-plus';

/** What matters most to the buyer — the beginner path (product spec §14). */
export type RecommendationPriority = 'size' | 'sparkle' | 'value' | 'quality';

export interface RecommendationCriteria {
  readonly occasion: RecommendationOccasion;
  readonly shape: DiamondShapeName;
  readonly budget: BudgetTier;
  readonly priority: RecommendationPriority;
}

/** Filter presets understood by the diamond listing (built in Phase 3). */
export interface RecommendationFilters {
  readonly shape?: DiamondShapeName;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly sort?: 'price-asc' | 'price-desc';
}

export interface RecommendationSummary {
  readonly headline: string;
  /** Human-readable guidance translating criteria into diamond language. */
  readonly guidance: string;
  readonly filters: RecommendationFilters;
}
