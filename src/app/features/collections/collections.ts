import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SeoService } from "../../core/services/seo.service";
import { UiBreadcrumb } from "../../shared/ui/breadcrumb/ui-breadcrumb";
import { UiSectionHeading } from "../../shared/ui/section-heading/ui-section-heading";
import { HeroImage, HeroImageVariant } from "../../shared/ui/hero-image/hero-image";
import { Icon } from "../../shared/ui/icon/icon";

@Component({
  selector: "ak-collections",
  imports: [RouterLink, UiBreadcrumb, UiSectionHeading, HeroImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./collections.html",
  styleUrl: "./collections.scss",
})
export class Collections {
  private readonly seo = inject(SeoService);

  protected readonly collections = [
    { slug: "eternity", name: "The Eternity Collection", story: "Diamonds selected for their enduring brilliance.", icon: "gem" as const, tone: "dark" as const },
    { slug: "classic", name: "The Classic Collection", story: "Timeless designs that transcend trends.", icon: "sparkles" as const, tone: "light" as const },
    { slug: "heritage", name: "The Heritage Collection", story: "Indian elegance, thoughtfully interpreted.", icon: "sparkles" as const, tone: "dark" as const },
    { slug: "modern", name: "The Modern Collection", story: "Contemporary forms for the modern woman.", icon: "award" as const, tone: "light" as const },
    { slug: "bridal", name: "The Bridal Collection", story: "Everything for your most cherished moments.", icon: "ring" as const, tone: "dark" as const },
    { slug: "men", name: "The Gentlemen's Collection", story: "Refined pieces for him.", icon: "gem" as const, tone: "light" as const },
    { slug: "engagement", name: "The Engagement Collection", story: "For the question you will never forget asking.", icon: "heart" as const, tone: "dark" as const },
  ];

  constructor() {
    this.seo.setPageMeta({ title: "Collections", description: "Explore our curated diamond collections — Eternity, Classic, Heritage, Modern, Bridal and Engagement.", path: "/collections" });
  }

  protected get breadcrumbs() {
    return [{ label: "Home", path: "/" }, { label: "Collections" }];
  }

  protected heroVariant(tone: string): HeroImageVariant {
    return tone === 'dark' ? 'hero' : 'collection';
  }
}
