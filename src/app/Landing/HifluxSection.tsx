"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { BLUE_BG } from "@/theme/brand";

const POINTS = [
  {
    Icon: LocalShippingOutlinedIcon,
    title: "Direct from the factory",
    text: "Supplied direct from the HIFLUX factory with lead times quoted up front.",
  },
  {
    Icon: VerifiedOutlinedIcon,
    title: "Documented and traceable",
    text: "Every HIFLUX product we supply comes with manufacturer material certification traceable to the batch. On a high pressure line, that documentation matters as much as the component. Tell us the series and quantity and we will send the certificates with your quote.",
  },
  {
    Icon: SupportAgentOutlinedIcon,
    title: "UK and EU support",
    text: "The technical and documentation support a UK or EU project needs, from choosing a series to the paperwork.",
  },
];

const FACTS = [
  { value: "Since 2010", label: "Manufacturing high-pressure parts", pos: { top: { md: 28 }, left: { md: -28 } } },
  { value: "Hydrogen Specialist", label: "Designated by Korea's MOTIE", pos: { top: { md: "44%" }, right: { md: -24 } } },
  { value: "Up to 150,000 psi", label: "Fittings and valves", pos: { bottom: { md: 28 }, left: { md: 24 } } },
];

export default function HifluxSection() {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 11 }, bgcolor: "#fff", overflow: "hidden" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
          gap: { xs: 6, md: 10 },
          alignItems: "center",
          "& .MuiTypography-root": { textTransform: "none" },
        }}
      >
        {/* Copy */}
        <Box>
          <Typography sx={{ color: "primary.main", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
            Who we are
          </Typography>
          <Typography component="h2" sx={{ fontSize: { xs: "2rem", md: "2.7rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.12, letterSpacing: "-0.02em", mt: 1.25, mb: 2.5 }}>
            The UK and EU arm of HIFLUX Co., Ltd
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8 }}>
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              Hiflux UK
            </Box>{" "}
            is an authorised UK and EU distributor for HIFLUX Co., Ltd of Daejeon, South Korea — a manufacturer of
            ultra high-pressure valves, fittings and tubing since 2010, and a designated Hydrogen Specialist Company
            under Korea&apos;s Ministry of Trade, Industry and Energy.
          </Typography>

          <Box sx={{ mt: 4, display: "grid", gap: 1.5 }}>
            {POINTS.map(({ Icon, title, text }) => (
              <Box
                key={title}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2.25,
                  borderRadius: "14px",
                  border: "1px solid rgba(15,40,70,0.08)",
                  bgcolor: "#fff",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                  "&:hover": { borderColor: "rgba(0,114,188,0.3)", boxShadow: "0 12px 28px rgba(0,83,155,0.08)", transform: "translateX(4px)" },
                }}
              >
                <Box sx={{ flexShrink: 0, width: 44, height: 44, borderRadius: "12px", bgcolor: "rgba(0,114,188,0.08)", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon sx={{ fontSize: 23 }} />
                </Box>
                <Box>
                  <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.02rem", color: "text.primary", lineHeight: 1.3 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.65 }}>{text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Link href="/about" style={{ textDecoration: "none" }}>
            <Box
              component="span"
              sx={{
                mt: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 3,
                py: 1.3,
                borderRadius: "999px",
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                transition: "background-color 0.2s ease",
                "&:hover": { bgcolor: "primary.dark" },
                "&:hover svg": { transform: "translateX(3px)" },
              }}
            >
              About Hiflux UK
              <ArrowForwardIcon sx={{ fontSize: 18, transition: "transform 0.2s ease" }} />
            </Box>
          </Link>
        </Box>

        {/* Visual: product on a blue panel with floating facts */}
        <Box sx={{ position: "relative", px: { md: 3 } }}>
          <Box sx={{ position: "relative", borderRadius: "28px", background: BLUE_BG, p: { xs: 3, md: 5 }, minHeight: { md: 520 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ position: "relative", width: "100%", maxWidth: 380, aspectRatio: "1 / 1", bgcolor: "#fff", borderRadius: "22px", boxShadow: "0 30px 60px rgba(0,25,60,0.35)" }}>
              <Image
                src="https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png"
                alt="Hiflux high pressure needle valve"
                fill
                style={{ objectFit: "contain", padding: "36px" }}
                sizes="(max-width: 768px) 90vw, 380px"
              />
            </Box>
          </Box>

          {/* Facts: floating on desktop, a row under the panel on phones */}
          <Box sx={{ display: { xs: "grid", md: "block" }, gridTemplateColumns: "repeat(3, 1fr)", gap: 1, mt: { xs: 1.5, md: 0 } }}>
            {FACTS.map((f) => (
              <Box
                key={f.value}
                sx={{
                  position: { md: "absolute" },
                  ...f.pos,
                  bgcolor: "#fff",
                  borderRadius: "14px",
                  px: { xs: 1.25, md: 2 },
                  py: { xs: 1.25, md: 1.5 },
                  boxShadow: { xs: "0 1px 2px rgba(15,40,70,0.06)", md: "0 16px 36px rgba(0,25,60,0.18)" },
                  border: { xs: "1px solid rgba(15,40,70,0.08)", md: 0 },
                  minWidth: { md: 190 },
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.85rem", md: "1rem" }, color: "primary.dark", lineHeight: 1.25 }}>{f.value}</Typography>
                <Typography sx={{ fontSize: { xs: "0.72rem", md: "0.8rem" }, color: "text.secondary", lineHeight: 1.35 }}>{f.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
