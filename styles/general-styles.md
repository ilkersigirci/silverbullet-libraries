---
name: Library/ilkersigirci/styles/general-styles
tags: meta/library
---

# General Styles

Increase editor width

```space-style
html {--editor-width: 1000px;}
```

OfflineMode Badge

```space-style
#sb-top.sb-sync-error {
    position: relative;
}

#sb-top.sb-sync-error::after {
  content: "";
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.5em;
  height: 0.5em;
  padding: 0.7em 1.5em;
  border-radius: 2em;
  color: white;
  background: oklch(80% 0.35 40 / 0.2)
              url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'><path d='M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47'/><path d='M8 16H3v5'/><path d='M3 12C3 9.51 4 7.26 5.64 5.64'/><path d='m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64'/><path d='M21 12c0 1-.16 1.97-.47 2.87'/><path d='M21 3v5h-5'/><path d='M22 22 2 2'/></svg>")
              no-repeat center;
  background-size: 40%; /* keeps icon smaller inside */
  backdrop-filter: blur(10px) saturate(200%);
  -webkit-backdrop-filter: blur(10px) saturate(100%);
}
```
