import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

const out = fileURLToPath(new URL("../.verify/", import.meta.url));
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
page.setDefaultTimeout(20000);
await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
await page.waitForSelector(".hero");

const shot = async (name, y) => {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await new Promise((r) => setTimeout(r, 450));
  await page.screenshot({ path: join(out, `${name}.png`), fullPage: false });
};

const height = await page.evaluate(() => document.documentElement.scrollHeight);
const about = await page.evaluate(() => document.getElementById("about")?.offsetTop ?? 0);
const services = await page.evaluate(() => document.getElementById("services")?.offsetTop ?? 0);
const pricing = await page.evaluate(() => document.getElementById("pricing")?.offsetTop ?? 0);

await shot("hero-top", 0);
await shot("hero-mid", 520);
await shot("hero-dark", 1100);
await shot("about-start", about + 40);
await shot("about-mid", about + 700);
await shot("about-end", about + 1400);
await shot("services-1", services + 80);
await shot("services-2", services + 900);
await shot("services-3", services + 1800);
await shot("pricing", pricing + 20);
await page.setViewport({ width: 1440, height: 1400 });
await shot("pricing-cards", pricing + 220);
await page.setViewport({ width: 1440, height: 900 });

await page.setViewport({ width: 390, height: 844 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
await shot("mobile-hero", 0);
const mAbout = await page.evaluate(() => document.getElementById("about")?.offsetTop ?? 0);
const mPrice = await page.evaluate(() => document.getElementById("pricing")?.offsetTop ?? 0);
await shot("mobile-about", mAbout + 20);
await shot("mobile-pricing", mPrice + 80);

const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
console.log(JSON.stringify({ height, about, services, pricing, overflow }, null, 2));
await browser.close();
