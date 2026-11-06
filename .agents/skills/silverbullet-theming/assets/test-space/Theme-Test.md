---
title: Theme Test
status: draft
tags:
  - theme-test
---

# Heading 1

Paragraph with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, ==highlight==, `inline code`, an [external link](https://example.com), a naked URL https://silverbullet.md, a [[Theme-Test|wiki link]], a [[Missing Page]], a #hashtag, a footnote[^1] and <kbd>Ctrl</kbd>+<kbd>K</kbd>.

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## Lists and tasks

- First item
- Second item with a long line that wraps around to check the hanging indent of list items in the editor column
  - Nested item
    - Deeper item
1. Ordered one
2. Ordered two
   1. Nested ordered

- [ ] Open task
- [x] Done task
- [TODO] Custom state
- [ ] Task with a deadline 📅 2026-12-31

## Blockquotes

> A simple blockquote with **bold** text that is long enough to wrap onto a second line in a normal width editor.
>
> > A nested quote.

## Admonitions

> [!NOTE]
> Note with the default title.

> [!TIP] Custom tip title
> Tip body with `code`.

> [!WARNING]
> Warning body.

> [!DANGER]
> Danger body.

> **info** Bold-type syntax
> Info body.

## Code

```javascript
// comment
function greet(name, times = 3) {
  const msg = `Hello, ${name}!`;
  for (let i = 0; i < times; i++) console.log(msg, i, true, null);
  return /re+gex/g.test(msg);
}
```

```python
def fib(n: int) -> int:
    """Docstring."""
    return n if n <= 1 else fib(n - 1) + fib(n - 2)
```

```
Plain fence without a language, with a very long line that should scroll or wrap depending on the theme's choice for code blocks.
```

## Table

| Left | Center | Right |
| :--- | :----: | ----: |
| a | b | 1 |
| long cell content | c | 22 |
| d | e | 333 |

## Lua

Inline expression: ${1 + 1}, page count: ${#query[[from index.tag "page"]]}

${widgets.commandButton("System: Reload")}

${query[[from index.tag "page" select {name = name, modified = lastModified} limit 3]]}

[^1]: The footnote text.
