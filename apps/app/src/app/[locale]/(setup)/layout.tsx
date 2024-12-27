import React from "react";
import MarqueeY from "@/components/marquee";
import { Icons } from "@bu/ui/icons";
import Link from "next/link";
import { Suspense } from "react";
import { UserMenu } from "@/components/user-menu";
import { Card } from "@bu/ui/card";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const marqueeText =
    "setup your account • add your team • start collaborating";
  return (
    <div className="flex w-full flex-col md:flex-row bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <MarqueeY text={marqueeText} className="left-0 bg-green-1000" />{" "}
      <div className="w-full max-w-2xl mx-auto p-6">
        <header className="w-full absolute left-0 right-0 z-10">
          <Card className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-lg bg-cerulean-400">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="flex items-center space-x-2">
                <Icons.Logo className="w-8 h-8" />
                <span className="font-bold text-xl">Bu Desk</span>
              </Link>
              <Suspense
                fallback={
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                }
              >
                <UserMenu onlySignOut />
              </Suspense>
            </div>
          </Card>
        </header>
        {children}
      </div>
    </div>
  );
}
