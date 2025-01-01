"use client";

import type { BlockchainContextProps } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { useAccount, useChainId } from "wagmi";

const BlockchainContext = createContext<BlockchainContextProps | undefined>(
  undefined
);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
};

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null | undefined>();

  const { address: addressFromWagmi, isConnected: isConnectedWagmi } =
    useAccount();

  const [isConnected, setIsConnected] = useState(false);
  const chainId = useChainId();

  useEffect(() => {
    setAddress(addressFromWagmi || null);
    setIsConnected(isConnectedWagmi);
    if (addressFromWagmi) {
      /// supabase update user wallet
    }
  }, [isConnectedWagmi, addressFromWagmi]);

  return (
    <BlockchainContext.Provider
      value={{
        address: address || "",
        isConnected,
        chainId,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
