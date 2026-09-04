import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ToastService } from './toast.service';

const STORAGE_KEY = 'ak-compare';
export const MAX_COMPARE = 4;

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
 * Compare tray state (max 4, per product spec §26). The Compare page
 * (Phase 5) renders this set; the public surface is final.
 */
@Injectable({ providedIn: 'root' })
export class CompareService {
  readonly ids = signal<string[]>(readStorage());
  readonly count = computed(() => this.ids().length);
  readonly isFull = computed(() => this.ids().length >= MAX_COMPARE);

  private readonly toast = inject(ToastService);

  isCompared(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string, label?: string): void {
    if (this.isCompared(id)) {
      this.remove(id);
    } else {
      this.add(id, label);
    }
  }

  add(id: string, label?: string): void {
    if (this.isCompared(id)) return;
    if (this.isFull()) {
      this.toast.error(`You can compare up to ${MAX_COMPARE} diamonds at a time.`);
      return;
    }
    this.ids.update(list => (list.includes(id) ? list : [...list, id]));
    this.persist();
    this.toast.success(label ? `${label} added to compare.` : 'Added to compare.');
  }

  remove(id: string): void {
    this.ids.update(list => list.filter(x => x !== id));
    this.persist();
  }

  clear(): void {
    this.ids.set([]);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
    } catch {
      // Storage unavailable — state stays in memory.
    }
  }

  constructor() {
    effect(() => {
      this.ids();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
      } catch {
        // Storage unavailable — state stays in memory.
      }
    });
  }
}