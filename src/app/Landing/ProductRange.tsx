"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Section 4 — The range. A category-level table (not the SKU carousel), each
// row linking to its product category page.
const ROWS: { category: string; covers: string; href: string }[] = [
  {
    category: "High Pressure Valves",
    covers: "Needle, check, ball, air operated, safety and special valves",
    href: "/products/high-pressure-valves",
  },
  {
    category: "High Pressure Fittings",
    covers:
      "Elbow, tee and cross bodies with glands, collars, sleeves and accessories, 10,000 to 150,000 psi",
    href: "/products/high-pressure-fittings",
  },
  {
    category: "High Pressure Tubing",
    covers: "Tube, nipples and tube support for cone and thread systems",
    href: "/products/high-pressure-tubing",
  },
  {
    category: "Union & Adapters",
    covers:
      "Unions, male-to-male, male-to-female, bulkhead and Lok-to-female adapters",
    href: "/products/union-adapters",
  },
  {
    category: "High Pressure Regulators",
    covers:
      "General, high-pressure, back pressure and air-operated back pressure regulators",
    href: "/products/high-pressure-regulators",
  },
];

export default function ProductRange() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fff" }}>
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 } }}>
        <Typography
          component="span"
          sx={{
            color: "primary.main",
            letterSpacing: "0.2em",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          The Range
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 800,
            color: "text.primary",
            mt: 1,
            mb: 4,
          }}
        >
          Five categories, one connection system.
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "minmax(200px, 1fr) 2fr" },
              borderTop: "1px solid",
              borderColor: "divider",
              minWidth: { sm: 640 },
            }}
          >
            {/* Header row */}
            <Box
              sx={{
                p: 2,
                fontWeight: 800,
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "action.hover",
                display: { xs: "none", sm: "block" },
              }}
            >
              Category
            </Box>
            <Box
              sx={{
                p: 2,
                fontWeight: 800,
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "action.hover",
                display: { xs: "none", sm: "block" },
              }}
            >
              What it covers
            </Box>

            {ROWS.map((row) => (
              <Box key={row.category} sx={{ display: "contents" }}>
                <Box
                  component={Link}
                  href={row.href}
                  sx={{
                    p: 2,
                    fontWeight: 700,
                    color: "text.primary",
                    textDecoration: "none",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {row.category}
                </Box>
                <Box
                  sx={{
                    p: 2,
                    color: "text.secondary",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {row.covers}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            mt: 3,
            fontStyle: "italic",
          }}
        >
          All in cold-formed stainless steel 316 as standard, with Hastelloy,
          Inconel 600/625/825, Nickel 200 and Titanium available where the
          service requires them.
        </Typography>

        <Button
          component={Link}
          href="/products"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
          sx={{
            mt: 4,
            borderRadius: 0,
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1.25,
          }}
        >
          Browse all products
        </Button>
      </Box>
    </Box>
  );
}
