# expo-crypto-universal-web

Web implementation of expo-crypto-universal, providing cryptographic operations using the Web Crypto API.

## Features

- Random bytes generation
- SHA-256, SHA-384, and SHA-512 hashing
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

// Hash data with SHA-256
const data = new Uint8Array([1, 2, 3, 4]);
const hash256 = await webCryptoModule.sha256Async(data);

// Hash data with SHA-384
const hash384 = await webCryptoModule.sha384Async(data);

// Hash data with SHA-512
const hash512 = await webCryptoModule.sha512Async(data);

// Encrypt data
const key = webCryptoModule.getRandomBytes(32);
const encrypted = await webCryptoModule.aesEncryptAsync(data, key);

// Decrypt data
const decrypted = await webCryptoModule.aesDecryptAsync(encrypted, key);
```

## API

### `webCryptoModule.getRandomBytes(size: number): Uint8Array`

Generates cryptographically secure random bytes of the specified size.

### `webCryptoModule.sha256Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-256 hash of the input data.

### `webCryptoModule.sha384Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-384 hash of the input data.

### `webCryptoModule.sha512Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-512 hash of the input data.

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
