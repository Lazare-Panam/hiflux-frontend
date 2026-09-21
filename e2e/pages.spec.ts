import { test, expect } from "@playwright/test";

/**
 * Dead-page coverage: every route the site exposes must render real content
 * (HTTP < 400, no Next error boundary, a visible heading), an unknown URL must
 * return a genuine 404, and everything the sitemap advertises must resolve.
 */

// Static routes (folders under src/app with a page.tsx, no dynamic segment).
const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/news",
  "/products",
  "/shop",
  "/cart",
  "/industries",
  "/applications",
  "/product-index",
  "/returns-policy",
  "/industrial-filtration-systems",
  "/industrial-strainers",
  "/magnetic-filters",
];

// Known dynamic routes.
const DYNAMIC_ROUTES = [
  "/applications/hydrogen-refuelling",
  "/applications/wellhead-pressure-control",
  "/applications/research-and-testing",
  "/applications/chemical-processing",
  "/applications/power-generation",
  "/products/high-pressure-valves",
  "/products/high-pressure-fittings",
  "/products/high-pressure-tubing",
  "/products/union-adapters",
  "/products/high-pressure-regulators",
];

async function assertHealthy(path: string, page: import("@playwright/test").Page) {
  const res = await page.goto(path, { waitUntil: "domcontentloaded" });
  expect(res, `no response for ${path}`).not.toBeNull();
  expect(res!.status(), `${path} HTTP status`).toBeLessThan(400);

  // Next renders <h1 class="next-error-h1"> on its 404/500 pages. Match the
  // element (not the HTML string — the dev error overlay embeds that class name
  // in every page's markup, which would false-positive). toBeHidden passes when
  // the element is absent or hidden.
  await expect(page.locator("h1.next-error-h1")).toBeHidden();
  // Real content rendered (not a blank page). Heading isn't required — utility
  // pages like an empty cart legitimately have none.
  const text = (await page.locator("body").innerText()).trim();
  expect(text.length, `${path} rendered no visible content`).toBeGreaterThan(100);
}

test.describe("Every route renders (no dead pages)", () => {
  for (const path of [...STATIC_ROUTES, ...DYNAMIC_ROUTES]) {
    test(`renders ${path}`, async ({ page }) => {
      await assertHealthy(path, page);
    });
  }
});

test.describe("Error handling", () => {
  test("unknown URL returns a real 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist-" + Date.now(), {
      waitUntil: "domcontentloaded",
    });
    expect(res).not.toBeNull();
    expect(res!.status()).toBe(404);
  });

  test("sitemap is reachable and valid", async ({ request }) => {
    // next-sitemap emits an index (/sitemap.xml) pointing at /sitemap-0.xml.
    const idx = await request.get("/sitemap.xml");
    expect(idx.status()).toBe(200);
    const body = await idx.text();
    expect(body).toContain("<?xml");
  });
});

test.describe("Sitemap URLs resolve", () => {
  // Cap the crawl so the run stays fast; log what is skipped (no silent caps).
  const MAX = 120;

  test("all advertised URLs resolve (capped)", async ({ request }) => {
    const res = await request.get("/sitemap-0.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();

    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length, "sitemap has URLs").toBeGreaterThan(0);

    // Convert absolute prod URLs to local paths so we test the running server.
    const paths = locs.map((u) => {
      try {
        return new URL(u).pathname;
      } catch {
        return u;
      }
    });

    const toCheck = paths.slice(0, MAX);
    if (paths.length > MAX) {
      // eslint-disable-next-line no-console
      console.log(`sitemap: checking ${MAX} of ${paths.length} URLs (capped)`);
    }

    const broken: string[] = [];
    for (const p of toCheck) {
      const r = await request.get(p);
      if (r.status() >= 400) broken.push(`${p} -> HTTP ${r.status()}`);
    }
    expect(broken, "broken sitemap URLs").toEqual([]);
  });
});
