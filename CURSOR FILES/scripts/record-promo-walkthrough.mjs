/**
 * Premium trailer walkthrough — browser-on-desktop stage, large OS pointer
 * (arrow ↔ hand), camera zooms on features, short mobile inspect beat.
 * Output: CURSOR FILES/demos/homepage-promo.{webm,mp4}
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../demos");
fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.DEMO_URL || "https://carbonsense-web-tau.vercel.app";
const STAGE_W = 1920;
const STAGE_H = 1080;
const WIN_W = 1440;
const WIN_H = 900;
const CHROME_H = 52;
const CONTENT_H = WIN_H - CHROME_H;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function arcControls(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dist = Math.hypot(dx, dy) || 1;
  const bulge = Math.min(110, dist * 0.16) * (Math.random() > 0.45 ? 1 : -1);
  const nx = -dy / dist;
  const ny = dx / dist;
  return {
    cx1: x0 + dx * 0.3 + nx * bulge * 0.45,
    cy1: y0 + dy * 0.3 + ny * bulge * 0.45,
    cx2: x0 + dx * 0.7 + nx * bulge,
    cy2: y0 + dy * 0.7 + ny * bulge,
  };
}

function cubic(t, a, b, c, d) {
  const u = 1 - t;
  return u ** 3 * a + 3 * u ** 2 * t * b + 3 * u * t ** 2 * c + t ** 3 * d;
}

async function syncCursor(page, x, y, { hand = false, press = false } = {}) {
  await page.evaluate(
    ([px, py, handMode, pressed]) => {
      window.__promoX = px;
      window.__promoY = py;
      const el = window.__promoCursor;
      if (!el) return;
      el.classList.toggle("is-hand", handMode);
      el.classList.toggle("is-click", pressed);
      el.style.transform = `translate(${px}px, ${py}px)`;
    },
    [x, y, hand, press]
  );
}

async function moveCursor(page, x, y, { duration, hand = false } = {}) {
  const pos = await page.evaluate(() => ({
    x: window.__promoX ?? 960,
    y: window.__promoY ?? 540,
  }));
  const dx = x - pos.x;
  const dy = y - pos.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 1.5) {
    await page.mouse.move(x, y);
    await syncCursor(page, x, y, { hand });
    return;
  }

  // Keep travel fluid — never rush the path itself; pacing comes from fewer pauses
  const ms = duration ?? Math.min(780, Math.max(320, dist * 0.7));
  const frames = Math.max(14, Math.round(ms / 12));
  const useOvershoot = dist > 280;
  const ox = useOvershoot ? x + dx * 0.02 : x;
  const oy = useOvershoot ? y + dy * 0.02 : y;
  const { cx1, cy1, cx2, cy2 } = arcControls(pos.x, pos.y, ox, oy);

  for (let i = 1; i <= frames; i++) {
    const t = easeInOutQuint(i / frames);
    let mx = cubic(t, pos.x, cx1, cx2, ox);
    let my = cubic(t, pos.y, cy1, cy2, oy);
    if (useOvershoot && t > 0.9) {
      const u = (t - 0.9) / 0.1;
      mx = ox + (x - ox) * easeOutCubic(u);
      my = oy + (y - oy) * easeOutCubic(u);
    }
    await page.mouse.move(mx, my);
    await syncCursor(page, mx, my, { hand });
  }
  await page.mouse.move(x, y);
  await syncCursor(page, x, y, { hand });
}

async function setCamera(page, { scale = 1, ox = 0.5, oy = 0.45, ms = 520 } = {}) {
  await page.evaluate(
    async ({ scale, ox, oy, ms }) => {
      const win = document.getElementById("promo-win");
      if (!win) return;
      window.__promoCamScale = scale;
      win.style.transition = `transform ${ms}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      win.style.transformOrigin = `${ox * 100}% ${oy * 100}%`;
      win.style.transform = `translate(-50%, -50%) scale(${scale})`;
      await new Promise((r) => setTimeout(r, ms + 20));
    },
    { scale, ox, oy, ms }
  );
}

function stageHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  html, body { margin:0; width:100%; height:100%; overflow:hidden; background:#07080c; cursor:none; }
  * { cursor: none !important; }
  /* Clean cinematic desk — no nested browser / wallpaper chrome */
  #desk {
    position:fixed; inset:0;
    background:
      radial-gradient(ellipse 90% 70% at 18% 20%, rgba(45, 90, 70, 0.35), transparent 55%),
      radial-gradient(ellipse 80% 60% at 88% 75%, rgba(30, 55, 90, 0.4), transparent 50%),
      radial-gradient(ellipse 60% 50% at 50% 100%, rgba(20, 40, 30, 0.5), transparent 45%),
      linear-gradient(165deg, #0c1018 0%, #121820 40%, #0a0c10 100%);
  }
  #desk::before {
    content:""; position:absolute; inset:-20%;
    background:
      conic-gradient(from 210deg at 70% 30%, transparent 0deg, rgba(80,160,120,0.07) 40deg, transparent 90deg),
      conic-gradient(from 40deg at 25% 70%, transparent 0deg, rgba(60,100,160,0.08) 50deg, transparent 110deg);
    filter: blur(40px);
    opacity: 0.9;
    pointer-events:none;
  }
  #desk::after {
    content:""; position:absolute; inset:0;
    background: radial-gradient(ellipse at 50% 42%, transparent 25%, rgba(0,0,0,.5) 78%);
    pointer-events:none;
  }
  #promo-win {
    position:fixed; left:50%; top:50%;
    width:${WIN_W}px; height:${WIN_H}px;
    transform: translate(-50%, -50%) scale(1);
    transform-origin: 50% 45%;
    border-radius: 12px;
    overflow:hidden;
    box-shadow:
      0 40px 100px rgba(0,0,0,.55),
      0 0 0 1px rgba(255,255,255,.08);
    background:#111;
    z-index:2;
  }
  #chrome {
    height:${CHROME_H}px; background:#2b2b2b;
    display:flex; align-items:center; gap:8px; padding:0 14px;
    border-bottom:1px solid #1a1a1a;
  }
  .dot { width:12px; height:12px; border-radius:50%; }
  .dot.r { background:#ff5f57; }
  .dot.y { background:#febc2e; }
  .dot.g { background:#28c840; }
  #omnibox {
    flex:1; margin:0 48px 0 18px; height:28px; border-radius:14px;
    background:#1a1a1a; color:#c8c8c8; font:500 12px/28px -apple-system,Segoe UI,sans-serif;
    padding:0 14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  #frame-wrap { width:100%; height:${CONTENT_H}px; background:#fff; position:relative; }
  #site {
    width:100%; height:100%; border:0; display:block; background:#fff;
  }
  #site.mobile {
    width:390px; height:100%;
    margin:0 auto; display:block;
    box-shadow: 0 0 0 1px rgba(0,0,0,.12);
  }
  #frame-wrap.mobile-mode {
    display:flex; justify-content:center; background:#1c1c1e;
  }
  #device-pill {
    display:none; position:absolute; top:10px; left:50%; transform:translateX(-50%);
    z-index:5; background:rgba(0,0,0,.72); color:#fff;
    font:600 11px/1 -apple-system,Segoe UI,sans-serif;
    padding:7px 12px; border-radius:999px; letter-spacing:.04em;
  }
  #frame-wrap.mobile-mode #device-pill { display:block; }
  #promo-cursor {
    position:fixed; top:0; left:0; width:44px; height:44px;
    pointer-events:none; z-index:2147483647;
    transform: translate(-200px,-200px);
    filter: drop-shadow(0 2px 3px rgba(0,0,0,.5));
    will-change: transform;
  }
  #promo-cursor svg { width:44px; height:44px; display:none; }
  #promo-cursor .arrow { display:block; }
  #promo-cursor.is-hand .arrow { display:none; }
  #promo-cursor.is-hand .hand { display:block; }
  #promo-cursor.is-click { transform-origin: 4px 2px; }
  #promo-cursor.is-click svg { transform: scale(0.88); }
  #promo-cursor.is-hand.is-click svg { transform: scale(0.9); transform-origin: 14px 6px; }
