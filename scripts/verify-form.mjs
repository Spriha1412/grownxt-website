import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const page = await browser.newPage();
page.on("pageerror", (err) => console.log("PAGEERROR", err.message));
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ block: "end" }));
await new Promise((r) => setTimeout(r, 400));
const exists = await page.evaluate(() => Boolean(document.getElementById("contact-submit")));
await page.evaluate(() => document.querySelector("form.contact-form")?.requestSubmit());
await new Promise((r) => setTimeout(r, 300));
const result = await page.evaluate(() => ({
  exists: Boolean(document.getElementById("contact-submit")),
  smalls: Array.from(document.querySelectorAll("form.contact-form small")).map((el) => el.textContent),
  alert: document.querySelector(".form-error")?.textContent ?? null,
}));
await page.screenshot({ path: "C:\\Users\\sprih\\Desktop\\grownxt\\.verify\\form-errors.png" });
console.log({ exists, result });
await page.setViewport({ width: 768, height: 900 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
await page.screenshot({ path: "C:\\Users\\sprih\\Desktop\\grownxt\\.verify\\tablet-768-b.png" });
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
await page.evaluate(() => document.getElementById("services")?.scrollIntoView({ block: "start" }));
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: "C:\\Users\\sprih\\Desktop\\grownxt\\.verify\\section-services-b.png" });
await browser.close();
