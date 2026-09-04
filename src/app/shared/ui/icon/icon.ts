import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconDef {
  readonly paths: readonly string[];
  /** Filled icons render with fill=currentColor and no stroke. */
  readonly filled?: boolean;
}

/**
 * Curated stroke icon set — 24×24 grid, 1.5px stroke, round caps.
 * Hand-tuned and dependency-free: no icon library ships to the client.
 */
const ICONS = {
  search: {
    paths: ['M4.5 11a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0', 'm15.8 15.8 4.7 4.7'],
  },
  close: {
    paths: ['M6 6l12 12', 'M18 6 6 18'],
  },
  menu: {
    paths: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  },
  'chevron-down': { paths: ['m6 9 6 6 6-6'] },
  'chevron-up': { paths: ['m6 15 6-6 6 6'] },
  'chevron-left': { paths: ['m15 6-6 6 6 6'] },
  'chevron-right': { paths: ['m9 6 6 6-6 6'] },
  'arrow-right': { paths: ['M4 12h15', 'm13 6 6 6-6 6'] },
  'arrow-left': { paths: ['M20 12H5', 'm11 6-6 6 6 6'] },
  'arrow-up-right': { paths: ['M7 17 17 7', 'M8.5 7H17v8.5'] },
  heart: {
    paths: [
      'M12 20.4C10.4 19.4 4 15 4 9.9 4 7.2 6 5.1 8.5 5.1c1.4 0 2.7.7 3.5 1.8.8-1.1 2.1-1.8 3.5-1.8C18 5.1 20 7.2 20 9.9c0 5.1-6.4 9.5-8 10.5Z',
    ],
  },
  'heart-filled': {
    paths: [
      'M12 20.4C10.4 19.4 4 15 4 9.9 4 7.2 6 5.1 8.5 5.1c1.4 0 2.7.7 3.5 1.8.8-1.1 2.1-1.8 3.5-1.8C18 5.1 20 7.2 20 9.9c0 5.1-6.4 9.5-8 10.5Z',
    ],
    filled: true,
  },
  bag: {
    paths: [
      'M6 2.5 3 6.5V20a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 20V6.5l-3-4Z',
      'M3 6.5h18',
      'M16 10.5a4 4 0 0 1-8 0',
    ],
  },
  user: {
    paths: ['M8 8a4 4 0 1 0 8 0 4 4 0 1 0-8 0', 'M4.5 20.5c1.2-3.3 4-5 7.5-5s6.3 1.7 7.5 5'],
  },
  gem: {
    paths: ['M6 3h12l4 6-10 13L2 9l4-6Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  },
  sparkles: {
    paths: [
      'M12 3.5 13.8 8.7 19 10.5l-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8L12 3.5Z',
      'M18.5 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z',
    ],
  },
  'shield-check': {
    paths: ['M12 3 19.5 6v6.2c0 4.5-3.2 7.6-7.5 9.3-4.3-1.7-7.5-4.8-7.5-9.3V6L12 3Z', 'm8.7 11.7 2.4 2.4 4.4-4.8'],
  },
  truck: {
    paths: [
      'M2.5 7h11.5v9.5H2.5Z',
      'M14 10.5h3.6l2.9 3.1v2.9H14v-6Z',
      'M4.8 18.5a1.7 1.7 0 1 0 3.4 0 1.7 1.7 0 1 0-3.4 0',
      'M15.3 18.5a1.7 1.7 0 1 0 3.4 0 1.7 1.7 0 1 0-3.4 0',
    ],
  },
  award: {
    paths: ['M7 9a5 5 0 1 0 10 0 5 5 0 1 0-10 0', 'm8.8 13.2-1.3 7.3 4.5-2.6 4.5 2.6-1.3-7.3'],
  },
  phone: {
    paths: [
      'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z',
    ],
  },
  message: { paths: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'] },
  video: {
    paths: ['M4 6h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z', 'm17 10.5 4.5-3v9l-4.5-3'],
  },
  calendar: {
    paths: [
      'M8 2.5V6',
      'M16 2.5V6',
      'M3.5 9.5h17',
      'M5.5 4.5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z',
    ],
  },
  check: { paths: ['m5 12.5 4.5 4.5L19 7.5'] },
  plus: { paths: ['M12 5v14', 'M5 12h14'] },
  minus: { paths: ['M5 12h14'] },
  compare: { paths: ['m8 3-4.5 4.5L8 12', 'M3.5 7.5h16', 'm16 21 4.5-4.5L16 12', 'M20.5 16.5h-16'] },
  star: {
    paths: ['m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.9L12 3.5Z'],
  },
  'star-filled': {
    paths: ['m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.9L12 3.5Z'],
    filled: true,
  },
  mail: {
    paths: [
      'M3.5 7 12 13l8.5-6',
      'M5 5.5h14A1.5 1.5 0 0 1 20.5 7v10a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17V7A1.5 1.5 0 0 1 5 5.5Z',
    ],
  },
  'map-pin': {
    paths: ['M12 21.5S19 15.6 19 10a7 7 0 1 0-14 0c0 5.6 7 11.5 7 11.5Z', 'M9.5 10a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0'],
  },
  returns: { paths: ['M3 12a9 9 0 1 0 9-9 9.7 9.7 0 0 0-6.7 2.7L3 8', 'M3 3v5h5'] },
  lock: {
    paths: ['M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z', 'M8 11V7a4 4 0 0 1 8 0v4'],
  },
  instagram: {
    paths: [
      'M5 2.5h14A2.5 2.5 0 0 1 21.5 5v14a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 19V5A2.5 2.5 0 0 1 5 2.5Z',
      'M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0',
      'M17.2 6.8h.01',
    ],
  },
  facebook: {
    paths: ['M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z'],
  },
  youtube: {
    paths: [
      'M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0 2 2 0 0 1 1.4 1.4 24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0 2 2 0 0 1-1.4-1.4Z',
      'm10 15 5-3-5-3Z',
    ],
  },
  send: { paths: ['m22 2-11 11', 'M22 2 15 22l-4-9-9-4Z'] },
  gift: {
    paths: [
      'M4 8h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z',
      'M12 8v13',
      'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7',
      'M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5',
    ],
  },
  sliders: {
    paths: ['M3 5.5h8', 'M15 5.5h6', 'M11 3.5v4', 'M3 12h4', 'M11 12h10', 'M7 10v4', 'M3 18.5h10', 'M17 18.5h4', 'M13 16.5v4'],
  },
  ring: {
    paths: ['M5.5 15.5a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0', 'm9.5 5 2.5-2.5L14.5 5 12 7.5 9.5 5Z'],
  },
  home: { paths: ['m3.5 11 8.5-7 8.5 7', 'M6 9.5V20h12V9.5'] },
  info: { paths: ['M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0', 'M12 11v5', 'M12 8h.01'] },
  clock: { paths: ['M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0', 'M12 7v5l3.5 2'] },
  package: { paths: ['M3.5 8 12 3l8.5 5v8L12 21l-8.5-5V8Z', 'm3.5 8 8.5 5 8.5-5', 'M12 13v8'] },
  'credit-card': {
    paths: [
      'M4 5.5h16A1.5 1.5 0 0 1 21.5 7v10a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7A1.5 1.5 0 0 1 4 5.5Z',
      'M2.5 9.5h19',
    ],
  },
  external: { paths: ['M14 4h6v6', 'M20 4 11 13', 'M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5'] },
  loader: { paths: ['M21 12a9 9 0 1 1-9-9'] },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof ICONS;

const ICON_PX: Record<IconSize, number> = { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 };

@Component({
  selector: 'ak-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      [attr.width]="px()"
      [attr.height]="px()"
      [attr.fill]="filled() ? 'currentColor' : 'none'"
      [attr.stroke]="filled() ? 'none' : 'currentColor'"
      stroke-width="1.5"
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
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<IconSize>('md');

  protected readonly paths = computed(() => (ICONS[this.name()] as IconDef).paths);
  protected readonly filled = computed(() => (ICONS[this.name()] as IconDef).filled === true);
  protected readonly px = computed(() => ICON_PX[this.size()]);
}
