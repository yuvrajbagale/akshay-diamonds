import type { NavigationConfig } from '../models/navigation.model';

/**
 * Navigation content, structured exactly as the future CMS/API contract.
 * Only the source of this data changes when content management arrives —
 * the shape and every consumer stay the same.
 */
export const NAVIGATION_DATA: NavigationConfig = {
  items: [
    {
      id: 'diamonds',
      label: 'Diamonds',
      panel: {
        columns: [
          {
            title: 'By Shape',
            links: [
              { label: 'Round', route: '/diamonds', description: 'The timeless classic' },
              { label: 'Oval', route: '/diamonds', description: 'Elegant elongation' },
              { label: 'Princess', route: '/diamonds', description: 'Modern brilliance' },
              { label: 'Emerald', route: '/diamonds', description: 'Hall-of-mirrors calm' },
              { label: 'Pear', route: '/diamonds', description: 'Distinctive grace' },
              { label: 'Marquise', route: '/diamonds', description: 'Maximum presence' },
              { label: 'Cushion', route: '/diamonds', description: 'Soft vintage edges' },
              { label: 'Radiant', route: '/diamonds', description: 'Bold, brilliant facets' },
              { label: 'Heart', route: '/diamonds', description: 'A symbol of love' },
            ],
          },
          {
            title: 'By Type',
            links: [
              { label: 'Natural Diamonds', route: '/diamonds', description: 'Formed over billions of years' },
              { label: 'Lab-Grown Diamonds', route: '/diamonds', description: 'Real diamonds, grown above ground' },
            ],
          },
          {
            title: 'Explore',
            links: [
              { label: 'Diamond Guide', route: '/learn' },
              { label: 'The 4Cs', route: '/learn/four-cs' },
              { label: 'Certification', route: '/learn/certification' },
              { label: 'Compare Diamonds', route: '/compare' },
            ],
          },
        ],
        feature: {
          eyebrow: 'First diamond?',
          title: 'Begin with the 4Cs',
          description: 'Carat, colour, clarity and cut — understood in minutes, not hours.',
          route: '/learn/four-cs',
          icon: 'sparkles',
        },
      },
    },
    {
      id: 'jewellery',
      label: 'Jewellery',
      panel: {
        columns: [
          {
            title: 'Shop by Category',
            links: [
              { label: 'Engagement Rings', route: '/jewellery/engagement-rings' },
              { label: 'Wedding Bands', route: '/jewellery/wedding-bands' },
              { label: 'Earrings', route: '/jewellery/earrings' },
              { label: 'Necklaces', route: '/jewellery/necklaces' },
              { label: 'Pendants', route: '/jewellery/pendants' },
              { label: 'Bracelets', route: '/jewellery/bracelets' },
              { label: 'Bangles', route: '/jewellery/bangles' },
            ],
          },
          {
            title: 'Shop by Occasion',
            links: [
              { label: 'Engagement', route: '/collections/engagement' },
              { label: 'Wedding', route: '/collections/bridal' },
              { label: 'Anniversary', route: '/collections/eternity' },
              { label: 'Gifting', route: '/collections/classic' },
            ],
          },
        ],
        feature: {
          eyebrow: 'The moment matters',
          title: 'The Engagement Edit',
          description: 'Settings and stones chosen for the question you are about to ask.',
          route: '/collections/engagement',
          icon: 'ring',
        },
      },
    },
    {
      id: 'collections',
      label: 'Collections',
      panel: {
        columns: [
          {
            title: 'The Collections',
            links: [
              { label: 'The Eternity Collection', route: '/collections/eternity', description: 'For anniversaries that deserve marking' },
              { label: 'The Classic Collection', route: '/collections/classic', description: 'Quiet, enduring design' },
              { label: 'The Heritage Collection', route: '/collections/heritage', description: 'Craft inspired by tradition' },
              { label: 'The Modern Collection', route: '/collections/modern', description: 'Clean lines, contemporary' },
              { label: 'The Bridal Collection', route: '/collections/bridal', description: 'For the days you never forget' },
            ],
          },
        ],
        feature: {
          eyebrow: 'Editorial',
          title: 'The Bridal Collection',
          description: 'Diamonds for the ceremonies, the celebrations and everything after.',
          route: '/collections/bridal',
          icon: 'gem',
        },
      },
    },
    { id: 'build-ring', label: 'Build Your Ring', route: '/build-your-ring' },
    {
      id: 'learn',
      label: 'Learn',
      panel: {
        columns: [
          {
            title: 'Understand',
            links: [
              { label: 'The 4Cs', route: '/learn/four-cs' },
              { label: 'Natural vs Lab-Grown', route: '/learn/natural-vs-lab-grown' },
              { label: 'Diamond Guide', route: '/learn' },
            ],
          },
          {
            title: 'Trust & Care',
            links: [
              { label: 'Certification', route: '/learn/certification' },
              { label: 'Diamond Care', route: '/learn/care' },
              { label: 'Our Story', route: '/our-story' },
              { label: 'Speak With an Expert', route: '/consultation' },
            ],
          },
        ],
        feature: {
          eyebrow: 'No bias, no jargon',
          title: 'Natural vs Lab-Grown',
          description: 'Two honest choices, explained clearly — so you decide what matters.',
          route: '/learn/natural-vs-lab-grown',
          icon: 'gem',
        },
      },
    },
    { id: 'story', label: 'Our Story', route: '/our-story' },
  ],
};
