"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/nav";

function NavList() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const prevTop = useRef<number | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const activeLink = nav.querySelector<HTMLElement>('a[data-active="true"]');
    if (!activeLink) {
      indicator.style.opacity = "0";
      prevTop.current = null;
      return;
    }

    const top = activeLink.offsetTop;
    const height = activeLink.offsetHeight;

    if (prevTop.current === null) {
      // 首次挂载：直接定位，不做过渡动画
      indicator.style.transition = "none";
      indicator.style.top = `${top}px`;
      indicator.style.height = `${height}px`;
      indicator.style.opacity = "1";
      // 强制回流，使上面的 "none" 生效后再恢复过渡
      void indicator.offsetHeight;
      indicator.style.transition = "";
    } else {
      // 从上一个选中项平滑滑动到新选中项
      indicator.style.top = `${top}px`;
      indicator.style.height = `${height}px`;
      indicator.style.opacity = "1";
    }

    prevTop.current = top;
  }, [pathname]);

  return (
    <nav ref={navRef} className="relative flex flex-col gap-0.5 px-3 py-3">
      {/* 滑动选中指示条：点击跳转后从上一次选中项滑到新选中项，选中后始终显示 */}
      <span
        ref={indicatorRef}
        className="nav-indicator"
        aria-hidden
      />
      {mainNav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={active}
            className="energy-right relative flex h-10 items-center gap-2 overflow-hidden px-3 text-sm text-content-secondary transition-colors duration-150 hover:text-content"
          >
            <span
              className={cn("hachure", active && "is-visible")}
              aria-hidden
            />
            <Icon size={16} strokeWidth={1.5} className="relative z-10" />
            <span className="relative z-10">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/** 底部废土纹理插画占位（design_doc 第六节：侧边栏底部地形纹理） */
function WastelandTexture() {
  return (
    <div
      className="relative mt-auto h-24 overflow-hidden border-t border-line"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#4a4038_0,transparent_40%),radial-gradient(circle_at_80%_70%,#c8632a55_0,transparent_35%),radial-gradient(circle_at_50%_100%,#d4a01744_0,transparent_50%)] opacity-60" />
      <div
        className="absolute inset-x-0 bottom-0 h-12"
        style={{
          background:
            "linear-gradient(160deg, var(--color-bg-surface) 60%, transparent 60%)",
        }}
      />
      <div className="absolute bottom-2 left-3 text-xs text-content-muted">
        HOMESPACE ALL IN ONE
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex w-60 shrink-0 flex-col border-r border-line bg-surface",
        className,
      )}
    >
      <NavList />
      <WastelandTexture />
    </aside>
  );
}