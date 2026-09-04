import { RecommendationService } from './recommendation.service';

describe('RecommendationService', () => {
  const service = new RecommendationService();

  it('builds guidance and filter presets from criteria', () => {
    const summary = service.buildSummary({
      occasion: 'engagement',
      shape: 'oval',
      budget: '1-2l',
      priority: 'sparkle',
    });

    expect(summary.headline).toBe('Your Best Matches');
    expect(summary.filters).toEqual({
      shape: 'oval',
      minPrice: 100_000,
      maxPrice: 200_000,
      sort: undefined,
    });
    expect(summary.guidance).toContain('Excellent or Very Good cut oval');
    expect(summary.guidance).toContain('₹1–2 lakh');
  });

  it('sorts by price descending when size matters most', () => {
    const summary = service.buildSummary({
      occasion: 'wedding',
      shape: 'round',
      budget: '2-5l',
      priority: 'size',
    });

    expect(summary.filters.sort).toBe('price-desc');
    expect(summary.guidance).toContain('largest look');
  });

  it('sorts by price ascending for best value', () => {
    const summary = service.buildSummary({
      occasion: 'gift',
      shape: 'pear',
      budget: 'under-1l',
      priority: 'value',
    });

    expect(summary.filters.sort).toBe('price-asc');
    expect(summary.filters.maxPrice).toBe(100_000);
  });

  it('keeps open-ended budgets without an upper bound', () => {
    const summary = service.buildSummary({
      occasion: 'self-purchase',
      shape: 'emerald',
      budget: '5l-plus',
      priority: 'quality',
    });

    expect(summary.filters.minPrice).toBe(500_000);
    expect(summary.filters.maxPrice).toBeUndefined();
    expect(summary.guidance).toContain('D–F colour');
  });
});
