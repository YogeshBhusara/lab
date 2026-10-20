"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Theme } from "@/components/arc/theme-switch/theme-switch";

const KEY = "lab-theme";
const EVENT = "lab-theme";

function readTheme(): Theme {
  const stored = window.localStorage.getItem(KEY);
  return stored === "light" || stored === "dark" ? stored : "dark";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

export function useLabTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function setTheme(next: Theme) {
    window.localStorage.setItem(KEY, next);
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event(EVENT));
  }

  return { theme, setTheme };
}
