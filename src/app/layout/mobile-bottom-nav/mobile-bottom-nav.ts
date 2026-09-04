import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiStateService } from '../../core/services/ui-state.service';
import { Icon } from '../../shared/ui/icon/icon';

/**
 * Dedicated mobile navigation — not a shrunken desktop header.
 * Fixed to the bottom; hidden at desktop widths.
 */
@Component({
  selector: 'ak-mobile-bottom-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-bottom-nav.html',
  styleUrl: './mobile-bottom-nav.scss',
})
export class MobileBottomNav {
  protected readonly ui = inject(UiStateService);
}
