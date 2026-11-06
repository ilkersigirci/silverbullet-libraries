---
name: silverbullet-theming
description: Build, port or debug SilverBullet 2.x themes and style libraries written as space-style CSS blocks. Covers how space-style loads (priority, specificity), SilverBullet's core CSS variables, DOM and CodeMirror line classes, porting Obsidian themes, and a screenshot workflow against a throwaway SilverBullet container. Use when styling SilverBullet, writing or fixing a Library/*/styles page, porting a theme from another editor, or working out why a space-style rule does not apply.
---

# SilverBullet theming

A SilverBullet (SB) theme is a markdown page, usually a library under `Library/<author>/…`, whose `space-style` fences hold CSS. Most of the look comes from overriding SB's ~150 core CSS variables. The rest is element rules written against SB's DOM and the CodeMirror line classes.

These notes were written against **SB 2.12.1**. When the version changes, re-check selectors with `scripts/fetch-core.sh` rather than trusting this file, old themes or memory. The DOM changed a lot between 0.x and 2.x.

## Files in this skill

| Path | Use it for |
| --- | --- |
| `references/dom-and-classes.md` | Page layout, the shared nav component, editor line classes, code tokens |
| `references/core-variables.md` | Every core CSS variable, grouped by what it drives |
| `references/porting-obsidian.md` | Obsidian → SB variable and concept map, plus the Baseline case study |
| `assets/theme-template.md` | Skeleton theme library page to copy |
| `assets/test-space/` | Seed for a scratch space: `Theme-Test.md` (exercises every element) and a `CONFIG.md` that opens both sidebars |
| `scripts/preview.sh` | Start or stop a throwaway, auth-less SB container on any folder |
| `scripts/fetch-core.sh` | Download SB's real `main.css`/`client.js` and pull out variables and classes |
| `scripts/sbshot.mjs` | Screenshots and DOM probes with `playwright-core` |

## How space-style works

- **Global CSS.** Every `space-style` fence on any page is one style object, applied to the whole client. Docs: <https://docs.silverbullet.md/Space%20Style>.
- **Load order:** styles are collected by an index query ordered by `priority desc`. Set the priority with a comment on the fence's first line:

  ```space-style
  /* priority: -10 */
  html[data-theme]:root { --root-background-color: #fdfdfd; }
  ```

  - Higher priority loads earlier. Lower (more negative) priority loads later and wins ties.
  - Fences without a priority load **before** any negative priority. Use `-10` for a theme, so it lands after ordinary libraries, and tell users to override at `-20`.
  - Fences with the **same priority load in arbitrary order**. Never depend on order between them; use specificity instead.
