import { Injectable, signal } from '@angular/core';
import { NAVIGATION_DATA } from '../config/navigation.data';
import { NavigationConfig } from '../models/navigation.model';

/**
 * Navigation content source. Today: local config in the CMS contract shape.
 * Tomorrow: an HTTP/CMS call — components keep reading the same signal.
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly config = signal<NavigationConfig>(NAVIGATION_DATA);

  readonly navigation = this.config.asReadonly();
}
