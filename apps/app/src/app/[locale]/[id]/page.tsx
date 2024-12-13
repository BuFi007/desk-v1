"use client";

import { Hex } from "viem";
import { useEffect, useState } from "react";
import { ChainSelect } from "@/components/chainSelect";
import PresetAmountButtons from "@/components/presetAmounts";
import { Button } from "@bu/ui/button";
import { Skeleton } from "@bu/ui/skeleton";
import CurrencyDisplayer from "@/components/currency";

import { useGetTokensOrChain } from "@/hooks/useTokensOrChain";
import { Chain, ChainList, Token } from "@/types";
import { AllChains as allChains } from "@/constants/Chains";
import { useChainId, useEnsName, useSwitchChain } from "wagmi";
import { useParams } from "next/navigation";

export default function PayId() {
  const params = useParams();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [amount, setAmount] = useState<string>("1");
  const [receiver, setReceiver] = useState<string>("");
  const [ensNotFound, setEnsNotFound] = useState<boolean>(false);
  const [ensName, setEnsName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const id = params.id;
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const availableTokens = useGetTokensOrChain(chainId!, "tokens") as Token[];
  const queryString = window.location.search;
  const amountParam = new URLSearchParams(queryString);
  const presetAmount = amountParam?.get("amount");
  const tokenParam = amountParam?.get("token");
  const chainParam = amountParam?.get("chain");

  const ensNameEthers = useEnsName({
    address: id as Hex,
    chainId: (useGetTokensOrChain(chainId!, "chain") as Chain)
      ?.chainId as ChainList,
  });

  async function getEnsAddress() {
    setLoading(true);
    try {
      setReceiver(id as Hex);

      setEnsName(ensNameEthers?.data!);
      setReceiver(id as Hex);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEnsAddress();
  }, []);

  //   const sameTargetChain = chainId === 43113;

  if (loading) return <Skeleton className="w-full h-full" />;

  function handleAmountSelect(amount: number) {
    setAmount(amount.toString());
  }
  const tokenFind = availableTokens?.filter(
    (token) => token?.symbol === tokenParam
  );
  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex flex-col w-full max-w-l">
        {!ensNotFound ? (
          <>
            {/* <BuIdentity address={receiver as Hex} ensName={ensName} /> */}
            <div className="flex justify-center space-x-2 mt-4">
              <PresetAmountButtons onAmountSelect={handleAmountSelect} />
            </div>

            <div className="flex justify-center w-full my-4">
              <div className="text-center">
                <ChainSelect
                  value={chainId?.toString()!}
                  onChange={(value: string) => {
                    if (value) {
                      switchChain({
                        chainId: Number(value!) as ChainList,
                      });
                    }
                  }}
                  label="Select Chain"
                  chains={allChains}
                />
              </div>
            </div>

            <CurrencyDisplayer
              tokenAmount={amount}
              initialAmount={presetAmount ? Number(presetAmount) : 0}
              onValueChange={(value) => setAmount(value.toString())}
              availableTokens={
                tokenParam ? (tokenFind as Token[]) : availableTokens
              }
              onTokenSelect={setSelectedToken}
              currentNetwork={chainId!}
              defaultToken={tokenParam ? tokenFind?.[0] : undefined}
              action="pay"
            />

            <div className="flex flex-col w-full space-y-2 pt-4">
              {/* {sameTargetChain ? (
                <>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Transfer
                  </Button>
                </>
              ) : (
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Send Tokens
                </Button>
              )} */}
            </div>
          </>
        ) : (
          <section className="flex flex-col items-center justify-center w-full">
            <h1 className="text-xl font-bold">ENS NOT FOUND</h1>
          </section>
        )}
      </div>
    </div>
  );
}
