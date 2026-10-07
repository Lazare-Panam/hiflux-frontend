"use client";

import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProductCategoryCard from "../products/components/ProductCategoryCard";
import { CATEGORIES } from "../products/data/categories";

// Category cards directly under the hero — the same cards as /products.
export default function CategoryGrid() {
  return (
    <Box component="section" sx={{ bgcolor: "#f3f6fa", py: { xs: 6, md: 9 }, px: { xs: 2, md: 8 } }}>
      <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "primary.main",
                letterSpacing: "0.2em",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Our Range
            </Typography>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.15 }}
            >
              High-pressure products by category
            </Typography>
          </Box>
          <Box
            component={Link}
            href="/products"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Browse all products
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {CATEGORIES.map((cat) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.id}>
              <ProductCategoryCard {...cat} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
