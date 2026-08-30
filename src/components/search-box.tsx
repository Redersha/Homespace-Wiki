"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { SearchEntry } from "@/lib/content/types";

const categoryLabels: Record<string, string> = {
  wiki: "Wiki",
  docs: "文档",
  tutorial: "教程",
};

export function SearchBox({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? entries
        .filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.excerpt?.toLowerCase().includes(q),
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative hidden w-56 sm:block">
      <Search
        size={16}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-white/60"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="搜索条目…"
        className="h-8 w-full border border-white/20 bg-white/10 pl-8 pr-8 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="清除"
          className="absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-white/60 transition-colors hover:text-white"
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}

      {open && q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto border border-line bg-elevated shadow-fz">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-xs text-content-muted">无结果</div>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-content transition-colors hover:bg-muted"
                  >
                    <span className="min-w-0 flex-1 truncate">{r.title}</span>
                    <span className="shrink-0 text-xs text-content-muted">
                      {categoryLabels[r.category]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}