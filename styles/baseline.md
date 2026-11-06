---
name: Library/ilkersigirci/styles/baseline
tags: meta/library
files:
  - baseline/InterVariable.woff2
  - baseline/InterVariable-Italic.woff2
  - baseline/LICENSE-Inter.txt
---

# Baseline

A port of the [Baseline](https://github.com/svnaxis/obsidian-baseline) Obsidian theme (MIT, © Alexis C / svnaxis) to SilverBullet 2.12+.

What it brings over:

- **Workspace:** grey chrome with the page as a floating, rounded white card (the default *Baseline* workspace). On phones the card goes full-bleed, like Baseline mobile.
- **Typography:** Inter for text and UI, medium-weight headings (h1 1.5em, h2 1.25em, h4/h6 muted), 1.625 line height and a ~700px reading width.
- **Colors:** Baseline's neutral greyscale for both themes, with a monochrome interface and the Obsidian purple accent used only for links and tags.
- **Editor elements:** block-style blockquotes, tinted Obsidian-style callouts with titles and icons, rounded code blocks with the GitHub/Primer palette, grid tables, pill tags, external-link icons and square-ish checkboxes.
- **Navigation:** sidebars, the page picker and the command palette restyled as Baseline navigation lists and prompts, with a segmented control, rounded rows and quiet chevrons.

## Customize

Override any `--bl-*` variable from your own `space-style` (for example in [[CONFIG]]). The theme loads with `priority: -10`, so give your block a lower priority to load after it, and use the same selectors:

```css
/* priority: -20 */
html[data-theme]:root {
  --bl-font-text: "OpenSansVariable", sans-serif;  /* any loaded family, e.g. the Font library's */
  --bl-line-width: 900px;          /* wider pages */
  --bl-text-size: 17px;
  --bl-widget-buttons-outside: 0;  /* keep widget buttons inside the widget's corner */
}
html[data-theme="light"]:root { --bl-accent: #2f6fe4; }
```

(That example is a plain `css` block, so it does nothing here; paste it into a `space-style` block to use it.)

**Options:** `--bl-widget-buttons-outside` (default `1`) puts the buttons of block widgets (queries, Mermaid, KaTeX…) above the widget's top-right corner, faint until you hover or focus the widget. Set it to `0` to keep them inside the corner, as in SilverBullet.

To turn the theme off, delete this page and its `baseline/` folder, or rename the `space-style` fences on this page to `css` (a later `Library: Update` asks before overwriting local edits).

**Fonts:** Inter (SIL OFL 1.1, see `baseline/LICENSE-Inter.txt`) is installed with this library under `Library/ilkersigirci/styles/baseline/`. Code uses Fira Code from the [Font](https://github.com/ilkersigirci/silverbullet-libraries/blob/main/styles/font.md) library when it's installed, then your system's monospace font. Font URLs are relative, so they also work when the space is served under a URL prefix such as `/notes`.

## Fonts

```space-style
/* priority: -10 */
@font-face {
  font-family: "Baseline Inter";
  src: url(".fs/Library/ilkersigirci/styles/baseline/InterVariable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Baseline Inter";
  src: url(".fs/Library/ilkersigirci/styles/baseline/InterVariable-Italic.woff2") format("woff2");
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
```

## Tokens

Baseline's palette (from `src/app/root.scss`) plus the Obsidian defaults it builds on.

```space-style
/* priority: -10 */
html:root {
  /* Typography */
  --bl-font-text: "Baseline Inter", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --bl-font-ui: var(--bl-font-text);
  --bl-font-mono: "FiraCodeVariable", "Fira Code", ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
  --bl-text-size: 16px;
  --bl-line-height: 1.625;
  --bl-ui-smaller: 12px;
  --bl-ui-small: 13px;
  --bl-ui-medium: 15px;
  --bl-nav-size: 14px;
  --bl-code-size: 0.875em;
  --bl-medium: 500;
  --bl-semibold: 600;

  --bl-h1-size: 1.5em;
  --bl-h2-size: 1.25em;
  --bl-h3-size: 1em;
  --bl-h4-size: 1em;
  --bl-h5-size: 0.9375em;
  --bl-h6-size: 0.9375em;
  --bl-title-size: 1.5rem;

  /* Shape */
  --bl-radius-xs: 4px;
  --bl-radius-s: 8px;
  --bl-radius-m: 16px;
  --bl-radius-l: 24px;
  --bl-gap: 8px;

  /* Layout */
  --bl-line-width: 740px;

  /* Options */
  --bl-widget-buttons-outside: 1;  /* widget buttons: 1 = above the widget's corner, 0 = inside it (SilverBullet's default) */
  --bl-widget-bar-height: 26px;
}
@media (pointer: coarse) {
  html:root {
    --bl-widget-bar-height: 32px;  /* bigger tap targets */
  }
}

html[data-theme="light"]:root {
  --bl-mono-rgb: 0 0 0;
  --bl-base-00: #fdfdfd;
  --bl-base-05: #fcfcfc;
  --bl-base-10: #f8f8f8;
  --bl-base-20: #f5f5f5;
  --bl-base-25: #f2f2f2;
  --bl-base-30: #ebebeb;
  --bl-base-35: #e4e4e4;
  --bl-base-40: #d7d7d7;
  --bl-base-50: #b1b1b1;
  --bl-base-60: #8c8c8c;
  --bl-base-70: #747474;
  --bl-base-100: #3d3d3d;

  --bl-accent: #8a5cf5;

  --bl-red: #fe7070;
  --bl-orange: #f29a64;
  --bl-yellow: #e0cd63;
  --bl-green: #4ad55f;
  --bl-cyan: #38dbd6;
  --bl-blue: #6aadfa;
  --bl-purple: #bb9ef5;
  --bl-pink: #f37db7;
  --bl-grey: #9e9e9e;

  --bl-code-normal: #1f2328;
  --bl-code-comment: #6e7781;
  --bl-code-function: #8250df;
  --bl-code-keyword: #cf222e;
  --bl-code-property: #953800;
  --bl-code-punctuation: #800000;
  --bl-code-string: #0a3069;
  --bl-code-tag: #116329;
  --bl-code-value: #098658;

  --bl-form-field: var(--bl-base-00);
  --bl-shadow-s: 0 0 0 1px hsl(0 0% 0% / 0.05), 0 2px 2px hsl(0 0% 0% / 0.05), 0 4px 8px hsl(0 0% 0% / 0.025);
  --bl-shadow-l: 0 0 0 1px hsl(0 0% 0% / 0.05), 0 1px 2px -1px hsl(0 0% 0% / 0.05), 0 2px 4px hsl(0 0% 0% / 0.05), 0 12px 24px -16px hsl(0 0% 15% / 0.15);
  --bl-backdrop: hsl(0 0% 0% / 0.06);
}

html[data-theme="dark"]:root {
  --bl-mono-rgb: 255 255 255;
  --bl-base-00: #161616;
  --bl-base-05: #171717;
  --bl-base-10: #181818;
  --bl-base-20: #1c1c1c;
  --bl-base-25: #222222;
  --bl-base-30: #292929;
  --bl-base-35: #303030;
  --bl-base-40: #383838;
  --bl-base-50: #555555;
  --bl-base-60: #6e6e6e;
  --bl-base-70: #898989;
  --bl-base-100: #c1c1c1;

  --bl-accent: #a68af9;

  --bl-red: #d95a5f;
  --bl-orange: #db8650;
  --bl-yellow: #c4b45e;
  --bl-green: #48c45a;
  --bl-cyan: #3fbab6;
  --bl-blue: #5694da;
  --bl-purple: #8e7dc2;
  --bl-pink: #de6793;
  --bl-grey: #8a8a8a;

  --bl-code-normal: #c9d1d9;
  --bl-code-comment: #8b949e;
  --bl-code-function: #d2a8ff;
  --bl-code-keyword: #ff7b72;
  --bl-code-property: #ffa657;
  --bl-code-punctuation: #808080;
  --bl-code-string: #a5d6ff;
  --bl-code-tag: #7ee787;
  --bl-code-value: #b5cea8;

  --bl-form-field: var(--bl-base-20);
  --bl-shadow-s: 0 0 0 1px hsl(0 0% 100% / 0.07), 0 8px 24px hsl(0 0% 0% / 0.1), 0 8px 8px hsl(0 0% 0% / 0.1), 0 4px 12px -4px hsl(0 0% 0% / 0.35);
  --bl-shadow-l: 0 0 0 1px hsl(0 0% 100% / 0.07), 0 1px 2px -1px hsl(0 0% 0% / 0.1), 0 2px 4px hsl(0 0% 0% / 0.1), 0 12px 24px -16px hsl(0 0% 15% / 0.35);
  --bl-backdrop: hsl(0 0% 0% / 0.35);
}

/* Semantic tokens (Obsidian names in comments) */
html[data-theme]:root {
  --bl-bg-primary: var(--bl-base-00);      /* --background-primary */
  --bl-bg-primary-alt: var(--bl-base-10);  /* --background-primary-alt */
  --bl-bg-secondary: var(--bl-base-20);    /* --background-secondary */
  --bl-border: var(--bl-base-30);          /* --background-modifier-border */
  --bl-border-hover: var(--bl-base-35);
  --bl-border-focus: var(--bl-base-40);
  --bl-text-normal: var(--bl-base-100);
  --bl-text-muted: var(--bl-base-70);
  --bl-text-faint: var(--bl-base-50);
  --bl-hover: rgb(var(--bl-mono-rgb) / 0.05);   /* --background-modifier-hover */
  --bl-active: rgb(var(--bl-mono-rgb) / 0.075);
  --bl-interactive-accent: var(--bl-base-100);  /* monochrome interface */
  --bl-text-on-accent: var(--bl-base-00);
  --bl-interactive-normal: color-mix(in srgb, var(--bl-bg-primary), white 7%);
  --bl-interactive-hover: color-mix(in srgb, var(--bl-interactive-normal), var(--bl-bg-secondary) 50%);
  --bl-accent-hover: color-mix(in srgb, var(--bl-accent), white 18%);
  --bl-text-selection: color-mix(in srgb, var(--bl-accent) 22%, transparent);
  --bl-text-highlight: rgb(255 208 0 / 0.4);
  --bl-tag-bg: color-mix(in oklch, var(--bl-accent) 10%, transparent);
  --bl-tag-bg-hover: color-mix(in oklch, var(--bl-accent) 20%, transparent);
  --bl-tag-border: color-mix(in oklch, var(--bl-accent) 15%, transparent);
  --bl-chrome-bg: var(--bl-bg-secondary);
  --bl-card-bg: var(--bl-bg-primary);
  --bl-code-bg: var(--bl-bg-primary-alt);
  --bl-blockquote-bg: var(--bl-bg-primary-alt);
  --bl-blockquote-bar: var(--bl-border-hover);
  --bl-scrollbar: var(--bl-base-40);
}
```

## SilverBullet variables

Feeds the tokens into SilverBullet's own theme variables, so built-in and library UI picks them up too.

```space-style
/* priority: -10 */
html[data-theme]:root {
  --editor-width: var(--bl-line-width);

  --ui-accent-color: var(--bl-interactive-accent);
  --ui-accent-contrast-color: var(--bl-text-on-accent);
  --ui-accent-text-color: var(--bl-text-normal);
  --text-field-focus-color: var(--bl-border-focus);
  --highlight-color: var(--bl-text-highlight);
  --link-color: var(--bl-accent);
  --link-missing-color: color-mix(in srgb, var(--bl-accent) 70%, transparent);
  --link-invalid-color: var(--bl-red);
  --meta-color: var(--bl-text-faint);
  --meta-subtle-color: var(--bl-text-faint);
  --subtle-color: var(--bl-text-muted);
  --subtle-background-color: var(--bl-hover);

  --ui-surface-border-color: var(--bl-border);
  --ui-surface-hover-background-color: var(--bl-hover);
  --ui-surface-section-background-color: var(--bl-hover);
  --root-background-color: var(--bl-bg-primary);
  --root-color: var(--bl-text-normal);

  --top-color: var(--bl-text-normal);
  --top-background-color: var(--bl-chrome-bg);
  --top-border-color: var(--bl-border);
  --top-saved-color: var(--bl-text-normal);
  --top-unsaved-color: var(--bl-text-muted);
  --top-loading-color: var(--bl-text-faint);
  --top-sync-error-background-color: color-mix(in srgb, var(--bl-red) 22%, var(--bl-card-bg));

  --panel-background-color: var(--bl-chrome-bg);
  --panel-border-color: transparent;
  --bhs-background-color: var(--bl-chrome-bg);
  --bhs-border-color: var(--bl-border);

  --modal-color: var(--bl-text-normal);
  --modal-background-color: var(--bl-bg-primary);
  --modal-border-color: var(--bl-border);
  --modal-backdrop-color: var(--bl-backdrop);
  --modal-header-label-color: var(--bl-text-faint);
  --modal-help-background-color: transparent;
  --modal-help-color: var(--bl-text-faint);
  --modal-selected-option-background-color: color-mix(in srgb, var(--bl-text-normal) 7%, var(--bl-bg-primary));
  --modal-selected-option-color: var(--bl-text-normal);
  --modal-selected-option-description-color: var(--bl-text-muted);
  --modal-hint-background-color: var(--bl-hover);
  --modal-hint-color: var(--bl-text-muted);
  --modal-hint-inactive-background-color: transparent;
  --modal-hint-inactive-color: var(--bl-text-faint);
  --modal-description-color: var(--bl-text-faint);

  --notifications-background-color: var(--bl-bg-primary);
  --notifications-border-color: transparent;

  --button-background-color: var(--bl-interactive-normal);
  --button-hover-background-color: var(--bl-interactive-hover);
  --button-color: var(--bl-text-normal);
  --button-border-color: var(--bl-border);
  --primary-button-background-color: var(--bl-interactive-accent);
  --primary-button-hover-background-color: color-mix(in srgb, var(--bl-interactive-accent) 85%, var(--bl-bg-primary));
  --primary-button-color: var(--bl-text-on-accent);
  --text-field-background-color: var(--bl-form-field);

  --action-button-color: var(--bl-text-muted);
  --action-button-hover-color: var(--bl-text-normal);
  --action-button-active-color: var(--bl-text-normal);

  --badge-background-color: var(--bl-hover);
  --badge-color: var(--bl-text-muted);

  --editor-caret-color: var(--bl-text-normal);
  --editor-selection-background-color: var(--bl-text-selection);
  --editor-panels-bottom-background-color: var(--bl-chrome-bg);
  --editor-panels-bottom-border-color: var(--bl-border);
  --editor-panels-bottom-input-background-color: var(--bl-form-field);
  --editor-panels-bottom-button-background-image: none;
  --editor-panels-bottom-button-active-background-image: none;
  --editor-completion-detail-color: var(--bl-text-faint);
  --editor-completion-detail-selected-color: var(--bl-text-muted);
  --editor-list-bullet-color: var(--bl-text-faint);
  --editor-heading-color: var(--bl-text-normal);
  --editor-heading-meta-color: var(--bl-text-faint);
  --editor-hashtag-background-color: var(--bl-tag-bg);
  --editor-hashtag-color: var(--bl-accent);
  --editor-hashtag-border-color: var(--bl-tag-border);
  --editor-at-mention-color: var(--bl-accent);
  --editor-at-mention-background-color: var(--bl-tag-bg);
  --editor-at-mention-border-color: var(--bl-tag-border);
  --editor-ruler-color: var(--bl-border);
  --editor-naked-url-color: var(--bl-accent);
  --editor-link-color: var(--bl-accent);
  --editor-link-url-color: var(--bl-text-faint);
  --editor-link-meta-color: var(--bl-text-faint);
  --editor-wiki-link-page-background-color: transparent;
  --editor-wiki-link-page-color: var(--bl-accent);
  --editor-wiki-link-color: var(--bl-text-faint);
  --editor-line-meta-color: var(--bl-text-faint);
  --editor-table-head-background-color: transparent;
  --editor-table-head-color: var(--bl-text-normal);
  --editor-table-even-background-color: transparent;
  --editor-blockquote-background-color: var(--bl-blockquote-bg);
  --editor-blockquote-color: inherit;
  --editor-blockquote-border-color: var(--bl-blockquote-bar);
  --editor-comment-background-color: var(--bl-hover);
  --editor-comment-border-color: var(--bl-border);
  --editor-code-background-color: var(--bl-code-bg);
  --editor-code-color: var(--bl-code-normal);
  --editor-code-comment-color: var(--bl-code-comment);
  --editor-code-variable-color: var(--bl-code-property);
  --editor-code-typename-color: var(--bl-code-function);
  --editor-code-string-color: var(--bl-code-string);
  --editor-code-number-color: var(--bl-code-value);
  --editor-code-operator-color: var(--bl-code-keyword);
  --editor-code-info-color: var(--bl-text-faint);
  --editor-code-atom-color: var(--bl-code-value);
  --editor-struct-color: var(--bl-code-keyword);
  --editor-highlight-background-color: var(--bl-text-highlight);
  --editor-frontmatter-background-color: var(--bl-bg-primary-alt);
  --editor-frontmatter-color: var(--bl-text-muted);
  --editor-frontmatter-marker-color: var(--bl-text-faint);
  --editor-widget-background-color: var(--bl-border);
  --editor-task-marker-color: var(--bl-text-faint);
  --editor-task-state-color: var(--bl-text-muted);
  --editor-directive-mark-color: var(--bl-text-faint);
  --editor-directive-color: var(--bl-text-faint);
  --editor-directive-background-color: transparent;
  --editor-command-button-color: var(--bl-text-normal);
  --editor-command-button-background-color: var(--bl-interactive-normal);
  --editor-command-button-hover-background-color: var(--bl-interactive-hover);
  --editor-command-button-border-color: var(--bl-border);

  --danger-color: var(--bl-red);
  --success-color: var(--bl-green);
  --alert-info-color: var(--bl-blue);
  --alert-warning-color: var(--bl-orange);
  --alert-error-color: var(--bl-red);
}
```

## Base and layout

On wider screens the page is a rounded card floating on grey chrome; the title bar is the top of that card. With no sidebars open, or on phones, the card goes full-bleed.

```space-style
/* priority: -10 */
html #sb-root {
  --ui-font: var(--bl-font-ui);
  font-family: var(--bl-font-ui);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#sb-root,
#sb-root * {
  scrollbar-width: thin;
  scrollbar-color: var(--bl-scrollbar) transparent;
}

/* Title bar */
#sb-root #sb-top {
  border-bottom: 0;
}
#sb-root #sb-top .main .inner {
  font-size: var(--bl-title-size);
  align-items: center;
}
#sb-root #sb-top .main .inner .wrapper {
  align-items: center;
}
#sb-root #sb-top .main #sb-current-page .sb-input {
  font-family: var(--bl-font-ui);
  font-weight: var(--bl-semibold);
  letter-spacing: -0.01em;
  /* colour inherits from .sb-saved / .sb-unsaved (--top-saved-color / --top-unsaved-color) */
}
#sb-root #sb-top .sb-actions {
  align-items: center;
  gap: 2px;
}
#sb-root #sb-top .sb-actions button {
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 7px;
  border-radius: var(--bl-radius-s);
  transition: background-color 80ms, color 80ms;
}
#sb-root #sb-top .sb-actions button:hover {
  background-color: var(--bl-hover);
}
#sb-root #sb-top .sb-actions button.sb-enabled {
  background-color: var(--bl-active);
}
#sb-root #sb-top .sb-actions button svg {
  width: 18px;
  height: 18px;
}
#sb-root #sb-top .progress-wrapper,
#sb-root #sb-top .progress-hole {
  background-color: var(--bl-card-bg);
}

/* Editor surface */
#sb-root #sb-editor {
  background-color: var(--bl-card-bg);
}
#sb-root #sb-main .cm-editor {
  font-size: var(--bl-text-size);
}
#sb-root #sb-main .cm-editor .cm-content {
  font-family: var(--bl-font-text);
  line-height: var(--bl-line-height);
  color: var(--bl-text-normal);
  padding-top: 8px;
}
#sb-root .cm-cursor,
#sb-root .cm-dropCursor {
  border-left-width: 1.5px !important;
}

/* Sidebars sit directly on the chrome */
#sb-root #sb-main .sb-nav-root-lhs,
#sb-root #sb-main .sb-nav-root-rhs,
#sb-root #sb-main > .sb-panel {
  border: 0;
  background-color: var(--bl-chrome-bg);
}
#sb-root .sb-resizer::after,
#sb-root .sb-resizer {
  border-color: transparent;
}

/* Floating card (tablet and desktop) */
@media (min-width: 601px) {
  /* :not(.bl-off) only raises specificity above the token blocks */
  html[data-theme]:root:not(.bl-off) {
    --sb-top-height: 64px;
  }
  html #sb-root {
    background-color: var(--bl-chrome-bg);
  }
  #sb-root #sb-top .main {
    margin: var(--bl-gap) var(--bl-gap) 0;
    background-color: var(--bl-card-bg);
    border: 1px solid var(--bl-border);
    border-bottom: 0;
    border-radius: var(--bl-radius-s) var(--bl-radius-s) 0 0;
  }
  #sb-root #sb-top .main .inner {
    padding: 14px 0 2px;
  }
  #sb-root #sb-main #sb-editor {
    height: auto;
    margin: 0 var(--bl-gap) var(--bl-gap);
    border: 1px solid var(--bl-border);
    border-top: 0;
    border-radius: 0 0 var(--bl-radius-s) var(--bl-radius-s);
    overflow: hidden;
  }
  /* Sync error (offline): core paints all of #sb-top; tint only the card's title strip */
  #sb-root #sb-top.sb-sync-error {
    background-color: var(--bl-chrome-bg);
  }
  #sb-root #sb-top.sb-sync-error .main {
    background-color: var(--top-sync-error-background-color);
  }

  /* Sidebars run the full window height, next to the title bar */
  #sb-root #sb-main > .sb-nav-root-lhs,
  #sb-root #sb-main > .sb-nav-root-rhs {
    margin-top: calc(-1 * var(--sb-top-height));
    padding-top: var(--sb-standalone-top-offset, 0px);
    z-index: 21;
  }
  #sb-root #sb-main > :is(.sb-nav-root-lhs, .sb-nav-root-rhs) .sb-nav-header {
    padding-top: var(--bl-gap);
  }

  /* No sidebars open: let the page fill the window */
  html:has(#sb-root:not(:has(#sb-main > .sb-nav-root))) {
    --top-background-color: var(--bl-card-bg);
  }
  html #sb-root:not(:has(#sb-main > .sb-nav-root)) {
    background-color: var(--bl-card-bg);
  }
  #sb-root:not(:has(#sb-main > .sb-nav-root)) #sb-top .main,
  #sb-root:not(:has(#sb-main > .sb-nav-root)) #sb-main #sb-editor {
    margin: 0;
    border: 0;
    border-radius: 0;
  }
}

/* Phones: full-bleed page, drawers on the chrome colour */
@media (max-width: 600px) {
  html[data-theme]:root:not(.bl-off) {
    --top-background-color: var(--bl-card-bg);
    --bl-title-size: 1.25rem;
  }
  html #sb-root {
    background-color: var(--bl-card-bg);
  }
  #sb-root #sb-top {
    border-bottom: 1px solid var(--bl-border);
  }
  #sb-root #sb-main .sb-nav-root-lhs {
    border-radius: 0 var(--bl-radius-m) var(--bl-radius-m) 0;
    box-shadow: var(--bl-shadow-l);
  }
  #sb-root #sb-main .sb-nav-root-rhs {
    border-radius: var(--bl-radius-m) 0 0 var(--bl-radius-m);
    box-shadow: var(--bl-shadow-l);
  }
  /* The hamburger menu grows downward in the flow when opened. Fix the row to the
     closed button's height so the centred title and buttons stay put, and let the
     open menu overflow below it (2.2rem + 2px margin is core's closed menu). */
  #sb-root #sb-top .main .inner .wrapper:has(.sb-actions.hamburger) {
    height: calc(2.2rem + 4px);
  }
  #sb-root #sb-top .sb-actions.hamburger {
    align-self: flex-start;
  }
}
```

## Typography

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor .cm-line.sb-line-h1,
#sb-root #sb-main .cm-editor .cm-line.sb-line-h2,
#sb-root #sb-main .cm-editor .cm-line.sb-line-h3,
#sb-root #sb-main .cm-editor .cm-line.sb-line-h4,
#sb-root #sb-main .cm-editor .cm-line.sb-line-h5,
#sb-root #sb-main .cm-editor .cm-line.sb-line-h6 {
  line-height: var(--bl-line-height);
  letter-spacing: normal;
  color: var(--bl-text-normal);
  text-wrap: pretty;
}
#sb-root #sb-main .cm-editor .cm-line.sb-line-h1 { font-size: var(--bl-h1-size); font-weight: var(--bl-medium); }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h2 { font-size: var(--bl-h2-size); font-weight: var(--bl-medium); }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h3 { font-size: var(--bl-h3-size); font-weight: var(--bl-medium); }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h4 { font-size: var(--bl-h4-size); font-weight: var(--bl-semibold); color: var(--bl-text-muted); }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h5 { font-size: var(--bl-h5-size); font-weight: var(--bl-medium); }
#sb-root #sb-main .cm-editor .cm-line.sb-line-h6 { font-size: var(--bl-h6-size); font-weight: var(--bl-semibold); color: var(--bl-text-muted); }

#sb-root .sb-strong {
  font-weight: var(--bl-semibold);
}
#sb-root #sb-main .cm-editor .sb-meta {
  color: var(--bl-text-faint);
}
#sb-root #sb-main .cm-editor .cm-list-bullet {
  color: var(--bl-text-faint);
}
#sb-root #sb-main .cm-editor .sb-line-hr {
  border-top-color: var(--bl-border);
}
#sb-root ::selection {
  background-color: var(--bl-text-selection);
}

