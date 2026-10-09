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
