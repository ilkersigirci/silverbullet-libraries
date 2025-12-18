---
name: Library/ilkersigirci/styles/button-styles
tags: meta/library
---

# Button-Styles

Default & LibraryManager. From [Mr-xRed](https://gist.github.com/Mr-xRed/c81f6494ba6fa8e9bf6ee3f57cf9558b#button-styles-default--librarymanager)

```space-style
:root {
  /* UPDATE (green) */
  --btn-update-bg: oklch(50% 0.25 160);
  --btn-update-text: oklch(100% 0.05 160);
  --btn-update-border: oklch(70% 0.20 160);
  --btn-update-hover: oklch(70% 0.25 160);

  /* REMOVE (red) */
  --btn-remove-bg: oklch(50% 0.25 30);
  --btn-remove-text: oklch(100% 0.05 30);
  --btn-remove-border: oklch(70% 0.20 30);
  --btn-remove-hover: oklch(70% 0.25 30);

  /* INSTALL (blue) */
  --btn-install-bg: oklch(55% 0.20 260);
  --btn-install-text: oklch(100% 0.05 260);
  --btn-install-border: oklch(70% 0.15 260);
  --btn-install-hover: oklch(70% 0.25 260);

  /* BUTTONS (gray) */
  --btn-hover: oklch(70% 0 0);
}

/* Base button style */
#sb-main button {
  padding: 2px 6px !important;
  margin-inline: 4px;
  font-size: 0.95em;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    background 0.25s ease,
    transform 0.15s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

/* BUTTON hover */
#sb-main button:not(.update):not(.remove):not(.install):hover {
  background: var(--btn-hover);
  border-color: color-mix(in oklch, var(--btn-hover), white 5%);
  box-shadow: 0 0 5px color-mix(in oklch, var(--btn-hover), white 15%);
  transform: scale(0.95);
}

/* UPDATE button */
table.manage-library td button.update {
  background: var(--btn-update-bg);
  color: var(--btn-update-text);
  border-color: var(--btn-update-border);
}
table.manage-library td button.update:hover {
  background: var(--btn-update-hover);
  border-color: color-mix(in oklch, var(--btn-update-hover), white 5%);
  box-shadow: 0 0 5px color-mix(in oklch, var(--btn-update-hover), white 15%);
  transform: scale(0.95);
}

/* REMOVE button */
table.manage-library td button.remove {
  background: var(--btn-remove-bg);
  color: var(--btn-remove-text);
  border-color: var(--btn-remove-border);
}
table.manage-library td button.remove:hover {
  background: var(--btn-remove-hover);
  border-color: color-mix(in oklch, var(--btn-remove-hover), white 5%);
  box-shadow: 0 0 5px color-mix(in oklch, var(--btn-remove-hover), white 15%);
  transform: scale(0.95);
}

/* INSTALL button */
table.manage-library td button.install {
  background: var(--btn-install-bg);
  color: var(--btn-install-text);
  border-color: var(--btn-install-border);
}
table.manage-library td button.install:hover {
  background: var(--btn-install-hover);
  border-color: color-mix(in oklch, var(--btn-install-hover), white 5%);
  box-shadow: 0 0 5px color-mix(in oklch, var(--btn-install-hover), white 15%);
  transform: scale(0.95);
}
```
