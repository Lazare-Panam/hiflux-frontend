import { test, expect } from "@playwright/test";

/**
 * Click-through tests: assert that clicking a control actually lands on the
 * expected route, that the hover mega-menu works, and that external / tel /
 * mailto links carry a well-formed href (those we assert rather than click,
 * since clicking opens a mail client / new tab / external app).
 */

test.describe("Header navigation", () => {
  const NAV = [
    { name: "About Us", url: /\/about$/ },
    { name: "Products", url: /\/products$/ },
    { name: "Applications", url: /\/applications$/ },
    { name: "Contact Us", url: /\/contact$/ },
  ];

  for (const item of NAV) {
    test(`nav "${item.name}" navigates`, async ({ page }) => {
      await page.goto("/");
      await page
        .getByRole("banner")
        .getByRole("link", { name: item.name, exact: true })
        .first()
        .click();
      await expect(page).toHaveURL(item.url);
    });
  }

  test("logo returns home", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("banner").getByRole("link", { name: "Hiflux" }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Applications mega-menu opens and links through", async ({ page }) => {
    await page.goto("/");
    // Hover the top-level Applications item to reveal the mega-menu panel.
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Applications", exact: true })
      .first()
      .hover();
    const item = page.getByRole("link", { name: "Hydrogen Refuelling" });
    await expect(item.first()).toBeVisible();
    await item.first().click();
    await expect(page).toHaveURL(/\/applications\/hydrogen-refuelling$/);
  });
});

test.describe("Homepage CTAs", () => {
  const CTAS = [
    { name: "Request a Quote", url: /\/contact$/ }, // hero (first match)
    { name: "View the Range", url: /\/products$/ },
    { name: "About Hiflux UK", url: /\/about$/ },
    { name: "Browse all products", url: /\/products$/ },
    { name: "View certifications", url: /\/about$/ },
  ];

  for (const cta of CTAS) {
    test(`"${cta.name}" navigates`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("link", { name: cta.name }).first().click();
      await expect(page).toHaveURL(cta.url);
    });
  }

  test("application tile navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Power Generation" }).first().click();
    await expect(page).toHaveURL(/\/applications\/power-generation$/);
  });

  test("closing CTA has valid tel + catalogue links", async ({ page }) => {
    await page.goto("/");
    const call = page.getByRole("link", { name: "Call +44 7369 243459" });
    await expect(call).toHaveAttribute("href", "tel:+447369243459");

    const catalogue = page.getByRole("link", { name: "Download the Catalogue" }).first();
    await expect(catalogue).toHaveAttribute("href", /\/hiflux_catalog_en\.pdf$/);
    await expect(catalogue).toHaveAttribute("target", "_blank");
  });

  test("contact form accepts input and can submit", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Full Name").fill("Jane Engineer");
    await page.getByLabel("Email Address").fill("jane@example.com");
    await page.getByLabel("What do you need?").fill("Two 60k needle valves.");
    // The form opens a prefilled mailto: on submit (frontend-only handoff);
    // we assert the submit control is present and enabled rather than trigger
    // the OS mail handler.
    await expect(page.getByRole("button", { name: "Send Enquiry" })).toBeEnabled();
  });
});

test.describe("Applications pages", () => {
  const PAGES = [
    { slug: "hydrogen-refuelling", h1: "Hydrogen Refuelling" },
    { slug: "wellhead-pressure-control", h1: "Wellhead and Pressure Control" },
    { slug: "research-and-testing", h1: "Research and Testing" },
    { slug: "chemical-processing", h1: "Chemical and Petrochemical Processing" },
    { slug: "power-generation", h1: "Power Generation" },
  ];

  for (const p of PAGES) {
    test(`${p.slug} renders and its quote CTA works`, async ({ page }) => {
      await page.goto(`/applications/${p.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
      await page.getByRole("link", { name: "Request a Quote" }).first().click();
      await expect(page).toHaveURL(/\/contact$/);
    });
  }
});

test.describe("Product category editorial (backend-fed)", () => {
  test("fittings: title + editorial + product grid", async ({ page }) => {
    await page.goto("/products/high-pressure-fittings");
    await expect(page).toHaveTitle(/Cone & Thread to 150,000 psi/);
    await expect(
      page.getByRole("heading", { name: "Pressure ratings and tube sizes" }),
    ).toBeVisible();
    // Backend product grid still present.
    await expect(
      page.locator('a[href*="/products/high-pressure-fittings/"]').first(),
    ).toBeVisible();
  });

  test("tubing: title + editorial + product grid", async ({ page }) => {
    await page.goto("/products/high-pressure-tubing");
    await expect(page).toHaveTitle(/High Pressure Tubing & Nipples/);
    await expect(
      page.getByRole("heading", { name: "Minimum bend radius" }),
    ).toBeVisible();
    await expect(
      page.locator('a[href*="/products/high-pressure-tubing/"]').first(),
    ).toBeVisible();
  });
});
