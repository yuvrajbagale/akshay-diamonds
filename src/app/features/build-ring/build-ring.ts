import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { CartService } from '../../core/services/cart.service';
import { UiBreadcrumb } from '../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiSectionHeading } from '../../shared/ui/section-heading/ui-section-heading';
import { UiButton } from '../../shared/ui/button/ui-button';
import { UiPrice } from '../../shared/ui/price/ui-price';
import { ShapeGlyph } from '../../shared/ui/shape-glyph/shape-glyph';
import { DiamondShapeName } from '../../shared/ui/shape-glyph/shape-glyph';
import { DiamondService } from '../../core/services/diamond.service';
import { Diamond } from '../../core/models/diamond.model';
import { getRingSettingImage } from '../../core/data/images.data';

type Step = 'setting' | 'diamond' | 'review';

interface Setting { id: string; name: string; metal: string; price: number; }

@Component({
  selector: 'ak-build-ring',
  imports: [UiBreadcrumb, UiSectionHeading, UiButton, UiPrice, ShapeGlyph],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './build-ring.html',
  styleUrl: './build-ring.scss',
})
export class BuildRing {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly diamonds = inject(DiamondService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  protected readonly step = signal<Step>('setting');
  protected readonly selectedSetting = signal<Setting | null>(null);
  protected readonly selectedDiamond = signal<Diamond | null>(null);
  protected readonly ringSize = signal(6);

  protected readonly settings: Setting[] = [
    { id: 'solitaire', name: 'Classic Solitaire', metal: '18K White Gold', price: 42000 },
    { id: 'halo', name: 'Halo', metal: '18K White Gold', price: 58000 },
    { id: 'pave', name: 'Pavé Band', metal: '18K Rose Gold', price: 52000 },
    { id: 'three-stone', name: 'Three Stone', metal: '18K Yellow Gold', price: 68000 },
    { id: 'cathedral', name: 'Cathedral', metal: 'Platinum', price: 75000 },
  ];

  protected readonly suggestedDiamonds = computed(() =>
    this.diamonds.diamonds().filter(d => d.carat >= 0.5 && d.carat <= 1.5 && d.cut === 'Excellent').slice(0, 4));

  protected readonly total = computed(() => (this.selectedSetting()?.price ?? 0) + (this.selectedDiamond()?.pricing.amount ?? 0));

  constructor() {
    this.seo.setPageMeta({ title: 'Build Your Ring', description: 'Choose a setting, select your diamond, and create a one-of-a-kind ring.', path: '/build-your-ring' });
  }

  protected get breadcrumbs() {
    return [{ label: 'Home', path: '/' }, { label: 'Build Your Ring' }];
  }

  protected pickSetting(s: Setting): void { this.selectedSetting.set(s); this.step.set('diamond'); }
  protected pickDiamond(d: Diamond): void { this.selectedDiamond.set(d); this.step.set('review'); }
  protected next(): void { this.step.set('review'); }
  protected back(): void { this.step.set(this.step() === 'review' ? 'diamond' : 'setting'); }
  protected shapeOf(d: Diamond): DiamondShapeName { return d.shape as DiamondShapeName; }
  protected settingImage(s: Setting): string { return getRingSettingImage(s.id); }

  protected addToBag(): void {
    const s = this.selectedSetting();
    const d = this.selectedDiamond();
    if (!s || !d) return;
    this.cart.addRing({
      settingName: s.name,
      settingMetal: s.metal,
      settingPrice: s.price,
      diamondName: d.name,
      diamondCarat: d.carat,
      diamondShape: d.shape,
      diamondColor: d.color,
      diamondClarity: d.clarity,
      ringSize: this.ringSize(),
      total: this.total(),
    });
    this.analytics.track('add_to_cart', { type: 'custom_ring', total: this.total() });
    this.router.navigate(['/cart']);
  }
}
