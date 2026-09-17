import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
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
  Breadcrumbs,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { getProductVariants } from "@/api/useProductVariants";
import AddToCartButton from "./components/AddToCartButton";

const BRAND = "#0072BC";
const HIDDEN_SPEC_KEYS = ["SKU", "Price"];

type Props = {
  params: Promise<{ id: string; productId: string; sku: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, productId, sku } = await params;
  const data = await getProductVariants(productId).catch(() => null);
  const variant = data?.variants.find((v) => (v.specs["SKU"] ?? v.id) === sku);
  if (!data || !variant) return { title: "Model Not Found | Hiflux UK" };

  const title = `${sku} — ${data.name} | Hiflux UK`;
  const description = `${sku}: ${data.name} — specifications, pressure rating and materials from Hiflux UK.`;
  const url = `https://www.hiflux.uk.com/products/${id}/${productId}/variants/${sku}`;
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

  const price = variant.specs["Price"];
  const parsedPrice = price ? parseFloat(price) : NaN;
  const hasPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  const displaySpecs = Object.entries(variant.specs).filter(
    ([key]) => !HIDDEN_SPEC_KEYS.includes(key),
  );

  const related = data.variants.filter((v) => v.id !== variant.id).slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${data.name} ${sku}`,
    sku,
    image: data.thumbnailImage ? [data.thumbnailImage] : undefined,
    brand: { "@type": "Brand", name: "Hiflux" },
    additionalProperty: displaySpecs.map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
    ...(hasPrice
      ? {
          offers: {
            "@type": "Offer",
            price: parsedPrice,
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: `https://www.hiflux.uk.com/products/${id}/${productId}/variants/${sku}`,
          },
        }
      : {}),
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        {/* Breadcrumb / back */}
        <Breadcrumbs
          separator="/"
          sx={{
            mb: 4,
            fontSize: "0.8rem",
            "& .MuiBreadcrumbs-separator": { color: "text.disabled" },
          }}
        >
          <Link
            href={`/products/${id}/${productId}/variants`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: BRAND,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 12 }} />
            {data.name}
          </Link>
          <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", fontFamily: "monospace" }}>
            {sku}
          </Typography>
        </Breadcrumbs>

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
              <Box sx={{ position: "relative", aspectRatio: "1/1", bgcolor: alpha(BRAND, 0.03) }}>
                <Image src={data.thumbnailImage} alt={sku} fill style={{ objectFit: "contain", padding: 40 }} />
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
              {sku}
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
              <AddToCartButton
                productId={productId}
                sku={sku}
                name={data.name}
                thumbnailImage={data.thumbnailImage}
                price={parsedPrice}
              />
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

        {/* Related */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography sx={{ fontSize: "1.15rem", fontWeight: 800, mb: 3 }}>
              Related products
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
                            bgcolor: alpha(BRAND, 0.03),
                            borderRadius: "6px",
                          }}
                        >
                          <Image
                            src={data.thumbnailImage}
                            alt={itemSku}
                            fill
                            style={{ objectFit: "contain", padding: 16 }}
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
      </Box>
    </Box>
  );
}
