import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds items and aggregates quantity', () => {
    const service = TestBed.inject(CartService);

    service.add('d001', 1);
    service.add('d001', 2);

    expect(service.quantityOf('d001')).toBe(3);
    expect(service.count()).toBe(3);
  });

  it('updates quantity and removes when set to zero', () => {
    const service = TestBed.inject(CartService);

    service.add('d001', 1);
    service.setQuantity('d001', 2);
    expect(service.quantityOf('d001')).toBe(2);

    service.setQuantity('d001', 0);
    expect(service.isInCart('d001')).toBe(false);
  });

  it('persists to localStorage', () => {
    const service = TestBed.inject(CartService);

    service.add('d001', 1);
    const saved = JSON.parse(localStorage.getItem('ak-cart') ?? '[]') as Array<{ diamondId: string }>;
    expect(saved.some(item => item.diamondId === 'd001')).toBe(true);
  });
});