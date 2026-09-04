import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SeoService } from "../../../core/services/seo.service";
import { UiBreadcrumb } from "../../../shared/ui/breadcrumb/ui-breadcrumb";
import { UiSectionHeading } from "../../../shared/ui/section-heading/ui-section-heading";

@Component({
  selector: "ak-learn-landing",
  imports: [RouterLink, UiBreadcrumb, UiSectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./learn-landing.html",
  styleUrl: "./learn-landing.scss",
})
export class LearnLanding {
  private readonly seo = inject(SeoService);

  protected readonly topics = [
    { path: "/learn/four-cs", title: "The 4Cs", desc: "Carat, colour, clarity and cut — the four characteristics that define a diamond." },
    { path: "/learn/natural-vs-lab-grown", title: "Natural vs Lab-Grown", desc: "An honest comparison of origin, characteristics and considerations." },
    { path: "/learn/certification", title: "Certification", desc: "What a diamond certificate tells you and how to verify your stone." },
    { path: "/learn/care", title: "Diamond Care", desc: "How to keep your diamond sparkling for a lifetime." },
  ];

  constructor() {
    this.seo.setPageMeta({ title: "Learn", description: "Understand diamonds — from the 4Cs to certification, natural vs lab-grown and beyond.", path: "/learn" });
  }

  protected get breadcrumbs() {
    return [{ label: "Home", path: "/" }, { label: "Learn" }];
  }
}
