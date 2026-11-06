---
tags: meta
---

# Test space config

Opens both sidebars by default, so screenshots cover the tree and the table of contents.

```space-lua
-- priority: 90
config.set("view.defaults", {
  ["std.spaceTree"] = { dock = "lhs", open = true, width = 280 },
  ["std.toc"] = { dock = "rhs", open = true, width = 240 },
})
```
