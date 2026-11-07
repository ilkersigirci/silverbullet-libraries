# SilverBullet DOM and classes (SB 2.12.1)

Regenerate the raw lists with `scripts/fetch-core.sh`, which writes `sb-classes.txt`, `line-classes.txt` and `token-classes.txt`. Then check them live with `sbshot.mjs --eval`.

## Page layout (desktop)

```text
html[data-theme="light|dark"][data-markdown-syntax-rendering="on|off"]
└ body                                    (+ .sb-standalone in the PWA)
  ├ div#sb-root                           flex column; background = --root-background-color
  │ ├ div#sb-top                          z-index 20, height var(--sb-top-height) (55px); .sb-sync-error on sync failure
  │ │  ├ button.sb-mobile-dock-button.sb-mobile-dock-left    (only shown ≤600px)
  │ │  ├ .sb-nav-spacer                   flex: 0 0 <left sidebar width>  (hidden ≤600px)
  │ │  ├ .main > .inner > .wrapper        max-width var(--editor-width), aligned with the text column
  │ │  │   ├ span#sb-current-page.sb-saved|.sb-unsaved > input.sb-input.sb-page-name-editor   page title
  │ │  │   └ .sb-actions > button(.sb-enabled)                top-bar action buttons (svg icons)
  │ │  ├ .sb-nav-spacer
  │ │  └ button.sb-mobile-dock-button.sb-mobile-dock-right
  │ ├ div#sb-main                         flex row
  │ │  ├ .sb-nav-root.sb-nav-root-lhs.sb-nav-resizable   page tree (absent from the DOM when closed)
  │ │  │   └ .sb-resizer.sb-resizer-lhs
  │ │  ├ #sb-editor > .cm-editor > .cm-scroller > .cm-content.cm-lineWrapping > .cm-line …
  │ │  └ .sb-nav-root.sb-nav-root-rhs.sb-nav-resizable   table of contents (absent when closed)
  │ └ .sb-modal-backdrop > .sb-modal … > .sb-nav-root.sb-nav-root-modal
  │                                       page picker, command palette, prompts (only while open)
  └ div#custom-styles > style …           every space-style block, in priority order
```

These also appear when needed: `.sb-panel` (Lua/plug panels, iframes), `.sb-nav-root-bhs` / `.sb-bhs` (bottom panel), `.sb-notifications` (toasts) and `.progress-wrapper` / `.progress-hole` (sync/index progress ring in `#sb-top`). Probe where they sit with `sbshot.mjs --eval` while they are visible.

- **Phones (≤600px):**
  - The sidebars become absolutely positioned drawers over the editor.
  - The `button.sb-mobile-dock-button.sb-mobile-dock-left` / `-right` in `#sb-top` (always in the DOM) become visible and open the drawers.
  - `.sb-keyboard-bar` is the on-screen toolbar.
  - SB treats any client without a fine pointer as mobile (phone emulation in `sbshot.mjs` counts). With the `mobileMenuStyle` config at its default `"hamburger"`, dropdown actions move into `.sb-actions.hamburger` (`.open` while expanded, first button `.expander`); `"bottom-bar"` gives `.sb-actions.bottom-bar` instead.
- **Variables set by JavaScript:**
  - `--sb-editor-pane-left/-width` and `--sb-viewport-height/-top`.
  - `html.sb-viewport-tracked` while the mobile keyboard is open.
- **Standalone/PWA:** `body.sb-standalone`. `--sb-standalone-top-offset` is 20px in the iOS home-screen app and 0 elsewhere.

## Shared navigation component

The tree, the TOC, the bottom panel, the page picker and the command palette are all one component, `.sb-nav-root`. A rule written against `.sb-nav-*` hits all of them, so scope it with `-lhs`, `-rhs`, `-bhs` or `-modal` when needed.

