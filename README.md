# expo-crypto-universal-web

Web implementation of expo-crypto-universal, providing cryptographic operations using the Web Crypto API.

## Features

- Random bytes generation using Web Crypto API
- Random bytes generation with specified size

## Installation

```bash
npm install expo-crypto-universal-web
```

## Usage

```typescript
import { webCryptoModule } from 'expo-crypto-universal-web';

// Generate random bytes with specified size
const randomBytes = webCryptoModule.getRandomBytes(32);

// Fill array with random values using Web Crypto API
const filledArray = webCryptoModule.getRandomValues(new Uint8Array(32));
```

## API

### `webCryptoModule.getRandomBytes(size: number): Uint8Array`

Generates cryptographically secure random bytes of the specified size.

### `webCryptoModule.getRandomValues(array: Uint8Array): Uint8Array`

Fills the provided Uint8Array with cryptographically secure random values using the Web Crypto API.

## Security

This implementation uses the Web Crypto API for random value generation, ensuring high security standards.

## License

MIT
