import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { AnalyticsService } from '../../core/services/analytics.service';
import { NavigationService } from '../../core/services/navigation.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { Icon } from '../../shared/ui/icon/icon';
import { UiIconButton } from '../../shared/ui/icon-button/ui-icon-button';
import { BrandLogo } from '../brand-logo/brand-logo';
import { MegaMenu } from '../mega-menu/mega-menu';

/**
 * Sticky site header: announcement bar, logo, primary navigation with
 * hover/keyboard mega menus, and utility actions. On mobile the primary
 * navigation is replaced by the drawer (Menu) and bottom navigation.
 */
@Component({
  selector: 'ak-header',
  imports: [RouterLink, BrandLogo, Icon, UiIconButton, MegaMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly brand = inject(BRAND_CONFIG);
  protected readonly navigation = inject(NavigationService);
  protected readonly ui = inject(UiStateService);
  private readonly analytics = inject(AnalyticsService);

  protected readonly scrolled = signal(false);
  protected readonly openPanelId = signal<string | null>(null);

  private closeDelay?: ReturnType<typeof setTimeout>;

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    const next = window.scrollY > 12;
    if (next !== this.scrolled()) {
      this.scrolled.set(next);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closePanels();
  }

  protected openPanel(id: string): void {
    clearTimeout(this.closeDelay);
    if (this.openPanelId() !== id) {
      this.openPanelId.set(id);
    }
  }

  /** Forgiving close delay so diagonal mouse travel keeps the panel open. */
  protected scheduleClose(): void {
    clearTimeout(this.closeDelay);
    this.closeDelay = setTimeout(() => this.openPanelId.set(null), 160);
  }

  protected togglePanel(id: string): void {
    clearTimeout(this.closeDelay);
    this.openPanelId.update(current => (current === id ? null : id));
  }

  protected closePanels(): void {
    clearTimeout(this.closeDelay);
    this.openPanelId.set(null);
  }

  protected closeEverything(): void {
    this.closePanels();
    this.ui.closeOverlays();
  }

  protected onItemFocusOut(event: FocusEvent): void {
    const item = event.currentTarget as HTMLElement;
    const next = event.relatedTarget as Node | null;
    if (!next || !item.contains(next)) {
      this.openPanelId.set(null);
    }
  }

  protected openSearch(): void {
    this.ui.searchOpen.set(true);
    this.analytics.track('search_opened');
  }

  protected openMenu(): void {
    this.ui.menuOpen.set(true);
    this.analytics.track('menu_opened');
  }
}
