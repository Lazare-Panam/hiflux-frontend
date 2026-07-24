export type NavSubItem = {
  label: string;
  href: string;
};

export type MegaMenuItem = {
  label: string;
  href: string;
  subItems?: NavSubItem[];
};

export type MegaMenuColumn = {
  heading: string;
  href: string;
  items: MegaMenuItem[];
};

export type NavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
};

export const LEFT_NAV: NavItem[] = [
   { label: 'latest News', href: '/news' },
  { label: 'About Us', href: '#' },
  { label: 'Hiflux® Brand', href: '#' },
  {
    label: 'Products',
    href: '/products',
    megaMenu: [
      {
        heading: 'High Pressure Valves',
        href: '/products/high-pressure-valves',
        items: [
          { label: 'Needle Valve', href: '/products/high-pressure-valves/ndl-ultra-100k' },
          { label: 'Check Valve', href: '/products/high-pressure-valves/chk-ultra-100k' },
          { label: 'Ball Valve', href: '/products/high-pressure-valves/ball-med-20k' },
          { label: 'Air Operated Valve', href: '/products/high-pressure-valves/aov-nc-60k' },
          { label: 'Safety Valve', href: '/products/high-pressure-valves/saf-rel-factory-60k' },
          { label: 'Special Valve', href: '/products/high-pressure-valves/spc-ctrl-75k' },
        ],
      },
      {
        heading: 'High Pressure Fittings',
        href: '/products/high-pressure-fittings',
        items: [
          { label: 'Fitting', href: '/products/high-pressure-fittings/fit-ultra-150k' },
          { label: 'Fitting Accessory', href: '/products/high-pressure-fittings/acc-ultra-150k' },
          { label: 'Manifold Block', href: '/products/high-pressure-fittings/mfb-high-60k' },
          { label: 'Tube Cap', href: '/products/high-pressure-fittings/cap-high-60k' },
          { label: 'Thread Lubricant', href: '/products/high-pressure-fittings/lube-blue' },
        ],
      },
      {
        heading: 'High Pressure Tubing',
        href: '/products/high-pressure-tubing',
        items: [
          { label: 'Tube', href: '/products/high-pressure-tubing/tube-ultra-100k' },
          { label: 'Nipple', href: '/products/high-pressure-tubing/nip-ultra-100k' },
          { label: 'Tooling Set', href: '/products/high-pressure-tubing/tool-coning' },
          { label: 'Tube Support', href: '/products/high-pressure-tubing/sup-3line' },
        ],
      },
    ],
  },
  { label: 'Certificate', href: '#' },
];

export const RIGHT_NAV: NavItem[] = [
  { label: 'Download', href: '#' },
 
  { label: 'News', href: '#' },
  { label: 'Contact Us', href: '#' },
];