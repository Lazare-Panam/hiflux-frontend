// Centralised Schema.org / JSON-LD builders.
//
// Why this file exists: the same Organization, brand and product facts used to
// be copy-pasted into six page components and had already drifted (brand
// "Hiflux" vs org "Hiflux UK", a duplicated logo URL, three different
// alternateName lists). Centralising them keeps every page's structured data
// consistent and lets pages reference one shared entity by @id.
//
// Anti-cannibalisation model: the Organization and WebSite nodes carry stable
// @ids (emitted once in layout.tsx, present on every page). Products reference
// that one Organization as their `seller`/`publisher`/`author`, and SKU pages
// declare `isVariantOf` the parent series ProductGroup — so search engines treat
// the series page as the canonical hub and the SKU pages as its variants rather
// than as separate pages competing for the same term.

export const SITE_URL = "https://www.hiflux.uk.com";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const LOGO =
  "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png";

/** HIFLUX is the manufacturer brand; Hiflux UK (the Organization) is the seller. */
const BRAND = { "@type": "Brand", name: "HIFLUX" } as const;
/** Reference to the single Organization node emitted by layout.tsx. */
const ORG_REF = { "@id": ORG_ID } as const;
/** The products' actual maker (the parent) — distinct from the UK seller. */
const MANUFACTURER = {
  "@type": "Organization",
  name: "Hiflux Co., Ltd",
  url: "https://hiflux.com",
} as const;

// Rolling price validity. Google treats `priceValidUntil` as a recommended
// field on offers; a quote/price generally holds for the current pricing year,
// so we default to the end of next year. Computed once at module load (per
// build / server start), which is fine under the hourly ISR revalidation.
const PRICE_VALID_UNTIL = `${new Date().getFullYear() + 1}-12-31`;

// JSON.stringify drops keys whose value is `undefined`, so builders can set a
// field to `undefined` to omit it rather than conditionally spreading.
export type JsonLd = Record<string, unknown>;

/**
 * Serialise for `dangerouslySetInnerHTML`. `JSON.stringify` does NOT escape
 * `<`, so a spec value or product name containing `</script>` would break out
 * of the <script> tag (stored XSS). Per the Next.js JSON-LD guide we replace
 * `<` with its unicode escape. Always use this instead of bare JSON.stringify.
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");

// --- Site-wide entity graph (Organization + WebSite) ------------------------

export const organizationNode: JsonLd = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Hiflux UK",
  legalName: "Hiflux Hydrogen Ltd",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO },
  image: LOGO,
  description:
    "Hiflux UK is an authorised UK & EU distributor of high-pressure valves, fittings, tubing and hydrogen-ready flow-control components rated up to 150,000 psi for industrial, energy and research applications.",
  email: "sales@hiflux.uk.com",
  telephone: "+44 7369 243459",
  // Site-wide contact signal (the contact page references this same node by @id).
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "sales@hiflux.uk.com",
    telephone: "+44 7369 243459",
    areaServed: ["GB", "EU"],
    availableLanguage: "English",
  },
  vatID: "GB452408800",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "UK Companies House number",
    value: "14976525",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "St. Edburgs Hall, Priory Rd",
    addressLocality: "Bicester",
    postalCode: "OX26 6BL",
    addressCountry: "GB",
  },
  areaServed: ["GB", "EU"],
  // Searchers also type "hi flux" / "HiFlux" (Sept 2026 GSC).
  alternateName: ["Hiflux", "HiFlux UK", "Hi Flux UK", "hiflux.uk.com"],
  // sameAs = authoritative pages that prove this entity's identity. Add the
  // official LinkedIn / other verified social profiles here as they are
  // confirmed — do not guess URLs, a wrong sameAs weakens entity matching.
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/14976525",
  ],
  memberOf: {
    "@type": "Organization",
    name: "Hydrogen Energy Association",
    url: "https://ukhea.co.uk/",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Hiflux Co., Ltd",
    url: "https://hiflux.com",
  },
};

export const websiteNode: JsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Hiflux UK",
  alternateName: ["Hiflux", "HiFlux UK", "hiflux.uk.com"],
  url: `${SITE_URL}/`,
  publisher: ORG_REF,
};

/** The site-wide graph, emitted once in layout.tsx (present on every page). */
export const siteGraph = (): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [organizationNode, websiteNode],
});

// --- Shared helpers ---------------------------------------------------------

