import { Pipe, PipeTransform } from '@angular/core';

export interface InrFormatOptions {
  /** Fractional digits to show (default 0). */
  readonly decimals?: number;
  /** Compact lakh/crore notation, e.g. ₹14.25 L (default false). */
  readonly compact?: boolean;
}

const COMPACT_CRORE = 1e7;
const COMPACT_LAKH = 1e5;

/**
 * Indian numbering format: 142500 → ₹1,42,500.
 * Deliberately manual (no locale-data dependency) so the lakh/crore
 * grouping — last three digits, then pairs — is always exact.
 */
@Pipe({ name: 'inr' })
export class InrCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined, options?: InrFormatOptions): string {
    if (value === null || value === undefined || !Number.isFinite(value)) {
      return '';
    }

    const decimals = Math.max(0, Math.min(3, options?.decimals ?? 0));
    const compact = options?.compact ?? false;

    if (compact && Math.abs(value) >= COMPACT_CRORE) {
      return `₹${this.trimZeros((value / COMPACT_CRORE).toFixed(2))} Cr`;
    }

    if (compact && Math.abs(value) >= COMPACT_LAKH) {
      return `₹${this.trimZeros((value / COMPACT_LAKH).toFixed(2))} L`;
    }

    const negative = value < 0;
    const fixed = Math.abs(value).toFixed(decimals);
    const [whole, fraction] = fixed.split('.');
    const grouped = this.groupIndian(whole);
    const digits = decimals > 0 ? `${grouped}.${fraction}` : grouped;

    return `₹${negative ? '-' : ''}${digits}`;
  }

  private groupIndian(whole: string): string {
    if (whole.length <= 3) {
      return whole;
    }

    const last3 = whole.slice(-3);
    let rest = whole.slice(0, -3);
    const groups: string[] = [];

    while (rest.length > 2) {
      groups.unshift(rest.slice(-2));
      rest = rest.slice(0, -2);
    }
    if (rest.length > 0) {
      groups.unshift(rest);
    }

    return [...groups, last3].join(',');
  }

  private trimZeros(value: string): string {
    return value.includes('.') ? value.replace(/0+$/, '').replace(/\.$/, '') : value;
  }
}
