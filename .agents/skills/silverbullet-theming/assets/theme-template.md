---
name: Library/<author>/styles/<theme>
tags: meta/library
files:
  - <theme>/<Font>.woff2
  - <theme>/LICENSE-<Font>.txt
---

# <Theme>

One paragraph on what the theme looks like. If it's a port, credit it: "A port of [<Source>](<url>) (<licence>, © <author>) to SilverBullet 2.x."

## Customize

Override any `--xx-*` variable from your own `space-style`. This theme loads at `priority: -10`, so give your block a lower priority and the same selectors:

```css
/* priority: -20 */
html[data-theme]:root { --xx-line-width: 900px; }
html[data-theme="dark"]:root { --xx-accent: #7aa2f7; }
```

(That is a plain `css` block, so it does nothing here. Paste it into a `space-style` block to use it.) To turn the theme off, rename the `space-style` fences on this page to `css`.

Fonts: `<Font>` (licence in `<theme>/LICENSE-<Font>.txt`) installs with this library. URLs are relative, so they also work under a URL prefix.

## Fonts

```space-style
/* priority: -10 */
@font-face {
  font-family: "<Theme> Text";
  src: url(".fs/Library/<author>/styles/<theme>/<Font>.woff2") format("woff2");   /* relative: no leading slash */
  font-weight: 100 900;
  font-display: swap;
}
```

## Tokens

```space-style
/* priority: -10 */
html:root {
  --xx-font-text: "<Theme> Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --xx-font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --xx-text-size: 16px;
  --xx-line-height: 1.6;
  --xx-radius: 8px;
  --xx-line-width: 740px;
}

html[data-theme="light"]:root {
  --xx-bg: #ffffff;
  --xx-bg-alt: #f7f7f7;
  --xx-chrome: #f2f2f2;
  --xx-border: #e5e5e5;
  --xx-text: #222222;
  --xx-muted: #6b6b6b;
  --xx-faint: #a0a0a0;
  --xx-accent: #5b5bd6;
  --xx-hover: rgb(0 0 0 / 0.05);
}

html[data-theme="dark"]:root {
  --xx-bg: #1a1a1a;
  --xx-bg-alt: #202020;
  --xx-chrome: #141414;
  --xx-border: #2e2e2e;
  --xx-text: #dddddd;
  --xx-muted: #9a9a9a;
  --xx-faint: #666666;
  --xx-accent: #8f8ff0;
  --xx-hover: rgb(255 255 255 / 0.06);
}
```

## SilverBullet variables

Feeds the tokens into SB's own variables, so built-in and library UI pick them up. See the skill's `references/core-variables.md` for the full list.

```space-style
/* priority: -10 */
html[data-theme]:root {
  --editor-width: var(--xx-line-width);
  --editor-monospace-font: var(--xx-font-mono);

  --root-background-color: var(--xx-bg);
  --root-color: var(--xx-text);
  --ui-surface-border-color: var(--xx-border);
  --ui-surface-hover-background-color: var(--xx-hover);
  --subtle-color: var(--xx-muted);
  --subtle-background-color: var(--xx-hover);
  --meta-color: var(--xx-faint);
  --meta-subtle-color: var(--xx-faint);

  --ui-accent-color: var(--xx-accent);
  --ui-accent-contrast-color: var(--xx-bg);
  --link-color: var(--xx-accent);

  --top-background-color: var(--xx-chrome);
  --top-border-color: var(--xx-border);
  --modal-background-color: var(--xx-bg);
  --modal-border-color: var(--xx-border);
  --modal-backdrop-color: rgb(0 0 0 / 0.2);

  --editor-heading-color: var(--xx-text);
  --editor-code-background-color: var(--xx-bg-alt);
  --editor-blockquote-background-color: var(--xx-bg-alt);
  --editor-blockquote-border-color: var(--xx-border);
  --editor-frontmatter-background-color: var(--xx-bg-alt);
  --editor-hashtag-color: var(--xx-accent);
  --editor-hashtag-background-color: color-mix(in srgb, var(--xx-accent) 10%, transparent);
  --editor-hashtag-border-color: transparent;
}
```

## Base and layout

```space-style
/* priority: -10 */
html #sb-root {
  /* set on #sb-root (not html) so they beat font libraries that set them there */
  --ui-font: var(--xx-font-text);
  --editor-font: var(--xx-font-text);
}
#sb-root #sb-main .cm-editor {
  font-size: var(--xx-text-size);
}
#sb-root #sb-main .cm-editor .cm-content {
  line-height: var(--xx-line-height);
}
/* Sidebars use --modal-background-color by default */
#sb-root #sb-main :is(.sb-nav-root-lhs, .sb-nav-root-rhs) {
  background-color: var(--xx-chrome);
}

@media (max-width: 600px) {
  /* phones: sidebars are drawers */
}
```

## Typography

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor .cm-line.sb-line-h1 { font-size: 1.6em; font-weight: 600; }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h2 { font-size: 1.3em; font-weight: 600; }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h3 { font-size: 1.1em; font-weight: 600; }
```

## Code

```space-style
/* priority: -10 */
/* inline code (outside fenced blocks) */
#sb-root #sb-main .cm-editor .cm-line:not(.sb-line-fenced-code, .sb-line-code) .sb-code {
  font-family: var(--xx-font-mono);
  font-size: 0.875em;
  background-color: var(--xx-bg-alt);
  border-radius: 4px;
  padding: 1px 4px;
}
/* fenced blocks: one CodeMirror line at a time */
#sb-root #sb-main .cm-editor .cm-line.sb-line-fenced-code:not(.sb-line-blockquote, .sb-fenced-code-iframe) {
  font-family: var(--xx-font-mono);
  font-size: 0.875em;
  background-color: var(--xx-bg-alt);
  border-inline: 16px solid transparent;
}
#sb-root #sb-main .cm-editor .sb-line-fenced-code .sb-code {
  font-family: inherit;
  background-color: transparent;
}
#sb-root #sb-main .cm-editor :not(.sb-line-fenced-code) + .cm-line.sb-line-fenced-code:not(.sb-line-blockquote, .sb-fenced-code-iframe),
#sb-root #sb-main .cm-editor .cm-content > .cm-line.sb-line-fenced-code:first-child {
  border-top-left-radius: var(--xx-radius);
  border-top-right-radius: var(--xx-radius);
}
#sb-root #sb-main .cm-editor .cm-line.sb-line-fenced-code:not(.sb-line-blockquote, .sb-fenced-code-iframe):not(:has(+ .sb-line-fenced-code)) {
  border-bottom-left-radius: var(--xx-radius);
  border-bottom-right-radius: var(--xx-radius);
}
/* keep fence delimiters hidden after recolouring code/meta */
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-code-outside.sb-line-fenced-code,
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-code-outside .sb-meta,
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-frontmatter-outside .sb-meta {
  color: transparent;
}
```
