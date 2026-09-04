export type ToastType = 'info' | 'success' | 'error';

export interface Toast {
  readonly id: number;
  readonly type: ToastType;
  readonly message: string;
  readonly duration: number;
}
