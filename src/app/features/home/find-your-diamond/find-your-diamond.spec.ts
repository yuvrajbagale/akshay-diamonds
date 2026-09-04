import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FindYourDiamond } from './find-your-diamond';

describe('FindYourDiamond', () => {
  let fixture: ComponentFixture<FindYourDiamond>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindYourDiamond],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FindYourDiamond);
    await fixture.whenStable();
  });

  function el(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function choose(name: string): void {
    el().querySelector<HTMLInputElement>(`input[name="${name}"]`)!.click();
  }

  function continueStep(): void {
    el()
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  async function answer(name: string): Promise<void> {
    choose(name);
    await fixture.whenStable();
    continueStep();
    await fixture.whenStable();
  }

  it('starts with the occasion question and a disabled continue button', () => {
    expect(el().textContent).toContain('What are you buying for?');
    expect(el().textContent).toContain('Step 1 of 4');

    const submit = el().querySelector<HTMLButtonElement>('form button[type="submit"]');
    expect(submit?.disabled).toBe(true);
  });

  it('walks through four steps to the suggestions panel', async () => {
    await answer('occasion');
    expect(el().textContent).toContain('Which shape do you love?');
    expect(el().textContent).toContain('Step 2 of 4');

    await answer('shape');
    expect(el().textContent).toContain('What is your budget?');

    await answer('budget');
    expect(el().textContent).toContain('What matters most?');

    await answer('priority');
    expect(el().textContent).toContain('Your Best Matches');
    expect(el().textContent).toContain('Engagement');
    expect(el().textContent).toContain('Round');
  });

  it('links the suggestions to filtered diamond results', async () => {
    await answer('occasion');
    await answer('shape');
    await answer('budget');
    await answer('priority');

    const cta = el().querySelector<HTMLAnchorElement>('a.ak-button--accent');
    expect(cta?.textContent).toContain('View Matching Diamonds');
    expect(cta?.getAttribute('href')).toContain('/diamonds');
    expect(cta?.getAttribute('href')).toContain('shape=round');
    expect(cta?.getAttribute('href')).toContain('maxPrice=100000');
    expect(cta?.getAttribute('href')).toContain('sort=price-desc');
    expect(cta?.getAttribute('href')).not.toContain('minPrice');
  });

  it('returns to the first question when refining', async () => {
    await answer('occasion');
    await answer('shape');
    await answer('budget');
    await answer('priority');

    const refine = el().querySelector<HTMLButtonElement>('.wizard__result .wizard__back')!;
    refine.click();
    await fixture.whenStable();

    expect(el().textContent).toContain('What are you buying for?');
    expect(el().textContent).toContain('Step 1 of 4');
  });
});
