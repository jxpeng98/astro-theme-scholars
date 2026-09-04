[English](./README.md) · [简体中文](./README.zh-CN.md)

# Scholar Pages

一款为学者和研究人员设计的 Astro 主题，让网站保持精致，也让日常更新不必变成前端
开发工作。

Scholar Pages 将内容与页面样式分开管理：全站信息集中在一个 TypeScript 配置文件中，
论文使用 BibTeX，个人经历使用 YAML，项目、课程和文章则使用 Markdown。模板自带的
Mira Latticewell 及其所有经历均为虚构内容，仅用于展示页面效果。

![Scholar Pages 桌面端首页](./docs/screenshots/academic-home-desktop.png)

## 核心亮点

- **完整的学术网站结构**：集中展示个人资料、任职经历、论文、项目、教学、学术服务、
  奖项和研究随笔。
- **清晰的内容入口**：论文保存在 BibTeX 中，个人经历写在 YAML 中，较长的项目、
  课程和文章内容使用 Markdown 或 MDX。
- **更实用的论文交互**：可按类型筛选论文、就地展开摘要，并在同一弹窗中复制 BibTeX、
  APA 7、Chicago 或 Harvard 格式的引用。
- **有独立气质的博客**：支持精选文章、可选封面和自动阅读时长；博客与作品集保持协调，
  但不再套用完全相同的网格样式。
- **可组合的首页**：在 `site.config.ts` 中控制个人介绍、精选项目、精选论文和近期文章，
  无需修改页面组件。
- **默认适配不同设备**：桌面端与移动端均支持浅色、深色模式，并提供键盘焦点状态和
  原生无障碍控件。
- **便于部署和长期维护**：内置 canonical URL、Open Graph、JSON-LD、站点地图、
  `robots.txt` 与版本化模板更新。

## 更多预览

### 编辑式博客

![Scholar Pages 编辑式博客](./docs/screenshots/blog-editorial-desktop.png)

### 论文、摘要与引用

![Scholar Pages 论文页面](./docs/screenshots/publications-unified-desktop.jpg)

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

模板中的身份、院校、论文、项目、课程和文章全部是虚构示例。发布自己的站点前，建议按
以下顺序替换：

1. 在 `site.config.ts` 中更新 `author`、`siteUrl` 和 `hero`。
2. 使用自己的头像替换 `public/profile.svg`，或修改 `hero.profileImage`。
3. 将论文添加到 `src/data/publications.bib`。
4. 在 `src/data/about.yml` 中修改个人经历。
5. 替换 `src/content/` 中的项目、教学和文章条目。
6. 替换 `src/assets/` 中对应的封面图，或者删除内容中的图片字段。

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
| 头像、favicon 和其他公开文件 | `public/` |
| 项目、教学和文章封面 | `src/assets/` |
| 颜色、字体、图标与复用样式令牌 | `uno.config.ts` |

## 站点配置

全站层面的修改大多从 `site.config.ts` 开始。你只需要填写身份信息和希望自定义的内容，
`defineSiteConfig` 会为导航、页面标题、页脚文案、图片尺寸和首页区块标题补齐稳定的
默认值。

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
    showcase: {
      enabled: true,
      title: "精选项目",
    },
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

将论文添加到 `src/data/publications.bib`。主题会读取标准 BibTeX 字段，并通过额外的
`public` 字段在 Research 页面中完成分组。

```bibtex
@inproceedings{latticewell2026signalatlas,
  title = {Signal Atlas for an Imaginary Archive},
  author = {Latticewell, Mira},
  booktitle = {Proceedings of the Fictional Systems Forum},
  year = {2026},
  url = {https://example.com/signal-atlas},
  abstract = {A fictional paper used to demonstrate citation metadata.},
  public = {yes},
  keywords = {fictional archives, demo data}
}
```

| `public` 值 | 页面分组 |
| --- | --- |
| `yes` | Publication（已发表） |
| `wp` | Working Paper（工作论文） |
| `wip` | Work in Progress（进行中） |
| 其他值或未填写 | Other（其他） |

标记为 `public = {yes}` 的论文可以进入首页的精选论文区块。填写 `abstract` 后，读者可
直接在列表中展开摘要；Cite 按钮会根据同一条记录生成 BibTeX、APA 7、Chicago 和
Harvard 四种格式。填写 `url` 后，论文标题会变为链接，同时显示紧凑的 PDF 按钮。

### 关于

`src/data/about.yml` 负责个人信息、工作经历、教育经历、学术服务，以及奖项、演讲等
自定义区块。调整条目顺序即可改变页面顺序；删除顶层列表或将其设为 `[]`，即可隐藏整个
区块。空的可选记录会在渲染时忽略，因此日常维护无需修改 Astro 页面。About 页的标题
与简介仍在 `site.config.ts` 中编辑；宽屏下，第一个自定义区块会与 Academic Service
并排显示。

### 项目与教学

每个项目或课程对应一个带 YAML frontmatter 的 Markdown 文件，字段会在构建时校验。
文件分别放在 `src/content/projects/` 或 `src/content/teaching/` 中，文件名会成为详情页
URL；外部资源统一填写在 `links` 字段中。完整字段、图片、站内链接和旧版 YAML 迁移
方式请参见[内容编写指南](./docs/content-authoring.md)。

### 文章

在 `src/content/posts/` 中创建 Markdown 或 MDX 文件：

```yaml
---
title: "文章标题"
description: "简短摘要。"
publishedAt: 2026-01-15
updatedAt: 2026-02-03
featured: true
heroImage: ../../assets/posts/post-cover.jpg
heroImageAlt: "准确描述封面内容"
tags:
  - 研究方法
  - 开放科学
draft: false
---
```

