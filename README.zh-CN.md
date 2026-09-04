[English](./README.md) · [简体中文](./README.zh-CN.md)

# Scholar Pages

一款面向学术主页、研究档案与个人学者网站的精致 Astro 主题。

Scholar Pages 在保持网站轻量、快速的同时，也让内容维护足够简单：个人资料集中在一个
TypeScript 配置文件中，论文使用 BibTeX，个人经历使用 YAML，项目、教学与文章使用
Markdown 管理。

![Scholar Pages 桌面端首页](./docs/screenshots/academic-home-desktop.png)

## 核心亮点

- **为学术展示而设计**：以统一、克制的编辑式布局呈现论文、任职经历、教学、
  项目、学术服务、奖项和研究随笔。
- **内容优先的维护方式**：使用 BibTeX 管理论文，使用 YAML 管理结构化个人经历，
  使用 Markdown 或 MDX 编写项目、教学与文章详情。
- **响应式与主题适配**：桌面端和移动端均经过细致适配，并内置浅色、深色模式。
- **高效浏览研究内容**：论文、项目与教学页面支持分类筛选，且不会重复页面导航。
- **灵活组合首页**：无需修改页面模板，即可启用或隐藏头图、精选论文和最新文章。
- **完善的 SEO 基础**：内置 canonical URL、Open Graph、JSON-LD、站点地图和
  动态 `robots.txt`。
- **适合长期维护**：下游站点可以在保留个人内容的同时，接收版本化模板更新。

## 更多预览

### 论文与分类筛选

![Scholar Pages 论文页面](./docs/screenshots/publications-unified-desktop.jpg)

### 移动端深色模式

<p align="center">
  <img
    src="./docs/screenshots/academic-home-mobile-dark.png"
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
4. 修改 `src/data/about.yml`，并替换 `src/content/` 中的项目与教学条目。
5. 替换或删除 `src/content/posts/` 中的示例文章。

准备部署时，请先运行 `pnpm verify`。

## 内容修改入口

| 要修改的内容 | 文件 |
| --- | --- |
| 姓名、个人资料、单位、链接、SEO 和页面简介 | `site.config.ts` |
| 已发表论文与工作论文 | `src/data/publications.bib` |
| 简介、工作经历、教育经历、学术服务和奖项 | `src/data/about.yml` |
| 研究与软件项目 | `src/content/projects/*.md` |
| 当前和过往教学经历 | `src/content/teaching/*.md` |
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

### 关于

`src/data/about.yml` 使用一个结构化 YAML 文件管理个人信息、工作经历、教育经历、
学术服务，以及奖项、演讲等自定义区块。日常编辑无需修改 Astro 组件：删除某个顶层
列表即可隐藏对应区块，列表中的顺序就是页面展示顺序。About 页的标题与简介仍在
`site.config.ts` 中编辑；第一个自定义区块会在宽屏上与 Academic Service 并排展示。

### 项目与教学

每个项目或课程都是一个带有 YAML frontmatter 的 Markdown 内容条目，并在构建时接受
字段验证。将文件分别放入 `src/content/projects/` 或 `src/content/teaching/`；文件名
会成为站内详情页 URL。外部资源填写在 frontmatter 的 `links` 字段中。字段、图片、
站内链接与迁移示例请参见完整的[内容编写指南](./docs/content-authoring.md)。

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
| `/teaching/[slug]` | 单门课程详情与外部资源 |
| `/projects` | 包含元数据与链接的当前和过往项目 |
| `/projects/[slug]` | 单个项目详情与外部资源 |
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
│   ├── content/              # 项目、教学和文章内容条目
│   ├── data/                 # BibTeX 论文与 YAML 个人经历
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

项目使用 `v0.8.0` 这类 SemVer 标签发布版本。由于通过 GitHub 模板创建的仓库拥有
独立的 Git 历史，模板更新会通过便于审查的 PR 交付。

请先检查 `.template-version`。如果该文件不存在或版本低于 `0.6.0`，即使仓库已经
包含更新工作流，也请使用下面的一次性迁移方式。

`v0.6.x` 站点应先把 `v0.7.0` 中的 `.github/workflows/template-update.yml`
复制到默认分支。这个步骤只需执行一次：旧更新器无法使用默认 GitHub token 更新自身的
工作流。从 `v0.7.0` 开始，更新器会执行目标 release 自带的迁移逻辑，因此后续数据
迁移不再需要替换更新工作流。

### v0.6.0 或更新版本的站点

这类站点包含以下三个更新文件：

- `.github/workflows/template-update.yml`
- `.template-sync.json`
- `.template-version`

更新这类站点时：

1. 打开 **Settings → Actions → General → Workflow permissions**，启用
   **Allow GitHub Actions to create and approve pull requests**。个人账户中新建的
   仓库默认禁用此权限，详情参见 GitHub 的
   [工作流权限文档](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests)。
