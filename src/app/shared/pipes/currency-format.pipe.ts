import { Pipe, PipeTransform } from '@angular/core';

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface CurrencyFormatOptions {
  readonly currency?: SupportedCurrency;
  readonly compact?: boolean;
  readonly decimals?: number;
}

const COMPACT_CRORE = 1e7;
const COMPACT_LAKH = 1e5;
const COMPACT_MILLION = 1e6;
const COMPACT_BILLION = 1e9;

const CURRENCY_CONFIG: Record<SupportedCurrency, { symbol: string; locale: string; groupSeparator: string; decimalSeparator: string }> = {
  INR: { symbol: '₹', locale: 'en-IN', groupSeparator: ',', decimalSeparator: '.' },
  USD: { symbol: '$', locale: 'en-US', groupSeparator: ',', decimalSeparator: '.' },
  EUR: { symbol: '€', locale: 'de-DE', groupSeparator: '.', decimalSeparator: ',' },
  GBP: { symbol: '£', locale: 'en-GB', groupSeparator: ',', decimalSeparator: '.' },
  AED: { symbol: 'AED', locale: 'ar-AE', groupSeparator: ',', decimalSeparator: '.' },
  SGD: { symbol: 'S$', locale: 'en-SG', groupSeparator: ',', decimalSeparator: '.' },
};

/**
 * Multi-currency formatting pipe.
 * Supports INR (lakh/crore), USD, EUR, GBP, AED, SGD with compact notation.
 *
 * Usage: {{ price | currency:'USD' }} → $1,234
 *        {{ price | currency:'INR' : { compact: true } }} → ₹14.25 L
 */
@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, options?: CurrencyFormatOptions): string {
    if (value === null || value === undefined || !Number.isFinite(value)) {
      return '';
    }

    const currency = options?.currency ?? 'INR';
    const decimals = Math.max(0, Math.min(3, options?.decimals ?? 0));
    const compact = options?.compact ?? false;
    const config = CURRENCY_CONFIG[currency];

    if (currency === 'INR') {
      return this.formatINR(value, decimals, compact);
    }

    return this.formatInternational(value, config, decimals, compact);
  }

  private formatINR(value: number, decimals: number, compact: boolean): string {
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

  private formatInternational(
    value: number,
    config: { symbol: string; locale: string },
    decimals: number,
    compact: boolean,
  ): string {
    if (compact && Math.abs(value) >= COMPACT_BILLION) {
      return `${config.symbol}${this.trimZeros((value / COMPACT_BILLION).toFixed(2))}B`;
    }
    if (compact && Math.abs(value) >= COMPACT_MILLION) {
      return `${config.symbol}${this.trimZeros((value / COMPACT_MILLION).toFixed(2))}M`;
    }
    return `${config.symbol}${Math.abs(value).toLocaleString(config.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }

  private groupIndian(whole: string): string {
    if (whole.length <= 3) return whole;
    const last3 = whole.slice(-3);
    let rest = whole.slice(0, -3);
    const groups: string[] = [];
    while (rest.length > 2) {
      groups.unshift(rest.slice(-2));
      rest = rest.slice(0, -2);
    }
    if (rest.length > 0) groups.unshift(rest);
    return [...groups, last3].join(',');
  }

  private trimZeros(value: string): string {
    return value.includes('.') ? value.replace(/0+$/, '').replace(/\.$/, '') : value;
  }
}
