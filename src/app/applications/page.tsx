import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { APPLICATIONS } from "./data";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Applications | Hydrogen, Wellhead, Research, Chemical & Power | Hiflux UK";
  const description =
    "High-pressure valves, fittings and tubing engineered for hydrogen refuelling, wellhead pressure control, research and test rigs, chemical processing and power generation.";
  const url = "https://www.hiflux.uk.com/applications";
  const images = [
    "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png",
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default function ApplicationsIndexPage() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          color: "#fff",
          background:
            "linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)",
        }}
      >
        <Container maxWidth="md">
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
            Applications
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.1rem", md: "3rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              mt: 1.5,
              mb: 3,
            }}
          >
            Components matched to the duty, not the catalogue.
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 640,
            }}
          >
            HIFLUX valves, fittings and tubing selected for the specific
            demands of each application — from 700 bar hydrogen refuelling to
            150,000 psi research rigs and 1200°F steam service.
          </Typography>
        </Container>
      </Box>

      {/* Cards */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {APPLICATIONS.map((app) => (
            <Link
              key={app.slug}
              href={`/applications/${app.slug}`}
              style={{ textDecoration: "none", display: "flex" }}
            >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                textDecoration: "none",
                border: "1px solid",
                borderColor: "divider",
                p: { xs: 3, md: 4 },
                transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1.25rem", md: "1.4rem" },
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 1.5,
                }}
              >
                {app.h1}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  flexGrow: 1,
                  mb: 2,
                }}
              >
                {app.description}
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                Explore
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
