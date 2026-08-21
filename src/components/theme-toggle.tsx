"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="切换深浅色"
      title="切换深浅色"
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center text-content-secondary transition-colors duration-150 hover:bg-muted hover:text-content",
        className,
      )}
    >
      {mounted ? (dark ? <Sun size={16} /> : <Moon size={16} />) : <Sun size={16} />}
    </button>
  );
}