import { EntryGrid } from "@/components/home/entry-grid";
import { Updates } from "@/components/home/updates";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:pl-6 md:pr-8 md:pt-3 md:pb-10">
      {/* Hero */}
      <section className="mb-8 border border-line bg-surface px-6 py-6 md:px-8 md:py-8">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-accent" />
          <p className="text-xs font-medium tracking-wide text-accent">
            HOMESPACE ALL IN ONE
          </p>
        </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-content md:text-5xl">
            [中文名] WIKI
          </h1>
        <p className="mt-2 max-w-2xl text-sm text-content-secondary">
          还没想好
        </p>
      </section>

      {/* 内容入口 */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-0.5 bg-accent" />
          <h2 className="text-lg font-semibold text-content">内容入口</h2>
        </div>
        <EntryGrid />
      </section>

      {/* 最近更新 */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-0.5 bg-accent" />
          <h2 className="text-lg font-semibold text-content">最近更新</h2>
        </div>
        <Updates />
      </section>
    </div>
  );
}