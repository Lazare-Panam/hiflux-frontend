// Content model for the /applications/[slug] pages.
//
// Each page is structurally similar (hero -> ordered content blocks ->
// closing CTA) but not identical, so a block is a discriminated union rather
// than a fixed shape. Copy lives here as template-literal strings (backticks)
// so apostrophes and inch marks (") never need escaping and never reach JSX as
// raw text — which sidesteps react/no-unescaped-entities entirely.

// Shared link targets. Keeping them named means a route change is one edit.
const CONTACT = "/contact";
const CATALOG_PDF =
  "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";
const VALVES = "/products/high-pressure-valves";
const FITTINGS = "/products/high-pressure-fittings";
const TUBING = "/products/high-pressure-tubing";
const TOOLING = "/products/high-pressure-tubing/tool-coning";
const ABOUT = "/about";

export type CTA = { label: string; href: string; external?: boolean };

export type Block =
  | { type: "prose"; heading?: string; paragraphs: string[] }
  | { type: "bullets"; heading?: string; paragraphs?: string[]; items: string[] }
  | {
      type: "table";
      heading?: string;
      paragraphs?: string[];
      columns: [string, string];
      rows: [string, string][];
      footnote?: string;
    }
  | { type: "links"; links: CTA[] };

export type Application = {
  slug: string;
  title: string; // <title> / meta title
  description: string; // meta description
  eyebrow: string; // hero kicker
  h1: string;
  intro: string[]; // hero body paragraphs
  heroCtas: CTA[];
  blocks: Block[];
  closing: { heading: string; body: string; buttons: CTA[] };
};

const REQUEST_QUOTE: CTA = { label: "Request a Quote", href: CONTACT };
const SPEAK_ENGINEER: CTA = { label: "Speak to an Engineer", href: CONTACT };
const DOWNLOAD_CATALOGUE: CTA = {
  label: "Download the Catalogue",
  href: CATALOG_PDF,
  external: true,
};

