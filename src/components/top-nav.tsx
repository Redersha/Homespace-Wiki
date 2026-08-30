"use client";

import Link from "next/link";
import { Menu, Search, Bell, ExternalLink } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SearchBox } from "./search-box";
import type { SearchEntry } from "@/lib/content/types";

export function TopNav({
  onMenuClick,
  searchEntries,
}: {
  onMenuClick?: () => void;
  searchEntries: SearchEntry[];
}) {
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

      {/* 右侧图标组 */}
      <div className="ml-auto flex items-center gap-1">
        {/* 移动端搜索按钮（点击后展开搜索，详见 SearchBox 移动端处理） */}
        <button
          type="button"
          aria-label="搜索"
          title="搜索"
          className="inline-flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
        >
          <Search size={16} />
        </button>

        {/* 搜索框（桌面，位于铃铛左边） */}
        <SearchBox entries={searchEntries} />

        {/* 公告 / 通知 */}
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