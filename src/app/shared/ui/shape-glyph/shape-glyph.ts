import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The nine canonical diamond cuts presented across the experience. */
export type DiamondShapeName =
  | 'round'
  | 'oval'
  | 'emerald'
  | 'pear'
  | 'princess'
  | 'cushion'
  | 'radiant'
  | 'marquise'
  | 'heart';

/**
 * Original top-view line drawings of each cut — 48×48 grid, 2px stroke.
 * Placeholder treatments for the shape system until brand photography is
 * available; crisp at every size, themable via currentColor.
 */
const SHAPE_PATHS: Record<DiamondShapeName, readonly string[]> = {
  round: ['M6 24a18 18 0 1 0 36 0a18 18 0 1 0-36 0'],
  oval: ['M11 24a13 18 0 1 0 26 0a13 18 0 1 0-26 0'],
  emerald: [
    'M15 7h18l8 8v18l-8 8H15l-8-8V15l8-8Z',
    'M17 13h14l4 4v14l-4 4H17l-4-4V17l4-4Z',
    'M20 19h8l2 2v6l-2 2h-8l-2-2v-6l2-2Z',
  ],
  pear: ['M24 6C30 13 37 20 37 28A13 13 0 1 1 11 28C11 20 18 13 24 6Z'],
  princess: ['M9 9h30v30H9Z', 'M24 9l15 15-15 15L9 24 24 9Z'],
  cushion: [
    'M16 8h16c5 0 8 3 8 8v16c0 5-3 8-8 8H16c-5 0-8-3-8-8V16c0-5 3-8 8-8Z',
    'M17.5 13.5h13c2.8 0 4 1.2 4 4v13c0 2.8-1.2 4-4 4h-13c-2.8 0-4-1.2-4-4v-13c0-2.8 1.2-4 4-4Z',
  ],
  radiant: [
    'M15 9h18l8 6v18l-8 6H15l-8-6V15l8-6Z',
    'M18 16h12l5 4v8l-5 4H18l-5-4v-8l5-4Z',
  ],
  marquise: ['M24 7C30 12 38 18 38 24C38 30 30 36 24 41C18 36 10 30 10 24C10 18 18 12 24 7Z'],
  heart: [
    'M24 41C17 35 7 28 7 19C7 12.9 11.9 8 18 8C20.4 8 22.6 8.8 24 10.3C25.4 8.8 27.6 8 30 8C36.1 8 41 12.9 41 19C41 28 31 35 24 41Z',
  ],
};

@Component({
  selector: 'ak-shape-glyph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      [attr.width]="size()"
      [attr.height]="size()"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
      flex-shrink: 0;
    }

    svg {
      display: block;
    }
  `,
})
export class ShapeGlyph {
  readonly shape = input.required<DiamondShapeName>();
  readonly size = input<number>(48);

  protected readonly paths = (): readonly string[] => SHAPE_PATHS[this.shape()];
}
