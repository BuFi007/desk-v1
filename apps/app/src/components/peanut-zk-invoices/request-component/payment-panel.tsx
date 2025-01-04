"use client";

import FulfillRequestLink from "@/components/peanut-zk-invoices/fulfill-request-link";
import { TokenSelect } from "@/components/tokenSelect";
import { useInvoice } from "@/store/invoice-request/index";
import { truncateAddress } from "@/utils";
export function PaymentPanel() {
  const { linkDetails, isLoading, error } = useInvoice();

  const chainMapping = {
    11155111: "Sepolia",
    324: "Base",
    300: "Base",
    10: "Optimism",
    97: "BscTestnet",
    56: "Bsc",
  };

  const contractMapping = {
    "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85": "USDC",
    "0x64544969ed7EBf5f083679233325356EbE738930": "USDC",
    "0x0000000000000000000000000000000000000000": "ETH",
  };
  const tokenaddress = linkDetails?.tokenAddress;
  const chainId = linkDetails?.chainId;
  const chainName =
    chainMapping[chainId as unknown as keyof typeof chainMapping] ?? "Unknown";
  const tokenTicker =
    contractMapping[tokenaddress as unknown as keyof typeof contractMapping] ??
    "Unknown";

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!linkDetails) return null;

  const isUnclaimed = linkDetails.status === "PENDING";
  const recipient = linkDetails.recipientAddress
    ? truncateAddress(linkDetails.recipientAddress)
    : "";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-secondaryBlack">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xl font-semibold">
            <span role="img" aria-label="money ghost">
              💸👻💸
            </span>
            <span>Invoice Summary</span>
          </div>
          {isUnclaimed ? (
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              PENDING
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              FULFILLED
            </span>
          )}
        </div>

        {/* --- Top Section: Who is requesting & how much --- */}
        <div className="text-center">
          <h2 className="text-md font-medium text-gray-700 dark:text-gray-200">
            {recipient} is requesting
          </h2>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {linkDetails.tokenAmount} ${tokenTicker}{" "}
            <span className="text-sm text-gray-500 dark:text-gray-400">on</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {chainName}
          </p>
        </div>

        {/* Invoice Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-medium text-gray-500 dark:text-gray-400">
              Invoice Created
            </div>
            <div className="text-gray-800 dark:text-gray-200">
              {new Date(linkDetails.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Fulfill Request or Fulfilled State */}
        <div className="mt-8">
          {isUnclaimed ? (
            <FulfillRequestLink
              link={linkDetails.link}
              amount={linkDetails.tokenAmount}
              symbol={linkDetails.tokenSymbol ?? ""}
            />
          ) : (
            <div className="rounded-lg bg-green-100 p-4 text-center dark:bg-green-900/25">
              <p className="font-medium text-green-800 dark:text-green-300">
                This payment has been fulfilled
              </p>
              <p className="mt-1 truncate text-sm text-green-700 dark:text-green-400">
                Transaction Hash: {linkDetails.destinationChainFulfillmentHash}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