2. 打开 **Actions → Template Update → Run workflow**。同一工作流也会在每周一
   自动检查新版本。
3. 审查自动生成的 `chore/template-update-X.Y.Z` PR，确认无误后合并。更新器会在创建
   或更新 PR 前安装依赖并运行完整验证。

运行工作流前，不要提前将 `.template-version` 改成目标版本，否则工作流会认为站点
已经完成更新。

`.template-sync.json` 中 `protected` 列出的路径不会被覆盖。默认保护站点配置、YAML
与 BibTeX 数据、内容条目、项目与教学图片、文章、头像、favicon 和环境变量文件；
其他由模板维护的文件会替换为发布版本。合并前应检查完整 PR，尤其是修改过模板代码的
站点。

更新到 `v0.7.0` 时，更新器会在同步前检测已停用的 `src/data/projects.yml` 和
`src/data/teaching.yml`。它会阻止模板示例条目进入更新，将每条个人记录转换为
Markdown 内容条目，并保留原 YAML 文件用于比较或回滚。已有 Markdown 条目不会被
覆盖。确认生成的条目和详情页正确后，即可删除旧 YAML 文件。

#### 更新工作流文件时推送被拒绝

仓库内置的 `GITHUB_TOKEN` 是 GitHub App installation token。推送新增或修改
`.github/workflows` 下的文件时，GitHub 还要求单独的仓库 `Workflows` 权限；仅启用
创建 PR 的权限并不会提供这项权限。

因此，未配置 `TEMPLATE_UPDATE_TOKEN` 时，模板更新器会自动排除
`.github/workflows/**`。使用默认 token 的新仓库仍能更新其他模板文件，不会再遇到
workflow 权限导致的 push rejection；工作流差异应在审查后手动应用。

如需让更新器同时同步 workflow 文件，请创建仅限当前仓库的 fine-grained personal
access token，并授予 `Contents: Read and write`、`Pull requests: Read and write`
和 `Workflows: Write` 权限。将其保存为仓库 Actions secret
`TEMPLATE_UPDATE_TOKEN`，不要把 token 值写入 workflow。更新器会自动检测该 secret。

如果站点安装的更新器早于 `v0.7.0`，请先完成上面的一次性 workflow 引导，再重新
运行 **Template Update**。也可以把 `.github/workflows/**` 添加到站点
`.template-sync.json` 的 `protected` 列表中，继续手动管理 workflow。

请设置有效期、只授权目标仓库，并在不再需要时撤销令牌。组织仓库可能还需要管理员
批准令牌。详情参见 GitHub 的
[personal access token 权限文档](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)、
[Actions secrets 文档](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)，
以及 GitHub App 的
[`Workflows` 权限说明](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app#choosing-permissions-for-git-access)。

### 早于 v0.6.0 的站点

先确保工作区干净，然后在旧站点仓库根目录的 Bash 兼容终端中执行一次迁移。当前同步
脚本会将旧版个人配置迁移到 `site.config.ts`，安装新的兼容入口，并清理废弃的内容与
robots 模板文件，同时保留个人内容：

```bash
git switch -c chore/template-update-v0.8.0

template_dir="$(mktemp -d)"
template_dir="$(cd "$template_dir" && pwd -P)"
git clone --depth 1 --branch v0.8.0 \
  https://github.com/jxpeng98/astro-theme-scholars.git \
  "$template_dir"

node "$template_dir/scripts/sync-template-release.mjs" \
  --source "$template_dir" \
  --target . \
  --config "$template_dir/.template-sync.json"

pnpm install --frozen-lockfile
node scripts/migrate-legacy-content.mjs
pnpm verify
git status --short
git diff
```

检查并提交迁移结果，然后创建 PR。此次迁移会安装自动更新文件，后续版本即可使用上面
的工作流。如果脚本提示旧配置结构不受支持，请手动迁移定制配置，不要强制覆盖。提交
前，请恢复默认保护范围之外的其他个人文件。

不要使用 `--allow-unrelated-histories` 直接合并模板仓库；GitHub 文档明确说明
[通过模板生成的仓库具有不相关的 Git 历史](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository#about-template-repositories)。

### 发布模板版本

模板维护者可以使用以下命令检查并发布版本：

```bash
pnpm verify
node scripts/check-release.mjs --tag v0.8.0
git push origin main
git tag -a v0.8.0 -m "v0.8.0"
git push origin v0.8.0
```

发布时请确保 `package.json`、`.template-version` 和 `CHANGELOG.md` 最新条目中的
版本号一致。推送标签后，发布工作流会自动创建 GitHub Release。

## 参与贡献

欢迎提交 Issue 和 Pull Request。对于影响范围较大的改动，建议先创建 Issue，
以便提前讨论预期行为和实现范围。

## 开源协议

本项目基于 [MIT License](./LICENSE) 发布。
