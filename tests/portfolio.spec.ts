import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.removeItem("kush-portfolio-copper-leaves-loader-v2"));
});

test("homepage keeps a single desktop navigation, a visible resume link, and the copper leaf field", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("[data-site-loader]")).toBeHidden({ timeout: 2_000 });
  if (testInfo.project.name === "desktop-chromium") {
    await expect(page.locator(".site-header .desktop-nav")).toBeVisible();
    await expect(page.locator(".site-header .mobile-menu:visible")).toHaveCount(0);
  }
  await expect(page.getByRole("link", { name: "View resume", exact: true })).toHaveAttribute("href", /Kush-Vyas-Resume\.pdf$/);
  await expect(page.getByRole("link", { name: "Download", exact: true })).toHaveCount(0);
  await expect(page.locator("[data-spring-atmosphere]")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("[data-spring-leaf]")).toHaveCount(22);
  await expect(page.locator('[data-spring-leaf][data-leaf-tone="ember"]')).toHaveCount(7);
  if (testInfo.project.name === "desktop-chromium") await expect(page.locator("[data-hero-pixel-mark]")).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("mobile navigation opens without horizontal overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only assertion");
  await page.goto("/");
  await expect(page.locator("[data-site-loader]")).toBeHidden({ timeout: 2_000 });
  await expect(page.locator(".desktop-nav")).toBeHidden();
  await page.getByRole("button", { name: /open navigation/i }).click();
  await expect(page.locator(".mobile-menu")).toBeVisible();
  await expect(page.locator("[data-spring-leaf]:visible")).toHaveCount(20);
  await expect(page.locator("[data-hero-pixel-mark]")).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("open-source and experience metadata use readable content sizes", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-site-loader]")).toBeHidden({ timeout: 2_000 });
  await page.locator(".open-source-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".open-source-list span").first()).toHaveCSS("font-size", /1[45]px/);
  await expect(page.locator(".open-source-list span").nth(1)).toHaveCSS("font-size", /12\.5px|12px/);
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(page.locator(".experience-copy > p").first()).toHaveCSS("font-size", "12px");
});

test("a project case study remains accessible and has no horizontal overflow", async ({ page }) => {
  await page.goto("/work/voxo");
  await expect(page.locator("[data-site-loader]")).toBeHidden({ timeout: 2_000 });
  await expect(page.getByRole("heading", { name: "Voxo" })).toBeVisible();
  await expect(page.getByRole("link", { name: /view repository/i })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});

test.describe("reduced motion", () => {
  test("skips the loader and keeps reveal content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("[data-site-loader]")).toBeHidden();
    await expect(page.locator(".open-source-title")).toBeVisible();
    await expect(page.locator(".spring-leaf-motion").first()).toHaveCSS("transform", "none");
  });
});
