"use client";

import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Config, WagmiProvider } from "wagmi";
import {
  bsc,
  bscTestnet,
  opBNB,
  opBNBTestnet,
  optimism,
  sepolia,
  zksync,
  zksyncSepoliaTestnet,
} from "wagmi/chains";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const config = getDefaultConfig({
    appName: "Bufi desk app",
    projectId: "399ae947aec63dc8675622dc36f5ab08",
    chains: [
      bsc,
      bscTestnet,
      opBNBTestnet,
      opBNB,
      optimism,
      sepolia,
      zksync,
      zksyncSepoliaTestnet,
    ],
    ssr: true,
  });

  const queryClient = new QueryClient();
  return (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    <WagmiProvider config={config as any}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={bscTestnet} theme={lightTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
