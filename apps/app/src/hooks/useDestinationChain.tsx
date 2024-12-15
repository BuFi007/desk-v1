import { NATIVE_TOKEN_ADDRESS } from "@/constants/Tokens";
import { useGetTokensOrChain } from "@/hooks/useTokensOrChain";
import { Token } from "@/types";
import { useMemo } from "react";

export const useDestinationToken = () => {
  // Call the hook at the top level
  const getTokensForChain = useGetTokensOrChain;

  const getDestinationTokenAddress = useMemo(() => {
    return (tokenSymbol: string, destinationChainId: string | number) => {
      try {
        const destinationTokens = getTokensForChain(
          Number(destinationChainId),
          "tokens"
        );

        if (!destinationTokens) {
          console.warn(`No tokens found for chain ${destinationChainId}`);
          return NATIVE_TOKEN_ADDRESS;
        }

        // Find the matching token by symbol
        let matchingToken;
        if (Array.isArray(destinationTokens)) {
          matchingToken = destinationTokens.filter(
            (token: Token) => token.symbol === tokenSymbol
          );
        } else {
          console.warn(
            `Destination tokens is not an array for chain ${destinationChainId}`
          );
          return NATIVE_TOKEN_ADDRESS;
        }

        if (!matchingToken.length) {
          console.warn(
            `No matching token found for ${tokenSymbol} on chain ${destinationChainId}`
          );
          return NATIVE_TOKEN_ADDRESS;
        }

        return matchingToken?.[0]?.address ?? NATIVE_TOKEN_ADDRESS;
      } catch (error) {
        console.error("Error getting destination token address:", error);
        return NATIVE_TOKEN_ADDRESS;
      }
    };
  }, [getTokensForChain]);

  return getDestinationTokenAddress;
};