/* Highlight ==text== */
#sb-root #sb-main .cm-editor .sb-highlight {
  background-color: var(--bl-text-highlight);
  border-radius: var(--bl-radius-xs);
  padding: 2px 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

/* Keyboard keys */
#sb-root #sb-main .cm-editor kbd,
#sb-root .sb-kbd {
  font-family: var(--bl-font-mono);
  font-size: 0.8em;
  padding: 1px 6px;
  border-radius: var(--bl-radius-xs);
  border: 1px solid var(--bl-border);
  background-color: var(--bl-bg-primary-alt);
  box-shadow: 0 1px 0 var(--bl-border);
  color: var(--bl-text-muted);
}

/* Footnotes */
#sb-root .sb-footnote-ref {
  color: var(--bl-text-muted);
  background-color: var(--bl-bg-primary-alt);
  border-color: var(--bl-border);
  border-radius: var(--bl-radius-xs);
}
```

## Links and tags

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor .sb-wiki-link {
  color: var(--bl-accent);
  background-color: transparent;
}
#sb-root #sb-main .cm-editor .sb-wiki-link:hover,
#sb-root #sb-main .cm-editor .sb-link:not(.sb-meta, .sb-url):hover {
  color: var(--bl-accent-hover);
}
#sb-root a.sb-wiki-link-missing,
#sb-root .sb-wiki-link-missing > .sb-wiki-link {
  color: color-mix(in srgb, var(--bl-accent) 70%, transparent);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--bl-accent) 30%, transparent);
  text-underline-offset: 3px;
}
#sb-root #sb-main .cm-editor .sb-link:not(.sb-meta, .sb-url) {
  text-decoration: none;
  color: var(--bl-accent);
}
#sb-root #sb-main .cm-editor .sb-naked-url,
#sb-root #sb-main .cm-editor .sb-url:not(.sb-link) {
  text-decoration: none;
}

/* External link icon */
#sb-root #sb-main .cm-editor a.sb-link[href^="http"]::after {
  content: "";
  display: inline-block;
  width: 0.75em;
  height: 0.75em;
  margin-left: 0.15em;
  vertical-align: -0.02em;
  background-color: currentColor;
  -webkit-mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>') center / contain no-repeat;
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>') center / contain no-repeat;
  opacity: 0.85;
}

/* Tags */
#sb-root .sb-hashtag,
#sb-root .hashtag,
#sb-root #sb-main .cm-editor .sb-hashtag {
  font-family: var(--bl-font-ui) !important;
  font-size: 0.875em !important;
  font-weight: var(--bl-medium) !important;
  padding: 2px 8px !important;
  margin: 0 1px;
  border-radius: var(--bl-radius-s);
  color: var(--bl-accent);
  background-color: var(--bl-tag-bg);
  border: 1px solid var(--bl-tag-border);
  text-decoration: none;
}
#sb-root .sb-hashtag:hover,
#sb-root #sb-main .cm-editor .sb-hashtag:hover {
  background-color: var(--bl-tag-bg-hover);
}
#sb-root .sb-nav-chip.sb-hashtag {
  font-size: 11px !important;
  padding: 1px 6px !important;
  border-radius: var(--bl-radius-xs);
}
#sb-root .sb-nav-selected .sb-nav-chip.sb-hashtag {
  color: var(--bl-accent);
}
```

