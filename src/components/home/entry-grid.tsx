import Link from "next/link";
import type { CSSProperties } from "react";
import { homeEntries } from "@/lib/content/index.config";
import { entryIcons } from "@/lib/nav";

/** 首页内容入口：由 index.config.ts 集中管理 */
export function EntryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {homeEntries.map((entry) => {
        const Icon = entryIcons[entry.icon];
        const style = { "--energy-color": entry.color } as CSSProperties;
        return (
          <Link
            key={entry.href}
            href={entry.href}
            style={style}
          >
            <div className="energy-bar-left energy-right group flex h-full flex-col gap-3 p-4 transition-colors duration-150">
              <span
                className="flex h-9 w-9 items-center justify-center border border-line"
                style={{ color: entry.color }}
              >
                {Icon && <Icon size={18} strokeWidth={1.5} />}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-content transition-colors duration-150">
                  {entry.title}
                </span>
                <span className="text-xs text-content-muted">{entry.desc}</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}