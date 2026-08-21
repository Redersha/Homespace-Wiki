import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "success" | "warning" | "danger" | "info" | "accent";

const variants: Record<Variant, string> = {
  primary: "bg-primary-light text-primary border-primary/30",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/30",
  info: "bg-info/10 text-info border-info/30",
  accent: "bg-accent/10 text-accent border-accent/30",
};

/** 方形标签（工业风：直角 + 半透明底 + 语义色描边） */
export function Badge({
  variant = "primary",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-medium leading-none",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}