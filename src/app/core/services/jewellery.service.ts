import { Injectable, computed, signal } from '@angular/core';
import { JewelleryProduct, JewelleryCategory } from '../models/jewellery.model';
import { JEWELLERY_PRODUCTS, JEWELLERY_CATEGORIES } from '../data/mock-jewellery';

@Injectable({ providedIn: 'root' })
export class JewelleryService {
  private readonly products = signal<JewelleryProduct[]>(JEWELLERY_PRODUCTS);
  readonly categories = computed(() => JEWELLERY_CATEGORIES);

  allProducts = computed(() => this.products());
  byCategory(slug: string): JewelleryProduct[] {
    return this.products().filter(p => p.category === slug);
  }
  getBySlug(slug: string): JewelleryProduct | undefined {
    return this.products().find(p => p.slug === slug);
  }
  categoryName(slug: string): string {
    return JEWELLERY_CATEGORIES.find(c => c.slug === slug)?.name ?? slug;
  }
}
