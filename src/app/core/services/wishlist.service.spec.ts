import { TestBed } from '@angular/core/testing';
import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('toggles items and persists to localStorage', () => {
    const service = TestBed.inject(WishlistService);

    service.add('d001', 'Round Diamond');

    expect(service.isWishlisted('d001')).toBe(true);
    expect(service.count()).toBe(1);
    expect(JSON.parse(localStorage.getItem('ak-wishlist') ?? '[]')).toEqual(['d001']);

    service.remove('d001');
    expect(service.isWishlisted('d001')).toBe(false);
    expect(service.count()).toBe(0);
  });

  it('starts empty when storage is clear', () => {
    const service = TestBed.inject(WishlistService);
    expect(service.count()).toBe(0);
  });
});