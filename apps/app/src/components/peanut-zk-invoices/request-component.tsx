"use client";

import { getLinkDetailsRequest } from "@/utils";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function InvoicePage() {
  const [linkDetails, setLinkDetails] = useState<any>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Extract just the ID from the pathname
        const id = pathname.split("/").filter(Boolean).pop();

        if (!id) {
          console.error("No ID found in URL");
          return;
        }

        // Construct a proper URL for the peanut SDK
        const baseUrl = window.location.origin;
        const fullUrl = `${baseUrl}${pathname}`;

        const details = await getLinkDetailsRequest(fullUrl);
        console.log("linkDetails", details);
        setLinkDetails(details);
      } catch (error) {
        console.error("Error fetching link details:", error);
      }
    };

    fetchDetails();
  }, [pathname]);

  if (!linkDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-screen p-10">
      <div>Hello {linkDetails?.recipientAddress}</div>
    </main>
  );
}
