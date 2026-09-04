import type { IconName } from '../../shared/ui/icon/icon';

/** A single link inside a navigation column. */
export interface NavLink {
  readonly label: string;
  readonly route: string;
  readonly description?: string;
}

/** A titled column of links inside a mega-menu panel. */
export interface NavColumn {
  readonly title: string;
  readonly links: readonly NavLink[];
}

/** Editorial feature card shown alongside mega-menu columns. */
export interface NavPanelFeature {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly route: string;
  readonly icon: IconName;
}

/** Panel content behind a top-level navigation item (CMS-driven later). */
export interface NavPanel {
  readonly columns: readonly NavColumn[];
  readonly feature?: NavPanelFeature;
}

export interface NavItem {
  /** Stable id — used for aria-controls and open-state tracking. */
  readonly id: string;
  readonly label: string;
  /** Simple items navigate directly; items with a panel open a mega menu. */
  readonly route?: string;
  readonly panel?: NavPanel;
}

export interface NavigationConfig {
  readonly items: readonly NavItem[];
}
