import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { APPLICATIONS } from "./data";
import { APP_VISUALS } from "./visuals";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import CtaBanner from "@/app/Common/CtaBanner";
import { BLUE_BG } from "@/theme/brand";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Applications | Hydrogen, Wellhead, Research, Chemical & Power | Hiflux UK";
  const description =
    "High-pressure valves, fittings and tubing engineered for hydrogen refuelling, wellhead pressure control, research and test rigs, chemical processing and power generation.";
  const url = "https://www.hiflux.uk.com/applications";
  const images = ["https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png"];
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
    <Box sx={{ bgcolor: "#f3f6fa", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Hero */}
      <Box component="section" sx={{ color: "#fff", background: BLUE_BG, py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <PageBreadcrumbs items={[{ label: "Applications" }]} />
          <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
            Applications
          </Typography>
          <Typography component="h1" sx={{ mt: 1.25, fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 760 }}>
            Components matched to the duty, not the catalogue.
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, maxWidth: 640 }}>
            HIFLUX valves, fittings and tubing selected for the specific demands of each application — from 700 bar
            hydrogen refuelling to 150,000 psi research rigs and 1200°F steam service.
          </Typography>
        </Container>
      </Box>

      {/* Bento grid: two large cards, then three */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "grid", gap: { xs: 2.5, md: 3 }, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(6, 1fr)" } }}>
          {APPLICATIONS.map((app, i) => {
            const v = APP_VISUALS[app.slug];
            const big = i < 2;
            return (
              <Box key={app.slug} sx={{ gridColumn: { md: big ? "span 3" : "span 2" }, ...(i === 4 ? { gridColumn: { sm: "span 2", md: "span 2" } } : {}) }}>
                <Link href={`/applications/${app.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "#fff",
                      borderRadius: "20px",
                      border: "1px solid rgba(15,40,70,0.08)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                      "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(0,114,188,0.3)", boxShadow: "0 22px 48px rgba(0,83,155,0.14)" },
                      "&:hover .app-img": { transform: "scale(1.06)" },
                      "&:hover .app-go": { bgcolor: "primary.main", color: "#fff", borderColor: "primary.main" },
                    }}
                  >
                    <Box sx={{ position: "relative", height: big ? { xs: 190, md: 230 } : 180, bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(15,40,70,0.06)" }}>
                      <Typography sx={{ position: "absolute", top: 16, left: 20, fontWeight: 800, fontSize: "1.6rem", color: "rgba(0,83,155,0.18)", lineHeight: 1 }}>
                        {String(i + 1).padStart(2, "0")}
                      </Typography>
                      {v && (
                        <Box component="img" className="app-img" src={v.image} alt={v.imageAlt} loading="lazy" sx={{ maxWidth: "62%", maxHeight: "78%", objectFit: "contain", transition: "transform 0.4s ease" }} />
                      )}
                    </Box>
                    <Box sx={{ p: { xs: 2.5, md: 3 }, display: "flex", flexDirection: "column", flex: 1 }}>
                      <Typography component="h2" sx={{ fontWeight: 800, fontSize: big ? { xs: "1.25rem", md: "1.45rem" } : "1.15rem", lineHeight: 1.25, color: "text.primary" }}>
                        {app.h1}
                      </Typography>
                      <Typography sx={{ mt: 1, color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.65, flex: 1 }}>{app.description}</Typography>
                      {v && (
                        <Typography sx={{ mt: 1.5, color: "primary.dark", fontSize: "0.82rem", fontWeight: 700 }}>
                          {v.facts.map((f) => f.value).join("  ·  ")}
                        </Typography>
                      )}
                      <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.92rem" }}>Explore the application</Typography>
                        <Box className="app-go" aria-hidden sx={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(15,40,70,0.15)", color: "text.primary", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}>
                          <ArrowForwardIcon sx={{ fontSize: 18 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Box>

        <CtaBanner sx={{ mt: { xs: 5, md: 7 } }} heading="Duty not listed here?" body="Send us the pressure, temperature, media and connection type and we'll recommend the HIFLUX parts for it." />
      </Container>
    </Box>
  );
}
