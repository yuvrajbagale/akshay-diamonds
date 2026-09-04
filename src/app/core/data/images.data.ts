/**
 * Curated Unsplash image URLs for diamonds, jewellery and editorial use.
 * All images are free under the Unsplash License.
 * URLs use the ?w= parameter for responsive sizing.
 */

const U = 'https://images.unsplash.com';

/** Diamond shape images — close-up shots matched to each shape. */
export const DIAMOND_IMAGES: Record<string, string> = {
  round:    `${U}/photo-1694868035548-94536187af3f?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  oval:     `${U}/photo-1724937798320-d0c4fac1787d?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  emerald:  `${U}/photo-1611591437281-460bfbe1220a?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  pear:     `${U}/photo-1605100804763-247f67b3557e?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  princess: `${U}/photo-1515562141589-67f0d569b610?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  cushion:  `${U}/photo-1573408301185-9146fe634ad0?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  radiant:  `${U}/photo-1586878341523-7c8e5c5a4767?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  marquise: `${U}/photo-1602751584552-8ba73aad10e1?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  heart:    `${U}/photo-1515562141589-67f0d569b610?fm=jpg&q=80&w=800&auto=format&fit=crop`,
};

/** Jewellery category images. */
export const JEWELLERY_IMAGES: Record<string, string> = {
  'engagement-rings': `${U}/photo-1605100804763-247f67b3557e?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  'wedding-bands':     `${U}/photo-1515562141589-67f0d569b610?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  'earrings':          `${U}/photo-1535632066927-ab7c9ab60908?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  'necklaces':         `${U}/photo-1599643478518-a784e5dc4c8f?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  'pendants':          `${U}/photo-1611591437281-460bfbe1220a?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  'bracelets':         `${U}/photo-1573408301185-9146fe634ad0?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  'bangles':           `${U}/photo-1602751584552-8ba73aad10e1?fm=jpg&q=80&w=800&auto=format&fit=crop`,
};

/** Hero / editorial images for collections and page heroes. */
export const HERO_IMAGES: Record<string, string> = {
  hero:       `${U}/photo-1694868035548-94536187af3f?fm=jpg&q=80&w=1400&auto=format&fit=crop`,
  editorial:  `${U}/photo-1611591437281-460bfbe1220a?fm=jpg&q=80&w=1400&auto=format&fit=crop`,
  collection: `${U}/photo-1605100804763-247f67b3557e?fm=jpg&q=80&w=1400&auto=format&fit=crop`,
  lifestyle:  `${U}/photo-1515562141589-67f0d569b610?fm=jpg&q=80&w=1400&auto=format&fit=crop`,
};

/** Ring setting images for Build Your Ring page. */
export const RING_SETTING_IMAGES: Record<string, string> = {
  solitaire:  `${U}/photo-1605100804763-247f67b3557e?fm=jpg&q=80&w=600&auto=format&fit=crop`,
  halo:       `${U}/photo-1694868035548-94536187af3f?fm=jpg&q=80&w=600&auto=format&fit=crop`,
  pave:       `${U}/photo-1724937798320-d0c4fac1787d?fm=jpg&q=80&w=600&auto=format&fit=crop`,
  'three-stone': `${U}/photo-1611591437281-460bfbe1220a?fm=jpg&q=80&w=600&auto=format&fit=crop`,
  cathedral:  `${U}/photo-1515562141589-67f0d569b610?fm=jpg&q=80&w=600&auto=format&fit=crop`,
};

/** Get a ring setting image by setting ID, or a fallback. */
export function getRingSettingImage(settingId: string): string {
  const key = Object.keys(RING_SETTING_IMAGES).find(k => settingId.toLowerCase().includes(k));
  return (key && RING_SETTING_IMAGES[key]) || RING_SETTING_IMAGES['solitaire'];
}

/** Fallback image for unknown shapes/categories. */
export const FALLBACK_IMAGE = `${U}/photo-1694868035548-94536187af3f?fm=jpg&q=80&w=800&auto=format&fit=crop`;