</style>
</head>
<body>
  <div id="desk"></div>
  <div id="promo-win">
    <div id="chrome">
      <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
      <div id="omnibox">${BASE.replace(/^https?:\/\//, "")}/</div>
    </div>
    <div id="frame-wrap">
      <div id="device-pill">iPhone · 390×844</div>
      <iframe id="site" src="${BASE}/" title="Carbon Sense"></iframe>
    </div>
  </div>
  <div id="promo-cursor">
    <svg class="arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"
        d="M6.2 3.4 24.8 15.1l-8.2 1.7 4.8 10.4-3.5 1.6-4.9-10.6-6.3 6.1z"/>
    </svg>
    <svg class="hand" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" stroke="#111" stroke-width="1.35" stroke-linejoin="round"
        d="M10.2 14.2V8.4a1.7 1.7 0 0 1 3.4 0v5.2m0-3.6V6.6a1.7 1.7 0 0 1 3.4 0v7.2m0-4.2V7.2a1.7 1.7 0 1 1 3.4 0v9.1m0-3.4V9.5a1.7 1.7 0 1 1 3.4 0v9.8c0 4.1-2.6 7.2-7.4 7.2-3.7 0-6.2-1.6-7.9-4.5l-4.2-6.4a1.85 1.85 0 0 1 3.1-2l2.2 3.1V14.2z"/>
    </svg>
  </div>
  <script>
    window.__promoCursor = document.getElementById('promo-cursor');
    window.__promoX = ${STAGE_W * 0.55};
    window.__promoY = ${STAGE_H * 0.5};
    window.__promoCamScale = 1;
    window.__promoCursor.style.transform = 'translate(' + window.__promoX + 'px,' + window.__promoY + 'px)';
  </script>
</body>
</html>`;
}

async function waitSite(page) {
  const frame = page.frameLocator("#site");
  await frame.locator("body").waitFor({ timeout: 60000 });
  await sleep(500);
  return frame;
}

/**
 * Playwright boundingBox for iframe elements is already main-frame viewport coords.
 */
async function contentCenter(frameLocator, selector, { jitter = true } = {}) {
  const loc = frameLocator.locator(selector).first();
  const visible = await loc.waitFor({ state: "visible", timeout: 8000 }).then(() => true).catch(() => false);
  if (!visible) return null;
  const box = await loc.boundingBox().catch(() => null);
  if (!box) return null;
  const jx = jitter ? (Math.random() - 0.5) * Math.min(16, box.width * 0.18) : 0;
  const jy = jitter ? (Math.random() - 0.5) * Math.min(12, box.height * 0.18) : 0;
  return {
    x: box.x + box.width * 0.5 + jx,
    y: box.y + box.height * 0.48 + jy,
    box,
    loc,
  };
}

async function zoomOnBox(page, box, scale, ms = 850) {
  const win = await page.evaluate(() => {
    const r = document.getElementById("promo-win").getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  const ox = (box.x + box.width / 2 - win.x) / win.w;
  const oy = (box.y + box.height / 2 - win.y) / win.h;
  await setCamera(page, { scale, ox, oy, ms });
}

async function hoverFeature(page, frame, selector, { dwell = 420, zoom } = {}) {
  const c = await contentCenter(frame, selector);
  if (!c) return false;
  if (zoom) await zoomOnBox(page, c.box, zoom, 420);
  await moveCursor(page, c.x, c.y, { hand: true });
  await c.loc.hover({ force: true }).catch(() => {});
  await sleep(dwell);
  return true;
}

async function clickFeature(page, frame, selector) {
  const c = await contentCenter(frame, selector);
  if (!c) return false;
  await moveCursor(page, c.x, c.y, { hand: true });
  await sleep(50);
  await syncCursor(page, c.x, c.y, { hand: true, press: true });
  await page.mouse.down();
  await sleep(70);
  await page.mouse.up();
  await syncCursor(page, c.x, c.y, { hand: true, press: false });
  return true;
}

async function wheelInFrame(page, totalDelta) {
  let left = Math.abs(totalDelta);
  const dir = totalDelta > 0 ? 1 : -1;
  while (left > 0) {
    const tick = Math.min(left, 90 + Math.floor(Math.random() * 50));
    await page.mouse.wheel(0, tick * dir);
    left -= tick;
    await sleep(18 + Math.floor(Math.random() * 10));
  }
  await sleep(160);
}

async function wheelToward(page, frame, id, { offset = 72 } = {}) {
  for (let n = 0; n < 80; n++) {
    const info = await frame.locator("body").evaluate(
      ({ elId, off }) => {
        const el = document.getElementById(elId);
        if (!el) return { done: true, remaining: 0 };
        const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - off);
        return { done: false, remaining: target - window.scrollY };
      },
      { elId: id, off: offset }
    );
    if (info.done || Math.abs(info.remaining) < 22) break;
    const dir = info.remaining > 0 ? 1 : -1;
    const tick = Math.min(Math.abs(info.remaining), 95 + Math.floor(Math.random() * 45));
    await page.mouse.wheel(0, tick * dir);
    await sleep(16 + Math.floor(Math.random() * 10));
  }
  await sleep(180);
}

async function setOmnibox(page, pathText) {
  await page.evaluate((t) => {
    const el = document.getElementById("omnibox");
    if (el) el.textContent = t;
  }, pathText);
}

async function setMobile(page, on) {
  await page.evaluate((mobile) => {
    const wrap = document.getElementById("frame-wrap");
    const site = document.getElementById("site");
    wrap.classList.toggle("mobile-mode", mobile);
    site.classList.toggle("mobile", mobile);
  }, on);
  await sleep(500);
}

// —— Build stage (clean desk — no wallpaper browser) ——
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: STAGE_W, height: STAGE_H },
  deviceScaleFactor: 1,
  recordVideo: { dir: outDir, size: { width: STAGE_W, height: STAGE_H } },
});
const page = await context.newPage();
await page.setContent(stageHtml(), { waitUntil: "domcontentloaded" });
await sleep(300);

let frame = await waitSite(page);

// Arrive — brief hold so hero reads, then move
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("frame-wrap").getBoundingClientRect();
    return { x: r.x + r.width * 0.5, y: r.y + r.height * 0.4 };
  });
  await moveCursor(page, win.x, win.y, { duration: 650 });
}
await sleep(550);

// —— Logo shine ——
await hoverFeature(page, frame, 'header a[href="/"]', { dwell: 700, zoom: 1.18 });
await setCamera(page, { scale: 1, ms: 380 });

// —— Nav skim (tight) ——
for (const name of ["Articles", "About", "Support", "Contact"]) {
  await hoverFeature(page, frame, `header nav a:text-is("${name}")`, { dwell: 280 });
}

// —— CTA + live metric ——
await hoverFeature(page, frame, 'a[href="#recent-pieces"]', { dwell: 380, zoom: 1.1 });
const metric = frame.locator("main").locator("div").filter({ hasText: /tCO2e|Warming|IPCC/i }).first();
if ((await metric.count()) > 0) {
  const box = await metric.boundingBox();
  if (box) {
    await zoomOnBox(page, box, 1.22, 450);
    await moveCursor(page, box.x + box.width * 0.55, box.y + box.height * 0.45);
    await sleep(650);
  }
}
await setCamera(page, { scale: 1, ms: 400 });

// —— Wheel to Recent ——
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("frame-wrap").getBoundingClientRect();
    return { x: r.x + r.width * 0.68, y: r.y + r.height * 0.52 };
  });
  await moveCursor(page, win.x, win.y, { duration: 380 });
}
await wheelToward(page, frame, "recent-pieces");

// 2 cards only — preview reveal
const cards = frame.locator("#recent-pieces a");
const cardN = Math.min(2, await cards.count());
for (let i = 0; i < cardN; i++) {
  const card = cards.nth(i);
  const box = await card.boundingBox();
  if (!box) continue;
  if (box.y > STAGE_H - 220) await wheelInFrame(page, 100);
  await zoomOnBox(page, box, 1.16, 380);
  await moveCursor(page, box.x + box.width * 0.5, box.y + box.height * 0.45, { hand: true });
  await card.hover({ force: true }).catch(() => {});
  await sleep(520);
}
await setCamera(page, { scale: 1, ms: 360 });

// —— Who we are — 2 portraits ——
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("frame-wrap").getBoundingClientRect();
    return { x: r.x + r.width * 0.62, y: r.y + r.height * 0.52 };
  });
  await moveCursor(page, win.x, win.y, { duration: 360 });
}
await wheelToward(page, frame, "who-we-are");

const experts = frame.locator("#who-we-are a");
const expertTotal = await experts.count();
const picks = [0, 2].filter((i) => i < expertTotal);
for (const i of picks) {
  const el = experts.nth(i);
  const box = await el.boundingBox();
  if (!box) continue;
  if (box.y > STAGE_H - 240) await wheelInFrame(page, 90);
  await zoomOnBox(page, box, 1.28, 360);
  await moveCursor(page, box.x + box.width * 0.5, box.y + box.height * 0.4, { hand: true });
  await el.hover({ force: true }).catch(() => {});
  await sleep(420);
}
await setCamera(page, { scale: 1, ms: 340 });

// —— Articles → Spain ——
await clickFeature(page, frame, 'header nav a:text-is("Articles")');
await sleep(650);
frame = page.frameLocator("#site");
await setOmnibox(page, `${BASE.replace(/^https?:\/\//, "")}/articles`);
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("frame-wrap").getBoundingClientRect();
    return { x: r.x + r.width * 0.55, y: r.y + r.height * 0.45 };
  });
  await moveCursor(page, win.x, win.y, { duration: 360 });
}
await wheelInFrame(page, 280);

let spain = frame.locator('a[href*="the-spanish-economy-and-climate-change"]');
if ((await spain.count()) === 0) spain = frame.getByRole("link", { name: /Spain|Spanish/i });
for (let i = 0; i < 35; i++) {
  const box = await spain.first().boundingBox().catch(() => null);
  if (box && box.y > 120 && box.y < STAGE_H - 220) break;
  await page.mouse.wheel(0, 130);
  await sleep(22);
}
{
  const box = await spain.first().boundingBox();
  if (box) {
    await zoomOnBox(page, box, 1.16, 400);
    await moveCursor(page, box.x + box.width * 0.5, box.y + box.height * 0.45, { hand: true });
    await spain.first().hover({ force: true }).catch(() => {});
    await sleep(280);
    await syncCursor(page, box.x + box.width * 0.5, box.y + box.height * 0.45, {
      hand: true,
      press: true,
    });
    await page.mouse.down();
    await sleep(70);
    await page.mouse.up();
    await syncCursor(page, box.x + box.width * 0.5, box.y + box.height * 0.45, { hand: true });
  }
}

await sleep(750);
frame = page.frameLocator("#site");
await setOmnibox(
  page,
  `${BASE.replace(/^https?:\/\//, "")}/articles/the-spanish-economy-and-climate-change`
);
await setCamera(page, { scale: 1, ms: 300 });

await hoverFeature(page, frame, "article h1, main h1", { dwell: 400, zoom: 1.14 });
await setCamera(page, { scale: 1, ms: 320 });
if ((await frame.locator(".article-toc a").count()) > 0) {
  await clickFeature(page, frame, ".article-toc a");
  await sleep(350);
}
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("frame-wrap").getBoundingClientRect();
    return { x: r.x + r.width * 0.6, y: r.y + r.height * 0.55 };
  });
  await moveCursor(page, win.x, win.y, { duration: 340 });
}
await wheelInFrame(page, 700);

