import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** 卡片（工业风：直角 + 1px border，hover 用橙色能量条 + 微弱发光） */
export function Card({
  className,
  hover = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "border border-line bg-surface",
        hover &&
          "energy-left transition-all duration-150 hover:border-accent/50 hover:shadow-fz-lighter",
        className,
      )}
      {...props}
    />
  );
}