// Bridge: Mongo product slug (used in URLs / the rest of the site) -> the SQL
// Category it maps to, by the Category's stable NAME (not its auto-increment id,
// which shifts with seed order). The numeric categoryId is resolved at runtime
// from GET /categories. Interim during the Mongo->SQL migration; replace with a
// Slug column on the SQL Category once more series are migrated.
//
// Keep this a plain module (no React/axios imports) so it can be imported from
// both client components and server components (e.g. the product-page redirect).
export interface SeriesBridge {
  name: string; // exact SQL Category.Name
  catalog: string; // Mongo catalogId, e.g. "high-pressure-valves"
}

export const SERIES_BRIDGE: Record<string, SeriesBridge> = {
  "ndl-ultra-100k": { name: "High Pressure Needle Valve - Ultra High Pressure", catalog: "high-pressure-valves" },
  "chk-ultra-100k": { name: "High Pressure Check Valve - Ultra High Pressure", catalog: "high-pressure-valves" },
  "ball-med-20k": { name: "High Pressure Ball Valve - Medium Pressure", catalog: "high-pressure-valves" },
  "aov-nc-60k": { name: "Air Operated Valve - Normal Close", catalog: "high-pressure-valves" },
  "saf-rel-factory-60k": { name: "High Pressure Relief Valve - Factory Set", catalog: "high-pressure-valves" },
  "spc-ctrl-75k": { name: "High Pressure Special Valves", catalog: "high-pressure-valves" },
  "fit-ultra-150k": { name: "High Pressure Fitting - Ultra High Pressure", catalog: "high-pressure-fittings" },
  "acc-ultra-150k": { name: "High Pressure Fitting Accessory - Ultra High Pressure", catalog: "high-pressure-fittings" },
  "mfb-high-60k": { name: "High Pressure Manifold Block - High Pressure", catalog: "high-pressure-fittings" },
  "cap-high-60k": { name: "High Pressure Tube Cap - High Pressure", catalog: "high-pressure-fittings" },
  "tube-ultra-100k": { name: "High Pressure Tube - Ultra Pressure", catalog: "high-pressure-tubing" },
  "nip-ultra-100k": { name: "High Pressure Nipple - Ultra High Pressure", catalog: "high-pressure-tubing" },
  "tool-coning": { name: "High Pressure Tooling Set - Coning Tool", catalog: "high-pressure-tubing" },
  "sup-3line": { name: "High Pressure Tube Support - 3 Line", catalog: "high-pressure-tubing" },
  "unn-ff-60k": { name: "High Pressure Union - Female to Female", catalog: "union-adapters" },
  "adp-mm-60k": { name: "High Pressure Adapter - Male to Male", catalog: "union-adapters" },
  "adp-mf-60k": { name: "High Pressure Adapter - Male to Female", catalog: "union-adapters" },
  "adp-bulkhead-60k": { name: "High Pressure Adapter - Bulkhead Union", catalog: "union-adapters" },
  "adp-lokf-f-20k": { name: "High Pressure Adapter - LOK(Female) to Female", catalog: "union-adapters" },
  "bpr-15000": { name: "BPR (Back Pressure Regulator)", catalog: "high-pressure-regulators" },
  "hpr-10000": { name: "HPR (High Pressure Regulator)", catalog: "high-pressure-regulators" },
  "abpr-10000": { name: "ABPR (Air Operating Back Pressure Regulator)", catalog: "high-pressure-regulators" },
  "lok-valves": { name: "Lok Valves", catalog: "lok-fittings-valves" },
  "lok-tube": { name: "LOK Tube", catalog: "lok-fittings-valves" },
  "lok-tube-fittings": { name: "Lok Tube Fittings", catalog: "lok-fittings-valves" },
  // "pressure-gauge": { name: "Pressure Gauge", catalog: "pressure-temp-flow" },
};
