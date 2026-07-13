"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { useProductDetail } from "@/api/useProductDetail";
import ProductDetailHero from "../[id]/[productId]/components/ProductDetailHero";
import ProductDetailImage from "../[id]/[productId]/components/ProductDetailImage";
import ProductSpecsTable from "../[id]/[productId]/components/ProductSpecsTable";
import ProductFeatureChips from "../[id]/[productId]/components/ProductFeatureChips";
import ProductApplicationsList from "../[id]/[productId]/components/ProductApplicationsList";
import RelatedProducts from "../[id]/[productId]/components/RelatedProducts";
interface Props {
  id: string;
}

export default function ProductDetailContent({ id }: Props) {
  const router = useRouter();
  const { data, isLoading, isError } = useProductDetail(id);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Failed to load product.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
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
                onClick={() => router.push(`/products/${id}/variants`)}
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: "4px",
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
          <RelatedProducts
            catalogId={id}
            productIds={data.relatedProducts ?? []}
          />
        </Box>
      </Box>
    </Box>
  );
}
