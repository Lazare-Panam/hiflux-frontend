import { Box, Typography } from "@mui/material";
import Image from "next/image";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Optimized, self-hosted certificate (640x416 WebP, ~10KB) replacing the
// 2.4MB source PNG that was only ever displayed at <=640px.
const HEA_CERT = "/Hiflux_HEA_framed.webp";
const HEA_LOGO = "/hea-logo.png";
const HEA_PDF = "https://pblol2.blob.core.windows.net/hiflux/catalogs/Hiflux_HEA.pdf";

const FOCUS = ["Production", "Storage", "Distribution", "Refuelling"];

export default function HeaMembership() {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 11 }, bgcolor: "#fff", "& .MuiTypography-root": { textTransform: "none" } }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
          alignItems: "center",
          gap: { xs: 5, md: 9 },
        }}
      >
        {/* Copy */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "14px", bgcolor: "#fff", border: "1px solid rgba(15,40,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Image src={HEA_LOGO} alt="Hydrogen Energy Association" width={34} height={34} style={{ objectFit: "contain" }} />
            </Box>
            <Box>
              <Typography sx={{ color: "primary.main", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
                Industry membership
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 600 }}>Member 2026–27</Typography>
            </Box>
          </Box>
          <Typography component="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.6rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Proud member of the Hydrogen Energy Association
          </Typography>
          <Typography sx={{ mt: 2.5, color: "text.secondary", fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.8, maxWidth: 560 }}>
            Hiflux UK is a member of the Hydrogen Energy Association (HEA), reflecting our focus on safe, reliable
            high-pressure flow-control for hydrogen production, storage, distribution and refuelling. Through the HEA we
            stay connected to the standards and developments shaping the UK hydrogen sector.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {FOCUS.map((f) => (
              <Box
                key={f}
                component="span"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.5, py: 0.6, borderRadius: "999px", bgcolor: "#f3f6fa", color: "text.primary", fontSize: "0.85rem", fontWeight: 700 }}
              >
                <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#4fb3a9" }} />
                {f}
              </Box>
            ))}
          </Box>

          <Box
            component="a"
            href={HEA_PDF}
            target="_blank"
            rel="noopener noreferrer"
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
              textDecoration: "none",
              transition: "background-color 0.2s ease",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            View our HEA membership
            <OpenInNewIcon sx={{ fontSize: 17 }} />
          </Box>
        </Box>

        {/* Certificate photo: full column width, rounded, soft shadow */}
        <Box sx={{ borderRadius: "22px", overflow: "hidden", boxShadow: "0 24px 50px rgba(0,30,70,0.14)", lineHeight: 0, background: "linear-gradient(135deg, #dce9f6 0%, #c9dcf0 100%)" }}>
          <Image
            src={HEA_CERT}
            alt="Hiflux UK Hydrogen Energy Association membership certificate"
            width={640}
            height={416}
            sizes="(max-width: 900px) 90vw, 620px"
            // Multiply tints the photo's grey wall blue; the white certificate stays light.
            style={{ width: "100%", height: "auto", display: "block", mixBlendMode: "multiply", filter: "brightness(1.12) contrast(1.05)" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
