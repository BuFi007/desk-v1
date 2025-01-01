"use client";

import type { IGetRequestLinkDetailsResponse } from "@/types";
import { getLinkDetailsRequest } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvoicePage() {
  const [linkDetails, setLinkDetails] = useState<IGetRequestLinkDetailsResponse | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const id = searchParams.get("id");
        if (!id) {
          console.error("No ID found in URL");
          return;
        }

        const details = await getLinkDetailsRequest(id);
        setLinkDetails(details);
      } catch (error) {
        console.error("Error fetching link details:", error);
      }
    };

    fetchDetails();
  }, [searchParams]);

  if (!linkDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-screen p-10">
      <div>Hello {linkDetails.recipientAddress}</div>
      <div>Token Amount {linkDetails.tokenAmount}</div>
      <div>Token Address {linkDetails.tokenAddress}</div>
      <div>Token Decimals {linkDetails.tokenDecimals}</div>
      <div>Token Symbol {linkDetails.tokenSymbol}</div>
      <div>Token Type {linkDetails.tokenType}</div>
      <div>Created At {linkDetails.createdAt}</div>
      <div>Updated At {linkDetails.updatedAt}</div>
      <div>UUID {linkDetails.uuid}</div>
      <div>Link {linkDetails.link}</div>
      <div>Chain ID {linkDetails.chainId}</div>
      <div>Status {linkDetails.status}</div>
      <div>Reference {linkDetails.reference}</div>
      <div>Attachment URL {linkDetails.attachmentUrl}</div>
      <div>Payer Address {linkDetails.payerAddress}</div>
      <div>Track ID {linkDetails.trackId}</div>
      <div>Destination Chain Fulfillment Hash {linkDetails.destinationChainFulfillmentHash}</div>
      <div>Origin Chain Fulfillment Hash {linkDetails.originChainFulfillmentHash}</div>
    </main>
  );
}