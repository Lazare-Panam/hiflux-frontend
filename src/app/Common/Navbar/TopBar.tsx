import { Box } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "tel:+447369243459";
const EMAIL = "sales@hiflux.uk.com";
const CATALOG_PDF =
  "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";

const linkSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  color: "#fff",
  textDecoration: "none",
  fontSize: "0.78rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  "&:hover": { textDecoration: "underline" },
} as const;

// Slim contact strip above the main navbar (scrolls away; the AppBar below
// stays sticky).
export default function TopBar() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "#fff" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 2, md: 8 },
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box component="a" href={PHONE_HREF} sx={linkSx}>
            <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
            {PHONE_DISPLAY}
          </Box>
          <Box
            component="a"
            href={`mailto:${EMAIL}`}
            sx={{ ...linkSx, display: { xs: "none", sm: "inline-flex" } }}
          >
            <MailOutlineIcon sx={{ fontSize: 16 }} />
            {EMAIL}
          </Box>
        </Box>
        <Box
          component="a"
          href={CATALOG_PDF}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ ...linkSx, fontWeight: 700 }}
        >
          <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Download E-Catalogue (PDF)
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            Catalogue
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
