import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { BLUE_BG } from "@/theme/brand";
import CertificationsGallery from "./CertificationsGallery";

const TITLE = "HIFLUX Certifications: ISO 9001, KS, PED & ATEX | Hiflux UK";
const DESCRIPTION =
  "Download HIFLUX certificates: ISO 9001, ISO 14001 and ISO 45001, KS certification for hydrogen station valves (KGS-23-0003), PED for the DN 32 needle valve and ATEX relief valve documents.";
const URL = "https://www.hiflux.uk.com/certifications";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", siteName: "Hiflux UK", title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const CONTENT_WIDTH = "1280px";

export default function CertificationsPage() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box component="section" sx={{ color: "#fff", background: BLUE_BG, px: { xs: 2, md: 4 }, py: { xs: 4, md: 5.5 } }}>
        <Box sx={{ maxWidth: CONTENT_WIDTH, mx: "auto" }}>
          <PageBreadcrumbs items={[{ label: "Certifications" }]} />
          <Typography
            sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", mb: 1 }}
          >
            HIFLUX Co., Ltd.
          </Typography>
          <Typography component="h1" sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, lineHeight: 1.1, maxWidth: 820 }}>
            Certifications
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, mt: 1.5, maxWidth: 760, textTransform: "none" }}
          >
            Management system, product and hydrogen certificates held by the manufacturer, HIFLUX Co., Ltd. of Daejeon,
            Korea. Select a certificate to open the full PDF.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#f3f6fa", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ maxWidth: CONTENT_WIDTH, mx: "auto" }}>
          <CertificationsGallery />

          <Box
            sx={{
              mt: { xs: 4, md: 5 },
              p: { xs: 2.5, md: 3 },
              bgcolor: "#fff",
              border: "1px solid rgba(15,40,70,0.08)",
              borderLeft: "4px solid",
              borderLeftColor: "primary.main",
              borderRadius: "12px",
            }}
          >
            <Typography component="h2" sx={{ fontWeight: 800, fontSize: "1.05rem", color: "text.primary", mb: 0.75, textTransform: "none" }}>
              Check the scope before you rely on a certificate
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.7, textTransform: "none" }}>
              Each certificate covers only the products or activities written on it. The PED certificate covers the
              DN 32 needle valve, and the ATEX documents are notified-body receipts of technical files for the relief
              valve models listed. Material certificates and other documents for a specific order are available on
              request.
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