## Lists and tasks

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor input[type="checkbox"] {
  font-size: inherit;
  width: 1em;
  height: 1em;
  border: 1px solid var(--bl-text-faint);
  border-radius: var(--bl-radius-xs);
  vertical-align: -0.15em;
  transition: background-color 120ms, border-color 120ms;
}
#sb-root #sb-main .cm-editor input[type="checkbox"]:hover {
  border-color: var(--bl-text-muted);
}
#sb-root #sb-main .cm-editor input[type="checkbox"]:checked {
  background-color: var(--bl-interactive-accent);
  border-color: var(--bl-interactive-accent);
}
#sb-root #sb-main .cm-editor input[type="checkbox"]:checked::after {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 0;
  transform: none;
  background-color: var(--bl-text-on-accent);
  -webkit-mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>') center / 75% no-repeat;
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>') center / 75% no-repeat;
}
#sb-root #sb-main .cm-editor .cm-task-checked {
  color: var(--bl-text-muted);
}
#sb-root .sb-task-state[data-task-state] {
  font-family: var(--bl-font-ui);
  font-weight: var(--bl-medium);
}
```

## Inline code and code blocks

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor .cm-line:not(.sb-line-fenced-code, .sb-line-code) .sb-code {
  font-family: var(--bl-font-mono);
  font-size: var(--bl-code-size);
  color: var(--bl-code-normal);
  background-color: var(--bl-code-bg);
  border: 1px solid var(--bl-border);
  border-radius: 6px;
  padding: 1px 4px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

/* Fenced code: a rounded block, one CodeMirror line at a time */
#sb-root #sb-main .cm-editor .cm-line.sb-line-fenced-code:not(.sb-line-blockquote, .sb-fenced-code-iframe) {
  font-family: var(--bl-font-mono);
  font-size: var(--bl-code-size);
  line-height: 1.6;
  color: var(--bl-code-normal);
  background-color: var(--bl-code-bg);
  border-inline: 16px solid transparent;
  font-variant-ligatures: normal;
}
#sb-root #sb-main .cm-editor :not(.sb-line-fenced-code) + .cm-line.sb-line-fenced-code:not(.sb-line-blockquote, .sb-fenced-code-iframe),
#sb-root #sb-main .cm-editor .cm-content > .cm-line.sb-line-fenced-code:first-child {
  border-top-left-radius: var(--bl-radius-s);
  border-top-right-radius: var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor .cm-line.sb-line-fenced-code:not(.sb-line-blockquote, .sb-fenced-code-iframe):not(:has(+ .sb-line-fenced-code)) {
  border-bottom-left-radius: var(--bl-radius-s);
  border-bottom-right-radius: var(--bl-radius-s);
}
/* Rendered fences (Mermaid, etc.): no panel behind the closing fence line */
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-table-outside.sb-line-fenced-code + .cm-line.sb-line-fenced-code {
  background-color: transparent;
}

/* Keep fence and frontmatter delimiters hidden while the cursor is elsewhere */
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-code-outside.sb-line-fenced-code,
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-code-outside .sb-meta,
#sb-root #sb-main .cm-editor .cm-content .cm-line.sb-line-frontmatter-outside .sb-meta {
  color: transparent;
}
#sb-root #sb-main .cm-editor .sb-line-fenced-code .sb-code {
  font-family: var(--bl-font-mono);
  background-color: transparent;
}
#sb-root #sb-main .cm-editor .sb-line-fenced-code .sb-keyword {
  color: var(--bl-code-keyword);
  font-weight: inherit;
}
#sb-root #sb-main .cm-editor .sb-line-fenced-code .sb-punctuation {
  color: var(--bl-code-punctuation);
}
#sb-root #sb-main .cm-editor .sb-line-fenced-code :is(.sb-bool, .sb-literal) {
  color: var(--bl-code-value);
}
#sb-root #sb-main .cm-editor .sb-line-code-outside .sb-code-info {
  font-family: var(--bl-font-ui);
  font-size: var(--bl-ui-smaller);
  color: var(--bl-text-faint);
  padding-right: 4px;
}
#sb-root #sb-main .cm-editor .sb-code-copy-button {
  color: var(--bl-text-faint);
  border-radius: var(--bl-radius-xs);
}
#sb-root #sb-main .cm-editor .sb-code-copy-button:hover {
  color: var(--bl-text-muted);
}
#sb-root #sb-main .cm-editor .sb-code-copy-button > svg {
  width: 0.9rem;
  height: 0.9rem;
}
```