- **Where it lands:** styles go into `<div id="custom-styles">` at the end of `<body>`, after `main.css`. At equal specificity a space-style rule beats core.
- **When it applies:** file edits sync to open clients, but run **System: Reload** (or refresh) if a style change doesn't show.
- **Light and dark:** SB always sets `data-theme="light|dark"` on `<html>`. It follows `prefers-color-scheme` unless the user toggled dark mode in SB.
- **Iframes:** widgets rendered in iframes (Mermaid, HTML panels, document editors) are separate documents. Space-style doesn't reach inside them, so style the hosting line or frame only.
- **Library pages:**
  - Frontmatter is `name: Library/<author>/<path>` plus `tags: meta/library` (see `assets/theme-template.md`).
  - Libraries are distributed through a repository index page; users run `Library: Add Repository` (<https://docs.silverbullet.md/Library>, <https://docs.silverbullet.md/Repository>).
  - Installed copies get `share.uri`, `share.hash` and `share.mode: pull`, and **Library: Update overwrites them**. Never patch an installed copy. Fix it upstream, or override it from a lower priority.
- **Turning a block off:** rename the fence from `space-style` to `css`. Also use `css` for snippets in docs that should *not* apply.

## Workflow

1. **Get the real CSS and DOM** for the version in use: `scripts/fetch-core.sh <base-url> <out-dir>`. `/.client/*` is served without auth, so this even works against an instance you can't log into. Grep `main.pretty.css` for the rule you're overriding *before* writing a selector, so you know its specificity.
2. **Tokens.** Prefix your own variables (`--xx-*`). Put the palette on `html[data-theme="light"]:root` and `html[data-theme="dark"]:root`. Put semantic tokens on `html[data-theme]:root`: bg, bg-alt, chrome, border, text, muted, faint, accent and hover.
3. **Map the tokens onto SB's variables** on `html[data-theme]:root`. This alone restyles most of the UI, including other libraries that use SB variables. See `references/core-variables.md`.
4. **Write element rules** prefixed with `#sb-root`. Group them by area: base/layout, typography, links/tags, lists/tasks, code, blockquotes, admonitions, tables, frontmatter/widgets, navigation, controls. See `references/dom-and-classes.md`.
5. **Verify with screenshots** (below) in light and dark, desktop and phone, sidebars open and closed, the page picker, the command palette, and on pages that exercise every element.
6. **Ship** it as a library page and register it in the repository index (see Shipping).

## Cascade rules and gotchas

- **Specificity beats order.** Core rules are mostly `#sb-main .cm-editor …`, specificity (1,2,x). `#sb-root` wraps `#sb-main`, so prefixing theme rules with `#sb-root` (for example `#sb-root #sb-main .cm-editor .cm-line.sb-line-h1`) wins regardless of load order.
- **Variable selectors.**
  - Set SB variables on `html[data-theme]:root`, (0,2,1). That beats core's `html` and `html[data-theme="dark"]`.
  - To override *your own* tokens in a media query at the same priority, add specificity, e.g. `html[data-theme]:root:not(.xx-off)`. Otherwise the two blocks tie and the result is random.
- **Other libraries' `!important`.** Grep the space first: `grep -rn '!important' Library/`. Beat those rules with `!important` at higher specificity, or set the variable they read at a closer element (e.g. `html #sb-root { --ui-font: … }`).
- **CodeMirror virtualises lines.** Only visible lines exist in the DOM, and off-screen runs become `.cm-gap`. Every block (code, quote, admonition, frontmatter) is a run of sibling `.cm-line`s, so build its shape line by line:

  ```css
  /* all lines */
  #sb-root #sb-main .cm-editor .cm-line.sb-line-fenced-code:not(.sb-fenced-code-iframe) {
    background-color: var(--xx-code-bg);
    border-inline: 16px solid transparent;   /* "padding" that keeps the background */
  }
  /* first line */
  #sb-root #sb-main .cm-editor :not(.sb-line-fenced-code) + .cm-line.sb-line-fenced-code,
  #sb-root #sb-main .cm-editor .cm-content > .cm-line.sb-line-fenced-code:first-child {
    border-top-left-radius: 8px; border-top-right-radius: 8px;
  }
  /* last line */
  #sb-root #sb-main .cm-editor .cm-line.sb-line-fenced-code:not(:has(+ .sb-line-fenced-code)) {
    border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;
  }
  ```

- **Use transparent borders, not padding, inside block shapes.**
  - Lines already use `padding-left: var(--sb-indent)` with a negative `text-indent` for hanging indents, and the blockquote bar sits in the content box.
  - `border: Npx solid transparent` adds space and the background still shows under it.
- **Hidden delimiter lines.**
  - Fence and frontmatter marker lines carry `sb-line-code-outside` / `sb-line-frontmatter-outside`, and their text is transparent until the cursor enters.
  - Recolouring `.sb-meta` or the code colour un-hides them, so re-assert `color: transparent` on them at higher specificity.
- **Admonition markers.** Core hides the raw `[!TYPE]` / `**type**` marker only for note, warning, danger and success. Hide `#sb-root #sb-main .cm-editor .sb-admonition-type > *` yourself, or `> [!TIP]` titles show the marker text.
- **Test without overlapping libraries too.** An installed library (e.g. an admonitions library) can mask gaps in your theme. Screenshot a scratch space that contains only your theme and its real dependencies.
- **Rendered fences** (Mermaid and similar) show as an `sb-fenced-code-iframe` line, with the hidden raw lines marked `sb-line-table-outside`. Exclude them from code-block panels, or you get a double frame.
- **Code needs its own font.** Core has no code-font variable (`--editor-monospace-font` only covers conflict sections). With a proportional `--editor-font`, give `.sb-code` and `.cm-line.sb-line-fenced-code` a monospace `font-family` explicitly.
- **Checkboxes.** `<input type=checkbox>` doesn't inherit `font-size`. Set `font-size: inherit` before sizing it in `em`.
- **Editor margins.** Core sets `#sb-editor { height: 100% }`. If you add margins (a floating-card layout, say), also set `height: auto`.
- **Sidebars start below `#sb-top`** (z-index 20). To run them full height, use `margin-top: calc(-1 * var(--sb-top-height)); z-index: 21;`.
- **Phone breakpoint is 600px.** At ≤600px the sidebars become drawers and the dock buttons in `#sb-top` appear. Use `@media (min-width: 601px)` and `(max-width: 600px)`.
- **URLs must be relative.**
  - Write `url(".fs/Library/<author>/styles/<theme>/x.woff2")`. It resolves against `<base href="/<prefix>/">`, while an absolute `/.fs/…` 404s when SB is served under a URL prefix.
  - Ship fonts and other assets with the library through `files:` (see Shipping) instead of asking users to copy them.
- **Icons** that follow the text colour: `background-color: currentColor; mask: var(--icon) center / contain no-repeat;` with a data-URI SVG in `--icon`. Include `-webkit-mask` too.
- **Phone hamburger menu.** On mobile clients, `.sb-actions.hamburger` is a column inside the top-bar row that grows downward when opened. If you vertically centre the row (`align-items: center`), the title jumps to the middle of the open menu. Pin the row's height to the closed button (`calc(2.2rem + 4px)`) and give the menu `align-self: flex-start`.
- **Sync-error (offline) state.** Core paints the whole `#sb-top` with `--top-sync-error-background-color` (pale yellow in light, dark red in dark). If your layout turns only part of `#sb-top` into a card, reset `#sb-top.sb-sync-error`'s background and tint the card part instead, and map the colour to your palette.
- **Modal backdrop.** `--modal-backdrop-color` is transparent by default, so set it if pickers should dim the page.
- **Sidebars share the modal background.** Every `.sb-nav-root` (tree, TOC, page picker, command palette) is painted with `--modal-background-color`; `--panel-background-color` only covers `.sb-panel`. For sidebars that differ from pickers, set `background-color` on `#sb-root #sb-main .sb-nav-root-lhs/-rhs`.
- **Empty `:has()` states.** `#sb-root:not(:has(#sb-main > .sb-nav-root))` means "no sidebar open", which is useful for full-bleed layouts. A closed sidebar is removed from the DOM, not hidden.

## Verifying visually

Never ship blind. Run a throwaway SB on a scratch space (mounted read-only, no auth) and screenshot it.

```bash
S="$PWD/.agents/skills/silverbullet-theming"     # absolute path to this skill

# 1. Scratch space: the test pages, plus the theme and its `files:` folder at the path its `name:` says
SPACE=$(mktemp -d)
cp -r "$S/assets/test-space/." "$SPACE/"
mkdir -p "$SPACE/Library/<author>/styles" && cp -r styles/<theme>.md styles/<theme> "$SPACE/Library/<author>/styles/"
# (drop `styles/<theme>` if the theme has no files; add other libraries it relies on, e.g. styles/font.md;
#  or point preview.sh at a real space folder, which is mounted read-only)

# 2. Start SB with the same image and URL prefix as production (prints the base URL)
"$S/scripts/preview.sh" start "$SPACE" --prefix /notes --image ghcr.io/silverbulletmd/silverbullet:2.12.1

# 3. playwright-core lives outside the repo; a Chromium is needed (see the script header)
mkdir -p /tmp/pw && cd /tmp/pw
[ -d node_modules/playwright-core ] || PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright-core
node "$S/scripts/sbshot.mjs" --base http://127.0.0.1:3399/notes --page Theme-Test --scheme dark --scroll 0,900,1800 --out /tmp/shots/dark

# 4. Clean up
"$S/scripts/preview.sh" stop
```

Then read the PNGs. A fresh browser has no saved view state, so the sidebars only open because of the test space's `CONFIG.md`. Check these states:

| State | `sbshot.mjs` flags |
| --- | --- |
| Light / dark | `--scheme light` / `--scheme dark` |
| Phone | `--size 390x844` (touch and mobile emulation below 700px wide) |
| Phone drawer | `--size 390x844 --click "#sb-top .sb-mobile-dock-left"` |
| Phone menu (open) | `--size 390x844 --click "#sb-top .sb-actions.hamburger button.expander"` |
| No sidebars | `--click ".sb-nav-root-lhs .sb-nav-close" --click ".sb-nav-root-rhs .sb-nav-close"` |
| Page picker | `--press Control+k` |
| Command palette | `--press Control+/ --type nav` |
| Offline / sync error | `--offline 10000` (cuts the network; SB adds `.sb-sync-error` to `#sb-top`) |
| Long pages | `--scroll 0,900,1800,…` (one PNG per offset) |

Useful probes (`--eval`, add `--out -` to skip screenshots):

- Load order: `[...document.querySelectorAll("#custom-styles style")].map(s => s.textContent.slice(0, 60))`
- Fonts: `[...document.fonts].map(f => f.family + " " + f.style + " " + f.status)` (`unloaded` just means nothing uses that face)
- Failed asset requests: `performance.getEntriesByType("resource").filter(e => e.name.includes("/.fs/")).map(e => e.name + " " + e.responseStatus)`
- Line classes: `[...document.querySelectorAll(".cm-line")].slice(0, 40).map(l => l.className)`
- Winning value: `getComputedStyle(document.querySelector("#sb-top")).backgroundColor`

## Shipping

- Start from `assets/theme-template.md`. Keep a short intro, a *Customize* section (with a `css` example at `priority: -20`), then one fence per area.
- Credit and licence the source theme if it's a port.
- Register the page in the repository index (in this repo that's `REPO.md`). Add an entry to its `#meta/library/remote` fence, with entries separated by `---`:

  ```yaml
  name: My Theme
  author: <author>
  description: One line on what it looks like
  website: <source theme or repo URL>
  uri: https://github.com/<user>/<repo>/blob/main/styles/<file>.md
  ```

- **Assets (fonts, images, CSS) go in `files:`.** List them in the frontmatter, relative to the page's folder. Install and update download them next to the page (docs: <https://docs.silverbullet.md/Library/Development>):

  ```yaml
  ---
  name: Library/<author>/styles/<theme>
  tags: meta/library
  files:
    - <theme>/MyFont.woff2
    - <theme>/LICENSE-MyFont.txt
  ---
  ```

  - In the repo, keep `styles/<theme>.md` next to `styles/<theme>/`. In the space they land at `Library/<author>/styles/<theme>/…`, so reference them as `url(".fs/Library/<author>/styles/<theme>/MyFont.woff2")`.
  - Redistributed fonts need their licence alongside (SIL OFL requires it), so ship it as one of the `files`.
  - Commit the asset files to the repo yourself; `Share: Page` only pushes the page.
- **Options without branching:** make an option a `0`/`1` variable and multiply it into `calc()` for lengths, radii and opacity (e.g. Baseline's `--bl-widget-buttons-outside`). `display` can't be computed, so fade with `opacity` instead of toggling `display`. Users flip it with one line at `priority: -20`.
- **Fonts from other libraries:** to reuse a font another library declares (e.g. `FiraCodeVariable` from `styles/font.md`), name its family first in your stack with system fallbacks after it. Don't add your own `@font-face` pointing at someone else's file path.
- **Installed copies are pull-mode:** after a push, users get the new version through `Library: Update`. If their copy was edited locally, SB asks before overwriting it.

## Author's setup (ilkersigirci)

Skip this section on other machines.

- **Live space:** `~/Repos/Mine/silverbullet-notes`, bind-mounted into the container `silverbullet` (compose file `~/docker/apps/silverbullet.yml`, image `ghcr.io/silverbulletmd/silverbullet:2.12.1`).
  - It runs in multi-space mode under the prefix `/notes`. Production (`https://notes.coding.ilkerflix.com/notes/`) is behind tinyauth plus SB auth, and agents can't log in. Use `preview.sh … --prefix /notes` instead.
  - Core files: `fetch-core.sh "http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}' silverbullet | awk '{print $1}'):3000/notes"`.
- **Worked example:** `styles/baseline.md` in this repo, a full Obsidian Baseline port (`--bl-*` tokens, priority `-10`). It ships Inter and its licence through `files:` (`styles/baseline/`), and takes Fira Code from `styles/font.md`. The live space has a copy at `Library/ilkersigirci/styles/baseline.md`, with `baseline/` beside it; keep the two identical. Test pages in that space: `Markdown-General-Test`, `Admonition-Test`, `Code-Test`, `Mermaid-Test`, `index` (Lua widgets, query table) and `CONFIG`.
- **Installed libraries with `!important` rules a theme must beat:**
  - `Library/ilkersigirci/styles/font.md`: hashtag size and padding, and `div:not(.sb-line-fenced-code) { font-family: var(--ui-font) }`.
  - `Library/Mr-xRed/Admonitions_multilingual.md`: admonition borders and padding.
- `styles/font.md` reads `Fonts/OpenSansVar.ttf` and `Fonts/FiraCodeVar.ttf` from the space root. They are not shipped through `files:`, so a new space needs them copied in.