const embed = frame.locator(".article-embed").first();
if ((await embed.count()) > 0) {
  for (let i = 0; i < 24; i++) {
    const box = await embed.boundingBox().catch(() => null);
    if (box && box.y > 120 && box.y < STAGE_H - 260) break;
    await page.mouse.wheel(0, 130);
    await sleep(22);
  }
  const box = await embed.boundingBox();
  if (box) {
    await zoomOnBox(page, box, 1.14, 420);
    await moveCursor(page, box.x + box.width * 0.5, box.y + box.height * 0.4, { hand: true });
    await sleep(700);
  }
}
await setCamera(page, { scale: 1, ms: 360 });

// —— Quick mobile peek ——
await setOmnibox(page, `${BASE.replace(/^https?:\/\//, "")}/  ·  Inspect`);
await setCamera(page, { scale: 0.94, ms: 400 });
await setMobile(page, true);
await page.evaluate((url) => {
  document.getElementById("site").src = `${url}/`;
}, BASE);
await sleep(900);
frame = page.frameLocator("#site");
await setOmnibox(page, `${BASE.replace(/^https?:\/\//, "")}/`);
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("site").getBoundingClientRect();
    return { x: r.x + r.width * 0.5, y: r.y + r.height * 0.3 };
  });
  await moveCursor(page, win.x, win.y, { duration: 480 });
}
await wheelInFrame(page, 360);
await hoverFeature(page, frame, "#recent-pieces a, a[href='#recent-pieces']", { dwell: 450 });
await sleep(350);

// Soft pull-back end
await setMobile(page, false);
await setCamera(page, { scale: 0.88, ox: 0.5, oy: 0.5, ms: 650 });
{
  const win = await page.evaluate(() => {
    const r = document.getElementById("promo-win").getBoundingClientRect();
    return { x: r.x + r.width * 0.5, y: r.y + r.height * 0.42 };
  });
  await moveCursor(page, win.x, win.y, { duration: 520, hand: false });
}
await sleep(550);

const rawVideo = await page.video()?.path();
await context.close();
await browser.close();

const webmPath = path.join(outDir, "homepage-promo.webm");
const mp4Path = path.join(outDir, "homepage-promo.mp4");

if (!rawVideo || !fs.existsSync(rawVideo)) {
  console.error("No video recorded");
  process.exit(1);
}
if (fs.existsSync(webmPath)) fs.unlinkSync(webmPath);
fs.renameSync(rawVideo, webmPath);

const ff = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    webmPath,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "17",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    mp4Path,
  ],
  { encoding: "utf8" }
);

if (ff.status !== 0) {
  console.error(ff.stderr);
  process.exit(1);
}

console.log(mp4Path);
console.log(webmPath);
