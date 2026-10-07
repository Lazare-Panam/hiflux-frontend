"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CATALOG_PDF = "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";

const RESOURCES = [
  {
    icon: <PictureAsPdfOutlinedIcon />,
    title: "HIFLUX e-catalogue",
    body: "Full range, part numbers, ratings and dimensions in one PDF.",
    cta: "Download PDF",
    href: CATALOG_PDF,
    external: true,
  },
  {
    icon: <GridViewOutlinedIcon />,
    title: "Browse by category",
    body: "Valves, fittings, tubing, adapters and regulators.",
    cta: "Browse products",
    href: "/products",
  },
  {
    icon: <BuildOutlinedIcon />,
    title: "Cone & thread fittings",
    body: "How the connection seals, glands, collars and assembly tips.",
    cta: "Read the guide",
    href: "/news/high-pressure-cone-and-thread-fittings-guide",
  },
  {
    icon: <SpeedOutlinedIcon />,
    title: "Choosing a regulator",
    body: "GPR, HPR, BPR and air-operated BPR compared.",
    cta: "Read the guide",
    href: "/news/high-pressure-regulators-gpr-hpr-bpr-selection-guide",
  },
];

export default function ResourceTiles() {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
        "& .MuiTypography-root": { textTransform: "none" },
      }}
    >
      {RESOURCES.map((r) => (
        <li key={r.href}>
          <Box
            component={r.external ? "a" : Link}
            href={r.href}
            {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
              p: 2.5,
              borderRadius: "12px",
              border: "1px solid rgba(15,40,70,0.08)",
              bgcolor: "#fff",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: "rgba(0,114,188,0.45)",
                boxShadow: "0 12px 28px rgba(0,83,155,0.12)",
              },
              "&:hover .tile-icon": { bgcolor: "primary.main", color: "#fff" },
              "&:hover .tile-arrow": { transform: "translateX(4px)" },
            }}
          >
            <Box
              className="tile-icon"
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                bgcolor: "rgba(0,114,188,0.1)",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.18s ease, color 0.18s ease",
              }}
            >
              {r.icon}
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1.02rem", color: "text.primary", mt: 0.5 }}>
              {r.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.55, flex: 1 }}>
              {r.body}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "primary.main", fontWeight: 700, fontSize: "0.9rem", mt: 0.5 }}
            >
              {r.cta}
              <ArrowForwardIcon className="tile-arrow" sx={{ fontSize: 18, transition: "transform 0.18s ease" }} />
            </Box>
          </Box>
        </li>
      ))}
    </Box>
  );
}
