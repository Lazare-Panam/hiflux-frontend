import type { Metadata } from "next";
import { Box, Container, Typography, Divider, Button } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "+447369243459";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact Hiflux UK | High-Pressure Valve Enquiries";
  const description =
    "Contact Hiflux UK about high-pressure valves, fittings, tubing and hydrogen flow-control. Email sales@hiflux.uk.com or call +44 7369 243459.";
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

const CONTACT_METHODS = [
  {
    icon: <EmailOutlinedIcon fontSize="small" />,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <PhoneOutlinedIcon fontSize="small" />,
    label: "Phone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_HREF}`,
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="small" />,
    label: "Coverage",
    value: "United Kingdom & EU",
    href: undefined,
  },
];

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

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          color: "#fff",
          background:
            "linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="span"
            sx={{
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Contact Hiflux UK
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.1rem", md: "3rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              mt: 1.5,
              mb: 3,
            }}
          >
            Talk to us about high-pressure flow control.
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 640,
            }}
          >
            Whether you need help selecting a valve for a specific pressure
            rating, a quote for high-pressure fittings and tubing, or advice on
            hydrogen-ready components, the Hiflux UK team is here to help.
          </Typography>
        </Container>
      </Box>

      {/* Contact methods */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.6rem", md: "2rem" },
            fontWeight: 800,
            color: "text.primary",
            mb: 4,
          }}
        >
          How to reach us
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {CONTACT_METHODS.map((method) => (
            <Box key={method.label} sx={{ display: "flex", gap: 1.5 }}>
              <Box sx={{ mt: 0.3, color: "primary.main" }}>{method.icon}</Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                  }}
                >
                  {method.label}
                </Typography>
                {method.href ? (
                  <Box
                    component="a"
                    href={method.href}
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "text.primary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {method.value}
                  </Box>
                ) : (
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 600, color: "text.primary" }}
                  >
                    {method.value}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 6, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            disableElevation
            href={`mailto:${EMAIL}`}
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              fontWeight: 800,
              borderRadius: 0,
              px: 3,
              py: 1.2,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Email the team
          </Button>
          <Button
            variant="outlined"
            href={`tel:${PHONE_HREF}`}
            sx={{
              color: "text.primary",
              borderColor: "rgba(0,0,0,0.2)",
              borderRadius: 0,
              px: 3,
              "&:hover": { borderColor: "primary.main", bgcolor: "rgba(0,0,0,0.02)" },
            }}
          >
            Call {PHONE_DISPLAY}
          </Button>
        </Box>
      </Container>

      <Divider />
    </Box>
  );
}
