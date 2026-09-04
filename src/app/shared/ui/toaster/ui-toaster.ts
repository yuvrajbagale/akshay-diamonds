import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastType } from '../../../core/models/toast.model';
import { ToastService } from '../../../core/services/toast.service';
import { Icon, IconName } from '../icon/icon';
import { UiIconButton } from '../icon-button/ui-icon-button';

const TYPE_ICON: Record<ToastType, IconName> = {
  info: 'info',
  success: 'check',
  error: 'info',
};

/**
 * App-wide toast outlet — render once in the shell. Feedback is raised
 * through ToastService; no component renders its own toasts.
 */
@Component({
  selector: 'ak-toaster',
  imports: [Icon, UiIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ak-toaster" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="ak-toast" [class]="'ak-toast ak-toast--' + toast.type" role="status">
          <ak-icon [name]="TYPE_ICON[toast.type]" size="sm" class="ak-toast__icon" />
          <p class="ak-toast__message">{{ toast.message }}</p>
          <button
            akIconButton
            type="button"
            icon="close"
            size="sm"
            label="Dismiss notification"
            (click)="toastService.dismiss(toast.id)"
          ></button>
        </div>
      }
    </div>
  `,
  styles: `
    .ak-toaster {
      position: fixed;
      bottom: calc(var(--bottom-nav-height) + var(--space-sm));
      left: var(--space-sm);
      right: var(--space-sm);
      z-index: var(--z-toast);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2xs);
      pointer-events: none;
    }

    @media (min-width: 640px) {
      .ak-toaster {
        bottom: var(--space-md);
        left: auto;
        align-items: flex-end;
      }
    }

    .ak-toast {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
      width: 100%;
      max-width: 24rem;
      padding: var(--space-2xs) var(--space-2xs) var(--space-2xs) var(--space-xs);
      border-radius: var(--radius-sm);
      background: var(--color-text-primary);
      color: var(--color-bg);
      box-shadow: var(--shadow-md);
      animation: ak-slide-up var(--dur-base) var(--ease-lux) both;
      pointer-events: auto;
    }

    .ak-toast__message {
      flex: 1;
      font-size: var(--text-body-sm);
      line-height: var(--leading-snug);
    }

    .ak-toast__icon {
      color: var(--color-accent);
    }

    .ak-toast--success .ak-toast__icon {
      color: var(--color-accent);
    }

    .ak-toast--error .ak-toast__icon {
      color: var(--color-error);
    }

    @media (max-width: 639.98px) {
      .ak-toast {
        padding: var(--space-2xs) var(--space-2xs) var(--space-2xs) var(--space-xs);
      }
    }
  `,
})
export class UiToaster {
  protected readonly TYPE_ICON = TYPE_ICON;
  protected readonly toastService = inject(ToastService);
}
