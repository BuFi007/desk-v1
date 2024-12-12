import { zksyncSsoConnector, callPolicy } from "zksync-sso/connector";
import { zksyncSepoliaTestnet } from "viem/chains";
import { connect } from "@wagmi/core";
import { erc20Abi } from "viem";
import config from "@/constants/wagmi";

export const ssoConnector = zksyncSsoConnector({
  session: {
    expiry: "1 day",

    feeLimit: 100000n,

    transfers: [
      {
        to: "0x188bd99cd7D4d78d4E605Aeea12C17B32CC3135A",
        valueLimit: 100000n,
      },
    ],

    contractCalls: [
      callPolicy({
        address: "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044",
        abi: erc20Abi,
        functionName: "transfer",
        constraints: [
          {
            index: 0,
            value: "0x6cC8cf7f6b488C58AA909B77E6e65c631c204784",
          },

          {
            index: 1,
            limit: {
              limit: 200000n,
              period: "1 hour",
            },
          },
        ],
      }),
    ],
  },
});

export const connectWithSSO = () => {
  connect(config, {
    connector: ssoConnector,
    chainId: zksyncSepoliaTestnet.id,
  });
};
