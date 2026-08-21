import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Category, ContentNode, ContentProvider } from "./types";

/** Markdown 内容根目录（后续接 Git 仓库时只需指向 clone 目录） */
const CONTENT_DIR = join(process.cwd(), "content");

const CATEGORY_DIRS: Record<Category, string> = {
  wiki: "wiki",
  docs: "docs",
  tutorial: "tutorial",
};

function slugFromPath(rel: string): string {
  // content/wiki/topics/primer.md -> wiki/topics/primer
  return rel.replace(/\.md$/, "");
}

function toDateString(v: unknown): string {
  if (v instanceof Date) {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, "0");
    const d = String(v.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(v ?? "");
}

function readNode(rel: string, isIndex: boolean): ContentNode {
  const full = join(CONTENT_DIR, rel);
  const raw = readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const dirParts = rel.split("/").slice(0, -1); // 除去文件名
  const slug = isIndex ? dirParts.join("/") : slugFromPath(rel);

  return {
    title: data.title ?? "未命名",
    category: data.category as Category,
    excerpt: data.excerpt,
    updatedAt: toDateString(data.updatedAt),
    status: data.status,
    statusLabel: data.statusLabel,
    order: data.order,
    icon: data.icon,
    color: data.color,
    slug,
    body: content.trim(),
    isSection: isIndex,
  };
}

function walk(relDir: string): { nodes: ContentNode[] } {
  const full = join(CONTENT_DIR, relDir);
  const entries = readdirSync(full).filter((n) => !n.startsWith("."));

  const sections: ContentNode[] = [];
  const files: ContentNode[] = [];

  for (const name of entries) {
    const rel = relDir ? `${relDir}/${name}` : name;
    const abs = join(full, name);
    if (statSync(abs).isDirectory()) {
      // 目录：其下 index.md 为分组节点
      const indexRel = `${rel}/index.md`;
      const indexAbs = join(abs, "index.md");
      let section: ContentNode | null = null;
      try {
        if (statSync(indexAbs).isFile()) {
          section = readNode(indexRel, true);
        }
      } catch {
        /* no index.md */
      }

      // 递归子目录（传递完整相对路径）
      const { nodes: children } = walk(rel);
      if (section) {
        section.children = children;
        sections.push(section);
      } else {
        sections.push(...children);
      }
    } else if (name.endsWith(".md") && name !== "index.md") {
      files.push(readNode(rel, false));
    }
  }

  // 排序：order 优先，再按文件名
  const sortNodes = (a: ContentNode, b: ContentNode) => {
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title, "zh-CN");
  };

  const children = [...files].sort(sortNodes);
  if (sections.length > 0) {
    // 有子分组：把当前目录的普通文件也排进去
    return { nodes: [...sections, ...children].sort(sortNodes) };
  }
  return { nodes: children };
}

function flatten(nodes: ContentNode[]): ContentNode[] {
  return nodes.flatMap((n) => [n, ...flatten(n.children ?? [])]);
}

/** 文件系统内容源（服务器端专用） */
export const fsProvider: ContentProvider = {
  async getTree(category: Category) {
    if (!(category in CATEGORY_DIRS)) return [];
    return walk(CATEGORY_DIRS[category]).nodes;
  },
  async getContent(slug: string) {
    const all = flatten(
      (await Promise.all(
        (Object.keys(CATEGORY_DIRS) as Category[]).map((c) =>
          fsProvider.getTree(c),
        ),
      )).flat(),
    );
    return all.find((n) => n.slug === slug);
  },
  async getAll() {
    const all = await Promise.all(
      (Object.keys(CATEGORY_DIRS) as Category[]).map((c) => fsProvider.getTree(c)),
    );
    return flatten(all.flat());
  },
};