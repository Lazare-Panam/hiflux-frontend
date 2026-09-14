import type { Metadata } from "next";
import { Box, Container, Typography, Button, Divider } from "@mui/material";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "+447369243459";
const PAGE_URL = "https://www.hiflux.uk.com/magnetic-filters";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Magnetic Filter Solutions for Industrial Systems | HiFlux UK";
  const description =
    "Magnetic filter solutions for industrial systems from HiFlux UK, with engineering-led guidance on magnetic traps and inline filtration. Contact our team.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      type: "website",
      siteName: "Hiflux UK",
      title,
      description,
      url: PAGE_URL,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const CAPABILITIES = [
  "Precision-engineered mindset for safety-critical duties",
  "Technical support for specifying filtration into complex systems",
  "Experience across water treatment, chemicals, power, hydrogen, and test rigs",
  "Focus on reliability, traceability, and compliant engineering",
];

const DOES = [
  "Damage pumps, valves, seals, and instrumentation",
  "Erode pipework and nozzle internals",
  "Compromise heat exchangers and coolers",
  "Disturb precision processes and downstream separation",
];

const TRAP_CHARS = [
  "Used on pipelines, transfer lines, or recirculation loops",
  "Can be configured for CIP-friendly cleaning in hygienic applications",
  "Often supplied with removable magnet assemblies for maintenance",
];

const INLINE_FEATURES = [
  "Inline connection pattern for easy integration",
  "Engineered internal flow path to maximise contact with magnetic elements",
  "Designs available for low, medium, and higher pressure ratings depending on duty",
];

const CHOICE_FACTORS = [
  "Operating pressure and temperature",
  "Flow rate and viscosity",
  "Cleanability and maintenance method",
  "Space envelope and connection standard",
];

const MULTISTAGE = [
  "Coarse strainers for bulk contamination capture",
  "Cartridge or bag filters for defined micron control",
  "Specialty devices such as a coalescing filter where liquid–liquid or liquid–gas separation is required",
];

const SYSTEM_RISK = [
  "What contamination is present (magnetic / non-magnetic / soft / hard)?",
  "What equipment is downstream and how sensitive is it?",
  "What pressure and temperature limits must the filtration train withstand?",
  "What maintenance windows and access are realistic on site?",
];

const SECTORS = [
  "Water treatment and process water conditioning",
  "Chemicals and petrochemicals",
  "Power generation and energy infrastructure",
  "Hydrogen refuelling and high pressure gas systems",
  "Food, beverage, and pharmaceutical processing",
  "General manufacturing and test facilities",
];

const UPSTREAM_OF = [
  "High-value control valves",
  "Seal systems",
  "Industrial water filtration plant",
  "Precision test benches and measurement equipment",
];

const SELECTION = [
  "Pressure rating — must be compatible with maximum operating and design pressure, plus transients.",
  "Temperature — affects magnet strength and material selection.",
  "Media compatibility — housing and seal materials must match the chemistry of the process.",
  "Particle characteristics — size distribution, concentration, and whether particles are fully or partially magnetic.",
  "Cleanability — manual pull-out magnets, automated cleaning, or CIP-compatible internals.",
  "Integration with existing plant — connection standards, available space, and tie-in to shut-off and bypass valves.",
];

const STEPS = [
  {
    title: "Duty definition",
    body: "We establish medium, temperature, pressure, flow rate, solids load, and any hygiene or regulatory constraints.",
  },
  {
    title: "Risk and protection review",
    body: "We look at vulnerable assets (pumps, high pressure components, precision metering, test stands) and define what needs to be protected from ferrous debris.",
  },
  {
    title: "Filtration architecture",
    body: "We discuss how magnetic separation will work alongside mechanical stages such as strainers, micron filter elements, or reverse osmosis pre-treatment where relevant to the wider plant.",
  },
  {
    title: "Configuration recommendations",
    body: "Based on the above, we advise on suitable locations for magnetic devices in the line, expected maintenance and clean-down intervals, and the required access and isolation strategy using high-reliability valves.",
  },
  {
    title: "Documentation and technical support",
    body: "Where our equipment is part of the solution, we supply pressure ratings, materials, and connection data so everything can be integrated into your drawings, stress analysis, and operating procedures.",
  },
];

