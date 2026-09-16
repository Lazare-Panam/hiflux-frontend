import type { Metadata } from "next";
import { Box, Container, Typography, Divider, Button } from "@mui/material";
import ProductIndexSection from "./ProductIndexSection";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "About Hiflux UK | UK Distributor of Hiflux High-Pressure Flow Control";
  const description =
    "Hiflux UK is the UK-based distributor of Hiflux high-pressure valves, fittings, tubing and pressure-control equipment, manufactured by HIFLUX Co., Ltd. of Daejeon, South Korea — with UK technical support from enquiry to delivery.";
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

type Item = { term: string; desc: string };

const ROLE_IN_UK: Item[] = [
  {
    term: "Product enquiries",
    desc: "a UK contact who answers the technical question rather than routing it offshore.",
  },
  {
    term: "Product selection",
    desc: "matching an application to a catalogue number: pressure rating, orifice, stem type, port type, material.",
  },
  {
    term: "Document access",
    desc: "catalogues, dimensional data and port-type information on request.",
  },
  {
    term: "Specification and BOM review",
    desc: "we check part numbers, flag mismatches, and identify where another configuration suits the duty better.",
  },
  {
    term: "Formal quotations",
    desc: "written and itemised, against your specification.",
  },
  {
    term: "Order coordination and after-sales support",
    desc: "placing and tracking the order, and a named UK contact after delivery.",
  },
];

const VALUES: Item[] = [
  {
    term: "Technical accuracy",
    desc: "we quote what the documentation supports. If we do not know a figure, we find it or say so.",
  },
  {
    term: "Responsive UK support",
    desc: "a real contact, reachable in UK hours.",
  },
  {
    term: "Reliable sourcing",
    desc: "genuine Hiflux product, traceable to the manufacturer.",
  },
  {
    term: "Honest communication",
    desc: "clear lead times and clear limits. We would rather decline an enquiry than push a product into the wrong duty.",
  },
  {
    term: "Long-term relationships",
    desc: "most of our value shows up on the second project, not the first.",
  },
];

const PRODUCT_RANGE: Item[] = [
  {
    term: "High-pressure valves",
    desc: "needle, ball, relief, safety, bleed, double block and bleed, high-temperature, control and air-operated, in 316 stainless steel, Inconel and Monel alloys.",
  },
  {
    term: "High-pressure fittings",
    desc: "elbows, tees, crosses, glands and collars in cone-and-thread configurations.",
  },
  {
    term: "High-pressure tubing",
    desc: "tubing and pre-made nipples for pressures up to 150,000 psi, with tube supports and caps.",
  },
  {
    term: "Check valves",
    desc: "high-pressure check valves and line filters, including a patented double-sealed design.",
  },
  {
    term: "Manifolds",
    desc: "manifold blocks, with sizes, specifications and port-type combinations available to order.",
  },
  {
    term: "Pressure control",
    desc: "regulators, back-pressure regulators, air-operated BPRs, safety heads and rupture discs, gauges and thermocouples.",
  },
  {
    term: "Tooling and accessories",
    desc: "coning and threading tooling sets, tube supports, tube caps and thread lubricant.",
  },
  {
    term: "Lok tube fittings",
    desc: "instrumentation-grade twin-ferrule fittings and one-piece ball valves.",
  },
];

const INDUSTRIES: Item[] = [
  {
    term: "Chemical processing and oil refining",
    desc: "high-pressure tubing and fittings.",
  },
  {
    term: "Oil and gas",
    desc: "wellhead gauge, bleed and double block and bleed valves for pressure monitoring and testing, chemical injection, sampling and drain-line isolation.",
  },
  {
    term: "Research and test facilities",
    desc: "tubing and fittings across the full pressure range.",
  },
  {
    term: "Waterjet cutting",
    desc: "the manufacturer supplies overseas waterjet equipment makers on an OEM basis.",
  },
  {
    term: "Hydrogen",
    desc: "valves and fittings developed for refuelling stations, including H70 applications.",
  },
];

const WHY_US: Item[] = [
  {
    term: "A UK point of contact",
    desc: "enquiries answered in UK working hours, with no time-zone gap in the middle of a technical conversation.",
  },
  {
    term: "Product information on request",
    desc: "catalogues, dimensional data, port types and material specifications.",
  },
  {
    term: "Technical enquiry support",
    desc: "help translating an application into a valid part number.",
  },
  {
    term: "Specification and BOM review",
    desc: "a second pair of eyes before the order goes in.",
  },
  {
    term: "Formal quotations",
    desc: "written and itemised.",
  },
  {
    term: "One contact throughout",
    desc: "from enquiry to delivery and afterwards.",
  },
];

