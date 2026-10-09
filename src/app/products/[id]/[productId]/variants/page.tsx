import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductVariants } from "@/api/useProductVariants";
import { categorySlug } from "@/api/catalogSlug";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { getProductDetail } from "@/api/useProductDetail";
import VariantsBrowser from "./components/VariantsBrowser";

// Cache the rendered page (ISR): built on the first visit, then served from
// cache and regenerated in the background at most once an hour. Without this
// every request re-rendered and re-fetched the product API, which SE Ranking
// flagged as "Slow page loading speed".
export const revalidate = 3600;

// No paths are prebuilt at deploy time (there are 1,300+ SKUs); an empty list
// means each page is rendered on its first request and then cached.
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ id: string; productId: string }> };

function humanizeCategory(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, productId } = await params;
  const data = await getProductVariants(productId).catch(() => null);
  // Holding page until the models are in the API: keep it out of the index.
  if (!data) return { title: "Product Models | Hiflux UK", robots: { index: false, follow: true } };

  const count = data.variants?.length ?? 0;
  const title = `${data.name} — Models & Specs`;
  const description = `Compare ${count} ${data.name} model${count !== 1 ? "s" : ""} from Hiflux UK — specifications, pressure ratings and materials.`;
  const url = `https://www.hiflux.uk.com/products/${categorySlug(id)}/${productId}/variants`;
  // Self-canonical, consistent with the SKU pages (see variants/[sku]/page.tsx).
  const images = data.thumbnailImage ? [data.thumbnailImage] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProductVariantsPage({ params }: Props) {
  const { id, productId } = await params;

  const data = await getProductVariants(productId).catch(() => null);
  if (data) return <VariantsBrowser data={data} category={humanizeCategory(id)} />;

  // No models in the API yet. If the series itself exists, show a holding
  // page (noindex) instead of a 404; it fills in once the models are added.
  const series = await getProductDetail(productId).catch(() => null);
  if (!series) notFound();
  const seriesHref = `/products/${categorySlug(series.catalogId)}/${productId}`;

  return (
    <Box sx={{ bgcolor: "#f3f6fa", minHeight: "60vh", py: { xs: 6, md: 10 }, px: 2, "& .MuiTypography-root": { textTransform: "none" } }}>
      <Box sx={{ maxWidth: 640, mx: "auto", textAlign: "center", bgcolor: "#fff", borderRadius: "22px", border: "1px solid rgba(15,40,70,0.08)", p: { xs: 4, md: 6 } }}>
        <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase !important" }}>
          All models
        </Typography>
        <Typography component="h1" sx={{ mt: 1, fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1.2 }}>
          {series.name}
        </Typography>
        <Typography sx={{ mt: 2, color: "text.secondary", fontSize: "1rem", lineHeight: 1.7 }}>
          The full list of models and prices for this series is being added. In the meantime, send us the size and
          configuration you need and we&apos;ll come back with part numbers and a price.
        </Typography>
        <Box sx={{ mt: 3.5, display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Box component="span" sx={{ display: "inline-flex", px: 3, py: 1.3, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontWeight: 700 }}>
              Request a Quote
            </Box>
          </Link>
          <Link href={seriesHref} style={{ textDecoration: "none" }}>
            <Box component="span" sx={{ display: "inline-flex", px: 3, py: 1.3, borderRadius: "999px", border: "1.5px solid rgba(15,40,70,0.15)", color: "text.primary", fontWeight: 700 }}>
              Back to {series.name}
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
