import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../core/models/navigation.model';
import { Icon } from '../../shared/ui/icon/icon';

/** Panel content for a top-level navigation item. Rendered by the Header. */
@Component({
  selector: 'ak-mega-menu',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.scss',
})
export class MegaMenu {
  readonly item = input.required<NavItem>();
  readonly navigated = output<void>();
}
