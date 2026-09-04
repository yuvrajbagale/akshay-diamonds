import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { BRAND_CONFIG } from '../config/brand.config';

const DEFAULT_TITLE = 'Akshay Diamonds — Certified Natural & Lab-Grown Diamonds';
const TITLE_SUFFIX = ' — Akshay Diamonds';

/**
 * Route-aware titles: each route declares its page `title`; the brand
 * suffix is appended here so route definitions stay clean.
 */
@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    this.title.setTitle(pageTitle ? `${pageTitle}${TITLE_SUFFIX}` : DEFAULT_TITLE);
  }
}

/**
 * Per-page metadata: description, canonical URL and social tags.
 * Product/breadcrumb JSON-LD helpers are consumed in later phases.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly brand = inject(BRAND_CONFIG);
  private readonly document = inject(DOCUMENT);

  setPageMeta(options: { title?: string; description?: string; path?: string; image?: string }): void {
    const { title, description, path = '/', image } = options;

    if (title) {
      this.title.setTitle(`${title}${TITLE_SUFFIX}`);
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    const imageUrl = image ?? `${this.brand.siteUrl}assets/og-image.jpg`;
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setCanonical(`${this.brand.siteUrl}${path.replace(/^\//, '')}`);
  }

  setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Injects (or replaces) a JSON-LD structured-data block with the given id. */
  setJsonLd(id: string, data: unknown): void {
    this.document.getElementById(id)?.remove();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
