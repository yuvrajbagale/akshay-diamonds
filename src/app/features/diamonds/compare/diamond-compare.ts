import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DiamondService } from '../../../core/services/diamond.service';
import { CompareService } from '../../../core/services/compare.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CartService } from '../../../core/services/cart.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';
import { UiBreadcrumb } from '../../../shared/ui/breadcrumb/ui-breadcrumb';
import { UiEmptyState } from '../../../shared/ui/empty-state/ui-empty-state';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiPrice } from '../../../shared/ui/price/ui-price';
import { ShapeGlyph } from '../../../shared/ui/shape-glyph/shape-glyph';
import { RouterLink } from '@angular/router';
import { Diamond } from '../../../core/models/diamond.model';
import { DiamondShapeName } from '../../../shared/ui/shape-glyph/shape-glyph';

const LABELS: { readonly [key: string]: string } & Record<string, string> = {
  type: 'Type', shape: 'Shape', carat: 'Carat', color: 'Color',
  clarity: 'Clarity', cut: 'Cut', polish: 'Polish', symmetry: 'Symmetry',
  fluorescence: 'Fluorescence', laboratory: 'Certification',
  measurements: 'Measurements', price: 'Price',
};

@Component({
  selector: 'ak-diamond-compare',
  imports: [UiBreadcrumb, UiEmptyState, UiButton, UiPrice, ShapeGlyph, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diamond-compare.html',
  styleUrl: './diamond-compare.scss',
})
export class DiamondCompare {
  private readonly diamonds = inject(DiamondService);
  protected readonly compare = inject(CompareService);
  private readonly wishlist = inject(WishlistService);
  protected readonly cart = inject(CartService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);
  protected readonly selected = computed<Diamond[]>(() =>
    this.compare.ids().map(id => this.diamonds.getById(id)).filter((d): d is Diamond => !!d));
  protected readonly rows = computed(() => {
    const items = this.selected();
    if (!items.length) return [] as { key: string; label: string; values: readonly string[]; highlight: boolean }[];
    const vals = (g: (d: Diamond) => string) => items.map(g);
    const nums = (g: (d: Diamond) => number) => items.map(g);
    return [
      { key:'type', label:LABELS['type'], values:vals(d => d.type === 'lab-grown' ? 'Lab-Grown' : 'Natural'), highlight:false },
      { key:'shape', label:LABELS['shape'], values:vals(d => d.shape), highlight:false },
      { key:'carat', label:LABELS['carat'], values:vals(d => d.carat + ' ct'), highlight:this.varies(nums(d => d.carat)) },
      { key:'color', label:LABELS['color'], values:vals(d => d.color), highlight:false },
      { key:'clarity', label:LABELS['clarity'], values:vals(d => d.clarity), highlight:false },
      { key:'cut', label:LABELS['cut'], values:vals(d => d.cut), highlight:false },
      { key:'polish', label:LABELS['polish'], values:vals(d => d.polish), highlight:false },
      { key:'symmetry', label:LABELS['symmetry'], values:vals(d => d.symmetry), highlight:false },
      { key:'fluorescence', label:LABELS['fluorescence'], values:vals(d => d.fluorescence), highlight:false },
      { key:'laboratory', label:LABELS['laboratory'], values:vals(d => d.certificate.laboratory), highlight:false },
      { key:'measurements', label:LABELS['measurements'], values:vals(d => d.measurements.length + ' x ' + d.measurements.width + ' x ' + d.measurements.depth + ' mm'), highlight:false },
      { key:'price', label:LABELS['price'], values:[] as string[], highlight:this.varies(nums(d => d.pricing.amount)) },
    ] as { key: string; label: string; values: readonly string[]; highlight: boolean }[];
  });
  protected readonly priceBest = computed(() => { const p = this.selected().map(d => d.pricing.amount); return p.length ? Math.min(...p) : 0; });
  protected readonly caratBest = computed(() => { const c = this.selected().map(d => d.carat); return c.length ? Math.max(...c) : 0; });
  constructor() { this.seo.setPageMeta({ title:'Compare Diamonds', description:'Compare certified diamonds side by side.', path:'/compare' }); }
  protected shapeOf(d: Diamond): DiamondShapeName { return d.shape as DiamondShapeName; }
  protected isBestPrice(a: number): boolean { return a === this.priceBest(); }
  protected isBestCarat(c: number): boolean { return c === this.caratBest(); }
  protected isBestColor(color: string): boolean {
    const o = ['D','E','F','G','H','I','J','K'];
    const best = this.selected().reduce((acc, d) => { const ai = o.indexOf(acc); const ci = o.indexOf(d.color); return ci !== -1 && (ai === -1 || ci < ai) ? d.color : acc; }, 'K');
    return color === best;
  }
  protected isBestClarity(clarity: string): boolean {
    const o = ['FL','IF','VVS1','VVS2','VS1','VS2','SI1','SI2','I1'];
    const best = this.selected().reduce((acc, d) => { const ai = o.indexOf(acc); const ci = o.indexOf(d.clarity); return ci !== -1 && (ai === -1 || ci < ai) ? d.clarity : acc; }, 'I1');
    return clarity === best;
  }
  protected isBestCut(cut: string): boolean {
    const o = ['Excellent','Very Good','Good','Fair'];
    const best = this.selected().reduce((acc, d) => { const ai = o.indexOf(acc); const ci = o.indexOf(d.cut); return ci !== -1 && (ai === -1 || ci < ai) ? d.cut : acc; }, 'Fair');
    return cut === best;
  }
  protected onRemove(id: string): void { this.compare.remove(id); }
  protected addToCart(d: Diamond): void { this.cart.add(d.id, 1, d.name); this.analytics.track('add_to_cart', { id: d.id }); }
  protected toggleWishlist(d: Diamond): void { this.wishlist.toggle(d.id, d.name); }
  protected valueFor(key: string, d: Diamond): string {
    switch (key) {
      case 'type': return d.type === 'lab-grown' ? 'Lab-Grown' : 'Natural';
      case 'polish': return d.polish;
      case 'symmetry': return d.symmetry;
      case 'fluorescence': return d.fluorescence;
      case 'laboratory': return d.certificate.laboratory;
      default: return d[key as keyof Diamond] as string ?? '';
    }
  }
  private varies(n: readonly number[]): boolean { return new Set(n).size > 1; }
}