## Blockquotes

Baseline's default *block* style: a soft panel with a thin bar inset from the edge.

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor .cm-line.sb-line-blockquote:not(.sb-admonition) {
  background-color: var(--bl-blockquote-bg);
  color: var(--bl-text-normal);
  border-inline: 16px solid transparent;
}
#sb-root #sb-main .cm-editor :not(.sb-line-blockquote) + .cm-line.sb-line-blockquote:not(.sb-admonition),
#sb-root #sb-main .cm-editor .cm-content > .cm-line.sb-line-blockquote:not(.sb-admonition):first-child {
  border-top: 16px solid transparent;
  border-top-left-radius: var(--bl-radius-s);
  border-top-right-radius: var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor .cm-line.sb-line-blockquote:not(.sb-admonition):not(:has(+ .sb-line-blockquote)) {
  border-bottom: 16px solid transparent;
  border-bottom-left-radius: var(--bl-radius-s);
  border-bottom-right-radius: var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor .sb-line-blockquote:not(.sb-admonition) .sb-quote {
  color: inherit;
}
```

## Callouts

SilverBullet admonitions (`> [!NOTE]`, `> **note** Title`) styled like Obsidian callouts in Baseline: tinted panel, faint border, coloured title with an icon. Works with or without the Admonitions library; colors and icons follow Obsidian's callout types.

```space-style
/* priority: -10 */
html:root {
  --bl-icon-note: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>');
  --bl-icon-abstract: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>');
  --bl-icon-info: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>');
  --bl-icon-todo: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>');
  --bl-icon-tip: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>');
  --bl-icon-success: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>');
  --bl-icon-question: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>');
  --bl-icon-warning: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>');
  --bl-icon-failure: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>');
  --bl-icon-danger: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>');
  --bl-icon-bug: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2"/><path d="M21 21a4 4 0 0 0-3.81-4"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-4"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/></svg>');
  --bl-icon-example: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></svg>');
  --bl-icon-quote: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>');

  /* Neutralise the Admonitions library's sizing knobs */
  --admonition-title-font-size: 1em;
  --admonition-title-font-weight: 600;
  --admonition-text-font-size: 1em;
  --admonition-text-color: inherit;
}

/* Type → colour + icon (Obsidian's callout mapping, Baseline palette) */
#sb-root .sb-admonition { --bl-callout: var(--bl-blue); --bl-callout-icon: var(--bl-icon-note); }
#sb-root .sb-admonition:is([admonition="note" i]) { --bl-callout: var(--bl-blue); --bl-callout-icon: var(--bl-icon-note); }
#sb-root .sb-admonition:is([admonition="abstract" i], [admonition="summary" i], [admonition="tldr" i]) { --bl-callout: var(--bl-cyan); --bl-callout-icon: var(--bl-icon-abstract); }
#sb-root .sb-admonition:is([admonition="info" i], [admonition="seealso" i]) { --bl-callout: var(--bl-blue); --bl-callout-icon: var(--bl-icon-info); }
#sb-root .sb-admonition:is([admonition="todo" i]) { --bl-callout: var(--bl-blue); --bl-callout-icon: var(--bl-icon-todo); }
#sb-root .sb-admonition:is([admonition="tip" i], [admonition="hint" i], [admonition="important" i]) { --bl-callout: var(--bl-cyan); --bl-callout-icon: var(--bl-icon-tip); }
#sb-root .sb-admonition:is([admonition="success" i], [admonition="check" i], [admonition="done" i]) { --bl-callout: var(--bl-green); --bl-callout-icon: var(--bl-icon-success); }
#sb-root .sb-admonition:is([admonition="question" i], [admonition="help" i], [admonition="faq" i]) { --bl-callout: var(--bl-orange); --bl-callout-icon: var(--bl-icon-question); }
#sb-root .sb-admonition:is([admonition="warning" i], [admonition="caution" i], [admonition="attention" i]) { --bl-callout: var(--bl-orange); --bl-callout-icon: var(--bl-icon-warning); }
#sb-root .sb-admonition:is([admonition="failure" i], [admonition="fail" i], [admonition="missing" i]) { --bl-callout: var(--bl-red); --bl-callout-icon: var(--bl-icon-failure); }
#sb-root .sb-admonition:is([admonition="danger" i], [admonition="error" i]) { --bl-callout: var(--bl-red); --bl-callout-icon: var(--bl-icon-danger); }
#sb-root .sb-admonition:is([admonition="bug" i]) { --bl-callout: var(--bl-red); --bl-callout-icon: var(--bl-icon-bug); }
#sb-root .sb-admonition:is([admonition="example" i]) { --bl-callout: var(--bl-purple); --bl-callout-icon: var(--bl-icon-example); }
#sb-root .sb-admonition:is([admonition="quote" i], [admonition="cite" i]) { --bl-callout: var(--bl-grey); --bl-callout-icon: var(--bl-icon-quote); }
#sb-root .sb-admonition {
  --admonition-color: var(--bl-callout);
  --admonition-icon: var(--bl-callout-icon);
  --bl-callout-indent: calc(1.1em + 8px);
}

