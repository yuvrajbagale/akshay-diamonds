import { Diamond, DiamondShape, DiamondType } from '../models/diamond.model';

/**
 * MOCK CATALOG — clearly separated from production services (spec §59).
 * When the live diamond API exists, delete this file and point
 * DiamondService at the HTTP repository. No production code depends on
 * this module directly.
 */

interface Seed {
  readonly shape: DiamondShape;
  readonly carat: number;
  readonly color: string;
  readonly clarity: string;
  readonly cut: string;
  readonly polish: string;
  readonly symmetry: string;
  readonly fluorescence: string;
  readonly type: DiamondType;
  readonly available?: boolean;
}

const SEEDS: readonly Seed[] = [
  // Round
  { shape: 'round', carat: 0.5, color: 'G', clarity: 'VS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'round', carat: 0.72, color: 'G', clarity: 'VS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  { shape: 'round', carat: 1, color: 'H', clarity: 'VS2', cut: 'Excellent', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'round', carat: 1.25, color: 'E', clarity: 'VVS2', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  { shape: 'round', carat: 1.5, color: 'F', clarity: 'VS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  { shape: 'round', carat: 0.9, color: 'J', clarity: 'SI1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'Medium', type: 'lab-grown' },
  // Oval
  { shape: 'oval', carat: 0.72, color: 'G', clarity: 'VS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'oval', carat: 1.05, color: 'H', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'Faint', type: 'natural', available: false },
  { shape: 'oval', carat: 1.4, color: 'F', clarity: 'VVS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  { shape: 'oval', carat: 0.6, color: 'H', clarity: 'SI1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'None', type: 'lab-grown' },
  { shape: 'oval', carat: 1.8, color: 'E', clarity: 'VS2', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  // Emerald
  { shape: 'emerald', carat: 1, color: 'H', clarity: 'VS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'emerald', carat: 1.25, color: 'G', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'emerald', carat: 0.85, color: 'I', clarity: 'VS1', cut: 'Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'Faint', type: 'lab-grown' },
  { shape: 'emerald', carat: 1.6, color: 'D', clarity: 'VS2', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  // Pear
  { shape: 'pear', carat: 0.7, color: 'G', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'pear', carat: 1.1, color: 'F', clarity: 'VS2', cut: 'Excellent', polish: 'Excellent', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'pear', carat: 1, color: 'H', clarity: 'VVS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'Faint', type: 'natural' },
  { shape: 'pear', carat: 0.55, color: 'I', clarity: 'SI1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'None', type: 'lab-grown' },
  // Princess
  { shape: 'princess', carat: 0.8, color: 'G', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'princess', carat: 1, color: 'F', clarity: 'VS2', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  { shape: 'princess', carat: 1.35, color: 'D', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'Faint', type: 'natural' },
  { shape: 'princess', carat: 0.65, color: 'I', clarity: 'SI1', cut: 'Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'None', type: 'lab-grown' },
  // Cushion
  { shape: 'cushion', carat: 0.9, color: 'G', clarity: 'VS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'cushion', carat: 1.2, color: 'F', clarity: 'VS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None', type: 'natural' },
  { shape: 'cushion', carat: 1.55, color: 'I', clarity: 'VS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'Medium', type: 'natural', available: false },
  { shape: 'cushion', carat: 0.8, color: 'H', clarity: 'SI1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'lab-grown' },
  // Radiant
  { shape: 'radiant', carat: 1, color: 'G', clarity: 'VS1', cut: 'Excellent', polish: 'Excellent', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'radiant', carat: 1.3, color: 'F', clarity: 'VS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'Faint', type: 'natural' },
  { shape: 'radiant', carat: 0.75, color: 'H', clarity: 'SI1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'None', type: 'lab-grown' },
  // Marquise
  { shape: 'marquise', carat: 0.9, color: 'G', clarity: 'VVS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'marquise', carat: 1.2, color: 'H', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'marquise', carat: 1, color: 'I', clarity: 'SI1', cut: 'Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'Faint', type: 'lab-grown' },
  // Heart
  { shape: 'heart', carat: 0.8, color: 'G', clarity: 'VS1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'heart', carat: 1, color: 'D', clarity: 'VS2', cut: 'Very Good', polish: 'Very Good', symmetry: 'Very Good', fluorescence: 'None', type: 'natural' },
  { shape: 'heart', carat: 0.7, color: 'H', clarity: 'SI1', cut: 'Very Good', polish: 'Very Good', symmetry: 'Good', fluorescence: 'None', type: 'lab-grown' },
];

// --- Pricing engine (mock only) -----------------------------------------------
const COLOR_FACTOR: Record<string, number> = {
  D: 1, E: 0.98, F: 0.95, G: 0.92, H: 0.88, I: 0.82, J: 0.76,
};
const CLARITY_FACTOR: Record<string, number> = {
  FL: 1, IF: 0.98, VVS1: 0.95, VVS2: 0.92, VS1: 0.88, VS2: 0.83, SI1: 0.77, SI2: 0.7, I1: 0.55,
};
const CUT_FACTOR: Record<string, number> = {
  Excellent: 1, 'Very Good': 0.95, Good: 0.87,
};

const BASE_PER_CT: Record<DiamondShape, number> = {
  round: 380_000,
  oval: 330_000,
  emerald: 310_000,
  pear: 320_000,
  princess: 330_000,
  cushion: 305_000,
  radiant: 315_000,
  marquise: 300_000,
  heart: 320_000,
};
const LAB_MULTIPLIER = 0.34;

function priceFor(seed: Seed): number {
  const sizePremium = 1 + Math.max(0, seed.carat - 0.5) * 0.05;
  const lab = seed.type === 'lab-grown' ? LAB_MULTIPLIER : 1;
  const raw =
    BASE_PER_CT[seed.shape] *
    lab *
    (COLOR_FACTOR[seed.color] ?? 0.9) *
    (CLARITY_FACTOR[seed.clarity] ?? 0.85) *
    (CUT_FACTOR[seed.cut] ?? 0.95) *
    sizePremium *
    seed.carat;
  return Math.round(raw / 100) * 100;
}

// --- Dimension approximations (placeholder photography metrics) --------------------
function dimensions(shape: DiamondShape, carat: number): { length: number; width: number; depth: number } {
  const base = 6.4 * Math.sqrt(carat);
  const r = (n: number): number => Math.round(n * 100) / 100;
  switch (shape) {
    case 'round':
      return { length: r(base), width: r(base), depth: r(base * 0.6) };
    case 'oval':
      return { length: r(base * 1.42), width: r(base), depth: r(base * 0.6) };
    case 'emerald':
      return { length: r(base * 1.5), width: r(base), depth: r(base * 0.62) };
    case 'pear':
      return { length: r(base * 1.38), width: r(base), depth: r(base * 0.62) };
    case 'princess':
      return { length: r(base * 0.86), width: r(base * 0.86), depth: r(base * 0.86 * 0.63) };
    case 'cushion':
      return { length: r(base * 0.97), width: r(base * 0.97), depth: r(base * 0.97 * 0.62) };
    case 'radiant':
      return { length: r(base * 1.1), width: r(base * 0.95), depth: r(base * 0.95 * 0.62) };
    case 'marquise':
      return { length: r(base * 1.9), width: r(base), depth: r(base * 0.58) };
    case 'heart':
      return { length: r(base * 1.18), width: r(base), depth: r(base * 0.58) };
  }
}

const SHAPE_LABEL: Record<DiamondShape, string> = {
  round: 'Round',
  oval: 'Oval',
  emerald: 'Emerald',
  pear: 'Pear',
  princess: 'Princess',
  cushion: 'Cushion',
  radiant: 'Radiant',
  marquise: 'Marquise',
  heart: 'Heart',
};

function slugFor(seed: Seed): string {
  const caratSlug = seed.carat.toFixed(2).replace('.', '-');
  return `${seed.shape}/${caratSlug}-ct-${seed.color.toLowerCase()}-${seed.clarity.toLowerCase()}`;
}

function buildCatalog(): Diamond[] {
  const baseDate = Date.parse('2026-01-15T00:00:00Z');
  return SEEDS.map((seed, index) => {
    const lab = index % 5 === 0 ? 'IGI' : 'GIA';
    const shape = seed.shape;
    const id = `d${String(index + 1).padStart(3, '0')}`;

    return {
      id,
      sku: `AK-${seed.type === 'natural' ? 'N' : 'L'}-${shape.slice(0, 2).toUpperCase()}-${String(index + 1).padStart(4, '0')}`,
      type: seed.type,
      shape,
      carat: seed.carat,
      color: seed.color,
      clarity: seed.clarity,
      cut: seed.cut,
      polish: seed.polish,
      symmetry: seed.symmetry,
      fluorescence: seed.fluorescence,
      measurements: dimensions(shape, seed.carat),
      certificate: { laboratory: lab, number: `${lab}${2_100_000_000 + index * 137}` },
      pricing: { amount: priceFor(seed), currency: 'INR' },
      inventory: { available: seed.available ?? true, quantity: seed.available === false ? 0 : 1 },
      media: { images: [], videos: [] },
      name: `${SHAPE_LABEL[shape]} Diamond · ${seed.carat} ct · ${seed.color} · ${seed.clarity}`,
      slug: slugFor(seed),
      listedAt: new Date(baseDate + index * 3 * 86_400_000).toISOString(),
    };
  });
}

export const MOCK_DIAMONDS: readonly Diamond[] = buildCatalog();