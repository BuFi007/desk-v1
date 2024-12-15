"use client";

import React, { useState } from "react";
import { useAccount, useSignTypedData } from "wagmi";
import { encodeFunctionData } from "viem";
import { AutomaticPayments } from "@/constants/Contracts";
import { useToast } from "@bu/ui/use-toast";
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
import { TokenSelect } from "./tokenSelect";
import { allTokens } from "@/constants/Tokens";

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

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !token || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const value: ForwardRequest = {
      from: address || "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
      to: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
      value: parseInt(amount),
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

      const encodedData = encodeFunctionData({
        abi: [
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              { internalType: "uint256", name: "frequency", type: "uint256" },
              { internalType: "uint256", name: "validUntil", type: "uint256" },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
            ],
            name: "authorizePayment",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        args: [
          recipient as `0x${string}`,
          BigInt(parseInt(amount)),
          BigInt(0),
          BigInt(0),
          token as `0x${string}`,
        ],
      });

      const requestData = {
        from: address,
        to: AutomaticPayments,
        value: parseInt(amount),
        gas: 100000,
        nonce: 0,
        data: encodedData,
      };

      toast({
        title: "Payment authorized",
        description: "You can now receive payments",
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Create Regular Payment</Button>
      </SheetTrigger>
      <SheetContent>
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
  );
}
