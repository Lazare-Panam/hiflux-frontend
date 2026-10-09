import { getProductDetail } from "@/api/useProductDetail";
import { getProductVariants, type ProductVariant } from "@/api/useProductVariants";
import type { ProductItem } from "@/api/useProductCatalog";
import { compareSpec, specNumber } from "../[productId]/variants/components/specSort";

// Builds the spec rows shown on each series card of a category page
// ("Pressure 10,000 – 150,000 psi", "Tube size 1/8" – 1"", ...). Ranges come
// from the series' models where they exist, so the card matches the models
// table; the series detail record fills in connection, material and the rest.

export type SeriesSummary = {
  id: string;
  rows: [string, string][];
  models: number;
  maxPsi: number | null;
  minPrice?: number | null;
  /** False when the series has no detail record yet (its page would 404). */
  hasDetail: boolean;
};

const fmtPsi = (n: number) => `${n.toLocaleString("en-GB")} psi`;

function psiOf(value: string | undefined): number | null {
  if (!value || !/psi/i.test(value) || /^\D/.test(value.trim())) return null;
  return specNumber(value);
}

function range(values: string[], fmt: (v: string) => string): string | null {
  const uniq = [...new Set(values.filter(Boolean))].sort(compareSpec);
  if (!uniq.length) return null;
  const lo = fmt(uniq[0]);
  const hi = fmt(uniq[uniq.length - 1]);
  return lo === hi ? lo : `${lo} – ${hi}`;
}

const normSize = (s: string) => s.replace(/\s*inch(es)?$/i, '"').trim();

// "~100,000 psi" -> "Up to 100,000 psi"; "1/4\" ~ 9/16\"" -> "1/4\" – 9/16\"".
const tidy = (s: string) =>
  s
    .replace(/^~\s*/, "Up to ")
    .replace(/\s*~\s*/g, " – ")
    .replace(/\s*\(other materials[^)]*\)/i, "")
    .replace(/(\d)psi/gi, "$1 psi")
    // Short card/strip form: first clause only, no asides. "Up to 6,000 psi
    // (413 bar), series dependent" -> "Up to 6,000 psi". Full text stays in
    // the specifications table.
    .split(";")[0]
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/,\s*series dependent$/i, "")
    .trim();

const MATERIAL_KEYS = ["Body Material", "Material", "Construction"];
const SKIP_EXTRA = new Set(["Pressure Rating", "Connection Type", ...MATERIAL_KEYS, "Sizes Available", "OD Range", "Compatible OD Range"]);

export async function summarise(product: Pick<ProductItem, "id">): Promise<SeriesSummary> {
  const [detail, series] = await Promise.all([
    getProductDetail(product.id).catch(() => null),
    getProductVariants(product.id).catch(() => null),
  ]);
  const variants: ProductVariant[] = series?.variants ?? [];
  const specs = detail?.specs ?? {};
  const rows: [string, string][] = [];

  const psis = variants.map((v) => psiOf(v.specs["Pressure Rating"])).filter((n): n is number => n !== null);
  const maxPsi = psis.length ? Math.max(...psis) : null;
  if (psis.length) {
    const lo = Math.min(...psis);
    rows.push(["Pressure", lo === maxPsi ? fmtPsi(lo) : `${fmtPsi(lo).replace(" psi", "")} – ${fmtPsi(maxPsi!)}`]);
  } else {
    const p = specs["Pressure Rating"] ?? specs["Max Pressure"] ?? specs["Inlet Pressure Options"];
    if (p && !/->/.test(p)) rows.push(["Pressure", tidy(p)]);
  }

  const sizes = variants.map((v) => v.specs["Tube Size"] ?? v.specs["LOK Tube Size"]).filter(Boolean).map(normSize);
  const sizeRange = range(sizes, (v) => v);
  const sizeSpec = specs["Sizes Available"] ?? specs["OD Range"] ?? specs["Compatible OD Range"];
  if (sizeRange) rows.push(["Tube size", sizeRange]);
  else if (sizeSpec) rows.push(["Tube size", tidy(sizeSpec)]);

  if (specs["Connection Type"]) rows.push(["Connection", tidy(specs["Connection Type"])]);
  const materialKey = MATERIAL_KEYS.find((k) => specs[k]);
  if (materialKey) rows.push(["Material", tidy(specs[materialKey])]);

  // Short series (lubricant, clamps) have few of the above; top up with
  // whatever else the detail record has.
  for (const [k, v] of Object.entries(specs)) {
    if (rows.length >= 4) break;
    if (!SKIP_EXTRA.has(k) && v.length <= 40) rows.push([k, tidy(v)]);
  }

  const prices = variants.map((v) => Number(v.specs["Price"])).filter((n) => Number.isFinite(n) && n > 0);
  if (prices.length) rows.push(["Price", `From £${Math.min(...prices).toFixed(2)}`]);

  return { id: product.id, rows: rows.slice(0, 5), models: variants.length, maxPsi, minPrice: prices.length ? Math.min(...prices) : null, hasDetail: !!detail };
}

/** Summaries for every series in a category, fetched in parallel. A failed
 *  fetch degrades to an empty summary rather than breaking the page. */
export async function getSeriesSummaries(products: ProductItem[]): Promise<Record<string, SeriesSummary>> {
  const all = await Promise.all(products.map((p) => summarise(p).catch(() => ({ id: p.id, rows: [], models: 0, maxPsi: null, hasDetail: false }))));
  return Object.fromEntries(all.map((s) => [s.id, s]));
}
