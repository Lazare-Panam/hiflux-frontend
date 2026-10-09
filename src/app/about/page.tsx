import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CallSplitOutlinedIcon from "@mui/icons-material/CallSplitOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import OilBarrelOutlinedIcon from "@mui/icons-material/OilBarrelOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ProductIndexSection from "./ProductIndexSection";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { CERTIFICATIONS } from "@/app/certifications/data";
import { BLUE_BG } from "@/theme/brand";
import CtaBanner from "@/app/Common/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const title = "About Hiflux UK | UK High-Pressure Flow Control Distributor";
  const description =
    "Hiflux UK is the UK distributor of Hiflux high-pressure valves, fittings, tubing and pressure-control equipment, with UK technical support.";
  const url = "https://www.hiflux.uk.com/about";
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

type Item = { term: string; desc: string; icon?: ReactNode };

const ROLE_IN_UK: Item[] = [
  { icon: <SupportAgentOutlinedIcon />, term: "Product enquiries", desc: "A UK contact who answers the technical question rather than routing it offshore, in UK working hours with no time-zone gap in the middle of a technical conversation." },
  { icon: <TuneOutlinedIcon />, term: "Product selection", desc: "Matching an application to a catalogue number: pressure rating, orifice, stem type, port type, material." },
  { icon: <DescriptionOutlinedIcon />, term: "Document access", desc: "Catalogues, dimensional data, port types and material specifications on request." },
  { icon: <FactCheckOutlinedIcon />, term: "Specification and BOM review", desc: "A second pair of eyes before the order goes in: we check part numbers, flag mismatches, and identify where another configuration suits the duty better." },
  { icon: <RequestQuoteOutlinedIcon />, term: "Formal quotations", desc: "Written and itemised, against your specification." },
  { icon: <LocalShippingOutlinedIcon />, term: "Order coordination and after-sales", desc: "Placing and tracking the order, with one named UK contact from enquiry to delivery and afterwards." },
];

const VALUES: Item[] = [
  { icon: <VerifiedOutlinedIcon />, term: "Technical accuracy", desc: "We quote what the documentation supports. If we do not know a figure, we find it or say so." },
  { icon: <ScheduleOutlinedIcon />, term: "Responsive UK support", desc: "A real contact, reachable in UK hours." },
  { icon: <Inventory2OutlinedIcon />, term: "Reliable sourcing", desc: "Genuine Hiflux product, traceable to the manufacturer." },
  { icon: <ChatOutlinedIcon />, term: "Honest communication", desc: "Clear lead times and clear limits. We would rather decline an enquiry than push a product into the wrong duty." },
  { icon: <HandshakeOutlinedIcon />, term: "Long-term relationships", desc: "Most of our value shows up on the second project, not the first." },
];

const PRODUCT_RANGE: Item[] = [
  { icon: <SpeedOutlinedIcon />, term: "High-pressure valves", desc: "Needle, ball, relief, safety, bleed, double block and bleed, high-temperature, control and air-operated, in 316 stainless steel, Inconel and Monel alloys." },
  { icon: <PlumbingOutlinedIcon />, term: "High-pressure fittings", desc: "Elbows, tees, crosses, glands and collars in cone-and-thread configurations." },
  { icon: <LinkOutlinedIcon />, term: "High-pressure tubing", desc: "Tubing and pre-made nipples for pressures up to 150,000 psi, with tube supports and caps." },
  { icon: <CallSplitOutlinedIcon />, term: "Check valves", desc: "High-pressure check valves and line filters, including a patented double-sealed design." },
  { icon: <AccountTreeOutlinedIcon />, term: "Manifolds", desc: "Manifold blocks, with sizes, specifications and port-type combinations available to order." },
  { icon: <TuneOutlinedIcon />, term: "Pressure control", desc: "Regulators, back-pressure regulators, air-operated BPRs, safety heads and rupture discs, gauges and thermocouples." },
  { icon: <BuildOutlinedIcon />, term: "Tooling and accessories", desc: "Coning and threading tooling sets, tube supports, tube caps and thread lubricant." },
  { icon: <ConstructionOutlinedIcon />, term: "Lok tube fittings", desc: "Instrumentation-grade twin-ferrule fittings and one-piece ball valves." },
];

