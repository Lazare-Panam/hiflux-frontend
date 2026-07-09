"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

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
            There's only one HiFlux.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            We're{" "}
            <Box
              component="span"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              HiFlux UK
            </Box>{" "}
            — built for the pressures other valves can't hold. From needle
            valves to full instrumentation systems, every product we ship is
            engineered to perform when the margin for error is zero.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            Every valve that leaves our facility is tested to the same high
            pressure ratings, the same material standards, the same
            tolerances — whether it's a single needle valve or a full
            instrumentation package. That consistency isn't a logo. It's a
            process, refined over years, that doesn't cut corners under
            pressure.
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
            Buy from the source
          </Typography>

          <Typography
            sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.75 }}
          >
            If you're sourcing HiFlux valves, source them from us. Every
            series, every certificate, every batch is traceable back to one
            place — not a name licensed out, copied, or printed on a box
            that's never seen our factory floor.
          </Typography>
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
              alt="HiFlux high pressure needle valve"
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