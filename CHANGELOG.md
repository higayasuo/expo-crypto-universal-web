# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2024-03-20

### Changed

- Updated expo-crypto-universal dependency to version 0.2.1

### Security

- No security changes in this release

## [0.2.0] - 2024-03-19

### Changed

- Renamed StandardCrypto to WebCryptoModule for better clarity
- Improved test documentation and variable naming
- Added detailed JSDoc comments for encryption/decryption format
- Made test descriptions more consistent and clear

### Security

- No security changes in this release

## [0.1.0] - 2024-03-19

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
