# expo-crypto-universal-web

Web implementation of expo-crypto-universal, providing cryptographic operations using the Web Crypto API.

## Features

- Random bytes generation
- SHA-256 hashing
- AES-256-CBC encryption/decryption with HMAC verification

## Installation

```bash
npm install expo-crypto-universal-web
```

## Usage

```typescript
import { webCryptoModule } from 'expo-crypto-universal-web';

// Generate random bytes
const randomBytes = webCryptoModule.getRandomBytes(32);

// Hash a string with SHA-256
const hash = await webCryptoModule.sha256Async('Hello, World!');

// Encrypt data
const data = new Uint8Array([1, 2, 3, 4]);
const key = webCryptoModule.getRandomBytes(32);
const encrypted = await webCryptoModule.aesEncryptAsync(data, key);

// Decrypt data
const decrypted = await webCryptoModule.aesDecryptAsync(encrypted, key);
```

## API

### `webCryptoModule.getRandomBytes(size: number): Uint8Array`

Generates cryptographically secure random bytes of the specified size.

### `webCryptoModule.sha256Async(code: string): Promise<string>`

Computes the SHA-256 hash of the input string and returns it as a base64-encoded string.

### `webCryptoModule.aesEncryptAsync(data: Uint8Array, rawKey: Uint8Array): Promise<Uint8Array>`

Encrypts data using AES-256-CBC with a random IV and HMAC verification.

### `webCryptoModule.aesDecryptAsync(data: Uint8Array, rawKey: Uint8Array): Promise<Uint8Array>`

Decrypts data using AES-256-CBC and verifies the HMAC.

## Security

This implementation uses the Web Crypto API for all cryptographic operations, ensuring high security standards. The AES encryption includes:

- Random IV generation
- HMAC verification
- Secure key handling

## License

MIT
