import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { FocusTrapDirective } from '../../shared/directives/focus-trap.directive';
import { Icon } from '../../shared/ui/icon/icon';
import { UiIconButton } from '../../shared/ui/icon-button/ui-icon-button';

interface TrendingSearch {
  readonly label: string;
  readonly route: string[];
  readonly params?: Record<string, string>;
}

/**
 * Global search overlay. Phase 1: intent capture + trending shortcuts.
 * The semantic / natural-language search service plugs into `submit()`
 * later without changing this shell.
 */
@Component({
  selector: 'ak-search-overlay',
  imports: [RouterLink, FocusTrapDirective, Icon, UiIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-overlay.html',
  styleUrl: './search-overlay.scss',
})
export class SearchOverlay {
  protected readonly ui = inject(UiStateService);
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);

  protected readonly query = signal('');

  protected readonly trending: readonly TrendingSearch[] = [
    { label: 'Oval diamonds', route: ['/diamonds'], params: { shape: 'oval' } },
    { label: 'Natural solitaires', route: ['/diamonds'], params: { type: 'natural' } },
    { label: 'Under ₹2 lakh', route: ['/diamonds'], params: { maxPrice: '200000' } },
    { label: 'The 4Cs', route: ['/learn', 'four-cs'] },
    { label: 'Natural vs lab-grown', route: ['/learn', 'natural-vs-lab-grown'] },
  ];

  constructor() {
    effect(() => {
      document.body.classList.toggle('ak-scroll-locked', this.ui.searchOpen());
    });
  }

  protected close(): void {
    this.ui.searchOpen.set(false);
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const query = this.query().trim();
    if (!query) {
      return;
    }
    this.analytics.track('diamond_search', { query });
    this.router.navigate(['/diamonds'], { queryParams: { q: query } });
    this.close();
  }
}