const INDUSTRIES: Item[] = [
  { icon: <FactoryOutlinedIcon />, term: "Chemical processing and oil refining", desc: "High-pressure tubing and fittings." },
  { icon: <OilBarrelOutlinedIcon />, term: "Oil and gas", desc: "Wellhead gauge, bleed and double block and bleed valves for pressure monitoring and testing, chemical injection, sampling and drain-line isolation." },
  { icon: <ScienceOutlinedIcon />, term: "Research and test facilities", desc: "Tubing and fittings across the full pressure range." },
  { icon: <WaterDropOutlinedIcon />, term: "Waterjet cutting", desc: "The manufacturer supplies overseas waterjet equipment makers on an OEM basis." },
  { icon: <BoltOutlinedIcon />, term: "Hydrogen", desc: "Valves and fittings developed for refuelling stations, including H70 applications." },
];

// Facts stated on this page and the homepage (HIFLUX Co., Ltd. history).
const MILESTONES = [
  { year: "2010", text: "HIFLUX Co., Ltd. established in Daejeon, Republic of Korea" },
  { year: "2018", text: "Headquarters and factory move to Daedeok Techno Valley" },
  { year: "2023", text: "KS certification for hydrogen refuelling station manual valves (KGS)" },
  { year: "2024", text: "Designated a Hydrogen Specialist Company by Korea's Ministry of Trade, Industry and Energy" },
];

const HERO_FACTS = [
  { value: "2010", label: "Manufacturer established" },
  { value: "150,000 psi", label: "Top working pressure, selected families" },
  { value: "Daejeon", label: "Korean headquarters and factory" },
  { value: "KS", label: "Certified hydrogen station valves" },
];



const TINT = "#f3f6fa";
const LINE = "1px solid rgba(15,40,70,0.08)";
const cardSx = {
  bgcolor: "#fff",
  border: LINE,
  borderRadius: "14px",
  boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
  transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
  "&:hover": { transform: "translateY(-3px)", borderColor: "rgba(0,114,188,0.3)", boxShadow: "0 16px 36px rgba(0,83,155,0.10)" },
} as const;
const bodySx = { color: "text.secondary", fontSize: "1.02rem", lineHeight: 1.8, textTransform: "none" } as const;

