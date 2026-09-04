import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

/**
 * Accessible dual-handle range slider built on two native <input type=range>
 * elements — full keyboard support, focus styling and reduced-motion friendly.
 */
@Component({
  selector: 'ak-range-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rslider">
      <div class="rslider__track" aria-hidden="true">
        <div class="rslider__fill" [style.left.%]="lowPct()" [style.width.%]="spanPct()"></div>
      </div>
      <input
        class="rslider__input"
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="low()"
        [attr.aria-label]="lowLabel()"
        (input)="onLow($event)"
      />
      <input
        class="rslider__input"
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="high()"
        [attr.aria-label]="highLabel()"
        (input)="onHigh($event)"
      />
    </div>
  `,
  styles: `
    .rslider {
      --thumb-size: 1.05rem;
      position: relative;
      height: 1.25rem;
      margin-inline: calc(var(--thumb-size) / 2);
    }

    .rslider__track {
      position: absolute;
      inset-inline: 0;
      top: 50%;
      height: 2px;
      transform: translateY(-50%);
      background: var(--color-border-strong);
      border-radius: var(--radius-pill);
    }

    .rslider__fill {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--color-accent-strong);
      border-radius: var(--radius-pill);
      transition: none;
    }

    .rslider__input {
      position: absolute;
      inset-inline: 0;
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      height: 1.25rem;
      background: transparent;
      margin: 0;
      pointer-events: none;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--thumb-size);
        height: var(--thumb-size);
        border-radius: 50%;
        background: var(--color-surface);
        border: 2px solid var(--color-accent-strong);
        box-shadow: var(--shadow-sm);
        cursor: grab;
        pointer-events: auto;
        transition: transform var(--dur-fast) var(--ease-lux);
      }

      &::-webkit-slider-thumb:hover {
        transform: scale(1.12);
      }

      &::-moz-range-thumb {
        width: var(--thumb-size);
        height: var(--thumb-size);
        border-radius: 50%;
        background: var(--color-surface);
        border: 2px solid var(--color-accent-strong);
        box-shadow: var(--shadow-sm);
        cursor: grab;
      }

      &:focus-visible::-webkit-slider-thumb {
        outline: 2px solid var(--color-focus);
        outline-offset: 2px;
      }
    }
  `,
})
export class UiRangeSlider {
  readonly min = input.required<number>();
  readonly max = input.required<number>();
  readonly step = input(1);
  readonly low = input.required<number>();
  readonly high = input.required<number>();
  readonly lowLabel = input('Minimum');
  readonly highLabel = input('Maximum');

  readonly lowChange = output<number>();
  readonly highChange = output<number>();

  protected readonly lowPct = computed(() => this.percent(this.low()));
  protected readonly spanPct = computed(() => this.percent(this.high()) - this.percent(this.low()));

  protected onLow(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    const next = Math.min(value, this.high() - this.step());
    if (next !== this.low()) {
      this.lowChange.emit(Math.max(this.min(), next));
    }
  }

  protected onHigh(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    const next = Math.max(value, this.low() + this.step());
    if (next !== this.high()) {
      this.highChange.emit(Math.min(this.max(), next));
    }
  }

  private percent(value: number): number {
    const range = this.max() - this.min();
    return range <= 0 ? 0 : ((value - this.min()) / range) * 100;
  }
}