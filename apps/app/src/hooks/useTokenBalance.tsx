// apps/app/src/hooks/useTokenBalance.tsx
import { UseTokenBalanceProps } from "@/types";
import { useBalance, UseBalanceReturnType } from "wagmi";

export function useTokenBalance({
  tokenAddress,
  chainId,
  address,
  setBalance: externalSetBalance,
}: UseTokenBalanceProps): UseBalanceReturnType {
  console.log(tokenAddress, "tokenAddress");

  const isNativeToken =
    tokenAddress === "0x0000000000000000000000000000000000000000";

  const balance = useBalance({
    address: address,
    token: isNativeToken ? undefined : tokenAddress,
    chainId: chainId,
  });

  return balance;
}
