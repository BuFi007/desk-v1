"use client";

import { ChainSelector } from "./index";
import { WalletSelector } from "./walletSelector";
import { AllChains } from "@/constants/Chains";
import { ChainList } from "@/types";
import { Button } from "@bu/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bu/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

export function WalletSwitcherModal() {
  const [open, setOpen] = useState(false);
  const chainId = useChainId();
  const chain = AllChains.find((c) => c.chainId === chainId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Chain</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Chain</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ChainSelector chains={AllChains} currentChainId={chain?.chainId} />
        </div>
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2">
            Current Chain:
            {chain && (
              <>
                <Image
                  src={
                    AllChains.find((c) => c.chainId === chain.chainId)
                      ?.iconUrls[0] || "/images/default-chain.png"
                  }
                  alt={`${chain.name} logo`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                {chain.name}
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