/* Panel */
#sb-root #sb-main .cm-editor .cm-line.sb-admonition {
  background-color: color-mix(in srgb, var(--bl-callout) 10%, transparent) !important;
  background-image: none !important;
  color: var(--bl-text-normal) !important;
  font-size: inherit !important;
  width: auto !important;
  border-top: 0 !important;
  border-bottom: 0 !important;
  border-left: 1px solid color-mix(in srgb, var(--bl-callout) 22%, transparent) !important;
  border-right: 1px solid color-mix(in srgb, var(--bl-callout) 22%, transparent) !important;
  border-radius: 0 !important;
  padding: 0 16px 0 calc(var(--sb-indent) + 16px + var(--bl-callout-indent)) !important;
}
#sb-root #sb-main .cm-editor .cm-line.sb-admonition.sb-admonition-title {
  color: var(--bl-callout) !important;
  font-weight: var(--bl-semibold) !important;
  padding: 14px 16px 2px calc(var(--sb-indent) + 16px) !important;
  border-top: 1px solid color-mix(in srgb, var(--bl-callout) 22%, transparent) !important;
  border-top-left-radius: var(--bl-radius-s) !important;
  border-top-right-radius: var(--bl-radius-s) !important;
}
#sb-root #sb-main .cm-editor .cm-line.sb-admonition:not(:has(+ .sb-admonition)) {
  padding-bottom: 14px !important;
  border-bottom: 1px solid color-mix(in srgb, var(--bl-callout) 22%, transparent) !important;
  border-bottom-left-radius: var(--bl-radius-s) !important;
  border-bottom-right-radius: var(--bl-radius-s) !important;
}
/* Title line written as raw text while the cursor is on it */
#sb-root #sb-main .cm-editor .cm-line.sb-admonition.sb-admonition-title .sb-quote {
  color: inherit;
}