| Part | Classes |
| --- | --- |
| Header | `.sb-nav-header`, `.sb-nav-header-row`, `.sb-nav-title`, `.sb-nav-close`, `.sb-nav-input` (filter/search box), `.sb-nav-help` |
| Segmented control | `.sb-segments-wrap > .sb-segments > .sb-segment(.sb-segment-active)`, `.sb-segment-icon`, `.sb-segment-label` |
| Body | `.sb-nav-body`, `.sb-nav-list`, `.sb-nav-empty`, `.sb-nav-notice`, `.sb-nav-error` |
| Rows | `.sb-nav-row` (+ `.sb-nav-selected`, `[aria-current="page"]`, `.sb-nav-folder`, `.sb-nav-passive`, `.sb-nav-aspiring` = not yet created), `.sb-nav-icon`, `.sb-nav-text`, `.sb-nav-path`, `.sb-nav-description`, `.sb-nav-trailing` |
| Tree | `ul.sb-tree > li.sb-treeitem[aria-expanded]`. The chevron `.sb-nav-chevron` is a ▸/▾ text glyph, and `.sb-nav-chevron-spacer` stands in for leaves. Indent comes from `--sb-tree-row-inset` (8px) and `--sb-tree-indent` (20px) |
| Row actions | `.sb-row-actions > .sb-row-action(.sb-row-action-icon/-label)`, `.sb-nav-tree-actions`, `.sb-nav-more` |
| Chips | `.sb-nav-chip` (+ `.sb-hashtag`, `.sb-nav-chip-hint`, `.sb-nav-chip-inactive`, `.sb-nav-chip-key`) |
| Sizing knobs | `--sb-nav-row-height` (36px), `--sb-nav-muted`, `--sb-nav-band` |
| Fuzzy-match highlight | `mark` inside rows |

Other UI pieces:

- **Menus:** `.sb-anchored-menu(-header/-title/-subtitle)`, `.sb-dock-menu`.
- **Prompts:** `.sb-prompt`, `.sb-prompt-input`, `.sb-prompt-buttons`.
- **Buttons and fields:** `.sb-button`, `.sb-button-primary`, `.sb-button-icon`, `.sb-input`, `.sb-select`, `.sb-checkbox`, `.sb-filter-input`.
- **Notifications:** `.sb-notification-message`, `.sb-notification-actions`, `.sb-notification-dismiss`.
- **Autocomplete:** CodeMirror's `.cm-tooltip-autocomplete`, plus `.sb-completion-documentation`.
- **Search panel:** `.cm-panels-bottom`, `.cm-search`.

## Editor line classes (`#sb-main .cm-editor .cm-line.*`)

| Content | Classes / DOM |
| --- | --- |
| Headings | `sb-line-h1` … `sb-line-h6`. Inline marks `.sb-h1`… The `#` marks are `.sb-meta` (`--sb-header-hang` hangs them in the margin) |
| Paragraph | plain `.cm-line` |
| Lists | `sb-line-ul` / `sb-line-ol`, `sb-line-li`, `sb-line-li-N` (depth). Bullet is `span.cm-list-bullet`; indent via `--sb-list-indent` / `--sb-indent` |
| Tasks | `sb-line-task`. `[ ]`/`[x]` render as `span.sb-checkbox > input[type=checkbox]`, and done text gets `.cm-task-checked`. Custom states (`[TODO]`, `[DOING]`…) stay text: `.sb-task-mark` + `span.sb-task-state[data-task-state="…"]`. Deadlines are `.sb-task-deadline` |
| Horizontal rule | `sb-line-hr` (`.sb-hr`) |
| Blockquote | `sb-line-blockquote`, `sb-line-blockquote-N` (2–6 for nesting). The bar is a `background-image` gradient on the line (`--blockquote-bar` 2px, `--blockquote-step` 2ch, `--sb-quote-indent`). Quote text is `.sb-quote`, marks `.sb-quote-mark` |
| Admonition / callout | `sb-admonition` plus the attribute `admonition="<type>"` (lowercase; match with `[admonition="note" i]`). The first line also gets `sb-admonition-title`. The type marker is `span.sb-admonition-type`, whose `::before` draws the icon from `--admonition-icon` / `--admonition-color` / `--admonition-width`. Its children are the raw `[`, `!TIP`, `]` spans; core hides them (and sizes the icon) only for note, warning, danger and success, so a theme must hide `.sb-admonition-type > *` for every other type. Syntax is `> [!NOTE] Title` or `> **note** Title` |
| Fenced code | every line has `sb-line-fenced-code`. Fence lines also have `sb-line-code-outside` (transparent text) and hold `.sb-code-info` (language) + `.sb-code-copy-button` |
| Indented code | `sb-line-code` |
| Rendered fence (Mermaid, etc.) | widget line `sb-fenced-code-iframe sb-line-fenced-code`; hidden raw lines `sb-line-table-outside sb-line-fenced-code` |
| Frontmatter | `sb-frontmatter`, plus `sb-line-frontmatter-outside` when the cursor is away. Marker `.sb-frontmatter-marker`; folded preview `.sb-frontmatter-preview` |
| Tables | rendered as `span.sb-table-widget > table` (`.sb-table-markdown`, `.sb-table-scroll`). The header row uses `td` in `thead`. Cells carry `sb-table-align-left/center/right`, so don't override `text-align` blindly. Raw lines are `sb-line-tbl-header` / `sb-line-table-outside` |
| Comments | `sb-line-comment`, `.sb-comment-block(-first/-last)`, `.sb-comment-marker`, `.sb-comment-label` |
| Footnotes | `.sb-footnote-ref`, `.sb-footnote-def-line`, `.sb-rendered-footnote-ref/-def(-label)`, `.sb-footnote-tooltip` |

