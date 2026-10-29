import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaBanner from "@/app/Common/CtaBanner";
import { PRODUCT_STAGE } from "@/theme/brand";
import Link from "next/link";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { getProductVariants } from "@/api/useProductVariants";
import { categorySlug } from "@/api/catalogSlug";
import { CATEGORIES } from "@/app/products/data/categories";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import JsonLd from "@/app/seo/JsonLd";
import { SITE_URL, variantProductLd } from "@/app/seo/schema";

// "high-pressure-valves" -> "High Pressure Valves"
const categoryLabel = (slug: string) => CATEGORIES.find((c) => c.id === slug)?.label ?? humanizeCategory(slug);
const humanizeCategory = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
import AddToCartButton from "./components/AddToCartButton";

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

const BRAND = "#0072BC";
const FITTINGS_SERIES = "fit-ultra-150k";
const ACCESSORY_SERIES = "acc-ultra-150k";
const HIDDEN_SPEC_KEYS = ["SKU", "Price"];

type Props = {
  params: Promise<{ id: string; productId: string; sku: string }>;
};

// Spec-driven SEO strings, shared by generateMetadata (title/description) and the
// on-page H1 so they stay in lockstep. Title is one shared pattern for every
// series; a few series need bespoke H1/description copy (per the SEO briefs), so
// those branch below. Everything is derived from real variant specs — nothing is
// asserted that the data can't back, except where a brief has been confirmed
// (ball valves: "Trunnion" type and Finish "180" = 180°C high-temp PEEK-seat).
function buildVariantSeo(
  productId: string,
  sku: string,
  seriesName: string,
  specs: Record<string, string>,
) {
  // "High Pressure Needle Valve - Ultra High Pressure" -> "High Pressure Needle Valve".
  // Only a trailing "... - <x> Pressure" class qualifier is stripped, so names like
  // "BPR - Back Pressure Regulator" are left intact.
  const productType =
    seriesName.replace(/\s*-\s*[\w\s]*pressure$/i, "").trim() || seriesName;
  const size = specs["Tube Size"] || specs["Size"] || "";
  const pressure = specs["Pressure Rating"] || "";
  const priceStr = specs["Price"] || "";

  // Shared title: "{SKU} {Type}, {size}, {pressure}" (+ " | Hiflux" only when <=60).
  const titleBase = [`${sku} ${productType}`, size, pressure]
    .filter(Boolean)
    .join(", ");
  const title =
    (titleBase + " | Hiflux").length <= 60 ? `${titleBase} | Hiflux` : titleBase;

  // Ball valves (ball-med-20k): trunnion type, orifice + finish-version copy.
  // Finish "180" confirmed as the 180°C high-temp (PEEK seat) version.
  if (productId === "ball-med-20k") {
    const orifice = specs["Orifice Size"] || "";
    const finish = specs["Finish"] || "";
    const versionH1 =
      finish === "180" ? "180°C Version" : finish === "Standard" ? "Standard" : finish;
    const versionDesc =
      finish === "180"
        ? "180°C high-temp version"
        : finish === "Standard"
          ? "standard version"
          : finish && `${finish} version`;

    const h1 = [`${sku} High Pressure Trunnion Ball Valve`, size, pressure, versionH1]
      .filter(Boolean)
      .join(", ");

    let description = `${sku} trunnion high pressure ball valve`;
    if (size) description += `, ${size} tube`;
    if (orifice) description += `, ${orifice} orifice`;
    if (pressure) description += `, rated ${pressure}`;
    if (versionDesc) description += `, ${versionDesc}`;
    description += priceStr
      ? `. £${priceStr}, order online or request a quote.`
      : `. Order online or request a quote.`;

    return { productType, title, h1, description };
  }

  // Generic: covers check valves (via "Sealing Type") and every other series.
  const seal = specs["Sealing Type"] || "";
  const h1 = [titleBase, seal && `${seal} Seal`].filter(Boolean).join(", ");

  let description = `${sku} ${productType.toLowerCase()}`;
  if (size) description += `, ${size} tube`;
  if (pressure) description += `, rated ${pressure}`;
  if (seal) description += `, ${seal.toLowerCase()} seal`;
  description += priceStr
    ? `. £${priceStr} per unit, order online or request a UK quote.`
    : `. Order online or request a UK quote.`;

  return { productType, title, h1, description };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, productId, sku } = await params;
  const data = await getProductVariants(productId).catch(() => null);
  const variant = data?.variants.find((v) => (v.specs["SKU"] ?? v.id) === sku);
  if (!data || !variant) return { title: "Model Not Found | Hiflux UK" };

  const { title, description } = buildVariantSeo(productId, sku, data.name, variant.specs);
  const url = `https://www.hiflux.uk.com/products/${categorySlug(id)}/${productId}/variants/${sku}`;
  // Self-canonical. The site-wide seoplatform injector (layout.tsx) also adds a
  // self-referencing canonical to SKU pages; pointing this one at the parent
  // product produced two conflicting canonicals (SE Ranking "Multiple
  // rel=canonical", Oct 2026). Keep the two in agreement.
  const images = data.thumbnailImage ? [data.thumbnailImage] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function VariantDetail({ params }: Props) {
  const { id, productId, sku } = await params;

  const data = await getProductVariants(productId).catch(() => null);
  const variant = data?.variants.find((v) => (v.specs["SKU"] ?? v.id) === sku);
  if (!data || !variant) notFound();

  const seo = buildVariantSeo(productId, sku, data.name, variant.specs);

  const price = variant.specs["Price"];
  const parsedPrice = price ? parseFloat(price) : NaN;
  const hasPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  const displaySpecs = Object.entries(variant.specs).filter(
    ([key]) => !HIDDEN_SPEC_KEYS.includes(key),
  );

  // "Related" = same pressure class and tube size (then same class only), never
  // a different class: fitting components don't cross pressure classes.
  const rating = variant.specs["Pressure Rating"];
  const tube = variant.specs["Tube Size"];
  const score = (v: typeof variant) =>
    (rating && v.specs["Pressure Rating"] === rating ? 2 : 0) + (tube && v.specs["Tube Size"] === tube ? 1 : 0);
  const sameClass = data.variants
    .filter((v) => v.id !== variant.id && score(v) >= 2)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 4);
  // Series with no shared class/size (e.g. LOK tube, where each size has its
  // own rating) show other models from the series instead of nothing.
  const related = sameClass.length ? sameClass : data.variants.filter((v) => v.id !== variant.id).slice(0, 4);
  const relatedHeading = sameClass.length ? "Same pressure class and size" : `Other ${data.name} models`;

  // A fitting body needs a matched accessory set of the same class and size
  // (gland + sleeve below 20,000 psi, gland + collar above).
  const accessories =
    productId === FITTINGS_SERIES && rating && tube
      ? ((await getProductVariants(ACCESSORY_SERIES).catch(() => null))?.variants ?? []).filter(
          (a) =>
            a.specs["Pressure Rating"] === rating &&
            a.specs["Tube Size"] === tube &&
            ["Gland", "Collar", "Sleeve"].includes(a.specs["Type"] ?? ""),
        )
      : [];

  // URLs use the product's true category slug so schema always agrees with the
  // page's rel=canonical (the old Offer.url used the raw `id`, which could
  // differ from the canonical category and point at a non-canonical URL).
  const seriesUrl = `${SITE_URL}/products/${categorySlug(id)}/${productId}`;
  const skuUrl = `${seriesUrl}/variants/${sku}`;
  const productSchema = variantProductLd({
    name: `${data.name} ${sku}`,
    sku,
    image: data.thumbnailImage,
    specs: displaySpecs,
    skuUrl,
    seriesUrl,
    seriesId: productId,
    seriesName: data.name,
    price: hasPrice ? parsedPrice : null,
  });

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <JsonLd data={productSchema} />
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ mb: 2 }}>
          <PageBreadcrumbs
            tone="dark"
            items={[
              { label: "Products", href: "/products" },
              { label: categoryLabel(categorySlug(id)), href: `/products/${categorySlug(id)}` },
              { label: data.name, href: `/products/${categorySlug(id)}/${productId}` },
              { label: "All Models", href: `/products/${categorySlug(id)}/${productId}/variants` },
              { label: sku },
            ]}
          />
        </Box>

        <Grid container spacing={6}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "sticky",
                top: 24,
                border: `1px solid ${alpha(BRAND, 0.15)}`,
                borderRadius: "12px",
                bgcolor: "#fff",
                overflow: "hidden",
              }}
            >
              <Box sx={{ position: "relative", aspectRatio: "1/1", background: PRODUCT_STAGE }}>
                <Image src={data.thumbnailImage} alt={sku} fill style={{ objectFit: "contain", padding: 48, mixBlendMode: "multiply" }} />
              </Box>
            </Box>
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: BRAND,
                mb: 1,
              }}
            >
              {data.name}
            </Typography>

            <Typography
              component="h1"
              sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, lineHeight: 1.15 }}
            >
              {seo.h1}
            </Typography>

            {hasPrice && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 0.5,
                  mt: 2.5,
                  px: 2,
                  py: 1,
                  bgcolor: alpha(BRAND, 0.06),
                  borderRadius: "8px",
                  borderLeft: `4px solid ${BRAND}`,
                }}
              >
                <Typography sx={{ fontSize: "1.9rem", fontWeight: 800, color: BRAND }}>
                  £{price}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>per unit</Typography>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 1.5,
              }}
            >
              Specifications
            </Typography>

            <Table
              size="small"
              sx={{
                border: `1px solid ${alpha(BRAND, 0.12)}`,
                borderRadius: "8px",
                overflow: "hidden",
                "& td, & th": { borderBottom: `1px solid ${alpha(BRAND, 0.08)}` },
                "& tr:last-of-type td, & tr:last-of-type th": { borderBottom: "none" },
              }}
            >
              <TableBody>
                {displaySpecs.map(([label, value], i) => (
                  <TableRow key={label} sx={{ bgcolor: i % 2 === 0 ? "#fff" : alpha(BRAND, 0.02) }}>
                    <TableCell
                      component="th"
                      sx={{
                        width: "40%",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {label}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.9rem", fontWeight: 600 }}>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {hasPrice ? (
              <>
                <AddToCartButton
                  productId={productId}
                  sku={sku}
                  name={data.name}
                  thumbnailImage={data.thumbnailImage}
                  price={parsedPrice}
                />
                <Button
                  variant="outlined"
                  fullWidth
                  href="/contact"
                  sx={{
                    mt: 1.5,
                    py: 1.25,
                    borderColor: alpha(BRAND, 0.5),
                    color: BRAND,
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: "8px",
                    "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
                  }}
                >
                  Request a Quote
                </Button>
                <Typography sx={{ mt: 1.25, fontSize: "0.82rem", color: "text.secondary", textAlign: "center", textTransform: "none" }}>
                  Material certificates and documentation on request.
                </Typography>
              </>
            ) : (
              <Button
                variant="contained"
                fullWidth
                disableElevation
                href="/contact"
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: BRAND,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "#005a94" },
                }}
              >
                Request quote
              </Button>
            )}
          </Grid>
        </Grid>

        {/* Required accessories (fitting bodies only) */}
        {accessories.length > 0 && (
          <Box
            sx={{
              mt: 6,
              p: { xs: 2.5, md: 3 },
              borderRadius: "12px",
              border: `1px solid ${alpha(BRAND, 0.2)}`,
              bgcolor: alpha(BRAND, 0.04),
            }}
          >
            <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, mb: 0.5 }}>
              Required accessories for {sku}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "text.secondary", mb: 2, textTransform: "none" }}>
              A fitting body needs a matched accessory set of the same pressure class and tube size
              ({rating}, {tube}). Order one set per connection.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {accessories.map((a) => {
                const aSku = a.specs["SKU"] ?? a.id;
                return (
                  <Link
                    key={a.id}
                    href={`/products/high-pressure-fittings/${ACCESSORY_SERIES}/variants/${aSku}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        px: 2,
                        py: 1.25,
                        borderRadius: "8px",
                        bgcolor: "#fff",
                        border: `1px solid ${alpha(BRAND, 0.2)}`,
                        "&:hover": { borderColor: BRAND },
                      }}
                    >
                      <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 700 }}>{a.specs["Type"]}</Typography>
                      <Typography sx={{ fontFamily: "monospace", fontWeight: 700, color: BRAND }}>{aSku}</Typography>
                      {a.specs["Price"] && (
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>£{a.specs["Price"]}</Typography>
                      )}
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Related */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography sx={{ fontSize: "1.15rem", fontWeight: 800, mb: 3 }}>
              {relatedHeading}
            </Typography>
            <Grid container spacing={2.5}>
              {related.map((item) => {
                const itemSku = item.specs["SKU"] ?? item.id;
                const itemPrice = item.specs["Price"];
                return (
                  <Grid size={{ xs: 6, sm: 3 }} key={item.id}>
                    <Link
                      href={`/products/${id}/${productId}/variants/${itemSku}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        sx={{
                          border: `1px solid ${alpha(BRAND, 0.12)}`,
                          borderRadius: "10px",
                          p: 1.5,
                          bgcolor: "#fff",
                          transition: "all 0.15s",
                          "&:hover": {
                            borderColor: BRAND,
                            boxShadow: `0 4px 16px ${alpha(BRAND, 0.12)}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            aspectRatio: "1/1",
                            background: PRODUCT_STAGE,
                            borderRadius: "6px",
                          }}
                        >
                          <Image
                            src={data.thumbnailImage}
                            alt={itemSku}
                            fill
                            style={{ objectFit: "contain", padding: 16, mixBlendMode: "multiply" }}
                          />
                        </Box>
                        <Typography
                          noWrap
                          sx={{ fontSize: "0.82rem", fontWeight: 700, mt: 1.25, fontFamily: "monospace" }}
                        >
                          {itemSku}
                        </Typography>
                        {itemPrice && (
                          <Typography
                            sx={{ fontSize: "0.85rem", fontWeight: 800, color: BRAND, mt: 0.25 }}
                          >
                            £{itemPrice}
                          </Typography>
                        )}
                      </Box>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        <Box sx={{ mt: 8 }}>
          <CtaBanner
            heading={`Need ${sku} or a different size?`}
            body="Send us the part number, quantity and delivery location and we'll come back with a price and the documentation."
          />
        </Box>
      </Box>
    </Box>
  );
}
