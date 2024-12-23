"use client";

import { useState, useEffect } from "react";

export const isMac =
  typeof window !== "undefined"
    ? /Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent)
    : false;

export function useIsMac() {
  const [isMacState, setIsMacState] = useState(isMac);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMacState(/Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent));
    }
  }, []);

  return isMacState;
}
