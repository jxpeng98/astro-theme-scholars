# Scholar Pages：专为学术打造的 Astro 主题

一款现代、优雅的学术个人主页主题。基于 Astro 构建，采用精致的卡片式设计，支持 BibTeX 自动解析，完美适配深色模式。

![Scholar Pages 主题桌面和移动端预览](https://r2imga.jxpeng.dev/2025/10/9dfa4106fa05badc9f5e80b4694c9309.png)

## ✨ 核心特性

- **⚡ Astro 驱动** - 极速静态生成，默认零 JavaScript 负担
- **🎨 现代卡片设计** - 精致的卡片式 UI，配合悬停效果、渐变和微动画
- **📚 BibTeX 集成** - 自动解析论文，支持分类筛选
- **🌙 深色模式** - 流畅切换明暗主题，自动跟随系统偏好
- **📱 全面响应式** - 移动优先设计，自适应导航栏
- **🎯 SEO 优化** - 内置 meta 标签、站点地图、语义化 HTML
- **🔧 配置简单** - 单一 TypeScript 配置文件掌控全局
- **📝 YAML 数据源** - 通过 YAML 文件轻松管理内容
- **🏷️ 筛选系统** - Research、Projects、Teaching 页面支持交互式分类筛选
- **🎭 UnoCSS 样式** - 实用优先的 CSS，主题色随心定制

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) (推荐 v18+)
- [Bun](https://bun.sh/) (推荐) 或 npm/pnpm

### 安装步骤

\`\`\`bash
# 克隆仓库
git clone https://github.com/jxpeng98/astro-scholars.git
cd astro-scholars

# 安装依赖
bun install

# 启动开发服务器
bun dev
\`\`\`

浏览器访问 \`http://localhost:4321\` 即可预览

### 常用命令

| 命令            | 说明                                |
| --------------- | ----------------------------------- |
| \`bun dev\`       | 启动开发服务器（热更新）            |
| \`bun build\`     | 构建生产版本到 \`./dist/\`            |
| \`bun preview\`   | 本地预览生产版本                    |
| \`bun astro ...\` | 运行 Astro CLI 命令（如 \`astro check\`）|

---

## 📖 配置指南

### 站点配置 (\`src/side.config.ts\`)

这是整个网站的核心配置文件，所有设置一目了然：

\`\`\`typescript
export const siteConfig: SiteConfig = {
  // ─────────────────────────────────────────────────────────────
  // 🏠 基础信息
  // ─────────────────────────────────────────────────────────────
  
  /** 浏览器标签页标题 */
  title: '张三 | 学术主页',
  
  /** 您的姓名（显示在页头和页脚） */
  author: '张三',
  
  /** SEO 描述（出现在搜索结果中） */
  description: '专注于学习分析与人机交互研究...',
  
  /** 网站图标路径（相对于 /public） */
  favicon: '/favicon.svg',
  
  /** SEO 关键词 */
  keywords: ['学习分析', '人机交互', '研究'],

  // ─────────────────────────────────────────────────────────────
  // 🎓 学术档案
  // ─────────────────────────────────────────────────────────────
  
  /** 所属机构（显示在首页） */
  affiliations: [
    {
      role: '助理教授',
      department: '信息学院',      // 可选
      institution: '某某大学',
      url: 'https://example.edu',  // 可选，添加链接
    },
  ],

  /** 研究兴趣（首页显示为标签） */
  researchInterests: [
    '学习分析',
    '人机交互',
  ],

  // ─────────────────────────────────────────────────────────────
  // 🔗 社交链接
  // 图标库：https://icones.js.org（推荐 'academicons' 或 'mdi' 系列）
  // ─────────────────────────────────────────────────────────────
  
  socialLinks: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/...', icon: 'i-academicons:google-scholar' },
    { label: 'ORCID', href: 'https://orcid.org/...', icon: 'i-academicons:orcid' },
    { label: 'GitHub', href: 'https://github.com/...', icon: 'i-mdi:github' },
    { label: '邮箱', href: 'mailto:you@example.edu', icon: 'i-mdi:email-outline' },
    { label: 'Twitter', href: 'https://twitter.com/...', icon: 'i-mdi:twitter' },
  ],

  // ─────────────────────────────────────────────────────────────
  // 🧭 导航菜单
  // ─────────────────────────────────────────────────────────────
  
  navLinks: [
    { href: '/about', label: 'About' },
    { href: '/researches', label: 'Research' },
    { href: '/teaching', label: 'Teaching' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Blog' },
  ],

  // ─────────────────────────────────────────────────────────────
  // 📝 页脚
  // ─────────────────────────────────────────────────────────────
  
  footer: {
    copyright: '保留所有权利',
  },

  // ─────────────────────────────────────────────────────────────
  // 🏠 首页头图区域
  // ─────────────────────────────────────────────────────────────
  
  hero: {
    headline: '用一句话概括您的研究方向',
    subheadline: '更详细的自我介绍，描述您的研究工作和学术兴趣...',
    profileAlt: '张三的头像',
    profileImage: '/profile.svg',  // 或完整 URL
    statusBadge: '📬 欢迎合作',    // 可选
  },

  // ─────────────────────────────────────────────────────────────
  // 📄 各页面描述（SEO 及副标题）
  // ─────────────────────────────────────────────────────────────
  
  pageDescriptions: {
    about: '关于我的简介...',
    researches: '研究方向与成果介绍...',
    projects: '项目展示说明...',
    teaching: '教学理念介绍...',
    posts: '博客简介...',
  },
};
\`\`\`

---

## 📄 页面详解

### 🏠 首页 (\`/\`)

首页展示以下内容：

- **头图区域**：头像、姓名、所属机构、状态徽章、个人简介、研究兴趣、社交链接
- **精选论文**：展示 3 篇重点论文（BibTeX 中 \`public = {yes}\` 的条目）
- **最新博客**：最近 3 篇博客文章

**卡片设计特点：**

- 悬停时左侧出现渐变色装饰线
- 摘要可展开，配有引号图标样式
- 操作按钮包括 Abstract 和 PDF 链接

### 👤 关于页面 (\`/about\`)

**数据来源：** \`src/data/about.yml\`

\`\`\`yaml
hero:
  title: About
  description: 简短的自我介绍...

education:
  - degree: 博士，人机交互
    institution: 某某大学
    year: 2021
  - degree: 硕士，学习科学
    institution: 某某研究院
    year: 2016

experience:
  - role: 助理教授
    organization: 信息学院
    period: 2022 — 至今
    bullets:
      - 主持学习信号实验室
      - 教授人机交互与 AI 研究生课程

service:
  # 结构化格式
  - role: 程序委员会主席
    organization: ACM 某某会议
    period: 2023 — 2024
  # 简单文本格式
  - 某某期刊编委会成员

# 自定义模块（如获奖、演讲等）
sections:
  - title: 获奖情况
    items:
      # 详细条目
      - title: 最佳论文奖
        subtitle: ACM CHI 2023
        date: 2023
        description: 论文《社交学习信号研究》
        link: https://example.com/award
      # 简单条目
      - 院长奖学金 (2010-2014)
\`\`\`

**卡片设计特点：**

- 教育经历卡片带学校图标和年份徽章
- 工作经历卡片带时间线圆点装饰
- 学术服务采用双列网格布局，配星标图标
- 获奖模块带奖杯图标和渐变背景

### 📚 研究页面 (\`/researches\`)

**数据来源：** \`src/data/publications.bib\`

**BibTeX 字段说明：**

\`\`\`bibtex
@inproceedings{key2024paper,
  title = {论文标题},
  author = {张, 三 and 李, 四},
  booktitle = {会议名称},           % 或 journal = {...}
  year = {2024},
  url = {https://doi.org/...},     % 可选，添加 PDF 链接
  abstract = {论文摘要...},         % 可选，添加可展开摘要
  public = {yes},                  % yes = 已发表, wp = 工作论文, wip = 进行中
  keywords = {关键词1, 关键词2}     % 可选
}
\`\`\`

**分类规则：**

| \`public\` 值 | 分类 |
|-------------|------|
| \`yes\` | Publication（已发表） |
| \`wp\` | Working Paper（工作论文） |
| \`wip\` | Work in Progress（进行中） |
| (其他/缺失) | Other（其他） |

**页面功能：**

- **筛选栏**：点击切换分类（全部 / 已发表 / 工作论文 / 进行中）
- **编号卡片**：每篇论文带主题色序号徽章
- **元信息徽章**：期刊/会议名带书签图标，年份带日历图标
- **操作按钮**：可展开摘要（带引号样式）、PDF 链接
- **条件显示**：空字段（如作者、期刊）自动隐藏

### 💼 项目页面 (\`/projects\`)

**数据来源：** \`src/data/projects.yml\`

\`\`\`yaml
- title: 项目名称
  period: 2023 — 至今    # 包含「至今」会归类为进行中
  description: 项目简介...
  tech:
    - Astro
    - TypeScript
    - PostgreSQL
  url: https://github.com/...   # 可选
\`\`\`

**页面功能：**

- **自动分组**：period 包含「Present」或「至今」→ Active；其他 → Past
- **筛选栏**：全部 / Active / Past 筛选
- **状态指示器**：绿色闪烁圆点 + "Active" 标签
- **技术栈标签**：代码图标 + 技术名称
- **悬停效果**：显示「View Project →」引导文字（需有 URL）

### 📖 教学页面 (\`/teaching\`)

**数据来源：** \`src/data/teaching.yml\`

\`\`\`yaml
current:
  - term: 2025 春季
    modules:
      - title: 课程名称
        code: INFO 742
        summary: 课程简介...
        tags:                    # 可选
          - 研究生
          - 研讨课
        link:                    # 可选
          label: 课程网站
          href: https://...

past:
  - term: 2024 秋季
    modules:
      - title: 往期课程
        code: INFO 511
        summary: 课程内容...
\`\`\`

**页面功能：**

- **筛选栏**：全部 / 当前 / 往期筛选
- **学期分组**：按学期组织课程
- **当前课程标识**：左侧渐变装饰条
- **课程代码徽章**：学校图标 + 课程编号
- **标签样式**：# 前缀的分类标签
- **链接按钮**：新标签页打开课程网站

### ✍️ 博客页面 (\`/posts\`)

**数据来源：** \`src/content/posts/*.md\`

**Frontmatter 格式：**

\`\`\`yaml
---
title: 文章标题
description: 简短摘要...   # 可选
publishedAt: 2024-01-15
draft: false              # 设为 true 则不显示
---
\`\`\`

**页面功能：**

- **年份分组**：按年份组织文章，配渐变分隔线
- **文章数量**：每年显示文章数徽章
- **阅读时间**：根据内容长度自动估算
- **卡片设计**：整卡可点击
- **悬停效果**：显示「Read more →」引导文字

---

## 🎨 设计系统

### 卡片组件

所有页面采用统一的卡片设计：

\`\`\`text
┌─────────────────────────────────────────┐
│  • 标题（悬停变色）                      │
│  📍 元信息（带图标）                     │
│  描述文字（超出截断）                    │
│  [标签] [标签] [标签]                    │
│  🔗 操作链接（悬停显示）                 │
└─────────────────────────────────────────┘
\`\`\`

**通用卡片样式：**

- \`rounded-xl\` 圆角
- 白色背景（深色模式：gray-900/50）
- 悬停时边框变为主题色
- 微妙阴影效果（\`shadow-accent-500/5\`）
- 300ms 平滑过渡动画

### 配色方案

主题采用语义化配色系统：

| 颜色 | 用途 |
|------|------|
| \`accent-*\` | 主题色，链接，激活状态 |
| \`gray-*\` | 文字，背景，边框 |
| \`emerald-*\` | 活跃/成功状态（状态徽章） |
| \`amber-*\` | 获奖和荣誉 |

### 图标

图标通过 UnoCSS 图标预设提供：

- **学术类**：\`i-academicons:*\`（Google Scholar、ORCID、ResearchGate）
- **通用类**：\`i-mdi:*\`（GitHub、邮箱、日历等）
- **界面类**：\`i-ph:*\`（主题切换、菜单图标）

图标查找：[icones.js.org](https://icones.js.org)

---

## 📁 项目结构

\`\`\`text
/
├── public/                    # 静态资源
│   ├── favicon.svg
│   ├── profile.svg
│   └── robots.txt
├── src/
│   ├── assets/                # 需处理的图片
│   ├── components/            # 共享组件
│   │   └── projects.ts        # 项目数据加载器
│   ├── content/               # 博客文章（Astro Content Collections）
│   │   ├── config.ts          # 内容 schema
│   │   └── posts/             # Markdown 文章
│   ├── data/                  # YAML 和 BibTeX 数据
│   │   ├── about.yml          # 关于页面内容
│   │   ├── projects.yml       # 项目列表
│   │   ├── publications.bib   # 学术论文
│   │   └── teaching.yml       # 教学课程
│   ├── layouts/
│   │   └── Layout.astro       # 主布局（页头、页脚、主题）
│   ├── lib/                   # 工具函数
│   │   ├── bibtex.ts          # BibTeX 解析器
│   │   └── papers.ts          # 论文数据处理
│   ├── pages/                 # 页面路由
│   │   ├── index.astro        # 首页
│   │   ├── about.astro        # 关于
│   │   ├── researches.astro   # 研究
│   │   ├── projects.astro     # 项目
│   │   ├── teaching.astro     # 教学
│   │   └── posts/
│   │       ├── index.astro    # 博客列表
│   │       └── [slug].astro   # 文章详情
│   ├── types/
│   │   └── config.ts          # TypeScript 类型定义
│   └── side.config.ts         # ⭐ 核心配置文件
├── uno.config.ts              # UnoCSS 配置
├── astro.config.mjs           # Astro 配置
└── package.json
\`\`\`

---

## 🚀 部署上线

构建并部署到任意静态托管服务：

\`\`\`bash
bun build
\`\`\`

将 \`dist/\` 文件夹上传至：

- [Vercel](https://vercel.com/) - 零配置，自动部署
- [Netlify](https://netlify.com/) - 拖拽部署
- [Cloudflare Pages](https://pages.cloudflare.com/) - 全球 CDN
- [GitHub Pages](https://pages.github.com/) - 免费托管

### Vercel（推荐）

\`\`\`bash
# 安装 Vercel CLI
npm i -g vercel

# 一键部署
vercel
\`\`\`

### Netlify

\`\`\`bash
# 构建命令: bun build
# 发布目录: dist
\`\`\`

---

## 🔧 自定义技巧

### 修改主题色

编辑 \`uno.config.ts\` 中的主题色配置：

\`\`\`typescript
theme: {
  colors: {
    accent: {
      50: '#f0f9ff',
      // ... 自定义各色阶
      600: '#0284c7',
    }
  }
}
\`\`\`

### 添加社交链接

1. 在 [icones.js.org](https://icones.js.org) 查找图标类名
2. 添加到 \`side.config.ts\` 的 \`socialLinks\`
3. 如需要，在 \`uno.config.ts\` 的 safelist 中注册图标

### 自定义页面模块

在 \`about.yml\` 中添加新模块：

\`\`\`yaml
sections:
  - title: 您的模块标题
    items:
      - 内容条目
\`\`\`

---

## 🤝 参与贡献

欢迎参与项目建设！您可以：

- 🐛 通过 [Issues](https://github.com/jxpeng98/astro-scholars/issues) 反馈问题
- 💡 提出功能建议
- 🔧 提交 Pull Request

---

## 📄 开源协议

[MIT 许可证](./LICENSE) - 可自由使用、修改和分发。