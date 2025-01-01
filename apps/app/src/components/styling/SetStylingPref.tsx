"use client";

import { useLayoutEffect } from "react";

export default function SetStylingPref() {
  useLayoutEffect(() => {
    const colorObj = JSON.parse(localStorage.getItem("color") as string);
    const r = window.document.querySelector(":root") as HTMLElement;

    if (colorObj) {
      r.style.setProperty("--bg", colorObj.bg);
      r.style.setProperty("--main", colorObj.main);
      r.style.setProperty("--main50", colorObj.main + "b3");
      r.style.setProperty("--dark-bg", colorObj.darkBg);
    }
  }, []);

  return null;
}
