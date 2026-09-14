import type { Metadata } from "next";
import { Box, Container, Typography, Button, Divider } from "@mui/material";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "+447369243459";
const PAGE_URL = "https://www.hiflux.uk.com/industrial-strainers";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Y Strainer Industrial Filtration Solutions | HiFlux UK";
  const description =
    "HiFlux UK engineers y strainer solutions for demanding industrial filtration and protection of critical equipment in liquids and gas systems. Contact us.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url: PAGE_URL },
    twitter: { card: "summary_large_image", title, description },
  };
}

const CAPABILITIES = [
  "Engineered thinking for harsh, high-pressure duties",
  "Focus on safety-critical, continuous-process environments",
  "Support for complex, multi-stage filtration and straining",
  "Traceability, testing and performance-led specification",
  "Direct technical contact by email and phone",
];

const Y_DOES = [
  "Shields valves, pumps, flowmeters, and instrumentation from particulate damage",
  "Reduces unplanned shutdowns caused by fouling or blockage",
  "Provides a compact, inline protection stage with relatively low pressure drop",
  "Can be configured for high-pressure or high-temperature service when required",
];

const STRAINER_TYPES = [
  {
    title: "Y strainer",
    items: [
      "Compact, inline design",
      "Suited to relatively clean services with intermittent debris loads",
      "Common on smaller line sizes and where space is limited",
      "Typically requires system isolation for element cleaning",
    ],
  },
  {
    title: "Basket and inline basket strainer",
    items: [
      "Larger dirt-holding capacity than many y strainer designs",
      "Often used as an inline basket strainer on higher flow lines",
      "Favoured where maintenance access and long run times between clean-outs are priorities",
    ],
  },
  {
    title: "Duplex strainer",
    items: [
      "Two strainer housings in parallel",
      "One online, one standby – changeover without stopping flow",
      "Well-suited to continuous processes where shutdown is unacceptable",
    ],
  },
  {
    title: "Cone strainers",
    items: [
      "Tapered element installed directly in the line",
      "Often used as temporary or commissioning strainers",
      "Useful for capturing construction debris during start-up before a permanent device is installed",
    ],
  },
  {
    title: "Self-cleaning and automatic self-cleaning strainer",
    items: [
      "Self-cleaning strainers use backwashing or scraping mechanisms to remove debris without opening the housing",
      "An automatic self-cleaning strainer can be driven by timers, differential pressure, or external control logic",
      "Designed to minimise manual intervention and maintain consistent differential pressure",
    ],
  },
];

const SPECIFYING = [
  "Design pressure and temperature",
  "Fluid type (clean liquids, slurries, viscous media, gases)",
  "Solids load, particle size distribution, and fouling behaviour",
  "Acceptable pressure drop at clean and dirty conditions",
  "Maintenance constraints and access windows",
  "Required continuity of service (batch vs continuous)",
];

const INTEGRATION = [
  "Coarse y strainer followed by a finer filtration system",
  "Cone strainers used during commissioning, then removed once permanent strainers and filters are validated",
  "Duplex or automatic self-cleaning stages where continuous duty is mandatory",
  "Dedicated sea water strainers upstream of cooling or water treatment solutions for coastal and offshore applications",
];

const UK_EUROPE = [
  "Straining and filtration concepts for new-build plants and retrofits",
  "Protection strategies for high-pressure valves, fittings, and tubing",
  "Integration of strainers into complex industrial water filtration and process lines",
];

const STEPS = [
  {
    title: "Application review",
    body: "We clarify media, pressure, temperature, line size, solids characteristics, and uptime requirements.",
  },
  {
    title: "System-level thinking",
    body: "We do not look at the strainer in isolation. We consider upstream and downstream equipment, high-pressure hardware, and the existing or planned industrial filtration systems.",
  },
  {
    title: "Concept recommendation",
    body: "We outline where a y strainer is suitable – and where a basket, duplex, cone, or self-cleaning configuration might be more robust.",
  },
  {
    title: "Detail discussion",
    body: "We discuss envelope space, access, blow-down and drain arrangements, and maintenance strategies to minimise risk when the line is opened.",
  },
  {
    title: "Ongoing technical support",
    body: "As operating conditions evolve, we remain available to review performance and adjust the filtration and straining strategy as required.",
  },
];

