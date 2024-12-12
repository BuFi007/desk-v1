import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { GoogleSignin } from "../google-signin";
import { Button } from "@bu/ui/button";

export const LoginButton = () => {
  const { address } = useAccount();
  if (address) {
    return null;
  }

  return (
    <>
      <Button>Connect your wallet</Button>
      <ConnectButton />
    </>
  );
};
