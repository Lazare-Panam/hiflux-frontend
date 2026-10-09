import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { APP_VISUALS } from "@/app/applications/visuals";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { BLUE_BG } from "@/theme/brand";
import CtaBanner from "@/app/Common/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Industries We Serve | High-Pressure Valves for Oil & Gas, Hydrogen, Research | Hiflux UK";
  const description =
    "Hiflux UK high-pressure valves, fittings and tubing serve oil & gas wellhead control, hydrogen refuelling, research and testing, chemical processing, and power generation — rated up to 150,000 psi.";
  const url = "https://www.hiflux.uk.com/industries";
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

const INDUSTRIES = [
  {
    id: "oil-gas",
    app: "wellhead-pressure-control",
    label: "Oil & Gas / Wellhead",
    body: [
      "Wellhead and flowline systems operate under some of the highest and most variable pressures in industry, combined with corrosive media and remote or unmanned locations where a valve failure is expensive and hard to reach.",
      "Hiflux needle, check and ball valves are built in 316 stainless steel with metal-to-metal sealing options and blowout-proof stem designs, suited to well testing, flowline instrumentation and pressure-control manifolds where a stamped rating has to hold, not just look good on a datasheet.",
    ],
  },
  {
    id: "hydrogen-refuelling",
    app: "hydrogen-refuelling",
    label: "Hydrogen Refuelling",
    body: [
      "Hydrogen's small molecular size and high working pressures make leak control and material compatibility non-negotiable. Refuelling infrastructure typically needs components engineered specifically for hydrogen service rather than adapted from a general industrial catalogue.",
      "Hiflux UK is a member of the Hydrogen Energy Association and supplies hydrogen-specific needle valves rated up to 700 bar in STS316 stainless steel, with non-rotating stems and metal-to-metal seating designed for hydrogen refuelling stations and hydrogen-powered vehicle systems.",
    ],
  },
  {
    id: "research-testing",
    app: "research-and-testing",
    label: "Research & Testing",
    body: [
      "Hydraulic test benches and high-pressure research equipment push valves and fittings well beyond standard process ratings, often cycling repeatedly at pressures where most catalogue components simply aren't rated to survive.",
      "Our ultra-high-pressure range extends up to 150,000 psi, purpose-built for research equipment, hydraulic test benches and pressure-testing rigs where fine metering control and repeatable, blowout-proof sealing matter as much as the headline pressure rating.",
    ],
  },
  {
    id: "chemical-processing",
    app: "chemical-processing",
    label: "Chemical Processing",
    body: [
      "Process lines handling aggressive or high-purity chemical media need valves and fittings selected for both pressure rating and material compatibility, with connections that won't compromise system integrity under thermal or pressure cycling.",
      "Hiflux fittings use cone-and-thread, metal-to-metal connections in 316 stainless steel, giving process engineers a consistent, traceable component base across valves, fittings, tubing and regulators within the same system.",
    ],
  },
  {
    id: "power-generation",
    app: "power-generation",
    label: "Power Generation",
    body: [
      "Power generation and steam/gas process systems require flow-control components that can be trusted over long service intervals, often in safety-critical or hard-to-access locations within the plant.",
      "Our safety valves, check valves and regulators are pressure-tested before shipment to the exact rating stamped on the body, giving plant engineers a verifiable basis for specification rather than a marketing estimate.",
    ],
  },
];

export default async function IndustriesPage() {
  return (
    <Box sx={{ bgcolor: "#f3f6fa", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Hero */}
      <Box component="section" sx={{ color: "#fff", background: BLUE_BG, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <PageBreadcrumbs items={[{ label: "Industries" }]} />
          <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
            Industries we serve
          </Typography>
          <Typography component="h1" sx={{ mt: 1.25, fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 780 }}>
            High-pressure engineering for the sectors where failure isn&apos;t an option.
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, maxWidth: 640 }}>
            From wellhead pressure control to hydrogen refuelling and 150,000 psi research applications, Hiflux valves,
            fittings and tubing are engineered to hold at the pressures where standard components fail.
          </Typography>
          {/* Jump links */}
          <Box component="nav" aria-label="Industries" sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {INDUSTRIES.map((ind) => (
              <Box key={ind.id} component="a" href={`#${ind.id}`} sx={{ px: 1.75, py: 0.75, borderRadius: "999px", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.12)" } }}>
                {ind.label}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* One card per industry, image alternating sides */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, display: "grid", gap: { xs: 3, md: 4 } }}>
        {INDUSTRIES.map((ind, i) => {
          const v = APP_VISUALS[ind.app];
          const flip = i % 2 === 1;
          return (
            <Box
              key={ind.id}
              id={ind.id}
              component="section"
              sx={{
                scrollMarginTop: 120,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: flip ? "1.4fr 1fr" : "1fr 1.4fr" },
                bgcolor: "#fff",
                borderRadius: "22px",
                border: "1px solid rgba(15,40,70,0.08)",
                overflow: "hidden",
              }}
            >
              <Box sx={{ order: { md: flip ? 2 : 1 }, position: "relative", minHeight: { xs: 200, md: 320 }, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #f3f6fa 0%, #e7eef6 100%)" }}>
                <Typography sx={{ position: "absolute", top: 18, left: 22, fontWeight: 800, fontSize: "2rem", color: "rgba(0,83,155,0.16)", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </Typography>
                {v && <Box component="img" src={v.image} alt={v.imageAlt} loading="lazy" sx={{ maxWidth: "58%", maxHeight: 230, objectFit: "contain", mixBlendMode: "multiply" }} />}
              </Box>
              <Box sx={{ order: { md: flip ? 1 : 2 }, p: { xs: 3, md: 5 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography component="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
                  {ind.label}
                </Typography>
                {v && (
                  <Typography sx={{ mt: 1, color: "primary.dark", fontSize: "0.85rem", fontWeight: 700 }}>
                    {v.facts.map((f) => f.value).join("  ·  ")}
                  </Typography>
                )}
                {ind.body.map((para, j) => (
                  <Typography key={j} sx={{ mt: j === 0 ? 2 : 1.5, color: j === 0 ? "text.primary" : "text.secondary", fontSize: j === 0 ? "1.02rem" : "0.95rem", lineHeight: 1.8 }}>
                    {para}
                  </Typography>
                ))}
                <Link href={`/applications/${ind.app}`} style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                  <Box component="span" sx={{ mt: 3, display: "inline-flex", alignItems: "center", gap: 1, px: 2.5, py: 1.1, borderRadius: "999px", border: "1.5px solid", borderColor: "primary.main", color: "primary.main", fontWeight: 700, fontSize: "0.92rem", transition: "all 0.2s ease", "&:hover": { bgcolor: "primary.main", color: "#fff" } }}>
                    Components for this duty
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Link>
              </Box>
            </Box>
          );
        })}

        <CtaBanner
          sx={{ mt: { xs: 2, md: 3 } }}
          heading="Not sure which valve fits your application?"
          body="Tell us the pressure, media and connection requirements and we'll help identify the right Hiflux high-pressure solution."
          buttons={[
            { label: "Request a Quote", href: "/contact" },
            { label: "Explore Products", href: "/products" },
          ]}
        />
      </Container>
    </Box>
  );
}
