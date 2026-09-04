import { Injectable } from '@angular/core';

export type CertificateVerificationStatus = 'idle' | 'verifying' | 'confirmed' | 'mismatch' | 'unavailable';

export interface CertificateVerificationResult {
  readonly status: CertificateVerificationStatus;
  readonly message: string;
}

/**
 * Certificate verification — architecture-ready for external lab APIs
 * (GIA Report Check, IGI, HRD). NOTE: the mock never fabricates a
 * "verified" status; it reports that live verification connects at launch
 * so customers are never misled (spec §21/§51).
 *
 * To enable live verification, swap this implementation for a call to the
 * laboratory API — the component and status types stay unchanged.
 */
@Injectable({ providedIn: 'root' })
export class CertificateService {
  verify(laboratory: string, certificateNumber: string): Promise<CertificateVerificationResult> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 'unavailable',
          message:
            `Live verification for ${laboratory} ${certificateNumber} connects to the laboratory when launched. ` +
            'Meanwhile, our experts can walk you through this certificate — and the number can be confirmed with the issuing laboratory directly.',
        });
      }, 1200);
    });
  }
}