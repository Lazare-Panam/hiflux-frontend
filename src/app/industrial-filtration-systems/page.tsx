import type { Metadata } from "next";
import { Box, Container, Typography, Button, Divider } from "@mui/material";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "+447369243459";
const PAGE_URL = "https://www.hiflux.uk.com/industrial-filtration-systems";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Industrial Filtration Systems | HiFlux UK";
  const description =
    "Industrial filtration systems engineered for high-pressure, zero-failure operation across the UK and Europe. Contact HiFlux UK for support.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url: PAGE_URL },
    twitter: { card: "summary_large_image", title, description },
  };
}

const CAPABILITIES = [
  "Industrial filtration solutions engineered for demanding duty",
  "Precision-built components for high pressure and extreme service",
  "Systems designed around reliability, traceability, and safety",
  "Technical guidance from concept through to final specification",
  "Products tested to rated pressure and built in 316 stainless steel where specified",
];

const BUILT_AROUND = [
  "Robust housings and elements for continuous service",
  "Precise contaminant control tailored to your process demands",
  "Integration with high-pressure valves, fittings, and tubing",
  "Materials and connections matched to your media and pressure rating",
  "Traceable components for regulated and audited industries",
];

const STEPS = [
  {
    title: "Application review",
    body: "We start with your operating envelope: media, temperature, pressure rating, flow range, and cleanliness targets. We look at where filtration is required – intake, protection of high-pressure pumps, point-of-use polishing, or final product safeguarding.",
  },
  {
    title: "Filtration concept and component selection",
    body: "Based on your data, we recommend filtration architectures and compatible hardware – from line protection filters through to specialised elements. Where reverse osmosis or other separation stages are part of the treatment train, we size upstream and downstream protection accordingly and can specify a suitable water system filter arrangement.",
  },
  {
    title: "Integration with high-pressure infrastructure",
    body: "HiFlux UK is a high-pressure specialist. We align filtration components with high-pressure valves and manifolds, ultra high pressure fittings and tubing, and relief and safety devices — for controlled pressure loss, stable operation, and clean media at the point where your system needs it.",
  },
  {
    title: "Documentation, traceability, and testing",
    body: "Every valve, fitting, and tube is engineered for demanding industrial conditions, tested to its rated pressure, and supplied with traceable specifications. Filtration solutions can be documented to support your internal standards and regulatory requirements.",
  },
  {
    title: "Ongoing technical support",
    body: "Our engineers remain available for lifecycle questions – from media changes to process upgrades that require re-evaluation of your filtration regime.",
  },
];

const MEDIA = [
  "Water treatment solutions – industrial pre-filtration, polishing, and protection around treatment stages such as reverse osmosis and other separation technologies.",
  "Industrial water filtration – protection of cooling circuits, wash systems, and utility water services to help limit particulate loading on critical equipment.",
  "Industrial water purification systems – integration of filtration with high-pressure valves, fittings, and tubing in systems where water purity and reliability must be maintained at elevated pressures.",
  "Process and utility filtration – contaminant control in chemical, pharmaceutical, food and beverage, and general industrial processes.",
];

const INTEGRATION_TARGETS = [
  "Hydraulic test benches and hydraulic power units",
  "Oil & gas well testing and wellhead flow control lines",
  "Hydrogen refuelling and gas-handling systems",
  "High pressure research and laboratory rigs",
];

const UK_EUROPE = [
  "Fast response from our UK team",
  "Direct technical contact by phone and email",
  "Products held in stock and available for fast dispatch where listed",
];

