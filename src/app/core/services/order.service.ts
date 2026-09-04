import { Injectable, computed, signal } from '@angular/core';
import { Order } from '../models/order.model';

/**
 * Order service — manages placed orders (mock repository).
 * Replace the internals with a real API call when backend is ready;
 * the public surface (placeOrder, orders, getById) does not change.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _orders = signal<Order[]>([]);
  private _seq = 0;

  readonly orders = computed(() => [...this._orders()].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

  getById(id: string): Order | undefined {
    return this._orders().find(o => o.id === id);
  }

  placeOrder(order: Omit<Order, 'id' | 'status' | 'createdAt' | 'estimatedDelivery'>): Order {
    this._seq++;
    const now = new Date();
    const delivery = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const created: Order = {
      ...order,
      id: 'AD' + now.getFullYear() + String(this._seq).padStart(5, '0'),
      status: 'confirmed',
      createdAt: now.toISOString(),
      estimatedDelivery: delivery.toISOString(),
    };
    this._orders.update(list => [created, ...list]);
    return created;
  }
}
