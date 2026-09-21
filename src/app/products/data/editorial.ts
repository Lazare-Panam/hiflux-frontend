// Frontend-only editorial overlay for product category pages.
//
// The catalog API (getCatalog) returns banner + product grid for these
// categories but leaves intro/keyFeatures/cta/seo null. This file supplies the
// long-form editorial content — an intro above the product grid and reference
// sections below it — keyed by catalog id, WITHOUT any backend change. Only
// categories present in CATEGORY_EDITORIAL get the overlay; all others render
// exactly as before.
//
// Copy is stored as backtick strings so inch marks (") and unicode (−, ×, °)
// never need escaping and never reach JSX as raw text.

const CONTACT = "/contact";
const CATALOG_PDF =
  "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";

export type CTA = { label: string; href: string; external?: boolean };

export type EditorialBlock =
  | { type: "prose"; heading?: string; paragraphs: string[] }
  | { type: "bullets"; heading?: string; paragraphs?: string[]; items: string[] }
  | {
      type: "table";
      heading?: string;
      paragraphs?: string[];
      columns: string[];
      rows: string[][];
      footnote?: string;
    }
  | { type: "links"; links: CTA[] }
  | { type: "cta"; heading: string; body: string; buttons: CTA[] };

export type CategoryEditorial = {
  seo?: { title: string; description: string };
  canonical?: string;
  above?: { paragraphs: string[]; ctas: CTA[] };
  below?: EditorialBlock[];
};

const REQUEST_QUOTE: CTA = { label: "Request a Quote", href: CONTACT };
const SPEAK_ENGINEER: CTA = { label: "Speak to an Engineer", href: CONTACT };
const DOWNLOAD_CATALOGUE: CTA = {
  label: "Download the Catalogue",
  href: CATALOG_PDF,
  external: true,
};

