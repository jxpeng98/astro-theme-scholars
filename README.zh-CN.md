[English](./README.md) · [简体中文](./README.zh-CN.md)

# Scholar Pages

一款面向学术主页、研究档案与个人学者网站的精致 Astro 主题。

Scholar Pages 在保持网站轻量、快速的同时，也让内容维护足够简单：个人资料集中在一个
TypeScript 配置文件中，论文、项目、教学经历与文章则分别使用熟悉的 BibTeX、YAML
和 Markdown 管理。

![Scholar Pages 桌面端首页](./docs/screenshots/home-desktop.jpg)

## 核心亮点

- **为学术展示而设计**：以统一、克制的编辑式布局呈现论文、任职经历、教学、
  项目、学术服务、奖项和研究随笔。
- **内容优先的维护方式**：使用 BibTeX 管理论文，使用 YAML 管理结构化经历，
  使用 Markdown 或 MDX 撰写文章。
- **响应式与主题适配**：桌面端和移动端均经过细致适配，并内置浅色、深色模式。
- **高效浏览研究内容**：论文、项目与教学页面支持分类筛选，且不会重复页面导航。
- **灵活组合首页**：无需修改页面模板，即可启用或隐藏头图、精选论文和最新文章。
- **完善的 SEO 基础**：内置 canonical URL、Open Graph、JSON-LD、站点地图和
  动态 `robots.txt`。
- **适合长期维护**：下游站点可以在保留个人内容的同时，接收版本化模板更新。

## 更多预览

### 论文与分类筛选

![Scholar Pages 论文页面](./docs/screenshots/research-desktop.jpg)

### 移动端深色模式

<p align="center">
  <img
    src="./docs/screenshots/home-mobile-dark.jpg"
    alt="Scholar Pages 移动端深色首页"
    width="320"
  />
