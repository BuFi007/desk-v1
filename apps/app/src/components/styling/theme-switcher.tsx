"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "@bu/ui/button";
import { colorMap } from "@/components/styling/color-data";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Set theme cookie
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`; // 1 year

    // Update bg color based on new theme and current color theme
    const colorTheme =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("colorTheme="))
        ?.split("=")[1] ||
      localStorage.getItem("colorTheme") ||
      "blue";

    const palette = colorMap[colorTheme];
    if (palette && typeof window !== "undefined") {
      const r = window.document.querySelector(":root") as HTMLElement;
      r.style.setProperty(
        "--bg",
        newTheme === "dark" ? palette.darkBg : palette.bg
      );
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-lg hover:bg-sidebar-accent active:scale-95 transition-all"
      onClick={toggleTheme}
    >
      <Sun className="h-8 w-8 hidden dark:inline text-sidebar-foreground" />
      <Moon className="h-8 w-8 inline dark:hidden text-sidebar-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
