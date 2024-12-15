"use client";

import { AllChains } from "@/constants/Chains";
import { Chain, ChainList } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bu/ui/select";
import Image from "next/image";
import { useSwitchChain } from "wagmi";

interface ChainSelectorProps {
  chains: Chain[];
  currentChainId?: number;
}

export function ChainSelector({ currentChainId }: ChainSelectorProps) {
  const { chains, switchChain } = useSwitchChain();
  return (
    <div className="flex flex-col gap-2">
      <Select
        onValueChange={(chainId) => {
          console.log(chainId);
          switchChain({ chainId: Number(chainId) as ChainList });
        }}
        defaultValue={currentChainId?.toString()}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Change Chain" />
        </SelectTrigger>
        <SelectContent>
          {chains.map((chain) => (
            <SelectItem key={chain?.id} value={chain?.id.toString()}>
              <div className="flex items-center gap-2">
                <Image
                  src={
                    AllChains.find((c) => c?.chainId === chain.id)?.iconUrls[0]!
                  }
                  alt={`${chain.name} logo`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                {chain.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
