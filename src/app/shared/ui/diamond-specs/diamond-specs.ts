import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Diamond } from '../../../core/models/diamond.model';
import { Icon } from '../icon/icon';

function measurementsLabel(diamond: Diamond): string {
  const m = diamond.measurements;
  return `${m.length} × ${m.width} × ${m.depth} mm`;
}

function perCarat(diamond: Diamond): string {
  const value = Math.round(diamond.pricing.amount / diamond.carat / 100) * 100;
  return `₹${value.toLocaleString('en-IN')} / ct`;
}

/**
 * The diamond specification table (§20) — every important fact visible,
 * never buried behind clicks.
 */
@Component({
  selector: 'ak-diamond-specs',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="specs">
      <div class="specs__grid">
        <div class="specs__row">
          <dt>Shape</dt>
          <dd>{{ diamond().shape }}</dd>
        </div>
        <div class="specs__row">
          <dt>Carat Weight</dt>
          <dd>{{ diamond().carat }} ct</dd>
        </div>
        <div class="specs__row">
          <dt>Colour</dt>
          <dd>{{ diamond().color }}</dd>
        </div>
        <div class="specs__row">
          <dt>Clarity</dt>
          <dd>{{ diamond().clarity }}</dd>
        </div>
        <div class="specs__row">
          <dt>Cut</dt>
          <dd>{{ diamond().cut }}</dd>
        </div>
        <div class="specs__row">
          <dt>Polish</dt>
          <dd>{{ diamond().polish }}</dd>
        </div>
        <div class="specs__row">
          <dt>Symmetry</dt>
          <dd>{{ diamond().symmetry }}</dd>
        </div>
        <div class="specs__row">
          <dt>Fluorescence</dt>
          <dd>{{ diamond().fluorescence }}</dd>
        </div>
        <div class="specs__row">
          <dt>Measurements</dt>
          <dd>{{ measurementsLabel(diamond()) }}</dd>
        </div>
        <div class="specs__row">
          <dt>Certification</dt>
          <dd>
            <span class="specs__lab">
              <ak-icon name="award" size="xs" />
              {{ diamond().certificate.laboratory }} Certified
            </span>
          </dd>
        </div>
        <div class="specs__row">
          <dt>Certificate No.</dt>
          <dd class="specs__mono">{{ diamond().certificate.number }}</dd>
        </div>
        <div class="specs__row">
          <dt>Type</dt>
          <dd>{{ diamond().type === 'lab-grown' ? 'Lab-Grown' : 'Natural' }}</dd>
        </div>
        <div class="specs__row">
          <dt>Availability</dt>
          <dd>
            <span class="specs__status" [class.specs__status--available]="diamond().inventory.available">
              {{ diamond().inventory.available ? 'In Stock' : 'Reserved' }}
            </span>
          </dd>
        </div>
        <div class="specs__row">
          <dt>Ask Price/Delivery</dt>
          <dd>{{ perCarat(diamond()) }}</dd>
        </div>
      </div>
    </div>
  `,
  styles: `
    .specs__grid {
      display: grid;
      grid-template-columns: 1fr;
      border-top: var(--border-hairline);
    }

    .specs__row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--space-md);
      padding: var(--space-xs) 0;
      border-bottom: var(--border-hairline);
    }

    dt {
      font-size: var(--text-caption);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }

    dd {
      margin: 0;
      font-size: var(--text-body-sm);
      font-weight: var(--weight-medium);
      color: var(--color-text-primary);
      text-align: end;
      text-transform: capitalize;
    }

    .specs__mono {
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.04em;
    }

    .specs__lab {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .specs__status {
      color: var(--color-text-tertiary);
    }

    .specs__status--available {
      color: var(--color-success);
    }

    @media (min-width: 768px) {
      .specs__grid {
        grid-template-columns: repeat(2, 1fr);
        column-gap: var(--space-xl);
      }
    }
  `,
})
export class DiamondSpecs {
  readonly diamond = input.required<Diamond>();

  protected readonly measurementsLabel = measurementsLabel;
  protected readonly perCarat = perCarat;
}