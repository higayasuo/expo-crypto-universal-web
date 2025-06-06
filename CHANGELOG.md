# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.11] - 2025-05-31

### Removed

- Removed SHA2 functions (sha256Async, sha384Async, sha512Async, sha2Async)

### Changed

- Updated expo-crypto-universal dependency to version 0.2.11

## [0.2.9] - 2025-05-31

### Changed

- Updated expo-crypto-universal dependency to version 0.2.9

## [0.2.8] - 2025-05-31

### Changed

- Updated expo-crypto-universal dependency to version 0.2.8

## [0.2.7] - 2025-04-16

### Changed

- Moved expo-crypto-universal dependency to peerDependencies
- Removed unused base64-js from dependencies

## [0.2.6] - 2025-04-15

### Changed

- Updated expo-crypto-universal dependency to version 0.2.6

### Security

- No security changes in this release

## [0.2.3] - 2025-04-15

### Added

- Added SHA-384 hashing support
- Added SHA-512 hashing support

### Changed

- Updated README.md to document new hashing features

### Security

- No security changes in this release

## [0.2.2] - 2025-04-09

### Changed

- Updated expo-crypto-universal dependency to version 0.2.2

### Security

- No security changes in this release

## [0.2.1] - 2025-03-20

### Changed

- Updated expo-crypto-universal dependency to version 0.2.1

### Security

- No security changes in this release

## [0.2.0] - 2025-03-19

### Changed

- Renamed StandardCrypto to WebCryptoModule for better clarity
- Improved test documentation and variable naming
- Added detailed JSDoc comments for encryption/decryption format
- Made test descriptions more consistent and clear

### Security

- No security changes in this release

## [0.1.0] - 2025-03-19

### Added

- Initial release
- Web Crypto API implementation of expo-crypto-universal
- Random bytes generation using `crypto.getRandomValues()`
- SHA-256 hashing with base64 output
- AES-256-CBC encryption with:
  - Random IV generation
  - HMAC verification
  - Secure key handling
- AES-256-CBC decryption with HMAC verification

### Security

- All cryptographic operations use the Web Crypto API
- AES encryption includes HMAC verification for data integrity
- Secure random number generation for IVs and HMAC keys
