import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomepageContentService } from '../../../core/services/homepage-content.service';
import { RecommendationService } from '../../../core/services/recommendation.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import {
  BudgetTier,
  RecommendationCriteria,
  RecommendationOccasion,
  RecommendationPriority,
  RecommendationSummary,
} from '../../../core/models/recommendation.model';
import { DiamondShapeName, ShapeGlyph } from '../../../shared/ui/shape-glyph/shape-glyph';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { UiBadge } from '../../../shared/ui/badge/ui-badge';

interface OccasionOption {
  readonly value: RecommendationOccasion;
  readonly label: string;
  readonly note: string;
}

interface BudgetOption {
  readonly value: BudgetTier;
  readonly label: string;
}

interface PriorityOption {
  readonly value: RecommendationPriority;
  readonly label: string;
  readonly note: string;
}

const OCCASIONS: readonly OccasionOption[] = [
  { value: 'engagement', label: 'Engagement', note: 'The question, asked once' },
  { value: 'wedding', label: 'Wedding', note: 'For the day, and after' },
  { value: 'anniversary', label: 'Anniversary', note: 'Marking the years' },
  { value: 'gift', label: 'Gift', note: 'For someone unrepeatable' },
  { value: 'self-purchase', label: 'Self Purchase', note: 'Because you can' },
];

const BUDGETS: readonly BudgetOption[] = [
  { value: 'under-1l', label: 'Under ₹1,00,000' },
  { value: '1-2l', label: '₹1,00,000 – ₹2,00,000' },
  { value: '2-5l', label: '₹2,00,000 – ₹5,00,000' },
  { value: '5l-plus', label: 'Above ₹5,00,000' },
];

const PRIORITIES: readonly PriorityOption[] = [
  { value: 'size', label: 'Maximum Size', note: 'The largest look within budget' },
  { value: 'sparkle', label: 'Maximum Sparkle', note: 'Cut first — the most life' },
  { value: 'value', label: 'Best Value', note: 'Quality and price in balance' },
  { value: 'quality', label: 'Highest Quality', note: 'Top colour and clarity grades' },
];

/**
 * Guided discovery (product spec §14): occasion → shape → budget →
 * priority, ending in "Your Best Matches". The beginner path to the same
 * catalogue the expert filters serve.
 */
@Component({
  selector: 'ak-find-your-diamond',
  imports: [RouterLink, UiButton, UiBadge, ShapeGlyph],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './find-your-diamond.html',
  styleUrl: './find-your-diamond.scss',
})
export class FindYourDiamond {
  private readonly content = inject(HomepageContentService);
  private readonly recommendation = inject(RecommendationService);
  private readonly analytics = inject(AnalyticsService);

  protected readonly occasions = OCCASIONS;
  protected readonly budgets = BUDGETS;
  protected readonly priorities = PRIORITIES;
  protected readonly shapes = computed(() => this.content.homepage().shapes);

  /** Steps 1–4 are questions; step 5 is the result. */
  protected readonly step = signal<1 | 2 | 3 | 4 | 5>(1);
  protected readonly occasion = signal<RecommendationOccasion | null>(null);
  protected readonly shapeSelected = signal<DiamondShapeName | null>(null);
  protected readonly budget = signal<BudgetTier | null>(null);
  protected readonly priority = signal<RecommendationPriority | null>(null);
  protected readonly summary = signal<RecommendationSummary | null>(null);

  protected readonly canContinue = computed(() => {
    switch (this.step()) {
      case 1:
        return this.occasion() !== null;
      case 2:
        return this.shapeSelected() !== null;
      case 3:
        return this.budget() !== null;
      case 4:
        return this.priority() !== null;
      default:
        return false;
    }
  });

  protected readonly filterParams = computed<Record<string, string | number | undefined>>(() => {
    const filters = this.summary()?.filters;
    if (!filters) {
      return {};
    }
    return {
      shape: filters.shape,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort: filters.sort,
    };
  });

  protected readonly occasionLabel = computed(
    () => OCCASIONS.find(option => option.value === this.occasion())?.label ?? '',
  );

  protected readonly shapeLabel = computed(
    () => this.shapes().find(shape => shape.name === this.shapeSelected())?.label ?? '',
  );

  protected readonly budgetLabel = computed(
    () => BUDGETS.find(option => option.value === this.budget())?.label ?? '',
  );

  protected readonly priorityLabel = computed(
    () => PRIORITIES.find(option => option.value === this.priority())?.label ?? '',
  );

  protected continue(event: Event): void {
    event.preventDefault();
    if (!this.canContinue()) {
      return;
    }
    if (this.step() < 4) {
      this.step.update(step => (step === 5 ? step : ((step + 1) as 2 | 3 | 4)));
      return;
    }
    this.complete();
  }

  protected back(): void {
    this.step.update(step => (step > 1 ? ((step - 1) as 1 | 2 | 3 | 4) : step));
  }

  protected refine(): void {
    this.occasion.set(null);
    this.shapeSelected.set(null);
    this.budget.set(null);
    this.priority.set(null);
    this.summary.set(null);
    this.step.set(1);
  }

  private complete(): void {
    const criteria: RecommendationCriteria = {
      occasion: this.occasion()!,
      shape: this.shapeSelected()!,
      budget: this.budget()!,
      priority: this.priority()!,
    };
    this.summary.set(this.recommendation.buildSummary(criteria));
    this.step.set(5);
    this.analytics.track('diamond_search', { ...criteria, source: 'find-your-diamond' });
  }
}