function TermList({ items }: { items: Item[] }) {
  return (
    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map((item) => (
        <Box
          component="li"
          key={item.term}
          sx={{
            display: "flex",
            gap: 1.5,
            color: "text.secondary",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          <Box aria-hidden sx={{ color: "primary.main", fontWeight: 700, flexShrink: 0 }}>
            —
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              {item.term}
            </Typography>{" "}
            — {item.desc}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const CTA_PRIMARY = {
  borderRadius: 0,
  textTransform: "none" as const,
  fontWeight: 700,
  px: 3,
  py: 1.25,
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
};

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
            Hiflux UK · High-Pressure Flow Control
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
            About Hiflux UK
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 640,
              mb: 4,
            }}
          >
            Hiflux UK is a UK-based distributor of Hiflux high-pressure valves,
            fittings, tubing and pressure-control equipment, manufactured by
            HIFLUX Co., Ltd. of Daejeon, South Korea. We are the UK point of
            contact for the engineers and buyers who specify, price and source
            them.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component="a"
              href="/contact"
              variant="contained"
              sx={{
                ...CTA_PRIMARY,
                bgcolor: "#fff",
                color: "primary.main",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)", boxShadow: "none" },
              }}
            >
              Discuss Your Application
            </Button>
            <Button
              component="a"
              href="/products"
              variant="outlined"
              sx={{
                ...CTA_PRIMARY,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": { borderColor: "#fff", boxShadow: "none" },
              }}
            >
              Explore Hiflux Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Who we are */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          Who we are
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2.5 }}>
          Hiflux UK supplies Hiflux high-pressure flow-control products to
          engineers, procurement teams, system designers and industrial
          organisations across the United Kingdom.
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2.5 }}>
          We are a distributor, not a manufacturer. The products are made by
          HIFLUX Co., Ltd., a South Korean manufacturer of high-pressure valves,
          fittings and piping materials established in 2010. Our role is to make
          that range accessible here — with the technical information needed to
          specify correctly first time, and a UK contact who stays with the
          enquiry through to delivery.
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
          Published working pressures run from instrumentation level up to
          150,000 psi in selected fitting, tubing and needle-valve families.
          Confirm any rating against the relevant product documentation.
        </Typography>
      </Container>

      <Divider />

      {/* Our role in the UK */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          Our role in the UK
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 4 }}>
          Most of the work happens before the order. Engineers come to us with a
          pressure, a medium and a port type; buyers come to us with a part
          number that needs pricing, or a bill of materials that needs checking.
        </Typography>
        <TermList items={ROLE_IN_UK} />
      </Container>

      <Divider />

      {/* About Hiflux products */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          About Hiflux products
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2.5 }}>
          Hiflux products are manufactured by HIFLUX Co., Ltd., established in
          2010 in Daejeon, Republic of Korea, and based since 2018 at a
          headquarters and factory in Daedeok Techno Valley.
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2.5 }}>
          The company holds patents covering a double-sealed check valve, a
          high-pressure valve, a high-temperature/high-pressure valve and valves
          incorporating stem carriers, and supplies domestic OEM customers
          alongside overseas waterjet equipment manufacturers. Its hydrogen line
          includes manual valves certified to KS standards by the Korea Gas
          Safety Corporation; in 2024 it was designated a Hydrogen Specialist
          Company by South Korea&apos;s Ministry of Trade, Industry and Energy.
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
          Design authority, manufacturing and product certification rest with
          HIFLUX Co., Ltd. Hiflux UK distributes those products in the United
          Kingdom.
        </Typography>
      </Container>

      <Divider />

      {/* Mission and values */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          Our mission and values
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 4 }}>
          Our mission is to give UK engineers and buyers straightforward access
          to Hiflux high-pressure products, with the information and
          documentation needed to specify and buy them with confidence — judged
          on the quality of our answers, not the size of our catalogue.
        </Typography>
        <TermList items={VALUES} />
      </Container>

      <Divider />

      {/* Product range */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 4 }}
        >
          Product range
        </Typography>
        <TermList items={PRODUCT_RANGE} />
      </Container>

      <Divider />

      {/* Full product index — real links to every series (and, via each series
          listing, every SKU) so no product page is orphaned. */}
      <ProductIndexSection />

      <Divider />

      {/* Industries and applications */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 4 }}
        >
          Industries and applications
        </Typography>
        <TermList items={INDUSTRIES} />
        <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.7, mt: 4, fontStyle: "italic" }}>
          Suitability for a specific duty must always be confirmed against the
          product documentation and your own design requirements.
        </Typography>
      </Container>

      <Divider />

      {/* Why work with us */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 4 }}
        >
          Why work with Hiflux UK?
        </Typography>
        <TermList items={WHY_US} />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}>
          <Button component="a" href="/contact" variant="contained" sx={CTA_PRIMARY}>
            Discuss Your Application
          </Button>
          <Button component="a" href="/contact" variant="outlined" sx={{ ...CTA_PRIMARY }}>
            Request a Catalogue
          </Button>
        </Box>
      </Container>

      <Divider />

      {/* Quality and documentation */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          Quality and documentation
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2.5 }}>
          Product quality, testing and manufacturing certification are the
          responsibility of HIFLUX Co., Ltd. and do not transfer automatically to
          Hiflux UK. Our role is to obtain the documentation UK customers need
          for design files, supplier approvals and site records.
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
          The manufacturer holds ISO 9001, ISO 14001 and ISO 45001 certification,
          CE European Standard Certification, ATEX technical-file certificates for
          relief valves via notified body ICIM S.p.A. (0425), and KS certification
          from the Korea Gas Safety Corporation for hydrogen refuelling station
          manual valves. Copies are available on request.
        </Typography>
      </Container>

      <Divider />

      {/* Experience and expertise */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          Experience and expertise
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
          High-pressure specification is a conversation, not a catalogue lookup.
          Cone-and-thread connection selection, material choice for the medium,
          orifice and Cv sizing, port-type conversion between standards — these
          are the questions we expect.
        </Typography>
      </Container>

      <Divider />

      {/* Contact */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}
        >
          Contact Hiflux UK
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 4 }}>
          Send us the application, the specification or the bill of materials,
          and we will come back with the Hiflux part numbers and a formal
          quotation.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button component="a" href="/contact" variant="contained" sx={CTA_PRIMARY}>
            Discuss Your Application
          </Button>
          <Button component="a" href="/contact" variant="outlined" sx={{ ...CTA_PRIMARY }}>
            Request a Quotation
          </Button>
        </Box>
      </Container>

      <Divider />
    </Box>
  );
}
