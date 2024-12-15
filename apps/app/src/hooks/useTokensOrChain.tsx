import {
  AvalancheTokens,
  BaseSepoliaTokens,
  AvalancheFujiTokens,
  BaseTokens,
  ArbitrumSepoliaTokens,
  ArbitrumTokens,
  OptimismTokens,
  ZkSyncSepoliaTokens,
  BscTokens,
  ZkSyncTokens,
} from "@/constants/Tokens";
import {
  Base,
  ZkSyncSepolia,
  Bsc,
  ZkSync,
  Optimism,
  BaseSepolia,
} from "@/constants/Chains";

export const useGetTokensOrChain = (
  chainId: number,
  type: "tokens" | "chain"
) => {
  if (type === "tokens") {
    if (chainId === 8453) return BaseTokens;
    if (chainId === 43114) return AvalancheTokens;
    if (chainId === 42161) return ArbitrumTokens;
    if (chainId === 56) return BscTokens;
    if (chainId === 10) return OptimismTokens;
    if (chainId === 361) return ZkSyncTokens;
    if (chainId === 43113) return AvalancheFujiTokens;
    if (chainId === 84532) return BaseSepoliaTokens;
    if (chainId === 421614) return ArbitrumSepoliaTokens;
    if (chainId === 10) return OptimismTokens;
    if (chainId === 11155111) return ZkSyncSepoliaTokens;
    if (chainId === 59144) return BscTokens;
    if (chainId === 42161) return ArbitrumTokens;
    if (chainId === 361) return ZkSyncTokens;
  }

  if (type === "chain") {
    if (chainId === 84532) return BaseSepolia;
    if (chainId === 11155111) return ZkSyncSepolia;
    if (chainId === 59144) return Bsc;
    if (chainId === 361) return ZkSync;
    if (chainId === 8453) return Base;
    if (chainId === 56) return Bsc;
    if (chainId === 10) return Optimism;
    if (chainId === 361) return ZkSync;
  }
};
