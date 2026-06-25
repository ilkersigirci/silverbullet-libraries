---
name: Library/ilkersigirci/styles/mobile-toolbar
tags: meta/library
---

# Mobile Toolbar

## Config

```space-lua
config.set {
  -- 'bottom-bar' or 'hamburger'
  mobileMenuStyle = 'bottom-bar'
}
```

## Action Buttons

```space-lua
actionButton.define {
  icon = 'file-plus',
  description = 'Create Page',
  run = function()
    editor.invokeCommand("Page: Create Page")
  end
}
actionButton.define {
  icon = "rotate-ccw",
  description = "Undo",
  mobile = true,
  run = function()
    editor.invokeCommand("Editor: Undo")
  end
}
actionButton.define {
  icon = "bold",
  description = "Bold",
  mobile = true,
  run = function()
    editor.invokeCommand("Text: Bold")
  end
}
actionButton.define {
  icon = "italic",
  description = "Italic",
  mobile = true,
  run = function()
    editor.invokeCommand("Text: Italic")
  end
}
actionButton.define {
  -- Icon not showing
  icon = "strikethrough",
  description = "Strikethrough",
  mobile = true,
  run = function()
    editor.invokeCommand("Text: Strikethrough")
  end
}
actionButton.define {
  icon = "list",
  description = "List",
  mobile = true,
  run = function()
    editor.invokeCommand("Text: Listify Selection")
  end
}
actionButton.define {
  -- Icon not showing
  icon = "list-ordered",
  description = "List",
  mobile = true,
  run = function()
    editor.invokeCommand("Text: Number Listify Selection")
  end
}
actionButton.define {
  icon = "check-square",
  description = "Task",
  mobile = true,
  run = function()
    editor.invokeCommand("Toggle Todo Checkbox")
  end
}
actionButton.define {
  icon = "arrow-left",
  description = "Dedent",
  mobile = true,
  run = function()
    editor.invokeCommand("Outline: Move Left")
  end
}
actionButton.define {
  icon = "arrow-right",
  description = "Indent",
  mobile = true,
  run = function()
    editor.invokeCommand("Outline: Move Right")
  end
}
actionButton.define {
  icon = "link",
  description = "Link",
  mobile = true,
  run = function()
    editor.invokeCommand("Text: Link Selection")
  end
}
```

## CSS for moving to bottom

```space-style
@media only screen and (max-width: 768px) {
  #sb-top .sb-actions.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 0;
    background: var(--top-background-color);
    width: 100vw;
    box-shadow: 0px 4px 8px black;
    justify-content: flex-start;
    overflow-x:scroll;
    cursor:grab;
    scrollbar-width:none;
    flex-wrap: nowrap;
    height:1.6rem;
    white-space: nowrap;
    display: flex;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch; /* smooth momentum scrolling on iOS */
    scrollbar-width: none;            /* Firefox */
    -ms-overflow-style: none;
  }
  #sb-top .sb-actions.bottom-bar button {
    padding: 1.1ex;
    margin: 0;
    height: unset;
    width: unset;
  }
  #sb-top .sb-actions.bottom-bar button svg {
    margin-bottom: -0.2rem;
    height: 1.3rem;
  }
}
```