</p>

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 22.13 或更高版本
- [pnpm](https://pnpm.io/) 11 或更高版本

### 创建自己的站点

点击仓库中的
[**Use this template**](https://github.com/jxpeng98/astro-theme-scholars/generate)
按钮，或通过命令行创建相同的项目：

```bash
pnpm create astro@latest my-scholar-site --template jxpeng98/astro-theme-scholars
cd my-scholar-site
pnpm dev
```

打开 [http://localhost:4321](http://localhost:4321) 即可预览网站。

### 开发模板本身

```bash
git clone https://github.com/jxpeng98/astro-theme-scholars.git
cd astro-theme-scholars
pnpm install
pnpm dev
```

发布前请替换示例身份、链接和内容。建议按照以下顺序操作：

1. 在 `site.config.ts` 中更新 `author`、`siteUrl` 和 `hero`。
2. 使用自己的头像替换 `public/profile.svg`，或修改 `hero.profileImage`。
3. 将论文添加到 `src/data/publications.bib`。
4. 修改 `src/data/` 中的 YAML 数据。
5. 替换或删除 `src/content/posts/` 中的示例文章。

准备部署时，请先运行 `pnpm verify`。

## 内容修改入口

| 要修改的内容 | 文件 |
| --- | --- |
| 姓名、个人资料、单位、链接、SEO 和页面简介 | `site.config.ts` |
| 已发表论文与工作论文 | `src/data/publications.bib` |
| 简介、工作经历、教育经历、学术服务和奖项 | `src/data/about.yml` |
| 研究与软件项目 | `src/data/projects.yml` |
| 当前和过往教学经历 | `src/data/teaching.yml` |
| 博客与研究随笔 | `src/content/posts/*.{md,mdx}` |
| 头像和其他静态资源 | `public/` |
| 颜色、字体、图标与复用样式令牌 | `uno.config.ts` |

## 站点配置

`site.config.ts` 是日常个性化的主要入口。`defineSiteConfig` 会为导航、页面标题、
页脚文案、图片尺寸和首页区块标题补充合理的默认值。

```ts
import { defineSiteConfig } from "./src/config/site";

export const siteConfig = defineSiteConfig({
  author: "你的姓名",
  siteUrl: "https://your-site.example",
  hero: {
    headline: "用一句简洁的话概括你的研究方向。",
    subheadline: "用一小段文字介绍你的工作与学术兴趣。",
    profileImage: "/profile.jpg",
    statusBadge: "欢迎合作",
  },
  affiliations: [
    {
      role: "助理教授",
      department: "信息学院",
      institution: "某某大学",
      url: "https://example.edu",
    },
  ],
  researchInterests: [
    "学习分析",
    "人机交互",
  ],
  socialLinks: [
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/...",
      icon: "i-academicons:google-scholar",
    },
    {
      label: "GitHub",
      href: "https://github.com/your-handle",
      icon: "i-mdi:github",
    },
  ],
  homeBlocks: {
    hero: { enabled: true },
    publications: { enabled: true },
    posts: { enabled: true },
  },
});

export default siteConfig;
```

`siteUrl` 是 canonical URL、Open Graph URL、`robots.txt` 和站点地图的统一来源。
部署前请务必将其设置为最终的生产地址。

## 内容管理

### 论文

将论文添加到 `src/data/publications.bib`。除标准 BibTeX 字段外，主题还使用
`public` 字段在研究页面中对论文进行分组。

```bibtex
@inproceedings{key2026paper,
  title = {论文标题},
  author = {张, 三 and 李, 四},
  booktitle = {会议名称},
  year = {2026},
  url = {https://doi.org/...},
  abstract = {论文摘要。},
  public = {yes},
  keywords = {关键词1, 关键词2}
}
```

| `public` 值 | 页面分组 |
| --- | --- |
| `yes` | Publication（已发表） |
| `wp` | Working Paper（工作论文） |
| `wip` | Work in Progress（进行中） |
| 其他值或未填写 | Other（其他） |

标记为 `public = {yes}` 的论文可以进入首页的精选论文区块。

### 关于、项目与教学

`src/data/` 中的内容使用 YAML 管理，便于阅读、调整顺序和版本控制。仓库内的示例
已经展示了可用字段：

- `about.yml` 支持个人信息、工作经历、教育经历、学术服务，以及奖项、演讲等
  自定义区块。
- `projects.yml` 支持状态、时间、简介、徽章、亮点、元数据、技术栈和多个链接。
- `teaching.yml` 区分当前与过往学期，并支持课程编号、简介、标签、亮点和链接。

大多数字段都是可选项；未填写的内容不会生成空白元素。

### 文章

在 `src/content/posts/` 中创建 Markdown 或 MDX 文件：

```yaml
---
title: "文章标题"
description: "简短摘要。"
publishedAt: 2026-01-15
updatedAt: 2026-02-03
tags:
  - 研究方法
  - 开放科学
draft: false
---
```

将 `draft` 设为 `true`，即可让文章不出现在生成的网站中。

## 内置页面

| 路径 | 用途 |
| --- | --- |
| `/` | 个人资料、研究兴趣、精选论文和最新文章 |
| `/about` | 个人信息、经历、教育、学术服务与自定义区块 |
| `/researches` | 按研究状态分组并支持筛选的论文列表 |
| `/teaching` | 按学期组织的当前与过往教学记录 |
| `/projects` | 包含元数据与链接的当前和过往项目 |
| `/posts` | 按年份组织的文章列表 |
| `/posts/[slug]` | 单篇 Markdown 或 MDX 文章 |

## 项目结构

```text
.
├── public/                    # 静态图片和图标
├── docs/screenshots/         # README 预览图
├── site.config.ts            # 站点主配置
├── src/
│   ├── components/           # 页面与筛选公共组件
│   ├── config/               # 配置默认值
│   ├── content/posts/        # Markdown 和 MDX 文章
│   ├── data/                 # BibTeX 与 YAML 内容
│   ├── layouts/              # 页面公共布局
│   ├── lib/                  # 内容处理与 SEO 工具
│   └── pages/                # Astro 路由
├── astro.config.ts
├── uno.config.ts
└── package.json
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 将静态网站构建到 `dist/` |
| `pnpm preview` | 在本地预览生产构建 |
| `pnpm test` | 运行单元测试 |
| `pnpm astro check` | 运行 Astro 与 TypeScript 检查 |
| `pnpm verify` | 依次运行测试、检查、构建和生成结果断言 |

## 部署

Scholar Pages 会构建为静态的 `dist/` 目录：

```bash
pnpm verify
pnpm build
```

你可以将 `dist/` 部署到 Cloudflare Pages、Vercel、Netlify、GitHub Pages 或其他
静态托管平台。构建命令填写 `pnpm build`，输出目录填写 `dist`。

## 模板更新

项目使用 `v0.6.0` 这类 SemVer 标签发布版本。通过 GitHub 模板创建的站点可以保留
`.github/workflows/template-update.yml`：它会检查上游新版本并创建更新 PR，同时
保留 `.template-sync.json` 中列出的个人内容路径。

若要让该工作流创建更新 PR，请在 **Settings → Actions → General → Workflow
permissions** 中启用 **Allow GitHub Actions to create and approve pull
requests**。个人账户中新建的仓库默认禁用此权限，详情参见 GitHub 的
[工作流权限文档](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests)。

模板维护者可以使用以下命令检查并发布版本：

```bash
pnpm verify
node scripts/check-release.mjs --tag v0.6.0
git push origin main
git tag -a v0.6.0 -m "v0.6.0"
git push origin v0.6.0
```

发布时请确保 `package.json`、`.template-version` 和 `CHANGELOG.md` 最新条目中的
版本号一致。推送标签后，发布工作流会自动创建 GitHub Release。

## 参与贡献

欢迎提交 Issue 和 Pull Request。对于影响范围较大的改动，建议先创建 Issue，
以便提前讨论预期行为和实现范围。

## 开源协议

本项目基于 [MIT License](./LICENSE) 发布。
