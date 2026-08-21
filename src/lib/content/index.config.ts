/**
 * 首页内容入口配置
 * —— 直接在这里增删改首页的入口卡片，无需改动其他代码。
 */
export interface HomeEntry {
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  desc: string;
  /** 点击跳转的链接（指向分类/分组路径） */
  href: string;
  /** 图标名（对应 @/lib/nav 的 entryIcons） */
  icon: string;
  /** 左侧高亮条 & 右侧渐变光的颜色 */
  color: string;
}

export const homeEntries: HomeEntry[] = [
  { title: "快速开始", desc: "从零开始上手", href: "/docs/start", icon: "Compass", color: "#22c55e" },
  { title: "参考文档", desc: "参数与命令参考", href: "/docs/reference", icon: "BookOpen", color: "#06b6d4" },
];