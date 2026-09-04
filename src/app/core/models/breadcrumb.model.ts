export interface BreadcrumbItem {
  readonly label: string;
  /** Optional route — the current page (last crumb) has none. */
  readonly route?: string;
}
