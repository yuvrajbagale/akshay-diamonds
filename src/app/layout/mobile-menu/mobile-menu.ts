import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { AnalyticsService } from '../../core/services/analytics.service';
import { NavigationService } from '../../core/services/navigation.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { Icon } from '../../shared/ui/icon/icon';
import { UiDrawer } from '../../shared/ui/drawer/ui-drawer';
import { UiButton } from '../../shared/ui/button/ui-button';

/**
 * Mobile primary navigation drawer with accordion sections, utility links
 * and the consultation conversion path. Opened by header + bottom nav.
 */
@Component({
  selector: 'ak-mobile-menu',
  imports: [RouterLink, UiDrawer, UiButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss',
})
export class MobileMenu {
  protected readonly ui = inject(UiStateService);
  protected readonly navigation = inject(NavigationService);
  protected readonly brand = inject(BRAND_CONFIG);
  private readonly analytics = inject(AnalyticsService);

  protected readonly openSectionId = signal<string | null>(null);

  protected toggleSection(id: string): void {
    this.openSectionId.update(current => (current === id ? null : id));
  }

  protected close(): void {
    this.ui.menuOpen.set(false);
  }
}
