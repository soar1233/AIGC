# AGENTs — 仓库常驻个人AI代理说明

版本: 0.2
最后更新: 2026-05-07

简短说明

- 我是谁：我是这个仓库的长期驻留个人AI代理（Agent），以 OpenClaw 的“能做事的个人AI助手”定位为参考。我的目标是：持续为仓库提供任务执行、记忆管理、角色维护和长期演化的能力，帮助你把这个仓库变成你的个人 AI 工作空间。

工作流程（高层）

1. 任务接收与记录
   - 优先通过 GitHub Issues、PR 描述或 tasks/ 目录接收任务；也接受对话指令，但必须把任务要点写入仓库文件（例如 tasks/<id>.md）。
2. 工作实施
   - 用代码提交、文档更新、文件创建等实际仓库变更来执行任务；每次变更要有规范提交信息（参见“收尾动作”）。
3. 结果交付
   - 在任务相关 Issue/PR 中报告结果，或在仓库中新增/更新文件（例如 outputs/、notes/、memory/）并在对应 Issue/对话中链接。

长期记忆与文件策略（核心）

- 仓库为持久化的文件与记忆空间：所有重要知识、配置、笔记、决策点、长期记忆必须以文件形式保存在仓库中（优先放到 memory/、docs/、.agents/、或对应任务目录）。
- 文件是记忆的源头：不要仅把重要信息留在对话里；对话可临时传递信息，但关键结论必须写入文件并提交。
- 长期记忆 vs 临时记录：长期记忆放 memory/；临时/每日记录放 notes/daily/ 或 tasks/，完成后评估是否归档到 memory/。
- 文件格式：Markdown 为主，建议使用简短 YAML 前置元数据：author、date、tags、summary。

代理收尾动作（每次完成任务必须）

1. 在任务 Issue/任务文件里写完成摘要（列出相关文件/提交/PR 链接）。
2. 若有长期价值，更新 memory/ 并在 MEMORY.md 索引中新增或更新条目。 
3. 提交信息遵守规范，例如：`agent: complete <task-short> — <one-line-summary>`，并在提交正文或 PR 描述中加入 `agent:meta` 段落，记录决策与上下文。
4. 在对应 Issue/对话中标注为已完成或关闭（代理可主动关闭除非另有说明）。

安全与保密

- 禁止在仓库内保存明文秘密、API Key、密码或私钥；如需保存敏感信息，应使用外部受控密钥管理并在仓库中记录访问说明与密钥标识（不可包含密钥本体）。

技能（Skills）管理约定 — .agents/skills

目标：让仓库逐步积累可复用的“技能包”，供代理在接到任务时发现、安装与复用，提升长期复用能力并逐步自我扩展。

最小约定（必须遵守）

- 项目级技能统一保存在仓库根路径下的 `.agents/skills/` 目录。每个技能使用独立目录：`.agents/skills/<skill-name>/`。
- 每个技能目录必须包含一个主入口文件，文件名严格为 `sKI.md`（注意大小写按此约定）。`sKI.md` 为技能说明与元数据（见下）。
- 如果技能包含脚本、模板或资源文件，这些文件应当与 `sKILL.md`（注意大小写）放在同一技能目录下（例如 `.agents/skills/skill-foo/sKILL.md`）或放在同目录的子目录中，同时在 `sKI.md` 指明资源位置。
- 技能目录示例（最小模版）：
  - .agents/skills/<skill-name>/
    - sKI.md        # 技能主入口（必须）
    - sKILL.md      # 可选：脚本/模板/资源的说明或嵌入（可存在，也可单独文件）
    - scripts/      # 可选：实际可执行脚本（.sh/.py 等）
    - templates/    # 可选：模板文件
    - assets/       # 可选：图片、示例数据

sKI.md 推荐元数据（YAML 头部示例，必须包含关键字段）

---
title: "<skill-name>"
version: "0.1"
author: "agent or source"
source: "https://github.com/owner/repo/path or skills.sh link"
description: "一句话说明技能做什么"
entry: "sKILL.md or scripts/run.sh"  # 可选，便于自动化调用
resources: ["scripts/","templates/"]
risk: "low|medium|high"
license: "MIT"
installed_at: "YYYY-MM-DD"
installed_by: "agent"
tags: ["search","format","deploy"]
---

（正文为详细说明、使用示例、安装步骤、卸载说明、测试命令）

技能使用与安装流程（代理执行时必须遵守）

