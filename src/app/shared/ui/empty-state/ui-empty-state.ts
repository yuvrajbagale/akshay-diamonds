import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

/**
 * Premium empty state — a moment of brand voice, never "No data found".
 * Action buttons are projected inside <ak-empty-state>…</ak-empty-state>.
 */
@Component({
  selector: 'ak-empty-state',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ak-empty">
      <span class="ak-empty__icon" aria-hidden="true">
        <ak-icon [name]="icon()" size="lg" />
      </span>
      <h2 class="ak-empty__title">{{ title() }}</h2>
      @if (description()) {
        <p class="ak-empty__description">{{ description() }}</p>
      }
      <div class="ak-empty__actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    .ak-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--space-2xl) var(--space-md);
    }

    .ak-empty__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: var(--radius-pill);
      border: var(--border-hairline);
      background: var(--color-surface-muted);
      color: var(--color-accent-strong);
      margin-bottom: var(--space-md);
    }

    .ak-empty__title {
      font-size: var(--text-title-2);
      max-width: 24ch;
    }

    .ak-empty__description {
      margin-top: var(--space-xs);
      max-width: 44ch;
      color: var(--color-text-secondary);
    }

    .ak-empty__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-sm);
      margin-top: var(--space-lg);
    }

    .ak-empty__actions:empty {
      display: none;
    }
  `,
})
export class UiEmptyState {
  readonly icon = input.required<IconName>();
  readonly title = input.required<string>();
  readonly description = input('');
}
