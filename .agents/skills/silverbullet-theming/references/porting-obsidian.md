# Porting an Obsidian theme to SilverBullet

Obsidian themes are mostly a set of CSS variables plus element rules. Port the variables first, since they carry most of the look. Then rebuild the element styles against SB's line classes (`dom-and-classes.md`).

## Reading the source theme

- **Prefer the SCSS/source folder over the compiled `theme.css`.** Token files (`root.scss`, `variables.scss`, `colors.scss`) show the intent. The compiled file buries it under Style Settings and plugin overrides.
- **Collect the token sets:**
  - The greyscale base (`--color-base-00…100`).
  - The accent (`--accent-h/s/l` or a hex value).
  - Per-scheme overrides (`.theme-light` / `.theme-dark`).
  - Typography, radii and shadows.
- **Pick a layout.** Note which workspace/layout variant is the default (many themes ship several) and port that one.
- **Licence:** check it, and credit the author on the library page.

## Variable map

Obsidian names are on the left. Map them through your own `--xx-*` tokens, then onto SB variables.

| Obsidian | SilverBullet |
| --- | --- |
| `--background-primary` | `--root-background-color`, editor card background, `--modal-background-color` |
| `--background-primary-alt` | `--editor-code-background-color`, `--editor-frontmatter-background-color`, `--editor-blockquote-background-color` |
| `--background-secondary` | `--top-background-color`, sidebar background (element rule; see the sidebar note in SKILL.md), `--panel-background-color`, `--bhs-background-color`, `--editor-panels-bottom-background-color` |
| `--background-modifier-border` | `--ui-surface-border-color`, `--top-border-color`, `--modal-border-color`, `--button-border-color`, `--editor-ruler-color` |
| `--background-modifier-hover` / `-active-hover` | `--ui-surface-hover-background-color`, `--subtle-background-color`, `--badge-background-color` |
| `--background-modifier-cover` | `--modal-backdrop-color` |
| `--text-normal` | `--root-color`, `--top-color`, `--editor-heading-color`, `--modal-color`, `--button-color` |
| `--text-muted` | `--subtle-color`, `--action-button-color`, `--editor-frontmatter-color` |
| `--text-faint` | `--meta-color`, `--meta-subtle-color`, `--editor-heading-meta-color`, `--editor-list-bullet-color`, `--editor-code-info-color` |
| `--text-accent`, `--link-color` | `--link-color`, `--editor-link-color`, `--editor-naked-url-color`, `--editor-wiki-link-page-color` |
| `--link-unresolved-color` | `--link-missing-color`, `--editor-wiki-link-page-missing-color` |
| `--interactive-accent`, `--text-on-accent` | `--ui-accent-color`, `--ui-accent-contrast-color`, `--primary-button-*` |
| `--interactive-normal`, `--interactive-hover` | `--button-background-color`, `--button-hover-background-color`, `--editor-command-button-*` |
| `--background-modifier-form-field` | `--text-field-background-color`, `--editor-panels-bottom-input-background-color` |
| `--text-selection` | `--editor-selection-background-color` |
| `--text-highlight-bg` | `--highlight-color`, `--editor-highlight-background-color` |
| `--tag-color`, `--tag-background`, `--tag-border-color` | `--editor-hashtag-color`, `-background-color`, `-border-color` |
| `--blockquote-border-color`, `--blockquote-background-color` | `--editor-blockquote-border-color`, `--editor-blockquote-background-color` |
| `--code-background`, `--code-normal` | `--editor-code-background-color`, `--editor-code-color` |
| `--code-comment`, `--code-string`, `--code-value`, `--code-keyword`, `--code-function`, `--code-property`, `--code-operator`, `--code-punctuation` | `--editor-code-comment-color`, `--editor-code-string-color`, `--editor-code-number-color` / `--editor-code-atom-color`, `.sb-keyword` (element rule), `--editor-code-typename-color`, `--editor-code-variable-color`, `--editor-code-operator-color`, `.sb-punctuation` (element rule) |
| `--file-line-width` | `--editor-width` |
| `--font-text`, `--font-interface`, `--font-monospace` | `--editor-font`, `--ui-font`, and element rules on `.sb-code` / `.cm-line.sb-line-fenced-code` for code (`--editor-monospace-font` only covers conflict sections). See the font note below |
| `--h1-size`…`--h6-size`, `--h1-weight`… | element rules on `.cm-line.sb-line-h1`… |
| `--callout-*`, `.callout[data-callout="x"]` | `.sb-admonition[admonition="x" i]` with `--admonition-color`, `--admonition-icon` |
| `--checkbox-*` | element rules on `.sb-line-task input[type=checkbox]` |
| `--table-*` | element rules on `.sb-table-widget table` and Lua query tables |
| `--color-red`…`--color-pink` | your tokens; feed `--danger-color`, `--success-color`, `--alert-*-color` and callout colours |

Font note: a font library may set `--ui-font` / `--editor-font` on a closer element (e.g. `#sb-root`). Set yours at least as close (`html #sb-root { --ui-font: …; --editor-font: … }`).

## Concept map

| Obsidian | SilverBullet |
| --- | --- |
| Title bar / view header, inline title | `#sb-top` with the page-name input `#sb-current-page .sb-input` |
| File explorer | `.sb-nav-root-lhs` tree |
| Outline | `.sb-nav-root-rhs` |
| Quick switcher, command palette | `.sb-modal > .sb-nav-root-modal` |
| Properties | frontmatter lines (`.sb-frontmatter`) |
| Callouts | admonitions |
| Reading view | none. SB is live-preview only, and syntax marks hide off the cursor line |
| Tabs, ribbon, status bar, canvas, graph | no equivalent, so skip them |
| Style Settings options | CSS variables documented in a *Customize* section and overridden at a lower priority. For switchable variants, use classes on `html` (toggled by a Space Lua command) and gate rules on them |
| Mobile | `@media (max-width: 600px)`; drawers instead of sidebars |

## Case study: Baseline

The [Baseline](https://github.com/svnaxis/obsidian-baseline) (MIT) port is `styles/baseline.md` in the `ilkersigirci/silverbullet-libraries` repo. It is a good model to copy from.

- **Sources used:** `src/app/root.scss` for tokens, `src/editor/*` for elements, and `src/layouts/cupertino.scss` for the default workspace.
- **Token mapping:** `background-primary`=base-00, `primary-alt`=base-10, `secondary`=base-20, `border`=base-30. Text normal/muted/faint are base-100/70/50. The accent is `#8a5cf5` (dark `#a68af9`).
- **Monochrome interface:** the interactive accent is base-100, and the purple accent is kept for links and tags only.
- **Layout:**
  - On wide screens the page is a floating rounded card on grey chrome. `#sb-top .main` is the top of the card and `#sb-editor` the rest; both get margins and borders, plus `height: auto`.
  - The sidebars are pulled up to full height.
  - It goes full-bleed when no sidebar is open, or on phones.
- **Callouts:**
  - Obsidian's type-to-colour mapping and Lucide icons, as data-URI masks.
  - A default title per type via `.sb-admonition-type:last-child::after { content: "Tip" }`, for `> [!TIP]` with no title.
- **Not ported (ideas):**
  - Baseline's 20+ colour schemes (each is a base + accent set; switch them with a class on `html`).
  - Alternative checkbox icons for custom task states (`data-task-state`).
  - Banners, cards, image filters, table helper classes and Style Settings variants.

Older SB themes for ideas only (they use the pre-2.x DOM): <https://github.com/mschmidtkorth/silverbullet-zen>, <https://gist.github.com/LegendaryB/6039a4f84a5082dd94d54021d6994953>.
