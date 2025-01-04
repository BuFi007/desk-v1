"use client";

import { useLayoutEffect } from "react";
import { useTheme } from "next-themes";

export default function SetStylingPref() {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    // Get theme from cookie first
    const colorTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("colorTheme="))
      ?.split("=")[1];

    // Get color object from localStorage
    const colorObj = JSON.parse(localStorage.getItem("color") as string);
    const r = window.document.querySelector(":root") as HTMLElement;

    if (colorObj) {
      r.style.setProperty("--main", colorObj.main);
      r.style.setProperty("--main50", colorObj.main + "b3");
      r.style.setProperty(
        "--bg",
        theme === "dark" ? colorObj.darkBg : colorObj.bg,
      );
    }
  }, [theme]);

  return null;
}
