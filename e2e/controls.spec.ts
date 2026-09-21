import { test, expect } from "@playwright/test";

/**
 * "Every button works — no dead clicks."
 *
 *  1. No dead hrefs   — no anchor points at "", "#", or "javascript:".
 *  2. Buttons are real — every visible <button> has an accessible name.
 *
 * Whether a control does the *right* thing is covered by navigation.spec.ts;
 * that every internal link resolves is covered by links.spec.ts. Dead controls
 * that render but do nothing were found by a source audit and fixed (cart
 * Checkout, variants "Request quote"); these tests guard against regressions.
 */
const SEED_PAGES = [
  "/",
  "/applications",
  "/applications/hydrogen-refuelling",
  "/products/high-pressure-fittings",
  "/products/high-pressure-tubing",
  "/products",
  "/about",
  "/contact",
];

test.describe("No dead hrefs", () => {
  for (const path of SEED_PAGES) {
    test(`links have real targets on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const dead = await page.$$eval("a", (els) =>
        els
          .filter((e) => {
            const h = e.getAttribute("href");
            if (h === null) return true;
            const t = h.trim().toLowerCase();
            return t === "" || t === "#" || t.startsWith("javascript:");
          })
          .map((e) => (e.textContent || "").trim().slice(0, 40) || "(no text)"),
      );
      expect(dead, `dead-href anchors on ${path}`).toEqual([]);
    });
  }
});

test.describe("Buttons are real controls", () => {
  for (const path of SEED_PAGES) {
    test(`buttons named on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const nameless = await page.$$eval("button", (els) =>
        els
          .filter((e) => {
            const visible = !!(
              e.offsetWidth ||
              e.offsetHeight ||
              e.getClientRects().length
            );
            if (!visible) return false;
            const name = (
              e.textContent ||
              e.getAttribute("aria-label") ||
              ""
            ).trim();
            return name.length === 0;
          })
          .map((e) => e.outerHTML.slice(0, 80)),
      );
      expect(nameless, `nameless visible buttons on ${path}`).toEqual([]);
    });
  }
});
