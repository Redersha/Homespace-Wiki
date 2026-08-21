import {
  Users,
  Database,
  Skull,
  Compass,
  Wrench,
  Layers,
  Map,
  Home,
  BookOpen,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

/** 侧边栏主要导航 */
export const mainNav: NavItem[] = [
  { title: "首页", href: "/", icon: Home },
  { title: "文档", href: "/docs", icon: BookOpen },
  { title: "教程", href: "/tutorial", icon: GraduationCap },
];

/** 首页内容入口图标映射 */
export const entryIcons: Record<string, LucideIcon> = {
  Users,
  Database,
  Skull,
  Compass,
  Wrench,
  Layers,
  BookOpen,
  Map,
};
