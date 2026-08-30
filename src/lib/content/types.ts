/**
 * 内容模型与数据源抽象层
 * —— 内容 source of truth 为 content/ 目录下的 Markdown 文件。
 *    后续接真实 Git 仓库时，只需把 CONTENT_DIR 指向仓库 clone 目录，
 *    或新增一个 GitContentProvider 复用本文件的解析逻辑。
 */

export type Category = "wiki" | "docs" | "tutorial";

export type Status = "normal" | "warning" | "danger" | "info";

export interface ContentMeta {
  title: string;
  category: Category;
  excerpt?: string;
  updatedAt: string;
  status?: Status;
  statusLabel?: string;
  /** 同目录内排序 */
  order?: number;
  /** 首页内容入口使用的图标名（对应 @/lib/nav entryIcons） */
  icon?: string;
  /** 首页内容入口左侧高亮条 & 右侧渐变光的颜色 */
  color?: string;
}

export interface ContentNode extends ContentMeta {
  /** 唯一标识（如 "wiki/topics/primer"） */
  slug: string;
  /** 原始 Markdown 正文（不含 frontmatter） */
  body: string;
  /** 是否为分组节点（index.md） */
  isSection: boolean;
  /** 子节点（分组节点拥有） */
  children?: ContentNode[];
}

/** 用于前端搜索的精简条目 */
export interface SearchEntry {
  title: string;
  slug: string;
  category: Category;
  excerpt?: string;
}

/** 内容源抽象：构建时同步拉取 + 解析 */
export interface ContentProvider {
  getTree(category: Category): Promise<ContentNode[]>;
  getContent(slug: string): Promise<ContentNode | undefined>;
  getAll(): Promise<ContentNode[]>;
}