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

#### 📍 Deployed Contracts (Optimism Sepolia)

| Contract          | Address                                      |
|------------------|---------------------------------------------|
| MyCustomL2Token   | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |
| TrustedForwarder  | `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` |
| AutomaticPayments | `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0` |

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