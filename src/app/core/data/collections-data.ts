export interface CollectionDetail {
  slug: string;
  name: string;
  story: string;
  description: string;
  features: string[];
  icon: 'gem' | 'sparkles' | 'ring' | 'heart' | 'award';
  tone: 'dark' | 'light';
}

export const COLLECTIONS: CollectionDetail[] = [
  {
    slug: 'eternity',
    name: 'The Eternity Collection',
    story: 'Diamonds selected for their enduring brilliance.',
    description: 'The Eternity Collection celebrates timelessness. Each diamond is hand-selected for exceptional brilliance and fire — stones that will look as stunning decades from now as they do today. Designed for those who believe some things should last forever.',
    features: [
      'Exceptional brilliance and fire',
      'Hand-selected for light performance',
      'Available in natural and lab-grown',
      'GIA and IGI certified',
    ],
    icon: 'gem',
    tone: 'dark',
  },
  {
    slug: 'classic',
    name: 'The Classic Collection',
    story: 'Timeless designs that transcend trends.',
    description: 'Our Classic Collection draws from decades of fine jewellery tradition. Clean lines, balanced proportions, and enduring silhouettes that never feel dated. These are the pieces you reach for every day — and pass down someday.',
    features: [
      'Timeless silhouettes',
      'Everyday elegance',
      'Premium craftsmanship',
      'Versatile designs',
    ],
    icon: 'sparkles',
    tone: 'light',
  },
  {
    slug: 'heritage',
    name: 'The Heritage Collection',
    story: 'Indian elegance, thoughtfully interpreted.',
    description: 'The Heritage Collection honours India\'s rich jewellery tradition through a modern lens. Intricate detailing meets contemporary design — pieces that feel rooted in culture yet perfectly at home in 2026.',
    features: [
      'Indian-inspired design',
      'Modern interpretation',
      'Intricate detailing',
      'Cultural resonance',
    ],
    icon: 'sparkles',
    tone: 'dark',
  },
  {
    slug: 'modern',
    name: 'The Modern Collection',
    story: 'Contemporary forms for the modern woman.',
    description: 'Bold geometry, unexpected settings, and clean minimalism define the Modern Collection. For the woman who knows her style and wants her jewellery to reflect it — distinctive, confident, and unmistakably current.',
    features: [
      'Contemporary geometry',
      'Minimal aesthetics',
      'Bold design language',
      'Statement pieces',
    ],
    icon: 'award',
    tone: 'light',
  },
  {
    slug: 'bridal',
    name: 'The Bridal Collection',
    story: 'Everything for your most cherished moments.',
    description: 'From engagement rings to wedding bands, the Bridal Collection covers every milestone in your journey together. Matched sets, complementary designs, and pieces designed to be worn side by side for a lifetime.',
    features: [
      'Engagement and wedding sets',
      'Complementary designs',
      'Matched pairs available',
      'Lifetime milestone pieces',
    ],
    icon: 'ring',
    tone: 'dark',
  },
  {
    slug: 'men',
    name: 'The Gentlemen\'s Collection',
    story: 'Refined pieces for him.',
    description: 'The Gentlemen\'s Collection brings the same standard of diamond quality to men\'s jewellery. Subtle, sophisticated, and built to last — from signet rings to wedding bands and everyday accessories.',
    features: [
      'Men\'s engagement and wedding bands',
      'Subtle sophistication',
      'Durable craftsmanship',
      'Everyday wearability',
    ],
    icon: 'gem',
    tone: 'light',
  },
  {
    slug: 'engagement',
    name: 'The Engagement Collection',
    story: 'For the question you will never forget asking.',
    description: 'The Engagement Collection brings together solitaires, halos, three-stone rings and pavé settings — each designed to capture the emotion of the moment. Choose from natural or lab-grown diamonds, set in white gold, yellow gold, rose gold or platinum.',
    features: [
      'Solitaire, halo and three-stone settings',
      'Natural and lab-grown diamonds',
      'GIA and IGI certified',
      'White gold, yellow gold, rose gold and platinum',
      'Customisable ring sizes',
    ],
    icon: 'heart',
    tone: 'dark',
  },
];