const specsToProps = (specs: Record<string, string> | undefined | null) =>
  Object.entries(specs ?? {}).map(([name, value]) => ({
    "@type": "PropertyValue",
    name,
    value,
  }));

const round2 = (n: number) => Number(n.toFixed(2));

// --- Builders ---------------------------------------------------------------

/** BreadcrumbList. `url` omitted on the final (current) crumb. */
export function breadcrumbLd(
  crumbs: { name: string; url?: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  };
}

/**
 * A product series hub page. Emitted as a ProductGroup (a subclass of Product)
 * so its SKU pages can declare themselves variants of it. When the series has
 * priced models we attach an AggregateOffer (lowPrice) — a Product/ProductGroup
 * with no offers/review/rating is ineligible for merchant rich results and is
 * flagged "Missing field offers" in Search Console.
 */
export function seriesProductGroupLd(opts: {
  name: string;
  description?: string;
  image?: string;
  category?: string;
  specs?: Record<string, string>;
  /** Canonical series URL, no trailing slash, e.g. .../products/<cat>/<series>. */
  seriesUrl: string;
  /** Stable series identifier (the series/productId). */
  seriesId: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  models?: number;
}): JsonLd {
  const props = specsToProps(opts.specs);
  const hasPrice = typeof opts.minPrice === "number" && opts.minPrice > 0;
  const high =
    typeof opts.maxPrice === "number" && opts.maxPrice > 0
      ? opts.maxPrice
      : opts.minPrice;
  return {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "@id": `${opts.seriesUrl}#productgroup`,
    productGroupID: opts.seriesId,
    name: opts.name,
    description: opts.description,
    url: opts.seriesUrl,
    image: opts.image ? [opts.image] : undefined,
    category: opts.category,
    brand: BRAND,
    manufacturer: MANUFACTURER,
    additionalProperty: props.length ? props : undefined,
    offers: hasPrice
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "GBP",
          lowPrice: round2(opts.minPrice as number),
          highPrice: round2(high as number),
          offerCount: opts.models || undefined,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          priceValidUntil: PRICE_VALID_UNTIL,
          seller: ORG_REF,
          url: opts.seriesUrl,
        }
      : undefined,
  };
}

/**
 * A single SKU/model page. Declares `isVariantOf` + `inProductGroupWithID` so
 * search engines group it under its parent series (the ProductGroup) instead of
 * ranking it against the series and its siblings. A single Offer is attached
 * when the model has a price.
 */
export function variantProductLd(opts: {
  name: string;
  sku: string;
  image?: string;
  specs: [string, string][];
  /** Canonical SKU URL (must match the page's rel=canonical). */
  skuUrl: string;
  /** Canonical parent series URL (same value the series page uses). */
  seriesUrl: string;
  seriesId: string;
  seriesName: string;
  price?: number | null;
}): JsonLd {
  const hasPrice =
    typeof opts.price === "number" &&
    Number.isFinite(opts.price) &&
    opts.price > 0;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${opts.skuUrl}#product`,
    name: opts.name,
    sku: opts.sku,
    mpn: opts.sku,
    url: opts.skuUrl,
    image: opts.image ? [opts.image] : undefined,
    brand: BRAND,
    manufacturer: MANUFACTURER,
    inProductGroupWithID: opts.seriesId,
    isVariantOf: {
      "@type": "ProductGroup",
      "@id": `${opts.seriesUrl}#productgroup`,
      name: opts.seriesName,
      productGroupID: opts.seriesId,
    },
    additionalProperty: opts.specs.map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
    offers: hasPrice
      ? {
          "@type": "Offer",
          price: round2(opts.price as number),
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          priceValidUntil: PRICE_VALID_UNTIL,
          seller: ORG_REF,
          url: opts.skuUrl,
        }
      : undefined,
  };
}

/** News/blog article. Author & publisher reference the shared Organization. */
export function articleLd(opts: {
  headline: string;
  description?: string;
  image?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLd {
  const modified = opts.dateModified ?? opts.datePublished;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    inLanguage: "en-GB",
    datePublished: opts.datePublished,
    dateModified: modified,
    author: ORG_REF,
    publisher: ORG_REF,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  };
}

/**
 * Contact page; its mainEntity references the shared Organization (whose
 * contactPoint is defined once on that node, so it is not repeated here).
 */
export function contactPageLd(opts: { name: string; url: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: opts.name,
    url: opts.url,
    mainEntity: ORG_REF,
  };
}
