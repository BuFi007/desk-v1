import { Dispatch } from "react";
import { SetStateAction } from "react";
import { Address, Hex } from "viem";

// Get User types
// Base user type representing the database schema
export type SupabaseUser = {
  id: string;
  email: string;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  full_name: string | null;
};

// Type for team-related errors
export type SelectQueryError<T extends string> = {
  message: T;
  details: string;
  hint: string;
  code: string;
};

// Props type for the Setup page component
export type SetupPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

// Blockchain related types

export interface BlockchainContextProps {
  address: Address | string | undefined;
  isConnected?: boolean;
  chainId: number | null | undefined;
}
export interface ChainSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  chains: Chain[];
  label: string;
  chainId?: number | undefined | string;
  ccip?: boolean;
}

export interface LinkUiFormProps {
  tokenAmount: number;
  handleValueChange: (usdAmount: number, tokenAmount: number) => void;
  availableTokens: Token[];
  setSelectedToken: Dispatch<SetStateAction<any>>;
  chainId: number | undefined;
  handleCreateLinkClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPeanutLoading: boolean;
}

export interface Token {
  address: Hex | string | `0x${string}`;
  chainId: number;
  decimals: number;
  payable?: boolean;
  name: string;
  symbol: string;
  image: string;
  isNative?: boolean;
}
export type ChainList = 11155111 | 324 | 300 | 10;

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
export interface UseTokenBalanceProps {
  tokenAddress: Address;
  chainId: ChainList;
  address: Address;
  decimals: number;
  setBalance?: (balance: string) => void;
}

export interface CurrencyDisplayerProps {
  onValueChange: (value: number, formattedValue: number) => void;
  initialAmount?: number;
  availableTokens: Token[];
  onTokenSelect: (token: Token) => void;
  currentNetwork: number;
  tokenAmount?: number | string;
  size?: "sm" | "base" | "lg";
  action?: "default" | "pay";
  defaultToken?: Token;
}

export interface IGetLinkDetailsResponse {
  link: string;
  chainId: string;
  depositIndex: number;
  contractVersion: string;
  password: string;
  sendAddress: string;
  tokenType: string;
  tokenAddress: string;
  tokenDecimals: number;
  tokenSymbol: string;
  TokenName: string;
  tokenAmount: string;
  tokenId: number;
  claimed: boolean;
  depositDate: string;
  tokenURI: string;
}

export interface CustomLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export interface ExtendedPaymentInfo {
  chainId: number | string;
  tokenSymbol: string;
  tokenAmount: string;
  senderAddress: string;
  claimed: boolean;
  depositDate: string;
  transactionHash?: string;
  depositIndex: number;
}
export interface TransactionDetails {
  transactionHash: string;
  peanutLink: string;
  paymentLink: string;
}

export interface TransactionDetailsDisplayProps {
  transactionDetails: TransactionDetails;
  chainId: number | undefined;
  handleCopy: (text: string, label: string) => void;
  handleShare: (platform: string) => void;
  truncateHash: (hash: string) => string;
}

export interface FramedQRCodeProps {
  image: string;
  copyLink?: () => void;
  link: string;
  frameText?: string;
}

export interface PaymentInfoProps {
  paymentInfo: {
    chainId: number | string;
    tokenSymbol: string;
    tokenAmount: string;
    senderAddress: string;
    claimed: boolean;
    depositDate: string;
    transactionHash?: string;
    destinationChainId?: number;
    destinationChainName?: string;
  };
}
