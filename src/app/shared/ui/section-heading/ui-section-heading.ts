import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Editorial section header: eyebrow + serif title + supporting copy,
 * with the section's calls-to-action projected below.
 */
@Component({
  selector: 'ak-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    @if (eyebrow()) {
      <p class="ak-eyebrow">{{ eyebrow() }}</p>
    }
    <h2 class="ak-section-heading__title">{{ title() }}</h2>
    @if (description()) {
      <p class="ak-section-heading__description">{{ description() }}</p>
    }
    <div class="ak-section-heading__actions">
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 42rem;
    }

    .ak-eyebrow {
      margin-bottom: var(--space-sm);
    }

    .ak-section-heading__title {
      font-size: var(--text-title-1);
    }

    .ak-section-heading__description {
      margin-top: var(--space-sm);
      font-size: var(--text-body-lg);
      line-height: var(--leading-normal);
      color: var(--color-text-secondary);
    }

    .ak-section-heading__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-top: var(--space-lg);
    }

    .ak-section-heading__actions:empty {
      display: none;
    }

    :host(.ak-section-heading--center) {
      margin-inline: auto;
      text-align: center;
    }

    :host(.ak-section-heading--center) .ak-section-heading__actions {
      justify-content: center;
    }
  `,
})
export class UiSectionHeading {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
  readonly align = input<'start' | 'center'>('start');

  protected readonly hostClasses = computed(() =>
    `ak-section-heading${this.align() === 'center' ? ' ak-section-heading--center' : ''}`,
  );
}
