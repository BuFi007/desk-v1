"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../button";

const SidebarLoanBorrowCta = () => {
  return (
    <section className="w-full p-4 shadow-none">
      <div className="container">
        <div className="relative flex flex-col items-start justify-between gap-2 md:flex-row md:gap-0">
          <img
            src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            className="absolute left-0 top-0 z-[-1] h-full w-full rounded-2xl object-cover md:block"
          />
          <Link
            href="https://defi.bu.finance?tab=loan"
            target="_blank"
            className="group relative flex h-[600px] w-full cursor-pointer flex-col items-start gap-8 p-10 transition-all duration-300 md:w-1/2 hover:md:w-2/3"
          >
            <div className="absolute left-0 top-0 z-[-1] h-full w-full rounded-2xl bg-transparent transition-all duration-300 group-hover:bg-black/10" />
            <Button
              variant="outline"
              className="rounded-full border-0 bg-white bg-opacity-30 text-white"
            >
              Loan
            </Button>
            <h1 className="text-5xl text-white">Loan & Earn</h1>
            <p className="max-w-80 text-left text-white">
              Provide liquidity to our money market protocol and earn yield from
              multiple DeFi protocols. Maximize your returns with our innovative
              index-based lending.
            </p>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-white outline-none transition-all duration-300"
            >
              Start Lending <ArrowUpRight strokeWidth="1" />
            </Button>
          </Link>
          <div className="relative hidden h-[600px] w-5 bg-white md:block">
            <div className="absolute left-[-40px] top-0 h-[40px] w-[40px] rounded-[1rem] shadow-[10px_-10px_0_0_#fff]" />
            <div className="absolute right-[-40px] top-0 h-[40px] w-[40px] rounded-[1rem] shadow-[-10px_-10px_0_0_#fff]" />
            <div className="absolute bottom-0 left-[-40px] h-[40px] w-[40px] rounded-[1rem] shadow-[10px_10px_0_0_#fff]" />
            <div className="absolute bottom-0 right-[-40px] h-[40px] w-[40px] rounded-[1rem] shadow-[-10px_10px_0_0_#fff]" />
          </div>
          <Link
            href="https://defi.bu.finance?tab=borrow"
            target="_blank"
            className="group relative flex h-[600px] w-full cursor-pointer flex-col items-end gap-8 p-10 transition-all duration-300 md:w-1/2 hover:md:w-2/3"
          >
            <div className="absolute left-0 top-0 z-[-1] h-full w-full rounded-2xl bg-transparent transition-all duration-300 group-hover:bg-black/10" />
            <Button
              variant="outline"
              className="rounded-full border-0 bg-white bg-opacity-30 text-white"
            >
              Borrow
            </Button>
            <h1 className="text-right text-5xl text-white md:text-left">
              Access Liquidity
            </h1>
            <p className="max-w-80 text-right text-white md:text-left">
              Borrow against your crypto assets with competitive rates. Our
              money market protocol leverages multiple DeFi platforms to offer
              you the best terms and flexibility.
            </p>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-white outline-none transition-all duration-300"
            >
              Start Borrowing <ArrowUpRight strokeWidth="1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SidebarLoanBorrowCta;
