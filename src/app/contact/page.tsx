import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import ContactForm from "./ContactForm";
import ResourceTiles from "./ResourceTiles";
import { BLUE_BG } from "@/theme/brand";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact Hiflux UK | High-Pressure Valve Quotes & Help";
  const description =
    "Send your enquiry for HIFLUX high-pressure valves, fittings, tubing and regulators. We reply with part numbers, documentation and a price. Call +44 7369 243459.";
  const url = "https://www.hiflux.uk.com/contact";
  const images = [
    "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png",
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

// What a useful enquiry covers, so the team can quote without a back-and-forth.
const ENQUIRY_CHECKLIST = [
  "Product type and part number, if known (e.g. needle valve, NV60VS06-T)",
  "Working pressure (psi or bar) and temperature",
  "Tube size and connection (e.g. 9/16\" cone and thread, 1/4\" NPT)",
  "Media and application (e.g. hydrogen gas, hydraulic oil, process water)",
  "Quantity and delivery location",
  "Documentation you need (e.g. material certificates)",
];


const CONTENT_WIDTH = "1280px";
const h2Sx = { fontSize: { xs: "1.3rem", md: "1.5rem" }, fontWeight: 800, color: "text.primary", mb: 0.75 } as const;
const cardSx = {
  bgcolor: "#fff",
  border: "1px solid rgba(15,40,70,0.08)",
  borderRadius: "14px",
  p: { xs: 3, md: 4 },
  boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
} as const;

export default function ContactPage() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* ContactPage structured data — page-type signal for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Hiflux UK",
            url: "https://www.hiflux.uk.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Hiflux UK",
              url: "https://www.hiflux.uk.com",
              email: EMAIL,
              telephone: PHONE_DISPLAY,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: EMAIL,
                telephone: PHONE_DISPLAY,
                areaServed: ["GB", "EU"],
                availableLanguage: "English",
              },
            },
          }),
        }}
      />

      {/* Hero: same banner as the product pages (width, sizes, gradient) */}
      <Box
        component="section"
        sx={{
          color: "#fff",
          background: BLUE_BG,
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 5.5 },
        }}
      >
        <Box sx={{ maxWidth: CONTENT_WIDTH, mx: "auto" }}>
          <PageBreadcrumbs items={[{ label: "Contact Us" }]} />
          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.2em",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Contact Hiflux UK
          </Typography>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, lineHeight: 1.1, maxWidth: 820 }}
          >
            High-pressure valve quotes and technical help
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, mt: 1.5, maxWidth: 760, textTransform: "none" }}
          >
            Send us your requirements and we&apos;ll come back with the right HIFLUX part numbers, documentation
            and a price. Hiflux UK is an authorised UK &amp; EU distributor for HIFLUX Co., Ltd. of Korea.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#f3f6fa", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ maxWidth: CONTENT_WIDTH, mx: "auto", display: "grid", gap: { xs: 3, md: 4 } }}>
          {/* What to include: first, so people gather the details before writing */}
          <Box sx={cardSx}>
            <Typography component="h2" sx={h2Sx}>
              What to include in your enquiry
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 2.5, textTransform: "none" }}>
              The more of these you can share, the faster we can quote.
            </Typography>
            <Box
              component="ul"
              sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" } }}
            >
              {ENQUIRY_CHECKLIST.map((item) => (
                <Box
                  component="li"
                  key={item}
                  sx={{ display: "flex", gap: 1.25, alignItems: "flex-start", p: 1.75, borderRadius: "10px", bgcolor: "#f3f6fa", color: "text.primary", fontSize: "0.95rem", lineHeight: 1.5 }}
                >
                  <Box sx={{ width: 22, height: 22, flexShrink: 0, borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, mt: "1px" }}>
                    ✓
                  </Box>
                  {item}
                </Box>
              ))}
            </Box>
          </Box>

          <ContactForm />

          {/* Contact details live in the form's side panel; this row is only next steps. */}
          <Box sx={cardSx}>
            <Typography component="h2" sx={h2Sx}>
              Before you enquire
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 2.5, textTransform: "none" }}>
              Most questions are answered in the catalogue and our guides.
            </Typography>
            <ResourceTiles />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
