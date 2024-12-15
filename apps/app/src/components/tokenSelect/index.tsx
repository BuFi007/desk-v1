import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bu/ui/select";
import { Token } from "@/types";
import { useGetTokensOrChain } from "@/hooks/useTokensOrChain";
import { useChainId } from "wagmi";

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
  tokens: Token[];
  label: string;
}

export const TokenSelect: React.FC<TokenSelectProps> = ({
  value,
  onChange,
  tokens,
  label,
}) => {
  const chainId = useChainId();

  const renderTokenOption = (tokenAddress: string) => {
    const token = tokens.find((t) => t.name === "USDC");
    if (!token) {
      return null;
    }

    return (
      <div className="flex items-center space-x-2">
        <img
          src={token.image || ""}
          alt={token.name || ""}
          className="h-6 w-6 rounded-full"
        />
        <span className="font-clash text-sm">{token.symbol}</span>
      </div>
    );
  };

  const filteredTokens = useGetTokensOrChain(chainId, "tokens") as Token[];

  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 uppercase mb-2">{label}</span>
      <div className="min-w-[230px] w-[230px] max-w-[230px]">
        <Select defaultValue={value || "USDC"} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue>{renderTokenOption(value)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {filteredTokens?.map((token) => (
              <SelectItem key={token.address} value={token.address}>
                {renderTokenOption(token.address)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
