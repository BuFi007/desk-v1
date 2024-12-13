import { useMemo } from "react";
import { ssoConnector } from "@/context/ZKsync";
import { createConfig, http } from "@wagmi/core";
import { useConnectorClient, Config } from "wagmi";
import {
  optimism,
  sepolia,
  zksync,
  zksyncSepoliaTestnet,
} from "@wagmi/core/chains";
import type { Account, Chain, Client, Transport } from "viem";
import { providers } from "ethers";

const config = createConfig({
  chains: [ sepolia, zksync, zksyncSepoliaTestnet, optimism],
  connectors: [ssoConnector],
  transports: {
    [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
    [zksync.id]: http(zksync.rpcUrls.default.http[0]),
    [zksyncSepoliaTestnet.id]: http(zksyncSepoliaTestnet.rpcUrls.default.http[0]),
    [optimism.id]: http(optimism.rpcUrls.default.http[0]),
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