将 `draft` 设为 `true`，文章就不会出现在生成的网站中。最新一篇
`featured: true` 的文章会作为主推内容；如果没有设置精选文章，则自动使用最新发布的
文章。阅读时长会根据 Markdown 正文计算。只要填写了 `heroImage`，就必须同时提供
`heroImageAlt`。

## 内置页面

| 路径 | 用途 |
| --- | --- |
| `/` | 个人资料、精选项目、精选论文和近期文章 |
| `/about` | 个人信息、经历、教育、学术服务与自定义区块 |
| `/researches` | 按研究状态分组并支持筛选的论文列表 |
| `/teaching` | 按学期组织的当前与过往教学记录 |
| `/teaching/[slug]` | 单门课程详情与外部资源 |
| `/projects` | 包含元数据与链接的当前和过往项目 |
| `/projects/[slug]` | 单个项目详情与外部资源 |
| `/posts` | 精选文章与编辑式文章归档 |
| `/posts/[slug]` | 包含阅读信息和分享链接的单篇文章 |

## 项目结构

```text
.
├── public/                    # 静态图片和图标
├── docs/screenshots/         # README 预览图
├── site.config.ts            # 站点主配置
├── src/
│   ├── assets/               # 由 Astro 优化的项目、教学和文章图片
│   ├── components/           # 页面、卡片与筛选公共组件
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

部署前先运行完整验证。该命令会依次执行测试、类型检查，并将静态网站构建到 `dist/`：

```bash
pnpm verify
```

你可以将 `dist/` 部署到 Cloudflare Pages、Vercel、Netlify、GitHub Pages 或其他
静态托管平台。在平台控制台中，将构建命令设为 `pnpm build`，输出目录设为 `dist`。

## 模板更新

项目使用 `v0.8.0` 这类 SemVer 标签发布版本。通过 GitHub 模板创建的站点拥有独立的
Git 历史，因此更新会以可审查的 PR 交付，而不是直接合并本仓库。

请先检查 `.template-version`。如果该文件不存在或版本低于 `0.6.0`，即使仓库已经
包含更新工作流，也请使用下面的一次性迁移方式。

`v0.6.x` 站点需要先将 `v0.7.0` 中的
`.github/workflows/template-update.yml` 复制到默认分支。这个引导步骤只需执行一次，
因为旧更新器无法使用默认 GitHub token 替换工作流文件。从 `v0.7.0` 开始，更新器会
执行目标 release 自带的迁移逻辑，之后的数据迁移无需再次替换更新工作流。

### v0.6.0 或更新版本的站点

自动更新需要以下三个文件：

- `.github/workflows/template-update.yml`
- `.template-sync.json`
- `.template-version`

执行模板更新时：

1. 打开 **Settings → Actions → General → Workflow permissions**，启用
   **Allow GitHub Actions to create and approve pull requests**。个人账户中新建的
   仓库默认禁用此权限，详情参见 GitHub 的
   [工作流权限文档](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests)。
2. 打开 **Actions → Template Update → Run workflow**。同一工作流也会在每周一
   自动检查新版本。
3. 审查自动生成的 `chore/template-update-X.Y.Z` PR。更新器会在创建或更新 PR 前安装
   依赖并运行完整验证；你仍应确认差异符合自己的站点，再进行合并。

运行工作流前，不要提前将 `.template-version` 改成目标版本，否则工作流会认为站点
已经完成更新。

更新器不会覆盖 `.template-sync.json` 中 `protected` 列出的路径。默认保护范围包括
站点配置、YAML 与 BibTeX 数据、内容条目、项目与教学图片、头像、favicon 和环境变量
文件；其余由模板维护的文件会替换为发布版本。合并前请检查完整 PR，尤其是自行修改过
模板代码的站点。

更新到 `v0.7.0` 时，更新器会在同步前检测已停用的 `src/data/projects.yml` 和
`src/data/teaching.yml`。它会阻止模板示例条目进入更新，将每条个人记录转换为
Markdown 内容条目，并保留原 YAML 文件用于比较或回滚。已有 Markdown 条目不会被
覆盖。确认生成的条目和详情页正确后，即可删除旧 YAML 文件。

#### 更新工作流文件时推送被拒绝

仓库内置的 `GITHUB_TOKEN` 属于 GitHub App installation token。推送新增或修改
`.github/workflows` 下的文件时，GitHub 还要求单独授予 `Workflows` 权限；允许创建
PR 并不等于拥有该权限。

因此，未配置 `TEMPLATE_UPDATE_TOKEN` 时，更新器会自动排除
`.github/workflows/**`。默认 token 仍可更新其余模板文件；工作流差异需要在审查后
手动应用。

如需同步 workflow 文件，请创建仅限当前仓库的 fine-grained personal access token，
并授予 `Contents: Read and write`、`Pull requests: Read and write` 和
`Workflows: Write` 权限。将其保存为 Actions secret `TEMPLATE_UPDATE_TOKEN`，不要把
token 本身写进 workflow 文件。更新器会自动检测该 secret。

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

先确保工作区干净，再从旧站点仓库根目录的 Bash 兼容终端中执行一次迁移。同步脚本会将
旧版个人配置迁移到 `site.config.ts`，安装兼容入口，并清理废弃的内容和 robots 模板
文件，同时保留个人内容：

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

检查并提交迁移结果，然后创建 PR。迁移过程也会安装自动更新文件，后续版本即可使用
上面的工作流。如果脚本提示旧配置结构不受支持，请手动迁移定制配置，不要强制同步。
提交前，还要恢复默认保护范围之外的其他个人文件。

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

欢迎提交 Issue 和 Pull Request。对于影响范围较大的改动，请先创建 Issue，方便提前
确认预期行为和实现范围。

## 开源协议

本项目基于 [MIT License](./LICENSE) 发布。
