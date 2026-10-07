"use client";

import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { BLUE_BG } from "@/theme/brand";

export type CtaButton = { label: string; href: string; external?: boolean };

const CATALOG_PDF = "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";

const DEFAULT_BUTTONS: CtaButton[] = [
  { label: "Request a Quote", href: "/contact" },
  { label: "Download the catalogue", href: CATALOG_PDF, external: true },
];

/**
 * The site-wide closing call to action: a rounded blue card with the brand
 * rings, heading + one line on the left, up to two buttons on the right.
 * Defaults match the /products banner so most pages need no props.
 */
export default function CtaBanner({
  heading = "Not sure which series you need?",
  body = "Send us the pressure, tube size and media and we'll come back with part numbers and a price.",
  buttons = DEFAULT_BUTTONS,
  sx,
}: {
  heading?: string;
  body?: string;
  buttons?: CtaButton[];
  sx?: object;
}) {
  return (
    <Box
      component="aside"
      aria-label={heading}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: "14px",
        background: BLUE_BG,
        color: "#fff",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { md: "center" },
        justifyContent: "space-between",
        gap: 3,
        boxShadow: "0 18px 40px rgba(0,83,155,0.18)",
        "& .MuiTypography-root": { textTransform: "none" },
        ...sx,
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        <Typography component="h2" sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" }, fontWeight: 800, color: "#fff" }}>
          {heading}
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.85)", mt: 0.75, lineHeight: 1.6 }}>{body}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", flexShrink: 0 }}>
        {buttons.slice(0, 2).map((b, i) => {
          const primary = i === 0;
          const sxBtn = primary
            ? { bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#e6f1f9" } }
            : { color: "#fff", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" } };
          const common = { fontWeight: 700, px: 3, py: 1.25, borderRadius: "8px", textTransform: "none", whiteSpace: "nowrap", ...sxBtn } as const;
          const internal = b.href.startsWith("/");
          return internal ? (
            <Button key={b.label} component={Link} href={b.href} variant={primary ? "contained" : "outlined"} disableElevation sx={common}>
              {b.label}
            </Button>
          ) : (
            <Button
              key={b.label}
              component="a"
              href={b.href}
              {...(b.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              variant={primary ? "contained" : "outlined"}
              disableElevation
              sx={common}
            >
              {b.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
