// Sidebar taps don't open the keyboard (General Fixes library).
//
// After a click on a row, folder arrow or segment, SilverBullet's navigator hands
// focus back to the panel's filter field so keyboard navigation keeps working
// (onTreeRowClick, toggleExpanded and pickSegment in client/navigator/ui/). On a
// touch screen the field never had focus, so this focuses it fresh and the keyboard
// opens: for a moment when the tap opens a page, for good when it doesn't.
// SilverBullet's own rule for its pickers (shouldFocusModalFilter in
// client/lib/mobile.ts) skips programmatic focus on touch screens; these calls don't
// check it. This applies the same rule to docked panels: after a touch anywhere but
// the field, the field hands focus straight back. Chromium only asks for the
// keyboard if the field still has focus once its focus event is over.

const FIELD = ".sb-nav-root:not(.sb-nav-root-modal) .sb-nav-input";
let touchedElsewhere = false;

// Pointer and key events arrive before the focus they lead to.
document.addEventListener("pointerdown", (event) => {
  touchedElsewhere = event.pointerType === "touch" && !event.target.closest?.(FIELD);
}, true);
document.addEventListener("keydown", () => {
  touchedElsewhere = false;
}, true);
document.addEventListener("focusin", (event) => {
  if (touchedElsewhere && event.target.matches?.(FIELD)) event.target.blur();
}, true);
