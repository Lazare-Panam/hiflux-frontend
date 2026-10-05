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
  // Ratings are the products' "Pressure Rating" specs from the product API.
  ratings?: { label: string; links: NavSubItem[] }[];
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
        ratings: [
          { label: "Up to 100,000 psi", links: [{ label: "Needle Valve", href: "/products/high-pressure-valves/ndl-ultra-100k" }, { label: "Check Valve", href: "/products/high-pressure-valves/chk-ultra-100k" }] },
          { label: "Up to 60,000 psi", links: [{ label: "Air Operated Valve", href: "/products/high-pressure-valves/aov-nc-60k" }, { label: "Safety Valve", href: "/products/high-pressure-valves/saf-rel-factory-60k" }] },
          { label: "Up to 20,000 psi", links: [{ label: "Ball Valve", href: "/products/high-pressure-valves/ball-med-20k" }] },
          { label: "Up to 7,500 psi", links: [{ label: "Control Valve", href: "/products/high-pressure-valves/spc-ctrl-75k" }] },
        ],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Valves", href: "/products/high-pressure-valves" }] },
          { heading: "Guides", links: [{ label: "Check Valves Guide", href: "/news/high-pressure-check-valves-reverse-flow-prevention" }] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Needle Valve",
            href: "/products/high-pressure-valves/ndl-ultra-100k",
          },
          {
            label: "Check Valve",
            href: "/products/high-pressure-valves/chk-ultra-100k",
          },
          {
            label: "Ball Valve",
            href: "/products/high-pressure-valves/ball-med-20k",
          },
          {
            label: "Air Operated Valve",
            href: "/products/high-pressure-valves/aov-nc-60k",
          },
          {
            label: "Safety Valve",
            href: "/products/high-pressure-valves/saf-rel-factory-60k",
          },
          {
            label: "Special Valve",
            href: "/products/high-pressure-valves/spc-ctrl-75k",
          },
        ],
      },
      {
        heading: "High Pressure Fittings",
        href: "/products/high-pressure-fittings",
        ratings: [
          { label: "Up to 150,000 psi", links: [{ label: "Fitting", href: "/products/high-pressure-fittings/fit-ultra-150k" }, { label: "Fitting Accessory", href: "/products/high-pressure-fittings/acc-ultra-150k" }] },
          { label: "Up to 60,000 psi", links: [{ label: "Manifold Block", href: "/products/high-pressure-fittings/mfb-high-60k" }, { label: "Tube Cap", href: "/products/high-pressure-fittings/cap-high-60k" }] },
        ],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Fittings", href: "/products/high-pressure-fittings" }] },
          { heading: "Guides", links: [CONE_THREAD_GUIDE] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Fitting",
            href: "/products/high-pressure-fittings/fit-ultra-150k",
          },
          {
            label: "Fitting Accessory",
            href: "/products/high-pressure-fittings/acc-ultra-150k",
          },
          {
            label: "Manifold Block",
            href: "/products/high-pressure-fittings/mfb-high-60k",
          },
          {
            label: "Tube Cap",
            href: "/products/high-pressure-fittings/cap-high-60k",
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
        ratings: [
          { label: "Up to 100,000 psi", links: [{ label: "Tube", href: "/products/high-pressure-tubing/tube-ultra-100k" }, { label: "Nipple", href: "/products/high-pressure-tubing/nip-ultra-100k" }] },
        ],
        resources: [
          { heading: "View All", links: [{ label: "View All High Pressure Tubing", href: "/products/high-pressure-tubing" }] },
          { heading: "Guides", links: [CONE_THREAD_GUIDE] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Tube",
            href: "/products/high-pressure-tubing/tube-ultra-100k",
          },
          {
            label: "Nipple",
            href: "/products/high-pressure-tubing/nip-ultra-100k",
          },
          {
            label: "Tooling Set",
            href: "/products/high-pressure-tubing/tool-coning",
          },
          {
            label: "Tube Support",
            href: "/products/high-pressure-tubing/sup-3line",
          },
        ],
      },
      {
        heading: "Union & Adapters",
        href: "/products/union-adapters",
        ratings: [
          { label: "Up to 60,000 psi", links: [{ label: "Union", href: "/products/union-adapters/unn-ff-60k" }, { label: "Male to Male", href: "/products/union-adapters/adp-mm-60k" }, { label: "Male to Female", href: "/products/union-adapters/adp-mf-60k" }, { label: "Bulkhead", href: "/products/union-adapters/adp-bulkhead-60k" }] },
          { label: "Up to 20,000 psi", links: [{ label: "LOK to Female", href: "/products/union-adapters/adp-lokf-f-20k" }] },
        ],
        resources: [
          { heading: "View All", links: [{ label: "View All Unions & Adapters", href: "/products/union-adapters" }] },
          CATALOGUE,
        ],
        items: [
          {
            label: "Union",
            href: "/products/union-adapters/unn-ff-60k",
          },
          {
            label: "Adapter - Male to Male",
            href: "/products/union-adapters/adp-mm-60k",
          },
          {
            label: "Adapter - Male to Female",
            href: "/products/union-adapters/adp-mf-60k",
          },
          {
            label: "Adapter - Bulkhead Union",
            href: "/products/union-adapters/adp-bulkhead-60k",
          },
          {
            label: "Adapter - LOK to Female",
            href: "/products/union-adapters/adp-lokf-f-20k",
          },
        ],
      },
      {
        heading: "High Pressure Regulators",
        href: "/products/high-pressure-regulators",
        ratings: [
          { label: "Up to 3,000 psi", links: [{ label: "General (GPR)", href: "/products/high-pressure-regulators/gpr-normal-3000" }] },
          { label: "Up to 15,000 psi", links: [{ label: "High Pressure (HPR)", href: "/products/high-pressure-regulators/hpr-10000" }, { label: "Back Pressure (BPR)", href: "/products/high-pressure-regulators/bpr-15000" }] },
          { label: "Up to 20,000 psi", links: [{ label: "Air Operated BPR", href: "/products/high-pressure-regulators/abpr-10000" }] },
        ],
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
            href: "/products/high-pressure-regulators/hpr-10000",
          },
          {
            label: "Back Pressure Regulator",
            href: "/products/high-pressure-regulators/bpr-15000",
          },
          {
            label: "Air Operated Back Pressure Regulator",
            href: "/products/high-pressure-regulators/abpr-10000",
          },
        ],
      },
      {
        heading: "Industrial Filtration",
        href: "/industrial-filtration-systems",
        items: [
          { label: "Industrial Filtration Systems", href: "/industrial-filtration-systems" },
          { label: "Y & Basket Strainers", href: "/industrial-strainers" },
          { label: "Magnetic Filters", href: "/magnetic-filters" },
        ],
        resources: [
          {
            heading: "Guides",
            links: [
              { label: "High Flow Water Filter Guide", href: "/news/high-flow-industrial-water-filter-selection-guide" },
              { label: "Backwashing Filter Cycles", href: "/news/backwashing-filter-cycles-municipal-industrial" },
            ],
          },
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
  { label: "latest News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const RIGHT_NAV: NavItem[] = [];
