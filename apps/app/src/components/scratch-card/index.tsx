"use client";

import ScratchToRevealEmoji from "@bu/ui/scratch-emoji";

export default async function ScratchCard() {
  const handleComplete = () => {
    // Do Something
  };

  return (
    <>
      <ScratchToRevealEmoji
        width={64}
        height={64}
        minScratchPercentage={70}
        className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
        onComplete={handleComplete}
        gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      >
        <p className="text-9xl">👻</p>
      </ScratchToRevealEmoji>
    </>
  );
}
