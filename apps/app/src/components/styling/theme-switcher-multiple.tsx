"use client";

import * as React from "react";
import { ChevronsUpDown, Circle, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bu/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@bu/ui/sidebar";
import { ThemeSwitcher } from "@bu/ui/theme-switcher";

import { colorMap } from "./color-data";

const THEMES = ["yellow", "blue", "green", "red", "purple"];

export function ThemeSwitcherMultiple() {
  const { theme, setTheme } = useTheme();
  const { state, isMobile } = useSidebar();
  const isExpanded = state === "expanded";
  const [selectedTheme, setSelectedTheme] = React.useState<string>(
    theme || "blue"
  );

  React.useEffect(() => {
    setSelectedTheme(theme || "blue");
  }, [theme]);

  const handleSelectTheme = React.useCallback(
    (newTheme: string) => {
      setSelectedTheme(newTheme);
      setTheme(newTheme);

      if (typeof window !== "undefined") {
        const palette = colorMap[newTheme];
        if (palette) {
          const r = window.document.querySelector(":root") as HTMLElement;
          r.style.setProperty("--bg", palette.bg);
          r.style.setProperty("--main", palette.main);
          r.style.setProperty("--main50", palette.main + "b3");
          r.style.setProperty("--dark-bg", palette.darkBg);
          localStorage.setItem("color", JSON.stringify(palette));
        }
      }
    },
    [setTheme]
  );

  const getCurrentThemeColor = () => {
    return colorMap[selectedTheme]?.main;
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="px-0">
        {isExpanded ? (
          // -- EXPANDED STATE (side by side) --
          <div className="flex w-full items-center">
            {/* Left side: color theme selection */}
            <div className="flex-1 w-4/5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full relative group"
                  >
                    <div
                      className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground transition-colors"
                      style={{
                        background:
                          getCurrentThemeColor() || "var(--sidebar-primary)",
                      }}
                    >
                      <Palette className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight mx-3">
                      <span className="truncate font-semibold">Theme</span>
                      <span className="truncate text-xs opacity-70">
                        {selectedTheme}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-lg"
                  align="start"
                  side="right"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Color Themes
                  </DropdownMenuLabel>

                  {THEMES.map((t) => (
                    <DropdownMenuItem
                      key={t}
                      onClick={() => handleSelectTheme(t)}
                      className="gap-3 p-2 cursor-pointer"
                    >
                      <div
                        className="flex size-6 items-center justify-center rounded-sm border border-border/40 transition-colors"
                        style={{
                          background: colorMap[t]?.main,
                        }}
                      >
                        <Circle className="size-4 shrink-0" />
                      </div>
                      <span className="font-medium capitalize">{t}</span>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right side: ThemeSwitcher */}
            <div className="flex-shrink-0 w-1/5">
              <ThemeSwitcher />
            </div>
          </div>
        ) : (
          // -- COLLAPSED STATE (stacked) --
          <div className="flex flex-col w-full space-y-2 items-start">
            {/* Color theme selection button */}
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full relative group"
                  >
                    <div
                      className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground transition-colors"
                      style={{
                        background:
                          getCurrentThemeColor() || "var(--sidebar-primary)",
                      }}
                    >
                      <Palette className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight mx-3">
                      <span className="truncate font-semibold">Theme</span>
                      <span className="truncate text-xs opacity-70">
                        {selectedTheme}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Color Themes
                  </DropdownMenuLabel>

                  {THEMES.map((t) => (
                    <DropdownMenuItem
                      key={t}
                      onClick={() => handleSelectTheme(t)}
                      className="gap-3 p-2 cursor-pointer"
                    >
                      <div
                        className="flex size-6 items-center justify-center rounded-sm border border-border/40 transition-colors"
                        style={{
                          background: colorMap[t]?.main,
                        }}
                      >
                        <Circle className="size-4 shrink-0" />
                      </div>
                      <span className="font-medium capitalize">{t}</span>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Render ThemeSwitcher below */}
            <div className="w-full">
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
