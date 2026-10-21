// Bridge: SQL configurator (keyed by integer categoryId) <-> the Mongo
// catalog/product slugs the rest of the site still uses for /products/.../variants
// and for routing. Interim during the Mongo->SQL migration; replace with a Slug
// column on the SQL Category (returned by the API) once more series are migrated.
//
// Keep this a plain module (no React/axios imports) so it can be imported from
// both client components and server components (e.g. the product-page redirect).
export interface SeriesBridge {
  categoryId: number;
  catalog: string; // Mongo catalogId, e.g. "high-pressure-valves"
}

export const SERIES_BRIDGE: Record<string, SeriesBridge> = {
  "ndl-ultra-100k": { categoryId: 1, catalog: "high-pressure-valves" },
  "chk-ultra-100k": { categoryId: 2, catalog: "high-pressure-valves" },
  "ball-med-20k": { categoryId: 3, catalog: "high-pressure-valves" },
};
