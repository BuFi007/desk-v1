"use client";
import {
  lightTheme,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  optimism,
  base,
  zksyncSepoliaTestnet,
  zksync,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "399ae947aec63dc8675622dc36f5ab08",
    chains: [optimism, zksyncSepoliaTestnet, zksync, sepolia],
    ssr: true,
  });

  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
