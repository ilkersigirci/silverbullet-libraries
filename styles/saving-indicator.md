---
name: Library/ilkersigirci/styles/saving-indicator
tags: meta/library
---

# Saving Indicator

Animate when saving file.

[Mr-xRed one](https://gist.github.com/Mr-xRed/c81f6494ba6fa8e9bf6ee3f57cf9558b#filesave-spinner)

```space-style
.sb-unsaved .cm-line::after {
  content: '';
  position: relative;
  display: inline-block;
  margin: 0 15px;
  width: 28px;
  height: 28px;
  top: 3px; 
  opacity: 1;
  background-size: contain;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="%23aa4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw-icon lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>') no-repeat center;
  animation: spinner 1s linear infinite;
 }
@keyframes spinner { to { transform: rotate(360deg);}}
```

[Alternative by MatthiasBenaets](https://github.com/MatthiasBenaets/silverbullet-library/blob/master/Styles/saving.md)

```style
@keyframes saving {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.sb-unsaved {
  animation: saving 2s infinite;
}

.sb-unsaved .cm-line {
  &::after {
    margin-left: 10px;
    position: relative;
    top: 0.1em;
    content: url('data:image/svg+xml,<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="rgb(187,194,207)" viewBox="0 0 24 24"> <path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/> <path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd"/> </svg>');
  }
}
```
