import type { Metadata } from "next";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Industries We Serve | High-Pressure Valves for Oil & Gas, Hydrogen, Research | Hiflux UK",
    description:
      "Hiflux UK high-pressure valves, fittings and tubing serve oil & gas wellhead control, hydrogen refuelling, research and testing, chemical processing, and power generation — rated up to 150,000 psi.",
  };
}

const INDUSTRIES = [
  {
    id: "oil-gas",
    label: "Oil & Gas / Wellhead",
    body: [
      "Wellhead and flowline systems operate under some of the highest and most variable pressures in industry, combined with corrosive media and remote or unmanned locations where a valve failure is expensive and hard to reach.",
      "Hiflux needle, check and ball valves are built in 316 stainless steel with metal-to-metal sealing options and blowout-proof stem designs, suited to well testing, flowline instrumentation and pressure-control manifolds where a stamped rating has to hold, not just look good on a datasheet.",
    ],
  },
  {
    id: "hydrogen-refuelling",
    label: "Hydrogen Refuelling",
    body: [
      "Hydrogen's small molecular size and high working pressures make leak control and material compatibility non-negotiable. Refuelling infrastructure typically needs components engineered specifically for hydrogen service rather than adapted from a general industrial catalogue.",
      "Hiflux is a member of the Hydrogen Energy Association and manufactures hydrogen-specific needle valves rated up to 700 bar in STS316 stainless steel, with non-rotating stems and metal-to-metal seating designed for hydrogen refuelling stations and hydrogen-powered vehicle systems.",
    ],
  },
  {
    id: "research-testing",
    label: "Research & Testing",
    body: [
      "Hydraulic test benches and high-pressure research equipment push valves and fittings well beyond standard process ratings, often cycling repeatedly at pressures where most catalogue components simply aren't rated to survive.",
      "Our ultra-high-pressure range extends up to 150,000 psi, purpose-built for research equipment, hydraulic test benches and pressure-testing rigs where fine metering control and repeatable, blowout-proof sealing matter as much as the headline pressure rating.",
    ],
  },
  {
    id: "chemical-processing",
    label: "Chemical Processing",
    body: [
      "Process lines handling aggressive or high-purity chemical media need valves and fittings selected for both pressure rating and material compatibility, with connections that won't compromise system integrity under thermal or pressure cycling.",
      "Hiflux fittings use cone-and-thread, metal-to-metal connections in 316 stainless steel, giving process engineers a consistent, traceable component base across valves, fittings, tubing and regulators within the same system.",
    ],
  },
  {
    id: "power-generation",
    label: "Power Generation",
    body: [
      "Power generation and steam/gas process systems require flow-control components that can be trusted over long service intervals, often in safety-critical or hard-to-access locations within the plant.",
      "Our safety valves, check valves and regulators are pressure-tested before shipment to the exact rating stamped on the body, giving plant engineers a verifiable basis for specification rather than a marketing estimate.",
    ],
  },
];

export default async function IndustriesPage() {
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
            Industries We Serve
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
            High-pressure engineering for the sectors where failure isn&apos;t an option.
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 640,
            }}
          >
            From wellhead pressure control to hydrogen refuelling and
            150,000 psi research applications, Hiflux valves, fittings and
            tubing are engineered to hold at the pressures where standard
            components fail.
          </Typography>
        </Container>
      </Box>

      {/* Industries list */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        {INDUSTRIES.map((industry, i) => (
          <Box key={industry.id} sx={{ mb: i === INDUSTRIES.length - 1 ? 0 : 6 }}>
            <Typography
              component="h2"
              id={industry.id}
              sx={{
                fontSize: { xs: "1.5rem", md: "1.85rem" },
                fontWeight: 800,
                color: "text.primary",
                mb: 2.5,
              }}
            >
              {industry.label}
            </Typography>
            {industry.body.map((para, j) => (
              <Typography
                key={j}
                sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2 }}
              >
                {para}
              </Typography>
            ))}
            {i !== INDUSTRIES.length - 1 && <Divider sx={{ mt: 5 }} />}
          </Box>
        ))}
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: "secondary.main", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "1.4rem", md: "1.75rem" }, fontWeight: 800, color: "#fff", mb: 1.5 }}
          >
            Not sure which valve fits your application?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
            Tell us the pressure, media and connection requirements and
            we&apos;ll help identify the right Hiflux high-pressure solution.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                component="span"
                sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 700, textTransform: "none" }}
              >
                Explore Products
              </Button>
            </Link>
            <Button
              variant="outlined"
              component="a"
              href="mailto:sales@hiflux.uk.com"
              sx={{
                borderRadius: 0,
                px: 3,
                py: 1.25,
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.4)",
                color: "#fff",
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              sales@hiflux.uk.com
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