export const CATEGORY_EDITORIAL: Record<string, CategoryEditorial> = {
  "high-pressure-fittings": {
    seo: {
      title: "High Pressure Fittings UK | Cone & Thread to 150,000 psi",
      description:
        "Cone and thread fittings in 316 stainless, rated 10,000 to 150,000 psi. Elbow, tee and cross bodies with glands, collars and sleeves. UK stock.",
    },
    canonical: "https://www.hiflux.uk.com/products/high-pressure-fittings",
    above: {
      paragraphs: [
        `Cone and thread fittings in cold-formed stainless steel 316, rated from 10,000 psi to 150,000 psi, in elbow, tee and cross bodies with matched glands, collars and sleeves. Operating range −423°F (−252°C) to 1200°F (649°C).`,
      ],
      ctas: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
    below: [
      {
        type: "table",
        heading: "Pressure ratings and tube sizes",
        columns: ["Rating", "Tube sizes", "Connection system"],
        rows: [
          [`10,000 psi`, `1/2"`, `Gland and sleeve (24° cone)`],
          [`15,000 psi`, `1/8", 1/4", 3/8"`, `Gland and sleeve (24° cone)`],
          [
            `20,000 psi`,
            `1/4", 3/8", 9/16", 3/4", 1"`,
            `Gland, collar and nipple (60° cone)`,
          ],
          [`30,000 psi`, `1/8", 1"`, `Gland, collar and nipple (60° cone)`],
          [`60,000 psi`, `1/4", 3/8", 9/16"`, `Gland, collar and nipple (60° cone)`],
          [
            `100,000 psi`,
            `1/4", 3/8", 9/16"`,
            `Gland, collar and nipple (60° cone)`,
          ],
          [`150,000 psi`, `3/8"`, `Gland, collar and nipple (60° cone)`],
        ],
        footnote: `Metric gland threads (M16×1.5P, M20×1.5P, M26×1.5P) are available at 60,000 psi alongside the UNF standard.`,
      },
      {
        type: "prose",
        heading: "What makes up a fitting",
        paragraphs: [
          `A fitting is the body — elbow, tee or cross. The connection also needs an accessory set: a gland, plus a sleeve below 20,000 psi or a collar above it. Both are supplied as matched sets, and components do not cross the 20,000 psi split.`,
          `Above 20,000 psi the collar and nipple threads are left-hand while the gland threads into the body right-hand. Worth briefing anyone assembling these for the first time.`,
        ],
      },
      {
        type: "links",
        links: [
          {
            label: "View fitting accessories",
            href: "/products/high-pressure-fittings/acc-ultra-150k",
          },
        ],
      },
      {
        type: "prose",
        heading: "Vibration and pulsation",
        paragraphs: [
          `Anti-vibration fitting and accessory sets are available at 20,000 psi (1/4" to 1") and 60,000 psi (1/4" to 9/16"), adding a collet to the assembly. Part numbers carry an -AV suffix. Specify these downstream of pumps and compressors — and clamp the run as well.`,
        ],
      },
      {
        type: "cta",
        heading: "Send us your specification",
        body: `Working pressure, port direction, tube size and media. We will confirm the part number, accessories and tube preparation you need.`,
        buttons: [REQUEST_QUOTE, SPEAK_ENGINEER],
      },
    ],
  },

  "high-pressure-tubing": {
    seo: {
      title: "High Pressure Tubing & Nipples UK | Hiflux UK",
      description:
        "Stainless steel high-pressure tube, coned and threaded nipples and tube support for cone and thread systems to 100,000 psi. UK stock and support.",
    },
    canonical: "https://www.hiflux.uk.com/products/high-pressure-tubing",
    above: {
      paragraphs: [
        `Stainless steel high-pressure tube, pre-coned and threaded nipples, and tube support for cone and thread systems rated to 100,000 psi. Supplied from UK stock.`,
      ],
      ctas: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
    below: [
      {
        type: "bullets",
        heading: "Tube or nipple?",
        paragraphs: [
          `Both connect into the same fittings; the difference is who prepares the ends.`,
        ],
        items: [
          `Tube is supplied plain and coned and threaded on site using a HIFLUX tooling set. This gives you exact lengths and the ability to rework a rig, but requires the tool and someone trained to use it.`,
          `Nipples arrive already coned and threaded at both ends, ordered to the length you specify. No tooling needed, and the preparation is done to the manufacturer's standard — which removes the most common cause of joint failure.`,
        ],
      },
      {
        type: "prose",
        paragraphs: [
          `Most first-time buyers should start with nipples and add a tooling set once the system stabilises.`,
        ],
      },
      {
        type: "links",
        links: [
          {
            label: "View tooling sets",
            href: "/products/high-pressure-tubing/tool-coning",
          },
        ],
      },
      {
        type: "table",
        heading: "Minimum bend radius",
        columns: ["Tube size (OD × ID)", "Rating", "Minimum bend radius"],
        rows: [
          [`1/4" (6.35 × 2.77 mm)`, `20,000 psi`, `1.25" (31.8 mm)`],
          [`3/8" (9.53 × 5.16 mm)`, `20,000 psi`, `1.75" (44.5 mm)`],
          [`9/16" (14.29 × 7.92 mm)`, `20,000 psi`, `2.63" (66.8 mm)`],
          [`3/4" (19.05 × 11.13 mm)`, `20,000 psi`, `3.50" (88.9 mm)`],
          [`1" (25.4 × 14.27 mm)`, `20,000 psi`, `4.63" (117.6 mm)`],
          [`1" (25.4 × 11.13 mm)`, `30,000 psi`, `4.63" (117.6 mm)`],
          [`1/4" (6.35 × 2.11 mm)`, `60,000 psi`, `1.25" (31.8 mm)`],
          [`3/8" (9.53 × 3.18 mm)`, `60,000 psi`, `1.75" (44.5 mm)`],
          [`9/16" (14.29 × 4.78 mm)`, `60,000 psi`, `2.63" (66.8 mm)`],
        ],
        footnote: `Bending tighter than these figures work-hardens the tube at the point of highest stress. Where the route will not allow the radius, use a fitting rather than forcing the bend.`,
      },
      {
        type: "prose",
        heading: "Supporting the run",
        paragraphs: [
          `Small-bore tube under cycling or pulsating pressure fatigues at the thread root. Tube support products restrain the run; anti-vibration fitting sets address the joint itself. On a pump or compressor circuit, specify both.`,
        ],
      },
      {
        type: "cta",
        heading: "Send us your specification",
        body: `Working pressure, tube size, length and whether you want plain tube or prepared nipples.`,
        buttons: [REQUEST_QUOTE, SPEAK_ENGINEER],
      },
    ],
  },
};

export function getCategoryEditorial(id: string): CategoryEditorial | undefined {
  return CATEGORY_EDITORIAL[id];
}
