// The product-detail API returns `catalogId: "regulators"`, but every route,
// nav link, footer entry, sitemap URL and category page uses
// "high-pressure-regulators". Emitting both spellings produces duplicate
// title/content URLs (flagged by SE Ranking), so normalize any known alias to
// the canonical slug used across the site.
const CATALOG_SLUG_ALIASES: Record<string, string> = {
  regulators: "high-pressure-regulators",
};

/** Canonical URL category slug for a given API catalogId (or URL segment). */
export function categorySlug(catalogId: string): string {
  return CATALOG_SLUG_ALIASES[catalogId] ?? catalogId;
}