/* Icon */
#sb-root #sb-main .cm-editor .sb-admonition-type::before {
  --admonition-width: 1.1em;
  width: 1.1em !important;
  height: 1.1em;
  margin: 0 8px 0 0 !important;
  vertical-align: -0.2em;
  background-color: var(--bl-callout);
  -webkit-mask: var(--bl-callout-icon) center / contain no-repeat;
  mask: var(--bl-callout-icon) center / contain no-repeat;
}

/* Hide the raw "[!TIP]" / "**tip**" marker (core only does this for note, warning, danger and success) */
#sb-root #sb-main .cm-editor .sb-admonition-type > * {
  display: none;
}

/* A custom title already starts with a space */
#sb-root #sb-main .cm-editor .sb-admonition-type:not(:last-child)::before {
  margin-right: 4px !important;
}

/* Default title when only the type is given ("> [!TIP]") */
#sb-root .sb-admonition-type:last-child::after { content: "Note"; }
#sb-root .sb-admonition:is([admonition="abstract" i]) .sb-admonition-type:last-child::after { content: "Abstract"; }
#sb-root .sb-admonition:is([admonition="summary" i]) .sb-admonition-type:last-child::after { content: "Summary"; }
#sb-root .sb-admonition:is([admonition="tldr" i]) .sb-admonition-type:last-child::after { content: "TL;DR"; }
#sb-root .sb-admonition:is([admonition="info" i]) .sb-admonition-type:last-child::after { content: "Info"; }
#sb-root .sb-admonition:is([admonition="seealso" i]) .sb-admonition-type:last-child::after { content: "See also"; }
#sb-root .sb-admonition:is([admonition="todo" i]) .sb-admonition-type:last-child::after { content: "Todo"; }
#sb-root .sb-admonition:is([admonition="tip" i]) .sb-admonition-type:last-child::after { content: "Tip"; }
#sb-root .sb-admonition:is([admonition="hint" i]) .sb-admonition-type:last-child::after { content: "Hint"; }
#sb-root .sb-admonition:is([admonition="important" i]) .sb-admonition-type:last-child::after { content: "Important"; }
#sb-root .sb-admonition:is([admonition="success" i]) .sb-admonition-type:last-child::after { content: "Success"; }
#sb-root .sb-admonition:is([admonition="check" i]) .sb-admonition-type:last-child::after { content: "Check"; }
#sb-root .sb-admonition:is([admonition="done" i]) .sb-admonition-type:last-child::after { content: "Done"; }
#sb-root .sb-admonition:is([admonition="question" i]) .sb-admonition-type:last-child::after { content: "Question"; }
#sb-root .sb-admonition:is([admonition="help" i]) .sb-admonition-type:last-child::after { content: "Help"; }
#sb-root .sb-admonition:is([admonition="faq" i]) .sb-admonition-type:last-child::after { content: "FAQ"; }
#sb-root .sb-admonition:is([admonition="warning" i]) .sb-admonition-type:last-child::after { content: "Warning"; }
#sb-root .sb-admonition:is([admonition="caution" i]) .sb-admonition-type:last-child::after { content: "Caution"; }
#sb-root .sb-admonition:is([admonition="attention" i]) .sb-admonition-type:last-child::after { content: "Attention"; }
#sb-root .sb-admonition:is([admonition="failure" i]) .sb-admonition-type:last-child::after { content: "Failure"; }
#sb-root .sb-admonition:is([admonition="fail" i]) .sb-admonition-type:last-child::after { content: "Fail"; }
#sb-root .sb-admonition:is([admonition="missing" i]) .sb-admonition-type:last-child::after { content: "Missing"; }
#sb-root .sb-admonition:is([admonition="danger" i]) .sb-admonition-type:last-child::after { content: "Danger"; }
#sb-root .sb-admonition:is([admonition="error" i]) .sb-admonition-type:last-child::after { content: "Error"; }
#sb-root .sb-admonition:is([admonition="bug" i]) .sb-admonition-type:last-child::after { content: "Bug"; }
#sb-root .sb-admonition:is([admonition="example" i]) .sb-admonition-type:last-child::after { content: "Example"; }
#sb-root .sb-admonition:is([admonition="quote" i]) .sb-admonition-type:last-child::after { content: "Quote"; }
#sb-root .sb-admonition:is([admonition="cite" i]) .sb-admonition-type:last-child::after { content: "Cite"; }
```

## Tables

Markdown tables, query results and Lua widget tables share Baseline's look: plain header, rounded grid body.

```space-style
/* priority: -10 */
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table {
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.875em;
  line-height: 1.5;
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table thead tr {
  background-color: transparent;
  color: var(--bl-text-normal);
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table :is(thead td, thead th, th) {
  padding: 8px 12px;
  font-weight: var(--bl-semibold);
  text-align: start;
  border: 0;
  background-color: transparent;
  color: var(--bl-text-normal);
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr,
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr:nth-of-type(even) {
  background-color: transparent;
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody td {
  padding: 8px 12px;
  background-color: var(--bl-bg-primary-alt);
  border: 0;
  border-top: 1px solid var(--bl-border);
  border-left: 1px solid var(--bl-border);
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody td:last-child {
  border-right: 1px solid var(--bl-border);
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr:last-child td {
  border-bottom: 1px solid var(--bl-border);
}
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr:first-child td:first-child { border-top-left-radius: var(--bl-radius-s); }
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr:first-child td:last-child { border-top-right-radius: var(--bl-radius-s); }
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr:last-child td:first-child { border-bottom-left-radius: var(--bl-radius-s); }
#sb-root :is(#sb-main .cm-editor, .sb-nav-root) table tbody tr:last-child td:last-child { border-bottom-right-radius: var(--bl-radius-s); }
/* Markdown tables keep their per-column alignment */
#sb-root #sb-main .cm-editor table .sb-table-align-left { text-align: left; }
#sb-root #sb-main .cm-editor table .sb-table-align-center { text-align: center; }
#sb-root #sb-main .cm-editor table .sb-table-align-right { text-align: right; }
```

## Frontmatter and widgets

```space-style
/* priority: -10 */
#sb-root #sb-main .cm-editor .cm-line.sb-frontmatter {
  font-size: 0.875em;
  border-inline: 12px solid transparent;
}
#sb-root #sb-main .cm-editor :not(.sb-frontmatter) + .cm-line.sb-frontmatter {
  border-top: 6px solid transparent;
  border-top-left-radius: var(--bl-radius-s);
  border-top-right-radius: var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor .cm-line.sb-frontmatter:not(:has(+ .sb-frontmatter)) {
  border-bottom: 6px solid transparent;
  border-bottom-left-radius: var(--bl-radius-s);
  border-bottom-right-radius: var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor .sb-frontmatter-marker {
  font-family: var(--bl-font-ui);
  font-size: var(--bl-ui-smaller);
  color: var(--bl-text-faint);
}
#sb-root #sb-main .cm-editor .cm-frontmatterFoldStatus {
  color: var(--bl-text-faint);
}
/* Property keys read like Obsidian's properties: muted, not syntax-coloured */
#sb-root #sb-main .cm-editor .sb-frontmatter :is(.sb-atom, .sb-attribute-name, .sb-variableName, .sb-typeName) {
  color: var(--bl-text-muted);
}

/* Inline ${…} results */
#sb-root #sb-main .cm-editor .sb-lua-directive-inline:not(:has(> button)) {
  border: 0;
  border-radius: var(--bl-radius-xs);
  background-color: var(--bl-bg-primary-alt);
  padding: 0 4px;
}

/* Query / Lua widgets */
#sb-root #sb-main .cm-editor :is(.sb-markdown-widget, .sb-lua-directive-block, .sb-markdown-top-widget:has(*), .sb-markdown-bottom-widget:has(*)) {
  border-color: var(--bl-border);
  border-radius: var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor :is(.sb-markdown-widget, .sb-lua-directive-block, .sb-lua-directive-inline, .sb-markdown-top-widget:has(*), .sb-markdown-bottom-widget:has(*)) .button-bar {
  background-color: var(--bl-bg-primary-alt);
  border-radius: 0 var(--bl-radius-s) 0 var(--bl-radius-s);
}
#sb-root #sb-main .cm-editor :is(.sb-markdown-widget, .sb-lua-directive-block, .sb-lua-directive-inline) .button-bar button {
  color: var(--bl-text-muted);
}

/* Block widget buttons (queries, KaTeX, Mermaid…). Core toggles display on hover;
   Baseline fades instead, so the bar can sit above the widget (--bl-widget-buttons-outside: 1),
   faint until the widget is hovered or focused, or inside its corner (0) like SilverBullet.
   Outside, widgets get a little top margin so the bar sits in clear space. */
#sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *) {
  margin-top: calc(var(--bl-widget-buttons-outside) * (var(--bl-widget-bar-height) - 20px));
}
#sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *) > div > .button-bar {
  display: flex !important;
  align-items: center;
  gap: 2px;
  height: var(--bl-widget-bar-height);
  padding: 0 4px;
  top: calc(var(--bl-widget-buttons-outside) * (-1 * var(--bl-widget-bar-height) - 2px));
  z-index: 2;
  border-radius:
    calc(var(--bl-widget-buttons-outside) * var(--bl-radius-s)) var(--bl-radius-s)
    calc(var(--bl-widget-buttons-outside) * var(--bl-radius-s)) var(--bl-radius-s);
  opacity: calc(var(--bl-widget-buttons-outside) * 0.35);
  transition: opacity 150ms ease;
}
@media (hover: none) {
  /* touch: no hover, so inside buttons stay visible (as in SilverBullet) */
  #sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *) > div > .button-bar {
    opacity: calc(1 - var(--bl-widget-buttons-outside) * 0.65);
  }
}
#sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *):is(:hover, :focus-within) > div > .button-bar {
  opacity: 1;
}
#sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *) > div > .button-bar button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--bl-widget-bar-height) - 2px);
  height: calc(var(--bl-widget-bar-height) - 2px);
  margin: 0;
  padding: 0;
  border-radius: var(--bl-radius-xs);
}
#sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *) > div > .button-bar button:hover {
  color: var(--bl-text-normal);
  background-color: var(--bl-hover);
}
#sb-root #sb-main .cm-editor .sb-lua-directive-block:not(.sb-lua-view, .sb-frontmatter-preview *) > div > .button-bar button svg {
  width: 15px;
  height: 15px;
}

