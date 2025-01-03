# 🌐 Bu: Decentralized Financial & Project Management Platform

## 👀 Vision

Bu empowers freelancers, SMEs, and remote teams in emerging markets with an integrated financial and project management platform leveraging stablecoins and decentralized finance (DeFi).

## 🎯 Overview

We've created a comprehensive invoicing system for 'ghosts' 👻 with USDC payment capabilities. Our platform leverages multiple blockchain technologies to provide secure, efficient, and flexible payment solutions.

As part of the BNB Hack Q4 event, we have worked on two separate repos. The current one, Bu Desk, shows the workspace NeoBank notion app we plan to develop into production. While our [DeFi web app] (https://github.com/BuFi007/defi-web-app) shows the Hub & Spoke money market protocol we are developing for undercollateralized DeFi loans.

## 👻 Hub & Spoke Smart Contract Deployments
- **Spoke BSC**: [0x2A97438Acf6f1c0745171C8DA7e199F5061a0C3b](https://testnet.bscscan.com/address/0x2A97438Acf6f1c0745171C8DA7e199F5061a0C3b)
- **Hub Avalanche**: [0x6958d698e0399C82e9e9f32f0cfEE48cE5952DF3](https://testnet.snowtrace.io/address/0x6958d698e0399C82e9e9f32f0cfEE48cE5952DF3)

## 🚀 Key Features

### Multi-Chain Payment Solutions
- **Peanut Protocol Integration**: Request payment links supporting BSC, Avalanche, zkSync, Optimism, Base, and other networks
- **Confidential Invoicing**: Secure transfers on Ethereum Sepolia using Zama (no support for other networks yet, but shows potential once they do)
- **Automated Payments**: Recurring invoice handling on BSC, Avalanche, zkSync and Optimism
- **DeFi Integration**: Link payments across multiple networks with personalized Bu names and ghost-themed QR codes. Current network set to BSC Testnet.

### 🔐 Confidential Payment System (Zama)

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
You can find the smart contracts in the following repositories and you can test them here, show the code, images, etc:
- [Experimental zkSync Repository](https://github.com/BuFi007/experimental-zksync)
- [Experimental Zama Repository](https://github.com/BuFi007/experimental-zama)
- [Optimism Bridge Contracts](https://github.com/BuFi007/optimism-op-auto-invoices)

### Supported Networks
- BSC Testnet
- Avalanche
- Ethereum Sepolia (Confidential Transactions)
- zkSync
- Optimism
- Base
- Additional EVM-compatible networks

### 🌉 OPERC20 Bridge & Automated Payments with Optimism and Superchain

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
- Next.js 14
- Supabase
- BSC Network
- Optimism Network
- Hardhat & Ignition deployment
- Solidity v0.8.28
- ZK-SNARK circuits
- Meta transaction infrastructure

## 🏗 Getting Started

### Prerequisites
