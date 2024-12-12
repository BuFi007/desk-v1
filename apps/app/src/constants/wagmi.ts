import { ssoConnector } from '@/context/ZKsync';
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia, zksync, zksyncSepoliaTestnet } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia, zksync, zksyncSepoliaTestnet],
  connectors: [ssoConnector],
  transports: {
    [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
    [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
    [zksync.id]: http(zksync.rpcUrls.default.http[0]),
    [zksyncSepoliaTestnet.id]: http(zksyncSepoliaTestnet.rpcUrls.default.http[0]),
  },
});

export default config;
