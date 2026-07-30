"use client";

import { Box, Typography, IconButton, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Latest News", href: "/news" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    heading: "High Pressure Valves",
    links: [
      {
        label: "Needle Valve",
        href: "/products/high-pressure-valves/ndl-ultra-100k",
      },
      {
        label: "Check Valve",
        href: "/products/high-pressure-valves/chk-ultra-100k",
      },
      {
        label: "Ball Valve",
        href: "/products/high-pressure-valves/ball-med-20k",
      },
      {
        label: "Air Operated Valve",
        href: "/products/high-pressure-valves/aov-nc-60k",
      },
      {
        label: "Safety Valve",
        href: "/products/high-pressure-valves/saf-rel-factory-60k",
      },
    ],
  },
  {
    heading: "High Pressure Fittings & Tubing",
    links: [
      {
        label: "Fitting",
        href: "/products/high-pressure-fittings/fit-ultra-150k",
      },
      {
        label: "Fitting Accessory",
        href: "/products/high-pressure-fittings/acc-ultra-150k",
      },
      {
        label: "Manifold Block",
        href: "/products/high-pressure-fittings/mfb-high-60k",
      },
      { label: "Tube", href: "/products/high-pressure-tubing/tube-ultra-100k" },
      {
        label: "Nipple",
        href: "/products/high-pressure-tubing/nip-ultra-100k",
      },
    ],
  },
];

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #00539B 55%, #062940 100%)`,
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr" },
          gap: { xs: 5, md: 4 },
        }}
      >
        {/* brand + contact */}
        <Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <Box sx={{ position: "relative", width: 120, height: 40 }}>
              <Image
                src="https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png"
                alt="Hiflux logo"
                fill
                style={{ objectFit: "contain", objectPosition: "left" }}
                sizes="120px"
              />
            </Box>
          </Box>

          <Typography
            sx={{ fontSize: "0.85rem", lineHeight: 1.7, mb: 3, maxWidth: 320 }}
          >
            High pressure valves, fittings, and tubing engineered for demanding
            industrial applications — precision built, every time.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailOutlinedIcon
                sx={{ fontSize: 16, color: "primary.light" }}
              />
              <Typography sx={{ fontSize: "0.85rem" }}>
                sales@hiflux.co.uk
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneOutlinedIcon
                sx={{ fontSize: 16, color: "primary.light" }}
              />
              <Typography sx={{ fontSize: "0.85rem" }}>
                +44 1234 567890
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <LocationOnOutlinedIcon
                sx={{ fontSize: 16, color: "primary.light", mt: 0.2 }}
              />
              <Typography sx={{ fontSize: "0.85rem" }}>
                United Kingdom
              </Typography>
            </Box>
          </Box>

          <Box
            component="a"
            href="https://ukhea.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HEA"
            sx={{ display: "inline-flex", alignItems: "center", mt: 3 }}
          >
            <Image
              src="https://cdn.jsdelivr.net/gh/Lazare-Panam/panam-images@main/certificates/HEA_SumbolAsset-13%20(1).png"
              alt="HEA"
              width={38}
              height={38}
              style={{ objectFit: "contain", height: 38, width: "auto" }}
            />
          </Box>
        </Box>

        {/* link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <Box key={col.heading}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              {col.heading}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {col.links.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    "&:hover": { color: "primary.light" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* bottom bar */}
      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}
          >
            © {new Date().getFullYear()} Hiflux. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              component={Link}
              href="#"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "primary.light" },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "primary.light" },
              }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "primary.light" },
              }}
            >
              <XIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
