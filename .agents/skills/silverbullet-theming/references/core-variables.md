# SilverBullet core CSS variables (SB 2.12.1)

Core defines these on `html` (light defaults) and `html[data-theme="dark"]`, around lines 1228–1757 of a prettified `main.css`. There is also a `@media (prefers-color-scheme: dark)` copy for `html:not([data-theme]):has(body.sb-standalone)`.

- **Override:** set them on `html[data-theme]:root`, or on `html[data-theme="light"|"dark"]:root` for per-scheme values.
- **Refresh the list:** `scripts/fetch-core.sh`, then read `variables.txt`.
- **See a default:** `grep -n -- '--link-color:' main.pretty.css`.

## Typography and width

| Variable | Drives |
| --- | --- |
| `--ui-font` | UI chrome font (default `"iA-Mono", "Menlo", monospace`) |
| `--editor-font` | Editor text (`#sb-editor .cm-content`), notifications, vim panel. Core's default is the monospace iA-Mono, so a proportional theme sets it and gives code its own font with element rules |
| `--editor-monospace-font` | Only merge-conflict sections and the x-ray tooltip; not code blocks. Not defined by core, read with a `monospace` fallback |
| `--editor-width` | Text column max width (800px), also used by the `#sb-top` wrapper |
| `--sb-top-height` | Title bar height (55px, set on `:root`) |

Editor geometry (set on `.cm-content` / `.cm-line`; usually leave these alone): `--editor-column` (1ch), `--editor-base-font`, `--sb-indent`, `--sb-list-indent`, `--sb-header-hang`, `--sb-line-pad-y`, `--blockquote-bar`, `--blockquote-step`, `--sb-quote-indent`, `--sb-quote-bar-offset`, `--sb-inline-comment-indent`.

## Surfaces

| Variable | Drives |
| --- | --- |
| `--root-background-color`, `--root-color` | Page/editor background and text |
| `--ui-surface-background-color`, `--ui-surface-color`, `--ui-surface-subtle-color` | Generic surfaces (default to root/subtle) |
| `--ui-surface-border-color` | Default border for surfaces, modals, buttons and panels |
| `--ui-surface-hover-background-color`, `--ui-surface-section-background-color` | Row hover; folder rows, segmented control track |
| `--subtle-color`, `--subtle-background-color` | Muted text, muted fills |
| `--top-color`, `--top-background-color`, `--top-border-color` | Title bar |
| `--top-saved-color`, `--top-unsaved-color`, `--top-loading-color` | Page-title colour per save state |
| `--top-sync-error-color`, `--top-sync-error-background-color` | Title bar on sync error |
| `--panel-background-color`, `--panel-border-color` | `.sb-panel` (Lua/plug panels) and the bottom nav root. **Not** the sidebars: every `.sb-nav-root` (tree, TOC and pickers) is painted with `--modal-background-color`, so give sidebars their own colour with an element rule on `.sb-nav-root-lhs/-rhs` |
| `--bhs-background-color`, `--bhs-border-color` | `.sb-bhs` bottom panel |
| `--progress-background-color`, `--progress-sync-color`, `--progress-index-color` | Sync/index progress ring |

## Accent, links and meta

| Variable | Drives |
| --- | --- |
| `--ui-accent-color`, `--ui-accent-contrast-color`, `--ui-accent-text-color` | Accent fill, text on it, accent-coloured text (focus, selected segment, primary buttons) |
| `--link-color`, `--link-missing-color`, `--link-invalid-color` | Base link colours (other link variables default to these) |
| `--meta-color`, `--meta-subtle-color` | Base colours: `--meta-color` feeds `--editor-meta-color` (`.sb-meta` syntax marks); `--meta-subtle-color` feeds heading, link and line marks, code comments and command-button meta |
| `--highlight-color` | Base highlight colour; feeds `--editor-highlight-background-color` |
| `--danger-color`, `--danger-contrast-color`, `--success-color` | Destructive / success buttons and states |

## Controls

| Variable | Drives |
| --- | --- |
| `--button-background-color`, `--button-hover-background-color`, `--button-color`, `--button-border-color` | Normal buttons |
| `--primary-button-background-color`, `--primary-button-hover-background-color`, `--primary-button-color`, `--primary-button-border-color` | Primary buttons |
| `--action-button-background-color`, `--action-button-color`, `--action-button-hover-color`, `--action-button-active-color` | Top-bar icon buttons and the mobile keyboard bar |
| `--text-field-background-color`, `--text-field-focus-color` | Inputs |
| `--badge-background-color`, `--badge-color` | `.sb-badge` and `.sb-nav-chip` |

