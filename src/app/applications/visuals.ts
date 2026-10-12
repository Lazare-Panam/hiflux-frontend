// Presentation-only extras for the application pages: a representative
// HIFLUX product image and three headline facts per application. Facts are
// taken from each page's own copy in data.ts, so keep them in step with it.

const IMG = "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/";

export type AppVisual = { image: string; imageAlt: string; facts: { value: string; label: string }[] };

export const APP_VISUALS: Record<string, AppVisual> = {
  "hydrogen-refuelling": {
    image: `${IMG}needle-valve.png`,
    imageAlt: "HIFLUX high-pressure needle valve for hydrogen refuelling",
    facts: [
      { value: "700 bar", label: "Dispensing pressure" },
      { value: "−252 °C", label: "Fitting low limit" },
      { value: "KS certified", label: "H70 manual valves" },
    ],
  },
  "wellhead-pressure-control": {
    image: `${IMG}Speical-valve.png`,
    imageAlt: "HIFLUX special valve for wellhead pressure control",
    facts: [
      { value: "60,000 psi", label: "Valve rating" },
      { value: "DBB", label: "Double block & bleed" },
      { value: "316 stainless", label: "Standard material" },
    ],
  },
  "research-and-testing": {
    image: `${IMG}reducing-fitting.png`,
    imageAlt: "HIFLUX cone and thread fitting for research rigs",
    facts: [
      { value: "150,000 psi", label: "Fitting rating" },
      { value: "Re-makeable", label: "Cone & thread" },
      { value: "On-site", label: "Coning tooling" },
    ],
  },
  "chemical-processing": {
    image: `${IMG}manifold-block.png`,
    imageAlt: "HIFLUX manifold block for chemical processing",
    facts: [
      { value: "Metal-to-metal", label: "Sealing" },
      { value: "5 alloys", label: "316, Hastelloy, Inconel, Ni 200, Ti" },
      { value: "At enquiry", label: "Material advice" },
    ],
  },
  "power-generation": {
    image: `${IMG}check-valve.png`,
    imageAlt: "HIFLUX check valve for power plant instrumentation",
    facts: [
      { value: "1200 °F", label: "649 °C rating" },
      { value: "Metal-to-metal", label: "No elastomers" },
      { value: "316 stainless", label: "Standard material" },
    ],
  },
};

// Industry photos for the applications overview, self-hosted in
// /public/applications. All from Wikimedia Commons; licence checked per file:
// CC0 / public domain need no credit, CC BY 4.0 needs the credit shown on the
// page. Replace with HIFLUX or customer photos when available.
export type AppPhoto = { src: string; alt: string; license: string; source: string; credit?: string; creditUrl?: string };

export const APP_PHOTOS: Record<string, AppPhoto> = {
  "hydrogen-refuelling": {
    src: "/applications/hydrogen-refuelling.jpg",
    alt: "Hydrogen refuelling station dispenser",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Hydrogen_station_in_Jyv%C3%A4skyl%C3%A4.jpg",
    credit: "Hydrogen station in Jyväskylä, Tiia Monto, CC BY 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Hydrogen_station_in_Jyv%C3%A4skyl%C3%A4.jpg",
  },
  "wellhead-pressure-control": {
    src: "/applications/wellhead-pressure-control.jpg",
    alt: "Wellheads and pipework at an oil storage site",
    license: "Public domain (U.S. Department of Energy)",
    source: "https://commons.wikimedia.org/wiki/File:United_States_Strategic_Petroleum_Reserve_031.jpg",
  },
  "research-and-testing": {
    src: "/applications/research-and-testing.jpg",
    alt: "Technicians operating a hydraulic test stand",
    license: "Public domain (U.S. Department of Defense)",
    source: "https://commons.wikimedia.org/wiki/File:U.S._Air_Force_Hydraulic_Test_Stand_inspection.jpg",
  },
  "chemical-processing": {
    src: "/applications/chemical-processing.jpg",
    alt: "Petrochemical plant process columns",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Petrochemical_Plant_Near_Mulhurst_Bay_Alberta_Canada_03A.jpg",
  },
  "power-generation": {
    src: "/applications/power-generation.jpg",
    alt: "Power station steam turbine rotor",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Philippsburg_Nuclear_Power_Plant_condensation_turbine_pic2.jpg",
  },
};
