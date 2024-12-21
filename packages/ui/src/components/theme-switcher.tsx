"use client"

import * as React from "react"
import { Moon, Sun, Palette } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "../components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/sidebar"

const colorThemes = [
  { name: "Yellow", value: "yellow", colorFrom: "#FFDC58", colorTo: "#FEF2E8" },
  { name: "Blue", value: "blue", colorFrom: "#88aaee", colorTo: "#dfe5f2" },
  { name: "Green", value: "green", colorFrom: "#A3E636", colorTo: "#E0E7F1" },
]

export function ThemeSwitcher() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000` // 1 year expiration
  }

  const isDark = resolvedTheme === "dark"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Palette className="h-4 w-4" />
              <span>Theme</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {colorThemes.map((t) => (
              <DropdownMenuItem
                key={t.value}
                onClick={() => handleThemeChange(isDark ? `${t.value}-dark` : t.value)}
              >
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 mr-2 rounded"
                    style={{
                      background: `linear-gradient(to bottom right, ${t.colorFrom}, ${t.colorTo})`,
                    }}
                  />
                  <span className={theme?.startsWith(t.value) ? "font-bold" : ""}>
                    {t.name}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => handleThemeChange(isDark ? theme?.replace('-dark', '') || 'yellow' : `${theme}-dark`)}>
              {isDark ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>{isDark ? "Light" : "Dark"} Mode</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

