import peanut from "@squirrel-labs/peanut-sdk";
import { PEANUTAPIKEY } from "@/constants/Env";

import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { link: string };
}): Promise<Metadata> {
  try {
    const queryString = searchParams.link as string;

    if (!queryString) {
      return {
        title: "Invalid Invoice Link",
        robots: { index: false, follow: false },
      };
    }

    const details = await peanut.getRequestLinkDetails({
      link: queryString,
      APIKey: PEANUTAPIKEY!,
    });

    if (!details) {
      return {
        title: "Invoice Not Found",
        robots: { index: false, follow: false },
      };
    }

    const {
      recipientAddress: recipientAddress,
      tokenAmount: amount,
      tokenSymbol: token,
    } = details;

    const title = `Invoice request from ${recipientAddress}`;
    const description = `Pay now ${amount} ${token}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Invalid Invoice",
      robots: { index: false, follow: false },
    };
  }
}
