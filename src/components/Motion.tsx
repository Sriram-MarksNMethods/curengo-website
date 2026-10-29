"use client";

// Starts the scroll-in motion (see src/lib/motion.ts) on every page, after each navigation.
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { startMotion } from "@/lib/motion";

export default function Motion() {
  const pathname = usePathname();
  // wait until the browser is idle, so React has finished hydrating the page before the script adds its classes
  useEffect(() => {
    let stop: (() => void) | undefined;
    const go = () => (stop = startMotion());
    const id = "requestIdleCallback" in window ? requestIdleCallback(go, { timeout: 400 }) : setTimeout(go, 300); // Safari has no requestIdleCallback
    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(id as number);
      clearTimeout(id as number);
      stop?.();
    };
  }, [pathname]);
  return null;
}