const FAQS = [
  {
    q: "How does a magnetic filter work in an industrial line?",
    a: "A magnetic filter uses high-strength magnetic elements positioned in the flow path to attract and hold ferrous particles suspended in the fluid. As the media passes by, iron and steel fines are captured on the magnetic surfaces, reducing the solids load that reaches downstream equipment or mechanical filters.",
  },
  {
    q: "When should I use a magnetic trap instead of an inline magnetic filter?",
    a: "A magnetic trap style housing is often chosen where there is space for a larger vessel and removable assemblies, or where cleaning is carried out offline. Inline magnetic filters are typically used where space is limited and a straight-through, compact design is preferred. The decision depends on pressure, flow, maintenance access, and cleanability.",
  },
  {
    q: "Can magnetic filters replace mechanical filtration systems?",
    a: "In most safety-critical plants they do not replace mechanical filtration. Instead they complement devices such as strainers, bag housings, or cartridges. Magnetic filters handle ferrous contamination, while mechanical stages control overall particle size distribution, including non-magnetic solids.",
  },
  {
    q: "How are magnetic filters used alongside industrial filtration systems in the UK?",
    a: "In UK plants, magnetic filters are often placed upstream of industrial filtration systems to protect fine elements from erosion and blinding. They can also be installed in bypass or side-stream loops to continuously strip out ferrous fines from cooling water, lubricants, or process streams.",
  },
  {
    q: "Are magnetic filters suitable for high pressure applications?",
    a: "Magnetic filters and traps can be engineered for elevated and high pressure service, but the housing, connections, and seals must be rated accordingly. We apply the same pressure rating discipline used in our ultra high pressure valves and fittings when assessing whether a particular magnetic solution is appropriate for a given line.",
  },
  {
    q: "Do you provide guidance on integrating magnetic filtration in European facilities?",
    a: "Yes. We support engineering teams across the UK, Europe, and beyond, helping them position magnetic filters, traps, and inline magnetic filters within wider protection strategies that can include industrial water purification systems and other critical plant.",
  },
  {
    q: "How often do magnetic filters need cleaning?",
    a: "Cleaning frequency depends on contamination load, flow conditions, and system criticality. High-load or safety-critical duties may require frequent inspection and cleaning; low-load systems may run longer between interventions. We help clients define inspection intervals based on risk and operating experience.",
  },
  {
    q: "Can magnetic filtration help protect reverse osmosis or other polishing stages?",
    a: "Yes. Removing ferrous particulates upstream of devices such as strainers, cartridges, or reverse osmosis plants can reduce fouling and protect sensitive downstream components. Magnetic filtration is one element in a wider protection and pre-treatment strategy.",
  },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, my: 2 }}>
      {items.map((item) => (
        <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0, mt: "9px" }} />
          <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
            {item}
          </Typography>
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
    <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.85, mb: 2 }}>
      {children}
    </Typography>
  );
}

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "HiFlux UK",
      url: "https://www.hiflux.uk.com",
      email: EMAIL,
      telephone: PHONE_DISPLAY,
      areaServed: ["United Kingdom", "Europe"],
    },
    {
      "@type": "WebPage",
      name: "Magnetic filter",
      url: PAGE_URL,
      description:
        "Magnetic filter solutions for industrial systems from HiFlux UK, with engineering-led guidance on magnetic traps and inline filtration.",
      isPartOf: { "@type": "Organization", name: "HiFlux UK" },
      mainEntity: { "@id": "#magnetic-filtration-service" },
    },
    {
      "@type": "Service",
      "@id": "#magnetic-filtration-service",
      name: "Magnetic filter and magnetic filtration guidance",
      provider: { "@type": "Organization", name: "HiFlux UK" },
      description:
        "Engineering-led support on specifying magnetic filters, magnetic traps, and inline magnetic filters into industrial filtration systems for critical applications.",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function MagneticFiltersPage() {
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
            Magnetic filter solutions for industrial systems
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 660 }}>
            Looking for a magnetic filter solution to protect critical equipment and
            pipework from ferrous contamination? HiFlux UK works in demanding industrial
            environments where zero-margin-for-error filtration is essential. While our
            core range focuses on high pressure valves, fittings, tubing, and engineered
            industrial filtration systems, we regularly support engineering teams with
            technical guidance on how magnetic filters, magnetic traps, and inline
            filtration strategies can be specified into robust process designs.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Para>
          To discuss a project or requirement, contact our team directly by email or phone.
        </Para>
        <Bullets items={CAPABILITIES} />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3 }}>
          <Button
            variant="contained"
            href={`mailto:${EMAIL}`}
            sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 700, textTransform: "none" }}
          >
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

        <SectionHeading>What a magnetic filter does in industrial systems</SectionHeading>
        <Para>
          A magnetic filter is engineered to capture and retain ferrous particles suspended
          in a liquid or slurry. Installed correctly, it becomes a first line of defence
          against hard contamination that can:
        </Para>
        <Bullets items={DOES} />
        <Para>
          In many systems a magnetic filter is used alongside a mechanical filtration system
          (for example cartridge, bag, or strainers) to combine magnetic separation of fine
          iron and steel particles with mechanical removal of non-magnetic solids at a
          defined micron rating. The result is a more stable process, cleaner media, and
          reduced unplanned downtime.
        </Para>

        <SectionHeading>Magnetic trap vs inline magnetic filters</SectionHeading>
        <Para>
          The terms magnetic filter, magnetic trap, and inline magnetic filters are often
          used interchangeably, but they describe slightly different configurations.
        </Para>
        <Typography component="h3" sx={{ fontSize: "1.2rem", fontWeight: 700, color: "text.primary", mt: 3, mb: 1 }}>
          Magnetic trap
        </Typography>
        <Para>
          A magnetic trap typically refers to a vessel or housing containing high-strength
          magnetic elements placed directly in the flow path. The media passes around or
          over these elements, and ferrous particles are attracted and held in place.
        </Para>
        <Bullets items={TRAP_CHARS} />
        <Typography component="h3" sx={{ fontSize: "1.2rem", fontWeight: 700, color: "text.primary", mt: 3, mb: 1 }}>
          Inline magnetic filters
        </Typography>
        <Para>
          Inline magnetic filters are designed to be installed directly in a pipeline, often
          as a compact, straight-through housing. The goal is to achieve effective magnetic
          separation with minimal footprint and predictable pressure drop.
        </Para>
        <Bullets items={INLINE_FEATURES} />
        <Para>The choice between a magnetic trap and an inline magnetic filter comes down to:</Para>
        <Bullets items={CHOICE_FACTORS} />
        <Para>
          Our engineering-led approach to industrial filters focuses on matching the
          configuration to the process risks and operating envelope.
        </Para>

        <SectionHeading>How magnetic filtration integrates with broader filtration systems</SectionHeading>
        <Para>
          Magnetic filtration is rarely the only barrier in a critical line. It is usually
          one element in a multi-stage protection strategy that may also include:
        </Para>
        <Bullets items={MULTISTAGE} />
        <Para>
          In complex duties (for example cooling water, seal flush lines, or critical test
          equipment), we help clients think in terms of system risk:
        </Para>
        <Bullets items={SYSTEM_RISK} />
        <Para>
          We bring the same discipline to filtration as we do to ultra high pressure valves
          and fittings: rated, defined, engineered, and traceable.
        </Para>

        <SectionHeading>What to expect when you talk to us about magnetic filtration</SectionHeading>
        <Para>
          When you approach HiFlux UK about incorporating a magnetic filter, magnetic trap,
          or inline magnetic filters into a project, you can expect a structured,
          engineering-first conversation:
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

        <SectionHeading>Magnetic filtration in UK and European industrial plants</SectionHeading>
        <Para>
          HiFlux UK operates from the United Kingdom and supports clients across the UK,
          Europe, and beyond. Our core business is high pressure valves, fittings, tubing,
          and engineered industrial filtration systems for demanding sectors including:
        </Para>
        <Bullets items={SECTORS} />
        <Para>
          In these environments, a magnetic filter or magnetic trap is often positioned
          upstream of:
        </Para>
        <Bullets items={UPSTREAM_OF} />
        <Para>
          We work directly with engineering houses, OEMs, and operators who need confident,
          specification-level guidance rather than catalogue guessing.
        </Para>

        <SectionHeading>Selecting a magnetic filter for demanding applications</SectionHeading>
        <Para>
          Key points to consider when specifying magnetic filtration into a
          zero-margin-for-error system:
        </Para>
        <Bullets items={SELECTION} />
        <Para>
          Our background in ultra high pressure equipment means we view every filtration
          component as part of a pressure system that must be coherent, traceable, and safe.
        </Para>

        <Divider sx={{ my: 6 }} />

        <SectionHeading>FAQs — magnetic filter and magnetic trap</SectionHeading>
        {FAQS.map((f) => (
          <Box key={f.q} sx={{ mb: 3 }}>
            <Typography component="h3" sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary", mb: 1 }}>
              {f.q}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8 }}>
              {f.a}
            </Typography>
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
            Talk to HiFlux UK about magnetic filtration
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 620, mx: "auto" }}>
            If you are engineering a system where ferrous contamination must be controlled
            with a magnetic filter, magnetic trap, or inline magnetic filters, contact
            HiFlux UK for technical guidance and to explore how our high-reliability
            hardware and filtration expertise can support your design.
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
