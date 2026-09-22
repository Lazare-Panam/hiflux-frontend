import { describe, it, expect } from "vitest";
import {
  CATEGORY_EDITORIAL,
  getCategoryEditorial,
} from "@/app/products/data/editorial";

const keys = Object.keys(CATEGORY_EDITORIAL);

describe("product category editorial overlay", () => {
  it("covers the fittings and tubing categories", () => {
    expect(getCategoryEditorial("high-pressure-fittings")).toBeDefined();
    expect(getCategoryEditorial("high-pressure-tubing")).toBeDefined();
  });

  it("returns undefined for a category without an overlay", () => {
    expect(getCategoryEditorial("high-pressure-valves")).toBeUndefined();
    expect(getCategoryEditorial("union-adapters")).toBeUndefined();
  });

  it("each overlay has an SEO title, description and canonical URL", () => {
    for (const key of keys) {
      const e = CATEGORY_EDITORIAL[key];
      expect(e.seo?.title, `${key} seo.title`).toBeTruthy();
      expect(e.seo?.description, `${key} seo.description`).toBeTruthy();
      expect(e.canonical, `${key} canonical`).toMatch(
        /^https:\/\/www\.hiflux\.uk\.com\/products\//,
      );
    }
  });

  it("table blocks have every row matching the column count", () => {
    for (const key of keys) {
      for (const block of CATEGORY_EDITORIAL[key].below ?? []) {
        if (block.type === "table") {
          for (const row of block.rows) {
            expect(row, `${key} table row`).toHaveLength(block.columns.length);
          }
        }
      }
    }
  });

  it("above-grid CTAs and closing cta buttons all have hrefs", () => {
    for (const key of keys) {
      const e = CATEGORY_EDITORIAL[key];
      for (const cta of e.above?.ctas ?? []) {
        expect(cta.href, `${key} above cta`).toBeTruthy();
      }
      for (const block of e.below ?? []) {
        if (block.type === "cta") {
          for (const btn of block.buttons) {
            expect(btn.href, `${key} cta button`).toBeTruthy();
          }
        }
      }
    }
  });
});
