---
name: Library/ilkersigirci/scripts/general-fixes
tags: meta/library
files:
  - general-fixes/picker-keyboard.js
---

# General Fixes

Behaviour fixes for SilverBullet 2.12+. Each fix is a small JavaScript module next to this page that checks whether it applies and does nothing otherwise, so the library is safe to install on every device. After **Library: Update**, refresh SilverBullet to load the new version.

The modules load from your space, so they also work offline when `sync.documents` is on.

## Pickers open the keyboard on Android

Tapping **Open page**, **Run command** or a plug's search button (for example Silversearch) on an Android phone opens the picker, but the keyboard stays closed until you tap its text box. With this fix the text box takes focus and the keyboard opens, as search does in Android apps and as SilverBullet already does on desktop.

- **Applies to:** the page picker, the command palette, plugs' filter boxes (`editor.filterBox`), and plug panels shown as a modal that focus a text field of their own (Silversearch).
- **Leaves alone:** sidebars and drawers (Tree, Table of Contents), pickers without a filter, and any picker that already has focus.
- **Only Chromium on Android** (Chrome, Brave, Edge, Samsung Internet). SilverBullet leaves these pickers unfocused on phones on purpose. [#2144](https://github.com/silverbulletmd/silverbullet/pull/2144), merged in 2.12, kept that and only made tablets with a keyboard focus them. On iOS the keyboard only opens for focus inside the tap itself. Chromium opens it for any focus once the page has been tapped, so on Android the picker can behave as on desktop.
- **Plug modals** are iframes created after your tap, and Chromium only opens the keyboard in a frame you've tapped. The fix opens the keyboard from a temporary field in the page, then moves focus to the plug's own field.

Remove this fix once SilverBullet opens the keyboard for its pickers and for plug modals on Android itself.

## Implementation

```space-lua
-- Load the fix modules shipped next to this page (see files: above) when this script loads.
-- Not on editor:init: on a device's first start, library scripts load after that event.
-- The browser imports each module once, so reloading scripts doesn't run a fix twice.
for _, module in ipairs({ "picker-keyboard.js" }) do
  local ok, err = pcall(function()
    js.importFromSpace("Library/ilkersigirci/scripts/general-fixes/" .. module)
  end)
  if not ok then
    print("General Fixes: could not load " .. module .. ": " .. tostring(err))
  end
end
```
