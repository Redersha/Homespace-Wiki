import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { fsProvider } from "@/lib/content/fs";
import type { Category } from "@/lib/content/types";
import { ChevronRight, FolderOpen, FileText } from "lucide-react";

const categoryLabels: Record<Category, string> = {
  wiki: "Wiki 图鉴",
  docs: "文档",
  tutorial: "教程",
};

const statusVariant: Record<string, "warning" | "danger" | "info"> = {
  warning: "warning",
  danger: "danger",
  info: "info",
};

/** 生成所有可静态化的路径（分类顶级 + 分组 + 详情） */
export async function generateStaticParams() {
  const all = await fsProvider.getAll();
  const params = new Set<string>();
  (["wiki", "docs", "tutorial"] as Category[]).forEach((c) => params.add(c));
  all.forEach((n) => params.add(n.slug));
  return [...params].map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  if ((slug.length === 1 && ["wiki", "docs", "tutorial"].includes(fullSlug))) {
    return { title: `${categoryLabels[fullSlug as Category]} — homespace all in one` };
  }
  const all = await fsProvider.getAll();
  const node = all.find((n) => n.slug === fullSlug);
  return { title: node ? `${node.title} — homespace all in one` : "homespace all in one" };
}

/* ---------- 面包屑 ---------- */
function Breadcrumb({ slug }: { slug: string[] }) {
  const crumbs = slug;
  return (
    <nav className="mb-5 flex items-center gap-1 text-xs text-content-muted">
      <Link href="/" className="transition-colors hover:text-content">
        首页
      </Link>
      {crumbs.map((seg, i) => {
        const href = "/" + crumbs.slice(0, i + 1).join("/");
        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight size={12} />
            <Link href={href} className="transition-colors hover:text-content">
              {i === 0 ? categoryLabels[seg as Category] ?? seg : seg}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  // 1) 分类顶级列表页
  if (slug.length === 1 && (["wiki", "docs", "tutorial"] as string[]).includes(fullSlug)) {
    const category = fullSlug as Category;
    const tree = await fsProvider.getTree(category);
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-8 md:pl-3 md:pr-8 md:pt-3 md:pb-10">
          <Breadcrumb slug={slug} />
          <div className="mb-6 flex items-center gap-2">
            <span className="h-5 w-0.5 bg-accent" />
            <h1 className="text-xl font-bold text-content">{categoryLabels[category]}</h1>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tree.map((section) => (
              <Link key={section.slug} href={`/${section.slug}`}>
                <div className="energy-left group h-full border border-line bg-surface p-5 transition-all duration-150 hover:border-accent/50 hover:shadow-fz-lighter">
                  <div className="flex items-center gap-2">
                    <FolderOpen size={16} strokeWidth={1.5} className="text-content-secondary group-hover:text-accent transition-colors" />
                    <h2 className="text-base font-semibold text-content group-hover:text-accent transition-colors">
                      {section.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-xs text-content-muted">{section.excerpt}</p>
                  <p className="mt-3 text-xs font-mono text-content-muted">
                    {section.children?.length ?? 0} 篇
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }

  // 2) 查找分组或详情节点
  const all = await fsProvider.getAll();
  const node = all.find((n) => n.slug === fullSlug);
  if (!node) notFound();

  const isSection = node.isSection && node.children && node.children.length > 0;
  const siblings = all.filter(
    (n) => !n.isSection && n.slug.split("/").slice(0, -1).join("/") === fullSlug.split("/").slice(0, -1).join("/"),
  );
  const currentIndex = siblings.findIndex((n) => n.slug === fullSlug);
  const prev = currentIndex > 0 ? siblings[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < siblings.length - 1
      ? siblings[currentIndex + 1]
      : undefined;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:pl-3 md:pr-8 md:pt-3 md:pb-10">
      <Breadcrumb slug={slug} />

      {/* 头部 */}
        <header className="mb-6">
          <div className="flex items-center gap-2">
            {isSection ? (
              <FolderOpen size={20} strokeWidth={1.5} className="text-content-secondary" />
            ) : (
              <FileText size={20} strokeWidth={1.5} className="text-content-secondary" />
            )}
            <h1 className="text-xl font-bold text-content">{node.title}</h1>
            {node.statusLabel && (
              <Badge variant={statusVariant[node.status ?? "info"]}>{node.statusLabel}</Badge>
            )}
          </div>
          {node.excerpt && (
            <p className="mt-2 text-sm text-content-secondary">{node.excerpt}</p>
          )}
          <p className="mt-1 font-mono text-xs text-content-muted">更新于 {node.updatedAt}</p>
        </header>

        {isSection ? (
          /* 分组页：列出子文章 */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {node.children!.map((child) => (
              <Link key={child.slug} href={`/${child.slug}`}>
                <div className="energy-left group flex h-full flex-col justify-between border border-line bg-surface p-5 transition-all duration-150 hover:border-accent/50 hover:shadow-fz-lighter">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText size={15} strokeWidth={1.5} className="text-content-secondary group-hover:text-accent transition-colors" />
                      <h2 className="text-sm font-semibold text-content group-hover:text-accent transition-colors">
                        {child.title}
                      </h2>
                    </div>
                    <p className="mt-2 text-xs text-content-muted">{child.excerpt}</p>
                  </div>
                  {child.statusLabel && (
                    <div className="mt-3">
                      <Badge variant={statusVariant[child.status ?? "info"]}>
                        {child.statusLabel}
                      </Badge>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* 详情页：正文 + 上一篇/下一篇 */
          <div className="max-w-3xl">
            <article className="border border-line bg-surface p-6 md:p-8">
              <Markdown>{node.body}</Markdown>
            </article>

            {(prev || next) && (
              <nav className="mt-6 grid grid-cols-2 gap-4">
                {prev ? (
                  <Link
                    href={`/${prev.slug}`}
                    className="border border-line bg-surface p-4 transition-all duration-150 hover:border-accent/50 hover:shadow-fz-lighter"
                  >
                    <span className="block text-xs text-content-muted">上一篇</span>
                    <span className="mt-1 block text-sm font-medium text-content">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/${next.slug}`}
                    className="border border-line bg-surface p-4 text-right transition-all duration-150 hover:border-accent/50 hover:shadow-fz-lighter"
                  >
                    <span className="block text-xs text-content-muted">下一篇</span>
                    <span className="mt-1 block text-sm font-medium text-content">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        )}
    </div>
  );
}

