import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../demos");
fs.mkdirSync(outDir, { recursive: true });

const URL = process.env.DEMO_URL || "https://carbonsense-web-tau.vercel.app/";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: outDir,
    size: { width: 1440, height: 900 },
  },
});

const page = await context.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1800);

// Hero dwell
await page.waitForTimeout(2200);

// Hover logo shine
const logo = page.locator("header a").first();
await logo.hover({ force: true }).catch(() => {});
await page.waitForTimeout(1800);

// Hover Read latest then click to Recent pieces
const readLatest = page.getByRole("link", { name: /Read\s*latest/i }).first();
await readLatest.hover();
await page.waitForTimeout(900);
await readLatest.click();
await page.waitForTimeout(2200);

// Hover first article card
const card = page.locator("#recent-pieces a").first();
await card.hover({ force: true }).catch(() => {});
await page.waitForTimeout(1800);

// Scroll to Who we are
await page.evaluate(() => {
  document.getElementById("who-we-are")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
await page.waitForTimeout(2200);

// Hover an expert portrait
const expert = page.locator("#who-we-are a").first();
await expert.hover({ force: true }).catch(() => {});
await page.waitForTimeout(1600);

// Scroll to footer CTA
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
await page.waitForTimeout(2400);

// Back to top via brand
await page.locator('header a[href="/"]').first().click();
await page.waitForTimeout(1800);

const videoPath = await page.video()?.path();
await context.close();
await browser.close();

const finalPath = path.join(outDir, "homepage-demo.webm");
if (videoPath && fs.existsSync(videoPath)) {
  fs.renameSync(videoPath, finalPath);
  console.log(finalPath);
} else {
  console.error("No video file produced");
  process.exit(1);
}
