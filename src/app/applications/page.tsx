import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import OilBarrelOutlinedIcon from "@mui/icons-material/OilBarrelOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { APPLICATIONS, type Application } from "./data";
import { APP_VISUALS, APP_PHOTOS } from "./visuals";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { BLUE_BG } from "@/theme/brand";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Applications | Hydrogen, Wellhead, Research, Chemical & Power | Hiflux UK";
  const description =
    "High-pressure valves, fittings and tubing engineered for hydrogen refuelling, wellhead pressure control, research and test rigs, chemical processing and power generation.";
  const url = "https://www.hiflux.uk.com/applications";
  const images = ["https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png"];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

const ICONS: Record<string, typeof ScienceOutlinedIcon> = {
  "hydrogen-refuelling": LocalGasStationOutlinedIcon,
  "wellhead-pressure-control": OilBarrelOutlinedIcon,
  "research-and-testing": ScienceOutlinedIcon,
  "chemical-processing": FactoryOutlinedIcon,
  "power-generation": BoltOutlinedIcon,
};

// Component name (from each page's "What we supply" table) -> the series or
// category page it links to. Names without a match are shown unlinked.
const P = "/products";
const COMPONENT_LINKS: [RegExp, string][] = [
  [/needle valve/i, `${P}/high-pressure-valves/ndl-ultra-100k`],
  [/check valve/i, `${P}/high-pressure-valves/chk-ultra-100k`],
  [/air operated/i, `${P}/high-pressure-valves/aov-nc-60k`],
  [/relief valve/i, `${P}/high-pressure-valves/saf-rel-factory-60k`],
  [/gauge valve|bleed valve|double block|high temperature valve/i, `${P}/high-pressure-valves/spc-ctrl-75k`],
  [/cone and thread fittings/i, `${P}/high-pressure-fittings/fit-ultra-150k`],
  [/manifold/i, `${P}/high-pressure-fittings/mfb-high-60k`],
  [/tooling/i, `${P}/high-pressure-tubing/tool-coning`],
  [/tube support/i, `${P}/high-pressure-tubing/sup-3line`],
  [/tube|nipple/i, `${P}/high-pressure-tubing`],
  [/regulator/i, `${P}/high-pressure-regulators`],
  [/gauges? and thermocouple/i, `${P}/pressure-temp-flow`],
];
const linkFor = (name: string) => COMPONENT_LINKS.find(([re]) => re.test(name))?.[1];

function components(app: Application) {
  const t = app.blocks.find((b) => b.type === "table" && b.heading === "What we supply");
  return t && t.type === "table" ? t.rows : [];
}

const FAQ = [
  {
    q: "Are HIFLUX components suitable for hydrogen?",
    a: "Yes. HIFLUX makes valves and fittings for hydrogen refuelling stations, including KS-certified H70 manual valves (certificate KGS-23-0003), in cold-formed 316 stainless steel with metal-to-metal cone and thread connections.",
  },
  {
    q: "What is a cone and thread connection?",
    a: "A metal-to-metal seal made by a coned tube end seated in a matching cone in the fitting, held by a gland and collar on a left-hand thread. It needs no elastomer, holds to 150,000 psi and can be broken and remade, which is why test rigs and high-temperature lines use it.",
  },
  {
    q: "Which materials are available besides 316 stainless?",
    a: "316 stainless steel is standard. Hastelloy, Inconel 600/625/825, Nickel 200 and titanium are available where the media or temperature requires them. Send us the media and we will advise.",
  },
  {
    q: "Do you supply material certificates?",
    a: "Yes. Manufacturer material certification, traceable to the batch, is available with your order. Tell us the documents you need when you enquire.",
  },
  {
    q: "What do you need from me to quote?",
    a: "The working pressure, temperature range, media, tube size and connection type, and the quantity. A part number or bill of materials is ideal if you have one.",
  },
];

