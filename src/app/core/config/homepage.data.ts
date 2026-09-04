import type { HomepageContent } from '../models/homepage.model';

/**
 * Homepage editorial content in the future CMS contract shape. Only this
 * file's source changes when content management arrives.
 */
export const HOMEPAGE_DATA: HomepageContent = {
  shapes: [
    {
      name: 'round',
      label: 'Round',
      description: 'The timeless classic, cut for maximum fire.',
      route: '/diamonds',
      params: { shape: 'round' },
    },
    {
      name: 'oval',
      label: 'Oval',
      description: 'Elegant elongation with a modern silhouette.',
      route: '/diamonds',
      params: { shape: 'oval' },
    },
    {
      name: 'emerald',
      label: 'Emerald',
      description: 'Long, calm steps — the hall-of-mirrors effect.',
      route: '/diamonds',
      params: { shape: 'emerald' },
    },
    {
      name: 'pear',
      label: 'Pear',
      description: 'A teardrop of light, distinctive and graceful.',
      route: '/diamonds',
      params: { shape: 'pear' },
    },
    {
      name: 'princess',
      label: 'Princess',
      description: 'Sharp, contemporary brilliance.',
      route: '/diamonds',
      params: { shape: 'princess' },
    },
    {
      name: 'cushion',
      label: 'Cushion',
      description: 'Soft vintage edges, a romantic glow.',
      route: '/diamonds',
      params: { shape: 'cushion' },
    },
    {
      name: 'radiant',
      label: 'Radiant',
      description: 'Bold facets with extraordinary sparkle.',
      route: '/diamonds',
      params: { shape: 'radiant' },
    },
    {
      name: 'marquise',
      label: 'Marquise',
      description: 'Regal lines that maximise presence.',
      route: '/diamonds',
      params: { shape: 'marquise' },
    },
    {
      name: 'heart',
      label: 'Heart',
      description: 'A symbol, cut in light.',
      route: '/diamonds',
      params: { shape: 'heart' },
    },
  ],
  collections: [
    {
      name: 'The Eternity Collection',
      story:
        'Quiet circles without beginning or end. Diamonds chosen for the years that deserve marking, and the promises that hold.',
      cta: 'Explore the Collection',
      route: '/collections/eternity',
      tone: 'dark',
      ornament: 'gem',
    },
    {
      name: 'The Heritage Collection',
      story:
        'Design languages inherited from India’s courts — geometry, rhythm and restraint — translated into diamond jewellery for today.',
      cta: 'Explore the Collection',
      route: '/collections/heritage',
      tone: 'light',
      ornament: 'sparkles',
    },
    {
      name: 'The Bridal Collection',
      story:
        'For the ceremonies you will never forget — and every morning after. Diamonds for the days that become memories.',
      cta: 'Explore the Collection',
      route: '/collections/bridal',
      tone: 'dark',
      ornament: 'ring',
    },
  ],
  occasions: [
    {
      name: 'Engagement',
      story: 'Ask once, remember always.',
      route: '/collections/engagement',
    },
    {
      name: 'Wedding',
      story: 'For vows, and every day after.',
      route: '/jewellery/wedding-bands',
    },
    {
      name: 'Anniversary',
      story: 'The years, made visible.',
      route: '/collections/eternity',
    },
    {
      name: 'Bridal',
      story: 'Ceremonies, celebrations, beginnings.',
      route: '/collections/bridal',
    },
    {
      name: 'Gifting',
      story: 'For someone unrepeatable.',
      route: '/collections/classic',
    },
  ],
};