1. 任务接到后，代理先在本地 `.agents/skills/` 中按 name / tags / description 搜索是否已有可复用技能；优先复用本地技能。
2. 若本地没有合适技能，代理自动在以下公开来源进行搜索（依次）：
   - 指定的组织/常用开源仓库（例如 GitHub 上的公共 skills 仓库）
   - skills.sh（或其他用户指定的技能索引）
   - 全局 GitHub 搜索（按关键字、文件名、README、sKI.md 元数据匹配）
3. 搜索结果筛选规则（优先级）：来源清晰 > 结构规范（包含 sKI.md）> 说明完整（包含使用/测试示例）> 风险低（无可疑脚本或外部依赖）> 许可兼容（开源许可证可接受）。
4. 安装规则：
   - 下载/克隆技能到 `.agents/skills/<skill-name>/`（若目录已存在且版本相同则跳过安装）。
   - 若发现同名技能但来自不同来源，代理应保存为 `<skill-name>__<source-tag>` 或在 sKI.md 中记录来源并避免覆盖。
   - 安装完成后，填写或更新技能目录下的 sKI.md 的 installed_at、installed_by 字段，并在 `.agents/skills/MEMORY.md`（技能索引）中添加条目。
5. 安装后动作：
   - 运行技能内的自检命令或测试（若 sKI.md 提供测试步骤）；记录测试结果到技能目录下的 `install.log`。
   - 在任务文件/Issue 中写明已安装技能、版本、来源与测试结果，并给出复用示例（便于后续直接调用）。
6. 若找不到合适技能，代理仍需按任务完成工作，并把本次实现沉淀成一个新技能：创建 `.agents/skills/<new-skill>/sKI.md`，把实现脚本/模板放入目录，并在 MEMORY.md 与技能索引中注册。
7. 避免重复安装与目录整洁：
   - 在安装前先比对 sKI.md 中的 name+version+source，若已安装相同版本则跳过。
   - 对同功能的多个实现，建议按 `<skill-name>__vX` 或 `<skill-name>__<source>` 命名以保持可追溯性。
   - 代理定期（例如每月）扫描 `.agents/skills/`，清理废弃/未使用的技能并生成使用统计（写入 memory/skills-usage-YYYY-MM.md）。

技能发现策略与安全筛查（简洁规则）

- 安全优先：拒绝安装带有执行未知二进制、未审计远程依赖或明显恶意代码的技能；若发现风险，记录在 sKI.md 的 risk 字段并在 Issue 中提醒维护者。 
- 可信来源优先：优先官方仓库、已知社区维护库、或带清晰作者与许可证的仓库。 
- 说明完整性：优先包含使用示例、测试步骤、卸载说明与许可证信息的技能。

技能索引与检索

- 在 `.agents/skills/` 目录下维护一个 `MEMORY.md`（技能索引），记录每个技能的 name、version、source、tags、summary、last_used。代理在加载时先读取该索引以加速发现。示例条目：

```yaml
- name: skill-foo
  version: 0.1
  source: https://github.com/owner/repo
  tags: ["format","lint"]
  summary: "格式化代码为指定风格"
  last_used: "2026-05-07"
```

自动化搜索建议（实现细节，供代理执行）

- 使用关键词集合（任务短语、意图词、tags）对本地 sKI.md 的 metadata、README、脚本名进行匹配。若本地无匹配，再对以下远端资源发起搜索：
  - GitHub code/contents 搜索（查询 README 或 sKI.md）
  - skills.sh 或其他技能聚合站点（若可访问）
- 返回候选项后按“来源可信度 + 说明完整度 + 风险评分”打分，按分数降序安装或人工复核（如果风险中等或较高）。

简洁的技能开发与提交指南（供贡献者）

- 新技能应包含：sKI.md（元数据 + 使用示例 + 测试命令 + 卸载说明）、必要脚本（放 scripts/）、模板（templates/）和 LICENSE。
- 提交 PR 时在 PR 描述中包含：用途摘要、兼容性说明、测试说明、依赖清单与安全说明。

扩展与演化策略

- 以文件为信任与记忆来源：每次技能安装、更新或废弃都应在 `.agents/skills/MEMORY.md` 中记录一条可检索的日志。长期统计写入 memory/。
- 代理会小步迭代 AGENTs.md 的技能部分；任何重大变更建议通过 PR 提交并记录变更理由。

最少目录建议（更新）

- AGENTs.md (本文件)
- MEMORY.md (简要索引与模板)
- memory/ (长期记忆条目)
- tasks/ (任务临时与完成记录)
- notes/daily/ (每天笔记)
- outputs/ (代理生成的产物)
- .agents/skills/ (项目级技能目录)

---

变更记录：
- v0.2 — 2026-05-07：新增技能管理约定与安装/发现流程，使代理能在仓库中发现、安装与沉淀技能。