const eyebrow = { letterSpacing: "0.18em", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase !important" } as const;

export default function ApplicationsIndexPage() {
  return (
    <Box sx={{ bgcolor: "#fff", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          color: "#fff",
          pt: { xs: 6, md: 9 },
          pb: { xs: 12, md: 14 },
          background: `linear-gradient(rgba(0,58,110,0.74), rgba(0,45,84,0.88)), url("/products-hero.jpg") center / cover, ${BLUE_BG}`,
        }}
      >
        <Container maxWidth="lg">
          <PageBreadcrumbs items={[{ label: "Applications" }]} />
          <Typography sx={{ ...eyebrow, color: "rgba(255,255,255,0.75)" }}>Applications</Typography>
          <Typography component="h1" sx={{ mt: 1.25, fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 780 }}>
            Components matched to the duty, not the catalogue.
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.75, maxWidth: 680 }}>
            HIFLUX valves, fittings and tubing selected for the specific demands of each application — from 700 bar
            hydrogen refuelling to 150,000 psi research rigs and 1200°F steam service. Choose your industry below to
            see the duties, what to specify and the components we recommend.
          </Typography>
        </Container>
      </Box>

      {/* Industry tiles, overlapping the hero */}
      <Container maxWidth="lg" sx={{ mt: { xs: -9, md: -10 }, position: "relative", zIndex: 1 }}>
        {/* Phones: compact 2-column tiles, all visible; desktop: 5 across */}
        <Box sx={{ display: "grid", "& > *:last-child:nth-of-type(odd)": { gridColumn: { xs: "1 / -1", md: "auto" } }, gap: { xs: 1, md: 1.5 }, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(5, 1fr)" } }}>
          {APPLICATIONS.map((app) => {
            const Icon = ICONS[app.slug] ?? ScienceOutlinedIcon;
            const v = APP_VISUALS[app.slug];
            return (
              <Box
                key={app.slug}
                component="a"
                href={`#${app.slug}`}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: { xs: "center", md: "flex-start" },
                  gap: { xs: 1.25, md: 1 },
                  p: { xs: 1.25, md: 2 },
                  minWidth: 0,
                  bgcolor: "#fff",
                  borderRadius: "16px",
                  border: "1px solid rgba(15,40,70,0.08)",
                  boxShadow: "0 14px 34px rgba(0,30,70,0.12)",
                  textDecoration: "none",
                  color: "text.primary",
                  transition: "transform 0.25s ease, border-color 0.25s ease",
                  "&:hover": { transform: "translateY(-3px)", borderColor: "rgba(0,114,188,0.35)" },
                }}
              >
                <Box sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 }, flexShrink: 0, borderRadius: "11px", bgcolor: "rgba(0,114,188,0.1)", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.82rem", md: "0.95rem" }, lineHeight: 1.25 }}>{app.h1}</Typography>
                  {v && <Typography sx={{ display: { xs: "none", md: "block" }, mt: 0.75, color: "text.secondary", fontSize: "0.78rem", lineHeight: 1.4 }}>{v.facts.map((f) => f.value).join(" · ")}</Typography>}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* One section per application, photo alternating sides */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 }, display: "grid", gap: { xs: 8, md: 11 } }}>
        {APPLICATIONS.map((app, i) => {
          const Icon = ICONS[app.slug] ?? ScienceOutlinedIcon;
          const photo = APP_PHOTOS[app.slug];
          const v = APP_VISUALS[app.slug];
          const flip = i % 2 === 1;
          const parts = components(app);
          return (
            <Box
              key={app.slug}
              id={app.slug}
              component="section"
              sx={{ scrollMarginTop: 110, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.05fr" }, gap: { xs: 3.5, md: 7 }, alignItems: "center" }}
            >
              {/* Photo */}
              <Box sx={{ order: { md: flip ? 2 : 1 }, position: "relative" }}>
                <Box
                  component="img"
                  src={photo?.src ?? v?.image}
                  alt={photo?.alt ?? app.h1}
                  loading="lazy"
                  sx={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "22px", boxShadow: "0 24px 50px rgba(0,30,70,0.16)", bgcolor: "#e8f0f9" }}
                />
                {v && (
                  <Box sx={{ position: "absolute", left: 16, bottom: 16, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                    {v.facts.map((f) => (
                      <Box key={f.value} component="span" sx={{ px: 1.25, py: 0.5, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.94)", color: "primary.dark", fontSize: "0.78rem", fontWeight: 800, boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}>
                        {f.value}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Copy */}
              <Box sx={{ order: { md: flip ? 1 : 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: "primary.main", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>
                  <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "1.85rem" }, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                    {app.h1}
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2, color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>{app.intro[0]}</Typography>

                {parts.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography sx={{ ...eyebrow, color: "primary.main", mb: 1.25 }}>Recommended HIFLUX components</Typography>
                    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 0.9 }}>
                      {parts.slice(0, 6).map(([name, use]) => {
                        const href = linkFor(name);
                        return (
                          <Box key={name} component="li" sx={{ display: "flex", gap: 1.25, fontSize: "0.94rem", lineHeight: 1.55 }}>
                            <Box component="span" sx={{ width: 7, height: 7, mt: "8px", borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }} />
                            <Box component="span" sx={{ color: "text.secondary" }}>
                              {href ? (
                                <Link href={href} style={{ color: "#0072BC", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
                                  {name}
                                </Link>
                              ) : (
                                <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
                                  {name}
                                </Box>
                              )}{" "}
                              — {use}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                <Box sx={{ mt: 3, p: 2, borderRadius: "14px", bgcolor: "#f3f6fa", borderLeft: "4px solid", borderColor: "primary.main", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 1.5 }}>
                  <Typography sx={{ fontSize: "0.92rem", color: "text.primary" }}>{app.closing.heading}?</Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Link href={`/applications/${app.slug}`} style={{ textDecoration: "none" }}>
                      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 2, py: 0.9, borderRadius: "999px", border: "1.5px solid rgba(15,40,70,0.15)", color: "text.primary", fontWeight: 700, fontSize: "0.85rem", "&:hover": { borderColor: "primary.main", color: "primary.main" } }}>
                        Read the full guide <ArrowForwardIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Link>
                    <Link href="/contact" style={{ textDecoration: "none" }}>
                      <Box component="span" sx={{ display: "inline-flex", px: 2, py: 0.9, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontWeight: 700, fontSize: "0.85rem", "&:hover": { bgcolor: "primary.dark" } }}>
                        Request a Quote
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Container>

      {/* Not sure band */}
      <Box component="section" sx={{ background: BLUE_BG, color: "#fff", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
            <Box>
              <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.7rem", md: "2.3rem" }, lineHeight: 1.15 }}>
                Not sure which components your duty needs?
              </Typography>
              <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.7 }}>
                Send us these details and we will come back with the HIFLUX part numbers, a price and the documentation.
              </Typography>
              <Box sx={{ mt: 3, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <Box component="span" sx={{ display: "inline-flex", px: 3, py: 1.3, borderRadius: "999px", bgcolor: "#fff", color: "#00539B", fontWeight: 700 }}>
                    Discuss your application
                  </Box>
                </Link>
                <Box
                  component="a"
                  href="https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "inline-flex", px: 3, py: 1.3, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.6)", color: "#fff", fontWeight: 700, textDecoration: "none" }}
                >
                  Download the catalogue
                </Box>
              </Box>
            </Box>
            <Box component="ol" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: 1 }}>
              {["Media (gas or liquid, and what it is)", "Working pressure and temperature", "Tube size and connection type", "Manual, air operated or automated", "Certificates and documents you need"].map((t, n) => (
                <Box key={t} component="li" sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.25, borderRadius: "12px", bgcolor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)" }}>
                  <Box component="span" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.55)", minWidth: 22 }}>
                    {String(n + 1).padStart(2, "0")}
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ bgcolor: "#f3f6fa", py: { xs: 6, md: 9 } }}>
        <Container maxWidth="md">
          <Typography sx={{ ...eyebrow, color: "primary.main", textAlign: "center" }}>FAQ</Typography>
          <Typography component="h2" sx={{ mt: 1, mb: 4, textAlign: "center", fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.1rem" }, lineHeight: 1.2 }}>
            What engineers ask before specifying
          </Typography>
          <Box sx={{ display: "grid", gap: 1.25 }}>
            {FAQ.map((f) => (
              <Box
                key={f.q}
                component="details"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "14px",
                  border: "1px solid rgba(15,40,70,0.08)",
                  "& > summary": { listStyle: "none", cursor: "pointer", px: 2.5, py: 2, fontWeight: 700, fontSize: "1rem", display: "flex", justifyContent: "space-between", gap: 2 },
                  "& > summary::-webkit-details-marker": { display: "none" },
                  "& > summary::after": { content: '"+"', color: "primary.main", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1 },
                  "&[open] > summary::after": { content: '"–"' },
                  "&[open]": { borderColor: "rgba(0,114,188,0.35)" },
                }}
              >
                <Box component="summary">{f.q}</Box>
                <Typography sx={{ px: 2.5, pb: 2.25, color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.75 }}>{f.a}</Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ mt: 4, textAlign: "center", color: "text.secondary", fontSize: "0.72rem", lineHeight: 1.6 }}>
            Photos: Wikimedia Commons —{" "}
            {Object.values(APP_PHOTOS)
              .filter((p) => p.credit)
              .map((p, n, arr) => (
                <Box component="span" key={p.src}>
                  <Box component="a" href={p.creditUrl} target="_blank" rel="noopener noreferrer" sx={{ color: "inherit" }}>
                    {p.credit}
                  </Box>
                  {n < arr.length - 1 ? "; " : ""}
                </Box>
              ))}
            .
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
