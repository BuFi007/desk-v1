import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const gradientTextVariants = cva(
  "font-clash bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-300",
  {
    variants: {
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
      },
      font: {
        clash: "font-clash",
        base: "font-base",
      },
      gradient: {
        default: "from-indigo-300 via-purple-400 to-cyan-300",
        purple: "from-purple-400 to-pink-600",
        blue: "from-blue-400 to-cyan-600",
        green: "from-green-400 via-green-1000 to-cyan-500",
        sunset: "from-red-500 via-orange-400 to-yellow-500",
        pink: "from-pink-400 via-pink-600 to-purple-500",
        white: "from-white via-white/60 to-gray-200",
        black: "from-black via-black/90 to-gray-900",
      },
    },
    defaultVariants: {
      size: "base",
      font: "clash",
      gradient: "default",
    },
  }
);

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {
  asChild?: boolean;
  showHoverAnimation?: boolean;
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  (
    {
      className,
      size,
      font,
      gradient,
      showHoverAnimation = false,
      children,
      ...props
    },
    ref
  ) => {
    const content = (
      <span
        ref={ref}
        className={cn(
          gradientTextVariants({ size, font, gradient }),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );

    if (showHoverAnimation) {
      return (
        <span className="absolute mt-28 sm:mt-20 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-rotate-12">
          <span className="inline-block pl-5">{content}</span>
        </span>
      );
    }

    return content;
  }
);

GradientText.displayName = "GradientText";

export { GradientText, gradientTextVariants };
