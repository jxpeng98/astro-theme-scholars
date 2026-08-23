---
target: current Scholar Pages theme for academic slides
total_score: 21
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-23T09-12-32Z
slug: src-pages-index-astro
---
# Scholar Pages 主题设计审查

Method: dual-agent (A: `/root/design_review`, B: `/root/detector_evidence`)

## Design Read

这是面向研究者、学生、招聘委员会与潜在合作者的 academic portfolio 网站，视觉语言应是现代学术出版物与清晰数字界面的结合。建议目标参数为 `DESIGN_VARIANCE 5 / MOTION_INTENSITY 2 / VISUAL_DENSITY 6`。

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | 导航与筛选状态清楚，静态站点不需要更强反馈 |
| 2 | Match System / Real World | 3 | 学术语言自然，但 Research、Publications、Notes、Blog 命名有轻微漂移 |
| 3 | User Control and Freedom | 3 | 导航、All 筛选、Escape 关闭与返回顶部都完整 |
| 4 | Consistency and Standards | 3 | 体系统一，但 Phosphor 与 MDI 图标笔画不一致 |
| 5 | Error Prevention | 3 | 筛选为受限按钮且 URL 状态经过校验，几乎没有高风险输入 |
| 6 | Recognition Rather Than Recall | 3 | 标签、数量与激活态可见，长页面的定位仍可加强 |
| 7 | Flexibility and Efficiency | n/a | 公共学术作品集不是重复生产力工作流 |
| 8 | Aesthetic and Minimalist Design | 3 | 克制易读，但重复 kicker、编号和等权重区块削弱叙事 |
| 9 | Error Recovery | n/a | 所审查页面没有有意义的错误工作流 |
| 10 | Help and Documentation | n/a | 自解释的学术作品集不需要产品帮助系统 |
| **Total** | | **21/28** | **Good** |

## Design Specificity Verdict

主题有明确的学术气质，但这种特异性主要来自 Crimson Pro、出版物元数据、编号和纸张色。结构本身仍可被作家、顾问或工作室网站直接复用。若要进一步建立 Scholar Pages 的辨识度，应该加入一项真正的研究证据，例如代表性图表、研究模型、关键结论或引用，而不是继续增加卡片、玻璃或装饰。

自动检测扫描 `src` 下 40 个文件，只发现 2 个 warning：

- `flat-type-hierarchy` 指向 `src/layouts/Layout.astro:393`，实际是图标字号选择器。浏览器实测首页移动端 H1 为 40px、内页为 36px，因此属于误报。
- `side-tab` 指向 `src/pages/index.astro:218`，实际是折叠 abstract 内的 2px 语义强调线，不是重复卡片装饰，属于合理例外。

## Overall Impression

桌面端成熟、克制、可信，研究列表尤其扎实。最大机会不是换一套风格，而是把“学术内容”从文字与元数据提升为清晰的论点与证据，同时减少模板化的小标签与编号。移动端是当前主要体验短板。

## What's Working

- Crimson Pro 与 Atkinson Hyperlegible 的组合兼顾学术感与屏幕可读性。
- 纸张色、墨色、低饱和学术蓝、深浅主题形成稳定且一致的品牌基础。
- skip link、焦点态、原生 details、aria-pressed、44px 控件、Escape、reduced motion、reduced transparency 与 forced colors 构成优秀的可访问性底座。
- 出版物信息架构务实：标题、作者、venue、year、筛选与 abstract 渐进披露都清楚。

## Priority Issues

### [P1] “academic slides” 可能是产品目标错位

如果需求是实际演示文稿，当前连续滚动、响应式、可搜索的网站结构不能通过换皮变成 slides。建议保留网站主题，并共享色彩与字体，另建 16:9 的 presentation surface，补齐固定画布、引用脚注、figure layout、演讲者视图与打印行为。若只是希望网站有 slide-like confidence，则只把“一节一个论点、一项证据”的节奏应用到首页。

Suggested command: `$impeccable shape`

### [P1] 学术语义有了，学术证据还不够

首页有研究宣言与元数据，但没有 figure、研究模型、关键发现或代表性引用。加入一个真正的 scholarly artifact，会比再加卡片或动画更有效地建立权威感。

Suggested command: `$impeccable bolder`

### [P1] 移动端首屏推迟了核心价值

实测 312px CSS viewport 下首页 hero 高 964px，H1 本身高 235px，代表性出版物要经过很长滚动才出现。需要降低移动端标题尺度与行数、压缩身份与状态信息，并让一项研究证据或主要动作更早出现。

Suggested command: `$impeccable adapt`

### [P2] Demo 语义削弱信任

绿色圆点加 “Demo content” 看起来像在线状态，Repository、Documentation、Releases 又更像模板项目而不是学者身份。应选择一条清晰路径：使用完整的虚构学者案例，或把 theme demo 导航与 portfolio 内容分开。

Suggested command: `$impeccable clarify`

### [P2] 研究筛选在窄屏上节奏零碎

四个筛选项在 312px 下占三行，第一条文献进一步下移。优先移除非必要图标、缩短标签或采用横向滚动。不要提前增加搜索或年份筛选，等真实文献规模证明需要时再加。

Suggested command: `$impeccable distill`

## Academic Slides Optimization Direction

### 推荐：网站做 targeted evolution

1. 每页只保留一个 page kicker，删除 section-number kicker 与重复的 `Research series`、`Additional record` 等微标签。
2. 保留现有字体与配色，但把层级集中在 page title、section heading、entry title、metadata 四级。
3. 首页增加一个真实 figure-first 区块，结构固定为一个结论、一张图、一行来源。
4. 将等宽三卡片 posts 改为更像期刊目录的 featured + compact list，教学与履历也优先使用分组和留白而非卡片。
5. 仅在 sticky header 与 mobile popover 使用 blur，其他 `glass-control` 回归普通边框与填充。
6. 移动端首屏目标控制在约 650-720px，让研究证据在第二屏顶部出现。

### 如果要做真实 slides

复用现有 `paper / ink / accent` 颜色与字体，但新建独立布局规范：16:9 safe area、标题页、claim + evidence、figure full bleed、双栏方法、引用页、Q&A 与参考文献。不要把网站 navbar、筛选器、卡片和 hover 状态带进 slides。

## Persona Red Flags

- **Jordan，首次访问者**：无法立刻判断这是学者网站还是主题 demo；Research、Publications、Notes、Blog 命名不统一，也没有清晰的 CV、Contact 或首要学术行动。
- **Casey，移动用户**：学术可信度证据被 964px hero 推迟；研究筛选占三行。触控目标尺寸本身合格。
- **Sam，键盘与读屏用户**：基础表现很强。主要风险是移动菜单打开时底层内容仍然可见且可能保持可聚焦，当前上下文可能不够明确。

## Minor Observations

- active filter 的边框叠加 focus outline 略显厚重。
- Phosphor 与 MDI 混用带来细微的笔画差异。
- `Research record`、`Research series`、编号 kicker 与 uppercase tracking 使用过多。
- 页脚缺少一个值得记住的结尾动作，例如 Contact、CV 或 Collaboration。

## Questions to Consider

- 目标是借用 slides 的表达力度，还是要产出真正的 academic presentation theme？
- 首页第一屏后，委员会成员或合作者应该只记住哪一个研究观点？
- 哪一项真实 figure 能比更多卡片、玻璃或动画更快建立可信度？
