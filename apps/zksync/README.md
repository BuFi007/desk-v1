# 🔄 Automatic Payments with Meta-Transactions on ZKSync 🌟

A decentralized automatic payment system leveraging ZKSync's Layer 2 scaling and zero-knowledge proofs for efficient, gas-optimized recurring payments.

> **Note**: To run the tests, please visit [experimental-zksync repository](https://github.com/BuFi007/experimental-zksync). This is a turbo repo and is not configured for direct testing in this project.

[Reference: experimental-zksync repository](https://github.com/BuFi007/experimental-zksync)

## 🎯 Overview

This project implements a smart contract system that enables:

- ✨ Gas-less recurring payments using meta-transactions
- 🔒 Secure payment authorizations with EIP-712 signatures
- 💸 Automatic token transfers on predefined schedules
- ⚡ Zero-knowledge proof validations on ZKSync
- 🎫 ERC20 token support

## 🏗️ Architecture

The system consists of three main components:

1. **TrustedForwarder.sol**: Handles meta-transactions and signature verification
2. **AutomaticPayments.sol**: Manages recurring payment logic and token transfers
3. **MockERC20.sol**: Test token for development and testing

## 🚀 Getting Started

### Prerequisites

- Node.js v14+ and npm
- ZKSync ERA testnet access
- MetaMask or another Web3 wallet

### Installation

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- ZKSync Team
- OpenZeppelin Contracts
- Ethereum Community

## 🔍 Features

### Meta-Transactions

Users can authorize and execute payments without holding ETH for gas, perfect for recurring subscriptions and automated payments.

### Zero-Knowledge Proofs

Leverages ZKSync's built-in zero-knowledge proof system for:

- Transaction validation
- Privacy-preserving payment execution
- Efficient batch processing

### Payment Management

- 📅 Schedule recurring payments
- 🎮 Control payment frequency
- ⏰ Set validity periods
- ❌ Cancel payments anytime

## 🛠️ Technical Details

### Smart Contracts

- **TrustedForwarder**: Implements EIP-2771 for meta-transactions
- **AutomaticPayments**: Handles payment logic and token transfers
- **MockERC20**: ERC20 implementation for testing

### Security Features

- ✅ EIP-712 compliant signatures
- 🔐 Secure nonce management
- 🛡️ Access control mechanisms
- 🔍 Comprehensive validation checks

## 🧪 Testing

Run the test suite:

```shell
npx hardhat test
```

> **Note**: To run the tests, please visit [experimental-zksync repository](https://github.com/BuFi007/experimental-zksync). This is a turbo repo and is not configured for direct testing in this project.

[Reference: experimental-zksync repository](https://github.com/BuFi007/experimental-zksync)
