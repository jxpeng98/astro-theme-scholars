# Scholar Pages：专为学者打造的 Astro 主题

这是一个专为学术界设计的 Astro 主题，旨在帮助您轻松搭建一个专业、高效且内容驱动的个人学术主页。

![Scholar Pages 主题桌面和移动端预览](https://r2imga.jxpeng.dev/2025/10/9dfa4106fa05badc9f5e80b4694c9309.png)

## 简介

Scholar Pages 致力于帮助学者、研究人员和学生建立优雅的在线形象。我们结合了 Astro 极速的静态生成能力与简洁的数据驱动管理方式，让您无需操心繁琐的代码，专注于展示您的研究成果。

主题设计兼顾了性能与个性化，支持自动解析 BibTeX 生成论文列表，通过 YAML 轻松管理个人履历，并采用 UnoCSS 打造了独特的素描风格视觉体验。

## 核心特性

- **Astro 驱动**: 基于 Astro 构建，生成极速、SEO 友好的静态网站。
- **素描质感设计**: 独特的极简美学，融合暖灰纸张色调与手绘风格阴影，呈现书卷气。
- **BibTeX 无缝集成**: 直接解析 BibTeX 文件，自动生成格式规范的出版物列表。
- **YAML 数据驱动**: 通过简单的 YAML 配置文件管理个人简介、项目和教学经历，清晰直观。
- **UnoCSS 样式**: 采用实用主义 CSS 引擎，样式定制灵活方便。
- **模块化组件**: 代码结构清晰，组件复用性强，易于二次开发。
- **智能响应式**: 移动端适配优化，配备自动折叠的导航菜单，在任何设备上都优雅美观。
- **SEO 优化**: 内置 SEO 最佳实践，提高您的学术主页在搜索引擎中的可见度。
- **深色模式**: 自动适配系统深色模式，提供舒适的夜间阅读体验。
- **轻松部署**: 适配 Vercel, Netlify, GitHub Pages 等主流静态托管平台。

## 快速开始

### 准备工作

- [Node.js](https://nodejs.org/) (推荐 LTS 版本)
- [Bun](https://bun.sh/) (包管理工具)

### 1. 初始化项目

克隆仓库并安装依赖：

```bash
git clone https://github.com/jxpeng98/astro-scholars.git
cd astro-scholars
bun install
```

### 2. 本地预览

启动开发服务器，实时预览您的网站：

```bash
bun dev
```

浏览器访问 `http://localhost:4321` 即可看到效果。

## 常用命令

| 命令 | 说明 |
| :---------------- | :------------------------------------------------- |
| `bun install` | 安装项目依赖 |
| `bun dev` | 启动本地开发服务器 (`http://localhost:4321`) |
| `bun build` | 构建生产环境代码到 `./dist/` 目录 |
| `bun preview` | 本地预览构建后的生产版本 |
| `bun astro ...` | 调用 Astro CLI 命令 (如 `bun astro check`) |

## 定制您的学术主页

无需深入代码细节，通过修改配置文件即可打造您的专属主页。

### 基础配置与导航

- **全局设置**: 编辑 `src/side.config.ts`，配置网站标题、作者名、首页标语、社交链接以及页脚信息。
- **头像设置**: `hero.profileImage` 支持填写 CDN 链接或本地路径 (如 `assets/profile.svg`)。
- **社交图标**: 支持 UnoCSS 图标库 (如 `i-logos:github-icon`)，图标需在 `uno.config.ts` 的 safelist 中注册。

### 个人简介 (About)

通过修改 `src/data/about.yml` 来更新您的个人履历。我们支持标准模块和自定义扩展模块。

**标准模块：**

- `hero`: 页面顶部的自我介绍。
- `profile`: 侧边栏的个人信息（如：职位、研究方向）。
- `education`: 教育背景列表。
- `experience`: 工作经历（支持多条目和详细描述）。
- `service`: 学术服务（支持简单文本或结构化信息）。

**自定义模块（新功能）：**
您可以通过 `sections` 字段添加任意自定义内容，例如“获奖情况”、“受邀演讲”或“媒体报道”。

```yaml
sections:
  - title: Awards
    items:
      - title: Best Paper Award
        subtitle: ACM CHI 2023
        date: 2023
        description: For the paper "Social Learning Signals in the Wild"
        link: https://example.com/award
      - title: NSF Graduate Research Fellowship
        date: 2016 — 2021
      # 也支持简单的文本条目
      - Dean's List, Clearwater College (2010-2014)
```

修改后，`src/pages/about.astro` 会自动渲染这些内容，无需修改代码。

### 研究成果与项目 (Research & Projects)

- **论文列表**: 将您的 BibTeX 条目复制到 `src/data/publications.bib`，系统会自动解析并在“Researches”页面展示。
- **项目展示**: 在 `src/data/projects.yml` 中定义您的项目信息，它们将以卡片形式展示在“Projects”页面。

### 博客 (Blog)

- 在 `src/content/posts/` 目录下创建 Markdown 或 MDX 文件即可发布文章。
- 文章头部信息 (Frontmatter) 需符合 `src/content/config.ts` 中的定义。

### 教学经历 (Teaching)

- 编辑 `src/data/teaching.yml` 管理您的课程信息。系统会自动按学期分组并生成标签展示。

### 样式定制

- 样式基于 UnoCSS。您可以在 `uno.config.ts` 中修改预设、快捷类名或添加安全列表。
- 全局布局（如页眉、页脚、容器宽度）可在 `src/layouts/Layout.astro` 中调整。

## 项目结构概览

```text
/
├── public/               # 静态资源目录（不会被构建处理）
├── src/
│   ├── assets/           # 图片、图标等资源
│   ├── components/       # UI 组件库
│   ├── content/          # 博客文章 (Markdown/MDX)
│   │   └── posts/
│   ├── data/             # 数据中心 (BibTeX & YAML)
│   │   ├── about.yml
│   │   ├── projects.yml
│   │   ├── publications.bib
│   │   └── teaching.yml
│   ├── layouts/          # 全局布局组件
│   ├── lib/              # 工具函数 (BibTeX 解析等)
│   ├── pages/            # 页面路由 (Home, About, Research 等)
│   └── side.config.ts    # 网站核心配置
├── uno.config.ts         # UnoCSS 样式配置
├── astro.config.mjs      # Astro 项目配置
└── bun.lock / package.json
```

## 部署上线

本项目是纯静态网站，部署非常简单。运行 `bun build` 后，将生成的 `dist/` 目录上传至任何静态托管服务即可：

- [Vercel](https://vercel.com/) (推荐)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 参与贡献

我们非常欢迎您的参与！无论是提交 Pull Request 修复 Bug，还是发起 Issue 讨论新功能，您的建议都能让这个主题变得更好。

## 开源协议

本项目采用 [MIT 许可证](./LICENSE)。您可以自由地使用、修改和分发本主题，只需保留原作者的版权声明。
