export const Base = {
  chainId: 8453,
  isMainnet: true,
  name: "Base",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
  },
  rpcUrls: [
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  ],
  blockExplorerUrls: ["https://base.blockscout.com"],
  chainName: "Base",
  vanityName: "Base",
  networkId: 8453,
  iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
};

export const BaseSepolia = {
  chainId: 84532,
  isMainnet: false,
  name: "Base",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
  },
  rpcUrls: [
    `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  ],
  blockExplorerUrls: ["https://base-sepolia.blockscout.com"],
  chainName: "BaseSepolia",
  vanityName: "Base Sepolia",
  networkId: 84532,
  iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
};

export const EthereumSepolia = {
  chainId: 11155111,
  name: "Ethereum Sepolia",
  rpcUrls: ["https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  isMainnet: false,
  networkId: 11155111,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
  },
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
  vanityName: "Ethereum Sepolia",
  chainName: "EthereumSepolia",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
};

export const ZkSync = {
  chainId: 324,
  rpcUrls: ["https://mainnet.era.zksync.io"],
  isMainnet: true,
  networkId: 324,
  name: "ZkSync",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
  },
  blockExplorerUrls: ["https://explorer.zksync.io"],
  vanityName: "ZkSync",
  chainName: "ZkSync",
  iconUrls: [
    "https://assets.coingecko.com/coins/images/38043/standard/ZKTokenBlack.png?1718614502",
  ],
};

export const ZkSyncSepolia = {
  chainId: 300,
  name: "ZkSync Sepolia",
  rpcUrls: ["https://sepolia.era.zksync.dev"],
  isMainnet: false,
  networkId: 300,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
  },
  blockExplorerUrls: ["https://sepolia.explorer.zksync.io"],
  vanityName: "ZkSync Sepolia",
  chainName: "ZkSyncSepolia",
  iconUrls: [
    "https://assets.coingecko.com/coins/images/38043/standard/ZKTokenBlack.png?1718614502",
  ],
};

export const Optimism = {
  chainId: 10,
  name: "Optimism",
  rpcUrls: ["https://mainnet.optimism.io"],
  isMainnet: true,
  networkId: 10,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/optimism.svg"],
  },
  blockExplorerUrls: ["https://explorer.optimism.io"],
  vanityName: "Optimism",
  chainName: "Optimism",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/optimism.svg"],
};

export const Bsc = {
  chainId: 56,
  name: "BSC",
  rpcUrls: ["https://bsc-dataseed.binance.org"],
  isMainnet: true,
  networkId: 56,
  nativeCurrency: {
    name: "Binance Smart Chain",
    symbol: "BNB",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/bsc.svg"],
  },
  blockExplorerUrls: ["https://bscscan.com"],
  vanityName: "BSC",
  chainName: "BSC",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/bnb.svg"],
};

export const AllChains = [
  Base,
  EthereumSepolia,
  ZkSync,
  ZkSyncSepolia,
  Optimism,
  Bsc,
];
