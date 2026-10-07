"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BLUE_BG } from "@/theme/brand";

// Section 6 — Certification. Claims match the certificates on /certifications:
// PED is limited to the DN32 needle valve and the ATEX documents are technical
// file receipts, so neither is claimed for the whole range.
export default function Certification() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        color: "#fff",
        background:
          BLUE_BG,
      }}
    >
      <Box sx={{ maxWidth: 820, mx: "auto", px: { xs: 3, md: 8 } }}>
        <Typography
          component="span"
          sx={{
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.2em",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Certification
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.75rem" },
            fontWeight: 800,
            lineHeight: 1.15,
            mt: 1.5,
            mb: 3,
          }}
        >
          Certified, documented, traceable
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            mb: 2.5,
          }}
        >
          HIFLUX Co., Ltd is certified to KS Q ISO 9001:2015 for quality
          management, KS I ISO 14001:2015 for environmental management and ISO
          45001:2018 for occupational health and safety.
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            mb: 4,
          }}
        >
          In October 2023 the company was awarded KS certification for manual
          valves for hydrogen refuelling stations by the Korea Gas Safety
          Corporation (KGS), to KS B ISO 19880-3. Certificates, including PED
          and ATEX documents for specific valves, can be downloaded in full.
        </Typography>
        <Button
          component={Link}
          href="/certifications"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: "#fff",
            color: "#00539B",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1.25,
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          Download certificates
        </Button>
      </Box>
    </Box>
  );
}
