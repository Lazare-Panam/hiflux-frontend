import { test, expect } from "@playwright/test";

/**
 * Link-integrity smoke test.
 *
 * For each seed page, collect every internal link (<a href="/...">) actually
 * present in the DOM and assert its target resolves (HTTP < 400). This is the
 * "does every click go somewhere real" backbone — it catches typo'd hrefs,
 * removed pages, and broken CTAs. Failures are collected per page so one run
 * reports every bad link, not just the first.
 *
 * Note: the homepage alone links out to all five product categories and all
 * five application pages, so this covers the bulk of the site's clicks.
 */
const SEED_PAGES = [
  "/",
  "/applications",
  "/applications/hydrogen-refuelling",
  "/applications/wellhead-pressure-control",
  "/applications/research-and-testing",
  "/applications/chemical-processing",
  "/applications/power-generation",
  "/products/high-pressure-fittings",
  "/products/high-pressure-tubing",
];

for (const path of SEED_PAGES) {
  test(`internal links resolve on ${path}`, async ({ page, request }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });

    const hrefs = await page.$$eval('a[href^="/"]', (els) =>
      els.map((e) => e.getAttribute("href") || ""),
    );

    // Drop hash fragments and empties, dedupe.
    const targets = [
      ...new Set(hrefs.map((h) => h.split("#")[0]).filter((h) => h.length > 0)),
    ];

    expect(targets.length, `no internal links found on ${path}`).toBeGreaterThan(0);

    const broken: string[] = [];
    for (const href of targets) {
      const res = await request.get(href);
      if (res.status() >= 400) {
        broken.push(`${href} -> HTTP ${res.status()}`);
      }
    }

    expect(broken, `broken links found on ${path}`).toEqual([]);
  });
}
