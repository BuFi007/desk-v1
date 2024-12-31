"use client";

import { BuLogo } from "@bu/ui/bu-logo";
import { Button } from "@bu/ui/button";
import React from "react";
import { twMerge } from "tailwind-merge";
import Hamburger from "./hamburger";

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="sticky top-0 z-10 flex h-20 w-full items-center justify-between border-2 border-slate-900 bg-nepal-100 px-4 md:px-24">
        <h1 className="text-shadow-neo scroll-m-20 font-Space_Grotesk text-4xl font-extrabold tracking-tight text-cerulean-400 lg:text-5xl">
          <BuLogo
            logo="/logo.png"
            text="Bu Desk"
            width={50}
            height={50}
          />
        </h1>
        {/* Desktop Navbar */}
        <div className="hidden gap-8 md:flex">
          <a href="https://defi.bu.finance" className="text-xl text-slate-900">
            Loan and Borrow
          </a>
          <a href="https://bu.finance" className="text-xl text-slate-900">
            Website
          </a>
          <a href="https://doc.bu.finance" className="text-xl text-slate-900">
            Docs
          </a>
        </div>
        <Button className="hidden md:block">Sign Up</Button>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {isOpen && (
        <div
          className={twMerge(
            "flex flex-col divide-y-4 divide-slate-900 border-2 sticky top-[80px] z-10 bg-nepal-100 border-slate-900"
          )}
        >
          <a
            href="https://defi.bu.finance"
            className="py-2 text-center text-xl text-slate-900"
          >
            Loan and Borrow
          </a>
          <a
            href="https://bu.finance"
            className="py-2 text-center text-xl text-slate-900"
          >
            Website
          </a>
          <a
            href="https://doc.bu.finance"
            className="py-2 text-center text-xl text-slate-900"
          >
            Docs
          </a>
        </div>
      )}
    </>
  );
}
