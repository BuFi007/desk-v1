"use client";

import type { IGetRequestLinkDetailsResponse } from "@/types";
import { getLinkDetailsRequest } from "@/utils";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type InvoiceContextType = {
  linkDetails: IGetRequestLinkDetailsResponse | null;
  isLoading: boolean;
  error: Error | null;
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [linkDetails, setLinkDetails] =
    useState<IGetRequestLinkDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const id = searchParams.get("id");
        if (!id) {
          throw new Error("No ID found in URL");
        }

        const details = await getLinkDetailsRequest(id);
        setLinkDetails(details);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [searchParams]);

  return (
    <InvoiceContext.Provider value={{ linkDetails, isLoading, error }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
}
