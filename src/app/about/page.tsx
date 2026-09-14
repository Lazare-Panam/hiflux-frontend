import type { Metadata } from "next";
import { Box, Container, Typography, Divider, Button } from "@mui/material";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SpeedIcon from "@mui/icons-material/Speed";
import CategoryIcon from "@mui/icons-material/Category";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Hiflux UK | Exclusive UK & EU High-Pressure Valve Distributor",
    description:
      "Hiflux UK is the exclusive UK & EU distributor of high-pressure valves, fittings, tubing and hydrogen-ready flow-control components rated up to 150,000 psi — supplied tested and fully traceable from a single source.",
  };
}

const CERTIFICATIONS = [
  {
    icon: <VerifiedIcon fontSize="small" />,
    title: "ISO 9001 & PED Compliant",
    desc: "Quality-managed to ISO 9001, with products conforming to the EU Pressure Equipment Directive (PED 2014/68/EU) for high-pressure service.",
  },
  {
    icon: <PrecisionManufacturingIcon fontSize="small" />,
    title: "Rated to 150,000 psi",
    desc: "From standard 15k psi lines to extreme 150k psi research and test applications.",
  },
  {
    icon: <SpeedIcon fontSize="small" />,
    title: "100% Pressure Tested Pre-Ship",
    desc: "Every valve we ship is pressure-tested to the exact rating stamped on it, not a marketing estimate.",
  },
  {
    icon: <CategoryIcon fontSize="small" />,
    title: "Full System Coverage",
    desc: "Valves, fittings, manifolds and safety components engineered to work as one system.",
  },
];

const PRODUCT_LINES = [
  {
    label: "High Pressure Valves",
    desc: "Needle, check, ball, air operated, safety, and special valves for industrial, hydrogen, and extreme service applications.",
    href: "/products/high-pressure-valves",
  },
  {
    label: "High Pressure Fittings",
    desc: "Fittings, accessories, manifold blocks, and tube caps for industrial and extreme service applications.",
    href: "/products/high-pressure-fittings",
  },
  {
    label: "High Pressure Tubing",
    desc: "Tubing, nipples, tooling sets, and tube supports for industrial and extreme service applications.",
    href: "/products/high-pressure-tubing",
  },
  {
    label: "Union & Adapters",
    desc: "Unions, adapters, and bulkhead fittings for pressure and size compatibility across industrial and extreme service applications.",
    href: "/products/union-adapters",
  },
  {
    label: "High Pressure Regulators",
    desc: "General, high pressure, back pressure, and air operated regulators for precise pressure control in industrial and extreme service applications.",
    href: "/products/high-pressure-regulators",
  },
];

export default async function AboutPage() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
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
            About Hiflux UK
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
            Built for the pressures other valves can&apos;t hold.
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 640,
            }}
          >
            Hiflux UK is the exclusive UK &amp; EU distributor of high-pressure
            valves, fittings and tubing for industrial, energy and research
            applications where failure is not an option — from standard 15,000
            psi process lines to extreme 150,000 psi test and research service.
          </Typography>
        </Container>
      </Box>

      {/* Who we are */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.6rem", md: "2rem" },
            fontWeight: 800,
            color: "text.primary",
            mb: 3,
          }}
        >
          Who we are
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1rem",
            lineHeight: 1.8,
            mb: 2.5,
          }}
        >
          We&apos;re Hiflux UK — built for the pressures other valves
          can&apos;t hold. From needle valves to full instrumentation
          systems, every product we ship is engineered to perform when the
          margin for error is zero.
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1rem",
            lineHeight: 1.8,
            mb: 2.5,
          }}
        >
          Every valve we ship meets the same high pressure ratings, the same
          material standards, the same tolerances — whether it&apos;s a single
          needle valve or a full instrumentation package. That consistency
          isn&apos;t a logo. It&apos;s a standard we hold every order to.
        </Typography>

        <Typography
          component="h3"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "text.primary",
            mt: 4,
            mb: 1.5,
          }}
        >
          Buy genuine, buy traceable
        </Typography>
        <Typography
          sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}
        >
          If you&apos;re sourcing Hiflux valves in the UK or EU, source them from
          the authorised distributor. Every series, every certificate, every
          batch is genuine Hiflux product, fully traceable back to the
          manufacturer — not a grey-market copy or a name printed on a box.
        </Typography>
      </Container>

      <Divider />

      {/* Certifications */}
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
          Certification &amp; build standard
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
          }}
        >
          {CERTIFICATIONS.map((item) => (
            <Box key={item.title} sx={{ display: "flex", gap: 1.5 }}>
              <Box sx={{ mt: 0.3, color: "primary.main" }}>{item.icon}</Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "1rem", color: "text.primary" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6, mt: 0.5 }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      <Divider />

      {/* Hydrogen / industry involvement */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.6rem", md: "2rem" },
            fontWeight: 800,
            color: "text.primary",
            mb: 3,
          }}
        >
          Industry involvement
        </Typography>
        <Typography
          sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2.5 }}
        >
          Hiflux UK is a member of the{" "}
          <Box
            component="a"
            href="https://ukhea.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}
          >
            Hydrogen Energy Association
          </Box>
          , reflecting our established focus on developing high-pressure
          flow-control products for demanding hydrogen applications —
          including refuelling valves rated up to 700 bar in STS316 stainless
          steel. Read more in our{" "}
          <Link
            href="/news/hiflux-joins-hydrogen-energy-association-distributors"
            style={{ color: "inherit", fontWeight: 700 }}
          >
            hydrogen industry announcement
          </Link>
          .
        </Typography>
      </Container>

      <Divider />

      {/* Product lines */}
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
          What we supply
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {PRODUCT_LINES.map((line) => (
            <Box key={line.label}>
              <Link href={line.href} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {line.label}
                </Typography>
              </Link>
              <Typography
                sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6, mt: 0.5 }}
              >
                {line.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
      
      <Divider />
    </Box>
  );
}
