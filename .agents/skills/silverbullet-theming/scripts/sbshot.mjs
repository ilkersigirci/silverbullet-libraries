#!/usr/bin/env node
// Screenshot or probe a SilverBullet page with playwright-core.
//
// Run it from a directory where playwright-core is installed (keep node_modules out of the repo):
//   mkdir -p /tmp/pw && cd /tmp/pw && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright-core
//   node /abs/path/sbshot.mjs --base http://127.0.0.1:3399/notes --page Theme-Test --scheme dark --out /tmp/shots/dark
//
// Options (actions run in the order given, after the page settles):
//   --base URL          SB root including any URL prefix (env SB_BASE, default http://127.0.0.1:3399)
//   --page NAME         page to open (default index)
//   --scheme S          light | dark (default light); SB follows prefers-color-scheme
//   --size WxH          viewport (default 1440x900); width < 700 emulates a phone (touch, 2x)
//   --wait MS           settle time after load for index, Lua widgets, styles and fonts (default 6000)
//   --press KEY         press a key or chord, e.g. Control+k        (repeatable)
//   --type TEXT         type text into the focused element          (repeatable)
//   --click SELECTOR    click the first match, if any               (repeatable)
//   --hover SELECTOR    hover the first match, if any               (repeatable)
//   --offline MS        cut the network, then wait MS for SB to show its sync-error state
//   --scroll Y[,Y...]   scroll the editor to each Y and take one screenshot per offset
//   --eval JS           evaluate an expression at the end and print the result as JSON
//   --out PREFIX        screenshot path prefix (default ./shot; writes PREFIX.png or PREFIX-<Y>.png); "-" = none
//
// Chromium: env CHROME, else the newest ~/.cache/ms-playwright/chromium-*, else playwright's default
// (install one with `npx playwright install chromium`).
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const require = createRequire(join(process.cwd(), "noop.js"));
let chromium;
try {
  ({ chromium } = require("playwright-core"));
} catch {
  console.error("playwright-core not found from the current directory. See the header of this script.");
  process.exit(2);
}

const opts = { base: process.env.SB_BASE || "http://127.0.0.1:3399", page: "index", scheme: "light",
  size: "1440x900", wait: "6000", scroll: "", eval: "", out: "./shot" };
const actions = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const key = argv[i].replace(/^--/, "");
  const val = argv[++i];
  if (val === undefined) { console.error(`missing value for --${key}`); process.exit(2); }
  if (["press", "type", "click", "hover", "offline"].includes(key)) actions.push([key, val]);
  else if (key in opts) opts[key] = val;
  else { console.error(`unknown option --${key}`); process.exit(2); }
}

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const root = join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(root)) return undefined;
  const dirs = readdirSync(root).filter((d) => /^chromium-\d+$/.test(d))
    .sort((a, b) => +b.split("-")[1] - +a.split("-")[1]);
  for (const d of dirs) {
    for (const rel of ["chrome-linux64/chrome", "chrome-linux/chrome",
      "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-win/chrome.exe"]) {
      const p = join(root, d, rel);
      if (existsSync(p)) return p;
    }
  }
  return undefined;
}

const [w, h] = opts.size.split("x").map(Number);
const mobile = w < 700;
const browser = await chromium.launch({ executablePath: findChrome(), headless: true });
const ctx = await browser.newContext({
  viewport: { width: w, height: h }, colorScheme: opts.scheme,
  isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

const url = `${opts.base.replace(/\/$/, "")}/${encodeURI(opts.page)}`;
await page.goto(url, { waitUntil: "load" });
await page.waitForSelector("#sb-editor .cm-content", { timeout: 30000 });
await page.waitForTimeout(+opts.wait);
await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });

for (const [kind, val] of actions) {
  if (kind === "press") await page.keyboard.press(val);
  else if (kind === "type") await page.keyboard.type(val);
  else if (kind === "offline") {
    await ctx.setOffline(true);
    await page.waitForTimeout(+val || 5000);
  }
  else {
    const el = await page.$(val);
    if (!el) console.error(`no element for ${kind} ${val}`);
    else if (kind === "click") await el.click();
    else await el.hover();
  }
  await page.waitForTimeout(700);
}

const shoot = async (suffix) => {
  if (opts.out === "-") return;
  const path = `${opts.out}${suffix}.png`;
  mkdirSync(dirname(path), { recursive: true });
  await page.screenshot({ path });
  console.log(path);
};
if (opts.scroll) {
  for (const y of opts.scroll.split(",").map(Number)) {
    await page.evaluate((y) => {
      const s = document.querySelector("#sb-editor .cm-scroller");
      if (s) s.scrollTop = y;
    }, y);
    await page.waitForTimeout(1200);
    await shoot(`-${y}`);
  }
} else {
  await shoot("");
}

if (opts.eval) {
  const result = await page.evaluate(opts.eval);
  console.log(typeof result === "string" ? result : JSON.stringify(result, null, 1));
}
if (errors.length) console.error("page errors:\n" + errors.slice(0, 5).join("\n"));
await browser.close();
