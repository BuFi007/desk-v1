"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@bu/ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-lg hover:bg-sidebar-accent active:scale-95 transition-all"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-4 w-4 hidden dark:inline text-sidebar-foreground" />
      <Moon className="h-4 w-4 inline dark:hidden text-sidebar-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
