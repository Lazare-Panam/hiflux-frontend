import type { Metadata } from "next";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { getCatalog } from "@/api/useProductCatalog";
import { CATEGORIES } from "./data/categories";
import { BLUE_BG, PRODUCT_STAGE } from "@/theme/brand";
import { getSeriesSummaries } from "./[id]/components/seriesSummary";

const TITLE = "High-Pressure Valves, Fittings, Tubing & Regulators | Hiflux UK";
const DESCRIPTION =
  "Browse HIFLUX high-pressure valves, fittings, tubing, unions, adapters and regulators by category. Certification copies on request; request a quote online.";
const URL = "https://www.hiflux.uk.com/products";

// Own canonical and social tags (previously inherited the homepage's).
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", siteName: "Hiflux UK", title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const EYEBROW = { letterSpacing: "0.18em", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase !important" } as const;

const FAQ = [
  { q: "Are the prices on the website final?", a: "Standard items are priced online in GBP. Larger quantities, projects and specials are quoted, and lead times are confirmed with your quote." },
  { q: "Can I order online or do I need a quote?", a: "Both work. Add priced models to the cart and check out, or send a request for quote with part numbers, quantities or a bill of materials." },
  { q: "Do the parts come with certificates?", a: "Manufacturer material certification traceable to the batch is available with your order. Tell us which documents you need when you order." },
  { q: "What if I can't find the part number I need?", a: "Use the product index to search every model, or send us the pressure, tube size and connection and we will find the matching HIFLUX part." },
  { q: "Are other materials available?", a: "316 stainless steel is standard. Hastelloy, Inconel 600/625/825, Nickel 200 and titanium are available on request for many series." },
];

// Series lists come from the product API; cache the page for an hour (ISR).
export const revalidate = 3600;

// Series quick-link label: its tag ("Needle Valve"), or its own name when
// several series share a tag (the four "Adapter" series).
function chipLabel(p: { name: string; tag?: string }, all: { tag?: string }[]) {
  const shared = !p.tag || all.filter((x) => x.tag === p.tag).length > 1;
  return shared ? p.name.replace(/^High Pressure\s+/i, "") : p.tag!;
}

