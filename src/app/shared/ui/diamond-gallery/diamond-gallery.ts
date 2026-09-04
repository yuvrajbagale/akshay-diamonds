import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Diamond } from '../../../core/models/diamond.model';
import { DiamondShapeName } from '../shape-glyph/shape-glyph';
import { DiamondImage } from '../diamond-image/diamond-image';
import { UiModal } from '../modal/ui-modal';
import { UiIconButton } from '../icon-button/ui-icon-button';
import { Icon } from '../icon/icon';

type GalleryView = 'top' | 'side' | 'viewer360' | 'video';

interface ViewOption {
  readonly id: GalleryView;
  readonly label: string;
  readonly icon: 'gem' | 'ring' | 'sparkles' | 'video';
}

const VIEWS: readonly ViewOption[] = [
  { id: 'top', label: 'Top', icon: 'gem' },
  { id: 'side', label: 'Side', icon: 'ring' },
  { id: 'viewer360', label: '360°', icon: 'sparkles' },
  { id: 'video', label: 'Video', icon: 'video' },
];

@Component({
  selector: 'ak-diamond-gallery',
  imports: [DiamondImage, UiModal, UiIconButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diamond-gallery.html',
  styleUrl: './diamond-gallery.scss',
})
export class DiamondGallery {
  readonly diamond = input.required<Diamond>();
  readonly name = input('');

  protected readonly views = VIEWS;
  protected readonly view = signal<GalleryView>('top');
  protected readonly zoomOpen = signal(false);

  protected readonly shapeName = computed(() => this.diamond().shape as DiamondShapeName);

  protected select(view: GalleryView): void {
    this.view.set(view);
  }

  protected openZoom(): void {
    this.zoomOpen.set(true);
  }
}