/* Command buttons rendered in pages, e.g. widgets.commandButton */
#sb-root #sb-main .cm-editor .sb-lua-directive-inline > button,
#sb-root #sb-main .cm-editor .sb-lua-directive-inline button:not(.sb-button, .sb-button-primary, .sb-button-danger, .sb-button-icon) {
  font-family: var(--bl-font-ui);
  font-size: var(--bl-ui-small);
  font-weight: var(--bl-medium);
  color: var(--bl-text-normal);
  background-color: var(--bl-interactive-normal);
  border: 0;
  border-radius: var(--bl-radius-s);
  box-shadow: var(--bl-shadow-s);
  padding: 4px 12px;
  cursor: pointer;
}
#sb-root #sb-main .cm-editor .sb-lua-directive-inline > button:hover {
  background-color: var(--bl-interactive-hover);
}
```

## Navigation: sidebars, pickers, command palette

```space-style
/* priority: -10 */
#sb-root .sb-nav-root {
  --sb-nav-row-height: 32px;
  --sb-nav-muted: var(--bl-text-faint);
  font-family: var(--bl-font-ui);
  font-size: var(--bl-nav-size);
}
#sb-root .sb-nav-root-lhs,
#sb-root .sb-nav-root-rhs,
#sb-root .sb-nav-root-bhs {
  --modal-background-color: var(--bl-chrome-bg);
  --modal-selected-option-background-color: color-mix(in srgb, var(--bl-text-normal) 7%, var(--bl-chrome-bg));
  background-color: var(--bl-chrome-bg);
}

/* Header: a quiet search field + segmented control */
#sb-root .sb-nav-header {
  border-bottom: 0;
  padding: 10px 10px 6px;
  gap: 8px;
}
#sb-root .sb-nav-root:not(.sb-nav-root-modal) .sb-nav-header-row {
  align-items: center;
  padding: 5px 8px 5px 10px;
  border-radius: var(--bl-radius-s);
  background-color: var(--bl-hover);
}
#sb-root .sb-nav-title {
  color: var(--bl-text-faint);
  font-weight: var(--bl-medium);
}
#sb-root .sb-nav-input {
  color: var(--bl-text-normal);
}
#sb-root .sb-nav-input::placeholder {
  color: var(--bl-text-faint);
}
#sb-root .sb-nav-input:focus-visible {
  box-shadow: none;
}
#sb-root :is(.sb-nav-close, .sb-dock-button, .sb-nav-copy, .sb-nav-definition) {
  color: var(--bl-text-faint);
  border-radius: var(--bl-radius-xs);
}
#sb-root :is(.sb-nav-close, .sb-dock-button, .sb-nav-copy, .sb-nav-definition):hover {
  color: var(--bl-text-normal);
}
#sb-root .sb-nav-tree-actions button {
  color: var(--bl-text-faint);
  border-radius: var(--bl-radius-xs);
}
#sb-root .sb-nav-tree-actions button:hover {
  color: var(--bl-text-normal);
  background-color: var(--bl-hover);
}

/* Segmented control */
#sb-root .sb-segments {
  padding: 2px;
  gap: 2px;
  border-radius: var(--bl-radius-s);
  background-color: var(--bl-hover);
}
#sb-root .sb-segment {
  border-radius: 6px;
  padding: 3px 9px;
  color: var(--bl-text-muted);
  font-weight: var(--bl-medium);
}
#sb-root .sb-segment:hover:not(.sb-segment-active) {
  background-color: transparent;
  color: var(--bl-text-normal);
}
#sb-root .sb-segment-active {
  background-color: var(--bl-bg-primary);
  color: var(--bl-text-normal);
  box-shadow: var(--bl-shadow-s);
}

