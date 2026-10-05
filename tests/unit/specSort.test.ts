import { describe, it, expect } from "vitest";
import { compareSpec, specNumber } from "@/app/products/[id]/[productId]/variants/components/specSort";

describe("specSort", () => {
  it("reads leading numbers, fractions and mixed fractions", () => {
    expect(specNumber("150,000 psi")).toBe(150000);
    expect(specNumber('9/16"')).toBeCloseTo(0.5625);
    expect(specNumber('1-1/4"')).toBe(1.25);
    expect(specNumber("229.20")).toBe(229.2);
    expect(specNumber("Elbow")).toBeNull();
  });

  it("orders pressure ratings numerically", () => {
    const v = ["15,000 psi", "100,000 psi", "10,000 psi", "150,000 psi"].sort(compareSpec);
    expect(v).toEqual(["10,000 psi", "15,000 psi", "100,000 psi", "150,000 psi"]);
  });

  it("orders tube sizes by value, not text", () => {
    const v = ['1/2"', '1"', '1/8"', '9/16"', '3/8"', '1/4"', '3/4"'].sort(compareSpec);
    expect(v).toEqual(['1/8"', '1/4"', '3/8"', '1/2"', '9/16"', '3/4"', '1"']);
  });

  it("falls back to natural text order for words", () => {
    expect(["Tee", "Cross", "Elbow"].sort(compareSpec)).toEqual(["Cross", "Elbow", "Tee"]);
  });
});
