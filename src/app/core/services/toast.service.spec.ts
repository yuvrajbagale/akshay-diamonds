import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a toast and exposes it as a signal', () => {
    const service = new ToastService();

    service.show('Hello');

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Hello');
    expect(service.toasts()[0].type).toBe('info');
  });

  it('offers typed helpers', () => {
    const service = new ToastService();

    service.success('Saved');
    service.error('Failed');

    expect(service.toasts().map(t => t.type)).toEqual(['success', 'error']);
  });

  it('dismisses on demand', () => {
    const service = new ToastService();
    const id = service.show('Hello');

    service.dismiss(id);

    expect(service.toasts().length).toBe(0);
  });

  it('auto-dismisses after the duration', () => {
    const service = new ToastService();
    service.show('Hello', 'info', 1000);

    vi.advanceTimersByTime(999);
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    expect(service.toasts().length).toBe(0);
  });

  it('keeps only the most recent toasts visible', () => {
    const service = new ToastService();

    for (let i = 1; i <= 5; i++) {
      service.show(`Toast ${i}`);
    }

    expect(service.toasts().length).toBe(3);
    expect(service.toasts()[0].message).toBe('Toast 3');
    expect(service.toasts()[2].message).toBe('Toast 5');
  });
});
