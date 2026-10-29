import { notFound } from "next/navigation";
import { Box, Grid, Typography, Divider, Button } from "@mui/material";
import { getProductDetail } from "@/api/useProductDetail";
import ProductDetailHero from "../[id]/[productId]/components/ProductDetailHero";
import ProductDetailImage from "../[id]/[productId]/components/ProductDetailImage";
import ProductSpecsTable from "../[id]/[productId]/components/ProductSpecsTable";
import ProductFeatureChips from "../[id]/[productId]/components/ProductFeatureChips";
import ProductApplicationsList from "../[id]/[productId]/components/ProductApplicationsList";
import RelatedProducts from "../[id]/[productId]/components/RelatedProducts";
import { summarise } from "../[id]/components/seriesSummary";
import JsonLd from "@/app/seo/JsonLd";
import { SITE_URL, seriesProductGroupLd } from "@/app/seo/schema";

interface Props {
  id: string;
}

/**
 * Server-rendered single-product view used when a catalog id resolves to one
 * product (ProductType.Grid). Fetches on the server so all content is in the
 * initial HTML.
 */
export default async function ProductDetailContent({ id }: Props) {
  const data = await getProductDetail(id).catch(() => null);
  if (!data) notFound();

  // This Grid-type catalog id is itself a single product; its canonical is
  // /products/<id>. Emit it as a ProductGroup with an AggregateOffer (so it is
  // eligible for merchant rich results instead of being flagged "missing
  // offers"). summarise is request-memoised, so this does not add a round-trip.
  const summary = await summarise({ id }).catch(() => null);
  const productSchema = seriesProductGroupLd({
    name: data.name,
    description: data.description,
    image: data.image,
    specs: data.specs,
    seriesUrl: `${SITE_URL}/products/${id}`,
    seriesId: id,
    minPrice: summary?.minPrice,
    maxPrice: summary?.maxPrice,
    models: summary?.models,
  });

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <JsonLd data={productSchema} />

      <ProductDetailHero name={data.name} />
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ProductDetailImage image={data.image} name={data.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "text.secondary",
                  lineHeight: 1.75,
                }}
              >
                {data.description}
              </Typography>
              <Divider />
              <ProductSpecsTable specs={data.specs} />
              <ProductFeatureChips features={data.features} />
              <ProductApplicationsList applications={data.applications} />
              <Button
                href={`/products/${id}/variants`}
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 3,
                  py: 1.25,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
                }}
              >
                View All Models
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Divider sx={{ mb: { xs: 6, md: 8 } }} />
          <RelatedProducts productIds={data.relatedProducts ?? []} />
        </Box>
      </Box>
    </Box>
  );
}
