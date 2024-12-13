import { AllChains } from "@/constants/Chains";
import { useChain } from "@/hooks/useChain";
import { AvatarImageNext } from "@bu/ui/avatar";
import Image from "next/image";
import { useChainId } from "wagmi";

export const Chain = () => {
  const chainId = useChainId();
  console.log(chainId, "chainId");
  const chain = AllChains.find((chain) => chain.chainId === chainId);
  console.log(chain);
  return (
    <>
      {chain && (
        <div className="flex items-center gap-1">
          <Image
            src={chain?.iconUrls[0]!}
            alt={chain?.name!}
            width={16}
            height={16}
            className="w-4 h-4"
          />
          {/* <span className="text-[11px] font-normal">{chain?.name}</span> */}
        </div>
      )}
    </>
  );
};
