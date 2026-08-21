import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fsProvider } from "@/lib/content/fs";

const statusVariant: Record<string, "warning" | "danger" | "info"> = {
  warning: "warning",
  danger: "danger",
  info: "info",
};

/** 最近更新：高密度卡片列表（叶子节点，带状态标识 + 能量条 hover） */
export async function Updates() {
  const all = await fsProvider.getAll();
  const leaves = all
    .filter((n) => !n.children || n.children.length === 0)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 7);

  return (
    <div className="border border-line bg-surface">

      <ul className="divide-y divide-line">
        {leaves.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/${item.slug}`}
              className="group energy-left flex items-center gap-3 px-6 py-3 transition-colors duration-150 hover:bg-muted"
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm text-content transition-colors duration-150 group-hover:text-accent">
                    {item.title}
                  </span>
                  {item.statusLabel && (
                    <Badge variant={statusVariant[item.status ?? "info"]}>
                      {item.statusLabel}
                    </Badge>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-xs text-content-muted">
                  {item.excerpt}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-content-muted">
                {item.updatedAt}
                <ArrowRight
                  size={14}
                  className="text-content-muted transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}