// Spec values are strings like "150,000 psi", "9/16\"", "1-1/4\"" or "229.20".
// Plain string comparison orders "100,000 psi" before "15,000 psi" and
// "1/2\"" before "1/8\"", so compare on the leading number (fractions
// included) when both values have one, falling back to natural text order.

/** Leading numeric value of a spec string, or null if it doesn't start with one. */
export function specNumber(value: string): number | null {
  const v = value.replace(/[£$,]/g, "").trim();
  const mixed = v.match(/^(\d+)[\s-]+(\d+)\/(\d+)/); // 1-1/4
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = v.match(/^(\d+)\/(\d+)/); // 9/16
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const num = v.match(/^\d+(?:\.\d+)?/); // 150000, 229.20
  return num ? Number(num[0]) : null;
}

export function compareSpec(a: string, b: string): number {
  const an = specNumber(a);
  const bn = specNumber(b);
  if (an !== null && bn !== null && an !== bn) return an - bn;
  return a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });
}
