---
name: Library/ilkersigirci/scripts/general-fixes
tags: meta/library
files:
  - general-fixes/picker-keyboard.js
  - general-fixes/sidebar-keyboard.js
---

# General Fixes

Fixes for SilverBullet 2.12+ bugs. Each one changes only the case it fixes, so the library is safe to install on every device. Behaviour fixes are small JavaScript modules next to this page; layout fixes are CSS. After **Library: Update**, refresh SilverBullet to load the new version.

The modules load from your space, so they also work offline when `sync.documents` is on.

## Pickers open the keyboard on Android

Tapping **Open page**, **Run command** or a plug's search button (for example Silversearch) on an Android phone opens the picker, but the keyboard stays closed until you tap its text box. With this fix the text box takes focus and the keyboard opens, as search does in Android apps and as SilverBullet already does on desktop.

- **Applies to:** the page picker, the command palette, plugs' filter boxes (`editor.filterBox`), and plug panels shown as a modal that focus a text field of their own (Silversearch).
- **Leaves alone:** sidebars and drawers (Tree, Table of Contents), pickers without a filter, and any picker that already has focus.
- **Only Chromium on Android** (Chrome, Brave, Edge, Samsung Internet). SilverBullet leaves these pickers unfocused on phones on purpose. [#2144](https://github.com/silverbulletmd/silverbullet/pull/2144), merged in 2.12, kept that and only made tablets with a keyboard focus them. On iOS the keyboard only opens for focus inside the tap itself. Chromium opens it for any focus once the page has been tapped, so on Android the picker can behave as on desktop.
- **Plug modals** are iframes created after your tap, and Chromium only opens the keyboard in a frame you've tapped. The fix opens the keyboard from a temporary field in the page, then moves focus to the plug's own field.

Remove this fix once SilverBullet opens the keyboard for its pickers and for plug modals on Android itself.

## Tapping the Space tree opens the keyboard

On a phone or tablet, tapping a page, a folder or a tab (Pages, Documents, Meta) in the Space tree opens the keyboard: for a moment when the tap opens a page, for good when it doesn't. After each click SilverBullet hands focus back to the panel's **Open** field, which keeps keyboard navigation working on desktop. On a touch screen it focuses a field you never tapped. With this fix the field only takes focus when you tap it or use a keyboard, as SilverBullet already does for its page picker on touch screens.

- **Applies to:** touches in the Space tree, the Table of Contents and other side panels, in every browser.
- **Leaves alone:** the page picker and command palette, mouse clicks, and keyboards.

Remove this fix once SilverBullet stops focusing the panel's field after a tap on a touch screen.

## The vim status bar shows over modals

With vim mode on, the `--NORMAL--` bar at the bottom of the editor shows on top of the page picker, the command palette, plug modals such as Silversearch and, on phones, the Space tree and Table of Contents drawers. The `Ctrl-f` search bar does the same. CodeMirror, SilverBullet's editor, gives these bars a `z-index` higher than SilverBullet's own layers. The fix keeps CodeMirror's layers inside the editor with `isolation: isolate`, so whatever SilverBullet draws over the editor covers them.

Remove this fix once SilverBullet keeps the editor's bars under its modals itself.

## The cursor disappears at the start of headings

When the cursor is on a heading, SilverBullet shows its `#` marks to the left of the text, so the heading text stays where it is. It does this whenever the editor is wider than 800px, but just above that the space left of the text is narrower than the marks, so they're cut off at the editor's edge, and so is the cursor on them. In vim mode the block cursor vanishes when `j`, `k`, `h` or `l` lands on a heading's `#`. A wider page makes it happen at more window sizes, for example Baseline with `--bl-line-width: 880px`. The fix lets the marks stick out only as far as there's room; when there isn't enough, the heading text moves right a little instead.

- **Applies to:** headings in every theme, with or without vim mode.
- **Leaves alone:** wide windows, where the marks fit, and narrow ones and phones, where SilverBullet already shows the marks inline.

Remove this fix once SilverBullet fits the marks to the space left of the text itself.

## Implementation

```space-lua
-- Load the fix modules shipped next to this page (see files: above) when this script loads.
-- Not on editor:init: on a device's first start, library scripts load after that event.
-- The browser imports each module once, so reloading scripts doesn't run a fix twice.
for _, module in ipairs({ "picker-keyboard.js", "sidebar-keyboard.js" }) do
  local ok, err = pcall(function()
    js.importFromSpace("Library/ilkersigirci/scripts/general-fixes/" .. module)
  end)
  if not ok then
    print("General Fixes: could not load " .. module .. ": " .. tostring(err))
  end
end
```

```space-style
/* The vim status bar shows over modals: keep CodeMirror's layers inside the editor. */
#sb-editor {
  isolation: isolate;
}

/* The cursor disappears on heading marks: hang them no further than the margin left of
   the text. The margin is half the editor's spare width (100cqi is #sb-editor's width,
   less 16px for a scrollbar) plus the page's 20px padding. */
#sb-main .cm-editor .cm-line.sb-header-inside {
  text-indent: calc(-1 * (var(--sb-indent) + min(var(--sb-header-hang), max(0px, (100cqi - var(--editor-width) - 16px) / 2) + 20px)));
}
```