const FAQS = [
  {
    q: "Where is a y strainer typically used in a process line?",
    a: "A y strainer is often installed upstream of equipment that is sensitive to particulate contamination – such as control valves, pumps, turbines, heat exchangers, or measurement instrumentation – to intercept solids that could cause erosion, blockage, or malfunction.",
  },
  {
    q: "When should I choose a y strainer instead of a basket filter or duplex strainer?",
    a: "A y strainer is usually chosen when space is tight, line size is relatively small, solids load is moderate, and it is acceptable to isolate the line for cleaning. Basket filters or a duplex strainer arrangement are preferred when you need larger dirt-holding capacity or cannot shut down the process for routine maintenance.",
  },
  {
    q: "Are y strainers suitable for high-pressure systems?",
    a: "Y strainers can be engineered for elevated pressures, but the body design, material, and connection type must match your system rating. In high-pressure environments, they are often deployed alongside precision-built valves, fittings, and tubing where failure is not an option. Always match the strainer’s pressure rating to the maximum system conditions.",
  },
  {
    q: "Can I use a y strainer for sea water applications in the UK?",
    a: "Yes, provided the sea water strainers are specified with appropriate corrosion-resistant materials, internal coatings (if used), and maintenance strategies to manage fouling and marine growth. For UK coastal or offshore facilities, material selection and long-term survivability are as important as basic straining performance.",
  },
  {
    q: "How does an automatic self-cleaning strainer compare to a manual y strainer?",
    a: "A manual y strainer requires isolation, depressurisation, and opening the body to clean or replace the element. An automatic self-cleaning strainer uses an internal mechanism and external actuation or control logic to remove debris without opening the housing, supporting longer run times and more stable differential pressure at the cost of greater mechanical and control complexity.",
  },
  {
    q: "Can I retrofit a y strainer into an existing pipeline in Europe?",
    a: "In many cases, yes. Retrofitting a y strainer into an existing UK or European plant typically involves checking available straight lengths of pipe, ensuring adequate access for removal of the screen, verifying structural support, and confirming that added pressure drop is acceptable across the required operating envelope.",
  },
  {
    q: "How often should a y strainer be cleaned?",
    a: "Cleaning frequency depends on solids loading, particle size, and allowable differential pressure. Some operators clean at fixed intervals; others monitor pressure drop across the strainer and intervene when it reaches a defined limit. For critical duties, differential pressure monitoring is usually preferable to fixed-time intervals.",
  },
  {
    q: "Can y strainers be combined with fine filters in one system?",
    a: "Yes. Y strainers are often used as coarse protection stages ahead of finer industrial filters or cartridge elements, protecting them from large debris and extending run times between change-outs. This staged approach is common in industrial water filtration, chemical processing, and other high-integrity services.",
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
      name: "Y Strainer Industrial Filtration Solutions | HiFlux UK",
      description:
        "HiFlux UK works with industrial clients to engineer robust, high-performance y strainer solutions and filtration setups for liquids and gases.",
      inLanguage: "en-GB",
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Y strainer engineering and specification",
      description:
        "Engineering-led support for specifying, integrating and supporting y strainers and related industrial straining and filtration equipment for liquids and gases.",
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
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Continent", name: "Europe" },
      ],
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

export default function IndustrialStrainersPage() {
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
            Y strainer solutions for industrial systems
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 660 }}>
            Looking for a y strainer solution that will actually protect downstream equipment
            under real-world process conditions? HiFlux UK works with industrial clients
            across demanding sectors to engineer robust, high-performance filtration and
            separation setups for liquids and gases, where strainers, filters, and
            high-pressure hardware must perform with zero margin for error.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Para>
          Talk to us about your application, operating pressures, and media, and we’ll help
          you define the right strainer configuration and integration strategy.
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

        <SectionHeading>What is a y strainer?</SectionHeading>
        <Para>
          A y strainer is a mechanical device installed in a pipeline to remove solid
          contaminants from a liquid or gas stream. The body is shaped like a “Y”, with the
          main flow line and a branch housing a perforated or mesh element. Fluid continues
          down the main line; debris is captured in the branch and removed during
          maintenance.
        </Para>
        <Para>Engineered correctly, a y strainer:</Para>
        <Bullets items={Y_DOES} />
        <Para>
          For safety-critical operations, the y strainer is not an afterthought. It is part
          of a defined, engineered protection strategy for the entire line.
        </Para>

        <SectionHeading>Y strainer vs basket, duplex, cone and self-cleaning strainers</SectionHeading>
        <Para>
          There is no single “right” strainer for every duty. We help clients compare y
          strainers with other options such as basket filters, duplex strainer assemblies,
          self-cleaning strainers, and cone strainers as part of an overall design.
        </Para>
        {STRAINER_TYPES.map((t) => (
          <Box key={t.title}>
            <Typography component="h3" sx={{ fontSize: "1.2rem", fontWeight: 700, color: "text.primary", mt: 3, mb: 1 }}>
              {t.title}
            </Typography>
            <Bullets items={t.items} />
          </Box>
        ))}
        <Para>
          For seawater intakes, cooling circuits, and marine systems, sea water strainers
          (often basket or self-cleaning configurations) must be engineered for corrosion
          resistance and biofouling, not just basic solids capture.
        </Para>

        <SectionHeading>Specifying a y strainer for industrial duties</SectionHeading>
        <Para>
          HiFlux supports clients in specifying strainers and filters as part of robust
          industrial filtration systems. When evaluating a y strainer against alternatives,
          we look at:
        </Para>
        <Bullets items={SPECIFYING} />
        <Para>
          A y strainer may be positioned ahead of critical control valves, high-precision
          metering, or high-pressure equipment to intercept damage-causing particulates
          before they reach more sensitive components.
        </Para>

        <SectionHeading>Integrating strainers into your filtration system</SectionHeading>
        <Para>
          In many plants, strainers are just one stage in a multi-layer protection strategy
          that might also include industrial filters, fine micron filter elements, or
          specialist devices such as a magnetic filter for ferrous contamination.
        </Para>
        <Para>Typical integration approaches include:</Para>
        <Bullets items={INTEGRATION} />
        <Para>
          We work with engineering teams to align strainer and filter stages with plant
          safety cases, process guarantees, and lifecycle maintenance planning.
        </Para>

        <SectionHeading>Y strainers and sea water strainers in the UK and Europe</SectionHeading>
        <Para>
          HiFlux UK operates from the United Kingdom, supporting industrial clients across
          the UK, wider Europe and beyond. Many of the systems we support involve aggressive
          conditions – high pressure, corrosive media, elevated temperatures – where a
          generic y strainer or sea water strainer is not enough.
        </Para>
        <Para>We assist with:</Para>
        <Bullets items={UK_EUROPE} />
        <Para>
          If you’re specifying a y strainer, duplex unit, or automatic self-cleaning strainer
          for a UK or European facility, we can provide engineering-led guidance on
          configuration, materials, and system impacts.
        </Para>

        <SectionHeading>What to expect when you engage HiFlux</SectionHeading>
        <Para>
          When you bring HiFlux into a project involving y strainers or related equipment,
          you can expect a technically rigorous, application-first approach:
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
        <Para>
          Throughout, the focus stays the same: engineered reliability, predictable
          performance, and protection for safety-critical assets.
        </Para>

        <Divider sx={{ my: 6 }} />

        <SectionHeading>FAQs — y strainer and industrial applications</SectionHeading>
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
            Talk to us about your y strainer requirements
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 640, mx: "auto" }}>
            If you are specifying, upgrading, or troubleshooting a y strainer in a demanding
            industrial environment, HiFlux UK can help you engineer a robust, system-level
            solution that protects your process and your high-pressure hardware.
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
