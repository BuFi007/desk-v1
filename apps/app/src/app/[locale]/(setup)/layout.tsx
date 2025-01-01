import MarqueeY from "@/components/marquee";
import { UserMenu } from "@/components/user-menu";
import { getUser } from "@bu/supabase/cached-queries";
import { Alert, AlertDescription, AlertTitle } from "@bu/ui/alert";
import { BuLogo } from "@bu/ui/bu-logo";
import { Card } from "@bu/ui/card";
import { GradientText } from "@bu/ui/gradient-text";
import { Icons } from "@bu/ui/icons";
import type React from "react";
import { Suspense } from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const marqueeText =
    "setup your account • add your team • start collaborating";

  const userData = await getUser();
  const name = userData?.data?.full_name ?? "User";

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <MarqueeY text={marqueeText} className="left-0 bg-green-1000" />
      <div className="flex flex-col flex-1 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        {/* Header Section */}
        <div className="w-full px-2 sm:px-4 md:px-6 pt-4">
          <div className="flex flex-col items-center gap-4">
            <Card className="w-[94%] sm:w-[90%] md:w-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8 shadow-lg bg-cerulean-400">
              <div className="flex justify-between items-center py-3 sm:py-4 md:py-6">
                <div className="flex-shrink-0">
                  <BuLogo
                    text=""
                    logo="/logo.png"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base font-medium hidden sm:inline-block">
                    Hi,{" "}
                    <GradientText
                      size="base"
                      className="tracking-tight font-bold"
                      gradient="black"
                    >
                      {name}
                    </GradientText>
                  </span>
                  <Suspense
                    fallback={
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-200 rounded-full animate-pulse" />
                    }
                  >
                    <UserMenu onlySignOut />
                  </Suspense>
                </div>
              </div>
            </Card>
            <Alert className="w-[94%] sm:w-[90%] md:w-full max-w-2xl bg-green-1000">
              <Icons.AIOutline className="h-6 w-6" />
              <AlertTitle>Setup your Account</AlertTitle>
              <AlertDescription>
                Please finish these last new steps to setup your Bu Desk account
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
