import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UiButton } from './ui-button';

@Component({
  imports: [UiButton],
  template: `<button akButton variant="accent" size="sm" block>Make It Yours</button>`,
})
class ButtonHost {}

@Component({
  imports: [UiButton],
  template: `<a akButton href="/diamonds" disabled>Explore Diamonds</a>`,
})
class DisabledAnchorHost {}

describe('UiButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHost, DisabledAnchorHost],
    }).compileComponents();
  });

  it('renders variant, size and block classes while projecting content', async () => {
    const fixture = TestBed.createComponent(ButtonHost);
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('ak-button');
    expect(button.className).toContain('ak-button--accent');
    expect(button.className).toContain('ak-button--sm');
    expect(button.className).toContain('ak-button--block');
    expect(button.textContent?.trim()).toBe('Make It Yours');
  });

  it('marks a disabled anchor for assistive technology', async () => {
    const fixture = TestBed.createComponent(DisabledAnchorHost);
    await fixture.whenStable();

    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('aria-disabled')).toBe('true');
    expect(anchor.getAttribute('tabindex')).toBe('-1');
    expect(anchor.className).toContain('ak-button--disabled');
  });
});
