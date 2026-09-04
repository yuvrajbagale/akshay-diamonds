import type { DiamondShapeName } from '../../shared/ui/shape-glyph/shape-glyph';
import type { IconName } from '../../shared/ui/icon/icon';

/** A shop-by-shape entry on the homepage (CMS-driven later). */
export interface ShapeEntry {
  readonly name: DiamondShapeName;
  readonly label: string;
  readonly description: string;
  readonly route: string;
  readonly params?: Readonly<Record<string, string>>;
}

/** A featured editorial collection card on the homepage. */
export interface CollectionFeature {
  readonly name: string;
  readonly story: string;
  readonly cta: string;
  readonly route: string;
  /** Visual tone of the editorial card — both read from token themes. */
  readonly tone: 'dark' | 'light';
  readonly ornament: IconName;
}

/** An Indian buying occasion (engagement, wedding, anniversary…). */
export interface OccasionEntry {
  readonly name: string;
  readonly story: string;
  readonly route: string;
}

export interface HomepageContent {
  readonly shapes: readonly ShapeEntry[];
  readonly collections: readonly CollectionFeature[];
  readonly occasions: readonly OccasionEntry[];
}
