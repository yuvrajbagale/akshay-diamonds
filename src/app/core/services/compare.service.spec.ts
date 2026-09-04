import { TestBed } from '@angular/core/testing';
import { CompareService, MAX_COMPARE } from './compare.service';

describe('CompareService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds and removes diamonds', () => {
    const service = TestBed.inject(CompareService);

    service.add('d001');
    service.add('d002');

    expect(service.count()).toBe(2);
    expect(service.isCompared('d001')).toBe(true);

    service.remove('d001');
    expect(service.isCompared('d001')).toBe(false);
  });

  it(`caps the tray at ${MAX_COMPARE} diamonds`, () => {
    const service = TestBed.inject(CompareService);

    for (let i = 1; i <= MAX_COMPARE; i++) {
      service.add(`d00${i}`);
    }
    service.add('d099');

    expect(service.count()).toBe(MAX_COMPARE);
    expect(service.isFull()).toBe(true);
    expect(service.isCompared('d099')).toBe(false);
  });

  it('persists the comparison set', () => {
    const service = TestBed.inject(CompareService);

    service.add('d001');
    expect(JSON.parse(localStorage.getItem('ak-compare') ?? '[]')).toEqual(['d001']);
  });
});