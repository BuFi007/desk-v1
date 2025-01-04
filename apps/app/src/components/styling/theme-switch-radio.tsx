"use client";

import * as React from "react";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { SidebarMenu, SidebarMenuItem, useSidebar } from "@bu/ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "@bu/ui/button";
import { RadioGroup, RadioGroupItem } from "@bu/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@bu/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@bu/ui/tooltip";

import { colorMap } from "./color-data";

const THEMES = ["yellow", "blue", "green", "red", "purple"];
export function ThemeSwitcherRadio() {
  const { theme } = useTheme();
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const [selectedTheme, setSelectedTheme] = React.useState<string>("blue");

  React.useEffect(() => {
    // Get theme from cookie first, fallback to localStorage
    const savedColorTheme =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("colorTheme="))
        ?.split("=")[1] ||
      localStorage.getItem("colorTheme") ||
      "blue";

    setSelectedTheme(savedColorTheme);
    applyColorTheme(savedColorTheme, theme === "dark");
  }, [theme]);

  const applyColorTheme = (newTheme: string, isDark: boolean) => {
    const palette = colorMap[newTheme];
    if (palette && typeof window !== "undefined") {
      const r = window.document.querySelector(":root") as HTMLElement;
      r.style.setProperty("--main", palette.main);
      r.style.setProperty("--main50", palette.main + "b3");
      r.style.setProperty("--bg", isDark ? palette.darkBg : palette.bg);

      // Set both cookie and localStorage
      document.cookie = `colorTheme=${newTheme}; path=/; max-age=31536000`; // 1 year
      localStorage.setItem("colorTheme", newTheme);
      localStorage.setItem("color", JSON.stringify(palette));
    }
  };

  const handleSelectTheme = React.useCallback(
    (newTheme: string) => {
      setSelectedTheme(newTheme);
      applyColorTheme(newTheme, theme === "dark");
    },
    [theme],
  );
  const getCurrentThemeColor = () => {
    return colorMap[selectedTheme]?.main;
  };

  // Updated ExpandedThemeSelector component
  const ExpandedThemeSelector = () => (
    <div className="w-full flex items-center justify-between">
      <fieldset className="flex-grow">
        <legend className="sr-only">Choose a theme</legend>
        <RadioGroup
          className="flex gap-1.5"
          value={selectedTheme}
          onValueChange={handleSelectTheme}
        >
          {THEMES.map((t) => (
            <RadioGroupItem
              key={t}
              value={t}
              id={`radio-${t}`}
              aria-label={t}
              style={{
                backgroundColor: colorMap[t]?.main,
                borderColor: colorMap[t]?.main,
              }}
              className="size-4 shadow-none data-[state=checked]:border-2"
            />
          ))}
        </RadioGroup>
      </fieldset>
      <ThemeSwitcher />
    </div>
  );

  const CollapsedThemeSelector = () => (
    <div className="flex flex-col items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
          >
            <div
              className="h-6 w-6 rounded-full border border-primary flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: getCurrentThemeColor() }}
            >
              <Palette className="h-4 w-4 text-primary-foreground" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-1" align="start">
          <RadioGroup
            value={selectedTheme}
            onValueChange={handleSelectTheme}
            className="flex gap-2"
          >
            <TooltipProvider>
              {THEMES.map((t) => (
                <Tooltip key={t}>
                  <TooltipTrigger asChild>
                    <RadioGroupItem
                      value={t}
                      id={`radio-${t}`}
                      className="h-5 w-5 rounded-full border-2 border-muted p-0 flex items-center justify-center cursor-pointer data-[state=checked]:border-primary transition-all duration-200 ease-in-out"
                      style={{
                        backgroundColor: colorMap[t]?.main,
                      }}
                    >
                      {selectedTheme === t && (
                        <Palette className="h-3 w-3 text-primary-foreground" />
                      )}
                      <span className="sr-only">{t}</span>
                    </RadioGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="capitalize">{t}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <ThemeSwitcher />
    </div>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem className="p-2">
        <div className="w-full">
          {isExpanded ? (
            <>
              {" "}
              <span className="text-xs text-primary-foreground">Theme</span>
              <ExpandedThemeSelector />
            </>
          ) : (
            <CollapsedThemeSelector />
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
