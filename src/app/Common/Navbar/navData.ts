export type NavSubItem = {
  label: string;
  href: string;
};

export type MegaMenuItem = {
  label: string;
  href: string;
  subItems?: NavSubItem[];
};

export type NavLink = NavSubItem & { external?: boolean };

export type NavLinkGroup = { heading: string; links: NavLink[] };

export type MegaMenuColumn = {
  heading: string;
  href: string;
  items: MegaMenuItem[];
  // Optional extra columns in the desktop panel (MARS-style layout).
  applications?: NavSubItem[];
  resources?: NavLinkGroup[];
};

const CATALOGUE: NavLinkGroup = {
  heading: "Catalogue",
  links: [
    {
      label: "Download E-Catalogue (PDF)",
      href: "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf",
      external: true,
    },
  ],
};

// Applications per category follow the product links on each application page
// (src/app/applications/data.ts).
const APP = {
  hydrogen: { label: "Hydrogen Refuelling", href: "/applications/hydrogen-refuelling" },
  wellhead: { label: "Wellhead & Pressure Control", href: "/applications/wellhead-pressure-control" },
  research: { label: "Research & Testing", href: "/applications/research-and-testing" },
  chemical: { label: "Chemical Processing", href: "/applications/chemical-processing" },
};

const CONE_THREAD_GUIDE = {
  label: "Cone & Thread Fittings Guide",
  href: "/news/high-pressure-cone-and-thread-fittings-guide",
};

export type NavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
};

export const LEFT_NAV: NavItem[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    megaMenu: [
      {
        heading: "High Pressure Valves",
        href: "/products/high-pressure-valves",
        applications: [APP.hydrogen, APP.wellhead, APP.chemical],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Valves", href: "/products/high-pressure-valves" }] },
          { heading: "Guides", links: [{ label: "Check Valves Guide", href: "/news/high-pressure-check-valves-reverse-flow-prevention" }] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Needle Valve",
            href: "/series/ndl-ultra-100k",
          },
          {
            label: "Check Valve",
            href: "/series/chk-ultra-100k",
          },
          {
            label: "Ball Valve",
            href: "/series/ball-med-20k",
          },
          {
            label: "Air Operated Valve",
            href: "/series/aov-nc-60k",
          },
          {
            label: "Safety Valve",
            href: "/series/saf-rel-factory-60k",
          },
          {
            label: "Special Valve",
            href: "/series/spc-ctrl-75k",
          },
        ],
      },
      {
        heading: "High Pressure Fittings",
        href: "/products/high-pressure-fittings",
        applications: [APP.hydrogen, APP.wellhead, APP.research, APP.chemical],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Fittings", href: "/products/high-pressure-fittings" }] },
          { heading: "Guides", links: [CONE_THREAD_GUIDE] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Fitting",
            href: "/series/fit-ultra-150k",
          },
          {
            label: "Fitting Accessory",
            href: "/series/acc-ultra-150k",
          },
          {
            label: "Manifold Block",
            href: "/series/mfb-high-60k",
          },
          {
            label: "Tube Cap",
            href: "/series/cap-high-60k",
          },
          {
            label: "Thread Lubricant",
            href: "/products/high-pressure-fittings/lube-blue",
          },
        ],
      },
      {
        heading: "High Pressure Tubing",
        href: "/products/high-pressure-tubing",
        applications: [APP.hydrogen, APP.research],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Tubing", href: "/products/high-pressure-tubing" }] },
          { heading: "Guides", links: [CONE_THREAD_GUIDE] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Tube",
            href: "/series/tube-ultra-100k",
          },
          {
            label: "Nipple",
            href: "/series/nip-ultra-100k",
          },
          {
            label: "Tooling Set",
            href: "/series/tool-coning",
          },
          {
            label: "Tube Support",
            href: "/series/sup-3line",
          },
        ],
      },
      {
        heading: "Union & Adapters",
        href: "/products/union-adapters",
        resources: [
          { heading: "View All", links: [{ label: "View All Unions & Adapters", href: "/products/union-adapters" }] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Union",
            href: "/series/unn-ff-60k",
          },
          {
            label: "Adapter - Male to Male",
            href: "/series/adp-mm-60k",
          },
          {
            label: "Adapter - Male to Female",
            href: "/series/adp-mf-60k",
          },
          {
            label: "Adapter - Bulkhead Union",
            href: "/series/adp-bulkhead-60k",
          },
          {
            label: "Adapter - LOK to Female",
            href: "/series/adp-lokf-f-20k",
          },
        ],
      },
      {
        heading: "High Pressure Regulators",
        href: "/products/high-pressure-regulators",
        applications: [APP.chemical, APP.research],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Regulators", href: "/products/high-pressure-regulators" }] },
          { heading: "Guides", links: [{ label: "Regulator Selection Guide", href: "/news/high-pressure-regulators-gpr-hpr-bpr-selection-guide" }] },
          CATALOGUE,
        ],
        items: [
          {
            label: "General Pressure Regulator",
            href: "/products/high-pressure-regulators/gpr-normal-3000",
          },
          {
            label: "High Pressure Regulator",
            href: "/series/hpr-10000",
          },
          {
            label: "Back Pressure Regulator",
            href: "/series/bpr-15000",
          },
          {
            label: "Air Operated Back Pressure Regulator",
            href: "/products/high-pressure-regulators/abpr-10000",
          },
        ],
      },
      {
        heading: "LOK Fittings & Valves",
        href: "/products/lok-fittings-valves",
        applications: [APP.chemical, APP.research],
        resources: [
          { heading: "View All", links: [{ label: "View All LOK Fittings & Valves", href: "/products/lok-fittings-valves" }] },
          CATALOGUE,
        ],
        items: [
          { label: "LOK Tube", href: "/products/lok-fittings-valves/lok-tube" },
          { label: "LOK Tube Fittings", href: "/products/lok-fittings-valves/lok-tube-fittings" },
          { label: "LOK Valves", href: "/products/lok-fittings-valves/lok-valves" },
        ],
      },
      {
        heading: "Pressure, Temperature & Flow",
        href: "/products/pressure-temp-flow",
        applications: [APP.research, APP.chemical],
        resources: [
          { heading: "View All", links: [{ label: "View All Pressure, Temperature & Flow", href: "/products/pressure-temp-flow" }] },
          CATALOGUE,
        ],
        // Same three tabs, in the same order, as hiflux.net > Pressure/Tempe/Flow.
        items: [
          { label: "Pressure Gauge", href: "/products/pressure-temp-flow/pressure-gauge" },
          { label: "Thermocouple", href: "/products/pressure-temp-flow/thermocouple" },
          { label: "Pump", href: "/products/pressure-temp-flow/pump" },
        ],
      },
    ],
  },
  {
    label: "Applications",
    href: "/applications",
    megaMenu: [
      {
        heading: "Applications",
        href: "/applications",
        resources: [
          { heading: "View All", links: [{ label: "View All Applications", href: "/applications" }] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Hydrogen Refuelling",
            href: "/applications/hydrogen-refuelling",
          },
          {
            label: "Wellhead & Pressure Control",
            href: "/applications/wellhead-pressure-control",
          },
          {
            label: "Research & Testing",
            href: "/applications/research-and-testing",
          },
          {
            label: "Chemical Processing",
            href: "/applications/chemical-processing",
          },
          {
            label: "Power Generation",
            href: "/applications/power-generation",
          },
        ],
      },
    ],
  },
  { label: "Certifications", href: "/certifications" },
  { label: "latest News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const RIGHT_NAV: NavItem[] = [];
