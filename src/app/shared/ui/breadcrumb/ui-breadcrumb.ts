import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from '../../../core/models/breadcrumb.model';
import { Icon } from '../icon/icon';

/**
 * Accessible breadcrumb trail. JSON-LD breadcrumb structured data is added
 * by the SeoService in the catalog phases.
 */
@Component({
  selector: 'ak-breadcrumb',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="ak-breadcrumb__list">
        @for (item of items(); track $index; let last = $last) {
          <li class="ak-breadcrumb__item">
            @if (!last && item.route) {
              <a class="ak-breadcrumb__link" [routerLink]="item.route">{{ item.label }}</a>
            } @else {
              <span class="ak-breadcrumb__current" [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span>
            }
            @if (!last) {
              <ak-icon class="ak-breadcrumb__separator" name="chevron-right" size="xs" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    .ak-breadcrumb__list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-3xs);
    }

    .ak-breadcrumb__item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3xs);
      font-size: var(--text-caption);
      color: var(--color-text-secondary);
    }

    .ak-breadcrumb__link {
      color: var(--color-text-secondary);
      transition: color var(--dur-fast) var(--ease-lux);
    }

    .ak-breadcrumb__link:hover {
      color: var(--color-text-primary);
    }

    .ak-breadcrumb__current {
      color: var(--color-text-primary);
      font-weight: var(--weight-medium);
    }

    .ak-breadcrumb__separator {
      color: var(--color-text-tertiary);
    }
  `,
})
export class UiBreadcrumb {
  readonly items = input.required<readonly BreadcrumbItem[]>();
}
