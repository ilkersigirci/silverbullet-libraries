// Pickers open the keyboard on Android (General Fixes library).
//
// SilverBullet leaves its modal pickers unfocused on touch screens
// (shouldFocusModalFilter in client/lib/mobile.ts, kept on purpose in
// silverbulletmd/silverbullet#2144) because WebKit, the engine of every iOS
// browser, only opens the keyboard for focus that happens inside the tap.
// Chromium opens it for any focus once the frame has been tapped
// (Element::Focus checks HasStickyUserActivation), so on Chromium for Android
// the pickers can take focus like on desktop. There is no feature test for a
// browser's keyboard policy, so this checks the user agent.

const ua = navigator.userAgent;
const chromiumOnAndroid = /Android/.test(ua) && /Chrome\//.test(ua);

// The page picker and command palette (the modal navigator, when it has a
// filter) and editor.filterBox.
const PICKER_FIELD = [
  ".sb-nav-root-modal .sb-nav-header:not(.sb-nav-no-filter) .sb-nav-input",
  ".sb-modal-box .sb-filter-input",
].join(", ");
// Plug panels shown as a modal, e.g. Silversearch (editor.showPanel("modal", ...)).
const PLUG_FRAME = ".sb-modal .sb-panel iframe";
// Modals mount as direct children of #sb-root.
const MODAL = ".sb-modal-backdrop, dialog, .sb-modal-box";
// While a picker fades in, Chromium drops focus (silverbulletmd/silverbullet#2118).
const NOT_REVEALED = ".sb-modal-paint-pending";

const handled = new WeakSet();

function isTextField(el) {
  if (!el) return false;
  if (el.isContentEditable) return true;
  if (el.tagName === "TEXTAREA") return !el.readOnly && !el.disabled;
  return el.tagName === "INPUT" && !el.readOnly && !el.disabled &&
    /^(text|search|url|email|tel|number|password)$/.test(el.type);
}

function focusPicker(field) {
  if (handled.has(field) || field.closest(NOT_REVEALED)) return;
  handled.add(field);
  // SilverBullet focuses it itself when a keyboard is already in use.
  if (document.activeElement !== field) field.focus();
}

// The plug's iframe is created after the tap, so focus inside it can't open
// the keyboard. Focus a temporary field in the page first (it has seen the
// tap, so the keyboard opens), then move focus to the plug's field: moving
// focus from one text field to another keeps the keyboard open.
function openKeyboardFor(field) {
  const proxy = document.createElement("input");
  proxy.tabIndex = -1;
  proxy.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;pointer-events:none";
  document.body.append(proxy);
  proxy.focus({ preventScroll: true });
  requestAnimationFrame(() => {
    field.focus({ preventScroll: true });
    proxy.remove();
  });
}

// Wait for the plug to focus its own field; leave plugs that don't alone.
function watchPlugFrame(frame) {
  if (handled.has(frame)) return;
  handled.add(frame);
  let done = false;
  const handOver = () => {
    if (done) return;
    const field = frame.contentDocument?.activeElement; // null for cross-origin frames
    if (!isTextField(field)) return;
    done = true;
    openKeyboardFor(field);
  };
  const attach = () => {
    frame.contentDocument?.addEventListener("focusin", handOver);
    handOver(); // the plug may have focused its field while loading
  };
  frame.addEventListener("load", attach);
  attach();
}

function scanModal(modal) {
  modal.querySelectorAll(PICKER_FIELD).forEach(focusPicker);
  modal.querySelectorAll(PLUG_FRAME).forEach(watchPlugFrame);
}

// Observe only open modals (never the editor), each until it closes.
function observeModals(root) {
  const observers = new Map();
  const add = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE || !node.matches(MODAL)) return;
    const observer = new MutationObserver(() => scanModal(node));
    observer.observe(node, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    observers.set(node, observer);
    scanModal(node);
  };
  const remove = (node) => {
    observers.get(node)?.disconnect();
    observers.delete(node);
  };
  new MutationObserver((records) => {
    for (const record of records) {
      record.removedNodes.forEach(remove);
      record.addedNodes.forEach(add);
    }
  }).observe(root, { childList: true });
  [...root.children].forEach(add);
}

const root = document.getElementById("sb-root");
if (chromiumOnAndroid && root) observeModals(root);
