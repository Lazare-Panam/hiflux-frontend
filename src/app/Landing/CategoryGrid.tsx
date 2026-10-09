"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CATEGORIES } from "../products/data/categories";
import { PRODUCT_STAGE } from "@/theme/brand";

// Category cards directly under the hero: an even 3 x 2 grid (one card per
// category), each with the product on a soft blue stage, its headline facts and a short description.
export default function CategoryGrid() {
  return (
    <Box component="section" sx={{ bgcolor: "#fff", py: { xs: 7, md: 10 }, px: { xs: 2, md: 8 }, "& .MuiTypography-root": { textTransform: "none" } }}>
      <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
        {/* Heading row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
            alignItems: "end",
            gap: { xs: 2.5, md: 6 },
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box>
            <Typography sx={{ color: "primary.main", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important", mb: 1.25 }}>
              Our range
            </Typography>
            <Typography component="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.6rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              High-pressure products by category
            </Typography>
            {/* Copy carried over from the former "The range" section. */}
            <Typography sx={{ mt: 1.75, color: "text.secondary", fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.75, maxWidth: 720 }}>
              <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                Six categories, from 150,000 psi cone and thread to LOK double-ferrule fittings.
              </Box>{" "}
              All in cold-formed stainless steel 316 as standard, with Hastelloy, Inconel 600/625/825, Nickel 200 and
              Titanium available where the service requires them.
            </Typography>
          </Box>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2.75,
                py: 1.25,
                borderRadius: "999px",
                border: "1.5px solid",
                borderColor: "primary.main",
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.92rem",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s ease, color 0.2s ease",
                "&:hover": { bgcolor: "primary.main", color: "#fff" },
              }}
            >
              Browse all products <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Box>
          </Link>
        </Box>

        {/* 3 x 2 grid */}
        <Box sx={{ display: "grid", gap: { xs: 2.5, md: 3 }, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" } }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={cat.href} style={{ textDecoration: "none", display: "block" }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "22px",
                  bgcolor: "#fff",
                  border: "1px solid rgba(15,40,70,0.08)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  "&:hover": { transform: "translateY(-6px)", borderColor: "rgba(0,114,188,0.3)", boxShadow: "0 24px 50px rgba(0,83,155,0.14)" },
                  "&:hover .cat-img": { transform: "scale(1.08) rotate(-2deg)" },
                  "&:hover .cat-go": { bgcolor: "primary.main", color: "#fff", transform: "translateX(3px)" },
                  "&:hover .cat-stage": { background: "radial-gradient(circle at 50% 60%, #ffffff 0%, #e2edf8 70%)" },
                }}
              >
                {/* Product stage */}
                <Box
                  className="cat-stage"
                  sx={{
                    position: "relative",
                    height: { xs: 210, md: 230 },
                    background: PRODUCT_STAGE,
                    transition: "background 0.3s ease",
                  }}
                >
                  {cat.facts?.[1] && (
                    <Box component="span" sx={{ position: "absolute", top: 16, right: 16, px: 1.25, py: 0.45, borderRadius: "999px", bgcolor: "#fff", boxShadow: "0 4px 12px rgba(15,40,70,0.08)", color: "primary.dark", fontSize: "0.75rem", fontWeight: 800 }}>
                      {cat.facts[1]}
                    </Box>
                  )}
                  <Image
                    className="cat-img"
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 900px) 90vw, 400px"
                    style={{ objectFit: "contain", padding: "40px 48px 28px", mixBlendMode: "multiply", transition: "transform 0.45s ease" }}
                  />
                </Box>

                {/* Text */}
                <Box sx={{ p: { xs: 2.5, md: 3 }, display: "flex", flexDirection: "column", flex: 1 }}>
                  {cat.facts?.[0] && (
                    <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase !important" }}>
                      {cat.facts[0]}
                    </Typography>
                  )}
                  <Typography component="h3" sx={{ mt: 0.75, fontWeight: 800, fontSize: { xs: "1.15rem", md: "1.25rem" }, color: "text.primary", lineHeight: 1.25 }}>
                    {cat.label}
                  </Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.65, flex: 1 }}>{cat.description}</Typography>
                  <Box sx={{ mt: 2.25, pt: 2, borderTop: "1px solid rgba(15,40,70,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.92rem" }}>View range</Typography>
                    <Box
                      className="cat-go"
                      aria-hidden
                      sx={{ width: 38, height: 38, borderRadius: "50%", bgcolor: "rgba(0,114,188,0.08)", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}
                    >
                      <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
