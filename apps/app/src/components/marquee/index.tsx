"use client";

import { usePathname } from "next/navigation";
import React from "react";
import InteractiveScroll from "@bu/ui/scroll-infinity-y";

interface MarqueeYProps {
  className?: string;
  text: string;
  showOnPath?: string;
}

const MarqueeY: React.FC<MarqueeYProps> = ({ className, text, showOnPath }) => {
  const pathname = usePathname();
  const showOnHomepage = pathname === showOnPath;

  return (
    <div
      className={`fixed hidden md:flex flex-col w-12 gap-10 overflow-hidden border-r-2 border-black dark:border-gray-700 md:w-auto md:px-8 ${
        showOnHomepage ? "md:block" : "md:block"
      } ${className}`}
    >
      <InteractiveScroll>
        <h2 className="flex flex-col items-center text-sm rotate-180 md:text-xl text-black dark:text-white">
          {text.split("").map((char, index) => (
            <span key={index} className="flex items-center rotate-90">
              {char === " " ? <>&nbsp;</> : char}
            </span>
          ))}
        </h2>
      </InteractiveScroll>
    </div>
  );
};

export default MarqueeY;

