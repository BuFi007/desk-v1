import { AllChains } from "@/constants/Chains";
import Image from "next/image";
import { useChainId } from "wagmi";

export const Chain = () => {
  const chainId = useChainId();
  const chain = AllChains.find((chain) => chain.chainId === chainId);

  return (
    <>
      {chain && (
        <div className="flex items-center gap-1">
          <Image
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            src={chain?.iconUrls[0]!}
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
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
