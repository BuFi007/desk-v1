import { Token } from "@/types";
import { cn } from "@bu/ui/cn";
import { pressable } from "@/utils/theme";
import Image from "next/image";
import { TokenChipProps } from "@/interfaces";

export function TokenChip({
  token,
  onClick,
  className,
  amount,
}: TokenChipProps) {
  return (
    <button
      type="button"
      data-testid="ockTokenChip_Button"
      className={cn(
        pressable.secondary,
        pressable.shadow,
        "flex w-fit shrink-0 items-center gap-1 rounded-lg py-1 pr-3 pl-1 ",
        className
      )}
      onClick={() => onClick?.(token)}
    >
      <Image src={token?.image} alt={token?.symbol} width={24} height={24} />
      {amount && <span>{amount}</span>}
      <span>{token?.symbol}</span>
    </button>
  );
}