import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SeoService } from "../../core/services/seo.service";
import { UiBreadcrumb } from "../../shared/ui/breadcrumb/ui-breadcrumb";
import { UiSectionHeading } from "../../shared/ui/section-heading/ui-section-heading";

@Component({
  selector: "ak-about",
  imports: [UiBreadcrumb, UiSectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./about.html",
  styleUrl: "./about.scss",
})
export class About {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({ title: "Our Story", description: "Our commitment to exceptional diamonds, transparent pricing and expert guidance.", path: "/our-story" });
  }

  protected get breadcrumbs() {
    return [{ label: "Home", path: "/" }, { label: "Our Story" }];
  }
}
