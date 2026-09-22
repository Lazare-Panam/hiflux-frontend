import { describe, it, expect } from "vitest";
import { APPLICATIONS, getApplication } from "@/app/applications/data";

describe("applications data", () => {
  it("defines five application pages", () => {
    expect(APPLICATIONS).toHaveLength(5);
  });

  it("getApplication returns the matching entry by slug", () => {
    expect(getApplication("hydrogen-refuelling")?.h1).toBe("Hydrogen Refuelling");
    expect(getApplication("power-generation")?.h1).toBe("Power Generation");
  });

  it("getApplication returns undefined for an unknown slug", () => {
    expect(getApplication("does-not-exist")).toBeUndefined();
  });

  it("has unique slugs", () => {
    const slugs = APPLICATIONS.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every entry carries the required metadata and content", () => {
    for (const a of APPLICATIONS) {
      expect(a.slug, "slug").toBeTruthy();
      expect(a.title.length, `${a.slug} title`).toBeGreaterThan(0);
      expect(a.description.length, `${a.slug} description`).toBeGreaterThan(0);
      expect(a.h1.length, `${a.slug} h1`).toBeGreaterThan(0);
      expect(a.intro.length, `${a.slug} intro`).toBeGreaterThan(0);
      expect(a.blocks.length, `${a.slug} blocks`).toBeGreaterThan(0);
      expect(a.heroCtas.length, `${a.slug} heroCtas`).toBeGreaterThan(0);
      expect(a.closing.buttons.length, `${a.slug} closing`).toBeGreaterThan(0);
    }
  });

  it("table blocks have every row matching the column count", () => {
    for (const a of APPLICATIONS) {
      for (const block of a.blocks) {
        if (block.type === "table") {
          for (const row of block.rows) {
            expect(row, `${a.slug} table row`).toHaveLength(block.columns.length);
          }
        }
      }
    }
  });

  it("every hero and closing CTA has a non-empty href", () => {
    for (const a of APPLICATIONS) {
      for (const cta of [...a.heroCtas, ...a.closing.buttons]) {
        expect(cta.href, `${a.slug} cta ${cta.label}`).toBeTruthy();
      }
    }
  });
});
