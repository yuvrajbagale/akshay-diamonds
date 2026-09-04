import { MOCK_DIAMONDS } from '../data/mock-diamonds';
import { applyDiamondFilters, buildDiamondFacets } from './diamond.service';

describe('DiamondService filter engine', () => {
  it('provides a realistic mock inventory across shapes and types', () => {
    expect(MOCK_DIAMONDS.length).toBe(36);
    expect(new Set(MOCK_DIAMONDS.map(d => d.shape)).size).toBe(9);
    expect(MOCK_DIAMONDS.some(d => d.type === 'natural')).toBe(true);
    expect(MOCK_DIAMONDS.some(d => d.type === 'lab-grown')).toBe(true);
    expect(MOCK_DIAMONDS.every(d => d.certificate.number.length > 0)).toBe(true);
  });

  it('filters by diamond type', () => {
    const lab = applyDiamondFilters(MOCK_DIAMONDS, { type: 'lab-grown' });
    expect(lab.length).toBeGreaterThan(0);
    expect(lab.every(d => d.type === 'lab-grown')).toBe(true);
  });

  it('filters by shape', () => {
    const oval = applyDiamondFilters(MOCK_DIAMONDS, { shapes: ['oval'] });
    expect(oval.length).toBeGreaterThan(0);
    expect(oval.every(d => d.shape === 'oval')).toBe(true);
  });

  it('filters by price range', () => {
    const result = applyDiamondFilters(MOCK_DIAMONDS, { minPrice: 100_000, maxPrice: 200_000 });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(d => d.pricing.amount >= 100_000 && d.pricing.amount <= 200_000)).toBe(true);
  });

  it('filters by colour and clarity together', () => {
    const result = applyDiamondFilters(MOCK_DIAMONDS, { colors: ['G'], clarities: ['VS1'] });
    expect(result.every(d => d.color === 'G' && d.clarity === 'VS1')).toBe(true);
  });

  it('respects availability', () => {
    const available = applyDiamondFilters(MOCK_DIAMONDS, { availableOnly: true });
    expect(available.every(d => d.inventory.available)).toBe(true);
  });

  it('searches across name, SKU and certificate', () => {
    const byName = applyDiamondFilters(MOCK_DIAMONDS, { q: 'oval' });
    expect(byName.length).toBeGreaterThan(0);
    const byCert = applyDiamondFilters(MOCK_DIAMONDS, { q: MOCK_DIAMONDS[4].certificate.number });
    expect(byCert).toContain(MOCK_DIAMONDS[4]);
    const bySku = applyDiamondFilters(MOCK_DIAMONDS, { q: MOCK_DIAMONDS[1].sku.toLowerCase() });
    expect(bySku).toContain(MOCK_DIAMONDS[1]);
  });

  it('sorts by price ascending and descending', () => {
    const asc = applyDiamondFilters(MOCK_DIAMONDS, { sort: 'price-asc' });
    const prices = asc.map(d => d.pricing.amount);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    const desc = applyDiamondFilters(MOCK_DIAMONDS, { sort: 'price-desc' });
    const pricesDesc = desc.map(d => d.pricing.amount);
    expect(pricesDesc).toEqual([...pricesDesc].sort((a, b) => b - a));
  });

  it('sorts by carat weight descending', () => {
    const result = applyDiamondFilters(MOCK_DIAMONDS, { sort: 'carat' });
    const carats = result.map(d => d.carat);
    expect(carats).toEqual([...carats].sort((a, b) => b - a));
  });

  it('builds facet counts and bounds from the catalog', () => {
    const facets = buildDiamondFacets(MOCK_DIAMONDS);
    expect(facets.priceMin).toBeLessThan(facets.priceMax);
    expect(facets.caratMin).toBeLessThan(facets.caratMax);
    expect(Object.keys(facets.shapeCounts)).toHaveLength(9);
    expect(facets.typeCounts.natural + facets.typeCounts['lab-grown']).toBe(MOCK_DIAMONDS.length);
  });
});