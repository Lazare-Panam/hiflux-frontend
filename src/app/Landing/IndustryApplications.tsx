"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { APP_PHOTOS } from "@/app/applications/visuals";

type Application = {
  slug: string;
  label: string;
  large?: boolean;
};

// Photos are the licensed industry shots used on /applications (see
// APP_PHOTOS for sources and licences).
const APPLICATIONS: Application[] = [
  { slug: "wellhead-pressure-control", label: "Wellhead & Pressure Control", large: true },
  { slug: "hydrogen-refuelling", label: "Hydrogen Refuelling" },
  { slug: "research-and-testing", label: "Research & Testing" },
  { slug: "chemical-processing", label: "Chemical Processing" },
  { slug: "power-generation", label: "Power Generation" },
];

function ApplicationTile({ app }: { app: Application }) {
  const photo = APP_PHOTOS[app.slug];
  return (
    <Box
      component={Link}
      href={`/applications/${app.slug}`}
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 160,
        gridColumn: app.large ? { xs: "span 2", md: "span 2" } : "span 1",
        gridRow: app.large ? { xs: "span 1", md: "span 2" } : "span 1",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        textDecoration: "none",
        "&:hover img": { transform: "scale(1.05)" },
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
          transition: "background 0.3s ease",
        }}
      />
      <Typography
        sx={{
          position: "relative",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.95rem",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          p: 2,
          zIndex: 1,
        }}
      >
        {app.label}
      </Typography>
      {photo.credit && (
        <Typography
          component="span"
          sx={{ position: "absolute", top: 6, right: 8, zIndex: 1, fontSize: "0.6rem", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 2px rgba(0,0,0,0.6)", textTransform: "none" }}
        >
          Photo: {photo.credit.split(", ").slice(1).join(", ")}
        </Typography>
      )}
    </Box>
  );
}

export default function IndustriesSection() {
  return (
    <Box component="section" sx={{ bgcolor: "#fff" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
        }}
      >
        {/* left: intro copy */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            px: { xs: 4, md: 6 },
            py: { xs: 6, md: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              High Pressure Valves &amp; Fittings
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 800,
              color: "text.primary",
              mb: 3,
            }}
          >
            Where our components are used
          </Typography>

          <Button
            component={Link}
            href="/applications"
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              borderRadius: "8px",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                bgcolor: "primary.main",
                color: "#fff",
                borderColor: "primary.main",
              },
            }}
          >
            Explore More
          </Button>
        </Box>

        {/* right: photo mosaic */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: 160,
          }}
        >
          {APPLICATIONS.map((app) => (
            <ApplicationTile key={app.label} app={app} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
