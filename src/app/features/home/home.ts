import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { AnalyticsService } from '../../core/services/analytics.service';
import { HomepageContentService } from '../../core/services/homepage-content.service';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Tilt3DDirective } from '../../shared/directives/tilt-3d.directive';
import { MagneticButtonDirective } from '../../shared/directives/magnetic-button.directive';
import { Icon, IconName } from '../../shared/ui/icon/icon';
import { ShapeGlyph } from '../../shared/ui/shape-glyph/shape-glyph';
import { UiButton } from '../../shared/ui/button/ui-button';
import { UiSectionHeading } from '../../shared/ui/section-heading/ui-section-heading';
import { UiTrustBadge } from '../../shared/ui/trust-badge/ui-trust-badge';
import { HeroImage } from '../../shared/ui/hero-image/hero-image';
import { FindYourDiamond } from './find-your-diamond/find-your-diamond';

interface TrustItem {
  readonly icon: IconName;
  readonly label: string;
  readonly note: string;
}

interface LearnPath {
  readonly icon: IconName;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly route: string;
  readonly cta: string;
}

/**
 * Homepage — cinematic hero, trust strip, shop-by-shape, featured
 * editorial collections, the Find Your Diamond wizard, Indian occasions,
 * education paths and the consultation conversion band. All editorial
 * content comes from HomepageContentService (CMS-ready).
 */
@Component({
  selector: 'ak-home',
  imports: [
    RouterLink,
    UiButton,
    UiSectionHeading,
    UiTrustBadge,
    Icon,
    ShapeGlyph,
    ScrollRevealDirective,
    Tilt3DDirective,
    MagneticButtonDirective,
    FindYourDiamond,
    HeroImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);
  protected readonly brand = inject(BRAND_CONFIG);
  private readonly contentService = inject(HomepageContentService);

  protected readonly content = computed(() => this.contentService.homepage());

  protected readonly trust: readonly TrustItem[] = [
    { icon: 'shield-check', label: 'Certified Diamonds', note: 'Independent reports' },
    { icon: 'lock', label: 'Secure Payments', note: 'UPI · Cards · Net Banking' },
    { icon: 'truck', label: 'Insured Delivery', note: 'Fully insured, to your door' },
    { icon: 'message', label: 'Expert Consultation', note: 'Video, call or in store' },
    { icon: 'returns', label: 'Easy Returns', note: 'Within the return window' },
  ];

  protected readonly learn: readonly LearnPath[] = [
    {
      icon: 'sparkles',
      eyebrow: 'Understand',
      title: 'Learn the 4Cs',
      description:
        'Carat, colour, clarity and cut — what they mean, what they cost, and what actually matters for you.',
      route: '/learn/four-cs',
      cta: 'Begin Learning',
    },
    {
      icon: 'gem',
      eyebrow: 'No bias',
      title: 'Natural vs Lab-Grown',
      description:
        'Two honest choices, explained clearly — origin, rarity, price and resale — so you decide what matters.',
      route: '/learn/natural-vs-lab-grown',
      cta: 'Compare Honestly',
    },
    {
      icon: 'award',
      eyebrow: 'Trust',
      title: 'Certification',
      description:
        'Every diamond we present carries an independent report. Here is how to read one — and verify it.',
      route: '/learn/certification',
      cta: 'Read About Trust',
    },
  ];

  constructor() {
    this.analytics.track('homepage_viewed');

    this.seo.setPageMeta({
      title: 'A Diamond Worth Remembering',
      description:
        'Exceptional natural and lab-grown diamonds — thoughtfully selected, honestly priced and transparently presented, with independent certification.',
      path: '/',
    });
    this.seo.setJsonLd('ak-website-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.brand.name,
      url: this.brand.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.brand.siteUrl}diamonds?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
  }

  protected onBookConsultation(): void {
    this.analytics.track('consultation_started', { source: 'homepage' });
  }

  protected onWhatsApp(): void {
    this.analytics.track('whatsapp_clicked', { source: 'homepage' });
  }

  protected onPhone(): void {
    this.analytics.track('phone_clicked', { source: 'homepage' });
  }
}