/* Rows */
#sb-root .sb-nav-body {
  padding-bottom: 8px;
}
#sb-root .sb-tree {
  --sb-tree-row-inset: 6px;
  --sb-tree-indent: 16px;
}
#sb-root .sb-nav-row {
  margin: 0 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 10px;
  border-radius: var(--bl-radius-s);
  color: var(--bl-text-muted);
  align-items: center;
  transition: background-color 80ms;
}
#sb-root .sb-nav-row:hover:not(.sb-nav-selected) {
  background-color: var(--bl-hover);
  color: var(--bl-text-normal);
}
#sb-root .sb-nav-selected,
#sb-root .sb-nav-row[aria-current="page"] {
  background-color: var(--modal-selected-option-background-color);
  color: var(--bl-text-normal);
}
#sb-root .sb-nav-row[aria-current="page"] {
  font-weight: var(--bl-medium);
}
#sb-root .sb-nav-row[aria-current="page"]::before {
  content: none;
}
#sb-root .sb-nav-row.sb-nav-folder {
  font-weight: inherit;
  --sb-nav-band: transparent;
}
#sb-root .sb-nav-row .sb-row-actions {
  border-radius: 0 var(--bl-radius-s) var(--bl-radius-s) 0;
}
#sb-root .sb-nav-row:hover:not(.sb-nav-selected) .sb-row-actions {
  background-image: linear-gradient(var(--bl-hover), var(--bl-hover));
}
#sb-root .sb-row-action {
  border-radius: var(--bl-radius-xs);
  color: var(--bl-text-faint);
}
#sb-root .sb-row-action:hover {
  color: var(--bl-text-normal);
  background-color: var(--bl-hover);
}
#sb-root .sb-nav-icon {
  width: 15px;
  height: 15px;
  color: var(--bl-text-faint);
}
#sb-root .sb-nav-description {
  color: var(--bl-text-faint);
}
/* Fuzzy-match highlights: bold, like Obsidian suggestions */
#sb-root :is(.sb-nav-primary, .sb-nav-description) mark {
  background-color: transparent;
  color: var(--bl-text-normal);
  font-weight: var(--bl-semibold);
}

/* Chevrons: thin Lucide chevron instead of the ▸/▾ glyphs */
#sb-root .sb-nav-chevron {
  font-size: 0;
  width: 14px;
  height: 14px;
  align-self: center;
  display: inline-flex;
}
#sb-root .sb-nav-chevron::before {
  content: "";
  width: 14px;
  height: 14px;
  background-color: var(--bl-text-faint);
  -webkit-mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>') center / contain no-repeat;
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>') center / contain no-repeat;
  transition: transform 160ms cubic-bezier(0.1, 0, 0.1, 1.25);
}
#sb-root .sb-treeitem[aria-expanded="true"] > .sb-nav-row .sb-nav-chevron::before {
  transform: rotate(90deg);
}
#sb-root .sb-nav-chevron-spacer {
  width: 14px;
}

/* Chips and hotkey hints */
#sb-root .sb-nav-chip {
  border-radius: var(--bl-radius-xs);
}
#sb-root .sb-nav-chip-hint {
  font-size: var(--bl-ui-smaller);
  font-weight: var(--bl-medium);
  padding: 2px 6px;
}
#sb-root .sb-nav-help {
  border-bottom: 1px solid var(--bl-border);
  font-size: var(--bl-ui-smaller);
}

/* Page picker / command palette (Baseline prompt) */
#sb-root .sb-modal,
.sb-modal {
  border: 0;
  border-radius: var(--bl-radius-m);
  box-shadow: var(--bl-shadow-l);
  background-color: var(--bl-bg-primary);
}
#sb-root .sb-nav-root-modal {
  background-color: var(--bl-bg-primary);
}
#sb-root .sb-nav-root-modal .sb-nav-header {
  padding: 18px 20px 14px;
  border-bottom: 1px solid var(--bl-border);
  gap: 12px;
}
#sb-root .sb-nav-root-modal .sb-nav-header-row {
  font-size: 16px;
  align-items: center;
}
#sb-root .sb-nav-root-modal .sb-nav-body {
  padding: 8px;
}
#sb-root .sb-nav-root-modal .sb-nav-row {
  margin: 0;
  padding: 8px 12px;
}
#sb-root .sb-nav-root-modal .sb-nav-help {
  padding: 8px 20px;
}

/* Legacy filter box / prompts */
#sb-root .sb-modal-box,
.sb-modal-box {
  border: 0;
  border-radius: var(--bl-radius-m);
  box-shadow: var(--bl-shadow-l);
}
.sb-modal-box .sb-header {
  padding: 18px 20px 14px;
}
.sb-modal-box .sb-result-list {
  padding: 8px;
}
.sb-modal-box .sb-option,
.sb-modal-box .sb-selected-option {
  border-radius: var(--bl-radius-s);
  padding: 8px 12px;
}
```

## Controls, menus and notifications

```space-style
/* priority: -10 */
#sb-root :is(.sb-button, .sb-button-primary, .sb-button-danger),
:is(.sb-modal, .sb-modal-box) :is(.sb-button, .sb-button-primary, .sb-button-danger) {
  border-radius: var(--bl-radius-s);
  font-family: var(--bl-font-ui);
  font-weight: var(--bl-medium);
}
#sb-root :is(.sb-input, .sb-select) {
  border-radius: var(--bl-radius-s);
  font-family: var(--bl-font-ui);
}
#sb-root .sb-button-icon {
  border-radius: var(--bl-radius-s);
}
#sb-root .sb-anchored-menu,
.sb-anchored-menu,
.sb-dock-menu {
  font-family: var(--bl-font-ui);
  border: 0 !important;
  border-radius: var(--bl-radius-s);
  box-shadow: var(--bl-shadow-l);
  background-color: var(--bl-bg-primary);
  padding: 4px;
}
:is(.sb-anchored-menu, .sb-dock-menu) :is(button, .sb-dock-menu-item) {
  border-radius: 6px;
}

/* Notifications */
#sb-root .sb-notifications {
  font-family: var(--bl-font-ui);
  font-size: var(--bl-ui-small);
}
#sb-root .sb-notifications > div {
  border: 0;
  border-radius: var(--bl-radius-s);
  box-shadow: var(--bl-shadow-l);
  background-color: var(--bl-bg-primary);
}

/* Autocomplete */
#sb-root #sb-editor .cm-editor .cm-tooltip-autocomplete {
  border: 0;
  border-radius: var(--bl-radius-s);
  box-shadow: var(--bl-shadow-l);
  background-color: var(--bl-bg-primary);
  padding: 4px;
  font-family: var(--bl-font-ui);
}
#sb-root #sb-editor .cm-editor .cm-tooltip-autocomplete ul li {
  border-radius: 6px;
  padding: 4px 8px;
}
#sb-root #sb-editor .cm-editor .cm-tooltip-autocomplete ul li[aria-selected],
#sb-root #sb-editor .cm-editor .cm-tooltip-autocomplete ul li:hover,
#sb-root #sb-editor .cm-editor .cm-tooltip-autocomplete ul li[aria-selected]:hover {
  background: var(--bl-active);
  color: var(--bl-text-normal);
}
#sb-root .cm-tooltip {
  border-color: var(--bl-border);
  border-radius: var(--bl-radius-s);
}

/* Search panel (Ctrl-f) */
#sb-root #sb-editor .cm-panels-bottom .cm-textfield,
#sb-root #sb-editor .cm-panels-bottom .cm-button {
  border-radius: 6px;
  border: 1px solid var(--bl-border);
  font-family: var(--bl-font-ui);
}

/* Mobile keyboard bar */
#sb-root .sb-keyboard-bar {
  background-color: var(--bl-chrome-bg);
  border-top: 1px solid var(--bl-border);
}
#sb-root .sb-keyboard-bar button {
  border-radius: var(--bl-radius-s);
}
```