Inline classes:

- **Emphasis:** `.sb-strong`, `.sb-emphasis`, `.sb-strikethrough`, `.sb-highlight` (`==x==`).
- **Inline code and sub/superscript:** `.sb-code` (inline code; also used inside fenced lines), `.sb-sub`, `.sb-sup`.
- **Markdown syntax marks:** `.sb-meta`.
- **Links:** `a.sb-link[href]` (external links match `a.sb-link[href^="http"]`), `.sb-url`, `.sb-naked-url`.
- **Wiki links:** `.sb-wiki-link` (+ `-missing`, `-invalid`, `-ambiguous`; page part vs brackets via `--editor-wiki-link-page-*`).
- **Tags and mentions:** `.sb-hashtag[data-tag-name]` (+ `.sb-hashtag-text`), `.sb-at-mention`, `.sb-named-anchor`.
- **Attributes:** `.sb-attribute`, `-name`, `-value` (`[key: value]`).
- **Keys and directives:** `.sb-kbd`, `.sb-directive`, `.sb-directive-mark`.

## Widgets

| Widget | Classes |
| --- | --- |
| Lua expression results | `span.sb-lua-wrapper > div.sb-lua-directive-inline` (inline) or `> div.sb-lua-directive-block` (block). Query tables are plain tables, `….sb-lua-directive-block .content .wrapper > table > thead th` |
| Markdown widgets | `.sb-markdown-widget`, `.sb-lua-top-widget` / `.sb-lua-bottom-widget` (page decorations) |
| Widget button bars | Block widgets (queries, KaTeX, Mermaid…) put theirs in `.sb-lua-directive-block > div > .button-bar` (absolute, top-right). Core keeps it `display: none` until the widget is hovered, with `display: block !important` on touch. The frontmatter preview and `.sb-lua-view` bars fade with opacity instead. A fenced block rendered by a code widget (` ```mermaid `) sits on `.cm-line.sb-fenced-code-iframe`, which still gets core's `.sb-actions > .sb-code-copy-button` (floated right), so it collides with the bar. Hide it when the bar has its own `[data-button="copy"]` |
| Command buttons | `widgets.commandButton(...)` renders `.sb-lua-directive-inline > button` (coloured by `--editor-command-button-*`); `.button-bar` holds widget toolbars |
| Page widgets (linked mentions etc.) | `.sb-page-widget`, `-heading`, `-body`, `-bar`, `-tools`, `-fold`, `-collapsed` |
| Loading states | `.sb-loading-widget(-block/-inline)` |
| HTML widgets | `.sb-html-widget(-inline)` |

## Code tokens (inside `.sb-line-fenced-code`)

The CodeMirror tag → class map, from `client.js`:

```text
keyword → sb-keyword     string → sb-string     regexp/escape/special string → sb-string2
number → sb-number       bool → sb-bool          atom → sb-atom      literal → sb-literal
variableName → sb-variableName                   typeName → sb-typeName
operator → sb-operator   punctuation → sb-punctuation                comment → sb-comment
meta / processingInstruction → sb-meta           invalid → sb-invalid
inserted → sb-inserted   deleted → sb-deleted (diffs)
```

There is no function/property/tag distinction, so Obsidian or Prism palettes have to collapse onto these. Core colours them through `--editor-code-*` variables (see `core-variables.md`). Override a token directly with `#sb-root #sb-main .cm-editor .sb-line-fenced-code .sb-keyword { … }`.
