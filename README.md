首页「内容入口」现在由 `site/content/` 下各分类的**顶层分组目录的 `index.md`** 驱动。目前 8 个入口与文件对应关系：

| 入口卡片 | 对应文件 |
|---|---|
| 主题索引 | `content/wiki/topics/index.md` |
| 术语表 | `content/wiki/glossary/index.md` |
| 归档 | `content/wiki/archive/index.md` |
| 快速开始 | `content/docs/start/index.md` |
| 进阶指南 | `content/docs/advanced/index.md` |
| 参考文档 | `content/docs/reference/index.md` |
| 入门教程 | `content/tutorial/basics/index.md` |
| 实践案例 | `content/tutorial/practice/index.md` |

## 三种改法

**1. 改现有入口的标题 / 描述 / 图标 / 颜色**

直接编辑对应 `index.md` 的 frontmatter：

```
---
title: 你想显示的新标题
category: wiki            # 所属板块，wikidocs/tutorial，决定入口分组
excerpt: 卡片下方的描述文字
updatedAt: 2026-08-18
order: 1                  # 控制排序
icon: Users               # 图标名，见下方可选列表
color: "#ff6b1a"          # 左侧高亮条 & hover 渐变光的颜色
---
```

- `title` → 卡片标题
- `excerpt` → 卡片副标题
- `icon` → 卡片图标
- `color` → 左侧彩色竖条 + hover 右侧渐变光的颜色

**2. 新增一个入口**

在 `content/wiki/`（或 `docs/`、`tutorial/`）下新建一个目录，放一个 `index.md`，写上前面的 frontmatter，首页会自动多出一个卡片。

**3. 删除一个入口**

删除对应目录（或它的 `index.md`），该卡片就会消失。

## 可选图标名

来自 `site/src/lib/nav.ts` 的 `entryIcons`，目前支持：
`Users`、`Database`、`Skull`、`Compass`、`Wrench`、`Layers`、`BookOpen`、`Map`

如需其他图标，去 `nav.ts` 的 `entryIcons` 里 import 并添加一行即可。

## 说明
- 修改 `content/` 下的 md 后，开发服务器（`pnpm dev`）会自动热更新，无需重启。
- 首页「最近更新」会自动把新加的叶子文章按 `updatedAt` 排序展示，所以新增文章也会同步出现在最近更新里。

如果你希望「内容入口」改成读**每个叶子文章**而不是分组目录，或者想支持更细的排序/分组控制，告诉我具体要求即可调整。