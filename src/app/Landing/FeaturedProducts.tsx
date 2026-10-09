"use client";

import { Box, Typography } from "@mui/material";
import { PRODUCT_STAGE } from "@/theme/brand";
import { keyframes } from "@mui/material/styles";
import Image from "next/image";

interface FeaturedValve {
  code: string;
  name: string;
  type: string;
  pressureLabel: string;
  connectionType: string;
  description: string;
  image: string;
}

const FEATURED_VALVES: FeaturedValve[] = [
  {
    code: "ndl-ultra-150k",
    name: "Ultra High Pressure Needle Valve",
    type: "Needle Valve",
    pressureLabel: "Up to 150,000 psi",
    connectionType: "UNF",
    description:
      "Extreme duty needle valve for research and test applications.",
    image:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
  },
  {
    code: "fit-ultra-150k",
    name: "Ultra High Pressure Fitting",
    type: "Fitting",
    pressureLabel: "Up to 150,000 psi",
    connectionType: "UNF",
    description: "Rated for the most extreme high pressure applications.",
    image: "https://pblol2.blob.core.windows.net/hiflux/images/rf.jpeg",
  },
  {
    code: "ndl-ultra-100k",
    name: "Ultra High Pressure Needle Valve",
    type: "Needle Valve",
    pressureLabel: "Up to 100,000 psi",
    connectionType: "UNF",
    description: "Ultra high pressure needle valve for extreme environments.",
    image:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
  },
  {
    code: "chk-ultra-100k",
    name: "Ultra High Pressure Check Valve",
    type: "Check Valve",
    pressureLabel: "Up to 100,000 psi",
    connectionType: "UNF",
    description: "Rated to 100,000 psi for extreme applications.",
    image:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/check-valve.png",
  },
  {
    code: "fit-ultra-100k",
    name: "Ultra High Pressure Fitting",
    type: "Fitting",
    pressureLabel: "Up to 100,000 psi",
    connectionType: "UNF",
    description: "Ultra high pressure fitting for extreme applications.",
    image: "https://pblol2.blob.core.windows.net/hiflux/images/rf.jpeg",
  },
  {
    code: "acc-ultra-150k",
    name: "Ultra High Pressure Fitting Accessory",
    type: "Fitting Accessory",
    pressureLabel: "Up to 150,000 psi",
    connectionType: "UNF",
    description: "Accessory rated to 150,000 psi.",
    image: "https://pblol2.blob.core.windows.net/hiflux/images/nb.jpeg",
  },
  {
    code: "ndl-3way-60k",
    name: "3-Way 2-Stem Needle Valve",
    type: "Needle Valve",
    pressureLabel: "60,000 psi",
    connectionType: "UNF",
    description: "Multi-port flow control at 60,000 psi.",
    image:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
  },
  {
    code: "saf-rupt-60k",
    name: "High Pressure Rupture Disc",
    type: "Safety Valve",
    pressureLabel: "Up to 60,000 psi",
    connectionType: "UNF",
    description: "Burst protection rated to 60,000 psi.",
    image:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/rupture-disc.png",
  },
];

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

function FeaturedCard({ valve }: { valve: FeaturedValve }) {
  return (
    <Box
      sx={{
        width: 290,
        flexShrink: 0,
        bgcolor: "#fff",
        borderRadius: "22px",
        border: "1px solid rgba(15,40,70,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": { transform: "translateY(-6px)", boxShadow: "0 24px 50px rgba(0,83,155,0.14)" },
        "&:hover .feat-img": { transform: "scale(1.08) rotate(-2deg)" },
        "& .MuiTypography-root": { textTransform: "none" },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: 200, background: PRODUCT_STAGE }}>
        <Image
          className="feat-img"
          src={valve.image}
          alt={valve.name}
          fill
          style={{ objectFit: "contain", padding: "34px 40px 24px", mixBlendMode: "multiply", transition: "transform 0.45s ease" }}
          sizes="290px"
        />
        <Box
          component="span"
          sx={{ position: "absolute", top: 14, right: 14, px: 1.25, py: 0.45, borderRadius: "999px", bgcolor: "#fff", boxShadow: "0 4px 12px rgba(15,40,70,0.08)", color: "primary.dark", fontSize: "0.74rem", fontWeight: 800 }}
        >
          {valve.pressureLabel}
        </Box>
      </Box>

      <Box sx={{ p: 2.75, flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: "primary.main", letterSpacing: "0.14em", textTransform: "uppercase !important" }}>
          {valve.type}
        </Typography>
        <Typography sx={{ mt: 0.75, fontSize: "1.05rem", fontWeight: 800, color: "text.primary", lineHeight: 1.3 }}>{valve.name}</Typography>
        <Typography sx={{ mt: 0.75, fontSize: "0.88rem", color: "text.secondary", lineHeight: 1.6 }}>{valve.description}</Typography>
      </Box>
    </Box>
  );
}

export default function FeaturedProducts() {
  const track = [...FEATURED_VALVES, ...FEATURED_VALVES];

  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f3f6fa" }}
    >
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, mb: 5 }}>
        <Typography
          component="span"
          sx={{
            color: "primary.main",
            letterSpacing: "0.3em",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Featured Range
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.5rem" },
            fontWeight: 800,
            color: "text.primary",
            mt: 1,
            textTransform: "none",
          }}
        >
          Built for every line, every condition.
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            width: "max-content",
            px: 3,
            py: 2,
            animation: `${scroll} 35s linear infinite`,
            "&:hover": { animationPlayState: "paused" },
          }}
        >
          {track.map((valve, i) => (
            <FeaturedCard key={`${valve.code}-${i}`} valve={valve} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
