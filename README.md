# expo-crypto-universal-web

Web implementation of expo-crypto-universal, providing cryptographic operations using the Web Crypto API.

## Features

- Random bytes generation
- SHA-256, SHA-384, and SHA-512 hashing
- SHA-2 hashing with configurable bit length

## Installation

```bash
npm install expo-crypto-universal-web
```

## Usage

```typescript
import { webCryptoModule } from 'expo-crypto-universal-web';

// Generate random bytes
const randomBytes = webCryptoModule.getRandomBytes(32);

// Fill array with random values
const filledArray = webCryptoModule.getRandomValues(new Uint8Array(32));

// Hash data with SHA-256
const data = new Uint8Array([1, 2, 3, 4]);
const hash256 = await webCryptoModule.sha256Async(data);

// Hash data with SHA-384
const hash384 = await webCryptoModule.sha384Async(data);

// Hash data with SHA-512
const hash512 = await webCryptoModule.sha512Async(data);

// Hash data with SHA-2 (configurable bit length)
const hash = await webCryptoModule.sha2Async(256, data); // 256, 384, or 512 bits
```

## API

### `webCryptoModule.getRandomBytes(size: number): Uint8Array`

Generates cryptographically secure random bytes of the specified size.

### `webCryptoModule.getRandomValues(array: Uint8Array): Uint8Array`

Fills the provided Uint8Array with cryptographically secure random values.

### `webCryptoModule.sha256Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-256 hash of the input data.

### `webCryptoModule.sha384Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-384 hash of the input data.

### `webCryptoModule.sha512Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-512 hash of the input data.

### `webCryptoModule.sha2Async(bits: number, data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-2 hash of the input data with the specified bit length (256, 384, or 512).

## Security

This implementation uses the Web Crypto API for all cryptographic operations, ensuring high security standards.

## License

MIT
