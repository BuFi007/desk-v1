import { Address } from "viem";

export interface BlockchainContextProps {
  address: Address | string | undefined;
  isConnected?: boolean;
  chainId: number | null | undefined;
}
