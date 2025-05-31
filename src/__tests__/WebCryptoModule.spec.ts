import { describe, it, expect } from 'vitest';
import { WebCryptoModule } from '../WebCryptoModule';

describe('WebCryptoModule', () => {
  const crypto = new WebCryptoModule();
  const { getRandomValues } = crypto;

  describe('getRandomValues', () => {
    it('should fill array with random values', () => {
      const array = new Uint8Array(32);
      const result = getRandomValues(array);
      expect(result).toBe(array); // Should return the same array
      expect(result).not.toEqual(new Uint8Array(32)); // Should not be all zeros
    });
  });
});
