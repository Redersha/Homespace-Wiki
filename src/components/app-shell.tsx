"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { TopNav } from "./top-nav";
import { Sidebar } from "./sidebar";
import type { SearchEntry } from "@/lib/content/types";

/** 整体应用外壳：顶栏 + 侧边栏（桌面固定 / 移动抽屉） */
export function AppShell({
  children,
  searchEntries,
}: {
  children: React.ReactNode;
  searchEntries: SearchEntry[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-base">
      <TopNav onMenuClick={() => setOpen(true)} searchEntries={searchEntries} />

      <div className="flex flex-1">
        {/* 桌面侧边栏 */}
        <div className="hidden md:flex">
          <Sidebar className="sticky top-14 h-[calc(100vh-3.5rem)]" />
        </div>

        {/* 移动端抽屉 */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fz-drawer-overlay fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm" />
            <Dialog.Content className="fz-drawer-content fixed inset-y-0 left-0 z-[1200] flex w-60 flex-col bg-surface outline-none">
              <Dialog.Title className="sr-only">导航</Dialog.Title>

              {/* 抽屉顶部标题栏 */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
                <span className="text-md font-semibold text-content">HOMESPACE WIKI</span>
                <Dialog.Close className="inline-flex h-8 w-8 items-center justify-center text-content-secondary transition-colors hover:bg-muted hover:text-content">
                  <X size={18} />
                </Dialog.Close>
              </div>

              <Sidebar className="h-full flex-1 overflow-y-auto border-r-0" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* 内容区 */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}