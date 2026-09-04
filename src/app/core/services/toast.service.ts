import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

const DEFAULT_DURATION_MS = 3800;
const MAX_VISIBLE = 3;

/**
 * Signal-based toast queue. Components call show/success/error and the
 * <ak-toaster> shell component renders them — no duplicated toast UI.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private seq = 0;
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  readonly toasts = signal<readonly Toast[]>([]);

  show(message: string, type: ToastType = 'info', duration = DEFAULT_DURATION_MS): number {
    const id = ++this.seq;
    this.toasts.update(list => [...list, { id, type, message, duration }].slice(-MAX_VISIBLE));
    this.timers.set(id, setTimeout(() => this.dismiss(id), duration));
    return id;
  }

  success(message: string, duration?: number): number {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): number {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration?: number): number {
    return this.show(message, 'info', duration);
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts.update(list => list.filter(toast => toast.id !== id));
  }
}
