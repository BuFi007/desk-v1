"use client";
import SparklesText from "@bu/ui/sparkles-text";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function BuLogo({
  logo,
  text,
  width,
  height,
}: {
  logo: string;
  text: string;
  width: number;
  height: number;
}) {
  const MotionLink = motion(Link);
  return (
    <div className="flex justify-center group z-100">
      <MotionLink
        href="/"
        whileHover={{ scale: 1.15, rotate: 4 }}
        whileTap={{ scale: 1.05, rotate: 2 }}
      >
        <div className="relative flex items-center">
          <SparklesText>
            <Image src={logo} alt="Bu Logo" width={width} height={height} />
          </SparklesText>
          <span className="absolute mt-28 sm:mt-20 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-rotate-12">
            <span className="inline-block pl-5 text-3xl font-clash bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              {text}
            </span>
          </span>
        </div>
      </MotionLink>
    </div>
  );
}
