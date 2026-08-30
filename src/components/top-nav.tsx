"use client";

import Link from "next/link";
import { Menu, Search, Bell, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-[1000] relative flex h-14 items-center gap-4 border-b border-topnav bg-topnav px-4">
      {/* 移动端抽屉按钮 */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="打开导航"
        className="-ml-1 inline-flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-md tracking-tight text-white">
        <span>[中文名] WIKI</span>
      </Link>

      {/* 搜索框（桌面，居中） */}
      <div className="absolute left-1/2 top-1/2 hidden w-64 -translate-x-1/2 -translate-y-1/2 sm:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-white/60"
        />
        <input
          type="search"
          placeholder="搜索条目…"
          className={cn(
            "h-8 w-full border border-white/20 bg-white/10 pl-8 pr-3 text-sm text-white",
            "placeholder:text-white/50",
            "focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30",
          )}
        />
      </div>

      {/* 右侧图标组 */}
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          aria-label="搜索"
          title="搜索"
          className="inline-flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          aria-label="通知"
          title="通知"
          className="inline-flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Bell size={16} />
        </button>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="外链"
          title="GitHub"
          className="inline-flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={16} />
        </a>
        <ThemeToggle className="text-white/80 hover:bg-white/10 hover:text-white" />
      </div>
    </header>
  );
}