import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const HEA_LOGO =
  "https://pblol2.blob.core.windows.net/hiflux/catalogs/Hiflux_HEA_framed.png";
const HEA_PDF =
  "https://pblol2.blob.core.windows.net/hiflux/catalogs/Hiflux_HEA.pdf";

export default function HeaMembership() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#FAF6F4" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* left: writing */}
        <Box sx={{ flex: 1 }}>
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Industry Membership
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.4rem" },
              fontWeight: 800,
              color: "text.primary",
              lineHeight: 1.15,
              mt: 1,
              mb: 2.5,
            }}
          >
            Proud member of the Hydrogen Energy Association
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 3, maxWidth: 560 }}
          >
            Hiflux UK is a member of the Hydrogen Energy Association (HEA), reflecting our
            focus on safe, reliable high-pressure flow-control for hydrogen production,
            storage, distribution and refuelling. Through the HEA we stay connected to the
            standards and developments shaping the UK hydrogen sector.
          </Typography>
          <Button
            component="a"
            href={HEA_PDF}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              py: 1.25,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            View our HEA membership
          </Button>
        </Box>

        {/* right: framed membership certificate */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: { xs: "center", md: "flex-end" }, width: "100%" }}>
          <Image
            src={HEA_LOGO}
            alt="Hiflux UK Hydrogen Energy Association membership certificate"
            width={2400}
            height={1560}
            sizes="(max-width: 900px) 85vw, 390px"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 390,
              borderRadius: 4,
              filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.20))",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
