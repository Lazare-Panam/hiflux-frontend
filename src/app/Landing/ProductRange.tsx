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
              gridTemplateColumns: { xs: "1fr", sm: "minmax(220px, 1fr) 2fr" },
              minWidth: { sm: 640 },
              border: "1px solid rgba(15,40,70,0.08)",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
              // the last row has no bottom rule
              "& > .range-row:last-of-type > *": { borderBottom: "none" },
              "& > .range-row:hover > *": { bgcolor: "rgba(0,114,188,0.04)" },
            }}
          >
            {/* Header row */}
            <Box
              sx={{
                px: 2.5,
                py: 1.75,
                fontWeight: 700,
                borderBottom: "1px solid rgba(15,40,70,0.08)",
                bgcolor: "#f6f9fc",
                color: "#5b6b7c",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: { xs: "none", sm: "block" },
              }}
            >
              Category
            </Box>
            <Box
              sx={{
                px: 2.5,
                py: 1.75,
                fontWeight: 700,
                borderBottom: "1px solid rgba(15,40,70,0.08)",
                bgcolor: "#f6f9fc",
                color: "#5b6b7c",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: { xs: "none", sm: "block" },
              }}
            >
              What it covers
            </Box>

            {ROWS.map((row) => (
              <Box key={row.category} className="range-row" sx={{ display: "contents" }}>
                <Box
                  component={Link}
                  href={row.href}
                  sx={{
                    px: 2.5,
                    py: 2.25,
                    fontWeight: 700,
                    color: "primary.dark",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(15,40,70,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    transition: "background-color 0.15s ease",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {row.category}
                  <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </Box>
                <Box
                  sx={{
                    px: 2.5,
                    py: 2.25,
                    color: "text.secondary",
                    borderBottom: "1px solid rgba(15,40,70,0.07)",
                    transition: "background-color 0.15s ease",
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
            borderRadius: "8px",
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
