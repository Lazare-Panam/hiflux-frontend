"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Section 6 — Certification. Rewritten: no PED claim (only ATEX filing receipts
// exist, which are not a conformity certificate); "KGS & KC" corrected to KS
// certification awarded by KGS.
export default function Certification() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        color: "#fff",
        background:
          "linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)",
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
          HIFLUX Co., Ltd operates to KS Q ISO 9001 for quality management, KS I
          ISO 14001 for environmental management and KS Q ISO 45001 for
          occupational health and safety.
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
          Corporation (KGS), and its valves are in service at hydrogen
          refuelling station sites.
        </Typography>
        <Button
          component={Link}
          href="/about"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: "#fff",
            color: "#00539B",
            borderRadius: 0,
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1.25,
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          View certifications
        </Button>
      </Box>
    </Box>
  );
}
