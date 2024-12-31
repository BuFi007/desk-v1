"use client";

import { Button } from "@bu/ui/button";
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { cn } from "../../../utils/cn";
import { Card } from "../../card";

interface SidebarLoanBorrowCtaProps {
  isExpanded: boolean;
  loanIcon: LucideIcon;
}

const SidebarLoanBorrowCta = ({ isExpanded, loanIcon: LoanIcon }: SidebarLoanBorrowCtaProps) => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  if (!isExpanded) {
    return (
      <div className="flex flex-col items-center space-y-4 p-2">
        <Link href="https://defi.bu.finance?tab=loan" target="_blank">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <LoanIcon className="h-4 w-4" />
            <span className="sr-only">Loan</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className=" bg-main z-10">
      <div className="bg-transparent z-40">
    <div className="container p-1">
      <div className="relative flex h-[100px] items-stretch justify-between rounded-sm overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-[-1] h-full w-full rounded-2xl object-cover md:block"
        />

        {/* Left Panel */}
        <Link
          href="https://defi.bu.finance?tab=loan"
          target="_blank"
          className={cn(
            "group relative flex cursor-pointer flex-col items-start justify-between p-2 transition-all duration-300",
            hoveredSide === 'left' ? 'w-2/3' : 'w-1/2',
            hoveredSide === 'right' ? 'w-1/3' : 'w-1/2'
          )}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className={cn(
            "absolute left-0 top-0 z-0 h-full w-full bg-white bg-opacity-10 transition-all duration-300",
            hoveredSide === 'left' ? 'opacity-100' : 'opacity-0'
          )} />
          <Button
            variant="outline"
            size="xs"
            className="relative z-10 rounded-full border-0 bg-white bg-opacity-30 text-white text-xs px-2 py-1"
          >
            Loan
          </Button>
          {hoveredSide === 'left' && (
            <div className="relative z-10 mt-2 flex items-center text-white">
              <span className="mr-1">Go to Loan</span>
              <ArrowUpRight size={16} />
            </div>
          )}
        </Link>

        {/* Divider */}
        <div className="relative z-10 hidden w-1 bg-white bg-opacity-30 md:block" />

        {/* Right Panel */}
        <Link
          href="https://defi.bu.finance?tab=borrow"
          target="_blank"
          className={cn(
            "group relative flex cursor-pointer flex-col items-end justify-between p-2 text-right transition-all duration-300",
            hoveredSide === 'right' ? 'w-2/3' : 'w-1/2',
            hoveredSide === 'left' ? 'w-1/3' : 'w-1/2'
          )}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className={cn(
            "absolute left-0 top-0 z-0 h-full w-full bg-white bg-opacity-10 transition-all duration-300",
            hoveredSide === 'right' ? 'opacity-100' : 'opacity-0'
          )} />
          <Button
            variant="outline"
            size="xs"
            className="relative z-10 rounded-full border-0 bg-white bg-opacity-30 text-white text-xs px-2 py-1"
          >
            Borrow
          </Button>
          {hoveredSide === 'right' && (
            <div className="relative z-10 mt-2 flex items-center text-white">
              <span className="mr-1">Go to Borrow</span>
              <ArrowUpRight size={16} />
            </div>
          )}
        </Link>
      </div>
    </div>
    </div>
    </Card>
  );
};

export default SidebarLoanBorrowCta;

