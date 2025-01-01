import { ssoConnector } from "@/context/ZKsync";
import { http, createConfig } from "@wagmi/core";
import {
  bsc,
  bscTestnet,
  optimism,
  sepolia,
  zksync,
  zksyncSepoliaTestnet
} from "@wagmi/core/chains";
import { providers } from "ethers";
import { useMemo } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";

const config = createConfig({
  chains: [ sepolia, zksync, zksyncSepoliaTestnet, optimism, bsc, bscTestnet],
  connectors: [ssoConnector],
  transports: {
    [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
    [zksync.id]: http(zksync.rpcUrls.default.http[0]),
    [zksyncSepoliaTestnet.id]: http(zksyncSepoliaTestnet.rpcUrls.default.http[0]),
    [optimism.id]: http(optimism.rpcUrls.default.http[0]),
    [bsc.id]: http(bsc.rpcUrls.default.http[0]),
    [bscTestnet.id]: http(bscTestnet.rpcUrls.default.http[0])
  },
});

export default config;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
