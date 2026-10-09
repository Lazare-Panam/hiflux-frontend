"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CategoryBento } from "../products/components/ProductCategoryCard";
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
            {/* Merged from the former "The range" section so its copy stays on the page. */}
            <Typography sx={{ mt: 1.25, color: "text.secondary", fontSize: "1rem", lineHeight: 1.7, maxWidth: 720, textTransform: "none" }}>
              <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                Five categories, one connection system.
              </Box>{" "}
              All in cold-formed stainless steel 316 as standard, with Hastelloy, Inconel 600/625/825, Nickel 200 and
              Titanium available where the service requires them.
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

        <CategoryBento categories={CATEGORIES} />
      </Box>
    </Box>
  );
}
