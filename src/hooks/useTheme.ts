import { useState, useEffect } from "react";
import { Theme } from "@/types";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("reqai-theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      localStorage.setItem("reqai-theme", next);
      return next;
    });
  };

  return { theme, toggle, isDark: theme === "dark" };
}
