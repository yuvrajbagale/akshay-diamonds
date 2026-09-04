import { Injectable, signal } from '@angular/core';

/**
 * Global UI state for overlays. Kept separate from business state on
 * purpose: overlay state is presentation-only and signal-native.
 */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  /** Mobile navigation drawer. */
  readonly menuOpen = signal(false);
  /** Global search overlay. */
  readonly searchOpen = signal(false);

  closeOverlays(): void {
    this.menuOpen.set(false);
    this.searchOpen.set(false);
  }
}
