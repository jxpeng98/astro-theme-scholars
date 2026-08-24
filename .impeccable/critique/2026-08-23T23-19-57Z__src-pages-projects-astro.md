---
target: src/pages/projects.astro paired with src/pages/teaching.astro
total_score: 24
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
timestamp: 2026-08-23T23-19-57Z
slug: src-pages-projects-astro
---
# Projects 与 Teaching 构建样式复审

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 4 | 分组、数量、学期和状态均持续可见。 |
| 2 | Match System / Real World | 2 | `Current courses` 与 2024/2025 学期不匹配，`studios` 也不能涵盖所有课程类型。 |
| 3 | User Control and Freedom | 4 | 整卡可点击，导航、返回路径和键盘焦点明确。 |
| 4 | Consistency and Standards | 3 | Teaching 当前课程的东北箭头看似外链，但实际是站内详情页。 |
| 5 | Error Prevention | 4 | 九个项目与课程目标均可打开，没有死链或交互陷阱。 |
| 6 | Recognition Rather Than Recall | 4 | 项目周期、课程代码、学期和历史开设信息都在列表中直接呈现。 |
| 7 | Flexibility and Efficiency | n/a | 小型学术作品集没有重复任务流；当前数量也不需要筛选器。 |
| 8 | Aesthetic and Minimalist Design | 3 | 视觉克制且成熟，但 Projects 首项和 Teaching 当前区块偏高。 |
| 9 | Error Recovery | n/a | 页面没有输入、交易或可恢复的任务状态。 |
| 10 | Help and Documentation | n/a | 作品集浏览不需要独立帮助系统。 |
| **Total** |  | **24/28** | **Good** |

## Design Specificity Verdict

整体是为学术作品集定制的，而不是可互换的通用卡片模板。Projects 以研究状态和案例层级组织，Teaching 以学期和开课历史组织，两者具有明确领域语义。自动检测对两个页面返回 0 项；浏览器证据确认桌面与 390px 移动端均无横向溢出、运行时错误或链接失败。当前主要问题来自内容与视觉权重，而非组件质量。

没有注入可见 overlay。检测器没有产生标记目标，因此以独立 viewport、DOM 几何、标题结构和链接导航作为证据。

## Overall Impression

结论是清晰明了，可以继续沿用现有构建方法，不需要重新做一套 grid。Projects 的阅读负担低，Teaching 为中低；用户路径都是标题、当前或重点内容、历史索引。最大机会是让 Teaching 的“当前”语义可信，并压缩两个页面中过度占高的内容块。整体情绪克制、可信、接近学术编辑设计；陈旧的 Current 标记会突然削弱这种可信感。

## What's Working

1. Projects 的 `Active projects` 与 `Past projects` 建立了立即可识别的主次关系；特色案例与线性索引也明确表达不同重要度。
2. Teaching 的学期分组与 `Teaching ledger` 能同时回答“现在教什么”和“过去教过什么”；同一课程的历史学期被合并后仍保留详情入口。
3. 两页都有正确标题层级、完整整行点击目标、可见键盘焦点，并在移动端自然堆叠。所有九个站内详情链接都已成功打开。

## Priority Issues

1. **[P1] Teaching 的 Current 与实际时间冲突**
   - **Why it matters**: 2026 年页面将 Spring 2025 和 Fall 2024 标为 Current，会让招聘委员会和学生质疑信息是否维护。
   - **Fix**: 若课程仍代表近期教学，改为 `Recent courses`；若确实是当前课程，更新 frontmatter 的学期与状态。
   - **Suggested command**: `$impeccable clarify`

2. **[P2] Projects 的特色项目占据过多首屏高度**
   - **Why it matters**: 移动端特色卡约 346×608px，研究广度被推迟到很靠后的位置，页面更像软件产品展示而不是学术项目索引。
   - **Fix**: 只降低封面高度和特色卡纵向 padding，不改变现有 featured + index 结构。
   - **Suggested command**: `$impeccable layout`

3. **[P2] Teaching 当前课程区块过高，历史教学被埋深**
   - **Why it matters**: Ledger 约在桌面 1086px、移动端 1407px 后才出现；评审者需要越过多层学期计数、标签和元数据才能看到教学广度。
   - **Fix**: 收紧 term header 与 course row 的垂直间距，并减少重复的 course count；保留现有分组逻辑。
   - **Suggested command**: `$impeccable distill`

4. **[P2] Teaching 的词汇与箭头语法不完全一致**
   - **Why it matters**: `term-based studios` 不能准确描述 seminar 和 core course；桌面当前课程使用东北箭头，却跳转站内详情，容易被理解为外链。
   - **Fix**: 文案改为 `Active courses grouped by term.`，所有站内详情统一使用右箭头；东北箭头只保留给外部 href。
   - **Suggested command**: `$impeccable clarify`

## Persona Red Flags

- **招聘委员会成员**: 能快速理解分组，但过时的 Current 状态会影响可信度；过大的 Projects 特色卡会延迟看到研究范围。
- **潜在合作者或同行**: 项目技术栈很清楚，但索引页没有直接展示合作者、成果或资助信息；这不是缺陷，但若合作转化是目标，可以替换一项低价值技术标签。
- **学生**: 课程代码和摘要足够清楚，但 `Teaching ledger` 不如 `Past courses` 直观；Current 的时间歧义最可能造成实际误解。

## Minor Observations

- 两个页面都没有横向溢出、console 错误、重复 ID 或无名称控件。
- Footer 的 Repository、Documentation、Releases 在 390px 下高度约 17px，低于 44px 触控建议；这是共享 Layout 的 P3 问题，不是 Projects 或 Teaching 的构建问题。
- 目前仅有 3 个项目和 6 个 teaching offerings，FilterBar 因阈值不显示是正确的，现阶段不应新增筛选 UI。
- 全页截图在 `content-visibility:auto` 附近出现浏览器合成伪影；普通 viewport 截图与 DOM 几何均未发现真实重复布局。

## Questions to Consider

1. Teaching 的首要目标更偏向展示当前教学，还是完整教学履历？这决定标题应使用 `Current`、`Recent` 还是直接以年份分组。
2. Projects 的特色项目是否必须保持案例主导，还是应让招聘者在首屏看到更多研究广度？
3. 下一轮是只处理 P1 与两个页面的高度比例，还是同时统一箭头语法与 footer 触控目标？
