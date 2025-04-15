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
  getRandomValues(array: Uint8Array): Uint8Array {
    return crypto.getRandomValues(array);
  }

  /**
   * Computes the SHA-256 hash of the provided data.
   * @param data - The data to hash.
   * @returns A Promise that resolves to a Uint8Array containing the hash.
   */
  async sha256Async(data: Uint8Array): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      crypto.subtle.digest('SHA-256', data).then(
        (buffer) => {
          return resolve(new Uint8Array(buffer));
        },
        (error) => reject(error),
      );
    });
  }

  /**
   * Computes the SHA-384 hash of the provided data.
   * @param data - The data to hash.
   * @returns A Promise that resolves to a Uint8Array containing the hash.
   */
  async sha384Async(data: Uint8Array): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      crypto.subtle.digest('SHA-384', data).then(
        (buffer) => {
          return resolve(new Uint8Array(buffer));
        },
        (error) => reject(error),
      );
    });
  }

  /**
   * Computes the SHA-512 hash of the provided data.
   * @param data - The data to hash.
   * @returns A Promise that resolves to a Uint8Array containing the hash.
   */
  async sha512Async(data: Uint8Array): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      crypto.subtle.digest('SHA-512', data).then(
        (buffer) => resolve(new Uint8Array(buffer)),
        (error) => reject(error),
      );
    });
  }
}

// Export a singleton instance
export const webCryptoModule = new WebCryptoModule();
