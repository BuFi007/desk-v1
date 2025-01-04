import { type RefObject, useEffect, useState } from "react";

export function useResizeObserver(
  ElementRef: RefObject<Element>,
): ResizeObserverEntry | undefined {
  const [entry, setEntry] = useState<ResizeObserverEntry>();

  const updateEntry = ([entry]: ResizeObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = ElementRef?.current;
    if (!node) return;

    const observer = new ResizeObserver(updateEntry);

    observer.observe(node);

    return () => observer.disconnect();
  }, [ElementRef]);

  return entry;
}
