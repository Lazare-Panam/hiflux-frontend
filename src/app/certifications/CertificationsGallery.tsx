"use client";

import { useState } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import { CERT_BASE, CERT_GROUPS, CERTIFICATIONS, type Cert, type CertGroup } from "./data";

// Certificate board in the style of hiflux.net: category tabs over an image
// grid with short captions. A card opens a viewer with the full details and
// the PDF.
export default function CertificationsGallery() {
  const [group, setGroup] = useState<CertGroup | "all">("all");
  const [open, setOpen] = useState<Cert | null>(null);
  const certs = group === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.group === group);

  return (
    <Box>
      {/* Tabs */}
      <Box
        role="tablist"
        aria-label="Certificate type"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          border: "1px solid rgba(15,40,70,0.12)",
          borderRadius: "10px",
          overflow: "hidden",
          bgcolor: "#fff",
          maxWidth: 820,
          mx: "auto",
        }}
      >
        {CERT_GROUPS.map((g, i) => {
          const active = g.id === group;
          const count = g.id === "all" ? CERTIFICATIONS.length : CERTIFICATIONS.filter((c) => c.group === g.id).length;
          return (
            <Box
              key={g.id}
              component="button"
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setGroup(g.id)}
              sx={{
                cursor: "pointer",
                border: 0,
                borderLeft: { md: i === 0 ? 0 : "1px solid rgba(15,40,70,0.12)" },
                py: 1.5,
                px: 1,
                bgcolor: active ? "primary.main" : "transparent",
                color: active ? "#fff" : "text.primary",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: { xs: "0.82rem", sm: "0.92rem" },
                whiteSpace: "nowrap",
                borderTop: { xs: i >= 2 ? "1px solid rgba(15,40,70,0.12)" : 0, md: 0 },
                transition: "background-color 0.2s ease, color 0.2s ease",
                "&:hover": { bgcolor: active ? "primary.main" : "rgba(0,114,188,0.06)" },
              }}
            >
              {g.label}
              <Box component="span" sx={{ ml: 0.75, opacity: 0.7, fontWeight: 600 }}>
                {count}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Grid */}
      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          display: "grid",
          gap: { xs: 2.5, md: 3.5 },
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        }}
      >
        {certs.map((c) => (
          <Box
            key={c.id}
            id={c.id}
            component="button"
            type="button"
            onClick={() => setOpen(c)}
            aria-label={`View ${c.title}`}
            sx={{
              scrollMarginTop: 120,
              width: "100%",
              minWidth: 0,
              p: 0,
              border: 0,
              bgcolor: "transparent",
              textAlign: "left",
              fontFamily: "inherit",
              cursor: "zoom-in",
              display: "flex",
              flexDirection: "column",
              "&:hover .cert-frame": { transform: "translateY(-6px)", boxShadow: "0 22px 44px rgba(0,83,155,0.18)" },
              "&:hover .cert-zoom": { opacity: 1 },
              "&:hover .cert-name": { color: "primary.main" },
            }}
          >
            <Box
              className="cert-frame"
              sx={{
                position: "relative",
                bgcolor: "#fff",
                p: { xs: 1, md: 1.5 },
                borderRadius: "6px",
                boxShadow: "0 8px 24px rgba(15,40,70,0.10)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <Box
                component="img"
                src={c.image}
                alt={`${c.title}, certificate ${c.number}`}
                loading="lazy"
                sx={{ display: "block", width: "100%", aspectRatio: "1 / 1.414", objectFit: "cover", objectPosition: "top" }}
              />
              <Box
                className="cert-zoom"
                sx={{
                  position: "absolute",
                  right: 14,
                  bottom: 14,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                  boxShadow: "0 6px 16px rgba(0,83,155,0.35)",
                }}
              >
                <ZoomInOutlinedIcon sx={{ fontSize: 22 }} />
              </Box>
            </Box>
            <Box sx={{ pt: 2, px: 0.25 }}>
              <Typography
                sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase !important" }}
              >
                {c.badge}
              </Typography>
              <Typography
                className="cert-name"
                component="h3"
                sx={{ mt: 0.5, fontWeight: 700, fontSize: { xs: "0.9rem", md: "0.98rem" }, lineHeight: 1.35, color: "text.primary", textTransform: "none", transition: "color 0.2s ease" }}
              >
                {c.name}
              </Typography>
              <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.8rem", textTransform: "none" }}>No. {c.number}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Viewer */}
      <Dialog
        open={!!open}
        onClose={() => setOpen(null)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: "16px", overflow: "hidden" } } }}
      >
        {open && (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" } }}>
            <Box sx={{ bgcolor: "#eef2f7", p: { xs: 2.5, md: 3.5 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box
                component="img"
                src={open.image}
                alt={`${open.title}, certificate ${open.number}`}
                sx={{ display: "block", width: "100%", maxWidth: 400, bgcolor: "#fff", boxShadow: "0 12px 30px rgba(15,40,70,0.18)" }}
              />
            </Box>
            <Box sx={{ position: "relative", p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
              <IconButton aria-label="Close" onClick={() => setOpen(null)} sx={{ position: "absolute", top: 10, right: 10 }}>
                <CloseIcon />
              </IconButton>
              <Box>
                <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase !important" }}>
                  {open.badge}
                </Typography>
                <Typography component="h2" sx={{ mt: 0.75, pr: 4, fontWeight: 800, fontSize: "1.25rem", lineHeight: 1.3, textTransform: "none" }}>
                  {open.title}
                </Typography>
              </Box>
              <Box component="dl" sx={{ m: 0, display: "grid", gap: 1.5 }}>
                {[
                  ["Issued by", open.issuer],
                  ["Certificate no.", open.number],
                  ["Scope", open.scope],
                  ["Validity", open.validity],
                ].map(([k, v]) => (
                  <Box key={k} sx={{ borderTop: "1px solid rgba(15,40,70,0.08)", pt: 1.25 }}>
                    <Typography component="dt" sx={{ color: "text.secondary", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase !important" }}>
                      {k}
                    </Typography>
                    <Typography component="dd" sx={{ m: 0, mt: 0.25, fontSize: "0.92rem", lineHeight: 1.55, color: "text.primary", textTransform: "none" }}>
                      {v}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                component="a"
                href={CERT_BASE + open.file}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: "auto",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2.5,
                  py: 1.2,
                  borderRadius: "8px",
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <DownloadOutlinedIcon sx={{ fontSize: 20 }} /> Download PDF
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
