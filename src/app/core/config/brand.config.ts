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
    announcement: 'Complimentary insured delivery across India',
    // NOTE(business): placeholder contact details — replace with the real
    // phone, WhatsApp business number, email, address and social profiles
    // before launch. They are centralized here for exactly that reason.
    phoneDisplay: '+91 90000 00000',
    phoneHref: 'tel:+919000000000',
    whatsappHref: 'https://wa.me/919000000000',
    email: 'care@akshaydiamonds.in',
    address: { line1: 'The Diamond Atelier', city: 'Mumbai, India' },
    hours: 'Mon – Sat · 11:00 – 19:00 IST',
    certificationNote: 'Every diamond is independently certified by GIA or IGI.',
    social: {
      instagram: 'https://instagram.com/akshaydiamonds',
      facebook: 'https://facebook.com/akshaydiamonds',
      youtube: 'https://youtube.com/@akshaydiamonds',
    },
  }),
});
