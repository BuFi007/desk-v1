import { BLOCKSCOUT_EXPLORERS } from "@/constants";
import { Chain, ExtendedPaymentInfo, IGetLinkDetailsResponse } from "@/types";
import { toast } from "@bu/ui/use-toast";
import { getLinkDetails } from "@squirrel-labs/peanut-sdk";

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const defaultQRSize = 150;

export const sizeStyles = {
  container: {
    sm: "w-48",
    base: "w-64",
    lg: "w-72",
  },
  input: {
    sm: "text-lg",
    base: "text-2xl",
    lg: "text-6xl",
  },
  balance: {
    sm: "text-xs",
    base: "text-sm",
    lg: "text-base",
  },
};

export const fetchLinkDetails = async (
  link: string,
  setDetails: (details: IGetLinkDetailsResponse) => void,
  setPaymentInfo: (paymentInfo: ExtendedPaymentInfo) => void
) => {
  try {
    const details = (await getLinkDetails({
      link,
    })) as unknown as IGetLinkDetailsResponse;
    setDetails(details);
    const extendedPaymentInfo: ExtendedPaymentInfo = {
      chainId: details.chainId,
      tokenSymbol: details.tokenSymbol,
      tokenAmount: details.tokenAmount,
      senderAddress: details.sendAddress,
      claimed: details.claimed,
      depositDate: details.depositDate,
      depositIndex: details.depositIndex,
    };
    setPaymentInfo(extendedPaymentInfo);
  } catch (error: any) {
    console.error("Error fetching link details:", error.message);
    toast({
      title: "Error",
      description: "Error fetching link details",
      variant: "destructive",
    });
  }
};

export function playAudio(audioFilePath: string): void {
  const audio = new Audio(audioFilePath);
  audio.volume = 0.6;
  audio.play().catch((err) => console.warn("Audio playback failed:", err));
}

export function getBlockExplorerUrl(chain: Chain): string {
  return BLOCKSCOUT_EXPLORERS[chain.chainId] || chain.rpcUrls[0] || "";
}

export function getBlockExplorerUrlByChainId(chainId: number): string {
  return BLOCKSCOUT_EXPLORERS[chainId] || "";
}
