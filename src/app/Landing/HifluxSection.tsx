"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HifluxSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fff" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
          alignItems: "flex-start",
        }}
      >
        {/* left: copy */}
        <Box sx={{ flex: 1 }}>
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
            Who We Are
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 800,
              color: "text.primary",
              lineHeight: 1.15,
              mt: 1,
              mb: 3,
            }}
          >
            The UK and EU arm of HIFLUX Co., Ltd
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            <Box
              component="span"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Hiflux UK
            </Box>{" "}
            is the exclusive UK and EU distributor for HIFLUX Co., Ltd of
            Daejeon, South Korea — a manufacturer of ultra high-pressure valves,
            fittings and tubing since 2010, and a designated Hydrogen Specialist
            Company under Korea's Ministry of Trade, Industry and Energy.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            We hold UK stock, handle EU-facing supply, and provide the technical
            and documentation support a UK or EU project needs. Every series,
            every certificate and every batch is genuine HIFLUX product,
            traceable back to the manufacturer.
          </Typography>

          <Typography
            component="h3"
            sx={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "text.primary",
              mt: 4,
              mb: 1.5,
            }}
          >
            Buy genuine, buy traceable
          </Typography>

          <Typography
            sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.75, mb: 3 }}
          >
            If you are sourcing HIFLUX components in the UK or EU, source them
            from the authorised distributor. Grey-market product carries no
            traceable material certification — and on a 150,000 psi line, that
            documentation is the whole point.
          </Typography>

          <Button
            component={Link}
            href="/about"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              py: 1.1,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": { bgcolor: "primary.main", color: "#fff", borderColor: "primary.main" },
            }}
          >
            About Hiflux UK
          </Button>
        </Box>

        {/* right: static image */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              pt: "75%",
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png"
              alt="Hiflux high pressure needle valve"
              fill
              style={{ objectFit: "contain", padding: "32px" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}