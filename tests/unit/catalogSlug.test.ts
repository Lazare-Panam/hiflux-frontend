import { describe, it, expect } from "vitest";
import { categorySlug } from "@/api/catalogSlug";

describe("categorySlug", () => {
  it("maps the 'regulators' alias to the canonical site slug", () => {
    expect(categorySlug("regulators")).toBe("high-pressure-regulators");
  });

  it("leaves the canonical slug unchanged (idempotent)", () => {
    expect(categorySlug("high-pressure-regulators")).toBe(
      "high-pressure-regulators",
    );
  });

  it("passes an unknown/other slug through unchanged", () => {
    expect(categorySlug("high-pressure-valves")).toBe("high-pressure-valves");
    expect(categorySlug("high-pressure-fittings")).toBe(
      "high-pressure-fittings",
    );
    expect(categorySlug("")).toBe("");
  });
});
