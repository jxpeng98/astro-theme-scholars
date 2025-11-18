# Scholar Pages Astro 主题

为您的学术和研究作品集量身打造。这款 Astro 主题可帮助您轻松构建一个专业、快速且内容驱动的个人网站。

![Scholar Pages 主题桌面和移动端预览](https://r2imga.jxpeng.dev/2025/10/9dfa4106fa05badc9f5e80b4694c9309.png)

## 简介

欢迎使用 Scholar Pages！这款功能丰富的 Astro 主题旨在帮助学者、研究人员和学生打造一个引人注目的在线形象。我们将 Astro 静态网站生成的强大功能与简单的数据驱动内容管理相结合，因此您可以专注于您的工作，而我们将为您处理构建网站的繁重工作。

该主题在构建时考虑了性能和定制性，具有自动 BibTeX 解析、用于您的个人资料和项目的基于 YAML 的内容，以及使用 UnoCSS 的实用程序优先样式。

## 特性

- **Astro 框架**: 使用 Astro 构建，用于快速、优化的静态网站生成。
- **BibTeX 集成**: 自动解析并显示来自 BibTeX 文件的出版物。
- **YAML 数据源**: 通过易于编辑的 YAML 文件管理个人资料、项目和教学数据。
- **UnoCSS 样式**: 利用 UnoCSS 进行实用程序优先的样式设计，并提供可定制的主题。
- **模块化组件**: 可重用的组件，便于定制和扩展。
- **响应式设计**: 移动友好的布局，可在所有设备上实现最佳查看效果。
- **SEO 优化**: 内置 SEO 最佳实践，以增强可发现性。
- **深色模式支持**: 自动深色模式样式，提高在弱光环境下的可读性。
- **轻松部署**: 可在流行的静态网站托管平台上部署。

## 入门指南

### 您需要准备的

- [Node.js](https://nodejs.org/) (推荐 LTS 版本)
- [Bun](https://bun.sh/)

### 1. 设置您的网站

克隆仓库并安装依赖项：

```bash
git clone https://github.com/jxpeng98/astro-scholars.git
cd astro-scholars
bun install
```

### 2. 本地开发

启动本地开发服务器，查看您的网站：

```bash
bun dev
```

您的网站将在 `http://localhost:4321` 上可用。

## 可用命令

| 命令 | 操作 |
| :---------------- | :------------------------------------------------- |
| `bun install` | 安装依赖项 |
| `bun dev` | 在 `http://localhost:4321` 启动本地开发服务器 |
| `bun build` | 将生产站点构建到 `./dist/` |
| `bun preview` | 在本地预览生产版本 |
| `bun astro ...` | 访问 Astro CLI 命令 (例如, `bun astro check`) |

## 自定义指南

打造您自己的网站！通过编辑配置文件和数据文件来自定义您的网站。

### 品牌和导航

- 编辑 `src/side.config.ts` 以更改网站标题、作者姓名、英雄文案、社交链接、导航和页脚文本。
- `hero.profileImage` 接受 CDN URL 或相对路径 (例如, `assets/profile.svg`)。
- 社交链接图标可以使用 UnoCSS 图标类名 (例如, `i-logos:github-icon`)。这些都在 `uno.config.ts` 的安全列表中。

### 个人信息页面内容

- 修改 `src/data/about.yml` 以更新个人资料亮点、教育、经验条目和选定的服务。
- `src/pages/about.astro` 页面解析此 YAML - 编辑数据文件后无需更改代码。

### 发表和项目展示

- 使用 BibTeX 条目更新 `src/data/publications.bib`。解析后的条目将呈现在“研究”页面上。
- 在 `src/data/projects.yml` 中定义项目; `src/components/projects.ts` 中的帮助程序将该 YAML 转换为“项目”页面上显示的卡片。

### 博客文章

- 内容位于 `src/content/posts/` 下。添加与 `src/content/config.ts` 中模式匹配的 frontmatter 的 Markdown/MDX 文件。

### 教学相关

- 编辑 `src/data/teaching.yml` 以管理当前和过去的模块。“教学”页面读取此数据并按学期使用标签芯片对模块进行分组。

### 样式

- 实用程序类来自 UnoCSS。修改 `uno.config.ts` 中的快捷方式、预设或安全列表条目以调整主题样式。
- 全局布局样式 (页眉/页脚/网格) 位于 `src/layouts/Layout.astro` 中。

## 项目结构

```text
/
├── public/ # 静态文件按原样提供
├── src/
│ ├── assets/ # 图像、图标和主题图形
│ ├── components/ # 可重用的 UI 组件
│ ├── content/ # Markdown/MDX 博客文章
│ │ └── posts/
│ ├── data/ # 内容数据 (BibTeX & YAML 源)
│ │ ├── about.yml
│ │ ├── projects.yml
│ │ ├── publications.bib
│ │ └── teaching.yml
│ ├── layouts/ # 站点范围的布局 (页眉/页脚)
│ ├── lib/ # 实用程序帮助程序 (BibTeX 解析器、论文帮助程序)
│ ├── pages/ # 路由页面 (主页、关于、文章、项目、研究、教学)
│ └── side.config.ts # 全局站点配置 (品牌、链接、英雄)
├── uno.config.ts # UnoCSS 预设、快捷方式和安全列表
├── astro.config.mjs # Astro 配置
└── bun.lock / package.json
```

## 部署

此 Astro 项目是一个静态站点。要部署，请运行 `bun build` 并将 `dist/` 目录的内容上传到任何静态托管提供商，例如：

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 加入

我们欢迎任何贡献！请随时提交拉取请求或提出问题以讨论您的想法。

## 许可证

该项目根据 [MIT 许可证](./LICENSE) 获得许可。您可以根据许可证中描述的条款自由使用、修改和分发该主题。
