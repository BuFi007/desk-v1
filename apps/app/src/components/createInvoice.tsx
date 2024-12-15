"use client";

import { ApproveERC20 } from "./blockchain/functions";
import { useEthersSigner } from "@/constants/wagmi";
// import { createFhevmInstance, getInstance, init } from "@/lib/zama";
import { Input } from "@bu/ui/input";
import { Label } from "@bu/ui/label";
import { toast } from "@bu/ui/use-toast";

import { useEffect, useState } from "react";

export const CreateInvoice = () => {
  const signer = useEthersSigner();
  // useEffect(() => {
  //   init().then(() => {
  //     createFhevmInstance().then((instance) => {});
  //   });
  // }, []);

  // const instance = getInstance();

  // useEffect(() => {
  //   const fhevm = window.fhevm;
  //   console.log(fhevm, "fhevm");
  // }, []);

  // console.log(instance, "instance");

  function handleCreateInvoice() {
    if (!signer) return;

    const tx = ApproveERC20(
      process.env.NEXT_PUBLIC_USDC_ADDRESS!,
      process.env.NEXT_PUBLIC_USDC_SPENDER_ADDRESS!,
      signer,
      "1000000000000000000000000"
    );

    toast({
      title: "Approved",
      description: "Approved",
      variant: "default",
    });
  }
  return (
    <section className="flex flex-col gap-4">
      <Label>Select Token</Label>

      <Input />
      <Input />
    </section>
  );
};
