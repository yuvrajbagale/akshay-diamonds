import { InrCurrencyPipe } from './inr-currency.pipe';

describe('InrCurrencyPipe', () => {
  const pipe = new InrCurrencyPipe();

  it('formats the Indian lakh/crore digit grouping', () => {
    expect(pipe.transform(0)).toBe('₹0');
    expect(pipe.transform(999)).toBe('₹999');
    expect(pipe.transform(1000)).toBe('₹1,000');
    expect(pipe.transform(142500)).toBe('₹1,42,500');
    expect(pipe.transform(12345678)).toBe('₹1,23,45,678');
    expect(pipe.transform(10000000)).toBe('₹1,00,00,000');
  });

  it('supports decimals and negative amounts', () => {
    expect(pipe.transform(142500.75, { decimals: 2 })).toBe('₹1,42,500.75');
    expect(pipe.transform(-5000)).toBe('₹-5,000');
  });

  it('compacts to lakh and crore notation when asked', () => {
    expect(pipe.transform(1425000, { compact: true })).toBe('₹14.25 L');
    expect(pipe.transform(25000000, { compact: true })).toBe('₹2.5 Cr');
    expect(pipe.transform(99999, { compact: true })).toBe('₹99,999');
  });

  it('returns an empty string for missing or invalid values', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(NaN)).toBe('');
    expect(pipe.transform(Number.POSITIVE_INFINITY)).toBe('');
  });
});
