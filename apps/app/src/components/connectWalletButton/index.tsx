import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const ConnectWalletButton = () => {
  const { address } = useAccount();

  if (address) {
    return null;
  }

  return (
    <div className="flex justify-center w-full">
      <ConnectButton />
    </div>
  );
};