## Modals (page picker, command palette, prompts)

`--modal-color`, `--modal-background-color` (also the background of every `.sb-nav-root`, sidebars included), `--modal-border-color`, `--modal-backdrop-color` (transparent by default), `--modal-header-label-color`, `--modal-help-background-color`, `--modal-help-color`, `--modal-selected-option-background-color`, `--modal-selected-option-color`, `--modal-selected-option-description-color`, `--modal-description-color`, `--modal-hint-background-color`, `--modal-hint-color`, `--modal-hint-inactive-background-color`, `--modal-hint-inactive-color`.

## Notifications and alerts

- **Toasts:** `--notifications-background-color`, `--notifications-border-color`, and `--notification-info|warning|error-background-color` (default: a 10% mix of the alert colour into the modal background).
- **Alert colours:** `--alert-info|warning|error-color`, `-background-color`, `-border-color`.

## Editor

| Group | Variables |
| --- | --- |
| Caret, selection | `--editor-caret-color`, `--editor-selection-background-color` |
| Headings | `--editor-heading-color`, `--editor-heading-meta-color` (the `#` marks) |
| Meta and lines | `--editor-meta-color` (`.sb-meta`), `--editor-line-meta-color` (list marks on the cursor line), `--editor-ruler-color` (hr), `--editor-list-bullet-color` |
| Links | `--editor-link-color`, `--editor-link-url-color`, `--editor-link-meta-color`, `--editor-naked-url-color` |
| Wiki links | `--editor-wiki-link-color` (brackets), `--editor-wiki-link-page-color`, `--editor-wiki-link-page-background-color`, `--editor-wiki-link-page-missing-color`, `--editor-wiki-link-page-invalid-color` |
| Hashtags | `--editor-hashtag-color`, `--editor-hashtag-background-color`, `--editor-hashtag-border-color` |
| @mentions | `--editor-at-mention-color`, `-background-color`, `-border-color`, `-signature-color` |
| Highlight | `--editor-highlight-background-color` (`==x==`) |
| Blockquote | `--editor-blockquote-color`, `--editor-blockquote-background-color`, `--editor-blockquote-border-color` |
| Code | `--editor-code-background-color`, `--editor-code-color`, `--editor-code-comment-color`, `--editor-code-variable-color`, `--editor-code-typename-color`, `--editor-code-string-color`, `--editor-code-number-color`, `--editor-code-operator-color`, `--editor-code-atom-color`, `--editor-code-info-color` (language label) |
| Code diffs | `--editor-code-inserted-color`, `--editor-code-inserted-bg`, `--editor-code-deleted-color`, `--editor-code-deleted-bg` (not defined by core, read with fallbacks) |
| Frontmatter | `--editor-frontmatter-background-color`, `--editor-frontmatter-color`, `--editor-frontmatter-marker-color` |
| Tables | `--editor-table-head-background-color`, `--editor-table-head-color`, `--editor-table-even-background-color` |
| Tasks | `--editor-task-marker-color`, `--editor-task-state-color` |
| Directives / Lua | `--editor-directive-color`, `--editor-directive-mark-color`, `--editor-directive-background-color`, `--editor-struct-color` (`.sb-struct`) |
| Widget frames | `--editor-widget-background-color` (fenced-code iframes, bottom iframes, conflict sections) |
| Command buttons | `--editor-command-button-color`, `-background-color`, `-hover-background-color`, `-border-color`, `-meta-color` |
| Comments | `--editor-comment-background-color`, `--editor-comment-border-color` |
| Collaboration | `--editor-external-caret-color`, `--editor-external-edit-color` |
| Bottom panels (search) | `--editor-panels-bottom-color`, `-background-color`, `-border-color`, `-input-background-color`, `-button-background-image`, `-button-active-background-image` |
| Autocomplete | `--editor-completion-detail-color`, `--editor-completion-detail-selected-color` |
| Read with fallbacks, not defined | `--editor-text-color`, `--editor-error-color` (#d32f2f), `--editor-accent-muted` |

## Admonitions

Per type, on `.sb-admonition[admonition="<type>" i]`: `--admonition-color` and `--admonition-icon` (a data-URI SVG used as a mask). On `.sb-admonition-type::before`: `--admonition-width`. Libraries such as *Admonitions multilingual* add their own `--admonition-*` knobs, so grep the space.

## Navigation

On `.sb-nav-root` / rows: `--sb-nav-row-height`, `--sb-nav-muted`, `--sb-nav-band`, `--sb-tree-row-inset`, `--sb-tree-indent`.
