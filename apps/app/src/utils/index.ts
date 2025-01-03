import { BLOCKSCOUT_EXPLORERS } from "@/constants";
import { PEANUTAPIKEY } from "@/constants/Env";
import type {
  Chain,
  ExtendedPaymentInfo,
  IGetLinkDetailsResponse,
  IGetRequestLinkDetailsProps,
  IGetRequestLinkDetailsResponse,
} from "@/types";
import { toast } from "@bu/ui/use-toast";
import peanut, { getLinkDetails } from "@squirrel-labs/peanut-sdk";

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
  setPaymentInfo: (paymentInfo: ExtendedPaymentInfo) => void,
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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error fetching link details:", error.message);
    toast({
      title: "Error",
      description: "Error fetching link details",
      variant: "destructive",
    });
  }
};

export async function getLinkDetailsRequest(
  id: string,
): Promise<IGetRequestLinkDetailsResponse> {
  try {
    const host = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const props: IGetRequestLinkDetailsProps = {
      uuid: id,
      APIKey: PEANUTAPIKEY ?? "",
    };
    console.log("here are the propsprops", props);
    const linkDetails = await peanut.getRequestLinkDetails(props);
    console.log("linkDetails", linkDetails);
    return linkDetails;
  } catch (error) {
    console.error("Error in getLinkDetailsRequest:", error);
    throw error;
  }
}

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

import type { TZDate } from "@date-fns/tz";
import {
  differenceInDays,
  differenceInMonths,
  format,
  isSameYear,
  startOfDay,
} from "date-fns";
import { ethers } from "ethers";

export function formatSize(bytes: number): string {
  const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];

  const unitIndex = Math.max(
    0,
    Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1),
  );

  return Intl.NumberFormat("en-US", {
    style: "unit",
    unit: units[unitIndex],
  }).format(+Math.round(bytes / 1024 ** unitIndex));
}

type FormatAmountParams = {
  currency: string;
  amount: number;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

export function formatAmount({
  currency,
  amount,
  locale = "en-US",
  minimumFractionDigits,
  maximumFractionDigits,
}: FormatAmountParams) {
  if (!currency) {
    return;
  }

  return Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

export function secondsToHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours && minutes) {
    return `${hours}:${minutes.toString().padStart(2, "0")}h`;
  }

  if (hours) {
    return `${hours}h`;
  }

  if (minutes) {
    return `${minutes}m`;
  }

  return "0h";
}

type BurnRateData = {
  value: number;
  date: string;
};

export function calculateAvgBurnRate(data: BurnRateData[] | null) {
  if (!data) {
    return 0;
  }

  return data?.reduce((acc, curr) => acc + curr.value, 0) / data?.length;
}

export function formatDate(date: string, dateFormat?: string) {
  if (isSameYear(new Date(), new Date(date))) {
    return format(new Date(date), "MMM d");
  }

  return format(new Date(date), dateFormat ?? "P");
}

export function getInitials(value: string) {
  const formatted = value.toUpperCase().replace(/[\s.-]/g, "");

  if (formatted.split(" ").length > 1) {
    return `${formatted.charAt(0)}${formatted.charAt(1)}`;
  }

  if (value.length > 1) {
    return formatted.charAt(0) + formatted.charAt(1);
  }

  return formatted.charAt(0);
}

export function formatAccountName({
  name,
  currency,
}: {
  name?: string;
  currency?: string;
}) {
  if (currency) {
    return `${name} (${currency})`;
  }

  return name;
}

export function formatDateRange(dates: TZDate[]): string {
  if (!dates.length) return "";

  const formatFullDate = (date: TZDate) => format(date, "MMM d");
  const formatDay = (date: TZDate) => format(date, "d");

  if (dates.length === 1 || dates[0]?.getTime() === dates[1]?.getTime()) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return formatFullDate(dates[0]!);
  }

  const startDate = dates[0];
  const endDate = dates[1];

  if (!startDate || !endDate) return "";

  if (startDate.getMonth() === endDate.getMonth()) {
    // Same month
    return `${format(startDate, "MMM")} ${formatDay(startDate)} - ${formatDay(
      endDate,
    )}`;
  }
  // Different months
  return `${formatFullDate(startDate)} - ${formatFullDate(endDate)}`;
}

export function getDueDateStatus(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);

  // Set both dates to the start of their respective days
  const nowDay = startOfDay(now);
  const dueDay = startOfDay(due);

  const diffDays = differenceInDays(dueDay, nowDay);
  const diffMonths = differenceInMonths(dueDay, nowDay);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  if (diffDays > 0) {
    if (diffMonths < 1) return `in ${diffDays} days`;
    return `in ${diffMonths} month${diffMonths === 1 ? "" : "s"}`;
  }

  if (diffMonths < 1)
    return `${Math.abs(diffDays)} day${
      Math.abs(diffDays) === 1 ? "" : "s"
    } ago`;
  return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ] as const;

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count}${interval.label} ago`;
    }
  }

  return "just now";
}
