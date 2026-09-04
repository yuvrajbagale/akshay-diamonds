import { Injectable } from '@angular/core';

/**
 * Mock repository for newsletter subscriptions. When the backend is
 * available, only this body changes to a real API call — the signature
 * and every consumer stay the same.
 */
@Injectable({ providedIn: 'root' })
export class NewsletterService {
  subscribe(email: string): Promise<void> {
    // Simulated latency; no persistent storage is claimed.
    return new Promise(resolve => setTimeout(resolve, 600));
  }
}
