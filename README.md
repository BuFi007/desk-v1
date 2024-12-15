# 🌐 Bu: Decentralized Financial & Project Management Platform

## 👀 Vision

Bu empowers freelancers, SMEs, and remote teams in emerging markets with an integrated financial and project management platform leveraging stablecoins and decentralized finance (DeFi).

## 🎯 Overview

We've created a comprehensive invoicing system for 'ghosts' 👻 with USDC payment capabilities. Our platform leverages multiple blockchain technologies to provide secure, efficient, and flexible payment solutions.

## 🚀 Key Features

### Multi-Chain Payment Solutions
- **Peanut Protocol Integration**: Request payment links supporting zkSync, Optimism, Base, and other networks
- **Confidential Invoicing**: Secure transfers on Ethereum Sepolia using Zama
- **Automated Payments**: Recurring invoice handling on zkSync and Optimism
- **DeFi Integration**: Link payments across multiple networks with personalized Bu names and ghost-themed QR codes

### 🔐 Confidential Payment System (Zama Track)

Built on Zama's FHEVM, our system enables:

1. **Store Payment** 📝
   - Encrypted payment amount storage
   - Secure fund locking in smart contracts
   - Receiver address association

2. **Claim Payment** 🎯
   - Payment verification
   - Encrypted fund transfers
   - Automated processing tracking

3. **Request Payment** 📨
   - Encrypted payment request creation
   - Sender address association
   - On-chain notification system

4. **Pay Request** 💳
   - Request review interface
   - Encrypted amount transfers
   - Automated fulfillment tracking

## 🛠 Technical Implementation

### Smart Contracts
- [Experimental zkSync Repository](https://github.com/BuFi007/experimental-zksync)
- [Experimental Zama Repository](https://github.com/BuFi007/experimental-zama)
- [Optimism Bridge Contracts](https://github.com/BuFi007/optimism-op-auto-invoices)

### Supported Networks
- Ethereum Sepolia (Confidential Transactions)
- zkSync
- Optimism
- Base
- Additional EVM-compatible networks

### 🌉 OPERC20 Bridge & Automated Payments

#### Custom OP-ERC20 Token (MCL2T)
Our specialized token for Optimism L2 features:
- Seamless bridging between L1 and L2
- Gas-optimized operations
- Native meta transaction support
- Privacy-preserving mechanisms

#### ⚡ Automatic Payment System
- **Meta Transactions**: Gas-less operations using TrustedForwarder pattern
- **ZK-Proof Integration**: Privacy-preserving payment verification
- **Scheduled Payments**: Automated recurring payment handling
- **Bridge Operations**: Streamlined L1 <> L2 token transfers

## 📍 Deployed Contracts (Optimism Sepolia)

| Contract          | Address                                      |
| ----------------- | -------------------------------------------- |
| MyCustomL2Token   | `0x4BdE0740740b8dBb5f6Eb8c9ccB4Fc01171e953C` |
| TrustedForwarder  | `0x6e1180674368878f6b67E1DCB6E4DFd0C102703A` |
| AutomaticPayments | `0x6e5f00C0b246E8c7C2aF4A74cd2b8bd33Fb5Ab94` |

## Deployed Contracts in Sepolia

> [!Note] deployed with remix.org, i dont use mnemonic, i use private key The currently deployed contracts on Sepolia
> are:
>
> - Confidential Payments: `0xA9fB4A1a42BA87e1590cd0F55A11a96071d2D943`
> - ERC20: `0xa5e6b43506154f54F63Cd57Cc85c971b431Dc161`

| Contract          | Address                                       |
| ----------------- | --------------------------------------------- |
| ERC20CONFIDENTIAL   | `0xa5e6b43506154f54F63Cd57Cc85c971b431Dc161`|
| ConfidentialPayments| `0xA9fB4A1a42BA87e1590cd0F55A11a96071d2D943`|

#### Key Features
- ⚡ Optimized gas consumption
- 🔐 Privacy-preserving transactions
- 🌉 Efficient L1-L2 bridging
- 📱 User-friendly meta transactions
- 🔄 Flexible payment scheduling

#### Technical Stack
- Optimism Network
- Hardhat & Ignition deployment
- Solidity v0.8.28
- ZK-SNARK circuits
- Meta transaction infrastructure

## 🏗 Getting Started

### Prerequisites
