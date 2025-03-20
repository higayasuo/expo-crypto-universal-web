import { describe, it, expect } from 'vitest';
import { WebCryptoModule } from '../WebCryptoModule';
import crypto from 'crypto';

/**
 * Helper function to encrypt using Node.js crypto module with AES-CBC and HMAC.
 * This implementation matches the WebCryptoModule's encryption format:
 * [IV (16 bytes)][HMAC key (32 bytes)][encrypted data][HMAC (32 bytes)]
 */
async function nodeAesEncrypt(
  data: Uint8Array,
  key: Uint8Array,
): Promise<Uint8Array> {
  const iv = crypto.randomBytes(16);
  const hmacKey = crypto.randomBytes(32);

  // Encrypt data using AES-256-CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  // Combine IV, HMAC key, and encrypted data
  const encryptedData = Buffer.concat([iv, hmacKey, encrypted]);

  // Generate HMAC (full 32 bytes)
  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(encryptedData);
  const fullHmac = hmac.digest();

  return Buffer.concat([encryptedData, fullHmac]);
}

/**
 * Helper function to decrypt using Node.js crypto module with AES-CBC and HMAC.
 * Expects the same format as WebCryptoModule's encryption:
 * [IV (16 bytes)][HMAC key (32 bytes)][encrypted data][HMAC (32 bytes)]
 */
async function nodeAesDecrypt(
  data: Uint8Array,
  key: Uint8Array,
): Promise<Uint8Array> {
  const iv = data.slice(0, 16);
  const hmacKey = data.slice(16, 48);
  const encrypted = data.slice(48, -32);
  const receivedHmac = data.slice(-32);

  // Verify HMAC
  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(data.slice(0, -32));
  const calculatedHmac = hmac.digest();

  if (!calculatedHmac.equals(receivedHmac)) {
    throw new Error('Invalid HMAC');
  }

  // Decrypt data using AES-256-CBC
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}

describe('WebCryptoModule', () => {
  const webCrypto = new WebCryptoModule();

  describe('AES-CBC encryption/decryption with HMAC', () => {
    it('should produce compatible results with Node.js crypto implementation', async () => {
      const key = crypto.randomBytes(32);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      // Test cross-implementation encryption/decryption
      const encryptedWeb = await webCrypto.aesEncryptAsync(testData, key);
      const decryptedNode = await nodeAesDecrypt(encryptedWeb, key);
      expect(Array.from(decryptedNode)).toEqual(Array.from(testData));

      const encryptedNode = await nodeAesEncrypt(testData, key);
      const decryptedWeb = await webCrypto.aesDecryptAsync(encryptedNode, key);
      expect(Array.from(decryptedWeb)).toEqual(Array.from(testData));
      expect(Array.from(decryptedNode)).toEqual(Array.from(testData));

      // Verify both implementations can decrypt their own output
      const decryptedWeb2 = await webCrypto.aesDecryptAsync(encryptedWeb, key);
      expect(Array.from(decryptedWeb2)).toEqual(Array.from(testData));

      const decryptedNode2 = await nodeAesDecrypt(encryptedNode, key);
      expect(Array.from(decryptedNode2)).toEqual(Array.from(testData));
    });

    it('should encrypt and decrypt binary data correctly', async () => {
      const key = crypto.randomBytes(32);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      // Encrypt with Node.js crypto
      const encrypted = await nodeAesEncrypt(testData, key);
      expect(encrypted.length).toBeGreaterThan(testData.length);

      // Decrypt with WebCryptoModule
      const decrypted = await webCrypto.aesDecryptAsync(encrypted, key);
      expect(Array.from(decrypted)).toEqual(Array.from(testData));

      // Encrypt with WebCryptoModule
      const encryptedWeb = await webCrypto.aesEncryptAsync(testData, key);
      expect(encryptedWeb.length).toBeGreaterThan(testData.length);

      // Decrypt with Node.js crypto
      const decryptedNode = await nodeAesDecrypt(encryptedWeb, key);
      expect(Array.from(decryptedNode)).toEqual(Array.from(testData));
    });

    it('should encrypt and decrypt large binary data', async () => {
      const key = crypto.randomBytes(32);
      const testData = crypto.randomBytes(1024);

      // Test WebCryptoModule encryption with Node.js decryption
      const encryptedWeb = await webCrypto.aesEncryptAsync(testData, key);
      const decryptedNode = await nodeAesDecrypt(encryptedWeb, key);
      expect(Array.from(decryptedNode)).toEqual(Array.from(testData));

      // Test Node.js encryption with WebCryptoModule decryption
      const encryptedNode = await nodeAesEncrypt(testData, key);
      const decryptedWeb = await webCrypto.aesDecryptAsync(encryptedNode, key);
      expect(Array.from(decryptedWeb)).toEqual(Array.from(testData));
    });

    it('should generate different ciphertexts for same data', async () => {
      const key = crypto.randomBytes(32);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      const encrypted1 = await webCrypto.aesEncryptAsync(testData, key);
      const encrypted2 = await webCrypto.aesEncryptAsync(testData, key);

      expect(Buffer.from(encrypted1)).not.toEqual(Buffer.from(encrypted2));

      const decrypted1 = await nodeAesDecrypt(encrypted1, key);
      const decrypted2 = await nodeAesDecrypt(encrypted2, key);

      expect(Array.from(decrypted1)).toEqual(Array.from(testData));
      expect(Array.from(decrypted2)).toEqual(Array.from(testData));
    });

    it('should fail to decrypt with wrong key', async () => {
      const key1 = crypto.randomBytes(32);
      const key2 = crypto.randomBytes(32);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      const encrypted = await webCrypto.aesEncryptAsync(testData, key1);

      await expect(
        webCrypto.aesDecryptAsync(encrypted, key2),
      ).rejects.toThrow();
    });

    it('should fail to decrypt with tampered HMAC', async () => {
      const key = crypto.randomBytes(32);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      const encrypted = await webCrypto.aesEncryptAsync(testData, key);
      // Tamper with HMAC
      encrypted[encrypted.length - 32] ^= 1;

      await expect(webCrypto.aesDecryptAsync(encrypted, key)).rejects.toThrow(
        'Invalid HMAC',
      );
    });

    it('should handle empty data', async () => {
      const key = crypto.randomBytes(32);
      const testData = new Uint8Array(0);

      const encrypted = await webCrypto.aesEncryptAsync(testData, key);
      const decrypted = await nodeAesDecrypt(encrypted, key);

      expect(Array.from(decrypted)).toEqual(Array.from(testData));
    });
  });
});
