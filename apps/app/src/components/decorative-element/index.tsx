"use client";

import { motion, MotionProps, TargetAndTransition } from "framer-motion";

interface DecorativeElementProps extends MotionProps {
  className: string;
}

export const getRandomPosition = () => Math.random() * 100 - 50;

const getContinuousMotion = (): TargetAndTransition => ({
  x: [getRandomPosition(), getRandomPosition()],
  y: [getRandomPosition(), getRandomPosition()],
  transition: {
    repeat: Infinity,
    repeatType: "mirror",
    duration: 10,
    ease: "linear",
  },
});

export const DecorativeElement = ({
  className,
  initial,
  animate,
  whileHover,
}: DecorativeElementProps) => {
  const continuousMotion = getContinuousMotion();
  const combinedAnimate: TargetAndTransition =
    typeof animate === "object"
      ? { ...(animate as TargetAndTransition), opacity: 1, ...continuousMotion }
      : { opacity: 1, ...continuousMotion };

  return (
    <motion.div
      className={className}
      initial={
        typeof initial === "object" ? { ...initial, opacity: 1 } : initial
      }
      animate={combinedAnimate}
      whileHover={whileHover}
    />
  );
};
