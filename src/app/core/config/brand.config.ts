import { InjectionToken } from '@angular/core';

export interface BrandConfig {
  readonly name: string;
  readonly wordmarkPrimary: string;
  readonly wordmarkSecondary: string;
  readonly tagline: string;
  readonly siteUrl: string;
  readonly announcement: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly whatsappHref: string;
  readonly email: string;
  readonly address: { readonly line1: string; readonly city: string };
  readonly hours: string;
  readonly certificationNote: string;
  readonly social: { readonly instagram: string; readonly facebook: string; readonly youtube: string };
}

/**
 * Single source of truth for brand facts shown across the UI (header,
 * footer, consultation, structured data). Trust claims must reflect what
 * the business actually offers — nothing here may be fabricated.
 */
export const BRAND_CONFIG = new InjectionToken<BrandConfig>('BRAND_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    name: 'Akshay Diamonds',
    wordmarkPrimary: 'Akshay',
    wordmarkSecondary: 'Diamonds',
    tagline: 'Certified diamonds, honestly presented.',
    siteUrl: 'https://akshaydiamonds.in/',
    announcement: 'Complimentary insured delivery worldwide',
    phoneDisplay: '+91 22 4055 6789',
    phoneHref: 'tel:+912240556789',
    whatsappHref: 'https://wa.me/919876543210',
    email: 'care@akshaydiamonds.in',
    address: { line1: '42, Maker Chambers IV, Nariman Point', city: 'Mumbai 400021, India' },
    hours: 'Mon – Sat · 10:00 – 19:00 IST',
    certificationNote: 'Every diamond is independently certified by GIA or IGI.',
    social: {
      instagram: 'https://instagram.com/akshaydiamonds',
      facebook: 'https://facebook.com/akshaydiamonds',
      youtube: 'https://youtube.com/@akshaydiamonds',
    },
  }),
});
