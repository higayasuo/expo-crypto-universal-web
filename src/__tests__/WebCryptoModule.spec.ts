import { describe, it, expect, vi } from 'vitest';
import { WebCryptoModule } from '../WebCryptoModule';

describe('WebCryptoModule', () => {
  const crypto = new WebCryptoModule();

  describe('getRandomValues', () => {
    it('should fill array with random values', () => {
      const array = new Uint8Array(32);
      const result = crypto.getRandomValues(array);
      expect(result).toBe(array); // Should return the same array
      expect(result).not.toEqual(new Uint8Array(32)); // Should not be all zeros
    });
  });

  describe('sha256Async', () => {
    it('should compute SHA-256 hash', async () => {
      const data = new Uint8Array([1, 2, 3]);
      const result = await crypto.sha256Async(data);
      expect(result).toBeInstanceOf(Uint8Array);
      expect(result.length).toBe(32); // SHA-256 produces 32 bytes
    });
  });

  describe('sha384Async', () => {
    it('should compute SHA-384 hash', async () => {
      const data = new Uint8Array([1, 2, 3]);
      const result = await crypto.sha384Async(data);
      expect(result).toBeInstanceOf(Uint8Array);
      expect(result.length).toBe(48); // SHA-384 produces 48 bytes
    });
  });

  describe('sha512Async', () => {
    it('should compute SHA-512 hash', async () => {
      const data = new Uint8Array([1, 2, 3]);
      const result = await crypto.sha512Async(data);
      expect(result).toBeInstanceOf(Uint8Array);
      expect(result.length).toBe(64); // SHA-512 produces 64 bytes
    });
  });
});
