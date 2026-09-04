import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { ToastService } from './toast.service';
import { DiamondService } from './diamond.service';
import { Diamond } from '../models/diamond.model';

const STORAGE_KEY = 'ak-cart';

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

/**
 * Guest-first bag stored in localStorage. The Cart page (Phase 5) renders
 * this state; the surface is final and swapping to an API cart later only
 * changes persistence.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(readStorage());
  readonly count = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));

  private readonly toast = inject(ToastService);
  private readonly diamonds = inject(DiamondService);

  constructor() {
    effect(() => {
      this.items();
      this.persist();
    });
  }

  quantityOf(diamondId: string): number {
    return this.items().find(item => item.diamondId === diamondId)?.quantity ?? 0;
  }

  isInCart(diamondId: string): boolean {
    return this.quantityOf(diamondId) > 0;
  }

  add(diamondId: string, quantity = 1, label?: string): void {
    this.items.update(items => {
      const existing = items.find(item => item.diamondId === diamondId);
      if (existing) {
        return items.map(item =>
          item.diamondId === diamondId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...items, { diamondId, quantity, addedAt: new Date().toISOString(), type: 'diamond' }];
    });
    this.persist();
    this.toast.success(`${label ?? 'This diamond'} is in your bag.`);
  }

  addRing(ringConfig: CartItem['ringConfig'], quantity = 1): void {
    if (!ringConfig) return;
    const id = `ring-${ringConfig.settingName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    this.items.update(items => [
      ...items,
      { diamondId: id, quantity, addedAt: new Date().toISOString(), type: 'ring', ringConfig },
    ]);
    this.persist();
    this.toast.success('Your custom ring is in your bag.');
  }

  setQuantity(diamondId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(diamondId);
      return;
    }
    this.items.update(items =>
      items.map(item => (item.diamondId === diamondId ? { ...item, quantity } : item)),
    );
    this.persist();
  }

  remove(diamondId: string): void {
    this.items.update(items => items.filter(item => item.diamondId !== diamondId));
    this.persist();
    this.toast.info('Removed from your bag.');
  }

  clear(): void {
    this.items.set([]);
    this.persist();
  }

  diamond(diamondId: string): Diamond | undefined {
    return this.diamonds.getById(diamondId);
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    } catch {
      // Storage unavailable — state stays in memory.
    }
  }
}