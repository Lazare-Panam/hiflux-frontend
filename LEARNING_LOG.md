# Learning Log

## Confusion Log
- [ ] 2026-09-16 — "you just need to add a link right? what is the problem then?" — the fix *is* adding a real `<a href>`, but the variants table paginates client-side (25 rows in the DOM at a time), so a naive row-link only makes the visible 25 crawlable; the other ~35 SKUs aren't in the HTML at all until "next page" is clicked — `VariantsTable.tsx`

## Concepts To Learn Next
- [ ] 2026-09-16 — Crawlable links vs. JS navigation (Google Search Central: "Make your links crawlable") — the root cause here was navigation via `router.push()` in an `onClick`, which crawlers can't follow; only a real `<a href>` counts as an inbound link. Read: developers.google.com/search/docs/crawling-indexing/links-crawlable
- [ ] 2026-09-16 — Hub-and-spoke internal linking / HTML index pages — the About-page product index is a "hub" that links to series "spokes", which link to SKUs. This is how sites distribute crawl budget and link equity to deep pages and avoid orphans. Search: "hub and spoke internal linking site architecture SEO"
- [ ] 2026-09-16 — Next.js Metadata API resolution — `openGraph`/`twitter` are shallow-merged per segment (a child that sets one REPLACES the parent's whole object; a child that omits it INHERITS the parent's verbatim, incl. its title). Verified gotcha: within one metadata object, Next auto-fills `twitter:title/description/image` from `openGraph` — so a root `twitter: { card }` still emits a full card. `metadataBase` resolves relative/blob image URLs to absolute https://. Read: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md (Inheriting/Overwriting fields)
