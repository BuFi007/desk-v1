"use client";

import { AutomaticPayments } from "@/constants/Contracts";
import { allTokens } from "@/constants/Tokens";
import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";
import { Input } from "@bu/ui/input";
import { Label } from "@bu/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@bu/ui/sheet";
import { useToast } from "@bu/ui/use-toast";
import type React from "react";
import { useState } from "react";
import { encodeFunctionData } from "viem";
import { useAccount, useSignTypedData } from "wagmi";
import { TokenSelect } from "./tokenSelect";
interface ForwardRequest {
  [key: string]: unknown;
  from: string;
  to: string;
  value: number;
  gas: number;
  nonce: number;
  data: string;
}

export function CreateRegularPaymentSheet() {
  const { signTypedDataAsync } = useSignTypedData();
  const { address } = useAccount();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const domain = {
    name: "TrustedForwarder",
    version: "1",
    verifyingContract:
      "0x607ECa0eEdb670E6b70B2F4BCfFeAac00C130aFf" as `0x${string}`,
  };

  const types = {
    authorizeRegularPayment: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "gas", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
  };

  const supabase = createClient();

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!amount || !token || !recipient) {
    //   toast({
    //     title: "Error",
    //     description: "Please fill in all fields",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsLoading(true);

    const value: ForwardRequest = {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      from: address! as `0x${string}`,
      to: recipient,
      value: Number.parseInt(amount),
      gas: 100000,
      nonce: 0,
      data: "0x",
    };

    try {
      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "authorizeRegularPayment",
        message: value,
      });

      // const encodedData = encodeFunctionData({
      //   abi: [
      //     {
      //       inputs: [
      //         { internalType: "address", name: "to", type: "address" },
      //         { internalType: "uint256", name: "amount", type: "uint256" },
      //         { internalType: "uint256", name: "frequency", type: "uint256" },
      //         { internalType: "uint256", name: "validUntil", type: "uint256" },
      //         {
      //           internalType: "address",
      //           name: "tokenAddress",
      //           type: "address",
      //         },
      //       ],
      //       name: "authorizePayment",
      //       outputs: [],
      //       stateMutability: "nonpayable",
      //       type: "function",
      //     },
      //   ],
      //   args: [
      //     recipient as `0x${string}`,
      //     BigInt(parseInt(amount)),
      //     BigInt(0),
      //     BigInt(0),
      //     token as `0x${string}`,
      //   ],
      // });

      // const requestData = {
      //   from: address,
      //   to: AutomaticPayments,
      //   value: parseInt(amount),
      //   gas: 100000,
      //   nonce: 0,
      //   data: encodedData,
      // };

      // const { data, error } = await supabase
      //   .from("regular_invoice")
      //   .insert([
      //     {
      //       sign: JSON.stringify(signature),
      //       address: address as string,
      //       requestData: JSON.stringify(requestData),
      //     },
      //   ])
      //   .select();

      toast({
        title: "Payment authorized",
        description: "Transaction is pending",
        variant: "default",
      });
      setIsOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Error signing the request",
        variant: "destructive",
      });
      console.error("Error signing:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <p>Connect your wallet to create a regular payment</p>
      </div>
    );
  return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4 h-screen">
           <h2 className="text-2xl font-bold">Create a Regular Payment </h2>        
        <p className="text-sm text-gray-500">
          Fill out the form below to generate a new invoice that you can bill to your account.
        </p>
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Create Regular Payment</Button>
      </SheetTrigger>
      <SheetContent className="w-full p-6 space-y-4">
        <SheetHeader>
          <SheetTitle>Create Regular Payment</SheetTitle>
          <SheetDescription>Set up a new regular payment</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSign} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </div>
          <div className="space-y-2">
            <TokenSelect
              value={token}
              onChange={setToken}
              tokens={allTokens}
              label="Select Token"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing..." : "Sign ForwardRequest"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
          </div>

  );
}