export default async function ProductsPage() {
  const groups = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const catalog = await getCatalog(cat.id).catch(() => null);
      const all = catalog?.products ?? [];
      // Hide series whose data isn't in the API yet (new categories fill in gradually).
      const summaries = await getSeriesSummaries(all);
      return { ...cat, products: all.filter((p) => summaries[p.id]?.hasDetail), models: summaries };
    }),
  );

  return (
    <Box sx={{ bgcolor: "#fff", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Hero (original photo kept) */}
      <Box
        component="section"
        sx={{
          color: "#fff",
          pt: { xs: 6, md: 9 },
          pb: { xs: 12, md: 15 },
          background: `linear-gradient(180deg, rgba(0,58,110,0.6) 0%, rgba(0,58,110,0.92) 100%), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80") center / cover, #00539B`,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
          <PageBreadcrumbs items={[{ label: "Products" }]} />
          <Typography sx={{ ...EYEBROW, color: "rgba(255,255,255,0.75)" }}>Our range</Typography>
          <Typography component="h1" sx={{ mt: 1.25, fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            HIFLUX High-Pressure Products
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, mt: 2, maxWidth: 760 }}>
            Valves, fittings, tubing, unions and adapters, regulators, LOK fittings and valves, and pressure,
            temperature and flow instruments, rated up to 150,000 psi depending on the series. Genuine HIFLUX product,
            traceable to the manufacturer, with certification copies on request.
          </Typography>
          <Box sx={{ mt: 3, display: { xs: "grid", sm: "flex" }, gridTemplateColumns: "1fr 1fr", gap: { xs: 2, md: 4 }, flexWrap: "wrap" }}>
            {[
              [String(groups.length), "Categories"],
              [String(groups.reduce((n, g) => n + g.products.length, 0)), "Series"],
              ["150,000 psi", "Highest rating"],
              ["316", "Stainless as standard"],
            ].map(([v, l]) => (
              <Box key={l}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.6rem" }, lineHeight: 1.1 }}>{v}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>{l}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Category tiles overlapping the hero */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, mt: { xs: -9, md: -11 }, position: "relative", zIndex: 1 }}>
        {/* Phones: compact 2-column tiles, all visible; desktop: 7 across */}
        <Box sx={{ display: "grid", "& > *:last-child:nth-of-type(odd)": { gridColumn: { xs: "1 / -1", md: "auto" } }, gap: { xs: 1, md: 1.5 }, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(7, 1fr)" } }}>
          {groups.map((g) => (
            <Box
              key={g.id}
              component="a"
              href={`#${g.id}`}
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: "center",
                textAlign: { xs: "left", md: "center" },
                gap: { xs: 1.25, md: 0.75 },
                p: { xs: 1, md: 1.5 },
                pb: { xs: 1, md: 1.75 },
                minWidth: 0,
                bgcolor: "#fff",
                borderRadius: "16px",
                border: "1px solid rgba(15,40,70,0.08)",
                boxShadow: "0 14px 34px rgba(0,30,70,0.12)",
                textDecoration: "none",
                color: "text.primary",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                "&:hover": { transform: "translateY(-3px)", borderColor: "rgba(0,114,188,0.35)" },
              }}
            >
              <Box sx={{ width: { xs: 48, md: "100%" }, height: { xs: 48, md: 74 }, flexShrink: 0, borderRadius: "10px", background: PRODUCT_STAGE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={g.image} alt="" sx={{ maxWidth: "70%", maxHeight: 60, objectFit: "contain", mixBlendMode: "multiply" }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.8rem", md: "0.84rem" }, lineHeight: 1.25 }}>{g.label}</Typography>
                {g.facts?.[1] && <Typography sx={{ mt: { md: 0.5 }, color: "primary.main", fontSize: "0.72rem", fontWeight: 700 }}>{g.facts[1]}</Typography>}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* One section per category, photo alternating sides */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 6, md: 9 }, display: "grid", gap: { xs: 8, md: 10 } }}>
        {groups.map((g, i) => {
          const flip = i % 2 === 1;
          const totalModels = g.products.reduce((n, p) => n + (g.models[p.id]?.models ?? 0), 0);
          const prices = g.products.map((p) => g.models[p.id]?.minPrice).filter((x): x is number => !!x);
          return (
            <Box
              key={g.id}
              id={g.id}
              component="section"
              sx={{ scrollMarginTop: 110, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" }, gap: { xs: 3.5, md: 7 }, alignItems: "center" }}
            >
              {/* Product visual */}
              <Box sx={{ order: { md: flip ? 2 : 1 } }}>
                <Link href={g.href} aria-label={g.label} style={{ display: "block" }}>
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      borderRadius: "24px",
                      background: PRODUCT_STAGE,
                      border: "1px solid rgba(15,40,70,0.06)",
                      boxShadow: "0 24px 50px rgba(0,30,70,0.12)",
                      overflow: "hidden",
                      "&:hover img": { transform: "scale(1.06) rotate(-2deg)" },
                    }}
                  >
                    <Box component="img" src={g.image} alt={g.label} loading="lazy" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: { xs: "36px", md: "56px" }, mixBlendMode: "multiply", transition: "transform 0.45s ease" }} />
                    <Box sx={{ position: "absolute", left: 16, bottom: 16, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                      {[`${g.products.length} series`, g.facts?.[1], totalModels ? `${totalModels.toLocaleString("en-GB")} models` : null]
                        .filter(Boolean)
                        .map((f) => (
                          <Box key={f!} component="span" sx={{ px: 1.25, py: 0.5, borderRadius: "999px", bgcolor: "#fff", color: "primary.dark", fontSize: "0.78rem", fontWeight: 800, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}>
                            {f}
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </Link>
              </Box>

              {/* Copy and series list */}
              <Box sx={{ order: { md: flip ? 1 : 2 } }}>
                <Typography sx={{ ...EYEBROW, color: "primary.main" }}>{String(i + 1).padStart(2, "0")} · Category</Typography>
                <Typography component="h2" sx={{ mt: 0.75, fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.1rem" }, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                  <Link href={g.href} style={{ color: "inherit", textDecoration: "none" }}>
                    {g.label}
                  </Link>
                </Typography>
                <Typography sx={{ mt: 1.5, color: "text.secondary", fontSize: "1rem", lineHeight: 1.75 }}>{g.description}</Typography>

                {g.products.length > 0 && (
                  <Box sx={{ mt: 2.75 }}>
                    <Typography sx={{ ...EYEBROW, color: "text.secondary", mb: 1 }}>Series</Typography>
                    <Box sx={{ borderTop: "1px solid rgba(15,40,70,0.1)" }}>
                      {g.products.map((p) => {
                        const sm = g.models[p.id];
                        return (
                          <Link key={p.id} href={`/products/${g.id}/${p.id}`} style={{ textDecoration: "none" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                py: 1.25,
                                px: 1,
                                borderBottom: "1px solid rgba(15,40,70,0.1)",
                                color: "text.primary",
                                transition: "background-color 0.2s ease",
                                "&:hover": { bgcolor: "#f3f6fa" },
                                "&:hover .go": { transform: "translateX(3px)", color: "primary.main" },
                              }}
                            >
                              <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { sm: "center" }, gap: { xs: 0.25, sm: 2 } }}>
                              <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "0.95rem" }}>{chipLabel(p, g.products)}</Typography>
                              {sm && sm.models > 0 && (
                                <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                                  {sm.models} {sm.models === 1 ? "model" : "models"}{sm.minPrice ? ` · from £${sm.minPrice.toFixed(2)}` : ""}
                                </Typography>
                              )}
                              </Box>
                              <Box component="span" className="go" aria-hidden sx={{ color: "text.secondary", transition: "all 0.2s ease" }}>
                                →
                              </Box>
                            </Box>
                          </Link>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                <Box sx={{ mt: 2.75, display: "flex", gap: 1.25, flexWrap: "wrap", alignItems: "center" }}>
                  <Link href={g.href} style={{ textDecoration: "none" }}>
                    <Box component="span" sx={{ display: "inline-flex", px: 2.75, py: 1.2, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontWeight: 700, fontSize: "0.92rem", "&:hover": { bgcolor: "primary.dark" } }}>
                      View {g.label} →
                    </Box>
                  </Link>
                  {prices.length > 0 && (
                    <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>Prices online from £{Math.min(...prices).toFixed(2)}</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Help band */}
      <Box component="section" sx={{ background: BLUE_BG, color: "#fff", py: { xs: 6, md: 8 } }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
          <Box>
            <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.7rem", md: "2.3rem" }, lineHeight: 1.15 }}>
              Not sure which series you need?
            </Typography>
            <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.7 }}>
              Looking for a specific part number? Use the{" "}
              <Link href="/product-index" style={{ color: "#fff", fontWeight: 700 }}>
                product index
              </Link>
              . Choosing by duty? Start from{" "}
              <Link href="/applications" style={{ color: "#fff", fontWeight: 700 }}>
                applications
              </Link>
              . Or send us the details and we will reply with part numbers and a price.
            </Typography>
            <Box sx={{ mt: 3, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Box component="span" sx={{ display: "inline-flex", px: 3, py: 1.3, borderRadius: "999px", bgcolor: "#fff", color: "#00539B", fontWeight: 700 }}>
                  Request a Quote
                </Box>
              </Link>
              <Box
                component="a"
                href="https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "inline-flex", px: 3, py: 1.3, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.6)", color: "#fff", fontWeight: 700, textDecoration: "none" }}
              >
                Download the catalogue
              </Box>
            </Box>
          </Box>
          <Box component="ol" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: 1 }}>
            {["Working pressure and temperature", "Tube size and connection type", "Media (gas or liquid, and what it is)", "Quantity and delivery location", "Certificates and documents you need"].map((t, n) => (
              <Box key={t} component="li" sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.25, borderRadius: "12px", bgcolor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)" }}>
                <Box component="span" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.55)", minWidth: 22 }}>
                  {String(n + 1).padStart(2, "0")}
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{t}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ bgcolor: "#f3f6fa", py: { xs: 6, md: 9 } }}>
        <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 3 } }}>
          <Typography sx={{ ...EYEBROW, color: "primary.main", textAlign: "center" }}>FAQ</Typography>
          <Typography component="h2" sx={{ mt: 1, mb: 4, textAlign: "center", fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.1rem" }, lineHeight: 1.2 }}>
            Buying HIFLUX parts from Hiflux UK
          </Typography>
          <Box sx={{ display: "grid", gap: 1.25 }}>
            {FAQ.map((f) => (
              <Box
                key={f.q}
                component="details"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "14px",
                  border: "1px solid rgba(15,40,70,0.08)",
                  "& > summary": { listStyle: "none", cursor: "pointer", px: 2.5, py: 2, fontWeight: 700, fontSize: "1rem", display: "flex", justifyContent: "space-between", gap: 2 },
                  "& > summary::-webkit-details-marker": { display: "none" },
                  "& > summary::after": { content: '"+"', color: "primary.main", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1 },
                  "&[open] > summary::after": { content: '"–"' },
                  "&[open]": { borderColor: "rgba(0,114,188,0.35)" },
                }}
              >
                <Box component="summary">{f.q}</Box>
                <Typography sx={{ px: 2.5, pb: 2.25, color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.75 }}>{f.a}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