export const APPLICATIONS: Application[] = [
  {
    slug: "hydrogen-refuelling",
    title: "Hydrogen Refuelling Valves & Fittings | Hiflux UK",
    description:
      "Needle valves, fittings and manifolds for hydrogen refuelling stations. KS-certified manual valves for hydrogen stations from HIFLUX Co., Ltd.",
    eyebrow: "Applications",
    h1: "Hydrogen Refuelling",
    intro: [
      `Hydrogen refuelling is the most demanding gas-handling duty in commercial service. A 700 bar dispensing circuit combines extreme pressure, hard cycling, pre-cooling to −40°C, and the smallest molecule in industry — and every component in it has to be qualified for all four at once.`,
      `Hiflux UK supplies HIFLUX valves, fittings and manifolds developed specifically for hydrogen station duty, backed by the manufacturer's certification and hydrogen specialisation.`,
    ],
    heroCtas: [REQUEST_QUOTE, SPEAK_ENGINEER],
    blocks: [
      {
        type: "prose",
        heading: "What hydrogen refuelling demands",
        paragraphs: [
          `Cycling, not static pressure. A dispenser pressurises and depressurises many times a day. A component rated for a static working pressure is not the same as one qualified for repeated pressurisation to it, which is why cycle behaviour and seal type matter more here than headline pressure rating.`,
          `Leak tightness at molecular scale. Hydrogen escapes through paths that hold tight against nitrogen or helium. Metal-to-metal cone and thread connections are preferred over preload-dependent compression joints for exactly this reason.`,
          `Low-temperature service. Pre-cooling circuits operate well below ambient. HIFLUX fittings carry an operating range down to −423°F (−252°C), covering both pre-cooled gaseous and liquefied hydrogen conditions.`,
          `Material selection against embrittlement. Austenitic stainless steel is the default for gaseous hydrogen. HIFLUX components are cold-formed stainless steel 316 as standard.`,
        ],
      },
      {
        type: "prose",
        heading: "Certification",
        paragraphs: [
          `HIFLUX Co., Ltd holds KS certification for manual valves for hydrogen refuelling stations, awarded by the Korea Gas Safety Corporation (KGS) in October 2023, and its valves are in service at hydrogen refuelling station sites. In 2024 the company was designated a Hydrogen Specialist Company by Korea's Ministry of Trade, Industry and Energy. Its H70 valve and fitting programme for 700 bar refuelling stations began in 2020, and it has been a member of the Korea Hydrogen Industry Association since 2019.`,
          `Hiflux UK is a member of the Hydrogen Energy Association.`,
        ],
      },
      { type: "links", links: [{ label: "View certifications", href: ABOUT }] },
      {
        type: "table",
        heading: "What we supply",
        columns: ["Component", "Application"],
        rows: [
          [
            "Hydrogen Fuel Station Needle Valve (HRS-NV)",
            "Manual isolation, developed specifically for refuelling station duty",
          ],
          [
            "High-pressure needle valves",
            "Isolation and throttling across storage and compression",
          ],
          ["Check valves", "Backflow prevention between compression stages"],
          ["Air operated valves", "Remote and automated isolation"],
          [
            "Safety head and rupture disc",
            "Overpressure protection on storage banks",
          ],
          ["Relief valves", "Factory-set, field-adjustable and proportional"],
          [
            "Cone and thread fittings",
            "Elbow, tee and cross bodies to 150,000 psi",
          ],
          ["Tube and nipples", "Dispensing, pre-cooling and interconnect runs"],
          ["Manifold blocks", "Multi-port distribution on storage banks"],
        ],
        footnote:
          "All in cold-formed stainless steel 316, with alternative alloys available on request.",
      },
      {
        type: "links",
        links: [
          { label: "View high-pressure valves", href: VALVES },
          { label: "View fittings", href: FITTINGS },
          { label: "View tubing", href: TUBING },
        ],
      },
    ],
    closing: {
      heading: "Discuss your hydrogen project",
      body: `Send the working pressure, temperature range, connection type and whether the duty is gaseous or liquefied. Hiflux UK is the exclusive UK and EU distributor for HIFLUX Co., Ltd of Daejeon.`,
      buttons: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
  },

  {
    slug: "wellhead-pressure-control",
    title: "Wellhead Valves & Pressure Control | Hiflux UK",
    description:
      "Wellhead gauge valves, bleed valves and double block and bleed valves to 60,000 psi in stainless steel 316, with cone and thread connections.",
    eyebrow: "Applications",
    h1: "Wellhead and Pressure Control",
    intro: [
      `Wellhead instrumentation lives with high static pressure, sour media, temperature swings and the certainty that every isolation point will be tested by an inspector at some stage. Components have to hold, and they have to be demonstrably traceable when someone asks.`,
    ],
    heroCtas: [REQUEST_QUOTE, SPEAK_ENGINEER],
    blocks: [
      {
        type: "prose",
        heading: "What the duty demands",
        paragraphs: [
          `Positive isolation you can prove. Single isolation is not accepted for many wellhead operations. Double block and bleed provides two independent seals with a bleed point between them, so the integrity of the isolation can be verified rather than assumed.`,
          `Gauge protection and removal under pressure. Pressure instruments need isolating for calibration and replacement without shutting the well in. That is the job of the wellhead gauge valve and the bleed valve behind it.`,
          `Media that attacks the wrong alloy. Sour and chloride-bearing service narrows the material choice. Stainless steel 316 is standard across the HIFLUX range, with Hastelloy, Hastelloy C276 wetted parts, Inconel 600, 625 and 825, Nickel 200 and Titanium available where the service requires them.`,
        ],
      },
      {
        type: "table",
        heading: "What we supply",
        columns: ["Component", "Application"],
        rows: [
          [
            "Wellhead gauge valve",
            "Isolating pressure instrumentation at the wellhead",
          ],
          ["Bleed valve", "Venting trapped pressure before instrument removal"],
          [
            "Double block and bleed valve",
            "Two-seal positive isolation with a verifiable bleed point",
          ],
          [
            "High-pressure needle valves",
            "Isolation and throttling to 60,000 psi and above",
          ],
          ["Check valves", "Backflow prevention on injection and control lines"],
          [
            "Relief valves",
            "Overpressure protection, factory-set or field-adjustable",
          ],
          [
            "Cone and thread fittings",
            "Elbow, tee and cross, with anti-vibration options at 20,000 and 60,000 psi",
          ],
          ["Manifold blocks", "Multi-point distribution and gauge hook-ups"],
        ],
      },
      {
        type: "prose",
        heading: "Vibration matters here",
        paragraphs: [
          `Wellhead and pumping installations subject small-bore tube to continuous pulsation, which fatigues the joint at the thread root. HIFLUX offers anti-vibration fitting and accessory sets at 20,000 psi (1/4" to 1") and 60,000 psi (1/4" to 9/16"), adding a collet to the gland and collar assembly. Specify these where the line is downstream of a pump or compressor — and clamp the run regardless.`,
        ],
      },
      {
        type: "links",
        links: [
          { label: "View double block and bleed", href: VALVES },
          { label: "View fittings", href: FITTINGS },
        ],
      },
    ],
    closing: {
      heading: "Discuss your application",
      body: `Send the working pressure, media composition, temperature and connection type, and we will confirm the valve and material selection.`,
      buttons: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
  },

  {
    slug: "research-and-testing",
    title: "Research & Test Rig Valves to 150,000 psi | Hiflux UK",
    description:
      "Ultra high-pressure valves, fittings and tooling for research and test rigs. Re-makeable cone and thread connections rated to 150,000 psi.",
    eyebrow: "Applications",
    h1: "Research and Testing",
    intro: [
      `Test rigs are rebuilt constantly. A pressure-cycling bench, a burst test cell or a materials rig may be reconfigured between every run, and the connection system has to survive being broken and remade dozens of times without degrading. That requirement rules out most fitting types before pressure is even considered.`,
    ],
    heroCtas: [REQUEST_QUOTE, SPEAK_ENGINEER],
    blocks: [
      {
        type: "prose",
        heading: "Why cone and thread suits research work",
        paragraphs: [
          `A compression fitting seals with a ferrule swaged permanently onto the tube. It is a one-time component — remake the joint and you are reusing a ferrule already work-hardened into its final shape.`,
          `A cone and thread joint deforms nothing permanently. Provided the cone face, seat and thread are undamaged, it can be broken and remade repeatedly at full rating. On a rig that changes weekly, that is the difference between a connection system and a consumable.`,
          `The seal is also pressure-energised: system pressure acts on the back of the cone and drives it harder into its seat, rather than working against a preload set at assembly. That is what makes 100,000 and 150,000 psi achievable.`,
        ],
      },
      {
        type: "links",
        links: [{ label: "Read the cone and thread guide", href: FITTINGS }],
      },
      {
        type: "table",
        heading: "What we supply",
        columns: ["Component", "Application"],
        rows: [
          [
            "Cone and thread fittings",
            "Elbow, tee and cross bodies from 10,000 to 150,000 psi",
          ],
          [
            "High-pressure needle valves",
            "Isolation and fine throttling, straight, angle and 3-way",
          ],
          [
            "Tooling sets",
            "Coning and threading tube on site to the length you need",
          ],
          [
            "Tube and nipples",
            "Ordered to length, or produced in-house with the tooling set",
          ],
          [
            "Safety head and rupture disc",
            "Defined-failure overpressure protection on test cells",
          ],
          [
            "Relief valves",
            "Factory-set, field-adjustable and proportional types",
          ],
          [
            "Pressure regulators and back pressure regulators",
            "Setting and holding rig pressure",
          ],
          ["Line filters", "Protecting instrumentation from particulate"],
          ["Pressure gauges and thermocouples", "Rig instrumentation"],
          ["Tube support", "Restraining small-bore runs under cycling load"],
        ],
      },
      {
        type: "bullets",
        heading: "Building the rig",
        paragraphs: [
          "Two practical points for anyone specifying a rig for the first time.",
        ],
        items: [
          `The connection standard changes at 20,000 psi. Below it, a sleeve sits inside the gland and grips the tube directly, with a 24° cone. At 20,000 psi and above, a collar engages a nipple with a 60° cone. Components are not interchangeable across that split — treat them as two standards.`,
          `Threads above 20,000 psi are left-hand on the collar and nipple. The gland threads into the body conventionally; the collar does not. Brief whoever is assembling before the first make-up.`,
        ],
      },
      {
        type: "links",
        links: [
          { label: "View tooling sets", href: TOOLING },
          { label: "View fittings", href: FITTINGS },
        ],
      },
    ],
    closing: {
      heading: "Discuss your rig",
      body: `Send the maximum working pressure, tube sizes, media and how often the circuit is reconfigured, and we will specify the fittings, nipples and tooling to build it.`,
      buttons: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
  },

  {
    slug: "chemical-processing",
    title: "Chemical Process Valves & Fittings | Hiflux UK",
    description:
      "High-pressure valves and fittings for chemical and refining service in 316 stainless, Hastelloy, Inconel, Nickel 200 and Titanium.",
    eyebrow: "Applications",
    h1: "Chemical and Petrochemical Processing",
    intro: [
      `In chemical and refining service the pressure rating is rarely the hard part. Material compatibility is. A component that holds 20,000 psi indefinitely on nitrogen can fail in weeks on the wrong media, and the selection decision belongs at enquiry rather than after commissioning.`,
    ],
    heroCtas: [REQUEST_QUOTE, SPEAK_ENGINEER],
    blocks: [
      {
        type: "table",
        heading: "Material selection",
        paragraphs: [
          `Stainless steel 316 is standard across the HIFLUX range, cold-formed for corrosion resistance at pressure. Where the media rules it out, the following alloys are available:`,
        ],
        columns: ["Material", "Typical reason for specifying"],
        rows: [
          [
            "Stainless steel 316",
            "Standard — general chemical and process service",
          ],
          ["Hastelloy", "Strongly oxidising and reducing media"],
          [
            "Hastelloy C276 (wetted parts)",
            "Aggressive media where full-body alloy is not required",
          ],
          [
            "Inconel 600 / 625 / 825",
            "High temperature and chloride-bearing service",
          ],
          ["Nickel 200", "Caustic service"],
          ["Titanium", "Chloride and seawater-bearing process streams"],
        ],
        footnote:
          "Send the media composition, concentration and temperature and we will confirm what is appropriate. Material selection is not something to infer from a datasheet alone.",
      },
      {
        type: "prose",
        heading: "Why metal-to-metal sealing matters here",
        paragraphs: [
          `Cone and thread connections seal metal against metal, with no elastomer, gasket or thread sealant in the pressure path. On a process line carrying solvents, acids or high-temperature media, that removes an entire category of compatibility problem — there is no seal material to swell, harden or leach.`,
          `Operating range across the fitting family is −423°F (−252°C) to 1200°F (649°C).`,
        ],
      },
      {
        type: "table",
        heading: "What we supply",
        columns: ["Component", "Application"],
        rows: [
          [
            "High-pressure needle valves",
            "Isolation and throttling on process and sample lines",
          ],
          ["Check valves", "Backflow prevention on injection and dosing"],
          [
            "Line filters",
            "Particulate protection upstream of instrumentation",
          ],
          ["Relief valves", "Overpressure protection, several set types"],
          [
            "Safety head and rupture disc",
            "Defined-failure protection where a relief valve is unsuitable",
          ],
          ["Cone and thread fittings", "Elbow, tee and cross, 10,000 to 150,000 psi"],
          ["High temperature valves", "Elevated-temperature process duty"],
          ["Pressure regulators", "Setting and holding line pressure"],
          ["Manifold blocks", "Multi-port distribution and instrument hook-ups"],
        ],
      },
      {
        type: "links",
        links: [
          { label: "View valves", href: VALVES },
          { label: "View fittings", href: FITTINGS },
        ],
      },
    ],
    closing: {
      heading: "Discuss your process",
      body: `Send media, concentration, temperature, pressure and connection type, and we will confirm material and component selection.`,
      buttons: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
  },

  {
    slug: "power-generation",
    title: "High Temperature Valves for Power Generation | Hiflux UK",
    description:
      "High temperature valves and fittings rated to 1200°F (649°C) in 316 stainless, for steam and power plant instrumentation lines.",
    eyebrow: "Applications",
    h1: "Power Generation",
    intro: [
      `Power plant instrumentation runs hot. Steam sampling lines, drum level measurement and turbine monitoring all put small-bore tube and its connections at temperatures that rule out elastomeric sealing entirely — and that is where metal-to-metal connections earn their place.`,
    ],
    heroCtas: [REQUEST_QUOTE, SPEAK_ENGINEER],
    blocks: [
      {
        type: "prose",
        heading: "Temperature is the constraint",
        paragraphs: [
          `The HIFLUX fitting family carries an operating range to 1200°F (649°C), and the high temperature valve range is built specifically for elevated-temperature duty. Because cone and thread connections seal metal against metal, there is no packing or O-ring in the pressure path to degrade with thermal cycling.`,
          `Thermal cycling is also a fatigue problem for the tube run itself. Support and clamping matter as much as the connection rating.`,
        ],
      },
      {
        type: "table",
        heading: "What we supply",
        columns: ["Component", "Application"],
        rows: [
          [
            "High temperature valves",
            "Steam and elevated-temperature instrument isolation",
          ],
          [
            "High-pressure needle valves",
            "Isolation and throttling on sampling and measurement lines",
          ],
          [
            "Cone and thread fittings",
            "Metal-to-metal connections with no elastomer in the path",
          ],
          ["Pressure gauges and thermocouples", "Plant instrumentation"],
          ["Relief valves and safety heads", "Overpressure protection"],
          ["Tube, nipples and tube support", "Instrument tubing runs and restraint"],
          ["Line filters", "Particulate protection on sampling lines"],
        ],
        footnote:
          "All in cold-formed stainless steel 316 as standard, with Inconel 600, 625 and 825 available where temperature and media require them.",
      },
    ],
    closing: {
      heading: "Discuss your application",
      body: `Send the operating temperature, pressure, media and connection type and we will confirm the valve and material selection.`,
      buttons: [REQUEST_QUOTE, DOWNLOAD_CATALOGUE],
    },
  },
];

export function getApplication(slug: string): Application | undefined {
  return APPLICATIONS.find((a) => a.slug === slug);
}
