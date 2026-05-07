# .agents/skills/MEMORY.md

# 技能索引（由代理维护）
# 每一项为一个技能的索引记录，代理在安装/使用/卸载时应更新本文件。

# 示例条目（YAML 列表）
- name: example-skill
  version: "0.1"
  source: "local:example"
  tags: ["demo","example"]
  summary: "示例技能：打印问候并示范技能结构"
  installed_at: "2026-05-07"
  last_used: "2026-05-07"

# 注意：代理会以本文件作为快速索引，必要时可由 scripts/agents-index.py 自动更新。