"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

type Application = {
  label: string;
  image: string;
  large?: boolean;
};

const APPLICATIONS: Application[] = [
  {
    label: "Oil & Gas / Wellhead",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
  {
    label: "Hydrogen Refueling",
    image:
      "https://pblol2.blob.core.windows.net/spac-images/website-media/umberto-jXd2FSvcRr8-unsplash.jpg",
  },
  {
    label: "Research & Testing",
    image:
      "https://pblol2.blob.core.windows.net/spac-images/website-media/umberto-jXd2FSvcRr8-unsplash.jpg",
  },
  {
    label: "Chemical Processing",
    image:
      "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Power Generation",
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
];

function ApplicationTile({ app }: { app: Application }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 160,
        gridColumn: app.large ? { xs: "span 2", md: "span 2" } : "span 1",
        gridRow: app.large ? { xs: "span 1", md: "span 2" } : "span 1",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <Image
        src={app.image}
        alt={app.label}
        fill
        style={{ objectFit: "cover" }}
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
            Applications
          </Typography>

          <Button
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              borderRadius: "2px",
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
