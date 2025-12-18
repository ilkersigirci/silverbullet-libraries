---
name: Library/ilkersigirci/styles/font
tags: meta/library
---

# Font

To reference static files in your space, add `.fs/` to the start of the URL path (in other words, `src: url('/.fs/fonts/...');`). Do not create a `.fs/` directory on disk in the `SilverBullet` space itself.

Learn more in the “File system” section of the [HTTP API docs](https://silverbullet.md/HTTP%20API).

Test the Font

- NORMAL
- **BOLD**
- _ITALIC_

Adapted from [Mr-xRed set-custom-font](https://gist.github.com/Mr-xRed/c81f6494ba6fa8e9bf6ee3f57cf9558b#set-custom-font)

```space-style
/* Font Styling */

@font-face {
    font-family: "OpenSansVariable";
    src: url('/.fs/Fonts/OpenSansVar.ttf') format('truetype'); 
    /* This tells the browser this font supports a range of weights */
    font-weight: 300 900; 
    /* This tells the browser this font supports a range of widths (Condensed to Normal) */
    font-stretch: 75% 100%; 
    font-display: swap;
}

@font-face {
    font-family: "FiraCodeVariable";
    src: url('/.fs/Fonts/FiraCodeVar.ttf') format('truetype');
    /* Fira Code VF usually supports 300 to 700 */
    font-weight: 300 700;
    font-style: normal;
    font-display: swap;
}

#sb-root {
    --ui-font: "OpenSansVariable", sans-serif;
    --editor-font: "FiraCodeVariable", monospace;
}

/* UI Font Settings */
#sb-editor .cm-content,
div:not(.sb-line-fenced-code) {
    font-family: var(--ui-font);
    font-variation-settings: "wdth" 100;
}

/* Editor & Code Block Settings */
span.sb-code, 
div .sb-line-fenced-code, 
.sb-hashtag, .hashtag {
    font-family: var(--editor-font);
    /* Enable Fira Code Ligatures */
    font-variant-ligatures: normal; 
}

/* Optional: Tweaking the code block appearance */
span.sb-code {
    background-color: rgba(128, 128, 128, 0.2);
    /* Fira Code often looks better slightly lighter than standard bold */
    font-weight: 450; 
}

.sb-hashtag, .hashtag {
    font-size: 1rem !important;
    font-weight: 300;
    padding: 1px 4px !important;
}

/* Mobile screens */
@media (max-width: 600px) {
  #sb-editor .cm-content {
      font-stretch: 75%; 
      font-variation-settings: "wdth" 75; 
  }
}
```
