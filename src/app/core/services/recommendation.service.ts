import { Injectable } from '@angular/core';
import {
  BudgetTier,
  RecommendationCriteria,
  RecommendationFilters,
  RecommendationSummary,
} from '../models/recommendation.model';

interface BudgetRange {
  readonly min?: number;
  readonly max?: number;
  readonly label: string;
}

const BUDGET_RANGES: Record<BudgetTier, BudgetRange> = {
  'under-1l': { max: 100_000, label: 'under ₹1 lakh' },
  '1-2l': { min: 100_000, max: 200_000, label: '₹1–2 lakh' },
  '2-5l': { min: 200_000, max: 500_000, label: '₹2–5 lakh' },
  '5l-plus': { min: 500_000, label: 'above ₹5 lakh' },
};

const PRIORITY_GUIDANCE: Record<
  RecommendationCriteria['priority'],
  (shape: string, budget: string) => string
> = {
  size: (shape, budget) =>
    `Within ${budget}, a ${shape} between G–I colour and VS2–SI1 clarity lets carat weight grow while staying eye-clean — the largest look for your budget.`,
  sparkle: (shape, budget) =>
    `For maximum life, cut comes first: an Excellent or Very Good cut ${shape}, with colour and clarity in the G–I / VS range, gives the most sparkle within ${budget}.`,
  value: (shape, budget) =>
    `The sweet spot for ${shape} in ${budget} is typically G–I colour with VS2–SI1 clarity and a Very Good cut — beauty you can see, without paying for grades you can't.`,
  quality: (shape, budget) =>
    `For the highest quality, we would shortlist ${shape} diamonds in the D–F colour range with VVS clarity and Excellent cut across the board within ${budget}.`,
};

/**
 * Guided-discovery engine (product spec §14/§60). Today: a transparent
 * heuristic that turns criteria into guidance and listing filter presets.
 * Later: the same `buildSummary` signature is served by the real
 * recommendation API — the wizard does not change.
 */
@Injectable({ providedIn: 'root' })
export class RecommendationService {
  buildSummary(criteria: RecommendationCriteria): RecommendationSummary {
    const budget = BUDGET_RANGES[criteria.budget];
    const shape = criteria.shape;
    const sort: RecommendationFilters['sort'] =
      criteria.priority === 'size' ? 'price-desc' : criteria.priority === 'value' ? 'price-asc' : undefined;

    const filters: RecommendationFilters = {
      shape,
      minPrice: budget.min,
      maxPrice: budget.max,
      sort,
    };

    return {
      headline: 'Your Best Matches',
      guidance: PRIORITY_GUIDANCE[criteria.priority](shape, budget.label),
      filters,
    };
  }
}
