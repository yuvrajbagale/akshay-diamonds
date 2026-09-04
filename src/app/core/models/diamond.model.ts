/** The nine canonical diamond cuts. */
export type DiamondShape =
  | 'round'
  | 'oval'
  | 'emerald'
  | 'pear'
  | 'princess'
  | 'cushion'
  | 'radiant'
  | 'marquise'
  | 'heart';

export type DiamondType = 'natural' | 'lab-grown';

export type CertificationLab = 'GIA' | 'IGI';

export interface DiamondMeasurement {
  readonly length: number;
  readonly width: number;
  readonly depth: number;
}

export interface DiamondCertificate {
  readonly laboratory: CertificationLab;
  readonly number: string;
  readonly url?: string;
}

export interface DiamondPricing {
  readonly amount: number;
  readonly currency: 'INR';
}

export interface DiamondInventory {
  readonly available: boolean;
  readonly quantity?: number;
}

export interface DiamondMedia {
  readonly images: string[];
  readonly videos?: string[];
  /** URL/handle for the future interactive 360° viewer. */
  readonly viewer360?: string;
}

/** Diamond catalog entity (product spec §43), kept extensible. */
export interface Diamond {
  readonly id: string;
  readonly sku: string;
  readonly type: DiamondType;
  readonly shape: DiamondShape;
  readonly carat: number;
  readonly color: string;
  readonly clarity: string;
  readonly cut: string;
  readonly polish: string;
  readonly symmetry: string;
  readonly fluorescence: string;
  readonly measurements: DiamondMeasurement;
  readonly certificate: DiamondCertificate;
  readonly pricing: DiamondPricing;
  readonly inventory: DiamondInventory;
  readonly media: DiamondMedia;
  /** Human-friendly marketing name. */
  readonly name: string;
  /** SEO slug, e.g. "oval/0-72ct-g-vs1". */
  readonly slug: string;
  /** ISO date — powers the "newest" sort. */
  readonly listedAt: string;
}