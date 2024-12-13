import { Address, Hex } from "viem";

export interface BlockchainContextProps {
  address: Address | string | undefined;
  isConnected?: boolean;
  chainId: number | null | undefined;
}
export interface Token {
  address: Hex| string | `0x${string}`;
  chainId: number;
  decimals: number;
  payable?: boolean;
  name: string;
  symbol: string;
  image: string;
  isNative?: boolean;
}
export type ChainList =
  | 8453
  | 84532
  | 43114
  | 43113
  | 42161
  | 324
  | 300
  | 10
  | 56
  | undefined;

export interface Chain {
  chainId: number;
  isMainnet: boolean;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    iconUrls: string[];
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  chainName: string;
  vanityName: string;
  networkId: number;
  iconUrls: string[];
}

export interface TabState {
  activeTab: "moneyMarket" | "paymentLink" | "tokenSwap";
  setActiveTab: (tab: "moneyMarket" | "paymentLink" | "tokenSwap") => void;
  resetTab: () => void;
}

export interface LocalStorageStore {
  links: string[];
  setLinks: (links: string[]) => void;
}