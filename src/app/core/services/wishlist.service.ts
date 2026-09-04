import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ToastService } from './toast.service';

const STORAGE_KEY = 'ak-wishlist';

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * Guest-first wishlist kept in localStorage, exposed as a reactive signal.
 * The logged-in/account-backed store lands with the Wishlist page (Phase 5);
 * the public surface is already final.
 */
@Injectable({ providedIn: 'root' })
export class WishlistService {
  readonly ids = signal<string[]>(readStorage());
  readonly count = computed(() => this.ids().length);

  private readonly toast = inject(ToastService);

  isWishlisted(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string, label?: string): void {
    if (this.isWishlisted(id)) {
      this.remove(id, label);
    } else {
      this.add(id, label);
    }
  }

  add(id: string, label?: string): void {
    this.ids.update(list => (list.includes(id) ? list : [...list, id]));
    this.persist();
    this.toast.success(label ? `${label} was added to your wishlist.` : 'Added to your wishlist.');
  }

  remove(id: string, label?: string): void {
    this.ids.update(list => list.filter(x => x !== id));
    this.persist();
    this.toast.info(label ? `${label} was removed from your wishlist.` : 'Removed from your wishlist.');
  }

  clear(): void {
    this.ids.set([]);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
    } catch {
      // Storage unavailable (private mode) — state stays in memory.
    }
  }

  constructor() {
    // Persist on every change; reading `ids()` inside effect() tracks it.
    effect(() => {
      this.ids();
      this.persist();
    });
  }
}