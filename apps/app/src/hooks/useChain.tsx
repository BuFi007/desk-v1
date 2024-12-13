import { AllChains } from "@/constants/Chains";
import { useChainId } from "wagmi";

export const useChain = () => {
  const chainId = useChainId();
  const chain = AllChains.find((chain) => chain.chainId === chainId);
  return chain;
};