const FAQS = [
  {
    q: "What defines an industrial filtration system?",
    a: "An industrial filtration system is a configured set of filters, housings, valves, and interconnecting hardware designed to remove specific contaminants from process or utility media under defined operating conditions. At HiFlux, systems are specified around pressure rating, media compatibility, flow, and required cleanliness levels.",
  },
  {
    q: "Do you design filtration systems for high-pressure applications in the UK?",
    a: "Yes. HiFlux UK focuses on filtration and high-pressure components for demanding industrial duties throughout the United Kingdom and Europe, including systems operating at very high pressure where reliability and control are critical.",
  },
  {
    q: "Can HiFlux support water treatment filtration system projects?",
    a: "Yes. Water treatment is one of the sectors we serve. We can help specify filtration around treatment stages, including reverse osmosis for water purification, and define suitable pre-filtration and protection using cartridge and bag filter industrial solutions where appropriate.",
  },
  {
    q: "Do you supply complete filtration systems or only components?",
    a: "HiFlux UK supplies and specifies complete industrial filtration solutions, along with high-pressure valves, fittings, and tubing. We engineer how the filtration hardware is applied within your wider process and support you from concept through to final specification.",
  },
  {
    q: "How do I choose the right industrial filtration system for my process?",
    a: "Selection should start with media, pressure rating, flow, operating temperature, and target cleanliness. From there, element type, filtration rating, housing style, and connection details can be specified. Our team can work through these parameters with you and match them to suitable industrial filtration systems.",
  },
  {
    q: "Can HiFlux filtration solutions be integrated with existing industrial filtration systems in the UK?",
    a: "Yes. We routinely support upgrades, retrofit programmes, and component replacement in existing plants across the UK and Europe. We match new filtration hardware and high-pressure components to your current operating data and interface requirements.",
  },
  {
    q: "Do you supply filtration hardware for reverse osmosis water treatment solutions?",
    a: "Yes. We provide filtration hardware and associated high-pressure components for water treatment solutions, including filters for reverse osmosis protection and downstream polishing, subject to correct selection for your operating conditions.",
  },
  {
    q: "How can I get technical help specifying an industrial filtration system?",
    a: `You can contact our technical team directly by phone on ${PHONE_DISPLAY} or email at ${EMAIL} with your operating data. We will review your requirements and advise on suitable industrial filtration systems and associated high-pressure components.`,
  },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, my: 2 }}>
      {items.map((item) => (
        <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0, mt: "9px" }} />
          <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>{item}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      sx={{ fontSize: { xs: "1.5rem", md: "1.85rem" }, fontWeight: 800, color: "text.primary", mt: 6, mb: 2.5 }}
    >
      {children}
    </Typography>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.85, mb: 2 }}>{children}</Typography>
  );
}

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Industrial Filtration Systems | HiFlux UK",
      description:
        "HiFlux UK supplies industrial filtration systems and high-pressure components for demanding applications, engineered for reliability, contaminant control, and zero-failure operation across the UK and Europe.",
      inLanguage: "en-GB",
      isPartOf: { "@type": "WebSite", name: "HiFlux UK" },
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Industrial filtration systems",
      description:
        "Specification, integration and supply of industrial filtration systems and hardware engineered for high-pressure, zero-failure applications in water treatment, chemical, pharmaceutical, food and beverage, power generation, and general manufacturing.",
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Continent", name: "Europe" },
      ],
      provider: {
        "@type": "Organization",
        name: "HiFlux UK",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: PHONE_DISPLAY,
          email: EMAIL,
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function IndustrialFiltrationSystemsPage() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          color: "#fff",
          background: "linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="span"
            sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}
          >
            Industrial Filtration
          </Typography>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.15, mt: 1.5, mb: 3 }}
          >
            Industrial filtration systems
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 660 }}>
            Looking for a high-performance industrial filtration system that will not fail
            under pressure? HiFlux UK supplies industrial filtration solutions engineered for
            demanding applications across the UK, Europe, and beyond — filtration hardware and
            high-pressure components for environments where reliability, process stability,
            and contaminant control are critical.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Para>
          To specify a filtration setup for your line, contact our technical team by email or
          phone.
        </Para>
        <Bullets items={CAPABILITIES} />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3 }}>
          <Button variant="contained" href={`mailto:${EMAIL}`} sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 700, textTransform: "none" }}>
            {EMAIL}
          </Button>
          <Button
            variant="outlined"
            href={`tel:${PHONE_HREF}`}
            sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 700, textTransform: "none", borderColor: "rgba(0,0,0,0.2)", color: "text.primary", "&:hover": { borderColor: "primary.main" } }}
          >
            {PHONE_DISPLAY}
          </Button>
        </Box>

        <SectionHeading>Industrial filtration systems engineered for zero-failure operation</SectionHeading>
        <Para>
          In high-pressure and industrial processes, a filtration system is not an accessory.
          It is a safety-critical component. Our filtration hardware is engineered to
          stabilise flow, protect downstream equipment, and help maintain product quality in
          water treatment, chemical, pharmaceutical, food and beverage, power generation, and
          general manufacturing environments.
        </Para>
        <Para>HiFlux industrial filtration solutions are built around:</Para>
        <Bullets items={BUILT_AROUND} />
        <Para>
          When a line carries high-value media at high pressure, you need filtration that
          performs as specified, every time.
        </Para>

        <SectionHeading>What to expect when you work with HiFlux</SectionHeading>
        <Para>
          We operate with a simple rule: Zero Margin for Error. When we help you define or
          upgrade an industrial filtration system, the process is structured, technical, and
          traceable.
        </Para>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, my: 2 }}>
          {STEPS.map((step, i) => (
            <Box key={step.title} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box
                sx={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                }}
              >
                {i + 1}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: "text.primary", fontSize: "1.02rem", mb: 0.5 }}>
                  {step.title}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
                  {step.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <SectionHeading>Filtration solutions for water and process media</SectionHeading>
        <Para>
          HiFlux industrial filtration solutions support a wide range of liquids, including
          water, process fluids, and selected chemicals, subject to media and material
          compatibility.
        </Para>
        <Bullets items={MEDIA} />
        <Para>
          Where required, we can incorporate technologies such as micron filter cartridges,
          coalescing filter stages, and specialised cooling water filter or backwashing
          filters into a coherent, serviceable design.
        </Para>

        <SectionHeading>Filtration system integration with industrial valves and fittings</SectionHeading>
        <Para>A filtration plant is only as strong as the components that connect it.</Para>
        <Para>
          HiFlux UK supplies high-pressure valves, fittings, manifolds, and tubing rated for
          extreme pressures – up to 150,000 psi in the ultra high pressure range. This allows
          filtration systems to be integrated directly into:
        </Para>
        <Bullets items={INTEGRATION_TARGETS} />
        <Para>
          Using a single engineering partner for both filtration hardware and high-pressure
          components reduces interface risk and simplifies traceability.
        </Para>

        <SectionHeading>Filtration system solutions in the United Kingdom and Europe</SectionHeading>
        <Para>
          HiFlux UK supplies industrial filtration solutions and high-pressure components
          across the United Kingdom, Europe, and beyond. From initial specification through to
          supply, our focus is on:
        </Para>
        <Bullets items={UK_EUROPE} />
        <Para>
          If you operate industrial filtration systems in the UK or across Europe and need
          hardware that is engineered for demanding duty, HiFlux is positioned to support you.
        </Para>

        <Divider sx={{ my: 6 }} />

        <SectionHeading>FAQs about industrial filtration systems</SectionHeading>
        {FAQS.map((f) => (
          <Box key={f.q} sx={{ mb: 3 }}>
            <Typography component="h3" sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary", mb: 1 }}>
              {f.q}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>{f.a}</Typography>
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
            Specify your next filtration system with HiFlux
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 640, mx: "auto" }}>
            When there is zero margin for error in your process, you need a filtration system
            engineered for demanding industrial applications and backed by traceable,
            high-pressure hardware. Contact HiFlux UK today to discuss your project and define
            the filtration architecture your system really needs.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="contained" href={`mailto:${EMAIL}`} sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 700, textTransform: "none" }}>
              {EMAIL}
            </Button>
            <Button
              variant="outlined"
              href={`tel:${PHONE_HREF}`}
              sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 700, textTransform: "none", borderColor: "rgba(255,255,255,0.4)", color: "#fff", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}
            >
              {PHONE_DISPLAY}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
