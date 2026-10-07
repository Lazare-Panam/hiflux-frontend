"use client";

import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

type ProductCardProps = {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  thumbnailImage?: string;
  tag?: string;
  materialBadge?: string;
  /** Destination for "View Range" — a real link so the card works in Server Components and is crawlable. */
  href: string;
};

export default function ProductCard({
  name, subtitle, description, thumbnailImage, tag, materialBadge, href,
}: ProductCardProps) {
  return (
    <Card variant="outlined" sx={{
      borderRadius: "14px", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden",
      bgcolor: "#fff", border: "1px solid rgba(15,40,70,0.08)", boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
      transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
      "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(0,114,188,0.35)", boxShadow: "0 18px 40px rgba(0,83,155,0.12)" },
      "&:hover .card-img": { transform: "scale(1.05)" },
      "& .MuiTypography-root": { textTransform: "none" },
    }}>
      <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "center",
        background: "linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)", p: 3, minHeight: 220,
      }}>
        <CardMedia component="img" image={thumbnailImage} alt={name}
          className="card-img"
          sx={{ width: "100%", maxWidth: 200, height: 180, objectFit: "contain", transition: "transform 0.35s ease" }} />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {tag && (
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2, fontSize: 10 }}>
            {tag}
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mt: 0.5, mb: 0.5, fontSize: "1.05rem" }}>
          {name}{subtitle ? ` — ${subtitle}` : ""}
        </Typography>
        {materialBadge && (
          <Box sx={{
            display: "inline-flex", alignItems: "center", bgcolor: "primary.light",
            border: (t) => `1px solid ${t.palette.primary.main}`, borderRadius: "999px", px: 1.2, py: 0.3, mb: 2,
          }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "primary.dark", letterSpacing: 0.5 }}>
              {materialBadge}
            </Typography>
          </Box>
        )}
        {description && (
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.75, fontSize: "0.88rem" }}>
            {description}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ p: 2.5, pt: 0, display: "flex", gap: 1 }}>
        <Button variant="contained" fullWidth disableElevation href={href}
          sx={{ borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", textTransform: "none", py: 1 }}>
          View range
        </Button>
        <Button variant="outlined" fullWidth href="/contact"
          sx={{ borderColor: "rgba(0,114,188,0.4)", color: "primary.main", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", textTransform: "none", py: 1 }}>
          Request quote
        </Button>
      </Box>
    </Card>
  );
}