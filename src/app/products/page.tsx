import type { Metadata } from "next";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import CtaBanner from "@/app/Common/CtaBanner";
import { getCatalog, type ProductItem } from "@/api/useProductCatalog";
import { CATEGORIES } from "./data/categories";
import { getSeriesSummaries, type SeriesSummary } from "./[id]/components/seriesSummary";

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

// Series lists come from the product API; cache the page for an hour (ISR).
export const revalidate = 3600;

const linkRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  py: 1.1,
  borderBottom: "1px solid rgba(15,40,70,0.1)",
  color: "text.primary",
  fontWeight: 800,
  fontSize: "0.78rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  "&:hover": { color: "primary.main" },
  "&:hover .plus": { bgcolor: "primary.dark" },
} as const;

function LinkRow({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Box component="span" sx={linkRowSx}>
        <Box
          component="span"
          className="plus"
          aria-hidden
          sx={{ width: 20, height: 20, borderRadius: "4px", bgcolor: "primary.main", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 700, lineHeight: 1, transition: "background-color 0.2s ease" }}
        >
          +
        </Box>
        {label}
      </Box>
    </Link>
  );
}

function SeriesItem({ product, categoryId, summary }: { product: ProductItem; categoryId: string; summary?: SeriesSummary }) {
  const href = `/products/${categoryId}/${product.id}`;
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 110px", sm: "1fr 190px" }, gap: { xs: 2, sm: 3 }, alignItems: "center" }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.25rem" }, lineHeight: 1.3, textTransform: "none" }}>
          <Link href={href} style={{ color: "#0072BC", textDecoration: "none" }}>
            {product.name}
          </Link>
        </Typography>
        {product.description && (
          <Typography sx={{ mt: 1, color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.65, textTransform: "none" }}>
            {product.description}
          </Typography>
        )}
        <Box sx={{ mt: 1.5 }}>
          <LinkRow href={href} label="View details" />
          {(summary?.models ?? 0) > 0 && <LinkRow href={`${href}/variants`} label="View models & prices" />}
        </Box>
      </Box>
      <Link href={href} aria-label={product.name} style={{ display: "block" }}>
        <Box
          component="img"
          src={product.thumbnailImage}
          alt={product.name}
          loading="lazy"
          sx={{ display: "block", width: "100%", aspectRatio: "1 / 1", objectFit: "contain", transition: "transform 0.35s ease", "&:hover": { transform: "scale(1.05)" } }}
        />
      </Link>
    </Box>
  );
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
    <Box sx={{ bgcolor: "#fff" }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          color: "#fff",
          py: { xs: 6, md: 9 },
          // Original hero photo, kept by request, under the same blue tint as before.
          background: `linear-gradient(180deg, rgba(0,58,110,0.55) 0%, rgba(0,58,110,0.92) 100%), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80") center / cover, #00539B`,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
          <PageBreadcrumbs items={[{ label: "Products" }]} />
          <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", mb: 1 }}>
            Our range
          </Typography>
          <Typography component="h1" sx={{ fontSize: { xs: "1.9rem", md: "2.7rem" }, fontWeight: 800, lineHeight: 1.1 }}>
            HIFLUX high-pressure products
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.7, mt: 1.5, maxWidth: 760, textTransform: "none" }}>
            Valves, fittings, tubing, unions and adapters, and regulators, rated from 3,000 psi up to 150,000 psi
            depending on the series. Genuine HIFLUX product, traceable to the manufacturer, with certification copies on
            request.
          </Typography>
          {/* Jump links to each category */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
            {groups.map((g) => (
              <Box
                key={g.id}
                component="a"
                href={`#${g.id}`}
                sx={{ px: 1.75, py: 0.75, borderRadius: "999px", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.12)" } }}
              >
                {g.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>


      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, pt: { xs: 4, md: 5 }, pb: { xs: 1, md: 2 } }}>
        <Typography sx={{ color: "text.secondary", fontSize: "0.98rem", lineHeight: 1.75, maxWidth: 820, mb: { xs: 2, md: 3 }, textTransform: "none" }}>
          Looking for a specific part number? Use the{" "}
          <Link href="/product-index" style={{ color: "#0072BC", fontWeight: 600 }}>
            product index
          </Link>
          . Choosing by duty? Start from{" "}
          <Link href="/applications" style={{ color: "#0072BC", fontWeight: 600 }}>
            applications
          </Link>
          .
        </Typography>
      </Box>

      {/* Category sections on alternating white / light-blue bands */}
      {groups.map((g, gi) => (
        <Box key={g.id} sx={{ bgcolor: gi % 2 ? "#f3f6fa" : "#fff", "& img": { mixBlendMode: "multiply" } }}>
          <Box
            id={g.id}
            component="details"
            open
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: { xs: 2, md: 3 },
              scrollMarginTop: 110,
              "&[open] .chev": { transform: "rotate(180deg)" },
              "& > summary::-webkit-details-marker": { display: "none" },
            }}
          >
            <Box
              component="summary"
              sx={{ listStyle: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, py: { xs: 3, md: 4 } }}
            >
              <Box>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.1rem" }, letterSpacing: "-0.02em", textTransform: "none" }}>
                  {g.label}
                </Typography>
                {g.facts && (
                  <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.9rem", textTransform: "none" }}>{g.facts.join(" · ")}</Typography>
                )}
              </Box>
              <Box
                className="chev"
                aria-hidden
                sx={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(15,40,70,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", transition: "transform 0.25s ease" }}
              >
                ▾
              </Box>
            </Box>

            {g.products.length > 0 ? (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, columnGap: { md: 8 }, rowGap: { xs: 5, md: 7 }, pb: { xs: 5, md: 7 } }}>
                {g.products.map((p) => (
                  <SeriesItem key={p.id} product={p} categoryId={g.id} summary={g.models[p.id]} />
                ))}
              </Box>
            ) : (
              <Typography sx={{ pb: 4, color: "text.secondary" }}>
                <Link href={g.href} style={{ color: "#0072BC", fontWeight: 600 }}>
                  View {g.label.toLowerCase()}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
      ))}

      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
        <CtaBanner />
      </Box>
    </Box>
  );
}