function Section({
  eyebrow,
  title,
  intro,
  tint,
  dark,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tint?: boolean;
  /** Deep-blue band (white text) to break up the long white page. */
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <Box component="section" sx={{ bgcolor: tint ? TINT : "#fff", ...(dark ? { background: BLUE_BG, color: "#fff" } : {}), py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        {eyebrow && (
          <Typography sx={{ color: dark ? "rgba(255,255,255,0.75)" : "primary.main", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase !important", mb: 1 }}>
            {eyebrow}
          </Typography>
        )}
        <Typography component="h2" sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" }, fontWeight: 800, color: dark ? "#fff" : "text.primary", lineHeight: 1.2, maxWidth: 760 }}>
          {title}
        </Typography>
        {intro && <Typography sx={{ ...bodySx, ...(dark ? { color: "rgba(255,255,255,0.85)" } : {}), mt: 2, maxWidth: 760 }}>{intro}</Typography>}
        {children && <Box sx={{ mt: { xs: 4, md: 5 } }}>{children}</Box>}
      </Container>
    </Box>
  );
}

function IconCards({ items, columns = 3 }: { items: Item[]; columns?: number }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2.5,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: `repeat(${columns}, 1fr)` },
      }}
    >
      {items.map((item) => (
        <Box key={item.term} sx={{ ...cardSx, p: 3 }}>
          {item.icon && (
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                bgcolor: "rgba(0,114,188,0.1)",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {item.icon}
            </Box>
          )}
          <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.05rem", color: "text.primary", mb: 0.75, textTransform: "none" }}>
            {item.term}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.93rem", lineHeight: 1.65, textTransform: "none" }}>
            {item.desc}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default async function AboutPage() {
  return (
    <Box sx={{ bgcolor: "#fff", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Hero */}
      <Box component="section" sx={{ color: "#fff", background: BLUE_BG, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <PageBreadcrumbs items={[{ label: "About Us" }]} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" },
              gap: { xs: 5, md: 8 },
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase !important" }}>
                Hiflux UK · High-Pressure Flow Control
              </Typography>
              <Typography component="h1" sx={{ fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.1, mt: 1.5, mb: 2.5 }}>
                About Hiflux UK
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.88)", fontSize: "1.08rem", lineHeight: 1.75, maxWidth: 620, mb: 4 }}>
                Hiflux UK is a UK-based distributor of Hiflux high-pressure valves, fittings, tubing and
                pressure-control equipment, manufactured by HIFLUX Co., Ltd. of Daejeon, South Korea. We
                are the UK point of contact for the engineers and buyers who specify, price and source them.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Button
                  component="a"
                  href="/contact"
                  variant="contained"
                  disableElevation
                  sx={{ bgcolor: "#fff", color: "primary.main", fontWeight: 700, px: 3, py: 1.25, borderRadius: "8px", textTransform: "none", "&:hover": { bgcolor: "#e6f1f9" } }}
                >
                  Discuss Your Application
                </Button>
                <Button
                  component="a"
                  href="/products"
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", fontWeight: 700, px: 3, py: 1.25, borderRadius: "8px", textTransform: "none", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}
                >
                  Explore Hiflux Products
                </Button>
              </Box>
            </Box>

            {/* Fact panel */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5,
                p: 1.5,
                borderRadius: "16px",
                bgcolor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(6px)",
              }}
            >
              {HERO_FACTS.map((f) => (
                <Box key={f.label} sx={{ p: 2.5, borderRadius: "12px", bgcolor: "rgba(255,255,255,0.08)" }}>
                  <Typography sx={{ fontSize: { xs: "1.4rem", md: "1.7rem" }, fontWeight: 800, lineHeight: 1.1 }}>{f.value}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", mt: 0.75, lineHeight: 1.4 }}>{f.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Who we are */}
      <Section eyebrow="Who we are" title="A UK distributor, focused on getting the specification right">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" }, gap: { xs: 3, md: 6 }, alignItems: "start" }}>
          <Box>
            <Typography sx={{ ...bodySx, mb: 2.5 }}>
              Hiflux UK supplies Hiflux high-pressure flow-control products to engineers, procurement teams,
              system designers and industrial organisations across the United Kingdom.
            </Typography>
            <Typography sx={bodySx}>
              We are a distributor, not a manufacturer. The products are made by HIFLUX Co., Ltd., a South
              Korean manufacturer of high-pressure valves, fittings and piping materials established in 2010.
              Our role is to make that range accessible here — with the technical information needed to
              specify correctly first time, and a UK contact who stays with the enquiry through to delivery.
            </Typography>
          </Box>
          <Box sx={{ p: 3, borderRadius: "14px", bgcolor: TINT, borderLeft: "4px solid", borderLeftColor: "primary.main" }}>
            <Typography sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>Working pressures</Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Published working pressures run from instrumentation level up to 150,000 psi in selected
              fitting, tubing and needle-valve families. Confirm any rating against the relevant product
              documentation.
            </Typography>
          </Box>
        </Box>
      </Section>

      {/* Our role in the UK */}
      <Section
        tint
        eyebrow="Why work with Hiflux UK"
        title="Our role in the UK"
        intro="Most of the work happens before the order. Engineers come to us with a pressure, a medium and a port type; buyers come to us with a part number that needs pricing, or a bill of materials that needs checking."
      >
        <IconCards items={ROLE_IN_UK} />
      </Section>

      {/* About Hiflux products */}
      <Section eyebrow="The manufacturer" title="About Hiflux products">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 7 } }}>
          <Box>
            <Typography sx={{ ...bodySx, mb: 2.5 }}>
              Hiflux products are manufactured by HIFLUX Co., Ltd., established in 2010 in Daejeon, Republic
              of Korea, and based since 2018 at a headquarters and factory in Daedeok Techno Valley.
            </Typography>
            <Typography sx={{ ...bodySx, mb: 2.5 }}>
              The company holds patents covering a double-sealed check valve, a high-pressure valve, a
              high-temperature/high-pressure valve and valves incorporating stem carriers, and supplies
              domestic OEM customers alongside overseas waterjet equipment manufacturers. Its hydrogen line
              includes manual valves certified to KS standards by the Korea Gas Safety Corporation; in 2024
              it was designated a Hydrogen Specialist Company by South Korea&apos;s Ministry of Trade,
              Industry and Energy.
            </Typography>
            <Typography sx={bodySx}>
              Design authority, manufacturing and product certification rest with HIFLUX Co., Ltd. Hiflux UK
              distributes those products in the United Kingdom.
            </Typography>
          </Box>

          {/* Milestones */}
          <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, position: "relative", pl: 4 }}>
            <Box aria-hidden sx={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 2, bgcolor: "rgba(0,114,188,0.2)" }} />
            {MILESTONES.map((m) => (
              <Box component="li" key={m.year} sx={{ position: "relative", pb: 3.5, "&:last-of-type": { pb: 0 } }}>
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    left: -32,
                    top: 2,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    border: "3px solid",
                    borderColor: "primary.main",
                  }}
                />
                <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "1.15rem" }}>{m.year}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.98rem", lineHeight: 1.6, mt: 0.25 }}>{m.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>

      {/* Mission and values */}
      <Section tint eyebrow="Mission and values" title="Our mission and values">
        <Box sx={{ p: { xs: 3, md: 4 }, mb: 3, borderRadius: "14px", background: BLUE_BG, color: "#fff" }}>
          <Typography sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" }, lineHeight: 1.6, fontWeight: 600, maxWidth: 900 }}>
            “Our mission is to give UK engineers and buyers straightforward access to Hiflux high-pressure
            products, with the information and documentation needed to specify and buy them with confidence —
            judged on the quality of our answers, not the size of our catalogue.”
          </Typography>
        </Box>
        <IconCards items={VALUES} columns={5} />
      </Section>

      {/* Product range */}
      <Section eyebrow="Product range" title="The Hiflux range we supply">
        <IconCards items={PRODUCT_RANGE} columns={4} />
      </Section>

      {/* Full product index — real links to every series (and, via each series
          listing, every SKU) so no product page is orphaned. */}
      <ProductIndexSection />

      {/* Industries and applications */}
      <Section
        eyebrow="Industries"
        title="Industries and applications"
        intro="Suitability for a specific duty must always be confirmed against the product documentation and your own design requirements."
      >
        <IconCards items={INDUSTRIES} columns={5} />
      </Section>


      {/* Quality and documentation */}
      <Box id="certifications" sx={{ scrollMarginTop: 100 }}>
        <Section
          dark
          eyebrow="Quality"
          title="Quality and documentation"
          intro="Product quality, testing and manufacturing certification are the responsibility of HIFLUX Co., Ltd. and do not transfer automatically to Hiflux UK. Our role is to obtain the documentation UK customers need for design files, supplier approvals and site records. Each certificate covers only the scope written on it."
        >
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(8, 1fr)" } }}>
            {CERTIFICATIONS.map((c) => (
              <Box
                key={c.id}
                component="a"
                href={`/certifications#${c.id}`}
                aria-label={`${c.badge}: ${c.title}`}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  "&:hover img": { transform: "translateY(-4px)", boxShadow: "0 14px 30px rgba(0,83,155,0.18)" },
                }}
              >
                <Box
                  component="img"
                  src={c.image}
                  alt={`${c.title} certificate`}
                  loading="lazy"
                  sx={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "1 / 1.414",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "6px",
                    border: "1px solid rgba(15,40,70,0.1)",
                    boxShadow: "0 4px 12px rgba(15,40,70,0.08)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                />
                <Typography sx={{ mt: 1, textAlign: "center", fontWeight: 800, fontSize: "0.78rem", color: "#fff", textTransform: "none" }}>
                  {c.badge}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            component="a"
            href="/certifications"
            sx={{
              mt: 3,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 2.5,
              py: 1.1,
              borderRadius: "999px",
              bgcolor: "#fff",
              color: "#00539B",
              fontWeight: 700,
              fontSize: "0.92rem",
              textDecoration: "none",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            View all certificates →
          </Box>
        </Section>
      </Box>

      {/* Experience + contact */}
      <Box component="section" sx={{ bgcolor: TINT, py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg">
          <Typography sx={{ color: "primary.main", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase !important", mb: 1 }}>
            Experience and expertise
          </Typography>
          <Typography sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" }, fontWeight: 700, color: "text.primary", lineHeight: 1.45, maxWidth: 900, mb: { xs: 4, md: 5 } }}>
            High-pressure specification is a conversation, not a catalogue lookup. Cone-and-thread connection
            selection, material choice for the medium, orifice and Cv sizing, port-type conversion between
            standards — these are the questions we expect.
          </Typography>
          <CtaBanner
            heading="Contact Hiflux UK"
            body="Send us the application, the specification or the bill of materials, and we will come back with the Hiflux part numbers and a formal quotation."
            buttons={[
              { label: "Request a Quotation", href: "/contact" },
              { label: "Discuss Your Application", href: "/contact" },
            ]}
          />
        </Container>
      </Box>
    </Box>
  );
}
