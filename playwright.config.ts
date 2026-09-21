import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for click/link smoke tests.
 *
 * `webServer` auto-starts the app before the tests and shuts it down after, so
 * `npm run test:e2e` is all you need — no separate terminal. It reuses an
 * already-running dev server if you happen to have one up.
 *
 * Some product category pages fetch from the live backend API, so the machine
 * running these tests needs network access.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1280, height: 800 }, // desktop: mega-menu nav is visible
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
