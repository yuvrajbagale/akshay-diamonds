import { Injectable, signal } from '@angular/core';
import { HOMEPAGE_DATA } from '../config/homepage.data';
import { HomepageContent } from '../models/homepage.model';

/**
 * Homepage editorial content source. Today: local config in the CMS
 * contract shape. Tomorrow: an HTTP/CMS call — the homepage keeps reading
 * the same signal.
 */
@Injectable({ providedIn: 'root' })
export class HomepageContentService {
  private readonly content = signal<HomepageContent>(HOMEPAGE_DATA);

  readonly homepage = this.content.asReadonly();
}
