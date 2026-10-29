import type { BlogData } from "../../components/BlogPost";

export const post: BlogData = {
  slug: "industrial-filtration-high-viscosity-fluids",
  title:
    "High-Viscosity Filtration Explained: Pressure Drop, Media Choice and Sizing",
  seoTitle: "High-Viscosity Filtration: Sizing, Media and Pressure Drop | Hiflux",
  metaDescription:
    "How viscosity drives filter pressure drop, how to choose strainers, depth media and magnetic stages, and how to size for thick fluids.",
  date: "October 28, 2026",
  category: "Filtration",
  // Stand-in: reuses the generic editorial blog hero (no filtration-specific image
  // exists in the asset library yet). Swap for a commissioned filtration diagram —
  // a viscosity vs pressure-drop graph or a staged-filtration schematic — before publishing.
  heroImage: "https://pblol2.blob.core.windows.net/hiflux/blog-1.jpeg",
  excerpt:
    "Filtering a thick fluid is not the same as filtering water. The pressure drop across a filter element rises in proportion to the fluid's viscosity, so a filter that behaves perfectly on a thin fluid can starve a pump on a viscous one. This guide explains why viscosity changes the rules, then covers strainers and filters, surface and depth media, magnetic separation, temperature and shear, sizing, and the problems that most often show up in service.",
  tags: [
    "High-Viscosity Filtration",
    "Strainers",
    "Depth Filtration",
    "Filter Pressure Drop",
    "Magnetic Separation",
    "Gel Blocking",
  ],
  sections: [
    {
      heading: null,
      body: `Filtering a thick fluid is not the same as filtering water. The pressure drop across a filter element rises in proportion to the fluid's viscosity, so a filter that behaves perfectly on a thin fluid can starve a pump on a viscous one.\nThis guide explains why viscosity changes the rules, then covers strainers and filters, surface and depth media, magnetic separation, temperature and shear, sizing, and the problems that most often show up in service.`,
    },
    {
      heading: "Key takeaways",
      body: `• Clean pressure drop across a filter element scales with viscosity, so size for the viscosity at operating temperature, not at room temperature.\n• Total clean pressure drop is the housing plus the element. The housing part depends on fluid density and the element part on viscosity.\n• Stage the filtration: a coarse surface stage first, a finer depth stage second. Avoid one tight stage.\n• Oversize the filter area for viscous duty, to keep face velocity and pressure drop low.\n• Set the differential pressure limit from the clean baseline, the pump or process limit and the element's maximum rated differential pressure.\n• Many viscous fluids are non-Newtonian, so apparent viscosity depends on shear rate and can differ from the data-sheet figure.`,
    },
    {
      heading: "Why does viscosity change filtration?",
      body: `Viscosity is a fluid's resistance to flow. When a viscous fluid passes through a filter element, the pressure drop across the element rises in proportion to its viscosity at the same flow. A thicker fluid therefore needs more filter area, or a lower flow, to hold the same pressure drop.\nFilter manufacturers' sizing methods treat total pressure drop as the sum of two parts. The housing pressure drop is proportional to the fluid's density, and the element pressure drop is proportional to its viscosity. Because the element term scales directly with viscosity, a fluid with twice the viscosity gives roughly twice the clean element pressure drop. To a first approximation, holding the pressure drop constant then needs roughly twice the effective filter area.\nTwo practical points follow:\n• Use viscosity at operating temperature. Viscosity usually changes steeply with temperature, so a figure quoted at 20°C can badly understate the pressure drop on a cold start.\n• Treat non-Newtonian fluids with care. Many resins, paints and gels are shear-thinning or otherwise shear-dependent. Their apparent viscosity depends on the shear rate inside the filter, which can differ from the rate used to measure the data-sheet figure. Ask for rheology data at your operating temperature and a representative shear rate.\nThe idea of a terminal pressure drop also matters. As captured solids fill the pores, the pressure drop rises. The terminal pressure drop is the restriction limit beyond which the system, or the filter itself, can no longer cope.`,
    },
    {
      heading: "What is the difference between a strainer and a filter?",
      body: `A strainer is a coarse, usually cleanable screen, such as a mesh or wedge-wire basket, that protects pumps and valves from larger debris. A filter is finer, using a cartridge or layered medium to remove smaller particles, and is usually replaced rather than cleaned.\n• Typical element — strainer: mesh, wedge-wire or perforated basket. Filter: cartridge, bag or layered medium.\n• Typical job — strainer: protects pumps, valves and instruments from larger debris. Filter: removes finer particles and gels to protect quality.\n• Service — strainer: usually cleaned and reused. Filter: usually replaced.\n• Rating — strainer: often given as mesh or an opening size. Filter: given as a micron rating, absolute or nominal.`,
    },
    {
      heading: "Mesh, micron, absolute and nominal",
      body: `Mesh counts the openings per linear inch in a woven screen, so a higher mesh number means a finer screen. Micron rating states the particle size a filter removes. Absolute ratings give a defined, high removal efficiency at that size, while nominal ratings are looser.\nFor viscous duty, start with the contaminant profile. If you face shavings, flakes or pigment agglomerates, a robust mesh basket or wedge wire is a sensible first stage. If gels or fines must be controlled, add a finer depth element downstream. Don't jump straight to a tight micron rating in a single stage.`,
    },
    {
      heading: "What is the difference between surface and depth media?",
      body: `Surface media, such as wire mesh and wedge wire, capture particles on the upstream face and are strong and easy to clean. Depth media capture particles throughout their thickness, so they hold more fine material before the pressure drop climbs, but they are generally replaced rather than cleaned.\n• Examples — surface: wire mesh, wedge wire, perforated baskets. Depth: cartridges and layered fibre.\n• Where particles are held — surface: on the upstream face. Depth: through the thickness.\n• Dirt-holding — surface: lower, but it drains well. Depth: higher, for fine material.\n• Cleaning — surface: cleanable and reusable. Depth: generally replaced.\n• Main risks on viscous fluids — surface: loading the face area quickly if the mesh is too fine. Depth: gel blocking, and channelling if flow is uneven.\nIn viscous lines, a surface stage first and a depth stage second often gives the best dirt-holding for each bar of pressure drop. Channelling, where flow finds a path of least resistance through a depth element, collapses capture efficiency. Even distribution, sensible velocity, and proper support and centring of the element reduce it.`,
    },
    {
      heading: "How does staged filtration work?",
      body: `A single tight filter loads quickly, so its pressure drop climbs fast. A coarse stage first removes the bulk of the solids, and a finer stage second removes the fines. That gives more dirt-holding for each bar of pressure drop and longer service intervals.\nAs an illustration, a viscous line might use a magnetic stage to remove ferrous fines, a coarse basket to take the bulk of the solids, and a finer depth element to control gels. The exact arrangement depends on the contaminants and the product specification. Step the filtration down across stages, rather than going tight early, because going tight too early raises pressure drop and shortens service cycles.`,
    },
    {
      heading: "How does magnetic separation help?",
      body: `Ferrous fines and tool-steel particles load filters quickly. A magnetic separator upstream removes that load before it reaches the strainer or element, which can extend run times and steady the pressure drop. It only captures magnetic particles, so it supplements the filter and does not replace it.\n• Placement — upstream of the strainer or filter, where the fluid is warm enough to flow freely.\n• Temperature — magnets have a maximum operating temperature. Check it against your heated product.\n• Capture performance — depends on magnet strength, flow velocity and the fluid.\n• Cleaning — needs safe, quick access, so it can be cleaned before it saturates.`,
    },
    {
      heading: "How do temperature and shear affect filtration?",
      body: `Viscosity depends on temperature, so heating the fluid before filtration usually lowers the pressure drop. Heat the fluid only within the product's limits, because heat can degrade some products or start curing in reactive ones such as resins. Insulate housings and lines so the benefit isn't lost across the skid.\nShear matters too. Sharp bends and tight restrictions ahead of the filter can damage shear-sensitive products, and can break gels into fines that are harder to capture. A straight, conditioned approach into the filter improves flow distribution and reduces local loading.`,
    },
    {
      heading: "How do you size a filter for a viscous fluid?",
      body: `Work through the sizing in order, using the manufacturer's data for your fluid rather than limits borrowed from another application:\n• 1. Gather the data — flow, viscosity at operating temperature and shear rate, solids size and load, temperature, pressure, and the allowable pressure drop. Sizing on a single room-temperature viscosity figure understates the pressure drop.\n• 2. Calculate the clean pressure drop — add the housing and element pressure drops at your operating viscosity, using the manufacturer's curves and viscosity correction. The element term scales with viscosity.\n• 3. Oversize the area — choose enough area that the clean pressure drop is a small fraction of the allowable. Lower face velocity gives lower pressure drop and longer cycles.\n• 4. Set the terminal limit — take the lowest of the pump or process limit and the element's maximum rated differential pressure. This prevents starving the pump or collapsing the element.\n• 5. Plan the stages — a coarse surface stage first, a finer depth stage only if the specification needs it. This avoids one tight stage that loads quickly.\n• 6. Plan service — provide vents, drains, isolation and, for continuous duty, a duplex arrangement, so cleaning is possible without stopping the line.\n• 7. Verify in service — log the clean pressure drop, and trend it. Plant data replaces assumptions.\nPressure-drop limits quoted for other fluids don't transfer. For example, limits for hydraulic oil filters are set for thin oils and lightly loaded systems, not for viscous process fluids. Use the manufacturer's data for your fluid and your pump.`,
    },
    {
      heading: "When do you need a duplex or self-cleaning strainer?",
      body: `Use a duplex strainer where the line can't be stopped to clean the strainer. It has two baskets and a changeover valve, so one is in service while the other is cleaned. Fill and vent the standby basket before switching.\nA self-cleaning strainer cleans itself automatically, which suits continuous duty where manual cleaning is impractical. Check that the cleaning method suits your fluid's viscosity, because the same cleaning action that works on a thin fluid may not work on a thick one. Ask the manufacturer for evidence on viscous duty.`,
    },
    {
      heading: "What problems occur with viscous filtration?",
      body: `Most trouble on viscous lines traces back to a small number of causes:\n• Gel blocking — soft gels smear across the surface of a depth element and seal it. Reduce it with staged capture, temperature control and lower face velocity.\n• Channelling — uneven flow or poorly supported elements. Reduce it with even distribution, proper internals and a straight inlet run.\n• Bypass and carry-over — damaged baskets or poor seals let debris past. Reduce it with quality seats, checked covers and documented torque, and inspection of baskets.\n• Over-fine media — going too tight early. Reduce it by stepping the filtration down across stages.\n• High pressure drop at cold start — viscosity is highest when the product is cold. Warm the product before start-up, and size for the coldest operating condition.\n• Pressure drop higher than calculated — apparent viscosity higher than assumed, often because the fluid is shear-dependent. Get rheology data at operating temperature and a representative shear rate.`,
    },
    {
      heading: "How should you maintain a viscous-service filter?",
      body: `• Clean surface baskets before the pressure drop reaches the action limit. Don't wait for an alarm.\n• Replace depth elements on pressure-drop trend, not only on hours.\n• Log the clean pressure drop after every service, and compare it with the previous clean value. A clean value that keeps rising points to a damaged element or an upstream change.\n• Inspect seals, covers and housing bores for wear that could create bypass.\n• Keep spare elements and gaskets with traceable lot numbers, for audit-ready records.\n• If solids resist cleaning, consider adding an upstream magnetic stage to reduce the load.`,
    },
  ],
  faq: [
    {
      q: "What is high-viscosity filtration?",
      a: "High-viscosity filtration is the removal of solids from thick fluids such as resins, paints, syrups and oils. Because the pressure drop across a filter rises with viscosity, the filter must be staged and sized with generous area, so it protects the product without becoming a flow bottleneck.",
    },
    {
      q: "Why does viscosity increase filter pressure drop?",
      a: "A thicker fluid resists flowing through the small passages in a filter element. At the same flow, the pressure drop across the element rises in proportion to the fluid's viscosity. So a fluid with twice the viscosity gives roughly twice the clean pressure drop, to a first approximation.",
    },
    {
      q: "What is the difference between a strainer and a filter?",
      a: "A strainer is a coarse, usually cleanable screen, such as a mesh or wedge-wire basket, that protects pumps and valves from larger debris. A filter is finer, using a cartridge or layered medium to remove smaller particles, and is usually replaced rather than cleaned.",
    },
    {
      q: "What is the difference between mesh and micron?",
      a: "Mesh counts the openings per linear inch in a woven screen, so a higher mesh number means a finer screen. Micron rating states the particle size a filter removes. Absolute ratings give a defined, high removal efficiency at that size, while nominal ratings are looser.",
    },
    {
      q: "What is the difference between surface and depth filtration?",
      a: "Surface media, such as wire mesh and wedge wire, capture particles on the upstream face and are strong and easy to clean. Depth media capture particles throughout their thickness, so they hold more fine material before the pressure drop climbs, but they are generally replaced rather than cleaned.",
    },
    {
      q: "Why use more than one filtration stage for viscous fluids?",
      a: "A single tight filter loads quickly, so its pressure drop climbs fast. A coarse stage first removes the bulk of the solids, and a finer stage second removes the fines. That gives more dirt-holding for each bar of pressure drop and longer service intervals.",
    },
    {
      q: "What is gel blocking?",
      a: "Gel blocking is when soft gels smear across a filter's surface and seal it, so the pressure drop rises quickly even though little solid material has been captured. Staged filtration, lower face velocity and temperature control help reduce it.",
    },
    {
      q: "How do you set the differential pressure limit for a filter?",
      a: "Start from the clean pressure drop, then set the terminal limit from the lowest of the pump or process limit and the element's maximum rated differential pressure. Service the filter before it reaches that limit, and adjust the action point using your own plant data.",
    },
    {
      q: "Should you heat a viscous fluid before filtering it?",
      a: "Often yes, if the product allows it, because lower viscosity gives a lower filter pressure drop. Check the product's temperature limits first, since heat can degrade or cure some products, and keep the housing and lines at temperature so the benefit isn't lost.",
    },
    {
      q: "When do you need a duplex strainer?",
      a: "Use a duplex strainer where the line can't be stopped to clean the strainer. It has two baskets and a changeover valve, so one is in service while the other is cleaned. Fill and vent the standby basket before switching.",
    },
    {
      q: "Do magnetic separators suit viscous fluids?",
      a: "A magnetic separator removes ferrous particles before they reach the strainer or filter. Capture depends on magnet strength, flow velocity and the fluid, and magnets have a maximum operating temperature, so check both against your duty.",
    },
  ],
};
