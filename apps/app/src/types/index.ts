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