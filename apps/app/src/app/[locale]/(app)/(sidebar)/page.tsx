"use client";

import Overview from "@/components/overview";
import WalletNotFound from "@/components/wallet-not-found";
import { useAccount } from "wagmi";
import { Suspense } from "react";

export default async function Page() {
  const { isConnected } = useAccount();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {isConnected ? <Overview searchParams={{}} /> : <WalletNotFound />}
      </Suspense>
    </>
  );
}



