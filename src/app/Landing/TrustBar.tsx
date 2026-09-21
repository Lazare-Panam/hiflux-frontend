"use client";

import { Box, Typography } from "@mui/material";

// Section 2 — Trust bar. Verifiable-from-catalogue figures that speak to an
// engineer: max rating, full fitting span, material grade, temperature range.
const ITEMS = [
  { value: "150,000 psi", label: "Maximum pressure rating" },
  { value: "10,000–150,000 psi", label: "Fitting range" },
  { value: "316", label: "Stainless steel grade" },
  { value: "−252°C to 649°C", label: "Operating temperature" },
];

export default function TrustBar() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#fff",
        borderBottom: "1px solid",
        borderColor: "rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        }}
      >
        {ITEMS.map((item, i) => (
          <Box
            key={item.label}
            sx={{
              py: { xs: 3, md: 4 },
              px: { xs: 2, md: 3 },
              textAlign: "center",
              borderLeft: { md: i === 0 ? "none" : "1px solid rgba(0,0,0,0.08)" },
              // On the 2-col mobile layout, draw a divider before the right column
              // and above the bottom row.
              borderTop: {
                xs: i >= 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                md: "none",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", md: "1.75rem" },
                color: "text.primary",
                lineHeight: 1.1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.value}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                mt: 1,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
