import { AbstractCryptoModule } from 'expo-crypto-universal';

/**
 * A module that provides cryptographic operations using the Web Crypto API.
 * This implementation is compatible with both browser and Node.js environments.
 */
export class WebCryptoModule extends AbstractCryptoModule {
  /**
   * Fills the provided Uint8Array with cryptographically strong random values.
   * @param array - The Uint8Array to fill with random values.
   * @returns The same Uint8Array, filled with random values.
   */
  getRandomValues = (array: Uint8Array): Uint8Array => {
    return crypto.getRandomValues(array);
  };
}

// Export a singleton instance
export const webCryptoModule = new WebCryptoModule();
