import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompareService } from '../../../core/services/compare.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Diamond } from '../../../core/models/diamond.model';
import { Tilt3DDirective } from '../../../shared/directives/tilt-3d.directive';
import { UiIconButton } from '../icon-button/ui-icon-button';
import { Icon } from '../icon/icon';
import { DiamondShapeName } from '../shape-glyph/shape-glyph';
import { UiPrice } from '../price/ui-price';
import { UiBadge } from '../badge/ui-badge';
import { DiamondImage } from '../diamond-image/diamond-image';

@Component({
  selector: 'ak-diamond-card',
  imports: [RouterLink, UiIconButton, Icon, UiPrice, UiBadge, DiamondImage, Tilt3DDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diamond-card.html',
  styleUrl: './diamond-card.scss',
})
export class DiamondCard {
  readonly diamond = input.required<Diamond>();

  private readonly wishlist = inject(WishlistService);
  private readonly compare = inject(CompareService);

  protected readonly shapeName = computed(() => this.diamond().shape as DiamondShapeName);
  protected readonly wishlisted = computed(() => this.wishlist.isWishlisted(this.diamond().id));
  protected readonly compared = computed(() => this.compare.isCompared(this.diamond().id));
  protected readonly detailRoute = computed(() => ['/diamonds', this.diamond().slug]);

  protected toggleWishlist(): void {
    this.wishlist.toggle(this.diamond().id, this.diamond().name);
  }

  protected toggleCompare(): void {
    this.compare.toggle(this.diamond().id, this.diamond().name);
  }
}